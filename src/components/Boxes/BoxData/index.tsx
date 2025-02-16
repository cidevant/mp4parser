import React from "react";
import { BoxWithData } from "../../../types";

interface BoxDataProps {
  box: BoxWithData;
  depth?: number;
}

const BoxData: React.FC<BoxDataProps> = ({ box, depth = 0 }) => {  
  let data = "";

  if (box.data instanceof ArrayBuffer) {
    const view = new DataView(box.data);

    for (let i = 0; i < box.data.byteLength; i++) {
      data += ` ${view.getUint8(i)}`;
    }
  }


  return (
    <li style={{ marginLeft: depth * 20 }}>
      <span>
        {box.type} ({box.size} bytes, offset: {box.offset})
      </span>
      <div style={{ backgroundColor: "#f0f0f0", padding: 5 }}>
        data(Uint8): {data}
      </div>
    </li>
  );
};

export default BoxData;
