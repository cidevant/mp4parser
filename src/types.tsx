export enum BoxType {
  MOOF = "moof", // box with children
  TRAF = "traf", // box with children
  MDAT = "mdat", // box with data
}

export interface BasicBox {
  size: number;
  type: string;
  offset: number;
}

export interface BoxWithChildren extends BasicBox {
  children: Box[];
}

export interface BoxWithXMLData extends BasicBox {
  data: string;
}

export type Box = BoxWithChildren | BoxWithXMLData;

