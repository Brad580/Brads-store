import React from 'react';
import './ButtonStyle.css';

const ButtonStyle = ({ children, onClick }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonStyle;