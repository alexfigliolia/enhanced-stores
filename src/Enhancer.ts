import { Middleware } from "./Middleware";

/**
 * ### Enhancer
 *
 * A base class for all enhanced stores in svelte. By extending
 * the `Enhancer`, your states gain access to an event emitter
 * that communicates with each registered middleware
 */
export class Enhancer<T> {
  name: string;
  middleware: Middleware<T>[] = [];
  constructor(name: string) {
    this.name = name;
  }

  public registerMiddleware(...middleware: Middleware<T>[]) {
    this.middleware.push(...middleware);
  }

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
