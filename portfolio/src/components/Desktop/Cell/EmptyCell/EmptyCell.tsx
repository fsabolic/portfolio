import { DesktopCell } from "../DesktopCell";

interface EmptyCellProps {
  index: number;
}

function EmptyCell(props: EmptyCellProps) {
  return (
    <DesktopCell.Container index={props.index}>
      <></>
    </DesktopCell.Container>
  );
}

export default EmptyCell;
