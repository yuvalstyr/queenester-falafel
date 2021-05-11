import { HStack } from "@chakra-ui/react";
import * as React from "react";
import { Chart } from "../Components/Chart";
import { FormCard } from "../Components/FormCard";

export function ChartCard({ data }) {
  return (
    <FormCard title="Weekly Performance" open>
      <Chart dbData={data} />
    </FormCard>
  );
}
