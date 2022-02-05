import * as React from "react"
import { Box, Spinner, VStack } from "@chakra-ui/react"
import { format } from "date-fns"
import { ChartCard } from "../Components/ChartCard"
import { DateBar } from "../Components/DateBar"
import { ScoreCard } from "../Components/ScoreCard"
import { useAggregate } from "../queries/aggregate"

const PROFIT =
  "https://app.croneri.co.uk/sites/default/files/green%20finance.jpg"

const EXPENSE =
  "https://www.taxlawforchb.com/wp-content/uploads/sites/127/2015/04/receipts-1.jpg"

export default function Dashboard() {
  const [date, setDate] = React.useState(new Date())
  const day = format(date, "yyyy-MM-dd")
  const { data, isLoading } = useAggregate({ day })

  const weeklyIncome = data?.income
    ? Object.values(data.income).reduce((acc, curr) => acc + curr, 0)
    : undefined
  const weeklyExpense = data?.cost
    ? Object.values(data.cost).reduce((acc, curr) => acc + curr, 0)
    : undefined

  if (isLoading && !data) return <Spinner />
  return (
    <Box>
      <DateBar date={date} setDate={setDate} />
      {isLoading && !data ? (
        <Spinner />
      ) : (
        <VStack spacing="2">
          <ChartCard data={data} date={date} />
          <ScoreCard
            imageURL={PROFIT}
            label="Weekly profit"
            amount={weeklyIncome}
          />
          <ScoreCard
            imageURL={EXPENSE}
            label="Weekly expense"
            amount={weeklyExpense}
          />
        </VStack>
      )}
    </Box>
  )
}
