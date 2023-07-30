"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnhancedDerived = void 0;
const store_1 = require("svelte/store");
const Enhancer_1 = require("./Enhancer");
const Middleware_1 = require("./Middleware");
class EnhancedDerived extends Enhancer_1.Enhancer {
    constructor(name, ...params) {
        super(name);
        this.state = (0, store_1.derived)(...params);
        this.currentValue = Middleware_1.Middleware.clone((0, store_1.get)(this.state));
        this.initialize();
    }
    get instance() {
        return this.state;
    }
    subscribe(...params) {
        return this.state.subscribe(...params);
    }
    initialize() {
        return this.subscribe((v) => {
            this.emit("onBeforeUpdate", this.currentValue);
            const nextValue = this.emit("onUpdate", v);
            this.currentValue = nextValue;
        });
    }
}
exports.EnhancedDerived = EnhancedDerived;
