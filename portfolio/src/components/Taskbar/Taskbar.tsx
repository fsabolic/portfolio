import ThemeControlPanel from "../ThemeControlPanel/ThemeControlPanel";
import classes from "./taskbar.module.css";

export default function Taskbar() {
  return (
    <footer className={classes.taskbarContainer}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <p>Future Taskbar</p>
        <ThemeControlPanel />
      </div>
    </footer>
  );
}
