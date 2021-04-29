import { format, startOfDay } from "date-fns"
import request, { ClientError, gql } from "graphql-request"
import getConfig from "next/config"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { v4 as uuidv4 } from "uuid"
import { Expense, Query } from "../generates"
import { DayBoundary } from "./shifts"

const { publicRuntimeConfig } = getConfig()
const endpoint = publicRuntimeConfig.GRAPHQL_URL

const expense = gql`
  query expense($startDay: String, $endDay: String) {
    allExpenses(where: { date_gte: $startDay, date_lt: $endDay }) {
      id
      date
      name
      cost
    }
  }
`

const deleteExpense = gql`
  mutation deleteExpense($expenseId: ID!) {
    deleteExpense(id: $expenseId) {
      id
      date
    }
  }
`

const createExpense = gql`
  mutation createExpense($date: String!, $name: String!, $cost: Float!) {
    createExpense(data: { date: $date, name: $name, cost: $cost }) {
      id
      date
    }
  }
`
type QueryReturnExpense = { allExpenses: Query["allExpenses"] }

function getDefualtMutationOptions() {
  return {
    onError: (_err, _variables, recover) =>
      typeof recover === "function" ? recover() : null,
  }
}

function useExpense({ endDay, startDay }: DayBoundary) {
  const day = format(startOfDay(new Date(startDay)), "dd-MM-yy")
  const result = useQuery<QueryReturnExpense, ClientError>({
    queryKey: ["expense", { day }],
    queryFn: () => request(endpoint, expense, { startDay, endDay }),
  })

  return { ...result, data: result.data ?? { allExpenses: [] } }
}

function useCreateExpense() {
  const queryClient = useQueryClient()
  // defualt mutation behivors
  const defaultMutationOptions = getDefualtMutationOptions()

  return useMutation(
    (data: Expense) => {
      return request(endpoint, createExpense, {
        ...data,
      })
    },
    {
      onMutate(newItem: Expense) {
        const day = format(new Date(newItem.date), "dd-MM-yy")
        // for roll back if the mutation wiil return error
        const previousExpense = queryClient.getQueryData<Expense[]>([
          "expense",
          { day },
        ])
        // Optimistically update to the new value
        if (previousExpense) {
          queryClient.setQueryData<{ allExpenses: Expense[] }>(
            ["expense", { day }],
            (old) => {
              const { allExpenses: oldExpense } = old
              return {
                allExpenses: [...oldExpense, { ...newItem, id: uuidv4() }],
              }
            }
          )
        } else {
          queryClient.setQueryData<{ allExpenses: Expense[] }>(
            ["expense", { day }],
            {
              allExpenses: [newItem],
            }
          )
        }
        return () => queryClient.setQueryData("expense", previousExpense)
      },
      onSettled: ({ createExpense }) => {
        const day = format(new Date(createExpense.date), "dd-MM-yy")
        return queryClient.invalidateQueries(["expense", { day }])
      },
      ...defaultMutationOptions,
    }
  )
}
function useDeleteExpense() {
  const queryClient = useQueryClient()
  const defaultMutationOptions = getDefualtMutationOptions()
  return useMutation(
    ({ id: expenseId }) => request(endpoint, deleteExpense, { expenseId }),
    {
      onMutate(removedItem: { id: string; date: Date }) {
        const day = format(new Date(removedItem.date), "dd-MM-yy")
        const previousExpnse = queryClient.getQueryData<Expense[]>([
          "expense",
          { day },
        ])
        queryClient.setQueryData<{ allExpenses: Expense[] }>(
          ["expense", { day }],
          (old) => {
            const { allExpenses: expense } = old
            const newData = expense.filter((s) => s.id !== removedItem.id)
            return { allExpenses: newData }
          }
        )
        return () =>
          queryClient.setQueryData(["expense", { day }], previousExpnse)
      },
      ...defaultMutationOptions,
    }
  )
}

export { useCreateExpense, useExpense, useDeleteExpense }
