"use client";

import { useEffect } from "react";
import type { GameState, Board, Player } from "./types";
import { useDojoState } from "dojo-hooks";

const defaultState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: "X",
  winner: null,
  gameOver: false,
  isComputerTurn: false,
};

export default function Game() {
  const [gameState, setGameState] = useDojoState<GameState>(defaultState);

  const getComputerMove = (board: Board): number => {
    // Strategy: Try to win, then block user, then take center, then corners, then edges

    // Check if computer can win
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const testBoard = [...board];
        testBoard[i] = "O";
        if (checkWinner(testBoard) === "O") {
          return i;
        }
      }
    }

    // Check if need to block user from winning
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const testBoard = [...board];
        testBoard[i] = "X";
        if (checkWinner(testBoard) === "X") {
          return i;
        }
      }
    }

    // Take center if available
    if (board[4] === null) return 4;

    // Take corners
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter((i) => board[i] === null);
    if (availableCorners.length > 0) {
      return availableCorners[
        Math.floor(Math.random() * availableCorners.length)
      ];
    }

    // Take any available edge
    const edges = [1, 3, 5, 7];
    const availableEdges = edges.filter((i) => board[i] === null);
    if (availableEdges.length > 0) {
      return availableEdges[Math.floor(Math.random() * availableEdges.length)];
    }

    // Fallback: take any available spot
    const availableSpots = board
      .map((cell, index) => (cell === null ? index : -1))
      .filter((i) => i !== -1);
    return availableSpots[Math.floor(Math.random() * availableSpots.length)];
  };

  // Handle computer move
  useEffect(() => {
    if (gameState.isComputerTurn && !gameState.gameOver) {
      const computerMoveIndex = getComputerMove(gameState.board);
      if (computerMoveIndex !== undefined && computerMoveIndex !== -1) {
        makeMove(computerMoveIndex, "O");
      }
    }
  }, [gameState.isComputerTurn, gameState.gameOver]);

  const checkWinner = (board: Board): Player => {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // columns
      [0, 4, 8],
      [2, 4, 6], // diagonals
    ];

    for (const line of winningLines) {
      const [a, b, c] = line;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const isBoardFull = (board: Board): boolean => {
    return board.every((cell) => cell !== null);
  };

  const makeMove = (index: number, player: Player) => {
    const newBoard = [...gameState.board];
    newBoard[index] = player;

    const winner = checkWinner(newBoard);
    const isGameOver = winner !== null || isBoardFull(newBoard);
    const nextPlayer = player === "X" ? "O" : "X";
    const isComputerTurn = !isGameOver && nextPlayer === "O";

    const newGameState: GameState = {
      board: newBoard,
      currentPlayer: nextPlayer,
      winner,
      gameOver: isGameOver,
      isComputerTurn,
    };

    setGameState(newGameState);
  };

  const handleCellClick = (index: number) => {
    // Only allow human moves when it's not computer's turn and cell is empty
    if (
      gameState.board[index] ||
      gameState.gameOver ||
      gameState.isComputerTurn
    )
      return;

    makeMove(index, "X");
  };

  const resetGame = () => {
    setGameState(defaultState);
  };

  const getStatusMessage = () => {
    if (gameState.winner) {
      return gameState.winner === "X" ? "You win!" : "Computer wins!";
    } else if (gameState.gameOver) {
      return "It's a tie!";
    } else {
      return "Your turn";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full my-auto p-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          Tic Tac Toe
        </h1>

        <div className="text-xl text-center mb-6 font-semibold text-gray-700">
          {getStatusMessage()}
        </div>

        <div className="grid grid-cols-3 gap-2 mb-8 w-72 h-72 mx-auto">
          {gameState.board.map((cell: Player, index: number) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              className="w-full h-full bg-gray-50 border-2 border-gray-300 rounded-lg 
                         text-4xl font-bold text-gray-800 hover:bg-gray-100 
                         disabled:cursor-not-allowed transition-colors duration-200
                         flex items-center justify-center min-h-[4rem]"
              disabled={
                cell !== null || gameState.gameOver || gameState.isComputerTurn
              }
            >
              <span className="min-w-[1ch]">{cell || ""}</span>
            </button>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={resetGame}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white 
                       rounded-lg font-semibold transition-colors duration-200"
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
}
