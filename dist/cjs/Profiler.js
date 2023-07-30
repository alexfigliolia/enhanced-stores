"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profiler = void 0;
const Middleware_1 = require("./Middleware");
class Profiler extends Middleware_1.Middleware {
    constructor(threshold = 16) {
        super();
        this.startTime = null;
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
exports.Profiler = Profiler;
