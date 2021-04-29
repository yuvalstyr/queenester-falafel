import request, { ClientError, gql } from "graphql-request"
import getConfig from "next/config"
import { QueryClient, useMutation, useQuery, useQueryClient } from "react-query"
import { Expense, Query } from "../generates"
import { v4 as uuidv4 } from "uuid"

const { publicRuntimeConfig } = getConfig()
const endpoint = publicRuntimeConfig.GRAPHQL_URL

const expense = gql`
  query expense {
    allExpenses {
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
    }
  }
`

const createExpense = gql`
  mutation createExpense($date: String!, $name: String!, $cost: Float!) {
    createExpense(data: { date: $date, name: $name, cost: $cost }) {
      id
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

function useExpense() {
  const result = useQuery<QueryReturnExpense, ClientError>({
    queryKey: "expense",
    queryFn: () => request(endpoint, expense),
  })

  return { ...result, data: result.data ?? { allExpenses: [] } }
}

function useCreateExpense() {
  const queryClient = useQueryClient()
  // defualt mutation behivors
  const defaultMutationOptions = getDefualtMutationOptions({ queryClient })

  return useMutation(
    (data: Expense) => {
      return request(endpoint, createExpense, {
        ...data,
      })
    },
    {
      onMutate(newItem: Expense) {
        const day = format(new Date(start), "dd-MM-yy")
        // for roll back if the mutation wiil return error
        const previousExpense = queryClient.getQueryData<Expense[]>("expense")
        // Optimistically update to the new value
        if (previousExpense) {
          queryClient.setQueryData<{ allExpenses: Expense[] }>(
            "expense",
            (old) => {
              const { allExpenses: oldExpense } = old
              return {
                allExpenses: [...oldExpense, { ...newItem, id: uuidv4() }],
              }
            }
          )
        } else {
          queryClient.setQueryData<{ allExpenses: Expense[] }>("expense", {
            allExpenses: [newItem],
          })
        }
        return () => queryClient.setQueryData("expense", previousExpense)
      },
      onSettled: () => queryClient.invalidateQueries("expense"),
      ...defaultMutationOptions,
    }
  )
}
function useDeleteExpense() {
  const queryClient = useQueryClient()
  const defaultMutationOptions = getDefualtMutationOptions({ queryClient })
  return useMutation(
    (expenseId) => request(endpoint, deleteExpense, { expenseId }),
    {
      onMutate(removedItem: String) {
        const previousExpnse = queryClient.getQueryData<Expense[]>("expense")
        queryClient.setQueryData<{ allExpenses: Expense[] }>(
          "expense",
          (old) => {
            const { allExpenses: expense } = old
            const newData = expense.filter((s) => s.id !== removedItem)
            return { allExpenses: newData }
          }
        )
        return () => queryClient.setQueryData("expense", previousExpnse)
      },
      ...defaultMutationOptions,
    }
  )
}

export { useCreateExpense, useExpense, useDeleteExpense }
