import { extendTheme, ThemeConfig, ColorMode } from "@chakra-ui/react";
import { Dict } from "@chakra-ui/utils";
import { colors, fonts } from "./themeProps";

export const storageKey = "chakra-ui-color-mode";
let colorModeInLocalStorage;
if (typeof window !== "undefined") {
  colorModeInLocalStorage = localStorage.getItem(storageKey) as ColorMode;
}
const useSystemColorMode = !colorModeInLocalStorage;

const config: ThemeConfig = {
  useSystemColorMode,
  initialColorMode: "light",
  cssVarPrefix: "chakra",
};

const theme: Dict = extendTheme({
  config,
  colors,
  fonts,
});

export default theme;
