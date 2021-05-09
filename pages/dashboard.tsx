import { Box, VStack } from "@chakra-ui/react";
import * as React from "react";
import { DateBar } from "../Components/DateBar";
import { FormCard } from "../Components/FormCard";
import { ChartCard } from "./ChartCard";
import { ScoreCard } from "./ScoreCard";

const PROFIT =
  "https://app.croneri.co.uk/sites/default/files/green%20finance.jpg";

const EXPENSE =
  "https://www.taxlawforchb.com/wp-content/uploads/sites/127/2015/04/receipts-1.jpg";

export default function Dashboard() {
  const [date, setDate] = React.useState(new Date());
  return (
    <Box>
      <DateBar date={date} setDate={setDate} />
      <VStack spacing="2">
        <ChartCard />
        <ScoreCard imageURL={PROFIT} label="today profit" />
        <ScoreCard imageURL={EXPENSE} label="today expense" />
      </VStack>
    </Box>
  );
}
