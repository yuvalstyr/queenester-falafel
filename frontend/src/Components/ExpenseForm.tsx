import { Input } from "@chakra-ui/input"
import { NumberInput, NumberInputField } from "@chakra-ui/number-input"
import * as React from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { Expense } from "../generates"
import { useCreateExpense } from "../utils/expense"
import { FormBar } from "./FormBar"
import { FormButton } from "./FormButton"
import { ISelectedDate } from "./ShiftForm"
import { startOfISODay } from "../utils/dateFns"

export default function ExpenseForm({ date }: ISelectedDate) {
  const methods = useForm<Expense>({
    reValidateMode: "onChange",
    shouldFocusError: true,
  })
  const { mutate: create } = useCreateExpense()

  function onSubmit<Expense>(data: Expense) {
    create({ ...data, date: startOfISODay(date) })
  }
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
            <Input
              borderColor={"blackAlpha.100"}
              color={"blackAlpha.800"}
              fontSize={{ base: "x-sm", md: "md" }}
              size="sm"
              onChange={(e) => field.onChange(e.target.value)}
              placeholder="Expense Type"
              w="250px"
              _placeholder={{
                color: "black",
              }}
            />
          )}
        />
        <Controller
          control={methods.control}
          name="cost"
          render={({ field }) => (
            <NumberInput size="sm">
              <NumberInputField
                onChange={(e) => {
                  field.onChange(+e.target.value)
                }}
                borderColor="blackAlpha.100"
                color="blackAlpha.800"
                type="number"
                fontSize={{ base: "x-sm", md: "md" }}
                placeholder="Cost"
                _placeholder={{
                  color: "black",
                }}
              />
            </NumberInput>
          )}
        />
        <FormButton text="add" />
      </FormBar>
    </FormProvider>
  )
}
