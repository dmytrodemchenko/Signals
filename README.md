# signals

Zero-dependency reactive signals for TypeScript and JavaScript, with an API and mental model similar to Angular Signals: writable signals, computed values, effects, batching, and dependency tracking with lazy recomputation.

## Install

```bash
npm install signals
```

If you publish under a different package name, update the install command accordingly.

## Features

- Small core API: `signal`, `computed`, `effect`, `batch`, `untracked`
- Extra primitives: `linkedSignal`, `resource`
- No runtime dependencies
- Typed public API with generated `.d.ts` files

## Usage

```ts
import { signal, computed, effect, batch } from "signals";

const count = signal(0);
const doubled = computed(() => count() * 2);

const stop = effect(() => {
  console.log("count:", count(), "doubled:", doubled());
});

batch(() => {
  count.set(1);
  count.update((value) => value + 1);
});

stop();
```

### `linkedSignal`

```ts
import { signal, linkedSignal } from "signals";

const items = signal(["a", "b", "c"]);

const selection = linkedSignal<string[], string>({
  source: () => items(),
  computation: (nextItems, previous) => {
    if (previous && nextItems.includes(previous.value)) {
      return previous.value;
    }
    return nextItems[0];
  },
});
```

### `resource`

```ts
import { signal, resource } from "signals";

const userId = signal(1);

const user = resource({
  request: () => userId(),
  loader: async ({ request, abortSignal }) => {
    const response = await fetch(`https://example.com/users/${request}`, {
      signal: abortSignal,
    });
    return response.json();
  },
});
```

## API

The package exports:

- `signal`
- `computed`
- `effect`
- `batch`
- `untracked`
- `isSignal`
- `linkedSignal`
- `resource`

## Development

```bash
npm install
npm run check
npm run build
```

## Publishing

```bash
npm publish
```

Before publishing, confirm the package name in `package.json` is the one you want and is available on npm.
