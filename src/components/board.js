import Square from "./square";
import { useState } from "react";

function Board() {
  const [isXNext, setisXNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  function handleClick(i) {
    console.log(calcWinner(squares));
    if (squares[i] || calcWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    isXNext ? (newSquares[i] = "X") : (newSquares[i] = "O");
    setSquares(newSquares);
    setisXNext(!isXNext);
  }

  let winner;
  if (calcWinner(squares)) {
    winner = "Winner is " + calcWinner(squares);
  } else {
    winner = "Next player is " + (isXNext ? "X" : "O");
  }

  return (
    <>
      <div className="status">{winner}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
      <div id="div"></div>
    </>
  );
}

export default Board;

function calcWinner(squares) {
  const winners = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
  ];

  for (let i = 0; i < winners.length; i++) {
    const [a, b, c] = winners[i];
    if (squares[a] === squares[b] && squares[a] === squares[c] && squares[a]) {
      return squares[a];
    }
  }
  return null;
}
