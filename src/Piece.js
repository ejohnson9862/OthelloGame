import React from 'react';
import './Piece.css';

const Piece = ({ color }) => {
  return <div className={`piece ${color}`} />;
};

export default Piece;
