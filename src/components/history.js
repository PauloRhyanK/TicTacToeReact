function History({ history, setSquares, sethistory }) {
  function backHistory(square, index) {
    const newHistory = history.slice(0, index + 1);
    sethistory(newHistory);
    setSquares(square);
  }

  return (
    <>
      <h2> History: </h2>
      <ul id="listHistory">
        {history.map((square, index) => (
          <li key={index}>
            Move {index + 1}{" "}
            <button onClick={() => backHistory(square, index)}>Voltar</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default History;
