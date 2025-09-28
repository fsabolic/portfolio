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
    () =>
      [
        //Top left side
        { row: 0, column: 0, title: "About Me", icon: "aboutMe" },
        {
          row: 0,
          column: 1,
          title: "Certificates and Awards",
          icon: "certificatesAndAwards",
        },
        { row: 1, column: 0, title: "Web Portfolio", icon: "webPortfolio" },
        { row: 1, column: 1, title: "Projects", icon: "projects" },
        { row: 2, column: 0, title: "Browser", icon: "browser" },
        { row: 2, column: 1, title: "Github", icon: "github" },
        { row: 3, column: 0, title: "Contact Me", icon: "contactMe" },

        //Bottom left side
        { row: 5, column: 0, title: "Snake", icon: "snake" },
        { row: 6, column: 0, title: "3D Explosion Sim", icon: "explosionSim" },
        { row: 6, column: 1, title: "Cast N Crew", icon: "castNCrew" },

        //Right side
        { row: 0, column: 18, title: "Recycle Bin", icon: "recycleBin" },
        { row: 1, column: 18, title: "Calendar", icon: "calendar" },
        { row: 2, column: 18, title: "Calculator", icon: "calculator" },
      ] as IconDefinition[],
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
            icon: def.icon,
            contains: [],
            onClick: () => {
              openWindow({
                id: id,
                dimensions: {
                  height: def.windowSettings?.dimensions?.height ?? 500,
                  width: def.windowSettings?.dimensions?.width ?? 800,
                },
                coordinates: {
                  x: Math.random() * 1000,
                  y: Math.random() * 500,
                },
                isFocused: false,
                title: { text: def.title, icon: def.icon },
                blockAutoPositioning: false,
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
