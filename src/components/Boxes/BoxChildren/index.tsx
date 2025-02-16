import React from "react";
import { Box, BoxWithChildren, BoxType } from "../../../types";
import BoxData from "../BoxData";
import BoxXML from "../BoxXML";

interface BoxWithChildrenProps {
  boxes: Box[];
  depth?: number;
}

const BoxChildren: React.FC<BoxWithChildrenProps> = ({ boxes, depth = 0 }) => {
  return (
    <ul style={{ marginLeft: depth * 20 }}>
      {boxes.map((box, idx) => {
        if ("children" in box) {
          const childrenBox = box as BoxWithChildren;

          return (
            <li key={idx}>
              <span>
                {box.type} ({box.size} bytes, offset: {box.offset})
              </span>
              <BoxChildren boxes={childrenBox.children} depth={depth} />
            </li>
          );
        }

        if (box.type === BoxType.MDAT) {
          return <BoxXML key={idx} box={box as any} depth={depth} />;
        }

        return <BoxData key={idx} box={box} depth={depth} />;
      })}
    </ul>
  );
};

export default BoxChildren;
