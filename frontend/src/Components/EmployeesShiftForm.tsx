import { HStack } from "@chakra-ui/layout"
import { Spinner } from "@chakra-ui/spinner"
import * as React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useActiveEmployees } from "../utils/employees"
import { useCreateShifts } from "../utils/shifts"
import { EmployeeSelect } from "./EmployeeSelect"
import { ErrorBox } from "./ErrorBox"
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

  const onSubmit = (data: EmployeeFormData) => {
    create(data)
  }

  return (
    <FormProvider {...methods}>
      <HStack
        as="form"
        borderWidth="1px"
        borderColor="black"
        shadow="md"
        p="4"
        borderRadius="md"
        color="black"
        onSubmit={methods.handleSubmit(onSubmit)}
        justifyContent="center"
      >
        <EmployeeSelect employees={employees} />
        <TimeInput name="start" />
        <TimeInput name="end" />
        <FormButton />
      </HStack>
    </FormProvider>
  )
}
