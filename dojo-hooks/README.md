# Chakra Dojo Hooks

[![npm version](https://badge.fury.io/js/@chakra-dev%2Fdojo-hooks.svg)](https://badge.fury.io/js/@chakra-dev%2Fdojo-hooks)  
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/Chakra-Network/dojo-spas/blob/main/dojo-hooks/LICENSE)  

React hooks for dojo app state management.

## Installation

```bash
npm install @chakra-dev/dojo-hooks
```

## Overview

- `useDojoState`: React hook to centralize state management for dojo apps
- `dojo`: Global singleton instance for cross-component state sharing

## Usage

### Basic State Management

```tsx
import { useDojoState } from "@chakra-dev/dojo-hooks";

function MyComponent() {
  const [state, setState] = useDojoState({ count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => setState({ count: state.count + 1 })}>
        Increment
      </button>
    </div>
  );
}
```

### Global State Access

```tsx
import { dojo } from "@chakra-dev/dojo-hooks";

// Access state from anywhere in your app
console.log(dojo.getState());

// Update state globally
dojo.setState({ user: { name: "John" } });
```

### TypeScript Support

```tsx
interface AppState {
  user: { name: string; email: string };
  settings: { theme: "light" | "dark" };
}

const [state, setState] = useDojoState<AppState>({
  user: { name: "", email: "" },
  settings: { theme: "light" }
});
```

## API Reference

### `useDojoState<T>(initialState?: T)`

Returns a stateful value and a function to update it, similar to React's `useState`.

- **Parameters**: 
  - `initialState` (optional): Initial state value
- **Returns**: `[state, setState]` tuple

### `dojo`

Global singleton instance providing:
- `getState()`: Get current state
- `setState(state)`: Update state globally

## Development

1. **Clone**  
   ```bash
   git clone https://github.com/Chakra-Network/dojo-spas.git
   cd dojo-spas/dojo-hooks
   ```

2. **Install**  
   ```bash
   npm install
   ```

3. **Build**  
   ```bash
   npm run build
   ```

4. **Publish**  
   - Bump version in `package.json`  
   - `npm publish --access public`

---

## License

MIT @ Chakra Labs
