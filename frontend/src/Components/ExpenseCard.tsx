import * as React from "react"
import ExpenseForm from "./ExpenseForm"
import ExpenseList from "./ExpenseList"
import { FormCard } from "./FormCard"

export function ExpenseCard() {
  return (
    <FormCard title={"Expense"}>
      <ExpenseForm />
      <ExpenseList />
    </FormCard>
  )
}
