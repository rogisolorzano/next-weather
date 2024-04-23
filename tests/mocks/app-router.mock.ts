import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const getAppRouterMock = (): AppRouterInstance =>
  ({ push: jest.fn() }) as unknown as AppRouterInstance;
