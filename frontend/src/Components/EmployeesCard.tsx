import * as React from "react"
import { ShiftList } from "./ShiftList"
import { EmployeesShiftForm } from "./EmployeesShiftForm"
import { FormCard } from "./FormCard"

export type EmployeeFormInputs = {
  name: HTMLInputElement
  start: HTMLInputElement
  end: HTMLInputElement
}

export interface EmployeeFormElements extends HTMLFormElement {
  readonly elements: FormElements
}

type FormElements = EmployeeFormInputs & HTMLFormControlsCollection

export function EmployeesCard(): JSX.Element {
  return (
    <FormCard title={"Employees"}>
      <EmployeesShiftForm />
      <ShiftList />
    </FormCard>
  )
}
