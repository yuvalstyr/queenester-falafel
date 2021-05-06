import { Employee } from ".prisma/client"
import request, { ClientError, gql } from "graphql-request"
import getConfig from "next/config"
import { useQuery } from "react-query"
import { Query } from "../generates"
import { client } from "./client"

function useActiveEmployees() {
  const results = useQuery<Employee[], ClientError>({
    queryKey: "employees",
    queryFn: () => client({ endpoint: "employees", method: "GET" }),
  })

  return { ...results }
}

export { useActiveEmployees }