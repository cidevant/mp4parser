import React, { useEffect, useState } from 'react';

enum BoxType {
  MOOF = "moof", // box with children
  TRAF = "traf", // box with children
  MDAT = "mdat", // box with data
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

type Box = BasicBox | BoxWithChildren | BoxWithData;


function parseData(data: ArrayBuffer): Box[] {
  const view = new DataView(data);
  const length = view.byteLength;

  const boxes: Box[] = parseBoxes(view, 0, length);

  console.log('boxes:', boxes);

  return boxes;
}


// Parses boxes (with nesting)
function parseBoxes(view: DataView, offset: number, end: number): Box[] {
  const boxes: Box[] = [];
  const boxDefinitionSize = 8; // 4 size, 4 type

  while (offset < end) {
    let box = parseBox(view, offset) as Box;

    switch (box.type) {
      case BoxType.MOOF:
      case BoxType.TRAF: {
        const children = parseBoxes(view, offset + boxDefinitionSize, offset + box.size);
        box = { ...box, children } as BoxWithChildren;
      }
      break;
      
      case BoxType.MDAT: {
        const data = new Uint8Array(view.buffer, offset + boxDefinitionSize, box.size - boxDefinitionSize);
        box = { ...box, data: new TextDecoder().decode(data) } as BoxWithData;
      }
      break;
    }

    boxes.push(box);
    
    offset += box.size;
  }

  return boxes;
}

// Parses 8 bytes of data to get box size and type
function parseBox(view: DataView, offset: number): Box {
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
