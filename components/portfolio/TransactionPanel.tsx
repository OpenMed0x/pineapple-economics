"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Position, RationaleCategory } from '../../types/portfolio';

const RATIONALE_OPTIONS: { value: RationaleCategory; label: string }[] = [
  { value: 'macro_shift', label: '宏观变化' }, { value: 'earnings', label: '财报变动' },
  { value: 'policy_change', label: '政策变动' }, { value: 'thesis_update', label: '观点更新' },
  { value: 'other', label: '其他' },
];

const TYPE_LABEL: Record<string, string> = { add: '加仓', reduce: '减仓', close: '清仓' };

const inputClass = "w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-300";
const labelClass = "text-xs font-medium text-slate-500 mb-1 block";

export default function TransactionPanel({
  portfolioId, position, type, onClose, onSaved,
}: {
  portfolioId: string;
  position: Position;
  type: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const isClose = type === 'close';
  const [quantity, setQuantity] = useState(isClose ? String(position.quantity) : '');
  const [price, setPrice] = useState(position.current_price ? String(position.current_price) : '');
  const [tradeDate, setTradeDate] = useState(new Date().toISOString().slice(0, 10));
  const [rationaleCategory, setRationaleCategory] = useState<RationaleCategory>('thesis_update');
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = Number(price) > 0 && (isClose || Number(quantity) > 0);

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);

    const res = await fetch(`/api/portfolios/${portfolioId}/positions/${position.id}/transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type,
        trade_date: tradeDate,
        quantity: isClose ? undefined : Number(quantity),
        price: Number(price),
        rationale_category: rationaleCategory,
        rationale_note: note.trim() || undefined,
      }),
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
    <>
      <div className="fixed inset-0 bg-black/20 z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="text-base font-semibold text-slate-900">
              {TYPE_LABEL[type]} · {position.symbol}
            </h2>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg">
              <X size={16} />
            </button>
          </div>

          <div className="px-6 py-5 space-y-4">
            {!isClose && (
              <div>
                <label className={labelClass}>变动数量 *</label>
                <input className={inputClass} type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
                {type === 'reduce' && <p className="text-[11px] text-slate-400 mt-1">当前持仓 {position.quantity}</p>}
              </div>
            )}

            <div>
              <label className={labelClass}>{isClose ? '清仓价格' : '成交价格'} *</label>
              <input className={inputClass} type="number" value={price} onChange={e => setPrice(e.target.value)} />
            </div>

            <div>
              <label className={labelClass}>操作日期</label>
              <input className={inputClass} type="date" value={tradeDate} onChange={e => setTradeDate(e.target.value)} />
            </div>

            <div>
              <label className={labelClass}>操作依据</label>
              <select className={inputClass} value={rationaleCategory} onChange={e => setRationaleCategory(e.target.value as RationaleCategory)}>
                {RATIONALE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            <div>
              <label className={labelClass}>{isClose ? '退出逻辑' : '补充说明'}</label>
              <textarea
                className={inputClass}
                rows={3}
                placeholder={isClose ? '为什么退出：按计划止盈/止损，还是判断改变了...' : ''}
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-100">
            <button onClick={onClose} className="px-4 py-2 text-sm text-slate-500 hover:bg-slate-50 rounded-xl">取消</button>
            <button
              onClick={handleSubmit}
              disabled={!canSubmit || submitting}
              className="px-5 py-2 text-sm font-medium bg-amber-500 text-white rounded-xl hover:bg-amber-600 disabled:opacity-40"
            >
              {submitting ? '提交中...' : '确认' + TYPE_LABEL[type]}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}