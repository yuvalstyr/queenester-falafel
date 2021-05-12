import * as React from "react";
import { Box, VStack } from "@chakra-ui/react";
import { format } from "date-fns";
import { DateBar } from "../Components/DateBar";
import { client } from "../utils/client";
import { ChartCard } from "../Components/ChartCard";
import { ScoreCard } from "../Components/ScoreCard";

const PROFIT =
  "https://app.croneri.co.uk/sites/default/files/green%20finance.jpg";

const EXPENSE =
  "https://www.taxlawforchb.com/wp-content/uploads/sites/127/2015/04/receipts-1.jpg";

export default function Dashboard({ dashboardData }) {
  const [date, setDate] = React.useState(new Date());
  return (
    <Box>
      <DateBar date={date} setDate={setDate} />
      <VStack spacing="2">
        <ChartCard data={dashboardData} />
        <ScoreCard imageURL={PROFIT} label="today profit" />
        <ScoreCard imageURL={EXPENSE} label="today expense" />
      </VStack>
    </Box>
  );
}

export async function getServerSideProps() {
  const day = format(new Date("2021-05-07"), "yyyy-MM-dd");
  const res = await fetch(`http://localhost:3000/api/aggregate/${day}`);
  const dashboardData = await res.json();

  return {
    props: {
      dashboardData,
    },
  };
}
