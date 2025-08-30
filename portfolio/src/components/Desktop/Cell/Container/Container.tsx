import type { ReactElement } from "react";
import classes from "./container.module.css";
import type Content from "../Content/Content";

interface DesktopCellProps extends React.HTMLAttributes<HTMLDivElement> {
  index: number;
  children: ReactElement<typeof Content>;
}

function Container(props: DesktopCellProps) {
  const handleCellClick = () => {
    console.log("Pressed: ", props.index);
  };

  return (
    <div className={classes.container} onClick={handleCellClick}>
      {props.children}
    </div>
  );
}

export default Container;
