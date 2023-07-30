import { Middleware } from "./Middleware";

/**
 * ### Profiler
 *
 * A profiler for Svelte store updates. Using the `Profiler` middleware
 * each store will log a warning to the console when a state update
 * exceeds 16ms (1 full frame).
 *
 * ```typescript
 * import { EnhancedWritable, Profiler } from "@figliolia/enhanced-stores";
 *
 * const writable = new EnhancedWritable("List Items", [1, 2, 3]);
 * writable.registerMiddleware(new Profiler());
 * ```
 *
 * The profiler accepts any integer as the threshold in which to log
 * warnings
 */
export class Profiler<T = any> extends Middleware<T> {
  private threshold: number;
  private startTime: number | null = null;
  constructor(threshold = 16) {
    super();
    this.threshold = threshold;
  }

  public override onBeforeUpdate() {
    this.startTime = performance.now();
  }

  public override onUpdate(name: string) {
    if (this.startTime) {
      const endTime = performance.now();
      const diff = endTime - this.startTime;
      if (diff > this.threshold) {
        console.warn("A slow state transition was detected on", name);
        console.warn(`The last transition took ${diff}ms`);
      }
    }
  }
}
