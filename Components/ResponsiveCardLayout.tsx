import { Center, HStack, StackProps, VStack } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import * as React from "react";

type props = StackProps;

export function ResponsiveCardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const size = useBreakpointValue({ base: "sm", xl: "lg" });

  const Component = size === "sm" ? VStack : HStack;
  return (
    <Center>
      <Component alignItems="baseline" spacing="6">
        {children}
      </Component>
    </Center>
  );
}
