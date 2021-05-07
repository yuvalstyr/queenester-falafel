import { Box } from "@chakra-ui/layout";
import { format } from "date-fns";
import * as React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { Employee, Expense } from "../generates";
import { useCreateExpense } from "../utils/expense";
import { FormBar } from "./FormBar";
import { FormButton } from "./FormButton";
import { InputWithLabel, TextLabel } from "./InputWithLabel";
import { ISelectedDate } from "./ShiftForm";

export type OnSubmit = (data: Expense | Employee) => void;

export default function ExpenseForm({ date }: ISelectedDate) {
  const methods = useForm<Expense>({
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      name: "",
      cost: 0,
    },
  });
  const { mutate: create } = useCreateExpense();

  const onSubmit = (data: Expense) => {
    create({ ...data, cost: +data.cost, date: format(date, "yyyy-MM-dd") });
  };

  return (
    <FormProvider {...methods}>
      <FormBar submitAction={onSubmit}>
        <Controller
          control={methods.control}
          name="name"
          rules={{
            required: { value: true, message: "Most Fill Expense Type!!" },
          }}
          render={({ field }) => (
            <Box
              _focusWithin={{
                transform: "scale(1.05,1.05)",
              }}
            >
              <InputWithLabel
                onChange={field.onChange}
                value={field.value ?? ""}
                placeholder="_"
              />
              <TextLabel>{field.name}</TextLabel>
            </Box>
          )}
        />
        <Controller
          control={methods.control}
          name="cost"
          render={({ field }) => (
            <Box
              _focusWithin={{
                transform: "scale(1.05,1.05)",
              }}
            >
              <InputWithLabel
                onChange={field.onChange}
                value={field.value === 0 ? "" : field.value}
                placeholder="_"
              />
              <TextLabel>{field.name}</TextLabel>
            </Box>
          )}
        />
        <FormButton text="add" />
      </FormBar>
    </FormProvider>
  );
}
