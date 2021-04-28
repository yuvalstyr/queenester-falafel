import { Box, Heading } from "@chakra-ui/layout"
import * as React from "react"

export function FormCard({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Box
      boxShadow="dark-lg"
      p="8"
      mb="32"
      mt="32"
      rounded="md"
      bg="brand.yellow"
      width={["full", "full", "full", , "full", "50%"]}
    >
      <Heading
        as="h1"
        p="2"
        rounded="md"
        mt="-20"
        mb="4"
        bg="brand.yellow"
        borderWidth="16px"
        borderColor="brand.blue.400"
        color="brand.red"
      >
        {title}
      </Heading>
      {children}
    </Box>
  )
}
