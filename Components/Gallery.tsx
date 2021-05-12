import { Button } from "@chakra-ui/button";
import {
  Box,
  Center,
  HStack,
  Link,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/layout";
import { Container } from "next/app";
import { useBreakpointValue } from "@chakra-ui/react";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/dist/client/router";
import { ButtonRouteLink } from "./ButtonRouteLink";

type Photo = {
  name: string;
  type: "button" | "pic" | "logo";
};

const photos: Photo[] = [
  { name: "logo", type: "logo" },
  { name: "mom", type: "pic" },
  { name: "balagan", type: "pic" },
  { name: "dinner", type: "pic" },
  { name: "pita", type: "pic" },
  { name: "plans", type: "logo" },
];

const buttons = [
  { label: "Cost & Profit", to: "/form" },
  { label: "Performance", to: "/dashboard" },
];

function Gallery() {
  const width = useBreakpointValue({ base: 150, md: 300, lg: 450 });
  const height = useBreakpointValue({ base: 150, md: 300, lg: 450 });
  const size = useBreakpointValue({ base: "md", md: "lg" });

  return (
    <Box overflow="hidden" bg="brand.yellow" minH="100vh">
      <Container>
        <Text
          color="brand.red"
          fontWeight="semibold"
          mb="1rem"
          textAlign="center"
          textDecoration="underline"
          fontSize={["3xl", "4xl", "5xl", "5xl"]}
        >
          Welcome to Fuel By Night
        </Text>
      </Container>

      <Center>
        <HStack mb="4">
          {buttons.map((b) => (
            <ButtonRouteLink
              key={b.label}
              to={b.to}
              p="4"
              rounded="md"
              bg="brand.yellow"
              borderWidth={{ base: "6px", md: "8px", lg: "10px" }}
              borderColor="brand.blue.400"
              color="brand.red"
              size={size}
            >
              {b.label}
            </ButtonRouteLink>
          ))}
        </HStack>
      </Center>
      <Wrap px="1rem" spacing={4} justify="center">
        {photos.map((pic) => (
          <WrapItem
            key={pic.name}
            boxShadow="base"
            rounded="20px"
            overflow="hidden"
            bg="white"
            lineHeight="0"
            _hover={{ boxShadow: "dark-lg" }}
          >
            <Image
              src={`/${pic.name}.jpg`}
              height={height ?? 300}
              width={width ?? 300}
              alt={pic.name}
            />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
}

export default Gallery;
