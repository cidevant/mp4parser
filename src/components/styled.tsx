import styled from 'styled-components';

interface BoxTypeSpanProps {
  type?: string;
};

export const BoxTypeSpan = styled.span<BoxTypeSpanProps>`
  display: inline-block;
  font-weight: bold;
  background-color: #FFA029;
  color: black;
  padding: 2px 5px;

  ${(props) => {
    return (props.type === 'moof' || props.type === 'traf' || props.type === 'mdat') && `background-color: red;`;
  }}
`;
