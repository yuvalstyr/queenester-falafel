import { Employee, Expense, Profit } from ".prisma/client"
import { Box } from "@chakra-ui/layout"
import { Select, Spinner } from "@chakra-ui/react"
import { format } from "date-fns"
import * as React from "react"
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form"
import { useCreateExpense } from "../queries/expense"
import { useInvestmentTypes } from "../queries/investment"
import { ErrorBox } from "./ErrorBox"
import { FormBar } from "./FormBar"
import { FormButton } from "./FormButton"
import { ISelectedDate } from "./Forms"
import { InputWithLabel, TextLabel } from "./InputWithLabel"

export type OnSubmit = (data: Expense | Employee | Profit) => void

export default function ExpenseForm({ date }: ISelectedDate) {
  const methods = useForm<Expense>({
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      name: "",
      cost: 0,
      investmentTypeId: "",
    },
  })
  const { isIdle, isLoading, isError, data, error } = useInvestmentTypes()
  const { mutate: create } = useCreateExpense()
  const [reset, setReset] = React.useState(false)

  if (isIdle) return null
  if (isLoading) return <Spinner />
  if (isError) {
    return <ErrorBox error={error} />
  }
  type onSubmit = SubmitHandler<Expense>
  const onSubmit = (data: Expense) => {
    create({ ...data, cost: +data.cost, date: format(date, "yyyy-MM-dd") })
    setReset(true)
  }

  return (
    <FormProvider {...methods}>
      <FormBar submitAction={onSubmit}>
        <Controller
          render={({ field: { ref, onChange, ...rest } }) => (
            <Select>
              {data.map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
            </Select>
          )}
          control={methods.control}
          name="investmentTypeId"
        />
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
  )
}
