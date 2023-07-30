import { Middleware } from "./Middleware";
export class Profiler extends Middleware {
    threshold;
    startTime = null;
    constructor(threshold = 16) {
        super();
        this.threshold = threshold;
    }
    onBeforeUpdate() {
        this.startTime = performance.now();
    }
    onUpdate(name) {
        if (this.startTime) {
            const endTime = performance.now();
            const diff = endTime - this.startTime;
            if (diff > this.threshold) {
                console.warn("A slow state transition detected on", name);
                console.warn(`The last transition took ${diff}ms`);
            }
        }
    }
}
