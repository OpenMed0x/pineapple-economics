"use client";

import React, { useState } from 'react';
import { IndexData, SingleIndex, SignalStrength } from '../../types/asset';

interface IndexFormProps {
  data: IndexData;
  onChange: (d: IndexData) => void;
}

const SIGNAL_OPTIONS: { value: SignalStrength; label: string; color: string }[] = [
  { value: 'strong_buy',  label: '强烈看多', color: 'bg-emerald-500 text-white border-emerald-500' },
  { value: 'buy',         label: '偏多',     color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'neutral',     label: '中性',     color: 'bg-slate-100 text-slate-600 border-slate-200' },
  { value: 'sell',        label: '偏空',     color: 'bg-rose-100 text-rose-700 border-rose-200' },
  { value: 'strong_sell', label: '强烈看空', color: 'bg-rose-500 text-white border-rose-500' },
];

const REGION_TABS = [
  { id: 'us',          label: '🇺🇸 美国' },
  { id: 'china',       label: '🇨🇳 中国' },
  { id: 'hongkong',    label: '🇭🇰 香港' },
  { id: 'japan',       label: '🇯🇵 日本' },
  { id: 'korea',       label: '🇰🇷 韩国' },
  { id: 'taiwan',      label: '🇹🇼 台湾' },
  { id: 'europe',      label: '🇪🇺 欧洲' },
  { id: 'southeastAsia', label: '🌏 东南亚' },
  { id: 'india',       label: '🇮🇳 印度' },
  { id: 'southAmerica',label: '🌎 南美' },
  { id: 'middleEast',  label: '🌍 中东' },
  { id: 'global',      label: '🌐 全球' },
  { id: 'volatility',  label: '📊 波动率' },
  { id: 'overall',     label: '综合研判' },
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
    <textarea value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder} rows={2}
      className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 focus:bg-white transition-all resize-none placeholder:text-slate-300" />
  </div>
);

const G2 = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-2 gap-3">{children}</div>
);

const SL = ({ text }: { text: string }) => (
  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-2 pb-1 border-b border-slate-100">{text}</p>
);

