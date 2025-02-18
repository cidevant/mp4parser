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

export const BoxImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 40px;
  background-color: #eee;
`;

export const BoxImage = styled.img`
  border: 10px solid #666;
  margin: 20px;
  width: 300px;

  &:hover {
    border-color: red;
    transform: scale(1.2);
  }
`;
