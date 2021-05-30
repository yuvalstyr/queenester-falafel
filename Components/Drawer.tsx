import { Button } from "@chakra-ui/button";
import {
  Box,
  Center,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Link,
  VStack,
} from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";

const buttons = [
  { label: "Home", to: "/" },
  { label: "Cost & Profit", to: "/form" },
  { label: "Performance", to: "/dashboard" },
];

export function Drawer({ isOpen, btnRef, onClose }) {
  return (
    <ChakraDrawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerOverlay />
      <DrawerContent bg="brand.yellow">
        <DrawerCloseButton />
        <DrawerHeader>Fuel By Night</DrawerHeader>
        <DrawerBody>
          <VStack spacing="8">
            {buttons.map((b) => (
              <Box
                key={b.label}
                borderBottomColor="brand.blue.400"
                borderBottomWidth="medium"
                w="100%"
                textAlign="center"
              >
                <NextLink href={b.to} passHref>
                  <Link
                    color="brand.red"
                    fontWeight="bold"
                    fontSize={{ base: "md", md: "2xl" }}
                    onClick={onClose}
                  >
                    {b.label}
                  </Link>
                </NextLink>
              </Box>
            ))}
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Center w="100%">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </Center>
        </DrawerFooter>
      </DrawerContent>
    </ChakraDrawer>
  );
}
