import { Shape } from './types';

class Game {

    width: number;
    height: number;

    player1: Player;
    player2: Player;

    ball: Ball;

    constructor(world: any) {
        this.width = world.width;
        this.height = world.height;

        this.player1 = new Player(10, this.height / 2 - 60, 15, 120);
        this.player2 = new Player(this.width - 25, this.height / 2 - 60, 15, 120);

        this.ball = new Ball(this.width / 2, this.height / 2, 15, 15);
    }

    collideObject(obj: Player) {
        if (obj.y <= 0) {
            obj.y = 0;
            obj.dy = 0;
        }
        if (obj.y + obj.height >= this.height) {
            obj.y = this.height - obj.height;
            obj.dy = 0;
        }
    }


    update() {
        this.player1.update();
        this.player2.update();
        this.ball.update();

        this.collideObject(this.player1);
        this.collideObject(this.player2);
    }

}

class Player extends Shape {

    dx: number;
    dy: number;

    constructor(x: number, y: number, width: number, height: number, color?: string) {
        super(x, y, width, height, color);

        this.dx = 0;
        this.dy = 0;

    }

    move(up: boolean, down: boolean) {
        if (up) {
            this.dy = this.dy - 1;
        } else if (down) {
            this.dy = this.dy + 1;
        } else {
            this.dy = this.dy > 0
                ? Math.max(this.dy - 1, 0)
                : Math.min(this.dy + 1, 0);
        }
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
    }

}

class Ball extends Shape {

    dx: number;
    dy: number;

    constructor(x: number, y: number, width: number, height: number, color?: string) {
        super(x, y, width, height, color);
        this.dx = 5;
        this.dy = 5;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
    }

}

export default Game;