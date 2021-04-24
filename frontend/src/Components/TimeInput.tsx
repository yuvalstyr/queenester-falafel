import { Input } from "@chakra-ui/input";
import * as React from "react";
import DatePicker from "react-datepicker";
import { Controller, useController, useFormContext } from "react-hook-form";
import { EmployeeFormInputs } from "./EmployeesCard";

type inputType = keyof EmployeeFormInputs;

export function TimeInput({ name }: { name: inputType }) {
  const { control } = useFormContext();
  const {
    field: { ref, value, ...inputProps },
    fieldState: { invalid },
  } = useController({
    name,
    control,
    rules: { required: { value: true, message: "Most Pick Date!!" } },
  });
  return (
    <DatePicker
      placeholderText="Select date"
      {...inputProps}
      selected={value}
      showTimeSelect
      inputRef={ref}
      timeFormat="HH:mm"
      dateFormat="dd/MM/yyyy h:mm aa"
      timeIntervals={15}
      customInput={
        <Input
          isInvalid={invalid}
          borderColor="blackAlpha.100"
          color="black"
          _placeholder={{ color: "black" }}
        />
      }
    />
  );
}
