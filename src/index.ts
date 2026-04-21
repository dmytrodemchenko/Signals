/**
 * Sigil — zero-dependency reactive Signals for JavaScript.
 *
 * Public entry point. Re-exports the full public API.
 */

export {
  signal,
  computed,
  effect,
  batch,
  untracked,
  isSignal,
  type ReadSignal,
  type WriteSignal,
} from "./signals";

export { linkedSignal, type LinkedSignal, type LinkedSignalOptions } from "./linked-signal";

export {
  resource,
  type Resource,
  type ResourceOptions,
  type ResourceStatus,
  type ResourceLoaderParams,
} from "./resource";
