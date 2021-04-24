import * as React from "react"
import { VStack } from "@chakra-ui/layout"
import { EmployeesCard } from "./EmployeesCard"
import { Expense } from "./Expense"
import { Employee } from "../generates"

export function ShiftForm({ data }: { data: { employees: Employee[] } }) {
  return (
    <VStack>
      <EmployeesCard employees={data.employees} />
      <Expense />
    </VStack>
  )
}
