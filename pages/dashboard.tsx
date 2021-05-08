import {
  Box,
  Center,
  Container,
  Heading,
  HStack,
  Image,
  Img,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { DateBar } from "../Components/DateBar";

const PROFIT =
  "https://app.croneri.co.uk/sites/default/files/green%20finance.jpg";

const EXPENSE =
  "https://www.taxlawforchb.com/wp-content/uploads/sites/127/2015/04/receipts-1.jpg";

export function ScoreCard({ imageURL, label }) {
  return (
    <HStack
      boxShadow="dark-lg"
      p={{ base: "2", md: "8" }}
      rounded="md"
      bg="brand.yellow"
      width={{ base: "100vw", md: "30vw" }}
    >
      <Box w="40%">
        <Image
          src={imageURL}
          objectFit="fill"
          shadow="2xl"
          rounded="md"
          h="100px"
          w="150px"
        />
      </Box>
      <Box>
        <Heading size="lg" color="brand.red" textTransform="capitalize">
          {label}
        </Heading>
        <Text fontSize="2xl">$57</Text>
      </Box>
    </HStack>
  );
}

export default function Dashboard() {
  const [date, setDate] = React.useState(new Date());
  return (
    <Box>
      <DateBar date={date} setDate={setDate} />
      <VStack spacing="2">
        <ScoreCard imageURL={PROFIT} label="profit" />
        <ScoreCard imageURL={EXPENSE} label="expense" />
      </VStack>
    </Box>
  );
}
