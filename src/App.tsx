import React, { useEffect, useState } from 'react';
import { fetchData } from "./utils/index";

function App() {
	const [boxes, setBoxes] = useState<ArrayBuffer>();
	const [error, setError] = useState<string>("");
  
	useEffect(() => {
      console.log("useEffect");
      
	  // fetchData()
    //     .then((result) => {
    //       console.log(result);
    //       setBoxes(result);
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //       setError(err.message);
    //     });
	}, [boxes]);

  console.log("boxes", boxes);
  

	return (
		<div className="App">
			<h1>Fetch Data</h1>
		</div>
	);
}

export default App;
