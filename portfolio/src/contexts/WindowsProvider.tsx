import { useEffect, useState, type ReactNode } from "react";
import type { DesktopWindow } from "../models/DesktopWindow.tsx";
import { WindowsContext } from "../hooks/useWindows";
import type { Dimensions2D } from "../models/Dimensions2D";
import type { Coordinates2D } from "../models/Coordinates2D";

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

  const calculateAutoPosition = (
    newWindowDimensions: Dimensions2D,
    previousWindow: DesktopWindow | null
  ) => {
    const screenDimensions: Dimensions2D = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    const defaultDimensions: Dimensions2D = {
      width: newWindowDimensions.width,
      height: newWindowDimensions.height,
    };

    const middleCoordinates: Coordinates2D = {
      x: (screenDimensions.width - defaultDimensions.width) / 2,
      y: (screenDimensions.height - defaultDimensions.height) / 2,
    };

    if (!previousWindow) {
      return middleCoordinates;
    }

    const offset = 30;
    const resultCoordinates = {
      x: previousWindow.coordinates.x + offset,
      y: previousWindow.coordinates.y + offset,
    };

    const isWiderThanScreen =
      resultCoordinates.x + defaultDimensions.width > screenDimensions.width;
    const isLowerThanScreen =
      resultCoordinates.y + defaultDimensions.height > screenDimensions.height;

    if (isWiderThanScreen || isLowerThanScreen) {
      return middleCoordinates;
    }

    return resultCoordinates;
  };

  const openWindow = (newWindow: DesktopWindow) => {
    setOpenWindows((prev) => {
      const isOpen = prev.some((window) => window.id === newWindow.id);
      if (isOpen) {
        setActiveWindow(newWindow);
        return prev;
      }

      const previousWindow = prev.length > 0 ? prev[prev.length - 1] : null;
      const { x, y }: Coordinates2D = newWindow.blockAutoPositioning
        ? newWindow.coordinates
        : calculateAutoPosition(newWindow.dimensions, previousWindow);

      const positionedWindow: DesktopWindow = {
        ...newWindow,
        coordinates: { x, y },
      };

      setActiveWindow(positionedWindow);
      return [...prev, positionedWindow];
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
