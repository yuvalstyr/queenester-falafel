import { Input } from "@chakra-ui/input"
import { useBreakpointValue } from "@chakra-ui/media-query"
import { addDays } from "date-fns"
import * as React from "react"
import DatePicker from "react-datepicker"
import { useController, useFormContext } from "react-hook-form"

export type EmployeeFormInputs = {
  name: HTMLInputElement
  start: HTMLInputElement
  end: HTMLInputElement
}

type inputType = keyof EmployeeFormInputs

export function TimeInput({ name }: { name: inputType }) {
  const { control } = useFormContext()
  const size = useBreakpointValue({ base: "sm", md: "md" })
  const {
    field: { ref, value, ...inputProps },
    fieldState: { invalid },
  } = useController({
    name,
    control,
    rules: { required: { value: true, message: "Most Pick Date!!" } },
  })
  const delta = name === "end" ? 1 : 0
  return (
    <DatePicker
      placeholderText="Select date"
      {...inputProps}
      selected={value}
      showTimeSelect
      timeFormat="HH:mm"
      dateFormat="d/M HH:mm"
      timeIntervals={15}
      // TODO  change the iclude date to the day the user picks
      includeDates={[new Date(), addDays(new Date(), delta)]}
      customInput={
        <Input
          isInvalid={invalid}
          borderColor="blackAlpha.100"
          color="black"
          fontSize="inherit"
          size={size}
          p={{ base: "1", md: "4" }}
          _placeholder={{ color: "black" }}
          autoComplete="off"
        />
      }
    />
  )
}
