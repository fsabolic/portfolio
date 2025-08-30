export interface IconCellContent {
  id: string;
  value: string;
  row: number;
  column: number;
  contains: IconCellContent[];
}
