import React from 'react';

const ColorBox = ({ color = '#ffffff' }) => {
  return (
    <span style={{ float:'right', width: '10px', height: 'auto', backgroundColor: color, display: 'inline-block' }}>&nbsp;</span>
  );
};

export default ColorBox;