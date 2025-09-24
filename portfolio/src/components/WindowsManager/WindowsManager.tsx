import { useWindows } from "../../hooks/useWindows";
import { DesktopWindow } from "./DesktopWindow/DesktopWindow";
import classes from "./windows-manager.module.css";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";

function WindowsManager() {
  const { openWindows, updateWindow, setActiveWindow } = useWindows();
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  const handleWindowDragStart = (event: DragStartEvent) => {
    const existingWindow = openWindows.find(
      (window) => window.id == event.active.id
    );
    if (!existingWindow) {
      return;
    }

    setActiveWindow(existingWindow);
  };

  const handleWindowDragEnd = (event: DragEndEvent) => {
    const existingWindow = openWindows.find(
      (window) => window.id == event.active.id
    );
    if (!existingWindow) {
      return;
    }
    updateWindow(existingWindow?.id, {
      ...existingWindow,
      coordinates: {
        x: existingWindow.coordinates.x + event.delta.x,
        y: existingWindow.coordinates.y + event.delta.y,
      },
    });
  };
  return (
    <DndContext
      autoScroll={false}
      sensors={sensors}
      onDragStart={handleWindowDragStart}
      onDragEnd={handleWindowDragEnd}
    >
      <div className={classes.windowsManager}>
        <div>
          {openWindows.map((window) => {
            return <DesktopWindow key={window.id} window={window} />;
          })}
        </div>
      </div>
    </DndContext>
  );
}

export default WindowsManager;
