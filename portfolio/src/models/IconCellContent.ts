import type { CellContentBase } from "./CellContentBase";

interface IconCellValue {
  title: string;
  icon: string;
  contains: CellContentBase[];
  onClick: () => void;
}

export interface IconCellContent extends CellContentBase {
  type: "icon";
  value: IconCellValue;
}
