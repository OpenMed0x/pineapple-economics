"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { AssetClass, ValuationMethod, CreatePositionInput } from '../../types/portfolio';

const ASSET_CLASS_OPTIONS: { value: AssetClass; label: string }[] = [
  { value: 'equity', label: '股票' }, { value: 'crypto', label: '加密货币' },
  { value: 'real_estate', label: '房产' }, { value: 'private_equity', label: '初创股权' },
  { value: 'bond', label: '债券' }, { value: 'cash_idle', label: '账面闲置' },
  { value: 'cash_savings', label: '储蓄' }, { value: 'money_market_fund', label: '货币基金' },
  { value: 'bond_fund', label: '债券基金' }, { value: 'other', label: '其他' },
];

const inputClass = "w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-300";
const labelClass = "text-xs font-medium text-slate-500 mb-1 block";

export default function PositionPanel({
  portfolioId, onClose, onSaved,
}: { portfolioId: string; onClose: () => void; onSaved: () => void }) {
  const [symbol, setSymbol] = useState('');
  const [assetClass, setAssetClass] = useState<AssetClass>('equity');
  const [valuationMethod, setValuationMethod] = useState<ValuationMethod>('manual');
  const [region, setRegion] = useState('');
  const [sector, setSector] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [tradeDate, setTradeDate] = useState(new Date().toISOString().slice(0, 10));
  const [targetPrice, setTargetPrice] = useState('');
  const [stopLossPrice, setStopLossPrice] = useState('');
  const [entryThesis, setEntryThesis] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isCashType = ['cash_idle', 'cash_savings', 'money_market_fund', 'bond_fund'].includes(assetClass);
  const canSubmit = symbol.trim() && Number(quantity) > 0 && Number(price) > 0;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);

    const payload: CreatePositionInput = {
      portfolio_id: portfolioId,
      symbol: symbol.trim(),
      asset_class: assetClass,
      valuation_method: isCashType ? 'manual' : valuationMethod,
      region: region.trim() || undefined,
      sector: sector.trim() || undefined,
      entry_thesis: entryThesis.trim() || undefined,
      target_price: targetPrice ? Number(targetPrice) : undefined,
      stop_loss_price: stopLossPrice ? Number(stopLossPrice) : undefined,
      annual_rate: annualRate ? Number(annualRate) : undefined,
      initial_quantity: Number(quantity),
      initial_price: Number(price),
      trade_date: tradeDate,
    };

    const res = await fetch(`/api/portfolios/${portfolioId}/positions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      alert(`创建失败：${err.error}`);
      setSubmitting(false);
      return;
    }

    onSaved();
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/10 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 z-50 w-[520px] h-screen bg-white border-l border-slate-200 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <h2 className="text-base font-semibold text-slate-900">新建持仓</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
          <div>
            <label className={labelClass}>标的名称 *</label>
            <input className={inputClass} placeholder="例如 AAPL / BTC / 某地产项目" value={symbol} onChange={e => setSymbol(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>资产类别</label>
              <select className={inputClass} value={assetClass} onChange={e => setAssetClass(e.target.value as AssetClass)}>
                {ASSET_CLASS_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
            {!isCashType && (
              <div>
                <label className={labelClass}>估值方式</label>
                <select className={inputClass} value={valuationMethod} onChange={e => setValuationMethod(e.target.value as ValuationMethod)}>
                  <option value="manual">手动估值</option>
                  <option value="api_auto">自动拉取API</option>
                </select>
              </div>
            )}
            {isCashType && (
              <div>
                <label className={labelClass}>年化利率/通胀率 %</label>
                <input className={inputClass} type="number" placeholder="3" value={annualRate} onChange={e => setAnnualRate(e.target.value)} />
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>{isCashType ? '金额' : '买入数量'} *</label>
              <input className={inputClass} type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>{isCashType ? '单位净值（填1即可）' : '买入价格'} *</label>
              <input className={inputClass} type="number" value={price} onChange={e => setPrice(e.target.value)} />
            </div>
          </div>

          <div>
            <label className={labelClass}>建仓日期</label>
            <input className={inputClass} type="date" value={tradeDate} onChange={e => setTradeDate(e.target.value)} />
          </div>

          {!isCashType && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>所属地区</label>
                  <input className={inputClass} value={region} onChange={e => setRegion(e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>所属行业</label>
                  <input className={inputClass} value={sector} onChange={e => setSector(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>目标价位（止盈）</label>
                  <input className={inputClass} type="number" value={targetPrice} onChange={e => setTargetPrice(e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>止损价位</label>
                  <input className={inputClass} type="number" value={stopLossPrice} onChange={e => setStopLossPrice(e.target.value)} />
                </div>
              </div>

              <div>
                <label className={labelClass}>入场逻辑</label>
                <textarea className={inputClass} rows={4} placeholder="宏观理由/行业逻辑/参考的经济学家观点/基本面判断..." value={entryThesis} onChange={e => setEntryThesis(e.target.value)} />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-100">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-500 hover:bg-slate-50 rounded-xl">取消</button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || submitting}
            className="px-5 py-2 text-sm font-medium bg-amber-500 text-white rounded-xl hover:bg-amber-600 disabled:opacity-40"
          >
            {submitting ? '创建中...' : '确认添加'}
          </button>
        </div>
      </div>
    </>
  );
}