declare global {
    interface Window {
        dojo: Dojo<any>;
    }
}
declare class Dojo<T> {
    private static instance;
    state: T;
    private constructor();
    private tryAttachDojoToWindow;
    static getInstance<T>(initialState?: T): Dojo<T>;
    getState(): T;
    setState(state: T): void;
}
export declare const dojo: Dojo<any>;
export declare function useDojoState<T>(initialState?: T): [T, (state: T extends any ? T | ((state: T) => T) : never) => void];
export {};
