import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";
import * as React from "react";

export function ScoreCard({ imageURL, label }): JSX.Element {
  return (
    <HStack
      p="2"
      rounded="md"
      mt={{ base: "-15", md: "-20" }}
      mb="4"
      bg="brand.yellow"
      borderWidth={{ base: "8px", md: "16px" }}
      borderColor="brand.blue.400"
      color="brand.red"
      justifyContent="space-between"
      width={{ base: "100vw", md: "60vw", xl: "30vw" }}
    >
      <Box w="40%">
        <Image
          src={imageURL}
          objectFit="fill"
          shadow="2xl"
          rounded="md"
          h="100px"
          w="150px"
        />
      </Box>
      <Box>
        <Heading size="lg" color="brand.red" textTransform="capitalize">
          {label}
        </Heading>
        <Text fontSize="2xl">$57</Text>
      </Box>
    </HStack>
  );
}
