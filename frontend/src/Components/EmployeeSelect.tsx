import { Select } from "@chakra-ui/select"
import { Spinner } from "@chakra-ui/spinner"
import * as React from "react"
import { useController, useFormContext } from "react-hook-form"
import { Employee } from "../generates"
import { ErrorBox } from "./ErrorBox"

export function EmployeeSelect({ employees }) {
  const { control } = useFormContext()

  const {
    field: { ref, value, ...inputProps },
    fieldState: { invalid },
  } = useController({
    name: "employee",
    control,
    rules: { required: { value: true, message: "Most Pick Employee!!" } },
  })

  return (
    <Select
      {...inputProps}
      placeholder="Select Employee"
      borderColor={"blackAlpha.100"}
      isInvalid={invalid}
      maxW="300px"
    >
      {employees.map((e: Employee) => (
        <option value={e.id} key={e.id}>
          {e.name}
        </option>
      ))}
    </Select>
  )
}
