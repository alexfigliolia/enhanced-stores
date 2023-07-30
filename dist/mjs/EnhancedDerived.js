import { derived, get } from "svelte/store";
import { Enhancer } from "./Enhancer";
import { Middleware } from "./Middleware";
export class EnhancedDerived extends Enhancer {
    state;
    currentValue;
    constructor(name, ...params) {
        super(name);
        this.state = derived(...params);
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
