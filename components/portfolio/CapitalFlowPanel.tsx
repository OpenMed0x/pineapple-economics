"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';

const inputClass = "w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-300";
const labelClass = "text-xs font-medium text-slate-500 mb-1 block";

export default function CapitalFlowPanel({
  portfolioId, onClose, onSaved,
}: { portfolioId: string; onClose: () => void; onSaved: () => void }) {
  const [type, setType] = useState<'capital_in' | 'capital_out'>('capital_in');
  const [amount, setAmount] = useState('');
  const [tradeDate, setTradeDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!(Number(amount) > 0)) return;
    setSubmitting(true);

    const res = await fetch(`/api/portfolios/${portfolioId}/capital-flow`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ portfolio_id: portfolioId, type, amount: Number(amount), trade_date: tradeDate, note: note.trim() || undefined }),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(`操作失败：${err.error}`);
      setSubmitting(false);
      return;
    }

    onSaved();
  };

  return (
    <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">资金追加/抽出</h2>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg"><X size={16} /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setType('capital_in')}
              className={`px-3 py-2 rounded-xl text-sm border ${type === 'capital_in' ? 'bg-emerald-50 border-emerald-300 text-emerald-700' : 'border-slate-200 text-slate-500'}`}
            >
              追加资金
            </button>
            <button
              onClick={() => setType('capital_out')}
              className={`px-3 py-2 rounded-xl text-sm border ${type === 'capital_out' ? 'bg-rose-50 border-rose-300 text-rose-600' : 'border-slate-200 text-slate-500'}`}
            >
              抽出资金
            </button>
          </div>
          <div>
            <label className={labelClass}>金额 *</label>
            <input className={inputClass} type="number" value={amount} onChange={e => setAmount(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>日期</label>
            <input className={inputClass} type="date" value={tradeDate} onChange={e => setTradeDate(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>备注</label>
            <input className={inputClass} value={note} onChange={e => setNote(e.target.value)} />
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-100">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-500 hover:bg-slate-50 rounded-xl">取消</button>
          <button
            onClick={handleSubmit}
            disabled={submitting || !(Number(amount) > 0)}
            className="px-5 py-2 text-sm font-medium bg-amber-500 text-white rounded-xl hover:bg-amber-600 disabled:opacity-40"
          >
            {submitting ? '提交中...' : '确认'}
          </button>
        </div>
      </div>
    </div>
  );
}