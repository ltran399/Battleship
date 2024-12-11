import { GRID_SIZE, GAME_STATES } from './constants';  // Added GAME_STATES import

export default class UI {
    constructor(game) {
        this.game = game;
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('rotateBtn').addEventListener('click', () => {
            const currentShips = this.game.currentPlayer === 1 
                ? this.game.player1Ships 
                : this.game.player2Ships;
            currentShips.rotateShip();
        });

        document.getElementById('playAgain').addEventListener('click', () => {
            this.game.reset();
        });

        this.setupBoards();
        this.updateShipList();
    }

    setupBoards() {
        ['player1Board', 'player2Board'].forEach((boardId, index) => {
            const board = document.getElementById(boardId);
            board.innerHTML = '';
            
            for (let i = 0; i < GRID_SIZE; i++) {
                for (let j = 0; j < GRID_SIZE; j++) {
                    const cell = document.createElement('div');
                    cell.className = 'cell';
                    cell.dataset.row = i;
                    cell.dataset.col = j;
                    cell.addEventListener('click', () => {
                        this.game.handleCellClick(i, j);
                    });
                    board.appendChild(cell);
                }
            }
        });
    }

    updateBoards() {
        this.updatePlayerBoard(1);
        this.updatePlayerBoard(2);
    }

    updatePlayerBoard(playerId) {
        const board = playerId === 1 ? this.game.player1Board : this.game.player2Board;
        const boardElement = document.getElementById(`player${playerId}Board`);
        const cells = boardElement.getElementsByClassName('cell');

        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                const cell = cells[i * GRID_SIZE + j];
                const hasShip = board.grid[i][j] !== null;
                const position = `${i},${j}`;
                const isShot = board.shots.has(position);

                cell.className = 'cell';
                if (hasShip && (playerId === this.game.currentPlayer || this.game.state === GAME_STATES.SETUP)) {
                    cell.classList.add('ship');
                }
                if (isShot) {
                    cell.classList.add(hasShip ? 'hit' : 'miss');
                    cell.textContent = hasShip ? '×' : '○';
                }
            }
        }
    }

    updateShipList() {
        const shipList = document.getElementById('shipList');
        const currentShips = this.game.currentPlayer === 1 
            ? this.game.player1Ships 
            : this.game.player2Ships;
        
        shipList.innerHTML = '';
        currentShips.ships.forEach(ship => {
            const button = document.createElement('button');
            button.textContent = `${ship.name} (${ship.size})`;
            button.addEventListener('click', () => {
                currentShips.selectShip(ship.name);
                document.getElementById('rotateBtn').classList.remove('hidden');
            });
            shipList.appendChild(button);
        });
    }

    updateMessage(message) {
        document.getElementById('message').textContent = message;
    }

    showPlayAgainButton() {
        document.getElementById('playAgain').classList.remove('hidden');
    }

    reset() {
        this.updateMessage('Player 1, place your ships');
        document.getElementById('playAgain').classList.add('hidden');
        document.getElementById('rotateBtn').classList.add('hidden');
        this.setupBoards();
        this.updateShipList();
    }
}