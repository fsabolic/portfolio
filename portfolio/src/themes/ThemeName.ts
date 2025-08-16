export const themeNames = ["retro-os", "modern-glass-os", "colors-os"] as const;
export type ThemeName = (typeof themeNames)[number];
