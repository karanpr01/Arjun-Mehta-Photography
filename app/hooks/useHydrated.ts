import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// false while the server builds the page (and during the browser's first matching render),
// then true once the page is live in the browser.
export function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}