import { get, readable } from "svelte/store";
import { Enhancer } from "./Enhancer";
import { Middleware } from "./Middleware";
export class EnhancedReadable extends Enhancer {
    state;
    currentValue;
    constructor(name, ...params) {
        super(name);
        this.state = readable(...params);
        this.currentValue = Middleware.clone(get(this.state));
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
