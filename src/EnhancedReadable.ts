import type { Readable } from "svelte/store";
import { get, readable } from "svelte/store";
import { Enhancer } from "./Enhancer";
import { Middleware } from "./Middleware";

export class EnhancedReadable<T> extends Enhancer<T> {
  state: Readable<T>;
  private currentValue: T | undefined;
  constructor(name: string, ...params: Parameters<typeof readable<T>>) {
    super(name);
    this.state = readable(...params);
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
