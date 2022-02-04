import { Box } from "@chakra-ui/layout"
import { Avatar, HStack, Icon, Text, VStack } from "@chakra-ui/react"
import * as React from "react"
import { DateBar } from "./DateBar"
import { EmployeesCard } from "./EmployeesCard"
import { ExpenseCard } from "./ExpenseCard"
import { ProfitCard } from "./ProfitCard"
import { ResponsiveCardLayout } from "./ResponsiveCardLayout"
import { FaDollarSign } from "react-icons/fa"
import { useAggregate } from "../queries/aggregate"
import { format } from "date-fns"

export interface ISelectedDate {
  date?: Date
  setDate?: React.Dispatch<React.SetStateAction<Date>>
}

function PerformanceCard({ label, cost }: { label: string; cost: string }) {
  return (
    <HStack
      bg="brand.white"
      border="2px"
      borderColor="brand.border"
      borderRadius="md"
      p="5"
    >
      <Avatar
        icon={<Icon as={FaDollarSign} fontSize="1.5rem" />}
        bg="brand.gray"
        borderRadius="4rem"
        borderColor={label === "cost" ? "brand.red" : "green"}
        borderWidth="3px"
      />
      <VStack alignItems="self-start" spacing="0">
        <Text fontSize="xl">{`${label === "cost" ? "-" : ""} ${cost}`}</Text>
        <Text
          fontSize="md"
          fontStyle="italic"
          color="GrayText"
          fontWeight="bold"
        >
          {`Daily ${label}`}
        </Text>
      </VStack>
    </HStack>
  )
}

function PerformanceCards({ date }: ISelectedDate) {
  const day = format(date, "yyyy-MM-dd")
  const { data, isLoading } = useAggregate({ day })

  return (
    <HStack mt="2" mb={{ base: "3", md: "10" }} justifyContent="center">
      <PerformanceCard
        label="cost"
        cost={!data ? "0" : `${data.cost[day] ?? 0}`}
      />
      <PerformanceCard
        label="profit"
        cost={!data ? "0" : `${data.income[day] ?? 0}`}
      />
    </HStack>
  )
}

export function Forms() {
  const [date, setDate] = React.useState(new Date())
  return (
    <Box>
      <DateBar date={date} setDate={setDate} />
      <PerformanceCards date={date} />
      <ResponsiveCardLayout>
        <EmployeesCard date={date} />
        <ExpenseCard date={date} />
        <ProfitCard date={date} />
      </ResponsiveCardLayout>
    </Box>
  )
}
