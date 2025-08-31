import { DesktopCell } from "../DesktopCell";
import type { IconCellContent } from "../../../../models/IconCellContent";
import classes from "./icon-cell.module.css";

interface IconCellProps {
  cell: IconCellContent;
}

function IconCell(props: IconCellProps) {
  return (
    <DesktopCell.Container id={props.cell.id}>
      <DesktopCell.Content id={props.cell.id}>
        <div
          id={props.cell.id}
          className={classes.cellContent}
          onDoubleClick={props.cell.value.onClick}
        >
          <img src={props.cell.value.icon} className={classes.cellImage} />
          <p className={classes.cellText}>
            {props.cell.value.title}'{props.cell.id}
          </p>
        </div>
      </DesktopCell.Content>
    </DesktopCell.Container>
  );
}

export default IconCell;
