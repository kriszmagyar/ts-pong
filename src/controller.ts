class Controller {

    arrowUp: boolean;
    arrowDown: boolean;

    keyW: boolean;
    keyS: boolean;

    keyEnter: boolean;

    constructor() {
        this.arrowUp = false;
        this.arrowDown = false;

        this.keyW = false;
        this.keyS = false;

        this.keyEnter = false;
    }

    keyPress(type: string, code: string) {
        const isKeyDown = type === 'keydown' ? true : false;
        switch (code) {
            case 'ArrowUp': this.arrowUp = isKeyDown;
                break;
            case 'ArrowDown': this.arrowDown = isKeyDown;
                break;
            case 'KeyW': this.keyW = isKeyDown;
                break;
            case 'KeyS': this.keyS = isKeyDown;
                break;
            case 'Enter': this.keyEnter = isKeyDown;
                break;
        }
    }

    handleKeyPress(event: KeyboardEvent) {
        const { type, code } = event;
        this.keyPress(type, code);
    }

}

export default Controller;