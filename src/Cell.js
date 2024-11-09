import React from 'react';
import './Cell.css';
import { isValidMove } from './gameLogic'; // Ensure this import is correct

const Cell = ({ row, col, value, onMove, currentPlayer, board }) => {
  // Check if the move is valid for the current player
  const isValid = value === null && isValidMove(board, row, col, currentPlayer);

  // Handle cell click if it's a valid move
  const handleClick = () => {
    if (isValid) {
      onMove(row, col); // Trigger the move in the parent Game component
    }
  };

  return (
    <div
      className={`cell ${value ? (value === 1 ? 'black' : 'white') : ''} ${isValid ? 'valid-move' : ''}`}
      onClick={handleClick}
    >
      {/* Display the black or white piece */}
      {value && (
        <div className={`piece ${value === 1 ? 'black' : 'white'}`} />
      )}
    </div>
  );
};

export default Cell;
