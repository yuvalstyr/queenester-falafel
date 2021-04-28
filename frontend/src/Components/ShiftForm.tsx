import { VStack } from "@chakra-ui/layout"
import * as React from "react"
import { DateBar } from "./DateBar"
import { EmployeesCard } from "./EmployeesCard"
import { ExpenseCard } from "./ExpenseCard"

export interface ISelectedDate {
  date?: Date
  setDate?: React.Dispatch<React.SetStateAction<Date>>
}

export function ShiftForm() {
  const [date, setDate] = React.useState(new Date())
  return (
    <React.Fragment>
      <DateBar date={date} setDate={setDate} />
      <VStack>
        <EmployeesCard date={date} setDate={setDate} />
        <ExpenseCard />
      </VStack>
    </React.Fragment>
  )
}
