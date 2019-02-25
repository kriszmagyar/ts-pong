class Engine {

    accumulatedTime: number;
    animationFrameRequest: number;
    time: number;
    timeStep: number;
    updated: boolean;

    render: Function;
    update: Function;

    constructor(render: Function, update: Function, fps: number = 30) {
        this.accumulatedTime = 0;
        this.animationFrameRequest = 0;
        this.time = 0;
        this.timeStep = 1000 / fps;
        this.updated = false;

        this.render = render;
        this.update = update;
    }

    start() {
        this.accumulatedTime = this.timeStep;
        this.time = window.performance.now();
        this.animationFrameRequest = window.requestAnimationFrame(this.handleRun.bind(this));
    }

    run(timeStep: number) {
        this.accumulatedTime += timeStep - this.time;
        this.time = timeStep;

        if (this.accumulatedTime >= this.timeStep * 3) {
            this.accumulatedTime = this.timeStep;
        }

        while (this.accumulatedTime >= this.timeStep) {
            this.accumulatedTime -= this.timeStep;
            this.update(timeStep);
            this.updated = true;
        }

        if (this.updated) {
            this.updated = false;
            this.render(timeStep);
        }

        this.animationFrameRequest = window.requestAnimationFrame(this.handleRun.bind(this));

    }

    handleRun(timeStep: number) {
        this.run(timeStep);
    }

    stop() {
        window.cancelAnimationFrame(this.animationFrameRequest);
    }

}

export default Engine;