import { useEffect, useState, useCallback, useMemo } from "react";
import { useTheme } from "./useTheme";
import { makeIconCellContentObject } from "../utils/factoryFunctions/makeIconCellContentObject";
import { makeEmptyCellContentObject } from "../utils/factoryFunctions/makeEmptyCellContentObject";
import type { CellContentBase } from "../models/CellContentBase";
import type { IconCellContent } from "../models/IconCellContent";
import { CellContentTypes } from "../models/constants/CellContentTypes";
import { useWindows } from "./useWindows";
import type { GridOptions } from "../models/GridOptions";
import type { IconDefinition } from "../models/IconDefinition";

export const useDesktopCells = ({ rows = 120, columns = 120 }: GridOptions) => {
  const { theme } = useTheme();
  const { openWindow } = useWindows();
  const [rowCount, setRowCount] = useState(rows);
  const [columnCount, setColumnCount] = useState(columns);

  const iconCellDefinitions: IconDefinition[] = useMemo(
    () => [
      { row: 0, column: 0, title: "a" },
      { row: 0, column: 1, title: "b" },
      { row: 0, column: 2, title: "c" },
      { row: 1, column: 0, title: "d" },
      { row: 1, column: 1, title: "i" },
      { row: 1, column: 2, title: "j" },
      { row: 2, column: 0, title: "q" },
      { row: 2, column: 1, title: "ae" },
      { row: 2, column: 2, title: "af" },
      { row: 3, column: 0, title: "al" },
      { row: 3, column: 1, title: "am" },
      { row: 3, column: 2, title: "an" },
      { row: 4, column: 0, title: "as" },
    ],
    []
  );

  const initializeCellMap = useCallback((): Map<string, CellContentBase> => {
    const map = new Map<string, CellContentBase>();
    iconCellDefinitions.forEach((def, index) => {
      const id = index.toString();
      map.set(
        id,
        makeIconCellContentObject({
          id,
          row: def.row,
          column: def.column,
          value: {
            title: def.title,
            icon: "iconTest",
            contains: [],
            onClick: () => {
              openWindow({
                id: id,
                dimensions: {
                  height: Math.random() * 800 + 100,
                  width: Math.random() * 800 + 500,
                },
                coordinates: {
                  x: Math.random() * 1000,
                  y: Math.random() * 500,
                },
                isFocused: false,
                title: { text: def.title, icon: "iconTest" },
              });
            },
          },
        })
      );
    });

    return map;
  }, [iconCellDefinitions, openWindow]);

  const [cellMap, setCellMap] =
    useState<Map<string, CellContentBase>>(initializeCellMap);

  const desktopCells = useMemo(() => {
    const cells: Array<CellContentBase | null> = Array(
      rowCount * columnCount
    ).fill(null);

    cellMap.forEach((cell) => {
      if (cell.row < rowCount && cell.column < columnCount) {
        cells[cell.column + cell.row * columnCount] = cell;
      }
    });

    return cells.map(
      (cell, index) =>
        cell ??
        makeEmptyCellContentObject({
          id: crypto.randomUUID(),
          column: index % columnCount,
          row: Math.floor(index / columnCount),
        })
    );
  }, [cellMap, rowCount, columnCount]);

  useEffect(() => {
    setCellMap((prev) => {
      const updatedMap = new Map(prev);
      updatedMap.forEach((cell, id) => {
        if (cell.type === CellContentTypes.icon) {
          const iconCell = cell as IconCellContent;
          updatedMap.set(id, {
            ...iconCell,
          } as IconCellContent);
        }
      });
      return updatedMap;
    });
  }, [theme]);

  const updateCell = useCallback((id: string, newCell: CellContentBase) => {
    setCellMap((prev) => new Map(prev).set(id, newCell));
  }, []);

  return {
    cellMap,
    desktopCells,
    updateCell,
    setCellMap,
    setRowCount,
    setColumnCount,
  };
};