function IndexBlock({
  label,
  value,
  onChange,
}: {
  label: string;
  value?: SingleIndex;
  onChange: (v: SingleIndex) => void;
}) {
  const v = value ?? {};
  const q = v.quote ?? {};
  const val = v.valuation ?? {};
  const earn = v.earnings ?? {};
  const sec = v.sector ?? {};
  const flow = v.flow ?? {};
  const macro = v.macro ?? {};

  return (
    <div className="border border-slate-100 rounded-2xl p-4 space-y-3 bg-slate-50/30">
      <p className="text-xs font-semibold text-slate-700">{label}</p>
      <SL text="行情" />
      <G2>
        <F label="价格" value={q.price ?? ''} onChange={x => onChange({ ...v, quote: { ...q, price: x } })} />
        <F label="涨跌%" value={q.changePct ?? ''} onChange={x => onChange({ ...v, quote: { ...q, changePct: x } })} />
        <F label="52周最高" value={q.week52High ?? ''} onChange={x => onChange({ ...v, quote: { ...q, week52High: x } })} />
        <F label="52周最低" value={q.week52Low ?? ''} onChange={x => onChange({ ...v, quote: { ...q, week52Low: x } })} />
        <F label="成交量" value={q.volume ?? ''} onChange={x => onChange({ ...v, quote: { ...q, volume: x } })} />
      </G2>
      <SL text="估值" />
      <G2>
        <F label="P/E" value={val.pe ?? ''} onChange={x => onChange({ ...v, valuation: { ...val, pe: x } })} />
        <F label="Forward P/E" value={val.forwardPe ?? ''} onChange={x => onChange({ ...v, valuation: { ...val, forwardPe: x } })} />
        <F label="P/B" value={val.pb ?? ''} onChange={x => onChange({ ...v, valuation: { ...val, pb: x } })} />
        <F label="股息率" value={val.dividendYield ?? ''} onChange={x => onChange({ ...v, valuation: { ...val, dividendYield: x } })} />
        <F label="总市值" value={val.marketCap ?? ''} onChange={x => onChange({ ...v, valuation: { ...val, marketCap: x } })} />
      </G2>
      <SL text="盈利" />
      <G2>
        <F label="EPS" value={earn.eps ?? ''} onChange={x => onChange({ ...v, earnings: { ...earn, eps: x } })} />
        <F label="EPS Growth" value={earn.epsGrowth ?? ''} onChange={x => onChange({ ...v, earnings: { ...earn, epsGrowth: x } })} />
        <F label="Revenue Growth" value={earn.revenueGrowth ?? ''} onChange={x => onChange({ ...v, earnings: { ...earn, revenueGrowth: x } })} />
      </G2>
      <SL text="行业权重" />
      <G2>
        <F label="科技" value={sec.techWeight ?? ''} onChange={x => onChange({ ...v, sector: { ...sec, techWeight: x } })} placeholder="e.g. 32%" />
        <F label="金融" value={sec.financeWeight ?? ''} onChange={x => onChange({ ...v, sector: { ...sec, financeWeight: x } })} />
        <F label="医疗" value={sec.healthcareWeight ?? ''} onChange={x => onChange({ ...v, sector: { ...sec, healthcareWeight: x } })} />
        <F label="消费" value={sec.consumerWeight ?? ''} onChange={x => onChange({ ...v, sector: { ...sec, consumerWeight: x } })} />
        <F label="能源" value={sec.energyWeight ?? ''} onChange={x => onChange({ ...v, sector: { ...sec, energyWeight: x } })} />
        <F label="其他" value={sec.otherWeights ?? ''} onChange={x => onChange({ ...v, sector: { ...sec, otherWeights: x } })} />
      </G2>
      <SL text="资金流向" />
      <G2>
        <F label="ETF资金流" value={flow.etfFlow ?? ''} onChange={x => onChange({ ...v, flow: { ...flow, etfFlow: x } })} />
        <F label="机构持仓" value={flow.institutionHolding ?? ''} onChange={x => onChange({ ...v, flow: { ...flow, institutionHolding: x } })} />
        <F label="外资流入" value={flow.foreignInflow ?? ''} onChange={x => onChange({ ...v, flow: { ...flow, foreignInflow: x } })} />
        <F label="期权OI" value={flow.optionOI ?? ''} onChange={x => onChange({ ...v, flow: { ...flow, optionOI: x } })} />
      </G2>
      <SL text="宏观背景" />
      <G2>
        <F label="Fed/央行利率" value={macro.fedRate ?? ''} onChange={x => onChange({ ...v, macro: { ...macro, fedRate: x } })} />
        <F label="GDP" value={macro.gdp ?? ''} onChange={x => onChange({ ...v, macro: { ...macro, gdp: x } })} />
        <F label="CPI" value={macro.cpi ?? ''} onChange={x => onChange({ ...v, macro: { ...macro, cpi: x } })} />
        <F label="PCE" value={macro.pce ?? ''} onChange={x => onChange({ ...v, macro: { ...macro, pce: x } })} />
        <F label="失业率" value={macro.unemployment ?? ''} onChange={x => onChange({ ...v, macro: { ...macro, unemployment: x } })} />
        <F label="10Y国债" value={macro.treasury10y ?? ''} onChange={x => onChange({ ...v, macro: { ...macro, treasury10y: x } })} />
      </G2>
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

export default function IndexForm({ data, onChange }: IndexFormProps) {
  const [tab, setTab] = useState('us');

  const SignalSelect = () => (
    <div className="space-y-1">
      <label className="text-xs font-medium text-slate-500">综合投资信号</label>
      <div className="flex gap-2 flex-wrap">
        {SIGNAL_OPTIONS.map(o => (
          <button key={o.value} type="button" onClick={() => onChange({ ...data, investmentSignal: o.value })}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${data.investmentSignal === o.value ? o.color : 'bg-white border-slate-200 text-slate-400'}`}>
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-1 flex-wrap px-1 py-2 border-b border-slate-100 bg-slate-50/50 shrink-0">
        {REGION_TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${tab === t.id ? 'bg-amber-500 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-1 py-4 space-y-4">

        {tab === 'us' && (<>
          <IndexBlock label="S&P 500" value={data.us?.sp500} onChange={v => onChange({ ...data, us: { ...data.us, sp500: v } })} />
          <IndexBlock label="Nasdaq 100" value={data.us?.nasdaq100} onChange={v => onChange({ ...data, us: { ...data.us, nasdaq100: v } })} />
          <IndexBlock label="Dow Jones" value={data.us?.dowJones} onChange={v => onChange({ ...data, us: { ...data.us, dowJones: v } })} />
        </>)}

        {tab === 'china' && (<>
          <IndexBlock label="上证综指" value={data.china?.shanghai} onChange={v => onChange({ ...data, china: { ...data.china, shanghai: v } })} />
          <IndexBlock label="深证成指" value={data.china?.shenzhen} onChange={v => onChange({ ...data, china: { ...data.china, shenzhen: v } })} />
          <IndexBlock label="沪深 300" value={data.china?.csi300} onChange={v => onChange({ ...data, china: { ...data.china, csi300: v } })} />
          <IndexBlock label="中证 500" value={data.china?.csi500} onChange={v => onChange({ ...data, china: { ...data.china, csi500: v } })} />
          <IndexBlock label="中证 1000" value={data.china?.csi1000} onChange={v => onChange({ ...data, china: { ...data.china, csi1000: v } })} />
          <IndexBlock label="创业板指" value={data.china?.chinext} onChange={v => onChange({ ...data, china: { ...data.china, chinext: v } })} />
          <IndexBlock label="科创 50" value={data.china?.star50} onChange={v => onChange({ ...data, china: { ...data.china, star50: v } })} />
        </>)}

        {tab === 'hongkong' && (<>
          <IndexBlock label="恒生指数 HSI" value={data.hongkong?.hsi} onChange={v => onChange({ ...data, hongkong: { ...data.hongkong, hsi: v } })} />
          <IndexBlock label="恒生科技 HSTECH" value={data.hongkong?.hsTech} onChange={v => onChange({ ...data, hongkong: { ...data.hongkong, hsTech: v } })} />
          <IndexBlock label="恒生中企指数 HSCEI" value={data.hongkong?.hscei} onChange={v => onChange({ ...data, hongkong: { ...data.hongkong, hscei: v } })} />
        </>)}

        {tab === 'japan' && (<>
          <IndexBlock label="Nikkei 225" value={data.japan?.nikkei225} onChange={v => onChange({ ...data, japan: { ...data.japan, nikkei225: v } })} />
          <IndexBlock label="TOPIX" value={data.japan?.topix} onChange={v => onChange({ ...data, japan: { ...data.japan, topix: v } })} />
        </>)}

        {tab === 'korea' && (<>
          <IndexBlock label="KOSPI" value={data.korea?.kospi} onChange={v => onChange({ ...data, korea: { ...data.korea, kospi: v } })} />
          <IndexBlock label="KOSDAQ" value={data.korea?.kosdaq} onChange={v => onChange({ ...data, korea: { ...data.korea, kosdaq: v } })} />
        </>)}

        {tab === 'taiwan' && (<>
          <IndexBlock label="TAIEX" value={data.taiwan?.taiex} onChange={v => onChange({ ...data, taiwan: { ...data.taiwan, taiex: v } })} />
          <IndexBlock label="台湾 50" value={data.taiwan?.tw50} onChange={v => onChange({ ...data, taiwan: { ...data.taiwan, tw50: v } })} />
        </>)}

        {tab === 'europe' && (<>
          <IndexBlock label="STOXX Europe 600" value={data.europe?.stoxx600} onChange={v => onChange({ ...data, europe: { ...data.europe, stoxx600: v } })} />
          <IndexBlock label="Euro STOXX 50" value={data.europe?.euroStoxx50} onChange={v => onChange({ ...data, europe: { ...data.europe, euroStoxx50: v } })} />
          <IndexBlock label="DAX（德国）" value={data.europe?.dax} onChange={v => onChange({ ...data, europe: { ...data.europe, dax: v } })} />
          <IndexBlock label="CAC 40（法国）" value={data.europe?.cac40} onChange={v => onChange({ ...data, europe: { ...data.europe, cac40: v } })} />
          <IndexBlock label="FTSE 100（英国）" value={data.europe?.ftse100} onChange={v => onChange({ ...data, europe: { ...data.europe, ftse100: v } })} />
          <IndexBlock label="IBEX 35（西班牙）" value={data.europe?.ibex35} onChange={v => onChange({ ...data, europe: { ...data.europe, ibex35: v } })} />
          <IndexBlock label="FTSE MIB（意大利）" value={data.europe?.ftseMib} onChange={v => onChange({ ...data, europe: { ...data.europe, ftseMib: v } })} />
        </>)}

        {tab === 'southeastAsia' && (<>
          <IndexBlock label="STI（新加坡）" value={data.southeastAsia?.sti} onChange={v => onChange({ ...data, southeastAsia: { ...data.southeastAsia, sti: v } })} />
          <IndexBlock label="VNINDEX（越南）" value={data.southeastAsia?.vnindex} onChange={v => onChange({ ...data, southeastAsia: { ...data.southeastAsia, vnindex: v } })} />
          <IndexBlock label="JCI（印尼）" value={data.southeastAsia?.jci} onChange={v => onChange({ ...data, southeastAsia: { ...data.southeastAsia, jci: v } })} />
          <IndexBlock label="SET（泰国）" value={data.southeastAsia?.set} onChange={v => onChange({ ...data, southeastAsia: { ...data.southeastAsia, set: v } })} />
          <IndexBlock label="KLCI（马来西亚）" value={data.southeastAsia?.klci} onChange={v => onChange({ ...data, southeastAsia: { ...data.southeastAsia, klci: v } })} />
          <IndexBlock label="PSEi（菲律宾）" value={data.southeastAsia?.psei} onChange={v => onChange({ ...data, southeastAsia: { ...data.southeastAsia, psei: v } })} />
        </>)}

        {tab === 'india' && (<>
          <IndexBlock label="Nifty 50" value={data.india?.nifty50} onChange={v => onChange({ ...data, india: { ...data.india, nifty50: v } })} />
          <IndexBlock label="Sensex" value={data.india?.sensex} onChange={v => onChange({ ...data, india: { ...data.india, sensex: v } })} />
        </>)}

        {tab === 'southAmerica' && (<>
          <IndexBlock label="Bovespa（巴西）" value={data.southAmerica?.bovespa} onChange={v => onChange({ ...data, southAmerica: { ...data.southAmerica, bovespa: v } })} />
          <IndexBlock label="MERVAL（阿根廷）" value={data.southAmerica?.merval} onChange={v => onChange({ ...data, southAmerica: { ...data.southAmerica, merval: v } })} />
          <IndexBlock label="IPSA（智利）" value={data.southAmerica?.ipsa} onChange={v => onChange({ ...data, southAmerica: { ...data.southAmerica, ipsa: v } })} />
        </>)}

        {tab === 'middleEast' && (<>
          <IndexBlock label="Tadawul All Share（沙特）" value={data.middleEast?.tadawul} onChange={v => onChange({ ...data, middleEast: { ...data.middleEast, tadawul: v } })} />
          <IndexBlock label="ADX General（阿联酋）" value={data.middleEast?.adx} onChange={v => onChange({ ...data, middleEast: { ...data.middleEast, adx: v } })} />
          <IndexBlock label="DFM General（迪拜）" value={data.middleEast?.dfm} onChange={v => onChange({ ...data, middleEast: { ...data.middleEast, dfm: v } })} />
          <IndexBlock label="QE Index（卡塔尔）" value={data.middleEast?.qe} onChange={v => onChange({ ...data, middleEast: { ...data.middleEast, qe: v } })} />
          <IndexBlock label="Boursa Kuwait Premier" value={data.middleEast?.bourse_kuwait} onChange={v => onChange({ ...data, middleEast: { ...data.middleEast, bourse_kuwait: v } })} />
        </>)}

        {tab === 'global' && (<>
          <IndexBlock label="MSCI World" value={data.global?.msciWorld} onChange={v => onChange({ ...data, global: { ...data.global, msciWorld: v } })} />
          <IndexBlock label="MSCI ACWI" value={data.global?.msciAcwi} onChange={v => onChange({ ...data, global: { ...data.global, msciAcwi: v } })} />
          <IndexBlock label="MSCI Emerging Markets" value={data.global?.msciEM} onChange={v => onChange({ ...data, global: { ...data.global, msciEM: v } })} />
          <IndexBlock label="FTSE All World" value={data.global?.ftseAllWorld} onChange={v => onChange({ ...data, global: { ...data.global, ftseAllWorld: v } })} />
          <IndexBlock label="FTSE Emerging" value={data.global?.ftseEmerging} onChange={v => onChange({ ...data, global: { ...data.global, ftseEmerging: v } })} />
        </>)}

        {tab === 'volatility' && (<>
          <IndexBlock label="VIX（股市恐慌指数）" value={data.volatility?.vix} onChange={v => onChange({ ...data, volatility: { ...data.volatility, vix: v } })} />
          <IndexBlock label="MOVE（债券波动率）" value={data.volatility?.move} onChange={v => onChange({ ...data, volatility: { ...data.volatility, move: v } })} />
          <IndexBlock label="Crypto Volatility Index" value={data.volatility?.cryptoVix} onChange={v => onChange({ ...data, volatility: { ...data.volatility, cryptoVix: v } })} />
        </>)}

        {tab === 'overall' && (<>
          <SignalSelect />
          <FMulti label="整体展望" value={data.overallOutlook ?? ''} onChange={v => onChange({ ...data, overallOutlook: v })} placeholder="跨市场配置逻辑、主线判断..." />
          <FMulti label="分析师笔记" value={data.analystNotes ?? ''} onChange={v => onChange({ ...data, analystNotes: v })} />
        </>)}

      </div>
    </div>
  );
}