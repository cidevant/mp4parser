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
  const boxDefinitionSize = 8; // 4 size, 4 type

  const boxes: Box[] = parseBoxes(view, 0, length);

  console.log('boxes:', boxes);
}

function parseBoxes(view:DataView, offset:number, end:number) {
  const boxes: Box[] = [];
  let i = offset;

  while (i < end) {
    const box = parseBox(view, i);
    boxes.push(box);
    i += box.size;
  }

  return boxes;
}

function parseBox(view: DataView, offset: number) {
  const size = view.getUint32(offset);
  let type = "";

  for (let i = 0; i < 4; i++) {
    type += String.fromCharCode(view.getUint8(offset + 4 + i));
  }

  const box: Box = {
    offset,
    size,
    type,
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
