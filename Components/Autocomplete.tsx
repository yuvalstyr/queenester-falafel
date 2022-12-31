import { Employee } from ".prisma/client"
import { Box } from "@chakra-ui/layout"
import { InvestmentType } from "@prisma/client"
import { useCombobox } from "downshift"
import * as React from "react"
import { ComboboxInput, ComboboxItem, ComboboxList } from "../styles/combobox"
import { autocompleteIdentity, AutocompleteTypes } from "../types"

type AutoCompleteProps = {
  data: AutocompleteTypes
  onChange: (...event: any[]) => void
  reset: boolean
  setReset: React.Dispatch<React.SetStateAction<boolean>>
  label: string
}

export function Autocomplete({
  data,
  onChange,
  reset,
  setReset,
  label,
}: AutoCompleteProps) {
  const [inputItems, setInputItems] = React.useState(data)
  const items = autocompleteIdentity(data)

  const itemToString = (item: Employee | InvestmentType) => item?.name || ""

  const {
    getInputProps,
    isOpen,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    setInputValue,
    openMenu,
  } = useCombobox({
    items: inputItems,
    itemToString,

    onInputValueChange: ({ inputValue }) => {
      const newList = data.filter((item) =>
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
      <Box>
        <ComboboxInput {...getInputProps({ label, onFocus: openMenu })} />
        <ComboboxList isOpen={isOpen} {...getMenuProps()} zIndex="5">
          {items?.map((item, index: number) => {
            return (
              <ComboboxItem
                {...getItemProps({ item, index: index })}
                itemIndex={index}
                highlightedIndex={highlightedIndex}
                key={item.id}
              >
                {item.name}
              </ComboboxItem>
            )
          })}
        </ComboboxList>
      </Box>
    </Box>
  )
}
