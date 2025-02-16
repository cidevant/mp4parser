import React, { useEffect, useState } from 'react';

function parseData(data: ArrayBuffer) {
  const view = new DataView(data);
  const length = view.byteLength;
  const result = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    result[i] = view.getUint8(i);
  }
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
