import React, { useState } from 'react';
import { initializeBoard, isValidMove, makeMove, hasValidMove, countPieces, getFlipPositions } from './gameLogic';
import Board from './Board';
import './Game.css'; // Import your CSS
import Cell from './Cell';

function Game() {
  const [board, setBoard] = useState(initializeBoard());
  const [currentPlayer, setCurrentPlayer] = useState(1); // 1 is Black, 2 is White
  const [gameOver, setGameOver] = useState(false);

  const handleMove = (row, col) => {
    // Check if the move is valid and get the positions to flip
    const flipPositions = getFlipPositions(board, row, col, currentPlayer);

    if (flipPositions.length > 0) {
      // Make the move and flip the opponent's pieces
      const newBoard = board.map(row => row.slice()); // Create a copy of the board
      makeMove(newBoard, row, col, currentPlayer, flipPositions);
      setBoard(newBoard);

      // Check if the game is over (no valid moves for either player)
      if (!hasValidMove(newBoard, 1) && !hasValidMove(newBoard, 2)) {
        setGameOver(true);
      }

      // Switch player
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
  };
  //restart game button

  const restartGame = () => {
    setBoard(initializeBoard());
    setCurrentPlayer(1); // Reset to Black starting
    setGameOver(false); // Game is no longer over
  };



  const { blackCount, whiteCount } = countPieces(board);

  return (
    <div className="game-container">
      <h1>Othello</h1>
      <h3>Current Score: Black {blackCount} - White {whiteCount}</h3>
      {gameOver ? (
        <h2 className="game-over">Game Over! Final Score: Black {blackCount} - White {whiteCount}</h2>
      ) : (
        <h2>Player {currentPlayer}'s turn</h2>
      )}
      <Board board={board} onMove={handleMove} currentPlayer={currentPlayer} />
      <button onClick={restartGame} className="restart-button">
            Restart Game
          </button>
      
    </div>
  );
}

export default Game;
