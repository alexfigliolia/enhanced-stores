import { Middleware } from "./Middleware";
export declare class Logger<T = any> extends Middleware<T> {
    private previousState;
    onBeforeUpdate(_: string, state: T): void;
    onUpdate(name: string, state: T): void;
    /**
     * Time
     *
     * Returns the time in which a given state transition completed
     */
    private get time();
}
