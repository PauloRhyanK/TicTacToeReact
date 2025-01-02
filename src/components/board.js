import Square from "./square";
import { useState } from "react";
import History from "./history";

function Board() {
  const [isXNext, setisXNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [history, setHistory] = useState(Array());

  function handleClick(i) {
    console.log(calcWinner(squares));
    if (squares[i] || calcWinner(squares)) {
      return;
    }
    const newSquares = squares.slice();
    isXNext ? (newSquares[i] = "X") : (newSquares[i] = "O");
    setSquares(newSquares);
    setisXNext(!isXNext);
    setHistory([...history, newSquares]);
  }

  const renderSquare = (i) => (
    <Square key={i} value={squares[i]} onSquareClick={() => handleClick(i)} />
  );

  const renderBoard = (i) => {
    const board = [];
    for (let row = 0; row < 3; row++) {
      const boardrow = [];
      for (let col = 0; col < 3; col++) {
        boardrow.push(renderSquare(row * 3 + col));
      }
      board.push(
        <div key={row} className="board-row">
          {boardrow}
        </div>
      );
    }
    return board;
  };

  function reset() {
    setSquares(Array(9).fill(null));
    setHistory([]);
    setisXNext(true);
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
      {renderBoard()}

      <button onClick={() => reset()}> Reset </button>

      <History
        history={history}
        setSquares={setSquares}
        sethistory={setHistory}
      />
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

function printHistory(array) {
  if (array) {
    for (let i = 0; i < array.length; i++) {
      console.log(array[i]);
    }
  }
  console.log(array);
}
