import { IconButton } from "@chakra-ui/button"
import { DeleteIcon } from "@chakra-ui/icons"
import { Box, HStack, Text, VStack } from "@chakra-ui/layout"
import { useBreakpointValue } from "@chakra-ui/media-query"
import { Spinner } from "@chakra-ui/spinner"
import React from "react"
import { useDeleteExpense, useExpense } from "../utils/expense"
import { ErrorBox } from "./ErrorBox"

export function List({ children }: { children: React.ReactNode }) {
  return (
    <VStack
      m={{ base: "1", md: "2" }}
      width="100%"
      p={{ base: "1", md: "2" }}
      fontSize={{ base: "xs", md: "md" }}
    >
      <HStack
        width="100%"
        shadow="lg"
        p={{ base: "1", md: "4" }}
        borderBottomColor="black"
        borderBottomWidth="2px"
        justifyContent="space-around"
      >
        {children}
      </HStack>
    </VStack>
  )
}

export default function ExpenseList() {
  const { data, isError, isLoading, error, isIdle } = useExpense()
  const size = useBreakpointValue({ base: "sm", md: "md" })
  const { mutate: remove } = useDeleteExpense()
  if (isIdle) return null
  if (isLoading) return <Spinner />
  if (isError) {
    return <ErrorBox error={error} />
  }

  const { allExpenses: expense } = data

  return (
    <React.Fragment>
      {expense.map((e) => (
        <List key={e.id}>
          <Text color="#101820FF" flexBasis="100%" fontSize="inherit">
            {e.name}
          </Text>
          <Text
            color="#101820FF"
            flexBasis="100%"
            _before={{
              content: `"$"`,
              color: "brand.red",
              fontWeight: 800,
              pr: "2px",
              fontSize: size === "sm" ? "1rem" : "1.5rem",
            }}
          >
            {e.cost}
          </Text>

          <IconButton
            aria-label="Remove Shift"
            icon={<DeleteIcon />}
            onClick={() => remove(e.id)}
            borderColor="brand.blue.400"
            borderWidth="4px"
            borderStyle="solid"
            color="brand.red"
            background="brand.yellow"
            size={size}
          />
        </List>
      ))}
    </React.Fragment>
  )
}
