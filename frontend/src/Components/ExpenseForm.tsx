import { Input } from "@chakra-ui/input"
import { NumberInput, NumberInputField } from "@chakra-ui/number-input"
import * as React from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { Expense } from "../generates"
import { useCreateExpense } from "../utils/expense"
import { FormBar } from "./FormBar"
import { FormButton } from "./FormButton"

export default function ExpenseForm() {
  const methods = useForm<Expense>({
    reValidateMode: "onChange",
    shouldFocusError: true,
  })

  const { mutate: create } = useCreateExpense()

  function onSubmit<Expense>(data: Expense) {
    create({ ...data, date: new Date().toISOString() })
  }
  return (
    <FormProvider {...methods}>
      <FormBar onSubmit={onSubmit}>
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
              onChange={(e) => field.onChange(e.target.value)}
              placeholder="Expense Type"
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
            <NumberInput>
              <NumberInputField
                onChange={(e) => {
                  field.onChange(+e.target.value)
                }}
                borderColor={"blackAlpha.100"}
                color={"blackAlpha.800"}
                type="number"
                placeholder="Cost"
                _placeholder={{
                  color: "black",
                }}
              />
            </NumberInput>
          )}
        />
        <FormButton />
      </FormBar>
    </FormProvider>
  )
}
