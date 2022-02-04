import { IconButton } from "@chakra-ui/button"
import { DeleteIcon } from "@chakra-ui/icons"
import { HStack, Text, VStack } from "@chakra-ui/layout"
import { useBreakpointValue } from "@chakra-ui/media-query"
import { Spinner } from "@chakra-ui/spinner"
import { format } from "date-fns"
import React from "react"
import { useDeleteExpense, useExpense } from "../queries/expense"
import { ISelectedDate } from "./Forms"
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

export default function ExpenseList({ date }: ISelectedDate) {
  const day = format(date, "yyyy-MM-dd")
  const {
    data: expense,
    isError,
    isLoading,
    error,
    isIdle,
  } = useExpense({
    day,
  })
  const size = useBreakpointValue({ base: "sm", md: "md" })
  const { mutate: remove, isLoading: isDeleteLoading } = useDeleteExpense()
  if (isIdle) return null
  if (isLoading) return <Spinner />
  if (isError) {
    return <ErrorBox error={error} />
  }

  return (
    <React.Fragment>
      {expense.map((e) => (
        <List key={e.id}>
          <Text color="#101820FF" flexBasis="100%" fontSize="inherit">
            {e?.InvestmentType?.name}
          </Text>
          <Text color="#101820FF" flexBasis="100%" fontSize="inherit">
            {e.name}
          </Text>
          <Text
            color="#101820FF"
            flexBasis="100%"
            _before={{
              content: `"$"`,
              color: "brand.black",
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
            onClick={() => remove({ id: e.id, date })}
            borderColor="brand.blue.400"
            borderWidth="4px"
            borderStyle="solid"
            color="brand.black"
            background="brand.white"
            size={size}
            disabled={isDeleteLoading || e.optimistic}
          />
        </List>
      ))}
    </React.Fragment>
  )
}
