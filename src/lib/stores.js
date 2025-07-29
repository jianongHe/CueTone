import { writable } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * A writable store that synchronizes with localStorage.
 * @param {string} key - The key to use in localStorage.
 * @param {any} startValue - The initial value of the store if nothing is in localStorage.
 */
export function persistent(key, startValue) {
  const storedValue = browser ? localStorage.getItem(key) : null;
  const store = writable(storedValue ? JSON.parse(storedValue) : startValue);

  if (browser) {
    store.subscribe(value => {
      localStorage.setItem(key, JSON.stringify(value));
    });
  }

  return store;
}
