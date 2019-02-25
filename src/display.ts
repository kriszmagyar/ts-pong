class Display {

    private buffer: CanvasRenderingContext2D;
    private context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.context = canvas.getContext('2d');
        this.buffer = document.createElement('canvas').getContext('2d');
    }

    draw(shapes: any) {
        this.drawBG('rgb(256, 256, 256)');

        for (let obj of shapes) {
            this.buffer.fillStyle = obj.color;
            this.buffer.fillRect(Math.floor(obj.x), Math.floor(obj.y), obj.width, obj.height);
        }

        const player1 = shapes[0];
        const player2 = shapes[1];

        this.buffer.font = '72px serif';
        this.buffer.textAlign = 'center';
        if (player1.isWon) {
            this.buffer.fillText('Player 1 won!', this.context.canvas.width / 2, 100);
        } else if (player2.isWon) {
            this.buffer.fillText('Player 2 won!', this.context.canvas.width / 2, 100);
        } else {
            this.buffer.fillText(`${player1.score} : ${player2.score}`, this.context.canvas.width / 2, 100);
        }

    }

    private drawBG(color: string) {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    }

    render() {
        this.context.drawImage(
            this.buffer.canvas, 0, 0,
            this.buffer.canvas.width,
            this.buffer.canvas.height, 0, 0,
            this.context.canvas.width,
            this.context.canvas.height
        );
    }

    resize(width?: number, height?: number) {

        width = width || document.documentElement.clientWidth;
        height = height || document.documentElement.clientHeight;

        this.context.canvas.width = width;
        this.context.canvas.height = height;

        this.buffer.canvas.width = width;
        this.buffer.canvas.height = height;

        this.context.imageSmoothingEnabled = false;

        this.render();
    }

}

export default Display;