import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

import { WINNING_COMBINATION } from "./WINING-COMBINATION.js";
import GameOver from "./components/GameOver.jsx";
const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
};

function App() {
  const [players, setPlayers] = useState([
    {
      X: "Player 1",
      O: "Player 2",
    },
  ]);
  const [gameTurns, setGameTurns] = useState([]);

  const activeplayer = deriveActivePlayer(gameTurns);

  let gameBoard = [...initialBoard.map((array) => [...array])];
  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  //condition for winnig the game
  let winner = null;
  for (const combination of WINNING_COMBINATION) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  const handleSelectSquare = (rowIndex, colIndex) => {
    // setActivePlayer((currActivePlayer) =>
    //   currActivePlayer === "X" ? "O" : "X"
    // );
    setGameTurns((prevTurn) => {
      const currentPlayer = deriveActivePlayer(prevTurn);
      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];

      return updateTurns;
    });
  };

  //logic for restart the game
  const handleRestart = () => {
    setGameTurns([]);
  };

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers((prevPlayer) => {
      return {
        ...prevPlayer,
        [symbol]: newName,
      };
    });
  };
  return (
    <>
      <div id="game-container">
        {/* Players */}
        <ol id="players" className="highlight-player">
          <Player
            InitialName="player 1"
            symbol="X"
            isActive={activeplayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            InitialName="player 2"
            symbol="O"
            isActive={activeplayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>

        {/* Game Board  */}
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </>
  );
}

export default App;
