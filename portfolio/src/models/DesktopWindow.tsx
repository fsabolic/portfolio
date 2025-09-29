import type { JSX } from "react";
import type { Coordinates2D } from "./Coordinates2D";
import type { Dimensions2D } from "./Dimensions2D";
import type { WindowTitle } from "./WindowTitle";

export interface DesktopWindow {
  id: string;
  title: WindowTitle;
  coordinates: Coordinates2D;
  isFocused: boolean;
  dimensions: Dimensions2D;
  blockAutoPositioning?: boolean;
  content: JSX.Element;
}
