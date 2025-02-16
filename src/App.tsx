import React from 'react';
import { Box, BoxWithChildren, BoxWithData } from './types';
import { useData } from './hooks/data';
import styled from 'styled-components'

interface BoxTreeProps {
  boxes: Box[];
  depth?: number;
}

const BoxTree: React.FC<BoxTreeProps> = ({ boxes, depth = 0 }) => {
  return (
    <ul style={{ marginLeft: depth * 20 }}>
      {boxes.map((box, index) => (
        <li key={index}>
          <span>
            {box.type} ({box.size} bytes, offset: {box.offset})

            {"data" in box && (box as BoxWithData).data.byteLength > 0 && (
              <DataContainer>data - {box.data.byteLength}</DataContainer>
            )}

          </span>


          {"children" in box && (box as BoxWithChildren).children.length > 0 && (
            <BoxTree boxes={(box as BoxWithChildren).children} depth={depth + 1} />
          )}
        </li>
      ))}
    </ul>
  );
};

function App() {
  const { data, error } = useData();

	return (
		<div className="App">
      {error && <p>{error}</p>}
      <h2>Box Structure:</h2>
      {data.length > 0 ? <BoxTree boxes={data} /> : <p>Loading boxes...</p>}
		</div>
	);
}

export default App;

const DataContainer = styled.div`
  background-color: #f0f0f0;
  padding: 5px;
  border-radius: 5px;
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 10px;
  font-size: 0.8em;
  font-family: monospace;
`
