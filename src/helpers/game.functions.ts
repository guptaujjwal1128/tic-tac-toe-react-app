import { Board, Square } from "../types/game.types";

export const createBoard = (size: number): Board => {
  if (size < 3 || size > 5) {
    throw new Error("Board size must be between 3 and 5");
  }
  return Array(size).fill(Array(size).fill(null));
};

export const calculateWinner = (board: Board): Square => {
  const size = board.length;
  const winLength = 3;

  // Check rows and columns
  for (let i = 0; i < size; i++) {
    for (let j = 0; j <= size - winLength; j++) {
      // Check the i-th row
      if (
        board[i][j] &&
        board[i].slice(j, j + winLength).every((cell) => cell === board[i][j])
      ) {
        return board[i][j];
      }

      // Check the i-th column
      const column = board.slice(j, j + winLength).map((row) => row[i]);
      if (column[0] && column.every((cell) => cell === column[0])) {
        return column[0];
      }
    }
  }

  // Check the main diagonals
  for (let i = 0; i <= size - winLength; i++) {
    for (let j = 0; j <= size - winLength; j++) {
      const mainDiagonal = Array.from(
        { length: winLength },
        (_, k) => board[i + k][j + k]
      );
      if (
        mainDiagonal[0] &&
        mainDiagonal.every((cell) => cell === mainDiagonal[0])
      ) {
        return mainDiagonal[0];
      }

      const antiDiagonal = Array.from(
        { length: winLength },
        (_, k) => board[i + k][j + winLength - 1 - k]
      );
      if (
        antiDiagonal[0] &&
        antiDiagonal.every((cell) => cell === antiDiagonal[0])
      ) {
        return antiDiagonal[0];
      }
    }
  }

  // If no winner, return null
  return null;
};

export const getGameDescription = (
  board: Board,
  stateIndex: number
): string => {
  if (stateIndex === 0) {
    return "Go to Game Start";
  }
  if (calculateWinner(board) || stateIndex === board.length * board.length) {
    return "Go to Game Over";
  }
  return `Go to move #${stateIndex}`;
};
