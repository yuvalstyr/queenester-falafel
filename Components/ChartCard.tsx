import * as React from "react";
import { Chart } from "./Chart";
import { FormCard } from "./FormCard";

export function ChartCard({ data }) {
  return (
    <FormCard title="Weekly Performance" open>
      <Chart dbData={data} />
    </FormCard>
  );
}
