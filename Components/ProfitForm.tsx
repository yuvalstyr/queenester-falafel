import { Employee, Profit } from ".prisma/client"
import { Box } from "@chakra-ui/layout"
import { Select, Spinner } from "@chakra-ui/react"
import { format } from "date-fns"
import * as React from "react"
import { Controller, FormProvider, useForm } from "react-hook-form"
import { useInvestmentTypes } from "../queries/investment"
import { useCreateProfit } from "../queries/profit"
import { ErrorBox } from "./ErrorBox"
import { FormBar } from "./FormBar"
import { FormButton } from "./FormButton"
import { ISelectedDate } from "./Forms"
import { InputWithLabel, TextLabel } from "./InputWithLabel"

export type OnSubmit = (data: Profit | Employee | Profit) => void

export default function ProfitForm({ date }: ISelectedDate) {
  const methods = useForm<Profit>({
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      name: "",
      income: 0,
      investmentTypeId: "",
    },
  })
  const { isIdle, isLoading, isError, data, error } = useInvestmentTypes()
  const { mutate: create } = useCreateProfit()
  const [reset, setReset] = React.useState(false)

  if (isIdle) return null
  if (isLoading) return <Spinner />
  if (isError) {
    return <ErrorBox error={error} />
  }

  const onSubmit = (data: Profit) => {
    create({ ...data, cost: +data.income, date: format(date, "yyyy-MM-dd") })
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
            required: { value: true, message: "Most Fill Profit Type!!" },
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
          name="income"
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
