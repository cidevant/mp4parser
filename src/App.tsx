import React, { useEffect, useState } from 'react';


interface Box {
  size: number;
  type: string;
  offset: number;
}

interface BoxWithChildren extends Box {
  children: Box[];
}

function parseData(data: ArrayBuffer) {
  const view = new DataView(data);
  const length = view.byteLength;
  const result = new Uint8Array(length);
  const boxes: Box[] = [];
  const boxDefinitionSize = 8; // 4 size, 4 type


  boxes.push(parseBox(view, 0));
  boxes.push(parseBox(view, 8));
  boxes.push(parseBox(view, 16));

  console.log('boxes:', boxes);
  

  return result;
}

function parseBox(view: DataView, offset: number) {
  const size = view.getUint32(offset);
  let type = "";

  for (let i = 0; i < 4; i++) {
    type += String.fromCharCode(view.getUint8(offset + 4 + i));
  }

  const box: Box = {
    size,
    type,
    offset,
  };

  return box;
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
