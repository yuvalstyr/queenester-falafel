// This will enable you to extend the theme
import { extendTheme } from "@chakra-ui/react";

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
};

const colors = {
  brand: {
    blue: {
      50: "#e3f7f5",
      100: "#cce0dc",
      200: "#b3c9c6",
      300: "#97b2b0",
      400: "#7c9c9a",
      500: "#63837f",
      600: "#4b6661",
      700: "#344a43",
      800: "#1b2d27",
      900: "#001207",
    },
    red: "hsl(8, 49%, 41%)",
    yellow: "hsl(40, 80%, 66%)",
    pink: "hsl(344, 60%, 95%)",
  },
};

// Use the style in the theme and return it
const theme = extendTheme({ styles, colors });
export default theme;
