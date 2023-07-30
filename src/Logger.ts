import { Middleware } from "./Middleware";

/**
 * ### Logger
 *
 * A redux-like logger for Svelte Stores
 *
 * ```typescript
 * import { EnhancedWritable, Logger } from "@figliolia/enhanced-stores";
 *
 * const writable = new EnhancedWritable("List Items", [1, 2, 3]);
 * writable.registerMiddleware(new Logger());
 * ```
 *
 * The writable in the example above will log to the console each
 * state change that occurs.
 */
export class Logger<T = any> extends Middleware<T> {
  private previousState: T | null = null;

  public override onBeforeUpdate(_: string, state: T) {
    this.previousState = state;
  }

  public override onUpdate(name: string, state: T) {
    console.log(
      "%cUpdate:",
      "color: rgb(187, 186, 186); font-weight: bold",
      name,
      "@",
      this.time
    );
    console.log(
      "   %cPrevious State",
      "color: #26ad65; font-weight: bold",
      this.previousState
    );
    console.log(
      "   %cNext State    ",
      "color: rgb(17, 118, 249); font-weight: bold",
      state
    );
    this.previousState = null;
  }

  /**
   * Time
   *
   * Returns the time in which a given state transition completed
   */
  private get time() {
    const date = new Date();
    const mHours = date.getHours();
    const hours = mHours > 12 ? mHours - 12 : mHours;
    const mins = date.getMinutes();
    const minutes = mins.toString().length === 1 ? `0${mins}` : mins;
    const secs = date.getSeconds();
    const seconds = secs.toString().length === 1 ? `0${secs}` : secs;
    const milliseconds = date.getMilliseconds();
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  }
}
