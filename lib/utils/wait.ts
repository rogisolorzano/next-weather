import { Milliseconds } from "../time";

/**
 * Creates a promise that resolves in n milliseconds.
 */
export const wait = (ms: Milliseconds): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
