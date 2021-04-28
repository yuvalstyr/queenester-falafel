import request, { ClientError, gql } from "graphql-request"
import getConfig from "next/config"
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query"
import { EmployeeFormData } from "../Components/EmployeesShiftForm"
import { Query, Shift } from "../generates"
import { v4 as uuidv4 } from "uuid"

const { publicRuntimeConfig } = getConfig()
const endpoint = publicRuntimeConfig.GRAPHQL_URL

function getDefualtMutationOptions({
  queryClient,
}: {
  queryClient: QueryClient
}) {
  return {
    onError: (_err, _variables, recover) =>
      typeof recover === "function" ? recover() : null,
    onSettled: () => queryClient.invalidateQueries("shifts"),
  }
}

const shifts = gql`
  query shifts($startDay: String, $endDay: String) {
    allShifts(where: { start_gte: $startDay, start_lt: $endDay }) {
      id
      worker {
        id
        name
      }
      start
      end
    }
  }
`

const deleteShift = gql`
  mutation deleteShift($shiftId: ID!) {
    deleteShift(id: $shiftId) {
      id
    }
  }
`

const createShift = gql`
  mutation CreateShift($start: String!, $end: String!, $employeeId: ID!) {
    createShift(
      data: {
        start: $start
        end: $end
        worker: { connect: { id: $employeeId } }
      }
    ) {
      id
    }
  }
`
type QueryReturnEmployees = { allEmployees: Query["allEmployees"] }
type QueryReturnShifts = { allShifts: Query["allShifts"] }

type IShiftBoundary = {
  startDay: String
  endDay: String
}

function useShifts({ startDay, endDay }: IShiftBoundary) {
  const result = useQuery<QueryReturnShifts, ClientError>({
    queryKey: ["shifts", { startDay, endDay }],
    queryFn: () => request(endpoint, shifts, { startDay, endDay }),
  })

  return { ...result, data: result.data ?? { allShifts: [] } }
}

function useCreateShifts() {
  const queryClient = useQueryClient()
  // defualt mutation behivors
  const defaultMutationOptions = getDefualtMutationOptions({ queryClient })
  return useMutation(
    (data: EmployeeFormData) => {
      const { employee, end, start } = data
      return request(endpoint, createShift, {
        employeeId: employee,
        end,
        start,
      })
    },
    {
      onMutate(newItem) {
        const { allEmployees } = queryClient.getQueryData<QueryReturnEmployees>(
          "employees"
        )
        const name = allEmployees.filter((e) => +e.id === +newItem.employee)[0]
        const { start, end } = newItem

        const newShift: Shift = {
          id: uuidv4(),
          start: start.toISOString(),
          end: end.toISOString(),
          worker: name,
        }
        // for roll back if the mutation wiil return error
        const previousShifts = queryClient.getQueryData<Shift[]>("shifts")
        // Optimistically update to the new value
        if (previousShifts) {
          queryClient.setQueryData<{ allShifts: Shift[] }>("shifts", (old) => {
            const { allShifts: oldShifts } = old
            return {
              allShifts: [...oldShifts, newShift],
            }
          })
        }

        return () => queryClient.setQueryData("shifts", previousShifts)
      },
      ...defaultMutationOptions,
    }
  )
}

function useDeleteShift() {
  const queryClient = useQueryClient()
  const defaultMutationOptions = getDefualtMutationOptions({ queryClient })
  return useMutation((shiftId) => request(endpoint, deleteShift, { shiftId }), {
    onMutate(removedItem: String) {
      const previousShifts = queryClient.getQueryData<Shift[]>("shifts")
      queryClient.setQueryData<{ allShifts: Shift[] }>("shifts", (old) => {
        const { allShifts: shifts } = old
        const newData = shifts.filter((s) => s.id !== removedItem)
        return { allShifts: newData }
      })
      return () => queryClient.setQueryData("shifts", previousShifts)
    },
    ...defaultMutationOptions,
  })
}

export { useCreateShifts, useShifts, useDeleteShift }
