import { DesktopCell } from "../DesktopCell";
import type { IconCellContent } from "../../../../models/IconCellContent";
import classes from "./icon-cell.module.css";
import { useTheme } from "../../../../hooks/useTheme";

interface IconCellProps {
  cell: IconCellContent;
  index: number;
}

function IconCell(props: IconCellProps) {
  const { theme } = useTheme();
  return (
    <DesktopCell.Container index={props.index}>
      <DesktopCell.Content index={props.index}>
        <div className={classes.cellContent}>
          <img src={theme.icons.iconTest} className={classes.cellImage} />
          <p className={classes.cellText}>
            {props.cell.value} {props.index}
          </p>
        </div>
      </DesktopCell.Content>
    </DesktopCell.Container>
  );
}

export default IconCell;
