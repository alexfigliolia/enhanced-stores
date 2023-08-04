import { get, type Readable } from "svelte/store";
import { Middleware } from "./Middleware";

/**
 * ### Enhancer
 *
 * A base class for all enhanced stores in svelte. By extending
 * the `Enhancer`, your states gain access to an event emitter
 * that communicates with each registered middleware
 */
export class Enhancer<T, S extends Readable<T>> {
  state: S;
  name: string;
  middleware: Middleware<T>[] = [];
  constructor(name: string, state: S) {
    this.name = name;
    this.state = state;
  }

  /**
   * Register Middleware
   *
   * Registers a middleware instance and invokes it's `onInitialize`
   * event with the store's current state
   */
  public registerMiddleware(...middleware: Middleware<T>[]) {
    this.middleware.push(...middleware);
    for (const instance of middleware) {
      instance.onInitialize(this.name, Middleware.clone(get(this.state)));
    }
  }

  /**
   * Emit
   *
   * Emits the specified event to each of the registered
   * middleware
   */
  protected emit(event: keyof Middleware<T>, state: T) {
    if (!this.middleware.length) {
      return state;
    }
    const value = Middleware.clone(state);
    this.middleware.forEach((middleware) => {
      middleware[event](this.name, value);
    });
    return value;
  }
}
