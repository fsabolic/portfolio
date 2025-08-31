import { useEffect, useRef, useState } from "react";
import classes from "./desktop.module.css";
import { DesktopCell } from "./Cell/DesktopCell";
import type { IconCellContent } from "../../models/IconCellContent";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useDesktopCells } from "../../hooks/useDesktopCells";
import type { CellContentBase } from "../../models/CellContentBase";
import { CellContentTypes } from "../../models/constants/CellContentTypes";

export default function Desktop() {
  const desktopRef = useRef<HTMLDivElement | null>(null);
  const [activeCell, setActiveCell] = useState<CellContentBase | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 1 } })
  );
  const { cellMap, desktopCells, updateCell, setColumnCount, setRowCount } =
    useDesktopCells({ rows: 2, columns: 2 });

  useEffect(() => {
    if (!desktopRef.current) return;

    const style = window.getComputedStyle(desktopRef.current);
    const columns = style.gridTemplateColumns.split(" ").length;
    const rows = style.gridTemplateRows.split(" ").length;

    setColumnCount(columns);
    setRowCount(rows);
  }, [setColumnCount, setRowCount]);

  const moveCellToTarget = (
    dragged: CellContentBase,
    target: CellContentBase
  ) => {
    if (target.type !== CellContentTypes.empty) return;

    const updatedCell: CellContentBase = {
      ...dragged,
      row: target.row,
      column: target.column,
    };

    updateCell(dragged.id, updatedCell);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const dragged = cellMap.get(event.active.id.toString());
    if (dragged) setActiveCell(dragged);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    if (!activeCell) return;

    const target = desktopCells.find((cell) => cell.id === event.over?.id);
    if (target) moveCellToTarget(activeCell, target);

    setActiveCell(null);
  };

  const renderCell = (cell: CellContentBase | null) => {
    if (!cell) return null;

    switch (cell.type) {
      case CellContentTypes.icon:
        return (
          <DesktopCell.Icon key={cell.id} cell={cell as IconCellContent} />
        );
      case CellContentTypes.empty:
        return <DesktopCell.Empty key={cell.id} id={cell.id} />;
      default:
        return null;
    }
  };

  return (
    <main className={classes.desktopContainer}>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div ref={desktopRef} className={classes.desktop}>
          {desktopCells.map(renderCell)}
        </div>

        <DragOverlay className={classes.dragOverlay}>
          {renderCell(activeCell)}
        </DragOverlay>
      </DndContext>
    </main>
  );
}
