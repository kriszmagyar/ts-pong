import Controller from './controller';
import Display from './display';
import Game from './game';
import Engine from './engine';

import './main.css';

(function() {

    const FPS = 30;

    const start = function() {
        engine.start();
    };

    const render = function() {
        display.draw(player);
        display.render();
    };

    const resize = function() {
        display.resize();
    };

    const update = function() {
        player.move(controller.up, controller.down);
        game.update();
    };

    const controller = new Controller();
    const display = new Display(document.querySelector('canvas'));
    const game = new Game(1410, 870);
    const player = game.player;
    const engine = new Engine(render, update, FPS);

    window.addEventListener('resize',  display.handleResize.bind(display));
    window.addEventListener('keydown', controller.handleKeyPress.bind(controller));
    window.addEventListener('keyup',   controller.handleKeyPress.bind(controller));

    resize();
    start();

})();
