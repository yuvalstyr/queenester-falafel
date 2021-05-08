import * as React from "react";
import ProfitForm from "./ProfitForm";
import ProfitList from "./ProfitList";
import { FormCard } from "./FormCard";
import { ISelectedDate } from "./EndOfDay";

export function ProfitCard({ date }: ISelectedDate) {
  return (
    <FormCard title={"Profit"}>
      <ProfitForm date={date} />
      <ProfitList date={date} />
    </FormCard>
  );
}
