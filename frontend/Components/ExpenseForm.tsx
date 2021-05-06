import { Box } from "@chakra-ui/layout"
import * as React from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { Employee, Expense } from "../generates"
import { startOfISODay } from "../utils/dateFns"
import { useCreateExpense } from "../utils/expense"
import { FormBar } from "./FormBar"
import { FormButton } from "./FormButton"
import { InputWithLabel, TextLabel } from "./InputWithLabel"
import { ISelectedDate } from "./ShiftForm"

export type OnSubmit = (data: Expense | Employee) => void

export default function ExpenseForm({ date }: ISelectedDate) {
  const methods = useForm<Expense>({
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      name: "",
      cost: 0,
    },
  })
  const { mutate: create } = useCreateExpense()

  const onSubmit = (data: Expense) => {
    create({ ...data, cost: +data.cost, date: startOfISODay(date) })
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
            <Box
              _focusWithin={{
                transform: "scale(1.05,1.05)",
              }}
            >
              <InputWithLabel
                label={field.name}
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
                label={field.name}
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
  )
}

{
  /* <Flex flexDirection="column" position="relative">
<Input
  borderColor={"blackAlpha.100"}
  p={0}
  color={"blackAlpha.800"}
  fontSize={{ base: "x-sm", md: "md" }}
  size="sm"
  onChange={(e) => field.onChange(+e.target.value)}
  placeholder="Expense Type"
  w="250px"
  _placeholder={{
    color: "black",
  }}
  value={field.value ?? ""}
  type="number"
  sx={{
    ":focus-within label": {
      transform: "translate(0, 12px) scale(0.75)",
    },
  }}
/>
<Text
  textTransform="capitalize"
  position="absolute"
  transformOrigin="top left"
  transition="all 0.2s ease-out"
>
  {field.name}
</Text>
</Flex> */
}
