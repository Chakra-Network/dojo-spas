export interface Cell {
  isMine: boolean | undefined;
  isRevealed: boolean | undefined;
  isFlagged: boolean | undefined;
  neighborMineCount: number | undefined;
}

export type GameStatus = "not_started" | "playing" | "won" | "lost";

export interface GameState {
  board: Cell[][];
  gameStatus: GameStatus;
}
