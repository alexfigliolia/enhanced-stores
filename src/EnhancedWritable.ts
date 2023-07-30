import type { Writable } from "svelte/store";
import { get, writable } from "svelte/store";
import { Enhancer } from "./Enhancer";

export class EnhancedWritable<T> extends Enhancer<T> {
  state: Writable<T>;
  constructor(name: string, ...params: Parameters<typeof writable<T>>) {
    super(name);
    this.state = writable(...params);
  }

  public get instance() {
    return this.state;
  }

  public set(...params: Parameters<Writable<T>["set"]>) {
    this.emit("onBeforeUpdate", get(this.state));
    this.state.set(...params);
    this.emit("onUpdate", params[0]);
  }

  public update(...params: Parameters<Writable<T>["update"]>) {
    this.emit("onBeforeUpdate", get(this.state));
    this.state.update(...params);
    this.emit("onUpdate", get(this.state));
  }

  public subscribe(...params: Parameters<Writable<T>["subscribe"]>) {
    return this.state.subscribe(...params);
  }
}
