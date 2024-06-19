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

  const placeMarker = (rowInput, columnInput, player) => {
    const emptyGrids = board
      .filter((row) => row[columnInput].getMarker() === "")
      .map((row) => row[columnInput]);

    if (!emptyGrids.length) return;

    board[rowInput][columnInput].addMarker(player);
  };

  const printCurrentBoard = () => {
    const currentBoard = board.map((row) =>
      row.map((cell) => cell.getMarker())
    );
    console.log(currentBoard);
  };

  return {
    getBoard,
    placeMarker,
    printCurrentBoard,
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

  const getCurrentPlayer = () => currentPlayer;

  const printNewRound = () => {
    board.printCurrentBoard();
    console.log(`${getCurrentPlayer().name}'s turn!`);
  };

  const playRound = (column, row) => {
    console.log(
      `Dropping ${
        getCurrentPlayer().name
      }'s token into column ${column} and ${row}...`
    );

    board.placeMarker(row, column, getCurrentPlayer());

    switchPlayer();
    printNewRound();
  };

  printNewRound();

  return {
    playRound,
    getCurrentPlayer,
  };
}

const game = DisplayController();
