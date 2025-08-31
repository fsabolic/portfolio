import type { CellContentTypes } from "./constants/CellContentTypes";

export type CellContentType =
  (typeof CellContentTypes)[keyof typeof CellContentTypes];
