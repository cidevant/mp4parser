import React from 'react';
import { BoxWithChildren } from '../../../types';


interface BoxChildrenProps {
  box: BoxWithChildren
}

const BoxChildren: React.FC<BoxChildrenProps> = ({ box }) => {
  return (
    <div>BoxChildren</div>
  );
};

export default BoxChildren;
