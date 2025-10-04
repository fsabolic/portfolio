import classes from "./open-window-tag.module.css";
import { Icon } from "../../../Icon/Icon";
import type { DesktopWindow } from "../../../../models/DesktopWindow";
import { useWindows } from "../../../../hooks/useWindows";

interface OpenWindowTag {
  window: DesktopWindow;
}

function OpenWindowTag(props: OpenWindowTag) {
  const { closeWindow } = useWindows();
  return (
    <div className={classes.openWindowTag}>
      <div className={classes.openWindowTagTitle}>
        <Icon
          src={props.window.title.icon}
          className={classes.openWindowTagIcon}
        />
        <p className={classes.openWindowTagText}>{props.window.title.text}</p>
      </div>
      <button
        className={classes.openWindowTagCloseButton}
        onClick={() => closeWindow(props.window.id)}
      >
        x
      </button>
    </div>
  );
}

export default OpenWindowTag;
