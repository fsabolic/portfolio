import { createContext, useContext } from "react";
import type { DesktopWindow } from "../models/DesktopWindow.tsx";

interface WindowContextProps {
  openWindows: DesktopWindow[];
  openWindow: (newWindow: DesktopWindow) => void;
  activeWindow: DesktopWindow | null;
  setActiveWindow: (window: DesktopWindow) => void;
  updateWindow: (id: string, window: DesktopWindow) => void;
  closeWindow: (id: string) => void;
}

export const WindowsContext = createContext({} as WindowContextProps);
export const useWindows = () => useContext(WindowsContext);
