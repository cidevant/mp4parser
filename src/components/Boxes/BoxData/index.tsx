import React from "react";
import { BoxWithData } from "../../../types";
import { BoxItem } from "../../styled";
import BoxHeader from "../BoxHeader";

interface BoxDataProps {
  box: BoxWithData;
}

const BoxData: React.FC<BoxDataProps> = ({ box }) => {  
  let data = "";

  if (box.data instanceof ArrayBuffer) {
    const view = new DataView(box.data);

    for (let i = 0; i < box.data.byteLength; i++) {
      data += ` ${view.getUint8(i)}`;
    }
  }

  return (
    <BoxItem>
      <BoxHeader box={box} data={data}/>
    </BoxItem>
  );
};

export default BoxData;
