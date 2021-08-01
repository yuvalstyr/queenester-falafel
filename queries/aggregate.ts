import { ClientError } from "graphql-request"
import { useQuery, useQueryClient } from "react-query"
import { client } from "../utils/client"

export type Groupby = {
  income: { [key: string]: number }
  cost: { [key: string]: number }
}

function useAggregate({ day }: { day: string }) {
  const result = useQuery<Groupby, ClientError>({
    queryKey: ["aggregate", day],
    queryFn: () => client({ endpoint: `aggregate/${day}`, method: "GET" }),
  })

  return { ...result }
}

export { useAggregate }
