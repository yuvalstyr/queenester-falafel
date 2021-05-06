import { Box, Center, HStack, VStack } from "@chakra-ui/layout"
import { useBreakpointValue } from "@chakra-ui/media-query"
import * as React from "react"

export function ResponsiveCardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const size = useBreakpointValue({ base: "sm", xl: "lg" })

  const Component = size === "sm" ? VStack : HStack
  return (
    <Center>
      <Component alignItems="baseline">{children}</Component>
    </Center>
  )
}
