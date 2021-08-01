import { InvestmentType } from "@prisma/client"
import { ClientError } from "graphql-request"
import { useQuery } from "react-query"
import { client } from "../utils/client"

function useInvestmentTypes() {
  const results = useQuery<InvestmentType[], ClientError>({
    queryKey: "investmentTypes",
    queryFn: () => client({ endpoint: "investment", method: "GET" }),
  })

  return { ...results }
}

export { useInvestmentTypes }
