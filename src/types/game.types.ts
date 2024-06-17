export enum PlayerType {
  X = "X",
  O = "O",
}

export type Square = PlayerType.X | PlayerType.O | null;

export interface SquareProps {
  value: string | null;
  onClick: () => void;
}

export type Board = Array<Array<Square>>;

export interface BoardProps {
  isXNext: boolean;
  board: Board;
  onPlay: (newBoard: Board) => void;
}
