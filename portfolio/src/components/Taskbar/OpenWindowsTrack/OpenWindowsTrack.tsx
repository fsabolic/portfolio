import { useWindows } from "../../../hooks/useWindows";
import classes from "./open-windows-track.module.css";
import OpenWindowTag from "./OpenWindowTag/OpenWindowTag";

function OpenWindowsTrack() {
  const { openWindows } = useWindows();
  return (
    <div className={classes.fileSystemTrack}>
      {openWindows.map((window) => {
        return <OpenWindowTag key={window.id} window={window} />;
      })}
    </div>
  );
}

export default OpenWindowsTrack;
