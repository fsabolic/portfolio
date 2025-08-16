import { createContext, useContext } from "react";

import type { ThemeName } from "../themes/ThemeName";
import type { Theme } from "../themes/Theme";

interface ThemeContextProps {
  theme: Theme;
  onThemeChange: (theme: ThemeName) => void;
}

export const ThemeContext = createContext({} as ThemeContextProps);
export const useTheme = () => useContext(ThemeContext);
