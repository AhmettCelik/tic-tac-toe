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
    if (board[rowInput][columnInput].getMarker() != "") {
      console.log("Cell already occupied");
      return;
    }

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

function findWinner(board, player) {
  const winConditions = [
    // Rows
    [
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [2, 0],
      [2, 1],
      [2, 2],
    ],
    // Columns
    [
      [0, 0],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
    ],
    [
      [0, 2],
      [1, 2],
      [2, 2],
    ],
    // Diagonals
    [
      [0, 0],
      [1, 1],
      [2, 2],
    ],
    [
      [0, 2],
      [1, 1],
      [2, 0],
    ],
  ];

  return winConditions.some((condition) => {
    return condition.every(([row, col]) => {
      return board[row][col].getMarker() === player.marker;
    });
  });
}

const Player = (name, marker) => {
  return {
    name,
    marker,
  };
};

function DisplayController() {
  const board = GameBoard();

  const players = [Player("Player One", "X"), Player("Player Two", "O")];

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
    if (board.getBoard()[row][column].getMarker() != "") return;
    console.log(
      `Dropping ${
        getCurrentPlayer().name
      }'s token into column ${column} and row ${row}...`
    );

    board.placeMarker(row, column, getCurrentPlayer());

    if (findWinner(board.getBoard(), getCurrentPlayer())) {
      console.log(`${getCurrentPlayer().name} wins!`);
      return;
    }

    switchPlayer();
    printNewRound();
  };

  printNewRound();

  return {
    playRound,
    getCurrentPlayer,
    getBoard: board.getBoard,
  };
}

function ScreenController() {
  const game = DisplayController();

  const boardContainer = document.getElementById("gameboard");

  let value = 1;

  const updateScreen = () => {
    boardContainer.textContent = "";
    game.getBoard().forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const gridButton = document.createElement("button");
        gridButton.value = value++;
        gridButton.dataset.column = colIndex;
        gridButton.dataset.row = rowIndex;
        gridButton.textContent = cell.getMarker();
        boardContainer.appendChild(gridButton);
      });
    });
  };

  function handleBoardGridClick(e) {
    const selectedPlaceRowIndex = parseInt(e.target.dataset.row);
    const selectedPlaceColumnIndex = parseInt(e.target.dataset.column);

    if (isNaN(selectedPlaceRowIndex) || isNaN(selectedPlaceColumnIndex)) return;

    game.playRound(selectedPlaceColumnIndex, selectedPlaceRowIndex);
    updateScreen();
  }

  boardContainer.addEventListener("click", handleBoardGridClick);

  updateScreen();
}

ScreenController();
