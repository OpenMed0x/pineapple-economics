"use client";

import React, { useState } from 'react';
import { DetailedBondData, DetailedBondItem, CorporateBondData, SignalStrength } from '../../types/asset';

interface BondFormProps {
  data: DetailedBondData;
  onChange: (d: DetailedBondData) => void;
}

const SIGNAL_OPTIONS: { value: SignalStrength; label: string; color: string }[] = [
  { value: 'strong_buy',  label: '强烈看多', color: 'bg-emerald-500 text-white border-emerald-500' },
  { value: 'buy',         label: '偏多',     color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'neutral',     label: '中性',     color: 'bg-slate-100 text-slate-600 border-slate-200' },
  { value: 'sell',        label: '偏空',     color: 'bg-rose-100 text-rose-700 border-rose-200' },
  { value: 'strong_sell', label: '强烈看空', color: 'bg-rose-500 text-white border-rose-500' },
];

const TABS = [
  { id: 'us',      label: '🇺🇸 美国国债' },
  { id: 'china',   label: '🇨🇳 中国国债' },
  { id: 'global',  label: '🌐 主要国家' },
  { id: 'credit',  label: '📊 企业债/信用' },
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
  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-2 pb-1 border-b border-slate-100">
    {text}
  </p>
);

function BondBlock({ label, value, onChange }: {
  label: string;
  value?: DetailedBondItem;
  onChange: (v: DetailedBondItem) => void;
}) {
  const v = value ?? {};
  const u = (key: keyof DetailedBondItem) => (val: string) => onChange({ ...v, [key]: val });

  return (
    <div className="border border-slate-100 rounded-2xl p-4 space-y-3 bg-slate-50/20">
      <p className="text-sm font-semibold text-slate-800">{label}</p>

      <SL text="行情" />
      <G2>
        <F label="收益率（Yield）" value={v.yield ?? ''} onChange={u('yield')} placeholder="e.g. 4.25%" />
        <F label="价格" value={v.price ?? ''} onChange={u('price')} />
        <F label="涨跌 (bp)" value={v.change ?? ''} onChange={u('change')} placeholder="e.g. +5bp" />
        <F label="52周最高" value={v.week52High ?? ''} onChange={u('week52High')} />
        <F label="52周最低" value={v.week52Low ?? ''} onChange={u('week52Low')} />
      </G2>

      <SL text="收益率曲线" />
      <G2>
        <F label="3M" value={v.curve3m ?? ''} onChange={u('curve3m')} />
        <F label="2Y" value={v.curve2y ?? ''} onChange={u('curve2y')} />
        <F label="5Y" value={v.curve5y ?? ''} onChange={u('curve5y')} />
        <F label="10Y" value={v.curve10y ?? ''} onChange={u('curve10y')} />
        <F label="30Y" value={v.curve30y ?? ''} onChange={u('curve30y')} />
      </G2>

      <SL text="利差" />
      <G2>
        <F label="2Y-10Y 利差" value={v.spread2y10y ?? ''} onChange={u('spread2y10y')} hint="倒挂预警" placeholder="e.g. -30bp" />
        <F label="10Y-30Y 利差" value={v.spread10y30y ?? ''} onChange={u('spread10y30y')} />
        <F label="相对美国利差" value={v.spreadVsUS ?? ''} onChange={u('spreadVsUS')} />
        <F label="相对德国利差" value={v.spreadVsGermany ?? ''} onChange={u('spreadVsGermany')} />
      </G2>

      <SL text="宏观" />
      <G2>
        <F label="央行利率" value={v.fedRate ?? ''} onChange={u('fedRate')} />
        <F label="CPI" value={v.cpi ?? ''} onChange={u('cpi')} />
        <F label="PCE" value={v.pce ?? ''} onChange={u('pce')} />
        <F label="GDP 增速" value={v.gdp ?? ''} onChange={u('gdp')} />
        <F label="失业率" value={v.unemployment ?? ''} onChange={u('unemployment')} />
        <F label="财政赤字/GDP" value={v.fiscalDeficit ?? ''} onChange={u('fiscalDeficit')} />
        <F label="国债发行量" value={v.bondIssuance ?? ''} onChange={u('bondIssuance')} />
      </G2>

      <SL text="资金" />
      <G2>
        <F label="外国持仓" value={v.foreignHolding ?? ''} onChange={u('foreignHolding')} />
        <F label="中国持仓" value={v.chinaHolding ?? ''} onChange={u('chinaHolding')} />
        <F label="日本持仓" value={v.japanHolding ?? ''} onChange={u('japanHolding')} />
        <F label="央行持仓" value={v.centralBankHolding ?? ''} onChange={u('centralBankHolding')} />
        <F label="ETF 资金流" value={v.etfFlow ?? ''} onChange={u('etfFlow')} />
        <F label="拍卖情况" value={v.auctionResult ?? ''} onChange={u('auctionResult')} hint="Bid-to-Cover" />
      </G2>

      <SL text="风险" />
      <G2>
        <F label="违约风险" value={v.defaultRisk ?? ''} onChange={u('defaultRisk')} />
        <F label="财政风险" value={v.fiscalRisk ?? ''} onChange={u('fiscalRisk')} />
        <F label="评级" value={v.rating ?? ''} onChange={u('rating')} placeholder="e.g. AAA" />
        <F label="信用风险" value={v.creditRisk ?? ''} onChange={u('creditRisk')} />
        <F label="期限风险" value={v.durationRisk ?? ''} onChange={u('durationRisk')} hint="Duration" />
      </G2>

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-500">投资信号</label>
        <div className="flex gap-2 flex-wrap">
          {SIGNAL_OPTIONS.map(o => (
            <button key={o.value} type="button"
              onClick={() => onChange({ ...v, investmentSignal: o.value })}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all
                ${v.investmentSignal === o.value ? o.color : 'bg-white border-slate-200 text-slate-400'}`}>
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <FM label="分析笔记" value={v.analystNotes ?? ''} onChange={u('analystNotes')} />
    </div>
  );
}

function CorpBondBlock({ label, value, onChange }: {
  label: string;
  value?: CorporateBondData;
  onChange: (v: CorporateBondData) => void;
}) {
  const v = value ?? {};
  const u = (key: keyof CorporateBondData) => (val: string) => onChange({ ...v, [key]: val });
  return (
    <div className="border border-slate-100 rounded-2xl p-4 space-y-3 bg-slate-50/20">
      <p className="text-sm font-semibold text-slate-800">{label}</p>
      <G2>
        <F label="Yield 收益率" value={v.yield ?? ''} onChange={u('yield')} />
        <F label="Credit Spread 利差" value={v.creditSpread ?? ''} onChange={u('creditSpread')} placeholder="e.g. 350bp" />
        <F label="Duration 久期" value={v.duration ?? ''} onChange={u('duration')} />
        <F label="Rating 评级" value={v.rating ?? ''} onChange={u('rating')} placeholder="BB+ / BBB-" />
        <F label="Default Risk 违约率" value={v.defaultRisk ?? ''} onChange={u('defaultRisk')} />
        <F label="CDS 价格" value={v.cds ?? ''} onChange={u('cds')} hint="信用违约互换" />
      </G2>
      <FM label="分析笔记" value={v.analystNotes ?? ''} onChange={u('analystNotes')} />
    </div>
  );
}

export default function BondForm({ data, onChange }: BondFormProps) {
  const [tab, setTab] = useState('us');

  const SignalSelect = () => (
    <div className="space-y-1">
      <label className="text-xs font-medium text-slate-500">综合投资信号</label>
      <div className="flex gap-2 flex-wrap">
        {SIGNAL_OPTIONS.map(o => (
          <button key={o.value} type="button"
            onClick={() => onChange({ ...data, investmentSignal: o.value })}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
              ${data.investmentSignal === o.value ? o.color : 'bg-white border-slate-200 text-slate-400'}`}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-1 flex-wrap px-1 py-2 border-b border-slate-100 bg-slate-50/50 shrink-0">
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap
              ${tab === t.id ? 'bg-amber-500 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {tab === 'us' && (<>
          <BondBlock label="美国 3M 国债" value={data.usT3m} onChange={v => onChange({ ...data, usT3m: v })} />
          <BondBlock label="美国 2Y 国债" value={data.usT2y} onChange={v => onChange({ ...data, usT2y: v })} />
          <BondBlock label="美国 5Y 国债" value={data.usT5y} onChange={v => onChange({ ...data, usT5y: v })} />
          <BondBlock label="美国 10Y 国债" value={data.usT10y} onChange={v => onChange({ ...data, usT10y: v })} />
          <BondBlock label="美国 30Y 国债" value={data.usT30y} onChange={v => onChange({ ...data, usT30y: v })} />
          <SL text="美国债市综合" />
          <G2>
            <F label="MOVE 债券波动率" value={data.moveIndex ?? ''} onChange={v => onChange({ ...data, moveIndex: v })} />
          </G2>
        </>)}

        {tab === 'china' && (<>
          <BondBlock label="中国 2Y 国债" value={data.cnB2y} onChange={v => onChange({ ...data, cnB2y: v })} />
          <BondBlock label="中国 5Y 国债" value={data.cnB5y} onChange={v => onChange({ ...data, cnB5y: v })} />
          <BondBlock label="中国 10Y 国债" value={data.cnB10y} onChange={v => onChange({ ...data, cnB10y: v })} />
          <BondBlock label="中国 30Y 国债" value={data.cnB30y} onChange={v => onChange({ ...data, cnB30y: v })} />
        </>)}

        {tab === 'global' && (<>
          <BondBlock label="德国 10Y Bund" value={data.deB10y} onChange={v => onChange({ ...data, deB10y: v })} />
          <BondBlock label="英国 10Y 金边债（Gilt）" value={data.ukB10y} onChange={v => onChange({ ...data, ukB10y: v })} />
          <BondBlock label="法国 10Y OAT" value={data.frB10y} onChange={v => onChange({ ...data, frB10y: v })} />
          <BondBlock label="意大利 10Y BTP" value={data.itB10y} onChange={v => onChange({ ...data, itB10y: v })} />
          <BondBlock label="日本 10Y JGB" value={data.jpB10y} onChange={v => onChange({ ...data, jpB10y: v })} />
          <BondBlock label="日本 30Y JGB" value={data.jpB30y} onChange={v => onChange({ ...data, jpB30y: v })} />
          <BondBlock label="印度 10Y" value={data.inB10y} onChange={v => onChange({ ...data, inB10y: v })} />
          <BondBlock label="巴西 10Y" value={data.brB10y} onChange={v => onChange({ ...data, brB10y: v })} />
          <BondBlock label="TIPS 通胀保值债" value={data.tips} onChange={v => onChange({ ...data, tips: v })} />
          <SL text="全球债券指数" />
          <G2>
            <F label="Bloomberg Global Agg" value={data.globalAgg ?? ''} onChange={v => onChange({ ...data, globalAgg: v })} />
            <F label="EM Bond Index" value={data.emBondIndex ?? ''} onChange={v => onChange({ ...data, emBondIndex: v })} />
            <F label="US Corp Index" value={data.usCorpIndex ?? ''} onChange={v => onChange({ ...data, usCorpIndex: v })} />
          </G2>
        </>)}

        {tab === 'credit' && (<>
          <CorpBondBlock label="投资级企业债（IG）" value={data.ig} onChange={v => onChange({ ...data, ig: v })} />
          <CorpBondBlock label="高收益债（HY / Junk）" value={data.hy} onChange={v => onChange({ ...data, hy: v })} />
          <CorpBondBlock label="新兴市场债（EM）" value={data.em} onChange={v => onChange({ ...data, em: v })} />
          <CorpBondBlock label="市政债（Muni，可选）" value={data.muni} onChange={v => onChange({ ...data, muni: v })} />
        </>)}

        {tab === 'overall' && (<>
          <F label="MOVE 债券波动率指数" value={data.moveIndex ?? ''} onChange={v => onChange({ ...data, moveIndex: v })} />
          <SignalSelect />
          <FM label="整体展望" value={data.overallOutlook ?? ''} onChange={v => onChange({ ...data, overallOutlook: v })} />
          <FM label="分析师笔记" value={data.analystNotes ?? ''} onChange={v => onChange({ ...data, analystNotes: v })} />
        </>)}

      </div>
    </div>
  );
}