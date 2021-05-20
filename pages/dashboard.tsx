import * as React from "react";
import { Box, Spinner, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import { ChartCard } from "../Components/ChartCard";
import { DateBar } from "../Components/DateBar";
import { ScoreCard } from "../Components/ScoreCard";
import { useAggregate } from "../utils/aggregate";

const PROFIT =
  "https://app.croneri.co.uk/sites/default/files/green%20finance.jpg";

const EXPENSE =
  "https://www.taxlawforchb.com/wp-content/uploads/sites/127/2015/04/receipts-1.jpg";

export default function Dashboard() {
  const [date, setDate] = React.useState(new Date());
  const day = format(date, "yyyy-MM-dd");
  const { data, isLoading } = useAggregate({ day });
  if (isLoading && !data) return <Spinner />;
  console.log({ data: data.cost });
  return (
    <Box>
      <DateBar date={date} setDate={setDate} />
      <VStack spacing="2">
        <ChartCard data={data} />
        <ScoreCard imageURL={PROFIT} label="today profit" amount={data.cost} />
        <ScoreCard
          imageURL={EXPENSE}
          label="today expense"
          amount={data.cost}
        />
      </VStack>
    </Box>
  );
}
