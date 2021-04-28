import * as React from "react"
import { ShiftList } from "./ShiftList"
import { EmployeesShiftForm } from "./EmployeesShiftForm"
import { FormCard } from "./FormCard"
import { ISelectedDate } from "./ShiftForm"

export function EmployeesCard({ date, setDate }: ISelectedDate): JSX.Element {
  return (
    <FormCard title={"Employees"}>
      <EmployeesShiftForm />
      <ShiftList date={date} setDate={setDate} />
    </FormCard>
  )
}
