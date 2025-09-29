import type { Dimensions2D } from "./Dimensions2D";
import type { IconKey } from "./IconKey";
import type { JSX } from "react";

interface WindowSettings {
  dimensions?: Dimensions2D;
  content: JSX.Element;
}

export interface IconDefinition {
  row: number;
  column: number;
  title: string;
  icon: IconKey;
  windowSettings: WindowSettings;
}
