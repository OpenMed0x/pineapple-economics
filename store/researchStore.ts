"use client";

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { EnterpriseData } from '../types/enterprise';
import { IndustryData } from '../types/industry';
import { EconomistData } from '../types/economist';
import { RegionData } from '../types/region';
import { AssetData } from '../types/asset';
export type ResearchData = EnterpriseData | IndustryData | EconomistData | RegionData | AssetData;

export interface ResearchRecord {
  id: string;
  category: string;
  subItem?: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  data: ResearchData;  // ← union type
}

interface ResearchStore {
  records: ResearchRecord[];
  
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;

  addRecord: (r: ResearchRecord) => void;
  updateRecord: (id: string, r: Partial<ResearchRecord>) => void;
  deleteRecord: (id: string) => void;
  getById: (id: string) => ResearchRecord | undefined;
  search: (query: string) => ResearchRecord[];
}

export const useResearchStore = create<ResearchStore>()(
  persist(
    (set, get) => ({
      records: [],
      hasHydrated: false,
      setHasHydrated: (state) =>
      set({ hasHydrated: state }),
      addRecord: (r) => set(s => ({ records: [...s.records, r] })),
      updateRecord: (id, r) => set(s => ({
        records: s.records.map(rec =>
          rec.id === id
            ? { ...rec, ...r, updatedAt: new Date().toISOString() }
            : rec
        ),
      })),
      deleteRecord: (id) => set(s => ({
        records: s.records.filter(r => r.id !== id),
      })),
      getById: (id) => get().records.find(r => r.id === id),
      search: (query) => {
        if (!query.trim()) return [];
        const q = query.toLowerCase();
        return get().records.filter(r =>
          r.title.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q) ||
          (r.subItem?.toLowerCase().includes(q)) ||
          JSON.stringify(r.data).toLowerCase().includes(q)
        );
      },
    }),
    { name: 'pineapple-research',
      onRehydrateStorage: () => {
      return (state) => {
      state?.setHasHydrated(true);
    };
  }
  }
)
);