import { useEffect, useState } from "react";
class Dojo {
    constructor(state) {
        this.state = state;
        this.tryAttachDojoToWindow();
    }
    tryAttachDojoToWindow() {
        if (typeof window !== "undefined" && !window.dojo) {
            window.dojo = this;
        }
    }
    static getInstance(initialState) {
        if (!Dojo.instance) {
            Dojo.instance = new Dojo(initialState || {});
        }
        return Dojo.instance;
    }
    getState() {
        return this.state;
    }
    setState(state) {
        this.state = state;
        this.tryAttachDojoToWindow();
    }
}
Dojo.instance = null;
export const dojo = Dojo.getInstance(undefined);
// React hook to subscribe to dojo state changes
export function useDojoState(initialState) {
    const [state, setState] = useState(initialState || {});
    useEffect(() => {
        dojo.state = state;
    }, [state]);
    useEffect(() => {
        dojo.setState = setState;
    }, []);
    return [state, setState];
}
