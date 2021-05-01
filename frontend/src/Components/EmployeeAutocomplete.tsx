import { Box, Flex } from "@chakra-ui/layout"
import { useCombobox } from "downshift"
import * as React from "react"
import { useController, useFormContext } from "react-hook-form"
import { Employee } from "../generates"
import { ComboboxInput, ComboboxItem, ComboboxList } from "../styles/combobox"

export function EmployeeAutocomplete({ employees }: { employees: Employee[] }) {
  const { control } = useFormContext()
  const [inputItems, setInputItems] = React.useState(employees)
  const itemToString = (item) => item?.name || ""
  const {
    getInputProps,
    isOpen,
    getComboboxProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox({
    items: inputItems,
    itemToString,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        employees.filter((item) =>
          itemToString(item).toLowerCase().startsWith(inputValue.toLowerCase())
        )
      )
    },
    onSelectedItemChange({ selectedItem }) {
      console.log({ selectedItem })
    },
  })
  const {
    field: { ref, value, ...inputProps },
    fieldState: { invalid },
  } = useController({
    name: "employee",
    control,
    rules: { required: { value: true, message: "Most Pick Employee!!" } },
  })

  return (
    <Box position="relative">
      <Box {...getComboboxProps()}>
        <ComboboxInput {...getInputProps()} placeholder="Employee..." />
        <ComboboxList isOpen={isOpen} {...getMenuProps()}>
          {inputItems.map((e, index) => (
            <ComboboxItem
              {...getItemProps({ item: e.name, index: index })}
              itemIndex={index}
              highlightedIndex={highlightedIndex}
              key={e.id}
            >
              {e.name}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </Box>
    </Box>
  )
}
