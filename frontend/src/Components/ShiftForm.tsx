import { VStack } from "@chakra-ui/layout"
import * as React from "react"
import { EmployeesCard } from "./EmployeesCard"
import { Expense } from "./Expense"

export function ShiftForm() {
  return (
    <VStack>
      <EmployeesCard />
      <Expense />
    </VStack>
  )
}
