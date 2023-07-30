"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
class Middleware {
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
            return Object.assign({}, state);
        }
        return state;
    }
}
exports.Middleware = Middleware;
