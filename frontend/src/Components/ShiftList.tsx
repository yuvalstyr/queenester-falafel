import { Avatar } from "@chakra-ui/avatar"
import { Button, IconButton } from "@chakra-ui/button"
import { DeleteIcon } from "@chakra-ui/icons"
import { HStack, Text, VStack } from "@chakra-ui/layout"
import { Spinner } from "@chakra-ui/spinner"
import { addDays, format, formatISO } from "date-fns"
import * as React from "react"
import { useShifts, useDeleteShift } from "../utils/shifts"
import { ErrorBox } from "./ErrorBox"
import { ISelectedDate } from "./ShiftForm"

export function ShiftList(methods: ISelectedDate) {
  const {
    data: { allShifts: shifts },
    isError,
    isLoading,
    error,
    isIdle,
  } = useShifts({
    startDay: formatISO(methods.date),
    endDay: formatISO(addDays(methods.date, 1)),
  })

  const { mutate: remove } = useDeleteShift()
  new Date()
  if (isIdle) return null
  if (isLoading) return <Spinner />
  if (isError) {
    return <ErrorBox error={error} />
  }

  return (
    <React.Fragment>
      {shifts.map((s) => (
        <VStack m="8" key={s.id}>
          <HStack
            shadow="lg"
            width="100%"
            p="4"
            borderBottomColor="black"
            borderBottomWidth="2px"
            fontSize="1.25rem"
            justifyContent="space-between"
          >
            <Avatar
              background="black"
              name={s.worker.name}
              src="https://bit.ly/tioluwani-kolawole"
              color="#FAEBEFFF"
              fontWeight="800"
            />
            <Text color="#101820FF" flexBasis="100%">
              {s.worker.name}
            </Text>
            <Text
              flexBasis="100%"
              _before={{
                content: `"Start: "`,
                color: "brand.red",
                fontWeight: 800,
                fontSize: "1.5rem",
              }}
            >
              {format(new Date(s.start), "dd-MM-yy HH:mm")}
            </Text>
            <Text
              flexBasis="100%"
              _before={{
                content: `"End: "`,
                color: "brand.red",
                fontWeight: 700,
                fontSize: "1.5rem",
              }}
            >
              {format(new Date(s.end), "dd-MM-yy HH:mm")}
            </Text>
            <IconButton
              aria-label="Remove Shift"
              icon={<DeleteIcon />}
              onClick={() => remove(s.id)}
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
