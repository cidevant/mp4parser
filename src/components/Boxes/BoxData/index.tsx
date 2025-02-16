import React from "react";
import { BoxWithData } from "../../../types";

interface BoxDataProps {
  box: BoxWithData;
  depth?: number;
}

const BoxData: React.FC<BoxDataProps> = ({ box, depth = 0 }) => {
  console.log(depth);
  
  
  return (
    <li style={{ marginLeft: depth * 20 }}>
      <span>
        {box.type} ({box.size} bytes, offset: {box.offset})
      </span>
      <div>
        {/* {box.data} */}
      </div>
    </li>
  );
};

export default BoxData;
