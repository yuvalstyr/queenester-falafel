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
      p={{ base: "2", md: "8" }}
      mb={{ base: "4", md: "16" }}
      mt={{ base: "4", md: "16" }}
      rounded="md"
      bg="brand.yellow"
      width={["full", "full", "full", , "full", "50%"]}
    >
      <Heading
        as="h1"
        p="2"
        rounded="md"
        mt={{ base: "-15", md: "-20" }}
        mb="4"
        bg="brand.yellow"
        fontSize={{ base: "md", md: "2xl" }}
        borderWidth={{ base: "8px", md: "16px" }}
        borderColor="brand.blue.400"
        color="brand.red"
      >
        {title}
      </Heading>
      {children}
    </Box>
  )
}
