class Controller {

    up: boolean;
    down: boolean;

    constructor() {
        this.up = false;
        this.down = false;
    }

    keyPress(type: string, code: string) {
        const isKeyDown = type === 'keydown' ? true : false;
        switch (code) {
            case 'ArrowUp': this.up = isKeyDown;
                break;
            case 'ArrowDown': this.down = isKeyDown;
                break;
        }
    }

    handleKeyPress(event: KeyboardEvent) {
        const { type, code } = event;
        this.keyPress(type, code);
    }

}

export default Controller;