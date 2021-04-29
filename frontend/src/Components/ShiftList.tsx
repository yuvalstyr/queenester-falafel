import { Avatar } from "@chakra-ui/avatar"
import { Button, IconButton } from "@chakra-ui/button"
import { DeleteIcon } from "@chakra-ui/icons"
import { HStack, Text, VStack } from "@chakra-ui/layout"
import { useBreakpointValue } from "@chakra-ui/media-query"
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
  const avatarSize = useBreakpointValue({ base: "sm", md: "lg" })

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
        <VStack
          m={{ base: "1", md: "8" }}
          width="100%"
          p={{ base: "1", md: "4" }}
          fontSize={{ base: "xs", md: "md" }}
          key={s.id}
        >
          <HStack
            shadow="lg"
            p={{ base: "1", md: "4" }}
            borderBottomColor="black"
            borderBottomWidth="2px"
            justifyContent="space-between"
          >
            <Avatar
              background="black"
              name={s.worker.name}
              color="#FAEBEFFF"
              fontWeight="800"
              size={avatarSize}
            />
            <Text
              color="#101820FF"
              flexBasis="100%"
              fontSize={{ base: "xs", md: "md" }}
            >
              {s.worker.name}
            </Text>
            <Text
              flexBasis="100%"
              _before={{
                content: `"Start: "`,
                color: "brand.red",
                fontWeight: 800,
                fontSize: { base: "xs", md: "md" },
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
                fontSize: { base: "x-sm", md: "md" },
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
