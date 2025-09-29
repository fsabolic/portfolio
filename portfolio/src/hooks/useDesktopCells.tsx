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
import { aboutMeWindowConfig } from "../components/WindowsManager/Windows/AboutMe/AboutMeConfig";
import { browserWindowConfig } from "../components/WindowsManager/Windows/Browser/BrowserConfig";
import { calculatorWindowConfig } from "../components/WindowsManager/Windows/Calculator/CalculatorConfig";
import { calendarWindowConfig } from "../components/WindowsManager/Windows/Calendar/CalendarConfig";
import { castNCrewWindowConfig } from "../components/WindowsManager/Windows/CastNCrew/CastNCrewConfig";
import { certificatesAndAwardsWindowConfig } from "../components/WindowsManager/Windows/CertificatesAndAwards/CertificatesAndAwardsConfig";
import { contactMeWindowConfig } from "../components/WindowsManager/Windows/ContactMe/ContactMeConfig";
import { githubWindowConfig } from "../components/WindowsManager/Windows/Github/GithubConfig";
import { projectsWindowConfig } from "../components/WindowsManager/Windows/Projects/ProjectsConfig";
import { recycleBinWindowConfig } from "../components/WindowsManager/Windows/RecycleBin/RecycleBinConfig";
import { snakeWindowConfig } from "../components/WindowsManager/Windows/Snake/SnakeConfig";
import { webPortfolioWindowConfig } from "../components/WindowsManager/Windows/WebPortfolio/WebPortfolioConfig";
import { explosionSimWindowConfig } from "../components/WindowsManager/Windows/3DExplosionSim/3DExplosionSimConfig";

export const useDesktopCells = ({ rows = 120, columns = 120 }: GridOptions) => {
  const { theme } = useTheme();
  const { openWindow } = useWindows();
  const [rowCount, setRowCount] = useState(rows);
  const [columnCount, setColumnCount] = useState(columns);

  const iconCellDefinitions: IconDefinition[] = useMemo(
    () =>
      [
        //Top left side
        aboutMeWindowConfig,
        certificatesAndAwardsWindowConfig,
        webPortfolioWindowConfig,
        projectsWindowConfig,
        browserWindowConfig,
        githubWindowConfig,
        contactMeWindowConfig,

        //Bottom left side
        snakeWindowConfig,
        explosionSimWindowConfig,
        castNCrewWindowConfig,

        //Right side
        recycleBinWindowConfig,
        calendarWindowConfig,
        calculatorWindowConfig,
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
                content: def.windowSettings.content,
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
