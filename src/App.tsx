import React from 'react';
import { useData } from './hooks/data';
import BoxChildren from './components/Boxes/BoxChildren';


function App() {
  const { data, error } = useData();

	return (
		<div className="App">
      {error && <p>{error}</p>}
      <h2>Box Structure:</h2>
      {data.length > 0 && <BoxChildren boxes={data} /> }
		</div>
	);
}

export default App;
