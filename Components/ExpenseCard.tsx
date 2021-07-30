import * as React from "react"
import ExpenseForm from "./ExpenseForm"
import ExpenseList from "./ExpenseList"
import { FormCard } from "./FormCard"
import { ISelectedDate } from "./Forms"

export function ExpenseCard({ date }: ISelectedDate) {
  return (
    <FormCard title={"Expense"}>
      <ExpenseForm date={date} />
      <ExpenseList date={date} />
    </FormCard>
  )
}
