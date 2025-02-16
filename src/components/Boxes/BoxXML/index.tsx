import React from 'react';
import { BoxWithXMLData } from '../../../types';


interface BoxXMLProps {
  box: BoxWithXMLData
}

const BoxXML: React.FC<BoxXMLProps> = ({ box }) => {
  return (
    <div>BoxXML</div>
  );
};

export default BoxXML;
