import { Box } from "@chakra-ui/layout"
import { useBreakpointValue } from "@chakra-ui/media-query"
import { addDays } from "date-fns"
import * as React from "react"
import DatePicker from "react-datepicker"
import { useController, useFormContext } from "react-hook-form"
import { InputWithLabel, TextLabel } from "./InputWithLabel"

export type EmployeeFormInputs = {
  name: HTMLInputElement
  start: HTMLInputElement
  end: HTMLInputElement
}

type inputType = keyof EmployeeFormInputs

const DateInput = React.forwardRef<HTMLInputElement, any>(
  ({ ...props }, ref) => {
    return (
      <Box
        _focusWithin={{
          transform: "scale(1.05,1.05)",
        }}
      >
        <InputWithLabel ref={ref} placeholder="_" {...props} />
        <TextLabel>{props.label}</TextLabel>
      </Box>
    )
  }
)

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
  const [date, setDate] = React.useState(null)
  React.useEffect(() => {
    if (typeof value === "undefined") {
      setDate(null)
    }
  }, [value])
  const delta = name === "end" ? 1 : 0

  return (
    <DatePicker
      placeholderText="date"
      selected={value}
      showTimeSelect
      timeFormat="HH:mm"
      dateFormat="d/M HH:mm"
      timeIntervals={15}
      autoComplete="off"
      popperPlacement="top-end"
      // TODO  change the iclude date to the day the user picks
      includeDates={[new Date(), addDays(new Date(), delta)]}
      {...inputProps}
      customInput={<DateInput label="date" />}
    />
  )
}
