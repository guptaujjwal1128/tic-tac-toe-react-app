import { useState } from "react";

import "./Game.scss";
import { Board as BoardType, PlayerType } from "../../types/game.types";
import {
  calculateWinner,
  createBoard,
  getGameDescription,
} from "../../helpers/game.functions";

import Board from "../Board/Board";

export default function Game() {
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [board, setBoard] = useState<BoardType>(createBoard(3));
  const [gameState, setGameState] = useState<BoardType[]>([createBoard(3)]);

  const moveCount = board.flat().reduce((acc, item) => {
    return acc + (item ? 1 : 0);
  }, 0);

  const winner = calculateWinner(board);

  const isDraw = moveCount === Math.pow(board.length, 2) && !winner;

  const allowChange = moveCount === gameState.length - 1;

  function resetBoard() {
    setIsXNext(true);
    setBoard(createBoard(board.length));
    setGameState([createBoard(board.length)]);
  }

  function handleGamePlay(newBoard: BoardType) {
    if (!allowChange) return;
    if (winner) return;
    setBoard(newBoard);
    setIsXNext(!isXNext);
    setGameState([...gameState, newBoard]);
  }

  function jumpToState(board: BoardType, stateCount: number) {
    setBoard(board);
    setIsXNext(stateCount % 2 === 0);
  }

  return (
    <div className="game">
      <div className="game-board">
        <div className="game-board-message">
          {allowChange ? "" : "* Previous State of game is read only"}
        </div>
        <Board isXNext={isXNext} board={board} onPlay={handleGamePlay}></Board>
        {
          <h2 className="game-board-player">
            Player Turn: {isXNext ? PlayerType.X : PlayerType.O}
          </h2>
        }
        <h2 className={`game-board-result ${(winner || isDraw) && "active"}`}>
          {isDraw ? "Game Draws" : `Winner: ${winner ? winner : ""}`}
        </h2>
        <h2 className="game-board-moves">Move Count: {moveCount}</h2>
        <button className="game-board-reset" onClick={resetBoard}>
          Reset
        </button>
      </div>
      <div className="game-history">
        <h2>Game History</h2>
        <div className="game-history-list">
          {gameState.map((board, index) => {
            const gameDescription = getGameDescription(board, index);
            return (
              <button
                key={index}
                className="game-history-list-item"
                onClick={() => jumpToState(board, index)}
              >
                {gameDescription}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
