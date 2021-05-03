import { Input } from "@chakra-ui/input"
import { Text } from "@chakra-ui/layout"
import { chakra } from "@chakra-ui/system"

// TODO change to compound

export const TextLabel = chakra(Text, {
  baseStyle: {
    position: "absolute",
    color: "gray.500",
    transform: "translatey(-1.75em)",
    transformOrigin: "top left",
    transition: "all 0.2s ease-out",
    pointerEvents: "none",
    textTransform: "capitalize",
    ml: "2",
  },
})

export const InputWithLabel = chakra(Input, {
  baseStyle: {
    transition: "all 0.5s ease-out",
    borderColor: "blackAlpha.100",
    fontSize: "inherit",
    _placeholder: {
      color: "transparent",
    },
    _focus: {
      outline: "none",
      borderColor: "orange",
    },
    ":focus + p": {
      transform: "translateY(-3em) scale(0.8)",
      color: "gray.500",
    },
    ":not(:placeholder-shown) + p": {
      transform: "translateY(-3em) scale(0.8)",
      color: "gray.500",
    },
  },
})
