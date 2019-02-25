import { MovingShape } from './types';

class Game {

    width: number;
    height: number;

    player1: Player;
    player2: Player;

    ball: Ball;

    private state: 'SERVE' | 'PLAY' | 'END';
    private scoreToWin = 3;

    constructor(world: any) {
        this.width = world.width;
        this.height = world.height;
        this.state = 'SERVE';

        this.player1 = new Player(10, this.height / 2 - 60, 15, 120);
        this.player2 = new Player(this.width - 25, this.height / 2 - 60, 15, 120);

        this.ball = new Ball(this.width / 2 - 8, this.height / 2 - 8, 16, 16);
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
            this.score(p2);
            return true;
        }

        // Ball scores to right
        if (ball.x + ball.width >= this.width) {
            this.score(p1);
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

    update(enter: boolean) {

        if (this.state === 'END') {
            if (enter) {
                this.reset();
            }
            return;
        }

        this.player1.update();
        this.player2.update();

        this.collidePlayer(this.player1);
        this.collidePlayer(this.player2);

        if (this.state === 'SERVE') {
            if (enter) {
                this.state = 'PLAY';
                this.ball.start();
            }
            return;
        }

        this.ball.update();
        this.collideBall(this.ball, this.player1, this.player2);
    }

    score(player: Player) {
        player.addScore();
        if (player.score >= this.scoreToWin) {
            this.win(player);
            return;
        }
        this.resetBall();
    }

    reset() {
        this.resetBall();

        this.player1.score = 0;
        this.player2.score = 0;
        this.player1.isWon = false;
        this.player2.isWon = false;
    }

    resetBall() {
        this.state = 'SERVE';
        this.ball.x = this.width / 2;
        this.ball.y = this.height / 2;
        this.ball.dx = 0;
        this.ball.dy = 0;
    }

    win(player: Player) {
        this.state = 'END';
        player.isWon = true;
    }

}

class Player extends MovingShape {

    isWon: boolean;
    score: number;

    constructor(x: number, y: number, width: number, height: number, color?: string) {
        super(x, y, width, height, color);
        this.isWon = false;
        this.score = 0;
    }

    addScore() {
        this.score++;
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

}

class Ball extends MovingShape {

    constructor(x: number, y: number, width: number, height: number, color?: string) {
        super(x, y, width, height, color);
    }

    start() {
        this.dx = 10;
        this.dy = 10;
    }

}

export default Game;