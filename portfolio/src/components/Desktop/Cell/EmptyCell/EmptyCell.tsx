import { DesktopCell } from "../DesktopCell";

interface EmptyCellProps {
  id: string;
}

function EmptyCell(props: EmptyCellProps) {
  return (
    <DesktopCell.Container id={props.id}>
      <></>
    </DesktopCell.Container>
  );
}

export default EmptyCell;
