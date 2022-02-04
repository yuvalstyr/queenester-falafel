import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react"
import * as React from "react"

export function ScoreCard({ imageURL, label, amount }): JSX.Element {
  return (
    <HStack
      rounded="md"
      bg="brand.white"
      color="brand.black"
      justifyContent="space-between"
      width={{ base: "100vw", md: "60vw", xl: "30vw" }}
      borderColor="brand.blue.400"
      borderStyle="solid"
      borderWidth="thick"
    >
      <Image
        src={imageURL}
        roundedRight="xl"
        w="100%"
        flex="1"
        maxWidth="150px"
      />
      <Box flex="2">
        <Heading size="lg" color="brand.red" textTransform="capitalize">
          {label}
        </Heading>
        <Text fontSize="2xl">${amount ?? 0}</Text>
      </Box>
    </HStack>
  )
}
