"use client";

import React, { useState } from 'react';
import type {
  CreatePortfolioInput,
  Portfolio,
  PortfolioPositioning,
  Benchmark,
} from '../../types/portfolio';
import { PRESET_POSITIONINGS } from '../../types/portfolio';

interface PortfolioFormProps {
  onSubmit: (data: CreatePortfolioInput) => void;
  onCancel: () => void;
  initialData?: Portfolio;
}

const BENCHMARK_OPTIONS: { value: Benchmark; label: string }[] = [
  { value: 'none',   label: '不设基准' },
  { value: 'sp500',  label: '标普500' },
  { value: 'csi300', label: '沪深300' },
  { value: 'nasdaq', label: '纳斯达克' },
  { value: 'gold',   label: '黄金' },
  { value: 'btc',    label: '比特币' },
];

const inputClass =
  "w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 " +
  "placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all " +
  "disabled:bg-slate-50 disabled:text-slate-400 disabled:cursor-not-allowed";

const labelClass = "text-xs font-medium text-slate-500 mb-1.5 block";

export default function PortfolioForm({ onSubmit, onCancel, initialData }: PortfolioFormProps) {
  const isEditing = Boolean(initialData);

  const initialIsPreset = initialData
    ? PRESET_POSITIONINGS.some(p => p.value === initialData.positioning)
    : true;

  const [name, setName] = useState(initialData?.name ?? '');
  const [positioning, setPositioning] = useState<PortfolioPositioning>(
    initialData?.positioning ?? 'defensive'
  );
  const [useCustom, setUseCustom] = useState(
    Boolean(initialData) && !initialIsPreset
  );
  const [initialCapital, setInitialCapital] = useState(
    initialData ? String(initialData.initial_capital) : ''
  );
  const [currency, setCurrency] = useState(initialData?.currency ?? 'USD');
  const [benchmark, setBenchmark] = useState<Benchmark>(initialData?.benchmark ?? 'none');
  const [thesis, setThesis] = useState(initialData?.thesis ?? '');
  const [targetReturn, setTargetReturn] = useState(
    initialData?.target_return != null ? String(initialData.target_return) : ''
  );
  const [maxDrawdown, setMaxDrawdown] = useState(
    initialData?.max_drawdown_tolerance != null ? String(initialData.max_drawdown_tolerance) : ''
  );
  const [maxSinglePosition, setMaxSinglePosition] = useState(
    initialData?.max_single_position_pct != null ? String(initialData.max_single_position_pct) : ''
  );
  const [maxSector, setMaxSector] = useState(
    initialData?.max_sector_pct != null ? String(initialData.max_sector_pct) : ''
  );
  const [stopLossRule, setStopLossRule] = useState(initialData?.stop_loss_rule ?? '');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const canSubmit =
    name.trim().length > 0 &&
    Number(initialCapital) > 0 &&
    positioning.trim().length > 0;

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    setErrorMsg('');

    const payload: CreatePortfolioInput = {
      name: name.trim(),
      positioning: positioning.trim(),
      initial_capital: Number(initialCapital),
      currency,
      benchmark,
      thesis: thesis.trim() || undefined,
      target_return: targetReturn ? Number(targetReturn) : undefined,
      max_drawdown_tolerance: maxDrawdown ? Number(maxDrawdown) : undefined,
      max_single_position_pct: maxSinglePosition ? Number(maxSinglePosition) : undefined,
      max_sector_pct: maxSector ? Number(maxSector) : undefined,
      stop_loss_rule: stopLossRule.trim() || undefined,
    };

    try {
      onSubmit(payload);
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : '提交失败');
      setSubmitting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
        <div>
          <label className={labelClass}>组合名称 *</label>
          <input
            className={inputClass}
            placeholder="例如：稳健100万组合"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>初始模拟资金 *</label>
            <input
              className={inputClass}
              type="number"
              placeholder="1000000"
              value={initialCapital}
              onChange={e => setInitialCapital(e.target.value)}
              disabled={isEditing}
            />
            {isEditing && (
              <p className="text-[11px] text-slate-400 mt-1">
                本金不可直接修改，请用组合详情页的"资金追加/抽出"功能
              </p>
            )}
          </div>
          <div>
            <label className={labelClass}>币种</label>
            <select
              className={inputClass}
              value={currency}
              onChange={e => setCurrency(e.target.value)}
              disabled={isEditing}
            >
              <option value="USD">USD 美元</option>
              <option value="CNY">CNY 人民币</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>组合定位 *</label>
          <div className="grid grid-cols-2 gap-2 mb-2">
            {PRESET_POSITIONINGS.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => { setPositioning(opt.value); setUseCustom(false); }}
                className={`px-3 py-2 rounded-xl text-sm border transition-all ${
                  !useCustom && positioning === opt.value
                    ? 'bg-amber-50 border-amber-300 text-amber-700 font-medium'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => { setUseCustom(true); setPositioning(''); }}
            className={`w-full px-3 py-2 rounded-xl text-sm border transition-all mb-2 ${
              useCustom
                ? 'bg-amber-50 border-amber-300 text-amber-700 font-medium'
                : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
            }`}
          >
            自定义
          </button>

          {useCustom && (
            <input
              className={inputClass}
              placeholder="输入自定义的组合定位，例如：杠铃策略"
              value={positioning}
              onChange={e => setPositioning(e.target.value)}
            />
          )}
        </div>

        <div>
          <label className={labelClass}>对比基准</label>
          <select
            className={inputClass}
            value={benchmark}
            onChange={e => setBenchmark(e.target.value as Benchmark)}
          >
            {BENCHMARK_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>成立逻辑</label>
          <textarea
            className={inputClass}
            rows={3}
            placeholder="这个组合为什么存在，配置思路是什么..."
            value={thesis}
            onChange={e => setThesis(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>目标收益率 %</label>
            <input
              className={inputClass}
              type="number"
              placeholder="8"
              value={targetReturn}
              onChange={e => setTargetReturn(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>可承受最大回撤 %</label>
            <input
              className={inputClass}
              type="number"
              placeholder="20"
              value={maxDrawdown}
              onChange={e => setMaxDrawdown(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>最大单标的仓位 %</label>
            <input
              className={inputClass}
              type="number"
              placeholder="15"
              value={maxSinglePosition}
              onChange={e => setMaxSinglePosition(e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass}>最大行业仓位 %</label>
            <input
              className={inputClass}
              type="number"
              placeholder="30"
              value={maxSector}
              onChange={e => setMaxSector(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>止损规则</label>
          <textarea
            className={inputClass}
            rows={2}
            placeholder="例如：单标的浮亏超过15%强制止损"
            value={stopLossRule}
            onChange={e => setStopLossRule(e.target.value)}
          />
        </div>

        {errorMsg && <p className="text-xs text-rose-500">{errorMsg}</p>}
      </div>

      <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 shrink-0">
        <button
          onClick={onCancel}
          className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all"
        >
          取消
        </button>
        <button
          onClick={handleSubmit}
          disabled={!canSubmit || submitting}
          className="px-5 py-2 text-sm font-medium bg-amber-500 text-white rounded-xl hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {submitting ? (isEditing ? '保存中...' : '创建中...') : (isEditing ? '保存修改' : '确认添加')}
        </button>
      </div>
    </div>
  );
}