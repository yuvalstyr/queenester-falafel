import { Button, ButtonProps } from "@chakra-ui/react"
import NextLink, { LinkProps as NextLinkProps } from "next/link"
import React from "react"
/* @ts-ignore */
export interface ButtonRouteLinkProps
  extends Omit<NextLinkProps, "as" | "href" | "onClick">,
    ButtonProps {
  to: string
}

export const ButtonRouteLink: React.FC<ButtonRouteLinkProps> = ({
  to,
  children,
  ...props
}) => (
  <NextLink href={to} passHref>
    <Button as="a" {...props}>
      {children}
    </Button>
  </NextLink>
)
