import { Box } from "@chakra-ui/layout";
import * as React from "react";
import { DateBar } from "./DateBar";
import { EmployeesCard } from "./EmployeesCard";
import { ExpenseCard } from "./ExpenseCard";
import { ProfitCard } from "./ProfitCard";
import { ResponsiveCardLayout } from "./ResponsiveCardLayout";

export interface ISelectedDate {
  date?: Date;
  setDate?: React.Dispatch<React.SetStateAction<Date>>;
}

export function EndOfDay() {
  const [date, setDate] = React.useState(new Date());
  return (
    <Box>
      <DateBar date={date} setDate={setDate} />
      <ResponsiveCardLayout>
        <EmployeesCard date={date} />
        <ExpenseCard date={date} />
        <ProfitCard date={date} />
      </ResponsiveCardLayout>
    </Box>
  );
}
