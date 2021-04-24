import { Box } from "@chakra-ui/layout"
import { ClientError } from "graphql-request"
import * as React from "react"

function getMessageFromClientError({ error }: { error: ClientError }) {
  const errorParse = JSON.parse(JSON.stringify(error))
  return errorParse.response.errors[0].message
}

export function ErrorBox({ error }: { error: string | ClientError }) {
  const message =
    typeof error === "string" ? error : getMessageFromClientError({ error })

  return (
    <Box
      sx={{
        color: "red",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p>{message}</p>
    </Box>
  )
}
