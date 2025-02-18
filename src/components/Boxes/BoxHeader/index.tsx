import React from "react";
import { Box } from "../../../types";
import { BoxHeaderWrapper, BoxTypeSpan, BoxLengthSpan, BoxOffsetSpan } from "../../styled";

interface BoxHeaderProps {
  box: Box;
}

const BoxHeader: React.FC<BoxHeaderProps> = ({ box }) => {  
  return (
    <BoxHeaderWrapper>
      <BoxTypeSpan type={box.type}>
          {box.type.toUpperCase()}
      </BoxTypeSpan>
      <BoxLengthSpan>
        size: {box.size} bytes
      </BoxLengthSpan>
      <BoxOffsetSpan>
        offset: {box.offset}
      </BoxOffsetSpan>
    </BoxHeaderWrapper>
  );
};

export default BoxHeader;
