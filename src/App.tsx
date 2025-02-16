import React from 'react';
import { useData } from './hooks/data';
import BoxChildren from './components/Boxes/BoxChildren';


function App() {
  const { data, error } = useData();

	return (
		<div className="App">
      <img src="./data_structure_logic.jpg" width="1000" alt="Data structure logic" />
      {error && <p>{error}</p>}
      <h2>Boxes Structure:</h2>
      {data.length > 0 && <BoxChildren boxes={data} /> }
		</div>
	);
}

export default App;
