"use client";

import React, { useState } from 'react';
import { FxData, FxPairData, FxMacro, TrendDirection, SignalStrength } from '../../types/asset';

interface FxFormProps {
  data: FxData;
  onChange: (d: FxData) => void;
}

const SIGNAL_OPTIONS: { value: SignalStrength; label: string; color: string }[] = [
  { value: 'strong_buy',  label: '强烈看多', color: 'bg-emerald-500 text-white border-emerald-500' },
  { value: 'buy',         label: '偏多',     color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'neutral',     label: '中性',     color: 'bg-slate-100 text-slate-600 border-slate-200' },
  { value: 'sell',        label: '偏空',     color: 'bg-rose-100 text-rose-700 border-rose-200' },
  { value: 'strong_sell', label: '强烈看空', color: 'bg-rose-500 text-white border-rose-500' },
];

const TREND_OPTIONS: { value: TrendDirection; label: string; color: string }[] = [
  { value: 'up',   label: '↑ 升值趋势', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'flat', label: '→ 横盘',     color: 'bg-slate-100 text-slate-600 border-slate-200' },
  { value: 'down', label: '↓ 贬值趋势', color: 'bg-rose-100 text-rose-700 border-rose-200' },
];

const TABS = [
  { id: 'macro',   label: '🌐 宏观外汇' },
  { id: 'major',   label: '💱 主要货币' },
  { id: 'cny',     label: '🇨🇳 人民币' },
  { id: 'asia',    label: '🌏 亚洲货币' },
  { id: 'em',      label: '🌍 新兴市场' },
  { id: 'overall', label: '综合研判' },
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

const FMulti = ({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-slate-500">{label}</label>
    <textarea value={value} onChange={e => onChange(e.target.value)} rows={2} placeholder={placeholder}
      className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 focus:bg-white transition-all resize-none placeholder:text-slate-300" />
  </div>
);

const G2 = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-2 gap-3">{children}</div>
);

const SL = ({ text }: { text: string }) => (
  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-2 pb-1 border-b border-slate-100">{text}</p>
);

function FxPairBlock({
  label,
  value,
  onChange,
  baseLabel = '基础货币国',
  quoteLabel = '计价货币国',
}: {
  label: string;
  value?: FxPairData;
  onChange: (v: FxPairData) => void;
  baseLabel?: string;
  quoteLabel?: string;
}) {
  const v = value ?? {};
  return (
    <div className="border border-slate-100 rounded-2xl p-4 space-y-3 bg-slate-50/30">
      <p className="text-xs font-semibold text-slate-700">{label}</p>
      <SL text="行情" />
      <G2>
        <F label="汇率" value={v.rate ?? ''} onChange={x => onChange({ ...v, rate: x })} />
        <F label="涨跌%" value={v.changePct ?? ''} onChange={x => onChange({ ...v, changePct: x })} />
        <F label="52周最高" value={v.week52High ?? ''} onChange={x => onChange({ ...v, week52High: x })} />
        <F label="52周最低" value={v.week52Low ?? ''} onChange={x => onChange({ ...v, week52Low: x })} />
        <F label="波动率" value={v.volatility ?? ''} onChange={x => onChange({ ...v, volatility: x })} hint="年化" />
      </G2>
      <SL text={`基本面对比`} />
      <G2>
        <F label={`${baseLabel} 利率`} value={v.baseCountryRate ?? ''} onChange={x => onChange({ ...v, baseCountryRate: x })} />
        <F label={`${quoteLabel} 利率`} value={v.quoteCountryRate ?? ''} onChange={x => onChange({ ...v, quoteCountryRate: x })} />
        <F label={`${baseLabel} CPI`} value={v.baseCpi ?? ''} onChange={x => onChange({ ...v, baseCpi: x })} />
        <F label={`${quoteLabel} CPI`} value={v.quoteCpi ?? ''} onChange={x => onChange({ ...v, quoteCpi: x })} />
        <F label={`${baseLabel} GDP增速`} value={v.baseGdp ?? ''} onChange={x => onChange({ ...v, baseGdp: x })} />
        <F label={`${quoteLabel} GDP增速`} value={v.quoteGdp ?? ''} onChange={x => onChange({ ...v, quoteGdp: x })} />
      </G2>
      <SL text="两国差异" />
      <G2>
        <F label="利率差" value={v.rateDiff ?? ''} onChange={x => onChange({ ...v, rateDiff: x })} hint="ρ" />
        <F label="GDP增长差" value={v.gdpDiff ?? ''} onChange={x => onChange({ ...v, gdpDiff: x })} />
        <F label="通胀差" value={v.inflationDiff ?? ''} onChange={x => onChange({ ...v, inflationDiff: x })} />
        <F label="10Y收益率差" value={v.bond10yDiff ?? ''} onChange={x => onChange({ ...v, bond10yDiff: x })} hint="利差驱动汇率" />
        <F label="M2增长差" value={v.m2Diff ?? ''} onChange={x => onChange({ ...v, m2Diff: x })} />
      </G2>
      <SL text="国际资本流动" />
      <G2>
        <F label="贸易顺差/逆差" value={v.tradeBalance ?? ''} onChange={x => onChange({ ...v, tradeBalance: x })} />
        <F label="经常账户" value={v.currentAccount ?? ''} onChange={x => onChange({ ...v, currentAccount: x })} />
        <F label="FDI" value={v.fdi ?? ''} onChange={x => onChange({ ...v, fdi: x })} hint="外商直接投资" />
        <F label="证券投资流入" value={v.portfolioInflow ?? ''} onChange={x => onChange({ ...v, portfolioInflow: x })} />
        <F label="外汇储备变化" value={v.fxReserveChange ?? ''} onChange={x => onChange({ ...v, fxReserveChange: x })} />
      </G2>
      <SL text="技术面" />
      <G2>
        <F label="支撑位" value={v.support ?? ''} onChange={x => onChange({ ...v, support: x })} />
        <F label="阻力位" value={v.resistance ?? ''} onChange={x => onChange({ ...v, resistance: x })} />
      </G2>
      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-500">趋势方向</label>
        <div className="flex gap-2 flex-wrap">
          {TREND_OPTIONS.map(o => (
            <button key={o.value} type="button" onClick={() => onChange({ ...v, trend: o.value })}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${v.trend === o.value ? o.color : 'bg-white border-slate-200 text-slate-400'}`}>
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-500">投资信号</label>
        <div className="flex gap-2 flex-wrap">
          {SIGNAL_OPTIONS.map(o => (
            <button key={o.value} type="button" onClick={() => onChange({ ...v, investmentSignal: o.value })}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${v.investmentSignal === o.value ? o.color : 'bg-white border-slate-200 text-slate-400'}`}>
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <FMulti label="分析笔记" value={v.analystNotes ?? ''} onChange={x => onChange({ ...v, analystNotes: x })} />
    </div>
  );
}

export default function FxForm({ data, onChange }: FxFormProps) {
  const [tab, setTab] = useState('macro');
  const m = data.macro ?? {};

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-1 flex-wrap px-1 py-2 border-b border-slate-100 bg-slate-50/50 shrink-0">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${tab === t.id ? 'bg-amber-500 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-1 py-4 space-y-4">

        {tab === 'macro' && (<>
          <SL text="美元指数" />
          <G2>
            <F label="DXY 美元指数" value={m.dxy ?? ''} onChange={x => onChange({ ...data, macro: { ...m, dxy: x } })} placeholder="e.g. 104.5" />
            <F label="DXY 涨跌%" value={m.dxyChange ?? ''} onChange={x => onChange({ ...data, macro: { ...m, dxyChange: x } })} />
          </G2>
          <SL text="全球外汇市场" />
          <G2>
            <F label="全球外汇储备规模" value={m.globalFxReserve ?? ''} onChange={x => onChange({ ...data, macro: { ...m, globalFxReserve: x } })} placeholder="e.g. $12.4T" />
            <F label="美元占储备比例" value={m.usdShareOfReserve ?? ''} onChange={x => onChange({ ...data, macro: { ...m, usdShareOfReserve: x } })} placeholder="e.g. 58%" />
          </G2>
          <F label="全球央行利率概览" value={m.globalCBRates ?? ''} onChange={x => onChange({ ...data, macro: { ...m, globalCBRates: x } })} placeholder="Fed 5.25%, ECB 4.5%, BOJ -0.1%..." />
          <SL text="美元流动性" />
          <F label="美元流动性状况" value={m.usdLiquidity ?? ''} onChange={x => onChange({ ...data, macro: { ...m, usdLiquidity: x } })} placeholder="FRA-OIS、SOFR利差..." />
          <SL text="资本流动" />
          <FMulti label="套息交易环境（Carry Trade）" value={m.carryTrade ?? ''} onChange={x => onChange({ ...data, macro: { ...m, carryTrade: x } })} placeholder="高息货币 vs 低息融资货币..." />
          <FMulti label="全球资本流动" value={m.globalCapitalFlow ?? ''} onChange={x => onChange({ ...data, macro: { ...m, globalCapitalFlow: x } })} placeholder="资金从新兴市场流向发达市场..." />
          <FMulti label="G10 货币强弱排名" value={m.g10Ranking ?? ''} onChange={x => onChange({ ...data, macro: { ...m, g10Ranking: x } })} placeholder="1.USD 2.GBP 3.EUR ..." />
          <FMulti label="整体外汇市场展望" value={m.overallOutlook ?? ''} onChange={x => onChange({ ...data, macro: { ...m, overallOutlook: x } })} />
          <FMulti label="分析师笔记" value={m.analystNotes ?? ''} onChange={x => onChange({ ...data, macro: { ...m, analystNotes: x } })} />
        </>)}

        {tab === 'major' && (<>
          <FxPairBlock label="EUR/USD 欧元/美元" value={data.eurusd} onChange={v => onChange({ ...data, eurusd: v })} baseLabel="欧元区" quoteLabel="美国" />
          <FxPairBlock label="USD/JPY 美元/日元" value={data.usdjpy} onChange={v => onChange({ ...data, usdjpy: v })} baseLabel="美国" quoteLabel="日本" />
          <FxPairBlock label="GBP/USD 英镑/美元" value={data.gbpusd} onChange={v => onChange({ ...data, gbpusd: v })} baseLabel="英国" quoteLabel="美国" />
          <FxPairBlock label="USD/CHF 美元/瑞郎" value={data.usdchf} onChange={v => onChange({ ...data, usdchf: v })} baseLabel="美国" quoteLabel="瑞士" />
          <FxPairBlock label="AUD/USD 澳元/美元" value={data.audusd} onChange={v => onChange({ ...data, audusd: v })} baseLabel="澳大利亚" quoteLabel="美国" />
          <FxPairBlock label="USD/CAD 美元/加元" value={data.usdcad} onChange={v => onChange({ ...data, usdcad: v })} baseLabel="美国" quoteLabel="加拿大" />
        </>)}

        {tab === 'cny' && (<>
          <FxPairBlock label="USD/CNH 美元/离岸人民币" value={data.usdcnh} onChange={v => onChange({ ...data, usdcnh: v })} baseLabel="美国" quoteLabel="中国（离岸）" />
          <FxPairBlock label="USD/CNY 美元/在岸人民币" value={data.usdcny} onChange={v => onChange({ ...data, usdcny: v })} baseLabel="美国" quoteLabel="中国（在岸）" />
        </>)}

        {tab === 'asia' && (<>
          <FxPairBlock label="USD/SGD 美元/新加坡元" value={data.usdsgd} onChange={v => onChange({ ...data, usdsgd: v })} baseLabel="美国" quoteLabel="新加坡" />
          <FxPairBlock label="USD/HKD 美元/港元" value={data.usdhkd} onChange={v => onChange({ ...data, usdhkd: v })} baseLabel="美国" quoteLabel="香港（联系汇率）" />
          <FxPairBlock label="USD/KRW 美元/韩元" value={data.usdkrw} onChange={v => onChange({ ...data, usdkrw: v })} baseLabel="美国" quoteLabel="韩国" />
          <FxPairBlock label="USD/TWD 美元/新台币" value={data.usdtwd} onChange={v => onChange({ ...data, usdtwd: v })} baseLabel="美国" quoteLabel="台湾" />
        </>)}

        {tab === 'em' && (<>
          <SL text="中东货币" />
          <FxPairBlock label="USD/AED 美元/迪拉姆" value={data.usduae} onChange={v => onChange({ ...data, usduae: v })} baseLabel="美国" quoteLabel="阿联酋（钉住汇率）" />
          <FxPairBlock label="USD/SAR 美元/里亚尔" value={data.usdsar} onChange={v => onChange({ ...data, usdsar: v })} baseLabel="美国" quoteLabel="沙特（钉住汇率）" />
          <SL text="东南亚货币" />
          <FxPairBlock label="USD/VND 美元/越南盾" value={data.usdvnd} onChange={v => onChange({ ...data, usdvnd: v })} baseLabel="美国" quoteLabel="越南" />
          <FxPairBlock label="USD/IDR 美元/印尼盾" value={data.usdidr} onChange={v => onChange({ ...data, usdidr: v })} baseLabel="美国" quoteLabel="印尼" />
          <FxPairBlock label="USD/THB 美元/泰铢" value={data.usdthb} onChange={v => onChange({ ...data, usdthb: v })} baseLabel="美国" quoteLabel="泰国" />
          <FxPairBlock label="USD/MYR 美元/马来西亚林吉特" value={data.usdmyr} onChange={v => onChange({ ...data, usdmyr: v })} baseLabel="美国" quoteLabel="马来西亚" />
          <FxPairBlock label="USD/PHP 美元/菲律宾比索" value={data.usdphp} onChange={v => onChange({ ...data, usdphp: v })} baseLabel="美国" quoteLabel="菲律宾" />
          <SL text="南美货币" />
          <FxPairBlock label="USD/BRL 美元/巴西雷亚尔" value={data.usdbrl} onChange={v => onChange({ ...data, usdbrl: v })} baseLabel="美国" quoteLabel="巴西" />
          <FxPairBlock label="USD/ARS 美元/阿根廷比索" value={data.usdars} onChange={v => onChange({ ...data, usdars: v })} baseLabel="美国" quoteLabel="阿根廷（多重汇率）" />
          <FxPairBlock label="USD/CLP 美元/智利比索" value={data.usdclp} onChange={v => onChange({ ...data, usdclp: v })} baseLabel="美国" quoteLabel="智利" />
        </>)}

        {tab === 'overall' && (<>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">综合外汇投资信号</label>
            <div className="flex gap-2 flex-wrap">
              {SIGNAL_OPTIONS.map(o => (
                <button key={o.value} type="button" onClick={() => onChange({ ...data, investmentSignal: o.value })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${data.investmentSignal === o.value ? o.color : 'bg-white border-slate-200 text-slate-400'}`}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          <FMulti label="整体展望" value={data.overallOutlook ?? ''} onChange={v => onChange({ ...data, overallOutlook: v })} placeholder="美元周期、全球货币格局..." />
          <FMulti label="分析师笔记" value={data.analystNotes ?? ''} onChange={v => onChange({ ...data, analystNotes: v })} />
        </>)}

      </div>
    </div>
  );
}