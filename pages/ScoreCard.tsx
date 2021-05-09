import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";
import * as React from "react";

export function ScoreCard({ imageURL, label }): JSX.Element {
  return (
    <HStack
      boxShadow="dark-lg"
      p={{ base: "2", md: "8" }}
      rounded="md"
      bg="brand.yellow"
      width={{ base: "100vw", md: "30vw" }}
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
