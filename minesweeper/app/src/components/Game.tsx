"use client";

import type { GameState, Cell, GameStatus } from "./types";
import { useDojoState } from "@chakra-dev/dojo-hooks";

const ROWS = 9;
const COLS = 9;
const MINE_COUNT = 10;

const createEmptyBoard = (): Cell[][] => {
  return Array(ROWS)
    .fill(null)
    .map(() =>
      Array(COLS)
        .fill(null)
        .map(() => ({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMineCount: 0,
        }))
    );
};

const placeMines = (
  board: Cell[][],
  firstClickRow: number,
  firstClickCol: number
): Cell[][] => {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));
  let minesPlaced = 0;

  while (minesPlaced < MINE_COUNT) {
    const row = Math.floor(Math.random() * ROWS);
    const col = Math.floor(Math.random() * COLS);

    // Don't place mine on first click or if already has mine
    if (
      (row === firstClickRow && col === firstClickCol) ||
      newBoard[row][col].isMine
    ) {
      continue;
    }

    newBoard[row][col].isMine = true;
    minesPlaced++;
  }

  // Calculate neighbor mine counts
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (!newBoard[row][col].isMine) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const newRow = row + i;
            const newCol = col + j;
            if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
              if (newBoard[newRow][newCol].isMine) {
                count++;
              }
            }
          }
        }
        newBoard[row][col].neighborMineCount = count;
      }
    }
  }

  return newBoard;
};

const revealCell = (board: Cell[][], row: number, col: number): Cell[][] => {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

  if (newBoard[row][col].isRevealed || newBoard[row][col].isFlagged) {
    return newBoard;
  }

  newBoard[row][col].isRevealed = true;

  // If it's a mine, game over
  if (newBoard[row][col].isMine) {
    return newBoard;
  }

  // If it's empty (no neighboring mines), reveal neighbors
  if (newBoard[row][col].neighborMineCount === 0) {
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        const newRow = row + i;
        const newCol = col + j;
        if (newRow >= 0 && newRow < ROWS && newCol >= 0 && newCol < COLS) {
          if (
            !newBoard[newRow][newCol].isRevealed &&
            !newBoard[newRow][newCol].isFlagged
          ) {
            newBoard[newRow][newCol].isRevealed = true;
            if (newBoard[newRow][newCol].neighborMineCount === 0) {
              // Recursively reveal empty cells
              const recursiveResult = revealCell(newBoard, newRow, newCol);
              Object.assign(newBoard, recursiveResult);
            }
          }
        }
      }
    }
  }

  return newBoard;
};

const toggleFlag = (board: Cell[][], row: number, col: number): Cell[][] => {
  const newBoard = board.map((row) => row.map((cell) => ({ ...cell })));

  if (!newBoard[row][col].isRevealed) {
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
  }

  return newBoard;
};

const checkWinCondition = (board: Cell[][]): boolean => {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (!board[row][col].isMine && !board[row][col].isRevealed) {
        return false;
      }
    }
  }
  return true;
};

const countMines = (board: Cell[][]): number => {
  return board.reduce(
    (count, row) =>
      count +
      row.reduce((rowCount, cell) => rowCount + (cell.isMine ? 1 : 0), 0),
    0
  );
};

const countFlags = (board: Cell[][]): number => {
  return board.reduce(
    (count, row) =>
      count +
      row.reduce((rowCount, cell) => rowCount + (cell.isFlagged ? 1 : 0), 0),
    0
  );
};

const countRevealedCells = (board: Cell[][]): number => {
  return board.reduce(
    (count, row) =>
      count +
      row.reduce((rowCount, cell) => rowCount + (cell.isRevealed ? 1 : 0), 0),
    0
  );
};

const defaultGameState = (): GameState => {
  return {
    board: createEmptyBoard(),
    gameStatus: "not_started",
  };
};

