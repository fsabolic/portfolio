import { useEffect, useState, type ReactNode } from "react";
import type { DesktopWindow } from "../models/DesktopWindow";
import { WindowsContext } from "../hooks/useWindows";

type Props = {
  children: ReactNode;
};

export const WindowsProvider = ({ children }: Props) => {
  const [openWindows, setOpenWindows] = useState<DesktopWindow[]>([]);
  const [activeWindow, setActiveWindow] = useState<DesktopWindow | null>(null);

  const closeWindow = (id: string) => {
    setOpenWindows((prev) => {
      return prev.filter((window) => window.id != id);
    });
  };

  const openWindow = (newWindow: DesktopWindow) => {
    setOpenWindows((prev) => {
      const isOpen = prev.some((window) => window.id === newWindow.id);

      setActiveWindow(newWindow);
      if (isOpen) {
        return prev;
      }

      return [...prev, newWindow];
    });
  };

  const updateWindow = (id: string, updatedWindow: DesktopWindow) => {
    setOpenWindows((prev) => {
      return prev.map((window) => {
        if (window.id == id) {
          return { ...window, ...updatedWindow };
        }
        return window;
      });
    });
  };

  useEffect(() => {
    setOpenWindows((prev) => {
      return prev.map((window) => {
        if (window.id == activeWindow?.id) {
          return { ...window, isFocused: true };
        }
        return { ...window, isFocused: false };
      });
    });
  }, [activeWindow]);

  return (
    <WindowsContext.Provider
      value={{
        openWindows,
        openWindow,
        activeWindow,
        setActiveWindow,
        updateWindow,
        closeWindow,
      }}
    >
      {children}
    </WindowsContext.Provider>
  );
};
