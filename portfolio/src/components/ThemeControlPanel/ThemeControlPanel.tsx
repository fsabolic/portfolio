import { useTheme } from "../../hooks/useTheme";
import type { ThemeName } from "../../themes/ThemeName";
import { Icon } from "../Icon/Icon";
import classes from "./theme-control-panel.module.css";

const themeButtons = [
  { key: "colors-os", label: "Color", backgroundColor: "#9eef9eff" },
  {
    key: "modern-glass-os",
    label: "Glass",
    backgroundColor: "#b2b2f6ff",
  },
  { key: "retro-os", label: "Retro", backgroundColor: "#ff9a9aff" },
];

function ThemeControlPanel() {
  const { onThemeChange } = useTheme();

  const handleThemeButtonClick = (key: string) => {
    onThemeChange(key as ThemeName);
  };

  return (
    <div className={classes.controlPanel}>
      <Icon src={"iconTest"} className={classes.themeIcon} />
      <div className={classes.themeButtonsContainer}>
        {themeButtons.map(({ key, label, backgroundColor }) => (
          <button
            key={key}
            className={classes.themeButton}
            style={{ backgroundColor }}
            onClick={() => handleThemeButtonClick(key)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeControlPanel;
