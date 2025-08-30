import { useEffect, useMemo, useRef, useState } from "react";
import classes from "./desktop.module.css";
import { gridElements } from "./grid-elements";
import { DesktopCell } from "./Cell/DesktopCell";
import type { IconCellContent } from "../../models/IconCellContent";

export default function Desktop() {
  const desktopDivRef = useRef<HTMLDivElement | null>(null);
  const [columnNumber, setColumnNumber] = useState(10);
  const [rowNumber, setRowNumber] = useState(5);

  useEffect(() => {
    if (desktopDivRef.current) {
      const style = window.getComputedStyle(desktopDivRef.current);
      const columns = style.gridTemplateColumns.split(" ").length;
      const rows = style.gridTemplateRows.split(" ").length;
      setColumnNumber(columns);
      setRowNumber(rows);
    }
  }, []);

  const gridList = useMemo(() => {
    const tempList = new Array<IconCellContent | null>(
      rowNumber * columnNumber
    ).fill(null);
    gridElements.forEach((element) => {
      if (element.column < columnNumber && element.row < rowNumber) {
        tempList[element.column + element.row * columnNumber] = element;
      }
    });
    return tempList;
  }, [rowNumber, columnNumber]);

  const desktopCellsGrid = gridList.map((cell, index) => {
    return cell ? (
      <DesktopCell.Icon key={index} cell={cell} index={index} />
    ) : (
      <DesktopCell.Empty key={index} index={index} />
    );
  });

  return (
    <main className={classes.desktopContainer}>
      <div ref={desktopDivRef} className={classes.desktop}>
        {desktopCellsGrid}
      </div>
    </main>
  );
}
