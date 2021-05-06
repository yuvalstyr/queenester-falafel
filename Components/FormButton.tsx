import * as React from "react"
import { Button, useBreakpointValue } from "@chakra-ui/react"

export function FormButton({ text }: { text: String }) {
  const size = useBreakpointValue({ base: "sm", md: "md" })

  return (
    <Button
      variant="solid"
      // width={{ base: "50px", md: "150px" }}
      p={{ base: 0 }}
      fontSize={{ base: "x-sm", md: "md" }}
      background="brand.blue.400"
      color="brand.red"
      fontWeight="700"
      type="submit"
      size={size}
    >
      {text}
    </Button>
  )
}
