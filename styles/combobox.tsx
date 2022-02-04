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
        <InputWithLabel placeholder="_" {...props} downshiftRef={ref} />
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
        border="1px solid"
        zIndex="2"
        fontSize={{ base: "x-sm", md: "md" }}
        {...props}
        ref={ref}
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
        bg={isActive ? "brand.border" : "brand.white"}
        color={isActive ? "brand.white" : "inherit"}
        p={1}
        cursor="pointer"
        ref={ref}
        {...props}
      />
    )
  }
)

export { ComboboxInput, ComboboxList, ComboboxItem }
