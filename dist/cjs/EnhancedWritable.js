"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnhancedWritable = void 0;
const store_1 = require("svelte/store");
const Enhancer_1 = require("./Enhancer");
class EnhancedWritable extends Enhancer_1.Enhancer {
    constructor(name, ...params) {
        super(name);
        this.state = (0, store_1.writable)(...params);
    }
    get instance() {
        return this.state;
    }
    set(...params) {
        this.emit("onBeforeUpdate", (0, store_1.get)(this.state));
        this.state.set(...params);
        this.emit("onUpdate", params[0]);
    }
    update(...params) {
        this.emit("onBeforeUpdate", (0, store_1.get)(this.state));
        this.state.update(...params);
        this.emit("onUpdate", (0, store_1.get)(this.state));
    }
    subscribe(...params) {
        return this.state.subscribe(...params);
    }
}
exports.EnhancedWritable = EnhancedWritable;
