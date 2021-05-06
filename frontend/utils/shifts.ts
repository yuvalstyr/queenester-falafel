import { Employee, Shift } from ".prisma/client"
import { format, formatISO } from "date-fns"
import request, { ClientError, gql } from "graphql-request"
import getConfig from "next/config"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { v4 as uuidv4 } from "uuid"
import { EmployeeFormData } from "../Components/EmployeesShiftForm"
import { client } from "./client"

const { publicRuntimeConfig } = getConfig()
const endpoint = publicRuntimeConfig.GRAPHQL_URL

const deleteShift = gql`
  mutation deleteShift($shiftId: ID!) {
    deleteShift(id: $shiftId) {
      id
      start
    }
  }
`

type ShiftWithWorker = Shift & { Employee: Employee }

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
  const day = format(new Date(startDay), "yyyy-MM-dd")
  const results = useQuery<ShiftWithWorker[], ClientError>({
    queryKey: ["shifts", { day }],
    queryFn: () => client({ endpoint: `shifts\\${day}`, method: "GET" }),
  })
  return { ...results }
}

function useCreateShifts() {
  const queryClient = useQueryClient()
  // defualt mutation behaviors
  const defaultMutationOptions = getDefualtMutationOptions()
  return useMutation(
    (data: EmployeeFormData) => {
      return client({ data, endpoint: "shifts", method: "POST" })
    },
    {
      onMutate(newItem: EmployeeFormData) {
        const employees = queryClient.getQueryData<Employee[]>("employees")
        const employee = employees.filter((e) => e.id === newItem.employee)[0]
        const { start, end } = newItem
        const newShift: ShiftWithWorker = {
          id: uuidv4(),
          start: start,
          end: end,
          worker: employee.id,
          Employee: employee,
        }
        // day is used as cache key
        const day = format(new Date(start), "yyyy-MM-dd")
        // for roll back if the mutation wiil return error
        const previousShifts = queryClient.getQueryData<Shift[]>([
          "shifts",
          { day },
        ])

        // Optimistically update to the new value
        if (previousShifts) {
          queryClient.setQueryData<Shift[]>(["shifts", { day }], (old) => [
            ...old,
            newShift,
          ])
        }

        return () =>
          queryClient.setQueryData(["shifts", { day }], previousShifts)
      },
      onSettled: (shift) => {
        console.log("onSettled", shift)
        const day = format(new Date(shift.start), "yyyy-MM-dd")
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
    ({ id }) => client({ endpoint: `shifts\\${id}`, method: "DELETE" }),
    {
      onMutate(removedItem: { id: string; start: string }) {
        const day = format(new Date(removedItem.start), "yyyy-MM-dd")
        // for roll back if the mutation wiil return error
        const previousShifts = queryClient.getQueryData<Shift[]>([
          "shifts",
          { day },
        ])

        queryClient.setQueryData<Shift[]>(["shifts", { day }], (old) => {
          // filtered deleted item from cache
          return old.filter((s) => s.id !== removedItem.id)
        })
        return () =>
          queryClient.setQueryData(["shifts", { day }], previousShifts)
      },
      onSettled: (deleteShift) => {
        const day = format(new Date(deleteShift.start), "yyyy-MM-dd")
        return queryClient.invalidateQueries(["shifts", { day }])
      },
      ...defaultMutationOptions,
    }
  )
}

export { useCreateShifts, useShifts, useDeleteShift }
