import React from 'react';
import { useData } from './hooks/data';
import Boxes from './components/Boxes';


function App() {
  const { data, error } = useData();

	return (
		<div className="App">
      {error && <p>{error}</p>}
      <h2>Box Structure:</h2>
      {data.length > 0 && <Boxes boxes={data} /> }
		</div>
	);
}

export default App;
