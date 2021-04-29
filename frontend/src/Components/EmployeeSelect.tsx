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
      placeholder="Employee"
      borderColor={"blackAlpha.100"}
      isInvalid={invalid}
      width="200px"
      maxW={{ base: "125px", md: "300px" }}
      fontSize={{ base: "x-sm", md: "md" }}
      size="sm"
      _placeholder={{
        color: "blackAlpha.400",
      }}
    >
      {employees.map((e: Employee) => (
        <option value={e.id} key={e.id}>
          {e.name}
        </option>
      ))}
    </Select>
  )
}
