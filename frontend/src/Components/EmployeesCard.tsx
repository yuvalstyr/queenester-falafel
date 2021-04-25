import * as React from "react"
import { ShiftList } from "./ShiftList"
import { EmployeesShiftForm } from "./EmployeesShiftForm"
import { FormCard } from "./FormCard"

export function EmployeesCard(): JSX.Element {
  return (
    <FormCard title={"Employees"}>
      <EmployeesShiftForm />
      <ShiftList />
    </FormCard>
  )
}
