import { Employee } from ".prisma/client";
import { ClientError } from "graphql-request";
import { useQuery } from "react-query";
import { client } from "./client";

function useActiveEmployees() {
  const results = useQuery<Employee[], ClientError>({
    queryKey: "employees",
    queryFn: () => client({ endpoint: "employees", method: "GET" }),
  });

  return { ...results };
}

export { useActiveEmployees };
