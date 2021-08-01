import * as React from "react"
import { ShiftList } from "./ShiftList"
import { EmployeesShiftForm } from "./EmployeesShiftForm"
import { FormCard } from "./FormCard"
import { ISelectedDate } from "./Forms"

export function EmployeesCard({ date }: ISelectedDate): JSX.Element {
  return (
    <FormCard title={"Employees"}>
      <EmployeesShiftForm date={date} />
      <ShiftList date={date} />
    </FormCard>
  )
}
