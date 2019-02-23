import Controller from './controller';
import Display from './display';
import Game from './game';
import Engine from './engine';

import './main.css';

(function() {

    const config = {

        world: {
            width: 900,
            height: 600
        },

        fps: 30
    };

    const start = function() {
        engine.start();
    };

    const render = function() {
        display.draw(player);
        display.render();
    };

    const resize = function() {
        display.resize(config.world.width, config.world.height);
    };

    const update = function() {
        player.move(controller.up, controller.down);
        game.update();
    };

    const controller = new Controller();
    const display = new Display(document.querySelector('canvas'));
    const game = new Game(config.world);
    const player = game.player;
    const engine = new Engine(render, update, config.fps);

    window.addEventListener('keydown', controller.handleKeyPress.bind(controller));
    window.addEventListener('keyup',   controller.handleKeyPress.bind(controller));

    resize();
    start();

})();
