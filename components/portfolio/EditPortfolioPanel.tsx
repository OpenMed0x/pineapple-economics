"use client";

import React from 'react';
import { X } from 'lucide-react';
import PortfolioForm from './PortfolioForm';
import type { Portfolio, CreatePortfolioInput } from '../../types/portfolio';

export default function EditPortfolioPanel({
  portfolio, onClose, onSaved,
}: {
  portfolio: Portfolio;
  onClose: () => void;
  onSaved: () => void;
}) {
  const handleSubmit = async (data: CreatePortfolioInput) => {
    const res = await fetch(`/api/portfolios/${portfolio.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      alert(`保存失败：${err.error ?? '未知错误'}`);
      return;
    }
    onSaved();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/10 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 z-50 w-[600px] h-screen bg-white border-l border-slate-200 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-base font-semibold text-slate-900">编辑 · {portfolio.name}</h2>
            <p className="text-xs text-slate-400 mt-0.5">投资组合决策</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
          >
            <X size={18} />
          </button>
        </div>
        <PortfolioForm onSubmit={handleSubmit} onCancel={onClose} initialData={portfolio} />
      </div>
    </>
  );
}