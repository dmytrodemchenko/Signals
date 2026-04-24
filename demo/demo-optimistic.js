import { effect, optimistic, signal } from "../dist/index.js";
import { sleep } from "./utils.js";

export function initOptimisticDemo() {
  const optimisticServer = document.querySelector("#optimistic-server");
  const optimisticOverlayValue = document.querySelector("#optimistic-overlay");
  const optimisticPending = document.querySelector("#optimistic-pending");
  const optimisticConsole = document.querySelector("#optimistic-console");

  if (!optimisticServer || !optimisticOverlayValue || !optimisticPending || !optimisticConsole) return;

  const serverLikes = signal(42);
  const optimisticLikes = optimistic(serverLikes);
  const optimisticFeed = signal([
    "Ready. Queue an optimistic like, then let it commit or roll back.",
  ]);

  function pushOptimisticEvent(message) {
    optimisticFeed.update((entries) => [message, ...entries].slice(0, 8));
  }

  function scheduleOptimisticLike({ fail = false } = {}) {
    const tx = optimisticLikes.apply((value) => value + 1);
    pushOptimisticEvent(`tx#${tx.id}: queued +1 locally`);

    sleep(fail ? 1300 : 900).then(() => {
      if (fail) {
        tx.rollback();
        pushOptimisticEvent(`tx#${tx.id}: server rejected, rolled back`);
        return;
      }

      tx.commit((value) => value + 1);
      pushOptimisticEvent(`tx#${tx.id}: server committed +1 to base`);
    });
  }

  effect(() => {
    optimisticServer.textContent = String(serverLikes());
    optimisticOverlayValue.textContent = String(optimisticLikes());
    optimisticPending.textContent = String(optimisticLikes.pendingCount());
    optimisticConsole.textContent =
      `hasPending() = ${optimisticLikes.hasPending()}\n\n` +
      optimisticFeed().join("\n");
  });

  document.querySelector("#optimistic-like")?.addEventListener("click", () => {
    scheduleOptimisticLike();
  });

  document.querySelector("#optimistic-fail")?.addEventListener("click", () => {
    scheduleOptimisticLike({ fail: true });
  });

  document.querySelector("#optimistic-sync")?.addEventListener("click", () => {
    serverLikes.update((value) => value + 5);
    pushOptimisticEvent("server sync: base updated by +5");
  });
}
