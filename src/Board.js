import React from 'react';
import Piece from './Piece'; // Import the Piece component
import './Board.css';

const Board = ({ board, onMove, currentPlayer }) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <div 
              key={colIndex} 
              className="cell" 
              onClick={() => onMove(rowIndex, colIndex)}
            >
              {cell === 1 && <Piece color="black" />} {/* Black piece */}
              {cell === 2 && <Piece color="white" />} {/* White piece */}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;