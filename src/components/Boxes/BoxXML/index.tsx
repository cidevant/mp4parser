import React from "react";
import { BoxWithXMLData } from "../../../types";
import { BoxImageWrapper, BoxImage, BoxDataXML, BoxItem } from "../../styled";
import BoxHeader from "../BoxHeader";

interface BoxWithXMLDataProps {
  box: BoxWithXMLData;
}

const BoxXML: React.FC<BoxWithXMLDataProps> = ({ box }) => {
  return (
    <BoxItem >
      <BoxHeader box={box} />

      {box.xml && (
        <BoxDataXML>{box.xml}</BoxDataXML>
      )}

      {box.images && box.images.length > 0 && (
        <>
          <h3>BONUS 2: Images from XML</h3>
          <BoxImageWrapper>
            {box.images.map((image) => (
              <BoxImage 
                key={image.id} 
                src={`data:image/${image.type.toLowerCase()};${image.encoding.toLowerCase()}, ${image.data}`} 
                alt={`img-${image.id}`} 
              />
            ))}
          </BoxImageWrapper>
        </>
      )}
    </BoxItem>
  );
};

export default BoxXML;
