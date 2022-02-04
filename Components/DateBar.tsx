import { Button } from "@chakra-ui/button"
import { Box, Heading, HStack } from "@chakra-ui/layout"
import { useBreakpointValue } from "@chakra-ui/media-query"
import format from "date-fns/format"
import * as React from "react"
import ReactDatePicker, { registerLocale } from "react-datepicker"
import { ISelectedDate } from "./Forms"
import enAu from "date-fns/locale/en-AU" // the locale you want
registerLocale("en-au", enAu)

export function DateBar({ date, setDate }: ISelectedDate) {
  const dateType = useBreakpointValue({ base: "cccc dd/MM", md: "PPPPpp" })
  const size = useBreakpointValue({ base: "sm", md: "md" })

  return (
    <Box>
      <Box
        boxShadow="dark-lg"
        pt="0.5"
        pb="0.5"
        pr="0"
        pl="0"
        rounded="md"
        bg="brand.white"
        width="full"
      >
        <HStack
          p="2"
          mb="1"
          mt="1"
          rounded="md"
          bg="brand.white"
          borderWidth={{ base: "8px", md: "16px" }}
          borderColor="brand.gray"
          color="brand.black"
          justifyContent="space-around"
        >
          <Heading fontSize={{ base: "md", md: "2xl" }}>
            {format(date, dateType ?? "dd/MM/yy")}
          </Heading>
          <ReactDatePicker
            onChange={(date: Date) => setDate(date)}
            popperModifiers={{ offset: { enabled: true, offset: "-75px" } }}
            withPortal={size === "sm" ? true : false}
            locale="en-au"
            customInput={
              <Button
                mt={{ base: "4px", md: 0 }}
                variant="solid"
                width={{ base: "100px", md: "150px" }}
                fontSize={{ base: "sm", md: "xl" }}
                borderColor="brand.border"
                borderWidth="3px"
                bg="Background.white"
                color="brand.black"
                fontWeight="700"
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
