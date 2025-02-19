import React from "react";
import { Box, BoxWithChildren, BoxType, BoxWithXMLData, BoxWithData } from "../../../types";
import BoxData from "../BoxData";
import BoxXML from "../BoxXML";
import { BoxList, BoxItem } from "../../styled";
import BoxHeader from "../BoxHeader";

interface BoxWithChildrenProps {
  boxes: Box[];
};

const BoxChildren: React.FC<BoxWithChildrenProps> = ({ boxes }) => {
  return (
    <BoxList>
      {boxes.map((box, idx) => {
        if ("children" in box) {
          const childrenBox = box as BoxWithChildren;

          return (
            <BoxItem key={idx}>
              <BoxHeader box={box} />
              <BoxChildren boxes={childrenBox.children}  />
            </BoxItem>
          );
        }

        if (box.type === BoxType.MDAT) {
          return <BoxXML key={idx} box={box as BoxWithXMLData} />;
        }

        return <BoxData key={idx} box={box as BoxWithData} />;
      })}
    </BoxList>
  );
};

export default BoxChildren;
