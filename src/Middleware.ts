/* eslint-disable @typescript-eslint/no-unused-vars */

export class Middleware<T> {
  public onUpdate(name: string, state: T) {}

  public onBeforeUpdate(name: string, state: T) {}

  public static clone<T>(state: T): T {
    if (Array.isArray(state)) {
      return [...state] as T;
    }
    if (state instanceof Set) {
      return new Set(state) as T;
    }
    if (state instanceof Map) {
      return new Map(state) as T;
    }
    if (state && typeof state === "object") {
      return { ...state } as T;
    }
    return state;
  }
}
