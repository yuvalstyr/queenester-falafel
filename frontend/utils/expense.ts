import { Expense } from ".prisma/client"
import { format, startOfDay } from "date-fns"
import request, { ClientError, gql } from "graphql-request"
import getConfig from "next/config"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { v4 as uuidv4 } from "uuid"
import { client } from "./client"
import { DayBoundary } from "./shifts"

const { publicRuntimeConfig } = getConfig()
const endpoint = publicRuntimeConfig.GRAPHQL_URL

const deleteExpense = gql`
  mutation deleteExpense($expenseId: ID!) {
    deleteExpense(id: $expenseId) {
      id
      date
    }
  }
`

function getDefualtMutationOptions() {
  return {
    onError: (_err, _variables, recover) =>
      typeof recover === "function" ? recover() : null,
  }
}

function useExpense({ endDay, startDay }: DayBoundary) {
  const day = format(startOfDay(new Date(startDay)), "yyyy-MM-dd")
  const result = useQuery<Expense[], ClientError>({
    queryKey: ["expense", { day }],
    queryFn: () => client({ endpoint: `expense\\${day}`, method: "GET" }),
  })

  return { ...result }
}

function useCreateExpense() {
  const queryClient = useQueryClient()
  // defualt mutation behivors
  const defaultMutationOptions = getDefualtMutationOptions()

  return useMutation(
    (data: Expense) => {
      return client({ data, endpoint: "expense", method: "POST" })
    },
    {
      onMutate(newItem: Expense) {
        const day = format(new Date(newItem.date), "yyyy-MM-dd")
        console.log(`day`, day)
        // for roll back if the mutation wiil return error
        const previousExpense = queryClient.getQueryData<Expense[]>([
          "expense",
          { day },
        ])
        // Optimistically update to the new value
        if (previousExpense) {
          queryClient.setQueryData<Expense[]>(["expense", { day }], (old) => {
            return [...old, { ...newItem, id: uuidv4() }]
          })
        } else {
          queryClient.setQueryData<Expense[]>(["expense", { day }], [newItem])
        }
        return () => queryClient.setQueryData("expense", previousExpense)
      },
      onSettled: (expense) => {
        console.log({ expense })
        const day = format(new Date(expense.date), "yyyy-MM-dd")
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
    ({ id: expenseId }) =>
      client({ endpoint: `expense\\${expenseId}`, method: "DELETE" }),
    {
      onMutate(removedItem: { id: string; date: Date }) {
        const day = format(new Date(removedItem.date), "yyyy-MM-dd")
        const previousExpnse = queryClient.getQueryData<Expense[]>([
          "expense",
          { day },
        ])
        queryClient.setQueryData<Expense[]>(["expense", { day }], (old) => {
          const newData = old.filter((s) => s.id !== removedItem.id)
          return newData
        })
        return () =>
          queryClient.setQueryData(["expense", { day }], previousExpnse)
      },
      ...defaultMutationOptions,
    }
  )
}

export { useCreateExpense, useExpense, useDeleteExpense }
