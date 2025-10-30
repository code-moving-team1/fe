// store/estimatesTabStore.ts
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type TabValue = "active" | "confirmed" | "expired";

type State = {
  tab: TabValue;
  setTab: (t: TabValue) => void;
  reset: () => void;
};

export const useEstimatesTabStore = create<State>()(
  persist(
    (set) => ({
      tab: "active",
      setTab: (tab) => set({ tab }),
      reset: () => set({ tab: "active" }),
    }),
    {
      name: "estimates-tab",
      // v5 방식: getStorage 대신 storage + createJSONStorage
      storage: createJSONStorage(() => sessionStorage),

      // 아래는 zustand v4방식
      // getStorage: () =>
      //   typeof window !== "undefined" ? sessionStorage : undefined,
    },
  ),
);
