import { Middleware } from "./Middleware";

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
        console.warn("A slow state transition detected on", name);
        console.warn(`The last transition took ${diff}ms`);
      }
    }
  }
}
