import { create } from "zustand";
interface History {
  histories: string[];
  pushHistory: (history: string) => void;
  popHistory: () => void;
}
export const useHistory = create<History>((set) => ({
  histories: [],
  pushHistory: (history) =>
    set((state) => ({
      histories: [...state.histories, history],
    })),
  popHistory: () => {
    set((state) => ({
      histories: state.histories.slice(0, state.histories.length - 1),
    }));
  },
}));
