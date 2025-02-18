export enum BoxType {
  MOOF = "moof", // box with children
  TRAF = "traf", // box with children
  MDAT = "mdat", // box with xml data
}

export interface BasicBox {
  size: number;
  type: string;
  offset: number;
}

export interface BoxWithChildren extends BasicBox {
  children: Box[];
}

export interface BoxWithData extends BasicBox {
  data: ArrayBuffer;
}

export interface BoxWithXMLData extends BoxWithData {
  xml: string;
  images?: string[];
}

export type Box = BoxWithChildren | BoxWithData | BoxWithXMLData;
