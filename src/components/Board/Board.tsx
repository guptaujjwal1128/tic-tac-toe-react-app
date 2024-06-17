import "./Board.scss";
import Square from "../Square/Square";
import { BoardProps, PlayerType } from "../../types/game.types";

export default function Board({ isXNext, board, onPlay }: BoardProps) {
  function handleClick(row: number, col: number) {
    const newBoard = board.map((currentRow, currentRowIndex) => {
      if (currentRowIndex === row) {
        return currentRow.map((cell, cellIndex) => {
          if (cellIndex === col) {
            return isXNext ? PlayerType.X : PlayerType.O;
          }
          return cell;
        });
      }
      return currentRow;
    });
    onPlay(newBoard);
  }

  return (
    <div className="board">
      {board.map((row, rowIndex) => {
        return row.map((cell, colIndex) => {
          return (
            <Square
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              onClick={() => handleClick(rowIndex, colIndex)}
            ></Square>
          );
        });
      })}
    </div>
  );
}
