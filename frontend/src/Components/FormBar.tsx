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
      p={{ base: "1", md: "4" }}
      borderRadius="md"
      color="black"
      onSubmit={handleSubmit(onSubmit)}
      justifyContent="center"
      fontSize={{ base: "x-small", md: "xl" }}
    >
      {children}
    </HStack>
  )
}
type OnSubmit = <T>(arg: T) => void
