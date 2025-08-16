import { availableThemes } from "../../themes/availableThemes";
import type { Theme } from "../../themes/Theme";
import { type ThemeName } from "../../themes/ThemeName";

export const storedTheme = {
  key: "THEME",
  getTheme: (): Theme | null => {
    const themeName = localStorage.getItem(storedTheme.key);
    return availableThemes.find((theme) => theme.name == themeName) ?? null;
  },
  setTheme: (value: ThemeName) => {
    return localStorage.setItem(storedTheme.key, value);
  },
};
