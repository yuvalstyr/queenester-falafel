import { useDisclosure } from "@chakra-ui/hooks";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/media-query";
import { Collapse, ScaleFade } from "@chakra-ui/transition";
import * as React from "react";

export function FormCard({
  title,
  open,
  children,
}: {
  title: string;
  open?: boolean;
  children: React.ReactNode;
}) {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: open });
  const size = useBreakpointValue({ base: "6", md: "8" });

  return (
    <Box
      boxShadow="dark-lg"
      p={{ base: "2", md: "8" }}
      rounded="md"
      bg="brand.yellow"
      width={{ base: "100vw", md: "60vw", xl: "30vw" }}
    >
      <HStack
        p="2"
        rounded="md"
        mt={{ base: "-15", md: "-20" }}
        mb="4"
        bg="brand.yellow"
        borderWidth={{ base: "8px", md: "16px" }}
        borderColor="brand.blue.400"
        color="brand.red"
        onClick={onToggle}
        justifyContent="space-between"
      >
        <Heading fontSize={{ base: "md", md: "2xl" }}>{title}</Heading>
        {isOpen ? (
          <ChevronUpIcon w={size} h={size} />
        ) : (
          <ChevronDownIcon w={size} h={size} />
        )}
      </HStack>
      <Collapse in={isOpen} animateOpacity>
        {children}
      </Collapse>
    </Box>
  );
}
