// This will enable you to extend the theme
import { extendTheme } from "@chakra-ui/react";

// This will apply a `backgroundColor`, font `color` to the html, body elements
// Colors equivalent can be found here => https://chakra-ui.com/docs/theming/theme
const styles = {
  global: {
    "html, body": {
      color: "white",
      backgroundColor: "blue.900",
    },
  },
};

// Use the style in the theme and return it
const theme = extendTheme({ styles });
export default theme;
