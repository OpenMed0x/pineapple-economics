"use client";

import React, { useState } from 'react';
import { DepositData, DepositRateItem } from '../../types/asset';

interface Props {
  data: DepositData;
  onChange: (d: DepositData) => void;
}

const COUNTRY_TABS = [
  { id: 'us',        label: '🇺🇸 美国' },
  { id: 'china',     label: '🇨🇳 中国' },
  { id: 'eurozone',  label: '🇪🇺 欧元区' },
  { id: 'japan',     label: '🇯🇵 日本' },
  { id: 'uk',        label: '🇬🇧 英国' },
  { id: 'singapore', label: '🇸🇬 新加坡' },
  { id: 'hongkong',  label: '🇭🇰 香港' },
  { id: 'australia', label: '🇦🇺 澳大利亚' },
  { id: 'macro',     label: '📊 宏观对比' },
];

const F = ({ label, value, onChange, placeholder, hint }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; hint?: string;
}) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      <label className="text-xs font-medium text-slate-500">{label}</label>
      {hint && <span className="text-[10px] text-slate-300 font-mono">{hint}</span>}
    </div>
    <input type="text" value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder ?? `输入${label}...`}
      className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 focus:bg-white transition-all placeholder:text-slate-300" />
  </div>
);

const FM = ({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-slate-500">{label}</label>
    <textarea value={value} onChange={e => onChange(e.target.value)} rows={2}
      placeholder={placeholder}
      className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 focus:bg-white transition-all resize-none placeholder:text-slate-300" />
  </div>
);

const G2 = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-2 gap-3">{children}</div>
);

const SL = ({ text }: { text: string }) => (
  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-3 pb-1 border-b border-slate-100">
    {text}
  </p>
);

function RateBlock({
  label, value, onChange, extra,
}: {
  label: string;
  value?: DepositRateItem;
  onChange: (v: DepositRateItem) => void;
  extra?: React.ReactNode;
}) {
  const v = value ?? {};
  const u = (key: keyof DepositRateItem) => (val: string) =>
    onChange({ ...v, [key]: val });

  return (
    <div className="space-y-3">
      <SL text={`${label} 存款利率`} />
      <G2>
        <F label="活期利率" value={v.demand ?? ''} onChange={u('demand')}
          placeholder="e.g. 0.5%" hint="年化" />
        <F label="3个月定期" value={v.fixed3m ?? ''} onChange={u('fixed3m')}
          placeholder="e.g. 4.8%" />
        <F label="6个月定期" value={v.fixed6m ?? ''} onChange={u('fixed6m')} />
        <F label="1年定期" value={v.fixed1y ?? ''} onChange={u('fixed1y')} />
        <F label="3年定期" value={v.fixed3y ?? ''} onChange={u('fixed3y')} />
        <F label="5年定期" value={v.fixed5y ?? ''} onChange={u('fixed5y')} />
        <F label="货币基金收益率" value={v.mmf ?? ''} onChange={u('mmf')}
          hint="MMF/余额宝" />
      </G2>
      {extra}
      <FM label="备注" value={v.notes ?? ''} onChange={u('notes')} />
    </div>
  );
}

