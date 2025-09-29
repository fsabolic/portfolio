import type { DesktopWindow } from "../../../models/DesktopWindow";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useWindows } from "../../../hooks/useWindows";
import classes from "./desktop-window.module.css";
import { useMemo, useState, useEffect, useRef } from "react";
import { type DragHandle } from "../../../models/constants/DragHandle";
import WindowTitleBar from "./WindowTitleBar/WindowTitleBar";
import WindowResizeHandlerGrid from "./WindowResizeHandlerGrid/WindowResizeHandlerGrid";

interface DesktopWindowProps {
  window: DesktopWindow;
}

export function DesktopWindow({ window }: DesktopWindowProps) {
  const [isResizing, setIsResizing] = useState(false);
  const [windowState, setWindowState] = useState(window);
  const stateRef = useRef(windowState);
  const { setNodeRef, transform, listeners, attributes, setActivatorNodeRef } =
    useDraggable({
      id: window.id,
      disabled: isResizing,
    });
  const { setActiveWindow, closeWindow, updateWindow } = useWindows();
  const style = useMemo(
    () => ({
      transform: !isResizing ? CSS.Translate.toString(transform) : undefined,
      zIndex: windowState.isFocused ? 50 : 25,
      top: windowState.coordinates.y,
      left: windowState.coordinates.x,
      height: windowState.dimensions.height,
      width: windowState.dimensions.width,
      overflow: "hidden",
    }),
    [transform, windowState, isResizing]
  );

  useEffect(() => {
    stateRef.current = windowState;
  }, [windowState]);

  useEffect(() => {
    if (!isResizing) {
      setWindowState(window);
    }
  }, [window, isResizing]);

  const handleWindowClick = () => {
    setActiveWindow(window);
  };

  const handleCloseClick = () => {
    closeWindow(window.id);
  };

  const startResize = (handle: DragHandle, e: React.PointerEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const { width: startWidth, height: startHeight } = windowState.dimensions;
    const { x: startXPos, y: startYPos } = windowState.coordinates;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startXPos;
      let newY = startYPos;

      switch (handle) {
        case "topLeft":
          newWidth = startWidth - dx;
          newHeight = startHeight - dy;
          newX = startXPos + dx;
          newY = startYPos + dy;
          break;
        case "middleRight":
          newWidth = startWidth + dx;
          break;
        case "middleMiddle":
          return;
        case "topMiddle":
          newHeight = startHeight - dy;
          newY = startYPos + dy;
          break;
        case "middleLeft":
          newWidth = startWidth - dx;
          newX = startXPos + dx;
          break;
        case "bottomMiddle":
          newHeight = startHeight + dy;
          break;
        case "topRight":
          newWidth = startWidth + dx;
          newHeight = startHeight - dy;
          newY = startYPos + dy;
          break;
        case "bottomLeft":
          newWidth = startWidth - dx;
          newHeight = startHeight + dy;
          newX = startXPos + dx;
          break;
        case "bottomRight":
          newWidth = startWidth + dx;
          newHeight = startHeight + dy;
          break;
      }

      const minimalResizeWidth = 20;
      const minimalResizeHeight = 20;
      if (newWidth > minimalResizeWidth && newHeight > minimalResizeHeight) {
        setWindowState((prev) => ({
          ...prev,
          dimensions: { width: newWidth, height: newHeight },
          coordinates: { x: newX, y: newY },
        }));
      }
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      target.releasePointerCapture(upEvent.pointerId);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);

      setIsResizing(false);
      updateWindow(stateRef.current.id, stateRef.current);
    };

    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  };

  return (
    <div
      onClick={handleWindowClick}
      ref={setNodeRef}
      className={classes.windowContainer}
      style={style}
    >
      <WindowResizeHandlerGrid onResizeStart={startResize} />
      <WindowTitleBar
        title={window.title}
        onClose={handleCloseClick}
        setActivatorNodeRef={setActivatorNodeRef}
        listeners={listeners}
        attributes={attributes}
      />
      {window.content}
    </div>
  );
}

export default DesktopWindow;
