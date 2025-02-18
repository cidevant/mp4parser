import { Box, BoxWithChildren, BoxWithData, BoxWithXMLData, BoxType, BoxImage } from "../types";

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
      // With children
      case BoxType.MOOF:
      case BoxType.TRAF: {
        const children = parseBoxes(view, offset + boxDefinitionSize, offset + box.size);
        box = { ...box, children } as BoxWithChildren;
      }
      break;
      
      // With XML data
      case BoxType.MDAT: {
        const xmlData = new Uint8Array(view.buffer, offset + boxDefinitionSize, box.size - boxDefinitionSize);
        const xmlString = new TextDecoder('utf-8').decode(xmlData);
        const images = parseImages(xmlString);
        box = { ...box, xml: xmlString, images } as BoxWithXMLData;
      }
      break;

      // With data
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
 * Parses images from XML string
 *
 * @param {string} xmlString xml string to parse
 * @returns {string[]} array of images 
 */
function parseImages(xmlString: string): BoxImage[] {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
  const imagesXML = xmlDoc.getElementsByTagName('smpte:image');  
  const images:BoxImage[] = [];

  for (let index = 0; index < imagesXML.length; index++) {
    const image = imagesXML[index];

    images.push({
      data: image.firstChild?.textContent?.trim() || '',
      type: imagesXML[index].getAttribute('imagetype') || '',
      encoding: imagesXML[index].getAttribute('encoding') || '',
      id: imagesXML[index].getAttribute('xml:id') || '',
    } as BoxImage);
  }
  
  return images;
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
    // first 4 bytes is size value
    size: view.getUint32(offset),
    // next 4 bytes is type value
    type: new TextDecoder('utf-8').decode(new Uint8Array(view.buffer, offset + 4, 4)),
  } as Box;
}
