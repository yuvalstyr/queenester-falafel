import { Box, Text, Wrap, WrapItem } from "@chakra-ui/layout";
import { useBreakpointValue } from "@chakra-ui/react";
import { Container } from "next/app";
import Image from "next/image";

type Photo = {
  name: string;
  type: "button" | "pic" | "logo";
};

const photos: Photo[] = [
  { name: "logo", type: "logo" },
  { name: "mom", type: "pic" },
  { name: "balagan", type: "pic" },
  { name: "dinner", type: "pic" },
  { name: "pita", type: "pic" },
  { name: "plans", type: "logo" },
];

function Gallery() {
  const width = useBreakpointValue({ base: 150, md: 300, lg: 450 });
  const height = useBreakpointValue({ base: 150, md: 300, lg: 450 });

  return (
    <Box overflow="hidden" bg="brand.yellow" minH="100vh">
      <Text
        color="brand.red"
        fontWeight="semibold"
        mb="1rem"
        textAlign="center"
        fontSize={["3xl", "4xl", "5xl", "5xl"]}
        flex="1"
      >
        Welcome to Fuel By Night
      </Text>
      <Wrap px="1rem" spacing={4} justify="center">
        {photos.map((pic) => (
          <WrapItem
            key={pic.name}
            boxShadow="base"
            rounded="20px"
            overflow="hidden"
            bg="white"
            lineHeight="0"
            _hover={{ boxShadow: "dark-lg" }}
          >
            <Image
              src={`/${pic.name}.jpg`}
              height={height ?? 300}
              width={width ?? 300}
              alt={pic.name}
            />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  );
}

export default Gallery;
