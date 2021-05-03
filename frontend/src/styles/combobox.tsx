import { Box } from "@chakra-ui/layout"
import * as React from "react"
import { InputWithLabel, TextLabel } from "../Components/InputWithLabel"

const ComboboxInput = React.forwardRef<HTMLInputElement, any>(
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
type ListProps = { children: React.ReactNode; isOpen: boolean }

const ComboboxList = React.forwardRef<HTMLDivElement, ListProps>(
  ({ isOpen, ...props }, ref) => {
    return (
      <Box
        position="absolute"
        display={isOpen ? null : "none"}
        w="100%"
        {...props}
        ref={ref}
        border="1px solid"
        zIndex="2"
        fontSize={{ base: "x-sm", md: "md" }}
      />
    )
  }
)

type ListItemProps = {
  children: React.ReactNode
  itemIndex: string
  highlightedIndex: string
}
const ComboboxItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  ({ itemIndex, highlightedIndex, ...props }, ref) => {
    const isActive = itemIndex === highlightedIndex

    return (
      <Box
        borderBottom="1px solid lightgray"
        transition="all 0.2s"
        bg={isActive ? "brand.blue.400" : "brand.yellow"}
        color={isActive ? "brand.red" : "inherit"}
        p={1}
        cursor="pointer"
        {...props}
        ref={ref}
      />
    )
  }
)

export { ComboboxInput, ComboboxList, ComboboxItem }