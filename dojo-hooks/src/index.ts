declare global {
  interface Window {
    dojo: Dojo<any>;
  }
}

import { useEffect, useState } from "react";

class Dojo<T> {
  private static instance: Dojo<any> | null = null;
  public state: T;

  private constructor(state: T) {
    this.state = state;
    this.tryAttachDojoToWindow();
  }

  private tryAttachDojoToWindow() {
    if (typeof window !== "undefined" && !window.dojo) {
      window.dojo = this;
    }
  }

  static getInstance<T>(initialState?: T): Dojo<T> {
    if (!Dojo.instance) {
      Dojo.instance = new Dojo(initialState || ({} as T));
    }
    return Dojo.instance as Dojo<T>;
  }

  getState(): T {
    return this.state;
  }

  setState(state: T): void {
    this.state = state;
    this.tryAttachDojoToWindow();
  }
}

export const dojo = Dojo.getInstance<any>(undefined);

// React hook to subscribe to dojo state changes
export function useDojoState<T>(
  initialState?: T
): [T, (state: T extends any ? T | ((state: T) => T) : never) => void] {
  const [state, setState] = useState<T>(initialState || ({} as T));

  useEffect(() => {
    dojo.state = state;
  }, [state]);

  useEffect(() => {
    dojo.setState = setState;
  }, []);

  return [state, setState];
}
