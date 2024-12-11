import Utils from './utils';
import { GRID_SIZE, SHIPS } from './constants';

export default class Board {
    constructor(playerId) {  // Changed from playerID to playerId
        this.playerId = playerId;
        this.grid = Utils.createEmptyBoard();
        this.shots = new Set();
    }

    receiveAttack(row, col) {
        const position = `${row},${col}`;
        if (this.shots.has(position)) return null;
        
        this.shots.add(position);
        return this.grid[row][col] !== null;
    }

    isAllShipsSunk() {
        const totalShipCells = SHIPS.reduce((sum, ship) => sum + ship.size, 0);
        let hitCount = 0;
        
        this.shots.forEach(pos => {
            const [row, col] = pos.split(',').map(Number);
            if (this.grid[row][col] !== null) hitCount++;
        });
        
        return hitCount === totalShipCells;
    }
}