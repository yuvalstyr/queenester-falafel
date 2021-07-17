import { Profit } from ".prisma/client"
import { format } from "date-fns"
import { ClientError } from "graphql-request"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { v4 as uuidv4 } from "uuid"
import { client } from "../utils/client"

function getDefaultMutationOptions() {
  return {
    onError: (_err, _variables, recover) =>
      typeof recover === "function" ? recover() : null,
  }
}

function useProfit({ day }: { day: string }) {
  const result = useQuery<Profit[], ClientError>({
    queryKey: ["profit", day],
    queryFn: () => client({ endpoint: `profit\\${day}`, method: "GET" }),
  })

  return { ...result }
}

function useCreateProfit() {
  const queryClient = useQueryClient()
  // default mutation behaviors
  const defaultMutationOptions = getDefaultMutationOptions()

  return useMutation(
    (data: Profit) => {
      return client({ data, endpoint: "profit", method: "POST" })
    },
    {
      onMutate(newItem: Profit) {
        const day = newItem.date

        // for roll back if the mutation will return error
        const previousProfit = queryClient.getQueryData<Profit[]>([
          "profit",
          day,
        ])
        // Optimistically update to the new value
        if (previousProfit) {
          queryClient.setQueryData<Profit[]>(["profit", day], (old) => {
            return [...old, { ...newItem, id: uuidv4(), optimistic: true }]
          })
        } else {
          queryClient.setQueryData<Profit[]>(["profit", day], [newItem])
        }
        return () => queryClient.setQueryData("profit", previousProfit)
      },
      onSettled: (profit) => {
        const day = format(new Date(profit.date), "yyyy-MM-dd")
        return queryClient.invalidateQueries(["profit", day])
      },
      ...defaultMutationOptions,
    }
  )
}
function useDeleteProfit() {
  const queryClient = useQueryClient()
  const defaultMutationOptions = getDefaultMutationOptions()
  return useMutation(
    ({ id: profitId }) =>
      client({ endpoint: `profit\\${profitId}`, method: "DELETE" }),
    {
      onMutate(removedItem: { id: string; date: Date }) {
        const day = format(new Date(removedItem.date), "yyyy-MM-dd")
        const previousExpanse = queryClient.getQueryData<Profit[]>([
          "profit",
          { day },
        ])
        queryClient.setQueryData<Profit[]>(["profit", day], (old) => {
          const newData = old.filter((s) => s.id !== removedItem.id)
          return newData
        })
        return () => queryClient.setQueryData(["profit", day], previousExpanse)
      },
      ...defaultMutationOptions,
    }
  )
}

export { useCreateProfit, useProfit, useDeleteProfit }
