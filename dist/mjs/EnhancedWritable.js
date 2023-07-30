import { get, writable } from "svelte/store";
import { Enhancer } from "./Enhancer";
export class EnhancedWritable extends Enhancer {
    state;
    constructor(name, ...params) {
        super(name);
        this.state = writable(...params);
    }
    get instance() {
        return this.state;
    }
    set(...params) {
        this.emit("onBeforeUpdate", get(this.state));
        this.state.set(...params);
        this.emit("onUpdate", params[0]);
    }
    update(...params) {
        this.emit("onBeforeUpdate", get(this.state));
        this.state.update(...params);
        this.emit("onUpdate", get(this.state));
    }
    subscribe(...params) {
        return this.state.subscribe(...params);
    }
}
