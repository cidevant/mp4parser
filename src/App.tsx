import React, { useEffect, useState } from 'react';

interface Box {
  size: number;
  type: string;
  offset: number;
}

function parseData(data: ArrayBuffer) {
  const view = new DataView(data);
  const length = view.byteLength;
  const result = new Uint8Array(length);
  const boxes: Box[] = [];
  const boxDefinitionSize = 8; // 4 size, 4 type

  for (let i = 0; i < length; i++) {
    result[i] = view.getUint8(i);
  }

  const sizeOf1Box = view.getUint32(0);

  let typeOf1Box = "";

  for (let index = 0; index < 4; index++) {
    typeOf1Box += String.fromCharCode(view.getUint8(4 + index));
  }

  const box: Box = {
    size: sizeOf1Box,
    type: typeOf1Box,
    offset: 0,
  };

  boxes.push(box);

  console.log('boxes:', boxes);
  

  return result;
}

function App() {
	const [data, setData] = useState<ArrayBuffer>();
	const [error, setError] = useState<string>("");
  
	useEffect(() => {      
	  fetch('text0.mp4')
      .then(result => {
        return result.arrayBuffer();
      })
      .then((result) => {
        console.log(result);
        setData(result);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
	}, []);

  useEffect(() => {
    if (data) {
      console.log(parseData(data));
    }
  }, [data]);
  

	return (
		<div className="App">
			<h1>Fetch Data</h1>
      {error && <p>{error}</p>}
		</div>
	);
}

export default App;
