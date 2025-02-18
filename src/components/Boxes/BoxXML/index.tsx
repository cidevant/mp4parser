import React from "react";
import { BoxWithXMLData } from "../../../types";
import { BoxTypeSpan, BoxImageWrapper, BoxImage } from "../../styled";

interface BoxWithXMLDataProps {
  box: BoxWithXMLData;
  depth?: number;
}

const BoxXML: React.FC<BoxWithXMLDataProps> = ({ box, depth = 0 }) => {
  const images = [];
  
  if ("images" in box && box.images?.length > 0) {
    images.push((
      <BoxImageWrapper>
        {box.images.map((image, idx) => (
            <BoxImage src={`data:image/png;base64, ${image}`} width="400" alt={`img ${idx}`} />
        ))}
      </BoxImageWrapper>
    ));
  }
  
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
      {images && images.length > 0 && (
        <>
          <h3>BONUS 2: Images from XML</h3>
          {images}
        </>
      )}
    </li>
  );
};

export default BoxXML;
