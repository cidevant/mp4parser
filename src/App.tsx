import React from 'react';
import { useData } from './hooks/data';
import BoxChildren from './components/Boxes/BoxChildren';


function App() {
  const { data, error } = useData();

  if (data.length > 0) {
    console.log(data);
  }
  
	return (
		<div className="App">
      <img src="./data_structure_logic.jpg" width="800" alt="Data structure logic" />
      {error && <p>{error}</p>}
      <h3>BONUS 1:</h3>
      <pre>Which problem can occur if the content of the MDAT box is very large?</pre>
      <p>Problem in my implementation can cause memory issues on devices with limited resources, because I am loading data to memory at once. 
        To solve this problem: data should be fetched in chunks.</p>
        
      <h2>Boxes Structure:</h2>
      {data.length > 0 && <BoxChildren boxes={data} /> }

		</div>
	);
}

export default App;
