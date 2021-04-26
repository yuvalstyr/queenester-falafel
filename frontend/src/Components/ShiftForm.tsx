import { VStack } from "@chakra-ui/layout"
import * as React from "react"
import { EmployeesCard } from "./EmployeesCard"
import { ExpenseCard } from "./ExpenseCard"

export function ShiftForm() {
  return (
    <VStack>
      <EmployeesCard />
      <ExpenseCard />
    </VStack>
  )
}
