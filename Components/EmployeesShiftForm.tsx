import { Select } from "@chakra-ui/react"
import { Spinner } from "@chakra-ui/spinner"
import { format } from "date-fns"
import * as React from "react"
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form"
import { useActiveEmployees } from "../queries/employees"
import { useCreateShifts } from "../queries/shifts"
import { DateTimeInput } from "./DateTimeInput"
import { ErrorBox } from "./ErrorBox"
import { FormBar } from "./FormBar"
import { FormButton } from "./FormButton"

export type EmployeeFormData = {
  employee: string
  start: Date
  end: Date
}

export function EmployeesShiftForm({ date }: { date: Date }) {
  const methods = useForm<EmployeeFormData>({
    reValidateMode: "onChange",
    shouldFocusError: true,
  })
  const { isIdle, isLoading, isError, data, error } = useActiveEmployees()

  const { mutate: create } = useCreateShifts()
  const [reset, setReset] = React.useState(false)

  if (isIdle) return null
  if (isLoading) return <Spinner />
  if (isError) {
    return <ErrorBox error={error} />
  }
  type onSubmit = SubmitHandler<EmployeeFormData>
  function onSubmit(data: EmployeeFormData) {
    console.log("employee submit", data)
    const startDate = format(data.start, "yyyy-MM-dd")
    const startTime = format(data.start, "HH:mm")
    const endDate = format(data.end, "yyyy-MM-dd")
    const endTime = format(data.end, "HH:mm")
    const { employee } = data
    create({ worker: employee, startDate, startTime, endDate, endTime })
    setReset(true)
  }

  return (
    <FormProvider {...methods}>
      <FormBar submitAction={onSubmit}>
        <Controller
          rules={{ required: true }}
          render={({ field: { ref, onChange, ...rest } }) => (
            <Select>
              {data.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </Select>
          )}
          control={methods.control}
          name="employee"
        />
        <DateTimeInput name="start" date={date} />
        <DateTimeInput name="end" date={date} />
        <FormButton text="add" />
      </FormBar>
    </FormProvider>
  )
}
