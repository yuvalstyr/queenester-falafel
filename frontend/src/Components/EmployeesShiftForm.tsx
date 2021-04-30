import { Spinner } from "@chakra-ui/spinner"
import * as React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useActiveEmployees } from "../utils/employees"
import { useCreateShifts } from "../utils/shifts"
import { EmployeeSelect } from "./EmployeeSelect"
import { ErrorBox } from "./ErrorBox"
import { FormBar } from "./FormBar"
import { FormButton } from "./FormButton"
import { TimeInput } from "./TimeInput"

export type EmployeeFormData = {
  employee: number
  start: Date
  end: Date
}

export function EmployeesShiftForm() {
  const methods = useForm<EmployeeFormData>({
    reValidateMode: "onChange",
    shouldFocusError: true,
  })

  const {
    data: { allEmployees: employees },
    isLoading,
    isIdle,
    isError,
    error,
  } = useActiveEmployees()

  const { mutate: create } = useCreateShifts()

  if (isIdle) return null
  if (isLoading) return <Spinner />
  if (isError) {
    return <ErrorBox error={error} />
  }

  function onSubmit<EmployeeFormData>(data: EmployeeFormData) {
    create(data)
  }

  return (
    <FormProvider {...methods}>
      <FormBar submitAction={onSubmit}>
        <EmployeeSelect employees={employees} />
        <TimeInput name="start" />
        <TimeInput name="end" />
        <FormButton text="add" />
      </FormBar>
    </FormProvider>
  )
}
