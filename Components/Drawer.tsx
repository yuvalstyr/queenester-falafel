import { Button, IconButton } from "@chakra-ui/button";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Link,
  useDisclosure,
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
      placement="right"
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
                  <Link color="brand.red" fontSize="2xl" fontWeight="bold">
                    {b.label}
                  </Link>
                </NextLink>
              </Box>
            ))}
          </VStack>
        </DrawerBody>

        <DrawerFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="blue">Save</Button>
        </DrawerFooter>
      </DrawerContent>
    </ChakraDrawer>
  );
}
