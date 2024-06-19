function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[j].push(Cell());
    }
  }
}

function Cell() {
  let marker = "";

  const addMarker = (player) => {
    marker = player.marker;
  };

  const getMarker = () => marker;

  return {
    addMarker,
    getMarker,
  };
}
