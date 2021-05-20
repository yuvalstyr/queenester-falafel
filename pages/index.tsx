import { Center, HStack } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import Link from "next/link";
import React from "react";
import { ButtonRouteLink } from "../Components/ButtonRouteLink";
import Gallery from "../Components/Gallery";

const buttons = [
  { label: "Cost & Profit", to: "/form" },
  { label: "Performance", to: "/dashboard" },
];

function Index() {
  const size = useBreakpointValue({ base: "md", md: "lg" });
  return (
    <React.Fragment>
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
      <Gallery />;
    </React.Fragment>
  );
}
export default Index;
