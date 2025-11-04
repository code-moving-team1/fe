import { create } from "zustand";

export type SortBy = "reviews" | "rating" | "quotes";

type State = {
  q: string;
  region: string | null;
  service: string | null; // UI 서비스 코드
  sort: SortBy;
  page: number;
};

type Actions = {
  setQ: (v: string) => void;
  setRegion: (v: string | null) => void;
  setService: (v: string | null) => void;
  setSort: (v: SortBy) => void;
  setPage: (v: number) => void;
  reset: () => void;
};

export const useMoverSearchStore = create<State & Actions>((set) => ({
  q: "",
  region: null,
  service: null,
  sort: "reviews",
  page: 1,

  setQ: (v) => set({ q: v, page: 1 }),
  setRegion: (v) => set({ region: v, page: 1 }),
  setService: (v) => set({ service: v, page: 1 }),
  setSort: (v) => set({ sort: v, page: 1 }),
  setPage: (v) => set({ page: v }),
  reset: () =>
    set({ q: "", region: null, service: null, sort: "reviews", page: 1 }),
}));
