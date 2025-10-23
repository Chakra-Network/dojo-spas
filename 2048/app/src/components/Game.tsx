"use client";

import { useEffect, useRef, useState } from "react";
import type { GameState, Board } from "./types";
import { useDojoState } from "@chakra-dev/dojo-hooks";

const BOARD_SIZE = 4;

// TODO: this is called a bunch?
const defaultGameState = (): GameState => {
  return {
    board: Array(BOARD_SIZE * BOARD_SIZE).fill(0),
    gameOver: false,
    gameInitialized: false,
  };
};

export default function Game() {
  const [gameState, setGameState] = useDojoState<GameState>(defaultGameState());
  const appInitialized = useRef(false);
  const [requestReset, setRequestReset] = useState(false);

  useEffect(() => {
    if (!appInitialized.current) {
      appInitialized.current = true;
      setGameState((game: GameState): GameState => {
        if (game.gameInitialized) {
          return game;
        }

        const board = [...game.board];
        placeRandomTile(board);
        return {
          board: board,
          gameOver: false,
          gameInitialized: true,
        };
      });
    }

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const isBoardFull = (board: Board): boolean => {
    return board.every((cell) => cell !== 0);
  };

  const noMovesAvailable = (board: Board): boolean => {
    if (!isBoardFull(board)) {
      return false;
    }

    // check rows
    for (let row = 0; row < BOARD_SIZE; row++) {
      let lastVal: number | undefined = undefined;
      for (let col = 0; col < BOARD_SIZE; col++) {
        const val = getBoardValue(board, row, col);
        if (lastVal === val) {
          return false;
        }
        lastVal = val;
      }
    }

    // check columns
    for (let col = 0; col < BOARD_SIZE; col++) {
      let lastVal: number | undefined = undefined;
      for (let row = 0; row < BOARD_SIZE; row++) {
        const val = getBoardValue(board, row, col);
        if (lastVal === val) {
          return false;
        }
        lastVal = val;
      }
    }
    return true;
  };

  const getBoardValue = (board: Board, row: number, col: number): number => {
    return board[row * BOARD_SIZE + col];
  };

  const setBoardValue = (
    board: Board,
    row: number,
    col: number,
    val: number
  ) => {
    board[row * BOARD_SIZE + col] = val;
  };

  const consolidateLine = (
    board: Board,
    start: number[],
    delta: number[]
  ): boolean => {
    // last value that can be collided with
    let lastVal: number | undefined = undefined;
    const result: number[] = [];

    let didMakeMove = false;
    let sawZero = false;
    for (let i = 0; i < BOARD_SIZE; i++) {
      const pt = [start[0] + i * delta[0], start[1] + i * delta[1]];
      const val = getBoardValue(board, pt[0], pt[1]);
      if (val !== 0) {
        // if we previously saw a zero tile, and this is non zero,
        // that means tiles are going to move.
        if (sawZero) {
          didMakeMove = true;
          break;
        }
      } else {
        sawZero = true;
      }
    }

    for (let i = 0; i < BOARD_SIZE; i++) {
      const pt = [start[0] + i * delta[0], start[1] + i * delta[1]];
      const val = getBoardValue(board, pt[0], pt[1]);
      if (val !== 0) {
        if (lastVal) {
          if (lastVal === val) {
            result.push(val * 2);
            lastVal = undefined;
            didMakeMove = true;
          } else {
            result.push(lastVal);
            lastVal = val;
          }
        } else {
          lastVal = val;
        }
      }

      pt[0] += delta[0];
      pt[1] += delta[1];
    }

    if (lastVal) {
      result.push(lastVal);
    }

    for (let i = 0; i < BOARD_SIZE; i++) {
      let val = 0;
      if (i < result.length) {
        val = result[i];
      }
      setBoardValue(
        board,
        start[0] + i * delta[0],
        start[1] + i * delta[1],
        val
      );
    }

    return didMakeMove;
  };

  const placeRandomTile = (board: Board): boolean => {
    const emptyIdx = board
      .map((val: number, idx: number) => [val, idx])
      .filter((valIdx: number[]) => valIdx[0] === 0)
      .map((valIdx: number[]) => valIdx[1]);

    if (emptyIdx.length === 0) {
      return false;
    }

    const randomIndex = emptyIdx[Math.floor(Math.random() * emptyIdx.length)];
    const val = Math.random() < 0.9 ? 2 : 4;
    board[randomIndex] = val;
    return true;
  };

  const performRound = (fn: (board: Board) => boolean) => {
    setGameState((gameState: GameState): GameState => {
      if (noMovesAvailable(gameState.board)) {
        return gameState;
      }

      const board = [...gameState.board];

      const didMove = fn(board);
      if (didMove) {
        placeRandomTile(board);
      }

      const isGameOver = noMovesAvailable(board);

      return {
        board: board,
        gameOver: isGameOver,
        gameInitialized: gameState.gameInitialized,
      };
    });
  };

  const moveUp = (board: Board) => {
    let didMove = false;
    for (let col = 0; col < BOARD_SIZE; col++) {
      didMove = consolidateLine(board, [0, col], [1, 0]) || didMove;
    }

    return didMove;
  };

  const moveDown = (board: Board): boolean => {
    let didMove = false;
    for (let col = 0; col < BOARD_SIZE; col++) {
      didMove =
        consolidateLine(board, [BOARD_SIZE - 1, col], [-1, 0]) || didMove;
    }

    return didMove;
  };

  const moveLeft = (board: Board): boolean => {
    let didMove = false;
    for (let row = 0; row < BOARD_SIZE; row++) {
      didMove = consolidateLine(board, [row, 0], [0, 1]) || didMove;
    }

    return didMove;
  };

  const moveRight = (board: Board): boolean => {
    let didMove = false;
    for (let row = 0; row < BOARD_SIZE; row++) {
      didMove =
        consolidateLine(board, [row, BOARD_SIZE - 1], [0, -1]) || didMove;
    }

    return didMove;
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowUp":
        performRound(moveUp);
        break;
      case "ArrowDown":
        performRound(moveDown);
        break;
      case "ArrowLeft":
        performRound(moveLeft);
        break;
      case "ArrowRight":
        performRound(moveRight);
        break;
    }
  };

  useEffect(() => {
    if (!requestReset) {
      return;
    }

    setGameState((_: GameState): GameState => {
      const newGame = defaultGameState();
      placeRandomTile(newGame.board);
      return newGame;
    });

    setRequestReset(false);
  }, [requestReset]);

  const getScale = (val: number) => {
    let scale = 0;
    let copy = val;
    while (copy > 1) {
      scale += 1;
      copy = copy / 2;
    }
    return scale;
  };

  const styleForValue = (val: number) => {
    let bgColor = "#AD9387";
    let textColor = "white";

    if (val !== 0) {
      const r = 235;
      let g = 220;
      let b = 150;

      let scale = getScale(val);
      bgColor = `#${(scale * 100).toString(16)}`;
      const colorMod = 1 - scale / getScale(2048);
      g = Math.round(g * colorMod);
      b = Math.round(b * colorMod);

      bgColor = `rgb(${r}, ${g}, ${b})`;
    }

    return {
      backgroundColor: bgColor,
      color: textColor,
    };
  };

  return (
    <div className="flex flex-col items-center justify-center h-full my-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        2048
      </h1>

      <div
        className="relative rounded-3xl shadow-lg p-3 mb-8"
        style={{ backgroundColor: "#917C73" }}
      >
        <div className="grid grid-cols-4 gap-2 w-128 h-128 mx-auto">
          {gameState.board.map((val: number, idx: number) => (
            <div
              key={idx}
              className="font-bold text-4xl w-full h-full shadow-lg rounded-2xl flex items-center justify-center min-h-[4rem]"
              style={styleForValue(val)}
            >
              {val === 0 ? "" : val}
            </div>
          ))}
        </div>

        {gameState.gameOver && (
          <div>
            <div className="absolute inset-0 bg-black opacity-60 rounded-3xl"></div>

            <div className="absolute inset-0 flex items-center justify-center font-bold text-5xl text-white">
              GAME OVER
            </div>
          </div>
        )}
      </div>

      <div className="text-center">
        <button
          onClick={() => setRequestReset(true)}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white 
                      rounded-lg font-semibold transition-colors duration-200"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}
