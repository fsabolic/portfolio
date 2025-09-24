import classes from "./window-title-bar.module.css";
import { type DraggableAttributes } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { Icon } from "../../../Icon/Icon";
import type { WindowTitle } from "../../../../models/WindowTitle";

interface WindowTitleBarProps {
  title: WindowTitle;
  onClose: () => void;
  setActivatorNodeRef: (element: HTMLElement | null) => void;
  listeners: SyntheticListenerMap | undefined;
  attributes: DraggableAttributes;
}

function WindowTitleBar({
  title,
  onClose,
  setActivatorNodeRef,
  listeners,
  attributes,
}: WindowTitleBarProps) {
  return (
    <div
      className={classes.windowBar}
      ref={setActivatorNodeRef}
      {...listeners}
      {...attributes}
    >
      <div className={classes.windowBarTitle}>
        {title.icon && (
          <Icon src={title.icon} className={classes.windowBarIcon} />
        )}
        <p>{title.text}</p>
      </div>
      <div className={classes.windowBarButtons}>
        <button onClick={onClose}>x</button>
      </div>
    </div>
  );
}

export default WindowTitleBar;
