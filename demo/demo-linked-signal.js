import { effect, linkedSignal, signal } from "../dist/index.js";

export function initLinkedSignalDemo() {
  const linkedConsole = document.querySelector("#linked-console");
  if (!linkedConsole) return;

  const base = signal(100);
  const draft = linkedSignal(() => base());

  effect(() => {
    linkedConsole.textContent = `base() = ${base()}\ndraft() = ${draft()}`;
  });

  document.querySelector("#draft-up")?.addEventListener("click", () => {
    draft.update((value) => value + 1);
  });

  document.querySelector("#base-up")?.addEventListener("click", () => {
    base.update((value) => value + 100);
  });
}
