import React from 'react';
import { Box, BoxWithChildren, BoxWithData, BoxWithXMLData } from '../../types';
import styled from 'styled-components'
import BoxChildren from './BoxChildren';
import BoxData from './BoxData';
import BoxXML from './BoxXML';

interface BoxesProps {
  boxes: Box[];
  depth?: number;
}

const Boxes: React.FC<BoxesProps> = ({ boxes }) => {

  return (
    <>
      {boxes.map((box, index) => (
        <div key={index} >
            {"data" in box && (box as BoxWithData).data.byteLength > 0 && (
              <BoxData box={box as BoxWithData} />
            )}
            {"children" in box && (box as BoxWithChildren).children.length > 0 && (
              <BoxChildren box={box as BoxWithChildren} />
            )}
            {"xml" in box && (box as BoxWithXMLData).xml.length > 0 && (
              <BoxXML box={box as BoxWithXMLData} />
            )}
        </div>

      ))}
    </>
  );
};

export default Boxes;
export { Boxes }



const DataContainer = styled.div`
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 5px;
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 0.8em;
  font-family: monospace;
`
