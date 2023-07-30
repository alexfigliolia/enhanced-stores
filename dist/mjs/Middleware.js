/* eslint-disable @typescript-eslint/no-unused-vars */
export class Middleware {
    onUpdate(name, state) { }
    onBeforeUpdate(name, state) { }
    static clone(state) {
        if (Array.isArray(state)) {
            return [...state];
        }
        if (state instanceof Set) {
            return new Set(state);
        }
        if (state instanceof Map) {
            return new Map(state);
        }
        if (state && typeof state === "object") {
            return { ...state };
        }
        return state;
    }
}