export default function DepositForm({ data, onChange }: Props) {
  const [tab, setTab] = useState('us');

  const set = <K extends keyof DepositData>(key: K) =>
    (val: DepositData[K]) => onChange({ ...data, [key]: val });

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-1 flex-wrap px-1 py-2 border-b border-slate-100 bg-slate-50/50 shrink-0">
        {COUNTRY_TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap
              ${tab === t.id ? 'bg-amber-500 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {tab === 'us' && (
          <RateBlock label="美国"
            value={data.us} onChange={set('us')}
            extra={
              <div className="space-y-3 pt-2">
                <SL text="美国货币市场工具" />
                <G2>
                  <F label="联邦基金利率" value={data.fedFundsRate ?? ''} onChange={v => onChange({ ...data, fedFundsRate: v })} placeholder="e.g. 5.25-5.50%" />
                  <F label="3M 国债收益率" value={data.usTBill3m ?? ''} onChange={v => onChange({ ...data, usTBill3m: v })} hint="无风险利率基准" />
                  <F label="SOFR 隔夜利率" value={data.sofrRate ?? ''} onChange={v => onChange({ ...data, sofrRate: v })} hint="替代LIBOR" />
                </G2>
              </div>
            }
          />
        )}

        {tab === 'china' && (
          <RateBlock label="中国"
            value={data.china} onChange={set('china')}
            extra={
              <div className="space-y-3 pt-2">
                <SL text="中国货币政策利率" />
                <G2>
                  <F label="LPR 1年期" value={data.chinaLpr1y ?? ''} onChange={v => onChange({ ...data, chinaLpr1y: v })} placeholder="e.g. 3.45%" />
                  <F label="LPR 5年期" value={data.chinaLpr5y ?? ''} onChange={v => onChange({ ...data, chinaLpr5y: v })} hint="房贷基准" />
                  <F label="MLF 利率" value={data.chinaMLF ?? ''} onChange={v => onChange({ ...data, chinaMLF: v })} hint="中期借贷便利" />
                  <F label="存款准备金率" value={data.chinaRRR ?? ''} onChange={v => onChange({ ...data, chinaRRR: v })} hint="大行/中小行" />
                </G2>
              </div>
            }
          />
        )}

        {tab === 'eurozone' && (
          <RateBlock label="欧元区" value={data.eurozone} onChange={set('eurozone')} />
        )}

        {tab === 'japan' && (
          <RateBlock label="日本" value={data.japan} onChange={set('japan')} />
        )}

        {tab === 'uk' && (
          <RateBlock label="英国" value={data.uk} onChange={set('uk')} />
        )}

        {tab === 'singapore' && (
          <RateBlock label="新加坡" value={data.singapore} onChange={set('singapore')} />
        )}

        {tab === 'hongkong' && (
          <RateBlock label="香港" value={data.hongkong} onChange={set('hongkong')} />
        )}

        {tab === 'australia' && (
          <RateBlock label="澳大利亚" value={data.australia} onChange={set('australia')} />
        )}

        {tab === 'macro' && (
          <div className="space-y-4">
            <SL text="全球宏观对比" />
            <FM label="全球央行政策方向" value={data.globalCentralBankPolicy ?? ''} onChange={v => onChange({ ...data, globalCentralBankPolicy: v })}
              placeholder="Fed降息预期、ECB鸽派、BOJ正常化..." />
            <F label="加息/降息周期位置" value={data.rateHikeCycle ?? ''} onChange={v => onChange({ ...data, rateHikeCycle: v })}
              placeholder="e.g. 美国降息周期初期" />
            <FM label="通胀展望" value={data.inflationOutlook ?? ''} onChange={v => onChange({ ...data, inflationOutlook: v })} />
            <FM label="外币存款汇率风险" value={data.currencyRisk ?? ''} onChange={v => onChange({ ...data, currencyRisk: v })}
              placeholder="持有外币存款的汇率风险分析..." />
            <SL text="存款 vs 其他资产（机会成本）" />
            <FM label="实际收益率（存款 vs 通胀）" value={data.yieldVsInflation ?? ''} onChange={v => onChange({ ...data, yieldVsInflation: v })}
              placeholder="e.g. 美国CPI 3.2% vs 存款4.8% = 实际+1.6%" />
            <FM label="存款 vs 10Y国债" value={data.yieldVsBond10y ?? ''} onChange={v => onChange({ ...data, yieldVsBond10y: v })}
              placeholder="利差对比，判断久期风险是否值得承担..." />
            <FM label="存款 vs 股票股息率" value={data.yieldVsEquity ?? ''} onChange={v => onChange({ ...data, yieldVsEquity: v })} />
            <FM label="存款 vs 租金收益率" value={data.yieldVsREYield ?? ''} onChange={v => onChange({ ...data, yieldVsREYield: v })} />
            <FM label="机会成本综合分析" value={data.opportunityCost ?? ''} onChange={v => onChange({ ...data, opportunityCost: v })}
              placeholder="当前利率环境下，存款vs其他大类资产的配置逻辑..." />
            <FM label="整体展望" value={data.overallOutlook ?? ''} onChange={v => onChange({ ...data, overallOutlook: v })} />
            <FM label="分析师笔记" value={data.analystNotes ?? ''} onChange={v => onChange({ ...data, analystNotes: v })} />
          </div>
        )}

      </div>
    </div>
  );
}