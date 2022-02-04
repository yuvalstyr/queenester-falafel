import { IconButton } from "@chakra-ui/button"
import { useDisclosure } from "@chakra-ui/hooks"
import { HamburgerIcon } from "@chakra-ui/icons"
import { Heading, HStack } from "@chakra-ui/layout"
import { Img, useBreakpointValue, Link } from "@chakra-ui/react"
import { useRouter } from "next/dist/client/router"
import React from "react"
import { Drawer } from "./Drawer"
import NextLink from "next/link"

const links = [
  { label: "Home", to: "/" },
  { label: "Cost & Profit", to: "/form" },
  { label: "Performance", to: "/dashboard" },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const size = useBreakpointValue({ base: "sm", lg: "lg" })
  const router = useRouter()
  const btnRef = React.useRef()

  const label =
    router.asPath === "/"
      ? ""
      : router.asPath === "/dashboard"
      ? "Dashboard"
      : "Shift Income & Cost"

  function DesktopNav() {
    return (
      <HStack
        bg="brand.white"
        pl="2"
        justifyContent="space-between"
        borderBottomColor="brand.border"
        borderBottomWidth="2px"
        borderBottomStyle="solid"
      >
        <Img src="/logo.png" h="100px" />
        <HStack justifySelf="flex-start">
          {links.map((l) => (
            <NextLink href={l.to} passHref key={l.label}>
              <Link
                color="brand.border"
                fontWeight="bold"
                fontSize="4xl"
                pl="8"
                onClick={onClose}
              >
                {l.label}
              </Link>
            </NextLink>
          ))}
        </HStack>
      </HStack>
    )
  }

  function MobileNav() {
    return (
      <React.Fragment>
        <HStack
          bg="brand.white"
          p="2"
          justifyContent="flex-start"
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
            bg="brand.white"
            color="brand.black"
          />
          <Heading color="brand.border">{label}</Heading>
        </HStack>
        <Drawer isOpen={isOpen} btnRef={btnRef} onClose={onClose} />
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      {size === "sm" ? <MobileNav /> : <DesktopNav />}
      {children}
    </React.Fragment>
  )
}
