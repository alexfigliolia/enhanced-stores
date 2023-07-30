import type { Stores, Readable } from "svelte/store";
import { derived, get } from "svelte/store";
import { Enhancer } from "./Enhancer";
import { Middleware } from "./Middleware";

export class EnhancedDerived<S extends Stores, T> extends Enhancer<T> {
  state: Readable<T>;
  currentValue: T | undefined;
  constructor(name: string, ...params: Parameters<typeof derived<S, T>>) {
    super(name);
    this.state = derived(...params);
    this.currentValue = Middleware.clone(get(this.state));
    this.initialize();
  }

  public get instance() {
    return this.state;
  }

  public subscribe(...params: Parameters<Readable<T>["subscribe"]>) {
    return this.state.subscribe(...params);
  }

  private initialize() {
    return this.subscribe((v) => {
      this.emit("onBeforeUpdate", this.currentValue!);
      const nextValue = this.emit("onUpdate", v);
      this.currentValue = nextValue;
    });
  }
}
