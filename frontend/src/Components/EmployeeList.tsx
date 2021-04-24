import { Avatar } from "@chakra-ui/avatar"
import { HStack, Text, VStack } from "@chakra-ui/layout"
import { Spinner } from "@chakra-ui/spinner"
import { format } from "date-fns"
import * as React from "react"
import { useShifts } from "../utils/shifts"
import { ErrorBox } from "./ErrorBox"

export function EmployeeList() {
  const {
    data: { allShifts: shifts },
    isError,
    isLoading,
    error,
    isIdle,
  } = useShifts()
  if (isIdle) return null
  if (isLoading) return <Spinner />
  if (isError) {
    return <ErrorBox error={error} />
  }
  console.log(`shifts`, shifts)
  return shifts.map((s) => (
    <VStack m="8" key={s.id}>
      <HStack
        shadow="lg"
        width="100%"
        p="4"
        borderBottomColor="black"
        borderBottomWidth="2px"
        fontSize="1.25rem"
      >
        <Avatar
          background="black"
          name={s.worker.name}
          src="https://bit.ly/tioluwani-kolawole"
          color="#FAEBEFFF"
          fontWeight="800"
        />
        <Text color="#101820FF">{s.worker.name}</Text>
        <Text
          _before={{
            content: `"Start: "`,
            color: "brand.red",
            fontWeight: 800,
            fontSize: "1.5rem",
          }}
        >
          {format(s.start, "DD-MM-YY HH:mm")}
        </Text>
        <Text
          _before={{
            content: `"End: "`,
            color: "brand.red",
            fontWeight: 700,
            fontSize: "1.5rem",
          }}
        >
          {format(s.end, "DD-MM-YY HH:mm")}
        </Text>
      </HStack>
    </VStack>
  ))
}
