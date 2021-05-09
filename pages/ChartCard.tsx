import { HStack } from "@chakra-ui/react";
import * as React from "react";
import { MultiType } from "../Components/Chart";
import { FormCard } from "../Components/FormCard";

export function ChartCard() {
  return (
    <FormCard title="Weekly Performance" open>
      <MultiType />
    </FormCard>
  );
}
