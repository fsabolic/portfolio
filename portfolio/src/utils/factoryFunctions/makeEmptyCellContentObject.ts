import { CellContentTypes } from "../../models/constants/CellContentTypes";
import type { EmptyCellContent } from "../../models/EmptyCellContent";

export type EmptyCellContentBase = Omit<EmptyCellContent, "type">;

export const makeEmptyCellContentObject = (
  cellData: EmptyCellContentBase
): EmptyCellContent => {
  return { ...cellData, type: CellContentTypes.empty };
};
