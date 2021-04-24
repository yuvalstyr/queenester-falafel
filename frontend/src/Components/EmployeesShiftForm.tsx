import { HStack } from "@chakra-ui/layout"
import * as React from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useCreateShifts } from "../utils/shifts"
import { EmployeeSelect } from "./EmployeeSelect"
import { FormButton } from "./FormButton"
import { TimeInput } from "./TimeInput"

export type EmployeeFormData = {
  employee: number
  start: Date
  end: Date
}

export function EmployeesShiftForm({ employees }) {
  const methods = useForm<EmployeeFormData>({
    reValidateMode: "onChange",
    shouldFocusError: true,
  })
  const { mutate } = useCreateShifts()

  const onSubmit = (data: EmployeeFormData) => {
    console.log(data)
    mutate(data)
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
