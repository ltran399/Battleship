export const GRID_SIZE = 10;

export const SHIPS = [
    { name: 'Carrier', size: 5 },
    { name: 'Battleship', size: 4 },
    { name: 'Cruiser', size: 3 },
    { name: 'Submarine', size: 3 },
    { name: 'Destroyer', size: 2 }
];

export const GAME_STATES = {
    SETUP: 'setup',
    PLAYING: 'playing',
    GAME_OVER: 'game_over'
};