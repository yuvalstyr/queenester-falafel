import { IconButton } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { HamburgerIcon } from "@chakra-ui/icons";
import { Heading, HStack } from "@chakra-ui/layout";
import { useRouter } from "next/dist/client/router";
import React from "react";
import { Drawer } from "./Drawer";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const btnRef = React.useRef();

  const label =
    router.asPath === "/"
      ? ""
      : router.asPath === "/dashboard"
      ? "Dashboard"
      : "Shift Income & Cost";

  return (
    <React.Fragment>
      <HStack
        bg="brand.yellow"
        p="2"
        justifyContent="flex-start"
        borderBottomColor="brand.blue.400"
        borderBottomWidth="2px"
        borderBottomStyle="solid"
      >
        <IconButton
          alignSelf="baseline"
          aria-label="open menu"
          ref={btnRef}
          colorScheme="teal"
          onClick={onOpen}
          icon={<HamburgerIcon />}
          bg="brand.blue.400"
          color="brand.red"
        />
        <Heading color="brand.red">{label}</Heading>
      </HStack>
      <Drawer isOpen={isOpen} btnRef={btnRef} onClose={onClose} />
      {children}
    </React.Fragment>
  );
}
