import { Avatar } from "@chakra-ui/avatar"
import { IconButton } from "@chakra-ui/button"
import { DeleteIcon } from "@chakra-ui/icons"
import { Text } from "@chakra-ui/layout"
import { useBreakpointValue } from "@chakra-ui/media-query"
import { Spinner } from "@chakra-ui/spinner"
import { format } from "date-fns"
import * as React from "react"
import { dayBoundaries } from "../utils/dateFns"
import { useDeleteShift, useShifts } from "../utils/shifts"
import { ErrorBox } from "./ErrorBox"
import { List } from "./ExpenseList"
import { ISelectedDate } from "./ShiftForm"

export function ShiftList({ date }: ISelectedDate) {
  const { endDay, startDay } = dayBoundaries(date)
  const {
    data: { allShifts: shifts },
    isError,
    isLoading,
    error,
    isIdle,
  } = useShifts({
    endDay,
    startDay,
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
        <List key={s.id}>
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
            onClick={() => remove({ id: s.id, start: s.start })}
            borderColor="brand.blue.400"
            borderWidth="4px"
            borderStyle="solid"
            color="brand.red"
            background="brand.yellow"
            size="lg"
          />
        </List>
      ))}
    </React.Fragment>
  )
}
