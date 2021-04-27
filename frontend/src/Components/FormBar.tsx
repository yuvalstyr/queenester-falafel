import { HStack } from "@chakra-ui/layout"
import * as React from "react"
import { useFormContext } from "react-hook-form"

export function FormBar({
  children,
  onSubmit,
}: {
  children: React.ReactNode
  onSubmit: OnSubmit
}) {
  const { handleSubmit } = useFormContext()
  return (
    <HStack
      as="form"
      borderWidth="1px"
      borderColor="black"
      shadow="md"
      p="4"
      borderRadius="md"
      color="black"
      onSubmit={handleSubmit(onSubmit)}
      justifyContent="center"
    >
      {children}
    </HStack>
  )
}
type OnSubmit = <T>(arg: T) => void
