import {GRID_SIZE} from './constants';

export default class utils {
    static createEmptyBoard() {
        return Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(null));
    }

    static isValidPlacement(board, ship, row, col, isHorizontal){
        if(isHorizontal){
            if(col +ship.size > GRID_SIZE){
                return false;
            }
            for(let i = 0; i < ship.size; i++){
                if(board[row][col + i] !== null){
                    return false;
                }
            }
        } else {
            if(row + ship.size > GRID_SIZE){
                return false;
            }
            for(let i = 0; i < ship.size; i++){
                if(board[row + i][col] !== null){
                    return false;
                }
            }
        }
        return true;
    }

    static placeShip(board,ship,row, col, isHorizontal){
        const newBoard = board.map(row => [...row]);
        if(isHorizontal){
            for(let i = 0; i < ship.size; i++){
                newBoard[row][col + i] = ship.name;
            }
        } else {
            for(let i = 0; i < ship.size; i++){
                newBoard[row + i][col] = ship.name;
            }
        }
        return newBoard;
    }
}