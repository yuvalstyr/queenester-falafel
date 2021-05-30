import * as React from "react";
import { Chart } from "./Chart";
import { FormCard } from "./FormCard";

type ChartCardProps = {
  data: any;
  date: Date;
};

export function ChartCard({ data, date }: ChartCardProps) {
  return (
    <FormCard title="Weekly Performance" open>
      <Chart dbData={data} pickedDate={date} />
    </FormCard>
  );
}
