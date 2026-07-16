"use client";

import useSWR from 'swr';
import { EnterpriseData } from '../types/enterprise';
import { IndustryData } from '../types/industry';
import { EconomistData } from '../types/economist';
import { RegionData } from '../types/region';
import { AssetData } from '../types/asset';

export type ResearchData =
  | EnterpriseData
  | IndustryData
  | EconomistData
  | RegionData
  | AssetData;

export interface ResearchRecord {
  id: string;
  category: string;
  subItem?: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  data: ResearchData;
}

const fetcher = (url: string) =>
  fetch(url).then(async (res) => {
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error ?? '请求失败');
    }
    return res.json();
  });

// ── 列表 Hook：按 category / subItem 过滤，替代原来的 records/addRecord/deleteRecord ──
export function useResearchRecords(category?: string, subItem?: string) {
  const params = new URLSearchParams();
  if (category) params.set('category', category);
  if (subItem) params.set('subItem', subItem);

  const key = `/api/research${params.toString() ? `?${params}` : ''}`;
  const { data, error, isLoading, mutate } = useSWR<ResearchRecord[]>(key, fetcher);

  const addRecord = async (record: {
    category: string;
    subItem?: string;
    title: string;
    data: ResearchData;
  }): Promise<ResearchRecord> => {
    const res = await fetch('/api/research', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });
    if (!res.ok) throw new Error('添加失败');
    const newRecord: ResearchRecord = await res.json();
    mutate();
    return newRecord;
  };

  const deleteRecord = async (id: string) => {
    await fetch(`/api/research/${id}`, { method: 'DELETE' });
    mutate();
  };

  const updateRecord = async (id: string, patch: Partial<ResearchRecord>) => {
    await fetch(`/api/research/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    mutate();
  };

  return {
    records: data ?? [],
    isLoading,
    error,
    addRecord,
    deleteRecord,
    updateRecord,
    refresh: mutate,
  };
}

// ── 单条 Hook：详情页用，替代原来的 getById ──
export function useResearchRecord(id: string) {
  const { data, error, isLoading, mutate } = useSWR<ResearchRecord>(
    id ? `/api/research/${id}` : null,
    fetcher
  );

  const updateRecord = async (patch: Partial<ResearchRecord>) => {
    const res = await fetch(`/api/research/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(patch),
    });
    if (!res.ok) throw new Error('更新失败');
    const updated: ResearchRecord = await res.json();
    mutate(updated, false);
    return updated;
  };

  const deleteRecord = async () => {
    await fetch(`/api/research/${id}`, { method: 'DELETE' });
  };

  return {
    record: data,
    isLoading,
    error,
    updateRecord,
    deleteRecord,
  };
}

// ── 全域搜索 Hook：替代原来的 search() 方法 ──
export function useResearchSearch(query: string) {
  const { data, error, isLoading } = useSWR<ResearchRecord[]>(
    query.trim() ? `/api/research/search?q=${encodeURIComponent(query)}` : null,
    fetcher
  );

  return {
    results: data ?? [],
    isLoading,
    error,
  };
}