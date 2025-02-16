import React from 'react';
import { BoxWithData } from '../../../types';


interface BoxDataProps {
  box: BoxWithData
}

const BoxData: React.FC<BoxDataProps> = ({ box }) => {
  return (
    <div>BoxData</div>
  );
};

export default BoxData;
