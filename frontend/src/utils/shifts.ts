import { format } from "date-fns"
import request, { ClientError, gql } from "graphql-request"
import getConfig from "next/config"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { EmployeeFormData } from "../Components/EmployeesShiftForm"
import { Employee, Query, Shift } from "../generates"
const { publicRuntimeConfig } = getConfig()
const endpoint = publicRuntimeConfig.GRAPHQL_URL

const shifts = gql`
  query shifts {
    allShifts {
      id
      start
      end
      worker {
        name
      }
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

function useShifts() {
  const result = useQuery<QueryReturnShifts, ClientError>({
    queryKey: "shifts",
    queryFn: () => request(endpoint, shifts),
  })

  return { ...result, data: result.data ?? { allShifts: [] } }
}

function useCreateShifts() {
  const queryClient = useQueryClient()

  // defualt mutation behivors
  const defaultMutationOptions = {
    onError: (_err, _variables, recover) =>
      typeof recover === "function" ? recover() : null,
    onSettled: () => queryClient.invalidateQueries("shifts"),
  }

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
          id: "tbd",
          // start: start.toISOString(),
          start: "1",
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

export { useCreateShifts, useShifts }
