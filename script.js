function GameBoard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => board;

  return {
    getBoard,
  };
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

const Player = (name, marker) => {
  return {
    name,
    marker,
  };
};

function DisplayController() {
  const board = GameBoard();

  const players = [
    (playerOne = Player("Player One", "X")),
    (playerTwo = Player("Player Two", "O")),
  ];

  let currentPlayer = players[0];

  const switchPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };
}