export default function Game() {
  const [gameState, setGameState] = useDojoState<GameState>(defaultGameState());

  const handleCellClick = (row: number, col: number) => {
    if (
      gameState.gameStatus !== "playing" &&
      gameState.gameStatus !== "not_started"
    )
      return;

    let newBoard = gameState.board;

    // First click - place mines
    let newGameStatus: GameStatus = gameState.gameStatus;

    if (gameState.gameStatus === "not_started") {
      newBoard = placeMines(gameState.board, row, col);
      newGameStatus = "playing";
    }

    // Reveal cell
    newBoard = revealCell(newBoard, row, col);

    // Check game status
    if (newBoard[row][col].isMine) {
      newGameStatus = "lost";
    } else if (checkWinCondition(newBoard)) {
      newGameStatus = "won";
    }

    setGameState({
      ...gameState,
      board: newBoard,
      gameStatus: newGameStatus,
    });
  };

  const handleRightClick = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (
      gameState.gameStatus !== "playing" &&
      gameState.gameStatus !== "not_started"
    )
      return;

    const newBoard = toggleFlag(gameState.board, row, col);

    setGameState({
      ...gameState,
      board: newBoard,
    });
  };

  const resetGame = () => {
    setGameState(defaultGameState());
  };

  const getCellContent = (cell: Cell) => {
    if (cell.isFlagged) return "🚩";
    if (!cell.isRevealed) return "";
    if (cell.isMine) return "💣";
    if (!cell.neighborMineCount || cell.neighborMineCount === 0) return "";
    return cell.neighborMineCount.toString();
  };

  const getCellStyle = (cell: Cell) => {
    if (!cell.isRevealed) {
      return {
        backgroundColor: "#c0c0c0",
        border: "2px outset #c0c0c0",
      };
    }

    if (cell.isMine) {
      return {
        backgroundColor: "#ff0000",
        color: "white",
      };
    }

    return {
      backgroundColor: "#ffffff",
      border: "1px solid #999",
    };
  };

  const getNumberColor = (count: number) => {
    const colors = [
      "",
      "blue",
      "green",
      "red",
      "purple",
      "maroon",
      "turquoise",
      "black",
      "gray",
    ];
    return colors[count] || "black";
  };

  return (
    <div className="flex flex-col items-center justify-center h-full my-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Minesweeper
      </h1>

      <div className="mb-4 text-center">
        <div className="text-lg mb-2">
          Mines: {countMines(gameState.board)} | Flags:{" "}
          {countFlags(gameState.board)} | Revealed:{" "}
          {countRevealedCells(gameState.board)}
        </div>
        <div className="text-lg font-semibold">
          Status:{" "}
          {gameState.gameStatus === "playing" ||
          gameState.gameStatus === "not_started"
            ? "Playing"
            : gameState.gameStatus === "won"
            ? "You Won! 🎉"
            : "Game Over 💥"}
        </div>
      </div>

      <div className="mb-8">
        <div
          className="grid gap-1 p-2 bg-gray-300 rounded-lg"
          style={{
            gridTemplateColumns: `repeat(${COLS}, 30px)`,
            gridTemplateRows: `repeat(${ROWS}, 30px)`,
          }}
        >
          {gameState.board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <button
                key={`${rowIndex}-${colIndex}`}
                className="w-7 h-7 text-sm font-bold flex items-center justify-center cursor-pointer"
                style={{
                  ...getCellStyle(cell),
                  color:
                    cell.isRevealed &&
                    !cell.isMine &&
                    cell.neighborMineCount &&
                    cell.neighborMineCount > 0
                      ? getNumberColor(cell.neighborMineCount)
                      : "black",
                }}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
              >
                {getCellContent(cell)}
              </button>
            ))
          )}
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={resetGame}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white 
                      rounded-lg font-semibold transition-colors duration-200"
        >
          New Game
        </button>
      </div>

      <div className="mt-6 text-sm text-gray-600 max-w-md text-center">
        <p>
          <strong>How to play:</strong>
        </p>
        <p>• Left click to reveal cells</p>
        <p>• Right click to flag/unflag cells</p>
        <p>• Numbers show how many mines are nearby</p>
        <p>• Flag all mines to win!</p>
      </div>
    </div>
  );
}
