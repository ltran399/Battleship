import './style.css';
import Game from './game.js';
import UI from './ui.js';

// Add console logs for debugging
console.log('Game starting...');

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    
    // Check if elements exist
    console.log('player1Board exists:', !!document.getElementById('player1Board'));
    console.log('player2Board exists:', !!document.getElementById('player2Board'));
    console.log('shipList exists:', !!document.getElementById('shipList'));
    
    const game = new Game();
    const ui = new UI(game);
    game.setUI(ui);
    ui.updateMessage('Player 1, place your ships');
});
