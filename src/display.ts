import { Shape } from './game';

class Display {

    private buffer: CanvasRenderingContext2D;
    private context: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.context = canvas.getContext('2d');
        this.buffer = document.createElement('canvas').getContext('2d');
    }

    draw(obj: Shape): void {
        this.drawBG('rgb(256, 256, 256)');

        this.buffer.fillStyle = obj.color;
        this.buffer.fillRect(Math.floor(obj.x), Math.floor(obj.y), obj.width, obj.height);

    }

    private drawBG(color: string): void {
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

    resize() {

        const MARGIN = 32;

        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;

        this.context.canvas.height = height - MARGIN;
        this.context.canvas.width = width - MARGIN;

        this.context.imageSmoothingEnabled = false;

        this.render();
    }

    handleResize() {
        this.resize();
    }

}

export default Display;