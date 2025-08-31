import { type ReactElement } from "react";
import classes from "./container.module.css";
import type Content from "../Content/Content";
import { useDroppable } from "@dnd-kit/core";

interface DesktopCellProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
  children: ReactElement<typeof Content>;
}

function Container(props: DesktopCellProps) {
  const { setNodeRef } = useDroppable({ id: props.id });
  return (
    <div ref={setNodeRef} className={classes.container}>
      {props.children}
    </div>
  );
}

export default Container;
