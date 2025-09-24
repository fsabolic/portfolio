import type { IconKey } from "./IconKey";
import type { CellContentBase } from "./CellContentBase";

interface IconCellValue {
  title: string;
  icon: IconKey;
  contains: CellContentBase[];
  onClick: () => void;
}

export interface IconCellContent extends CellContentBase {
  type: "icon";
  value: IconCellValue;
}
