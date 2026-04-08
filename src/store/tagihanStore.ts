// src/store/tagihanStore.ts
import { create } from "zustand";

export type DetailTagihanItem = {
  id: string;
  no_tagihan: string;
  no_invoice: string;
  tagihan_name: string;
  total: string;
  expire_at: string;
  nominal: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
  master_tagihan?: { nama?: string };
};

export const useTagihanStore = create((set) => ({
  selectedTagihan: [],
  setSelectedTagihan: (data: any[]) => set({ selectedTagihan: data }),
  // Untuk menyimpan detail item yang diklik
  detailItem: null as DetailTagihanItem | null,
  setDetailItem: (item: DetailTagihanItem | null) => set({ detailItem: item }),
}));
