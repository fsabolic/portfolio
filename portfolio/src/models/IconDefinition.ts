import type { Dimensions2D } from "./Dimensions2D";
import type { IconKey } from "./IconKey";

interface WindowSettings {
  dimensions?: Dimensions2D;
}

export interface IconDefinition {
  row: number;
  column: number;
  title: string;
  icon: IconKey;
  windowSettings: WindowSettings;
}
