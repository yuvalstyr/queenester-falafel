import * as React from "react";
import { Input } from "@chakra-ui/input";
import { FormCard } from "./FormCard";

export function Expense() {
  return (
    <FormCard title={"Expense"}>
      <Input />
      <Input />
    </FormCard>
  );
}
