import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext } from "../hooks/useTheme";
import { storedTheme } from "../utils/localStores/ThemeStorage";
import type { ThemeName } from "../themes/ThemeName";
import type { Theme } from "../themes/Theme";
import { retroOsTheme } from "../themes/retroOsTheme/retroOsTheme";
import { availableThemes } from "../themes/availableThemes";
type Props = {
  children: ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>(retroOsTheme);

  useEffect(() => {
    const savedTheme: Theme | null = storedTheme.getTheme();
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const handleChange = (selectedTheme: ThemeName) => {
    setTheme(
      availableThemes.find((theme) => theme.name == selectedTheme) ??
        retroOsTheme
    );
    storedTheme.setTheme(selectedTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        onThemeChange: handleChange,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
