import { useEffect, useState } from 'react';
import { parseData } from '../utils/parser';
import { Box } from '../types';

export function useData() {
  const [data, setData] = useState<Box[]>([]);
	const [error, setError] = useState<string>("");
  
	useEffect(() => {      
	  fetch('text0.mp4')
      .then(r => r.arrayBuffer())
      .then(parseData)
      .then(setData)
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
	}, []);

  return { data, error };
}
