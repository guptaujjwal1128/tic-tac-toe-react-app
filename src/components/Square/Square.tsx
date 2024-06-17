import { SquareProps } from "../../types/game.types";
import "./Square.scss";

export default function Square({ value, onClick }: SquareProps) {
  const isAllowedToChangeValue = !value;

  function handleClick() {
    return isAllowedToChangeValue && onClick();
  }
  return (
    <>
      <button
        aria-label={value === null ? "Non Filled Square" : value}
        className={`square ${
          isAllowedToChangeValue ? "allowed" : "not-allowed"
        }`}
        onClick={handleClick}
      >
        {value}
      </button>
    </>
  );
}
