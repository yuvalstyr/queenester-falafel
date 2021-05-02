import { format, formatISO } from "date-fns"
import request, { ClientError, gql } from "graphql-request"
import getConfig from "next/config"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { v4 as uuidv4 } from "uuid"
import { EmployeeFormData } from "../Components/EmployeesShiftForm"
import { Query, Shift } from "../generates"

const { publicRuntimeConfig } = getConfig()
const endpoint = publicRuntimeConfig.GRAPHQL_URL

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
      start
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
      start
    }
  }
`
type QueryReturnEmployees = { allEmployees: Query["allEmployees"] }
type QueryReturnShifts = { allShifts: Query["allShifts"] }

export type DayBoundary = {
  startDay: string
  endDay: string
}

function getDefualtMutationOptions() {
  return {
    onError: (_err, _variables, recover) => {
      console.log("error")
      return typeof recover === "function" ? recover() : null
    },
  }
}

function useShifts({ startDay, endDay }: DayBoundary) {
  const day = format(new Date(startDay), "dd-MM-yy")
  const result = useQuery<QueryReturnShifts, ClientError>({
    queryKey: ["shifts", { day }],
    queryFn: () => request(endpoint, shifts, { startDay, endDay }),
  })

  return { ...result, data: result.data ?? { allShifts: [] } }
}

function useCreateShifts() {
  const queryClient = useQueryClient()
  // defualt mutation behaviors
  const defaultMutationOptions = getDefualtMutationOptions()
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
      onMutate(newItem: EmployeeFormData) {
        const { allEmployees } = queryClient.getQueryData<QueryReturnEmployees>(
          "employees"
        )
        const name = allEmployees.filter((e) => +e.id === +newItem.employee)[0]
        const { start, end } = newItem
        const day = format(new Date(start), "dd-MM-yy")
        const newShift: Shift = {
          id: uuidv4(),
          start: formatISO(start),
          end: formatISO(end),
          worker: name,
        }
        // for roll back if the mutation wiil return error
        const previousShifts = queryClient.getQueryData<Shift[]>([
          "shifts",
          { day },
        ])

        // Optimistically update to the new value
        if (previousShifts) {
          queryClient.setQueryData<{ allShifts: Shift[] }>(
            ["shifts", { day }],
            (old) => {
              const { allShifts: oldShifts } = old
              return {
                allShifts: [...oldShifts, newShift],
              }
            }
          )
        }

        return () =>
          queryClient.setQueryData(["shifts", { day }], previousShifts)
      },
      onSettled: ({ createShift }) => {
        const day = format(new Date(createShift.start), "dd-MM-yy")
        return queryClient.invalidateQueries(["shifts", { day }])
      },
      ...defaultMutationOptions,
    }
  )
}

function useDeleteShift() {
  const queryClient = useQueryClient()
  const defaultMutationOptions = getDefualtMutationOptions()
  return useMutation(
    ({ id: shiftId }) => request(endpoint, deleteShift, { shiftId }),
    {
      onMutate(removedItem: { id: string; start: string }) {
        const day = format(new Date(removedItem.start), "dd-MM-yy")
        const previousShifts = queryClient.getQueryData<Shift[]>([
          "shifts",
          { day },
        ])
        queryClient.setQueryData<{ allShifts: Shift[] }>(
          ["shifts", { day }],
          (old) => {
            const { allShifts: shifts } = old
            const newData = shifts.filter((s) => s.id !== removedItem.id)
            return { allShifts: newData }
          }
        )
        return () =>
          queryClient.setQueryData(["shifts", { day }], previousShifts)
      },
      onSettled: ({ deleteShift }) => {
        console.log("onSettled", { deleteShift })
        const day = format(new Date(deleteShift.start), "dd-MM-yy")
        return queryClient.invalidateQueries(["shifts", { day }])
      },
      ...defaultMutationOptions,
    }
  )
}

export { useCreateShifts, useShifts, useDeleteShift }
