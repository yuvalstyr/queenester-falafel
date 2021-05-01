import { Box, Flex } from "@chakra-ui/layout"
import { useCombobox } from "downshift"
import * as React from "react"
import { useController, useFormContext } from "react-hook-form"
import { Employee } from "../generates"
import { ComboboxInput, ComboboxItem, ComboboxList } from "../styles/combobox"

type AutoCompleteProps = {
  employees: Employee[]
  onChange: (...event: any[]) => void
}

export function EmployeeAutocomplete({
  employees,
  onChange,
}: AutoCompleteProps) {
  const [inputItems, setInputItems] = React.useState(employees)
  const itemToString = (item: Employee) => item?.name || ""
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
      const newList = employees.filter((item) =>
        itemToString(item).toLowerCase().startsWith(inputValue.toLowerCase())
      )
      if (newList.length === 1) {
        onChange(newList[0].id)
      }
      setInputItems(newList)
    },
    onSelectedItemChange: ({ selectedItem }) => {
      onChange(selectedItem?.id || "")
    },
  })
  return (
    <Box position="relative">
      <Box {...getComboboxProps()}>
        <ComboboxInput {...getInputProps()} placeholder="Employee..." />
        <ComboboxList isOpen={isOpen} {...getMenuProps()}>
          {inputItems.map((e, index) => (
            <ComboboxItem
              {...getItemProps({ item: e, index: index })}
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
