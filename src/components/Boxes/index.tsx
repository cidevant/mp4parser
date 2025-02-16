import React from 'react';
import { Box, BoxWithChildren, BoxWithData, BoxWithXMLData } from '../../types';
import styled from 'styled-components'

interface BoxesProps {
  boxes: Box[];
  depth?: number;
}

const Boxes: React.FC<BoxesProps> = ({ boxes, depth = 0 }) => {
  return (
    <ul style={{ marginLeft: depth * 20 }}>
      {boxes.map((box, index) => (
        <li key={index}>
          <span>
            {box.type} ({box.size} bytes, offset: {box.offset})

            {"data" in box && (box as BoxWithData).data.byteLength > 0 && (
              <DataContainer>data - {box.data.byteLength}</DataContainer>
            )}

          </span>


          {"children" in box && (box as BoxWithChildren).children.length > 0 && (
            <Boxes boxes={(box as BoxWithChildren).children} depth={depth + 1} />
          )}

          {"xml" in box && (box as BoxWithXMLData).xml.length > 0 && (
            <div>
              {box.xml}
            </div>
          )}
        </li>
      ))}
    </ul>
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
