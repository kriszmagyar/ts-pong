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

    private collidePlayer(player: Player) {
        if (player.y <= 0) {
            player.y = 0;
            player.dy = 0;
        }
        if (player.y + player.height >= this.height) {
            player.y = this.height - player.height;
            player.dy = 0;
        }
    }

    private collideBall(ball: Ball, p1: Player, p2: Player) {

        // Ball touching the upper bound
        if (ball.y <= 0) {
            ball.y = 0;
            ball.dy *= -1;
            return true;
        }

        // Ball touching the lowe bound
        if (ball.y + ball.height >= this.height) {
            ball.y = this.height - ball.height;
            ball.dy *= -1;
            return true;
        }

        // Ball scores to left
        if (ball.x <= 0) {
            ball.x = this.width / 2;
            ball.y = this.height / 2;
            ball.dx = 0;
            ball.dy = 0;
            console.log('Score to Player 2!');
            return true;
        }

        // Ball scores to right
        if (ball.x + ball.width >= this.width) {
            ball.x = this.width / 2;
            ball.y = this.height / 2;
            ball.dx = 0;
            ball.dy = 0;
            console.log('Score to Player 1!');
            return true;
        }

        // Ball touch Player 1
        if (ball.x <= p1.x + p1.width && ball.y + ball.height >= p1.y && ball.y <= p1.y + p1.height) {
            ball.x = p1.x + p1.width;
            ball.dx *= -1.05;
            return true;
        }

        // Ball touch Player 2
        if (ball.x + ball.width >= p2.x && ball.y + ball.height >= p2.y && ball.y <= p2.y + p2.height) {
            ball.x = p2.x - ball.width;
            ball.dx *= -1.05;
            return true;
        }

        return false;
    }

    update() {
        this.player1.update();
        this.player2.update();
        this.ball.update();

        this.collidePlayer(this.player1);
        this.collidePlayer(this.player2);
        this.collideBall(this.ball, this.player1, this.player2);
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
        this.dx = -5;
        this.dy = -5;
    }

    update() {
        this.x += this.dx;
        this.y += this.dy;
    }

}

export default Game;