import React from 'react';
import { Box, BoxWithChildren } from './types';
import { useData } from './hooks/data';

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
