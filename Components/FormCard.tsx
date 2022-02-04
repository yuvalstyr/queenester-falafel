import { useDisclosure } from "@chakra-ui/hooks"
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import { Box, Heading, HStack } from "@chakra-ui/layout"
import { useBreakpointValue } from "@chakra-ui/media-query"
import { Collapse } from "@chakra-ui/react"

import * as React from "react"

export function FormCard({
  title,
  open,
  children,
}: {
  title: string
  open?: boolean
  children: React.ReactNode
}) {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: open })
  const size = useBreakpointValue({ base: "6", md: "8" })

  return (
    <Box
      boxShadow="dark-lg"
      marginTop={{ base: "4", xl: "12" }}
      p={{ base: "2", md: "6", xl: "8" }}
      rounded="md"
      bg="brand.white"
      width={{ base: "100vw", md: "60vw", xl: "30vw" }}
      borderColor="brand.border"
      borderWidth={{ base: "2px", md: "4px" }}
    >
      <HStack
        p="2"
        rounded="md"
        mt={{ base: "-15", md: "-12", xl: "-16" }}
        mb="4"
        bg="brand.white"
        borderWidth={{ base: "8px", md: "12px" }}
        borderColor="brand.gray"
        color="brand.border"
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
  )
}
