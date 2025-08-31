import type { CellContentBase } from "./CellContentBase";

export interface EmptyCellContent extends CellContentBase {
  type: "empty";
}
