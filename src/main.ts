import { Game } from './game/game';
import './style.css';

const root = document.getElementById('app');
if (!root) throw new Error('No #app element found');

const game = new Game(root);
game.start();