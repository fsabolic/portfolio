import { useTheme } from "../../hooks/useTheme";
import type { ThemeName } from "../../themes/ThemeName";
import classes from "./desktop.module.css";

export default function Desktop() {
  const { onThemeChange, theme } = useTheme();

  const themeButtons = [
    { key: "colors-os", label: "ColorsOS", backgroundColor: "#9eef9eff" },
    {
      key: "modern-glass-os",
      label: "ModernGlassOS",
      backgroundColor: "#b2b2f6ff",
    },
    { key: "retro-os", label: "RetroOS", backgroundColor: "#ff9a9aff" },
  ];

  return (
    <main className={classes.desktop_container}>
      <div className={classes.desktop}>
        <div>
          <p>Theme icon:</p>
          <img src={theme.icons.iconTest} height="50px" width="50px" />
        </div>
        <div style={{ display: "flex", gap: "20px" }}>
          {themeButtons.map(({ key, label, backgroundColor }) => (
            <button
              style={{ width: "150px", height: "50px", backgroundColor }}
              key={key}
              onClick={() => onThemeChange(key as ThemeName)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
