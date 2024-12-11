import { SHIPS } from './constants';

export default class ShipManager {
    constructor() {
        this.ships = [...SHIPS];
        this.selectedShip = null;
        this.orientation = 'horizontal';
    }

    selectShip(shipName) {
        this.selectedShip = this.ships.find(ship => ship.name === shipName);
    }

    removeShip(shipName) {
        this.ships = this.ships.filter(ship => ship.name !== shipName);
    }

    rotateShip() {
        this.orientation = this.orientation === 'horizontal' ? 'vertical' : 'horizontal';
    }

    hasShipsRemaining() {
        return this.ships.length > 0;
    }
}