import styled from 'styled-components';

interface BoxTypeSpanProps {
  type?: string;
};

export const BoxTypeSpan = styled.span<BoxTypeSpanProps>`
  display: inline-block;
  font-weight: bold;
  background-color: #9bff29;
  color: black;
  padding: 2px 5px;

  ${(props) => {
    if (props.type === 'moof' || props.type === 'traf') return `background-color: red;`;
    if (props.type === 'mdat') return `background-color: yellow;`;
  }}
`;
