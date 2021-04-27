import { IconButton } from "@chakra-ui/button"
import { DeleteIcon } from "@chakra-ui/icons"
import { Box, HStack, Text, VStack } from "@chakra-ui/layout"
import { Spinner } from "@chakra-ui/spinner"
import React from "react"
import { useDeleteExpense, useExpense } from "../utils/expense"
import { ErrorBox } from "./ErrorBox"

export default function ExpenseList() {
  const { data, isError, isLoading, error, isIdle } = useExpense()
  const { mutate: remove } = useDeleteExpense()
  if (isIdle) return null
  if (isLoading) return <Spinner />
  if (isError) {
    return <ErrorBox error={error} />
  }

  const { allExpenses: expense } = data
  console.log(`expenseList`, expense)
  return (
    <React.Fragment>
      {expense.map((e) => (
        <VStack m="8" key={e.id}>
          <HStack
            shadow="lg"
            width="100%"
            p="4"
            borderBottomColor="black"
            borderBottomWidth="2px"
            fontSize="1.25rem"
            justifyContent="space-between"
          >
            <Text color="#101820FF" flexBasis="100%">
              {e.name}
            </Text>
            <Text
              color="#101820FF"
              flexBasis="100%"
              _before={{
                content: `"$"`,
                color: "brand.red",
                fontWeight: 800,
                fontSize: "1.5rem",
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
              size="lg"
            />
          </HStack>
        </VStack>
      ))}
    </React.Fragment>
  )
}
