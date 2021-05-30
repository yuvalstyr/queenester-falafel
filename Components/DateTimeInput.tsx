import { Box } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { addDays } from "date-fns";
import * as React from "react";
import DatePicker from "react-datepicker";
import { useController, useFormContext } from "react-hook-form";
import { InputWithLabel, TextLabel } from "./InputWithLabel";

export type EmployeeFormInputs = {
  name: HTMLInputElement;
  start: HTMLInputElement;
  end: HTMLInputElement;
};

type inputType = keyof EmployeeFormInputs;

const DateInput = React.forwardRef<HTMLInputElement, any>(
  ({ ...props }, ref) => {
    return (
      <Box
        _focusWithin={{
          transform: "scale(1.05,1.05)",
        }}
      >
        <InputWithLabel placeholder="_" {...props} downshiftRef={ref} />
        <TextLabel>{props.label}</TextLabel>
      </Box>
    );
  }
);

type DateTimeInputProps = {
  name: inputType;
  date: Date;
};

export function DateTimeInput({ name, date: pickedDate }: DateTimeInputProps) {
  const { control } = useFormContext();
  const size = useBreakpointValue({ base: "sm", md: "md" });
  const {
    field: { ref, value, ...inputProps },
  } = useController({
    name,
    control,
    rules: { required: { value: true, message: "Most Pick Date!!" } },
  });

  const delta = name === "end" ? 1 : 0;
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
      withPortal={size === "sm" ? true : false}
      includeDates={[
        new Date(pickedDate),
        addDays(new Date(pickedDate), delta),
      ]}
      {...inputProps}
      customInput={<DateInput label="date" />}
    />
  );
}
