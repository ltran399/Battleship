import Board from './board';
import ShipManager from './shipManager';
import Utils from './utils';
import { GAME_STATES } from './constants';

export default class Game {
    constructor() {
        this.state = GAME_STATES.SETUP;
        this.currentPlayer = 1;
        this.player1Board = new Board(1);  // Using correct parameter name
        this.player2Board = new Board(2);  // Using correct parameter name
        this.player1Ships = new ShipManager();
        this.player2Ships = new ShipManager();
        this.ui = null;
    }


    setUI(ui) {
        this.ui = ui;
    }

    handleCellClick(row, col) {
        if (this.state === GAME_STATES.SETUP) {
            this.handleShipPlacement(row, col);
        } else if (this.state === GAME_STATES.PLAYING) {
            this.handleShot(row, col);
        }
    }

    handleShipPlacement(row, col) {
        const currentShips = this.currentPlayer === 1 ? this.player1Ships : this.player2Ships;
        const currentBoard = this.currentPlayer === 1 ? this.player1Board : this.player2Board;

        if (!currentShips.selectedShip) return;

        if (Utils.isValidPlacement(
            currentBoard.grid,
            currentShips.selectedShip,
            row,
            col,
            currentShips.orientation === 'horizontal'
        )) {
            currentBoard.grid = Utils.placeShip(
                currentBoard.grid,
                currentShips.selectedShip,
                row,
                col,
                currentShips.orientation === 'horizontal'
            );

            currentShips.removeShip(currentShips.selectedShip.name);
            currentShips.selectedShip = null;

            if (!currentShips.hasShipsRemaining()) {
                if (this.currentPlayer === 1) {
                    this.currentPlayer = 2;
                    this.ui.updateMessage('Player 2, place your ships');
                } else {
                    this.state = GAME_STATES.PLAYING;
                    this.currentPlayer = 1;
                    this.ui.updateMessage('Player 1, take your shot');
                }
            }

            this.ui.updateBoards();
            this.ui.updateShipList();
        }
    }

    handleShot(row, col) {
        const targetBoard = this.currentPlayer === 1 ? this.player2Board : this.player1Board;
        const result = targetBoard.receiveAttack(row, col);

        if (result === null) return; // Invalid shot

        if (result) {
            this.ui.updateMessage('Hit!');
            if (targetBoard.isAllShipsSunk()) {
                this.state = GAME_STATES.GAME_OVER;
                this.ui.updateMessage(`Player ${this.currentPlayer} wins!`);
                this.ui.showPlayAgainButton();
                return;
            }
        } else {
            this.ui.updateMessage('Miss!');
        }

        this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
        this.ui.updateBoards();
    }

    reset() {
        this.state = GAME_STATES.SETUP;
        this.currentPlayer = 1;
        this.player1Board = new Board(1);
        this.player2Board = new Board(2);
        this.player1Ships = new ShipManager();
        this.player2Ships = new ShipManager();
        this.ui.reset();
    }
}