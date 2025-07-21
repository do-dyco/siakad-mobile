// src/store/tagihanStore.ts
import { create } from "zustand";

export const useTagihanStore = create((set) => ({
  selectedTagihan: [],
  setSelectedTagihan: (data: any[]) => set({ selectedTagihan: data }),
}));
