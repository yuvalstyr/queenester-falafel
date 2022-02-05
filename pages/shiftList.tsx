import {
  Box,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react"
import { format } from "date-fns"
import * as React from "react"
import { DateBar } from "../Components/DateBar"
import { FormCard } from "../Components/FormCard"
import { useAggregate } from "../queries/aggregate"

type ShiftProps = {
  shifts: { [key: string]: { wage: number; count: number } }
}

const EmployeeShiftsTable = ({ shifts }: ShiftProps) => {
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Employee Name</Th>
          <Th isNumeric>Number Of Shifts</Th>
          <Th isNumeric>Total Cost ($)</Th>
        </Tr>
      </Thead>
      <Tbody>
        {Object.entries(shifts).map(([employeeName, { count, wage }]) => {
          return (
            <Tr key={employeeName}>
              <Td>{employeeName}</Td>
              <Td isNumeric>{count}</Td>
              <Td isNumeric>{wage}</Td>
            </Tr>
          )
        })}
      </Tbody>
    </Table>
  )
}

export default function EmployeeShifts() {
  const [date, setDate] = React.useState(new Date())
  const day = format(date, "yyyy-MM-dd")
  const { data, isLoading } = useAggregate({ day })

  return (
    <Box>
      <DateBar date={date} setDate={setDate} />
      {isLoading && !data ? (
        <Spinner />
      ) : (
        <VStack spacing="2">
          <FormCard title="Employee Shift List (All Week)" open={true}>
            <EmployeeShiftsTable shifts={data.employeeWeeklyCost} />
          </FormCard>
        </VStack>
      )}
    </Box>
  )
}
