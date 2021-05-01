import * as React from "react"
import { Input } from "@chakra-ui/input"
import { Box, ListItem, UnorderedList } from "@chakra-ui/layout"

const ComboboxInput = React.forwardRef<HTMLInputElement>(
  ({ ...props }, ref) => {
    return (
      <Input
        borderColor={"blackAlpha.100"}
        width="100%"
        maxW={{ base: "125px", md: "250px" }}
        fontSize={{ base: "x-sm", md: "md" }}
        p={{ base: "1", md: "4" }}
        size="md"
        {...props}
        ref={ref}
        _placeholder={{ color: "black" }}
        autoComplete="off"
      />
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
