import { Box, BoxWithChildren, BoxWithData, BoxWithXMLData, BoxType } from "../types";

/**
 * Parses ArrayBuffer and creates tree structure of boxes
 *
 * @param {ArrayBuffer} data ArrayBuffer to parse
 * @returns {Box[]} array of boxes
 */
export function parseData(data: ArrayBuffer): Box[] {
  const view = new DataView(data);

  return parseBoxes(view, 0,  view.byteLength) as Box[];
}


/**
 * Parses DataView and creates tree structure of boxes
 *
 * @param {DataView} view DataView to parse
 * @param {number} offset start offset
 * @param {number} end end offset
 * @returns {Box[]} array of boxes
 */
function parseBoxes(view: DataView, offset: number, end: number): Box[] {
  const boxes: Box[] = [];
  const boxDefinitionSize = 8; // 4 size, 4 type

  while (offset < end) {
    let box = parseBox(view, offset) as Box;

    switch (box.type) {
      case BoxType.MOOF:
      case BoxType.TRAF: {
        const children = parseBoxes(view, offset + boxDefinitionSize, offset + box.size);
        box = { ...box, children } as BoxWithChildren;
      }
      break;
      
      case BoxType.MDAT: {
        const data = new Uint8Array(view.buffer, offset + boxDefinitionSize, box.size - boxDefinitionSize);
        box = { ...box, xml: new TextDecoder('utf-8').decode(data) } as BoxWithXMLData;
      }
      break;

      default: {
        const data: ArrayBuffer = view.buffer.slice(offset + boxDefinitionSize, offset + box.size);
        
        box = { ...box, data } as BoxWithData;
      }
      break;
    }

    boxes.push(box);
    
    offset += box.size;
  }

  return boxes;
}


/**
 * Parses a Box from the DataView
 *
 * @param {DataView} view DataView
 * @param {number} offset data offset
 * @returns {Box} Box structure
 */
function parseBox(view: DataView, offset: number): Box {
  return {
    offset,
    size: view.getUint32(offset),
    type: new TextDecoder('utf-8').decode(new Uint8Array(view.buffer, offset + 4, 4)),
  } as Box;
}
