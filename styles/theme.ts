// This will enable you to extend the theme
import { extendTheme } from "@chakra-ui/react"

// This will apply a `backgroundColor`, font `color` to the html, body elements
// Colors equivalent can be found here => https://chakra-ui.com/docs/theming/theme
const styles = {
  global: {
    "html, body": {
      color: "black",
      backgroundColor: "white",
      fontFamily: "Times New Roman, sans-serif",
    },
  },
}

const colors = {
  brand: {
    red: "hsl(8, 49%, 41%)",
    yellow: "hsl(40, 80%, 66%)",
    pink: "hsl(344, 60%, 95%)",
    black: "hsl(0, 0%, 11%)",
    gray: "hsl(240, 1%, 74%)",
    white: "hsl(200, 33%, 98%)",
    border: "hsl(67, 7%, 25%)",
  },
}

// Use the style in the theme and return it
const theme = extendTheme({ styles, colors })
export default theme
