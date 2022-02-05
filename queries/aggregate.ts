import { ClientError } from "graphql-request"
import { useQuery } from "react-query"
import { client } from "../utils/client"

export type GroupBy = {
  income: { [key: string]: number }
  cost: { [key: string]: number }
  employeeWeeklyCost: { [key: string]: { wage: number; count: number } }
}

function useAggregate({ day }: { day: string }) {
  const result = useQuery<GroupBy, ClientError>({
    queryKey: ["aggregate", day],
    queryFn: () => client({ endpoint: `aggregate/${day}`, method: "GET" }),
  })

  return { ...result }
}

export { useAggregate }
