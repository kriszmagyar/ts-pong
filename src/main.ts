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
        }
    };

    const start = function() {
        resize();
        engine.start();
    };

    const resize = function() {
        display.resize(config.world.width, config.world.height);
    };

    const render = function() {
        display.draw([player1, player2, ball]);
        display.render();
    };

    const update = function() {
        player1.move(controller.keyW, controller.keyS);
        player2.move(controller.arrowUp, controller.arrowDown);
        game.update(controller.keyEnter);
    };

    const controller =  new Controller();
    const display =     new Display(document.querySelector('canvas'));
    const game =        new Game(config.world);
    const engine =      new Engine(render, update, 30);

    const player1 = game.player1;
    const player2 = game.player2;
    const ball =    game.ball;

    window.addEventListener('keydown', controller.handleKeyPress.bind(controller));
    window.addEventListener('keyup',   controller.handleKeyPress.bind(controller));

    start();

})();
