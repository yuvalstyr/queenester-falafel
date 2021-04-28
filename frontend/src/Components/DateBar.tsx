import { Button } from "@chakra-ui/button"
import { Box, Heading, HStack } from "@chakra-ui/layout"
import format from "date-fns/format"
import * as React from "react"
import ReactDatePicker from "react-datepicker"
import { ISelectedDate } from "./ShiftForm"

export function DateBar({ date, setDate }: ISelectedDate) {
  return (
    <Box>
      <Box
        boxShadow="dark-lg"
        p="8"
        rounded="md"
        bg="brand.yellow"
        width={["full", "full", "full", , "full", "50%"]}
      >
        <HStack
          p="2"
          rounded="md"
          mb="4"
          bg="brand.yellow"
          borderWidth="16px"
          borderColor="brand.blue.400"
          color="brand.red"
          justifyContent="space-around"
        >
          <Heading>{format(date, "PPPPpp")}</Heading>
          <ReactDatePicker
            onChange={(date: Date) => setDate(date)}
            customInput={
              <Button
                borderColor="blackAlpha.100"
                color="black"
                _placeholder={{ color: "black" }}
              >
                Pick A Day
              </Button>
            }
          />
        </HStack>
      </Box>
    </Box>
  )
}
