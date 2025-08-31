import { CellContentTypes } from "../../models/constants/CellContentTypes";
import type { IconCellContent } from "../../models/IconCellContent";

export type IconCellContentBase = Omit<IconCellContent, "type">;

export const makeIconCellContentObject = (
  cellData: IconCellContentBase
): IconCellContent => {
  return { ...cellData, type: CellContentTypes.icon };
};
