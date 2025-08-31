import type { CellContentType } from "./CellContentType";

export interface CellContentBase {
  id: string;
  row: number;
  column: number;
  type: CellContentType;
}
