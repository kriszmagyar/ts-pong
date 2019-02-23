class Game {

    player1: Player;
    player2: Player;
    width: number;
    height: number;

    constructor(world: any) {
        this.player1 = new Player(10, world.height / 2 - 60, 15, 120, 'rgb(0, 0, 0)');
        this.player2 = new Player(world.width - 25, world.height / 2 - 60, 15, 120, 'rgb(0, 0, 0)');
        this.width = world.width;
        this.height = world.height;
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

        this.collideObject(this.player1);
        this.collideObject(this.player2);
    }

}

export class Shape {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;

    constructor(x: number, y: number, width?: number, height?: number, color?: string) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
    }
}

class Player extends Shape {

    dx: number;
    dy: number;

    constructor(x: number, y: number, width: number, height: number, color: string) {
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

export default Game;