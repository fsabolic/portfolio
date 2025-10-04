import ThemeControlPanel from "../ThemeControlPanel/ThemeControlPanel";
import OpenWindowsTrack from "./OpenWindowsTrack/OpenWindowsTrack";
import classes from "./taskbar.module.css";

export default function Taskbar() {
  return (
    <footer className={classes.taskbarContainer}>
      <div className={classes.osButton}>123</div>
      <OpenWindowsTrack />
      <div className={classes.utilities}>
        <ThemeControlPanel />
      </div>
    </footer>
  );
}
