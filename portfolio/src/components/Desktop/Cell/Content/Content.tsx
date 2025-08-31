import { useDraggable } from "@dnd-kit/core";
import classes from "./content.module.css";
interface DesktopCellContentProps extends React.HTMLAttributes<HTMLDivElement> {
  id: string;
}

function Content(props: DesktopCellContentProps) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: props.id,
  });

  return (
    <>
      <div
        ref={setNodeRef}
        className={classes.contentContainer}
        {...listeners}
        {...attributes}
      >
        {props.children}
      </div>
    </>
  );
}

export default Content;
