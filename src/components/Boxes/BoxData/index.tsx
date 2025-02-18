import React from "react";
import { BoxWithData } from "../../../types";
import { BoxItem, BoxDataContainer } from "../../styled";
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
      <BoxHeader box={box} />
      <BoxDataContainer>
        data(Uint8): {data}
      </BoxDataContainer>
    </BoxItem>
  );
};

export default BoxData;
