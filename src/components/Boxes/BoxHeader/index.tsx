import React from "react";
import { Box } from "../../../types";
import { BoxHeaderWrapper, BoxTypeSpan, BoxHeaderInfoSpan } from "../../styled";

interface BoxHeaderProps {
  box: Box;
  data?: string;
}

const BoxHeader: React.FC<BoxHeaderProps> = ({ box, data = '' }) => {  
  return (
    <BoxHeaderWrapper>
      <BoxTypeSpan type={box.type}>
        {box.type.toUpperCase()}
      </BoxTypeSpan>
      <BoxHeaderInfoSpan>
        <b>size:</b> {box.size} bytes
      </BoxHeaderInfoSpan>
      <BoxHeaderInfoSpan>
        <b>offset:</b> {box.offset}
      </BoxHeaderInfoSpan>
      {data && (
        <BoxHeaderInfoSpan>
          <b>data(Uint8):</b> {data}
        </BoxHeaderInfoSpan>
      )}
    </BoxHeaderWrapper>
  );
};

export default BoxHeader;
