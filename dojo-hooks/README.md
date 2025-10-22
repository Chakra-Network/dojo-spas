# dojo-hooks

Hooks for dojo app developers.

## Overview

- `useDojoState`: React hook to centralize state management for dojo apps

## Installation

Add `dojo-hooks` to your project's dependencies.

```json
{
  "dependencies": {
    "dojo-hooks": "file:../../../dojo-hooks"
  }
}
```

## Usage

```tsx
import { useDojoState } from "dojo-hooks";

const [state, setState] = useDojoState();
```
