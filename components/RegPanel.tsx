import React from 'react';

interface RegParams {
  rSquared: number;
  adjRSquared: number;
  fStatistic: number;
  dwStat: number;
  beta: number;
  pValue: number;
}

interface RegPanelProps {
  params: RegParams;
}

export default function RegPanel({ params }: RegPanelProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 h-full flex flex-col justify-between shadow-sm">
      <div>
        <h3 className="text-base font-semibold text-slate-800 mb-1">OLS 滚动回归摘要</h3>
        <p className="text-xs text-slate-400 mb-4">因变量 (Y): 资产收益率 | 自变量 (X): 宏观流动性因子</p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="block text-[10px] text-slate-400 uppercase tracking-wider">R-squared</span>
            <span className="text-lg font-semibold font-mono text-amber-600">{params.rSquared.toFixed(4)}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Adj. R-squared</span>
            <span className="text-lg font-semibold font-mono text-slate-700">{params.adjRSquared.toFixed(4)}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="block text-[10px] text-slate-400 uppercase tracking-wider">F-statistic</span>
            <span className="text-lg font-semibold font-mono text-slate-700">{params.fStatistic.toFixed(2)}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="block text-[10px] text-slate-400 uppercase tracking-wider">Durbin-Watson</span>
            <span className="text-lg font-semibold font-mono text-slate-700">{params.dwStat.toFixed(2)}</span>
          </div>
        </div>

        <div className="border-t border-slate-200 pt-4">
          <span className="text-xs font-medium text-slate-500 block mb-2">估计系数 (Coefficients)</span>
          <div className="flex justify-between text-xs font-mono py-1.5 border-b border-slate-100">
            <span className="text-slate-500">β (流动性敏感度)</span>
            <span className="text-emerald-600 font-semibold">{params.beta.toFixed(4)}</span>
          </div>
          <div className="flex justify-between text-xs font-mono py-1.5">
            <span className="text-slate-500">P-Value (&gt;|t|)</span>
            <span className={`font-semibold ${params.pValue < 0.05 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {params.pValue < 0.05 ? '(显著)' : '(不显著)'}
            </span>
          </div>
        </div>
      </div>

      <div className="text-[11px] text-slate-400 italic mt-4 bg-slate-50 p-2 rounded-lg border border-slate-100">
        * 注：DW 统计量接近 2.0 表明残差无一阶自相关。
      </div>
    </div>
  );
}