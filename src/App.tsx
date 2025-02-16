import React, { useEffect, useState } from 'react';

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
  

	return (
		<div className="App">
			<h1>Fetch Data</h1>
      {error && <p>{error}</p>}
		</div>
	);
}

export default App;
