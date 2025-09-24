import {
  dragHandles,
  type DragHandle,
} from "../../../../models/constants/DragHandle";
import classes from "./window-resize-handler-grid.module.css";

interface WindowResizeHandlerGridProps {
  onResizeStart: (handle: DragHandle, e: React.PointerEvent) => void;
}

function WindowResizeHandlerGrid({
  onResizeStart,
}: WindowResizeHandlerGridProps) {
  return (
    <div className={classes.borderGrid}>
      {dragHandles.map((element) => (
        <div
          key={element.toLowerCase()}
          className={classes[element]}
          onPointerDown={(e) => onResizeStart(element, e)}
        ></div>
      ))}
    </div>
  );
}

export default WindowResizeHandlerGrid;
