export const dragHandles = [
  "topLeft",
  "topMiddle",
  "topRight",
  "middleLeft",
  "middleMiddle",
  "middleRight",
  "bottomLeft",
  "bottomMiddle",
  "bottomRight",
] as const;

export type DragHandle = (typeof dragHandles)[number];
