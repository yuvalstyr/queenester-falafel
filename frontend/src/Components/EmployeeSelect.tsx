import { Select } from "@chakra-ui/select"
import * as React from "react"
import { useController, useFormContext } from "react-hook-form"
import { Employee } from "../generates"

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
      maxW={{ base: "125px", md: "300px" }}
      pl="0"
      paddingInlineStart="0"
      fontSize={{ base: "xx-small", md: "md" }}
    >
      {employees.map((e: Employee) => (
        <option value={e.id} key={e.id}>
          {e.name}
        </option>
      ))}
    </Select>
  )
}
