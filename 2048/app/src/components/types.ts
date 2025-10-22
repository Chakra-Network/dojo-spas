// in row, col order
  // e.g. row n is at index n * 4
export type Board = number[];

export interface GameState {
    board: Board;
    gameOver: boolean;
    gameInitialized: boolean;
}
