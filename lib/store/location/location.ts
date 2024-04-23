import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Location } from "./types";

export const initialState = {
  locations: [],
};

export type LocationState = {
  locations: Location[];
  addLocation: (location: Location) => void;
  clear: () => void;
};

export const useLocationStore = create<LocationState>()(
  persist(
    (set) => ({
      ...initialState,
      addLocation: (location: Location) =>
        set((state) => {
          const alreadyHasLocation = state.locations.find(
            (existingLocation) => existingLocation.name === location.name,
          );
          if (alreadyHasLocation) {
            return state;
          }
          return { locations: [...state.locations, location] };
        }),
      clear: () => set(() => initialState),
    }),
    {
      name: "location-store-persist",
    },
  ),
);
