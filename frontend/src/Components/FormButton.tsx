import * as React from "react"
import { Button } from "@chakra-ui/react"

export function FormButton({ text }: { text: String }) {
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
    >
      {text}
    </Button>
  )
}
