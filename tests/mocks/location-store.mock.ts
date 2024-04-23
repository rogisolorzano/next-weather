import { LocationState, initialState } from "@/lib/store/location/location";

export const getLocationStoreMock = (
  overrides?: Partial<LocationState>,
): LocationState => ({
  ...initialState,
  addLocation: jest.fn(),
  clear: jest.fn(),
  ...overrides,
});
