"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enhancer = void 0;
const Middleware_1 = require("./Middleware");
class Enhancer {
    constructor(name) {
        this.middleware = [];
        this.name = name;
    }
    registerMiddleware(...middleware) {
        this.middleware.push(...middleware);
    }
    emit(event, state) {
        if (!this.middleware.length) {
            return state;
        }
        const value = Middleware_1.Middleware.clone(state);
        this.middleware.forEach((middleware) => {
            middleware[event](this.name, value);
        });
        return value;
    }
}
exports.Enhancer = Enhancer;
