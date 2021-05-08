import { Expense, Profit } from ".prisma/client";
import { HStack } from "@chakra-ui/layout";
import * as React from "react";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { EmployeeFormData } from "./EmployeesShiftForm";

type BarProps = {
  children: React.ReactNode;
  submitAction: SubmitHandler<EmployeeFormData | Expense | Profit>;
};
export function FormBar({ children, submitAction }: BarProps) {
  const { handleSubmit, reset } = useFormContext();

  function onSubmit(data: Expense | EmployeeFormData) {
    submitAction(data);
    reset();
  }
  return (
    <HStack
      as="form"
      borderWidth="1px"
      borderColor="black"
      shadow="md"
      p={{ base: "1", md: "4" }}
      borderRadius="md"
      color="black"
      onSubmit={handleSubmit(onSubmit)}
      justifyContent="center"
      fontSize={{ base: "small", md: "xl" }}
      pt="2"
    >
      {children}
    </HStack>
  );
}
