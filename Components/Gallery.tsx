import { Box, Text, Wrap, WrapItem } from "@chakra-ui/layout"
import { useBreakpointValue } from "@chakra-ui/react"
import Image from "next/image"

type Photo = {
  name: string
  type: "button" | "pic" | "logo"
}

const photos: Photo[] = [
  { name: "logo", type: "logo" },
  { name: "boorekas", type: "pic" },
  { name: "falafel", type: "pic" },
  { name: "shakshuka", type: "pic" },
  { name: "street1", type: "pic" },
  { name: "street2", type: "logo" },
]

function Gallery() {
  const width = useBreakpointValue({ base: 150, md: 300, lg: 450 })
  const height = useBreakpointValue({ base: 150, md: 300, lg: 450 })

  return (
    <Box overflow="hidden" minH="100vh">
      <Text
        color="brand.black"
        fontWeight="semibold"
        mb="1rem"
        textAlign="center"
        fontSize={["3xl", "4xl", "5xl", "5xl"]}
        flex="1"
      >
        Welcome to queenester-falafel
      </Text>
      <Wrap px="1rem" spacing={4} justify="center">
        {photos.map((pic) => (
          <WrapItem
            key={pic.name}
            boxShadow="base"
            rounded="5px"
            overflow="hidden"
            lineHeight="0"
          >
            <Image
              src={`/${pic.name}.png`}
              height={height ?? 300}
              width={width ?? 300}
              alt={pic.name}
            />
          </WrapItem>
        ))}
      </Wrap>
    </Box>
  )
}

export default Gallery
