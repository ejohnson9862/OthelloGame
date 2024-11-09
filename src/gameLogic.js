
const directions = [
    [-1, 0], [1, 0], [0, -1], [0, 1], // vertical & horizontal
    [-1, -1], [1, 1], [-1, 1], [1, -1], // diagonals
  ];
  
  // Initialize the board with starting positions
  export const initializeBoard = () => {
    const board = Array(8).fill().map(() => Array(8).fill(null)); // 8x8 board
    board[3][3] = 2; // White piece
    board[4][4] = 2; // White piece
    board[3][4] = 1; // Black piece
    board[4][3] = 1; // Black piece
    return board;
  };
  
  // Check if a move is valid
  export const isValidMove = (board, row, col, player) => {
    if (board[row][col] !== null) return false; // Cell is not empty
  
    const opponent = player === 1 ? 2 : 1; // Get opponent's player (1 vs 2)
    let validMove = false;
  
    // Iterate through all directions to check if any direction results in flipping opponent pieces
    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      let hasOpponentBetween = false;
  
      while (x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === opponent) {
        hasOpponentBetween = true;
        x += dx;
        y += dy;
      }
  
      // If the current direction ends with a piece of the current player, and there are opponent pieces between, it's a valid move.
      if (hasOpponentBetween && x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === player) {
        validMove = true;
        break; // No need to check further directions if we found a valid move
      }
    }
  
    return validMove;
  };
  
  // Get the positions that should be flipped when a move is made
  export const getFlipPositions = (board, row, col, player) => {
    const flipPositions = [];
    const opponent = player === 1 ? 2 : 1;
  
    // Iterate over all directions to find the positions to flip
    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      let positionsToFlip = [];
  
      while (x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === opponent) {
        positionsToFlip.push([x, y]);
        x += dx;
        y += dy;
      }
  
      // If the direction ends with the player's piece, we can flip the pieces in that direction
      if (x >= 0 && x < 8 && y >= 0 && y < 8 && board[x][y] === player) {
        flipPositions.push(...positionsToFlip); // Add the flip positions in this direction
      }
    }
  
    return flipPositions;
  };
  
  // Make the move and flip the opponent's pieces
  export const makeMove = (board, row, col, player, flipPositions) => {
    board[row][col] = player;
  
    // Flip the opponent's pieces
    flipPositions.forEach(([r, c]) => {
      board[r][c] = player;
    });
  };
  
  // Check if a player has any valid moves
  export const hasValidMove = (board, player) => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (isValidMove(board, row, col, player)) {
          return true;
        }
      }
    }
    return false;
  };
  
  // Count the number of black and white pieces
  export const countPieces = (board) => {
    let blackCount = 0;
    let whiteCount = 0;
    board.forEach(row => {
      row.forEach(cell => {
        if (cell === 1) blackCount++;
        if (cell === 2) whiteCount++;
      });
    });
    return { blackCount, whiteCount };
  };
  