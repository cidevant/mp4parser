import React, { useEffect, useState } from 'react';

enum BoxType {
  MOOF = "moof",
  TRAF = "traf",
  MDAT = "mdat",
}

interface BasicBox {
  size: number;
  type: string;
  offset: number;
}

interface BoxWithChildren extends BasicBox {
  children?: Box[];
}

interface BoxWithData extends BasicBox {
  data?: string;
}

type Box = BoxWithChildren | BoxWithData;


function parseData(data: ArrayBuffer) {
  const view = new DataView(data);
  const length = view.byteLength;
  const boxDefinitionSize = 8; // 4 size, 4 type

  const boxes: Box[] = parseBoxes(view, 0, length);

  console.log('boxes:', boxes);
}

// Parses major boxes (without nesting)
function parseBoxes(view: DataView, offset: number, end: number) {
  const boxes: Box[] = [];

  while (offset < end) {
    const box = parseBox(view, offset);

    boxes.push(box);
    
    offset += box.size;
  }

  return boxes;
}

// Parses 8 bytes of data to get box size and type
function parseBox(view: DataView, offset: number) {
  const size = view.getUint32(offset); // first 4 bytes represent size
  let type = "";

  // next 4 bytes represent type
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
      .then(r => r.arrayBuffer())
      .then(setData)
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
