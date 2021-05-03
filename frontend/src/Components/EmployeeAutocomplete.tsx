import { Box } from "@chakra-ui/layout"
import { useCombobox } from "downshift"
import * as React from "react"
import { Employee } from "../generates"
import { ComboboxInput, ComboboxItem, ComboboxList } from "../styles/combobox"

type AutoCompleteProps = {
  employees: Employee[]
  onChange: (...event: any[]) => void
  reset: boolean
  setReset: React.Dispatch<React.SetStateAction<boolean>>
}

export function EmployeeAutocomplete({
  employees,
  onChange,
  reset,
  setReset,
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
    setInputValue,
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

  React.useEffect(() => {
    if (reset) {
      setInputValue("")
      setReset(false)
    }
  }, [reset])

  return (
    <Box position="relative">
      <Box {...getComboboxProps()}>
        <ComboboxInput {...getInputProps({ label: "Employee" })} />
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
