// store/estimateStore.ts
import { create } from "zustand";

interface EstimateState {
  date: string | null;
  departure: string | null;
  departureRegion: string | null;
  destination: string | null;
  destinationRegion: string | null;
  moveType: string | null;
  hasActiveEstimate: boolean;
  setDate: (date: string) => void;
  setDeparture: (departure: string, region: string) => void;
  setDestination: (destination: string, region: string) => void;
  setMoveType: (type: string) => void;
  setHasActiveEstimate: (value: boolean) => void;
}

export const useEstimateStore = create<EstimateState>((set) => ({
  date: null,
  departure: null,
  departureRegion: null,
  destination: null,
  destinationRegion: null,
  moveType: null,
  hasActiveEstimate: false,
  setDate: (date) => set({ date }),
  setDeparture: (departure, region) =>
    set({ departure, departureRegion: region }),
  setDestination: (destination, region) =>
    set({ destination, destinationRegion: region }),
  setMoveType: (type) => set({ moveType: type }),
  setHasActiveEstimate: (value) => set({ hasActiveEstimate: value }),
}));
