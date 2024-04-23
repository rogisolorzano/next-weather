import { jest } from "@jest/globals";

export function mocked<T extends object>(module: T): jest.Mocked<T> {
  return module as jest.Mocked<T>;
}
