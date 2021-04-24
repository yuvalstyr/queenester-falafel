import request, { ClientError, gql } from "graphql-request"
import getConfig from "next/config"
import { useQuery } from "react-query"
import { Query } from "../generates"

const { publicRuntimeConfig } = getConfig()
const endpoint = publicRuntimeConfig.GRAPHQL_URL

const activeEmpployees = gql`
  query ActiveEmployees {
    allEmployees {
      id
      name
    }
  }
`

type QueryReturn = { allEmployees: Query["allEmployees"] }

function useActiveEmployees() {
  const result = useQuery<QueryReturn, ClientError>({
    queryKey: "employees",
    queryFn: () => request(endpoint, activeEmpployees),
  })

  return { ...result, data: result.data ?? { allEmployees: [] } }
}

export { useActiveEmployees }
