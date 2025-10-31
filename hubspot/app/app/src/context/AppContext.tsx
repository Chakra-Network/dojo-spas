import { createContext, useContext } from 'react';
import type { AppState } from '../lib/types';

// Define the shape of our context data
type AppContextType = {
  state: AppState;
  setState: (value: AppState | ((prevState: AppState) => AppState)) => void;
};

// Create the context with a default value (it will be overridden by the provider)
export const AppContext = createContext<AppContextType | undefined>(undefined);

// Create a custom hook for easy consumption of the context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}