import { Avatar } from "@chakra-ui/avatar"
import { IconButton } from "@chakra-ui/button"
import { DeleteIcon } from "@chakra-ui/icons"
import { Text } from "@chakra-ui/layout"
import { useBreakpointValue } from "@chakra-ui/media-query"
import { Spinner } from "@chakra-ui/spinner"
import { format } from "date-fns"
import * as React from "react"
import { useDeleteShift, useShifts } from "../queries/shifts"
import { ErrorBox } from "./ErrorBox"
import { List } from "./ExpenseList"
import { ISelectedDate } from "./Forms"

export function ShiftList({ date }: ISelectedDate) {
  const startDay = format(date, "yyyy-MM-dd")
  const {
    data: shifts,
    isError,
    isLoading,
    error,
    isIdle,
  } = useShifts({
    startDay,
  })
  const avatarSize = useBreakpointValue({ base: "sm", md: "md" })
  console.log("shifts :>> ", shifts)
  const { mutate: remove, isLoading: isDeleteLoading } = useDeleteShift()

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
            name={s.Employee.name}
            color="#FAEBEFFF"
            fontWeight="800"
            size={avatarSize}
          />
          <Text
            color="#101820FF"
            flexBasis="100%"
            fontSize={{ base: "xs", md: "md" }}
          >
            {s.Employee.name}
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
            {`${format(new Date(s.startDate), "yy-MM-dd")} ${s.startTime}`}
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
            {`${format(new Date(s.endDate), "yy-MM-dd")} ${s.endTime}`}
          </Text>
          <IconButton
            aria-label="Remove Shift"
            icon={<DeleteIcon />}
            onClick={() => remove({ id: s.id, start: s.endDate })}
            borderColor="brand.blue.400"
            borderWidth="4px"
            borderStyle="solid"
            color="brand.black"
            background="brand.white"
            size="lg"
            disabled={s.optimistic || isDeleteLoading}
          />
        </List>
      ))}
    </React.Fragment>
  )
}
