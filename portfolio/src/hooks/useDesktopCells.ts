import { useEffect, useState, useCallback, useMemo } from "react";
import { useTheme } from "./useTheme";
import { makeIconCellContentObject } from "../utils/factoryFunctions/makeIconCellContentObject";
import { makeEmptyCellContentObject } from "../utils/factoryFunctions/makeEmptyCellContentObject";
import type { CellContentBase } from "../models/CellContentBase";
import type { IconCellContent } from "../models/IconCellContent";
import { CellContentTypes } from "../models/constants/CellContentTypes";

interface GridOptions {
  rows?: number;
  columns?: number;
}

interface IconDefinition {
  row: number;
  column: number;
  title: string;
}

export const useDesktopCells = ({ rows = 120, columns = 120 }: GridOptions) => {
  const { theme } = useTheme();

  const [rowCount, setRowCount] = useState(rows);
  const [columnCount, setColumnCount] = useState(columns);

  const iconCellDefinitions: IconDefinition[] = useMemo(
    () => [
      { row: 0, column: 1, title: "a" },
      { row: 0, column: 2, title: "b" },
      { row: 0, column: 4, title: "c" },
      { row: 0, column: 6, title: "d" },
      { row: 0, column: 9, title: "e" },
      { row: 0, column: 12, title: "f" },
      { row: 0, column: 14, title: "g" },
      { row: 0, column: 17, title: "h" },
      { row: 1, column: 0, title: "i" },
      { row: 1, column: 3, title: "j" },
      { row: 1, column: 7, title: "l" },
      { row: 1, column: 10, title: "m" },
      { row: 1, column: 13, title: "n" },
      { row: 1, column: 15, title: "o" },
      { row: 1, column: 18, title: "p" },
      { row: 2, column: 2, title: "q" },
      { row: 2, column: 4, title: "r" },
      { row: 2, column: 6, title: "s" },
      { row: 2, column: 9, title: "t" },
      { row: 2, column: 11, title: "u" },
      { row: 2, column: 13, title: "v" },
      { row: 2, column: 16, title: "w" },
      { row: 3, column: 1, title: "x" },
      { row: 3, column: 2, title: "y" },
      { row: 3, column: 5, title: "z" },
      { row: 3, column: 8, title: "aa" },
      { row: 3, column: 10, title: "ab" },
      { row: 3, column: 12, title: "ac" },
      { row: 3, column: 15, title: "ad" },
      { row: 4, column: 0, title: "ae" },
      { row: 4, column: 2, title: "af" },
      { row: 4, column: 5, title: "ag" },
      { row: 4, column: 7, title: "ah" },
      { row: 4, column: 9, title: "ai" },
      { row: 4, column: 11, title: "aj" },
      { row: 4, column: 14, title: "ak" },
      { row: 5, column: 1, title: "al" },
      { row: 5, column: 4, title: "am" },
      { row: 5, column: 6, title: "an" },
      { row: 5, column: 8, title: "ao" },
      { row: 5, column: 12, title: "ap" },
      { row: 5, column: 15, title: "aq" },
      { row: 5, column: 17, title: "ar" },
      { row: 6, column: 0, title: "as" },
      { row: 6, column: 3, title: "at" },
      { row: 6, column: 5, title: "au" },
      { row: 6, column: 7, title: "av" },
      { row: 6, column: 10, title: "aw" },
      { row: 6, column: 13, title: "ax" },
      { row: 6, column: 16, title: "ay" },
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
            icon: theme.icons.iconTest,
            contains: [],
            onClick: () => console.log("Clicked", def.title),
          },
        })
      );
    });
    return map;
  }, [iconCellDefinitions, theme]);

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
            value: { ...iconCell.value, icon: theme.icons.iconTest },
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
    cellMap: cellMap,
    desktopCells: desktopCells,
    updateCell,
    setCellMap,
    setRowCount,
    setColumnCount,
  };
};
