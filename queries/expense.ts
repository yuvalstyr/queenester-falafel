import { InvestmentType, Prisma } from "@prisma/client"
import { Expense } from ".prisma/client"
import { format } from "date-fns"
import { ClientError } from "graphql-request"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { v4 as uuidv4 } from "uuid"
import { client } from "../utils/client"

export type ExpenseWithInvestment = Expense & {
  InvestmentType: InvestmentType
}
function getDefaultMutationOptions() {
  return {
    onError: (_err, _variables, recover) =>
      typeof recover === "function" ? recover() : null,
  }
}

function useExpense({ day }: { day: string }) {
  const result = useQuery<ExpenseWithInvestment[], ClientError>({
    queryKey: ["expense", day],
    queryFn: () => client({ endpoint: `expense\\${day}`, method: "GET" }),
  })

  return { ...result }
}

function useCreateExpense() {
  const queryClient = useQueryClient()
  // default mutation behaviors
  const defaultMutationOptions = getDefaultMutationOptions()

  return useMutation(
    (data: ExpenseWithInvestment) => {
      return client({ data, endpoint: "expense", method: "POST" })
    },
    {
      onMutate(newItem: Expense) {
        const investmentTypes =
          queryClient.getQueryData<InvestmentType[]>("investmentTypes")
        const investmentType = investmentTypes.filter(
          (i) => i.id === newItem.investmentTypeId
        )[0]
        const day = newItem.date
        const newExpense: ExpenseWithInvestment = {
          ...newItem,
          id: uuidv4(),
          optimistic: true,
          InvestmentType: investmentType,
        }
        // for roll back if the mutation will return error
        const previousExpense = queryClient.getQueryData<
          ExpenseWithInvestment[]
        >(["expense", day])
        // Optimistically update to the new value
        if (previousExpense) {
          queryClient.setQueryData<Expense[]>(["expense", day], (old) => {
            return [...old, newExpense]
          })
        } else {
          queryClient.setQueryData<Expense[]>(["expense", day], [newItem])
        }
        return () => queryClient.setQueryData("expense", previousExpense)
      },
      onSettled: (expense) => {
        const day = format(new Date(expense.date), "yyyy-MM-dd")
        return queryClient.invalidateQueries(["expense", day])
      },
      onSuccess: (_data, expense) => {
        queryClient.refetchQueries(["aggregate", expense.date])
      },
      ...defaultMutationOptions,
    }
  )
}
function useDeleteExpense() {
  const queryClient = useQueryClient()
  const defaultMutationOptions = getDefaultMutationOptions()
  return useMutation(
    ({ id: expenseId }) =>
      client({ endpoint: `expense\\${expenseId}`, method: "DELETE" }),

    {
      onMutate(removedItem: { id: string; date: Date }) {
        const day = format(new Date(removedItem.date), "yyyy-MM-dd")
        const previousExpanse = queryClient.getQueryData<Expense[]>([
          "expense",
          { day },
        ])
        queryClient.setQueryData<Expense[]>(["expense", day], (old) => {
          const newData = old.filter((s) => s.id !== removedItem.id)
          return newData
        })
        return () => queryClient.setQueryData(["expense", day], previousExpanse)
      },
      onSuccess: (_data, expense) => {
        const { date } = expense
        const day = format(date, "yyyy-MM-dd")
        queryClient.refetchQueries(["aggregate", day])
      },
      ...defaultMutationOptions,
    }
  )
}

export { useCreateExpense, useExpense, useDeleteExpense }
