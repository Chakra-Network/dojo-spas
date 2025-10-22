export type Player = "X" | "O" | null;
export type Board = Player[];

export interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player;
  gameOver: boolean;
  isComputerTurn: boolean;
}
