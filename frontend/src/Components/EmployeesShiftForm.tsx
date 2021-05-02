import { Spinner } from "@chakra-ui/spinner"
import * as React from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { Employee } from "../generates"
import { useActiveEmployees } from "../utils/employees"
import { useCreateShifts } from "../utils/shifts"
import { EmployeeAutocomplete } from "./EmployeeAutocomplete"
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
  const [reset, setReset] = React.useState(false)

  if (isIdle) return null
  if (isLoading) return <Spinner />
  if (isError) {
    return <ErrorBox error={error} />
  }

  function onSubmit<EmployeeFormData>(data: EmployeeFormData) {
    create(data)
    setReset(true)
  }

  return (
    <FormProvider {...methods}>
      <FormBar submitAction={onSubmit}>
        <Controller
          render={({ field: { ref, onChange, ...rest } }) => (
            <EmployeeAutocomplete
              employees={employees}
              onChange={onChange}
              reset={reset}
              setReset={setReset}
              {...rest}
            />
          )}
          control={methods.control}
          name="employee"
        />
        <TimeInput name="start" />
        <TimeInput name="end" />
        <FormButton text="add" />
      </FormBar>
    </FormProvider>
  )
}
