import { Box } from "@chakra-ui/layout"
import * as React from "react"
import { DateBar } from "./DateBar"
import { EmployeesCard } from "./EmployeesCard"
import { ExpenseCard } from "./ExpenseCard"
import { ResponsiveCardLayout } from "./ResponsiveCardLayout"

export interface ISelectedDate {
  date?: Date
  setDate?: React.Dispatch<React.SetStateAction<Date>>
}

export function ShiftForm() {
  const [date, setDate] = React.useState(new Date())
  return (
    <Box>
      <DateBar date={date} setDate={setDate} />
      <ResponsiveCardLayout>
        <EmployeesCard date={date} setDate={setDate} />
        <ExpenseCard />
      </ResponsiveCardLayout>
    </Box>
  )
}
