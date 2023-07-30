export declare class Middleware<T> {
    onUpdate(name: string, state: T): void;
    onBeforeUpdate(name: string, state: T): void;
    static clone<T>(state: T): T;
}
