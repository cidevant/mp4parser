import React from "react";
import { BoxWithXMLData } from "../../../types";
import { BoxTypeSpan } from "../../styled";

interface BoxWithXMLDataProps {
  box: BoxWithXMLData;
  depth?: number;
}

const BoxXML: React.FC<BoxWithXMLDataProps> = ({ box, depth = 0 }) => {
  return (
    <li style={{ marginLeft: depth * 20 }}>
      <span>
        <BoxTypeSpan type={box.type}>{box.type.toUpperCase()}</BoxTypeSpan> (length: {box.size} bytes, offset: {box.offset})
      </span>
      {box.xml && (
        <div style={{ marginLeft: 20 }}>
          <pre>{box.xml}</pre>
        </div>
      )}
    </li>
  );
};

export default BoxXML;
