import styled from 'styled-components';

// Box List

export const BoxList = styled.div`
  margin-left: 30px;
`;

export const BoxItem = styled.div`
  padding-top: 10px;
`;

// Box Header

export const BoxHeaderWrapper = styled.div`
  border: 1px dashed #666;
  padding: 5px;
  display: flex;
`;

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

export const BoxHeaderInfoSpan = styled.span`
  display: inline-block;
  margin-left: 10px;
  padding: 2px 5px;
  background-color: #ddd;
`;

// Box Data

export const BoxDataContainer = styled.div`
  background-color: #eee;
  padding: 5px;
  margin-top: 10px;
`;

// MDAT

export const BoxImageWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
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

export const BoxDataXML = styled.pre`
  padding: 10px;
  background-color: #eee;
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
`;


