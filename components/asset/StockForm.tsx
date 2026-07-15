"use client";

import React, { useState } from 'react';
import {
  StockData, StockMarketData, StockMarketMacro,
  StockSector, SingleStock, SignalStrength
} from '../../types/asset';

interface Props {
  data: StockData;
  onChange: (d: StockData) => void;
}

const SIGNAL_OPTIONS: { value: SignalStrength; label: string; color: string }[] = [
  { value: 'strong_buy',  label: '强烈看多', color: 'bg-emerald-500 text-white border-emerald-500' },
  { value: 'buy',         label: '偏多',     color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'neutral',     label: '中性',     color: 'bg-slate-100 text-slate-600 border-slate-200' },
  { value: 'sell',        label: '偏空',     color: 'bg-rose-100 text-rose-700 border-rose-200' },
  { value: 'strong_sell', label: '强烈看空', color: 'bg-rose-500 text-white border-rose-500' },
];

const MARKET_TABS = [
  { id: 'usStock',           label: '🇺🇸 美股' },
  { id: 'hkStock',           label: '🇭🇰 港股' },
  { id: 'chinaAShare',       label: '🇨🇳 A股' },
  { id: 'europeStock',       label: '🇪🇺 欧股' },
  { id: 'japanStock',        label: '🇯🇵 日股' },
  { id: 'koreaStock',        label: '🇰🇷 韩股' },
  { id: 'taiwanStock',       label: '🇹🇼 台股' },
  { id: 'seaStock',          label: '🌏 东南亚' },
  { id: 'indiaStock',        label: '🇮🇳 印度' },
  { id: 'southAmericaStock', label: '🌎 南美' },
];

const SECTOR_KEYS: { key: keyof StockMarketData; label: string }[] = [
  { key: 'technology',    label: '科技' },
  { key: 'finance',       label: '金融' },
  { key: 'healthcare',    label: '医疗' },
  { key: 'consumer',      label: '消费' },
  { key: 'energy',        label: '能源' },
  { key: 'industrial',    label: '工业' },
  { key: 'realestate',    label: '房地产' },
  { key: 'materials',     label: '原材料' },
  { key: 'utilities',     label: '公用事业' },
  { key: 'communication', label: '通信' },
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

const G3 = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-3 gap-3">{children}</div>
);

const SL = ({ text }: { text: string }) => (
  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-3 pb-1 border-b border-slate-100">
    {text}
  </p>
);

const Signal = ({ value, onChange }: {
  value?: SignalStrength; onChange: (v: SignalStrength) => void;
}) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-slate-500">投资信号</label>
    <div className="flex gap-2 flex-wrap">
      {SIGNAL_OPTIONS.map(o => (
        <button key={o.value} type="button" onClick={() => onChange(o.value)}
          className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all
            ${value === o.value ? o.color : 'bg-white border-slate-200 text-slate-400'}`}>
          {o.label}
        </button>
      ))}
    </div>
  </div>
);

// 市场宏观表单
function MarketMacroForm({ label, value, onChange }: {
  label: string;
  value?: StockMarketMacro;
  onChange: (v: StockMarketMacro) => void;
}) {
  const v = value ?? {};
  const u = (key: keyof StockMarketMacro) => (val: string) =>
    onChange({ ...v, [key]: val });

  return (
    <div className="space-y-4">
      <SL text={`${label} 市场整体`} />
      <G2>
        <F label="代表指数表现" value={v.indexPerformance ?? ''} onChange={u('indexPerformance')}
          placeholder="e.g. S&P500 +18% YTD" />
        <F label="总市值" value={v.marketCap ?? ''} onChange={u('marketCap')} />
        <F label="日均成交量" value={v.tradingVolume ?? ''} onChange={u('tradingVolume')} />
        <F label="市场整体 P/E" value={v.marketPe ?? ''} onChange={u('marketPe')} />
        <F label="市场整体 P/B" value={v.marketPb ?? ''} onChange={u('marketPb')} />
        <F label="平均股息率" value={v.dividendYield ?? ''} onChange={u('dividendYield')} />
      </G2>
      <SL text="资金面" />
      <G2>
        <F label="外资流入/流出" value={v.foreignFlow ?? ''} onChange={u('foreignFlow')} />
        <F label="机构动向" value={v.institutionActivity ?? ''} onChange={u('institutionActivity')} />
        <F label="ETF资金流" value={v.etfFlow ?? ''} onChange={u('etfFlow')} />
        <F label="融资余额" value={v.marginBalance ?? ''} onChange={u('marginBalance')} />
        <F label="做空比例" value={v.shortInterest ?? ''} onChange={u('shortInterest')} />
      </G2>
      <SL text="宏观背景" />
      <G2>
        <F label="GDP增速" value={v.gdpGrowth ?? ''} onChange={u('gdpGrowth')} />
        <F label="CPI" value={v.cpi ?? ''} onChange={u('cpi')} />
        <F label="央行利率" value={v.centralBankRate ?? ''} onChange={u('centralBankRate')} />
        <F label="本币汇率" value={v.currency ?? ''} onChange={u('currency')} />
      </G2>
      <SL text="市场情绪" />
      <G2>
        <F label="波动率指数" value={v.vix ?? ''} onChange={u('vix')}
          hint="VIX或本地VIX" />
        <F label="牛熊比例" value={v.bullBearRatio ?? ''} onChange={u('bullBearRatio')} />
        <F label="Put/Call比率" value={v.putCallRatio ?? ''} onChange={u('putCallRatio')} />
      </G2>
      <SL text="政策与风险" />
      <FM label="监管环境" value={v.regulatoryEnv ?? ''} onChange={u('regulatoryEnv')} />
      <FM label="地缘政治风险" value={v.geopoliticalRisk ?? ''} onChange={u('geopoliticalRisk')} />
      <FM label="市场准入风险" value={v.marketAccessRisk ?? ''} onChange={u('marketAccessRisk')}
        placeholder="外资限制、MSCI权重、退市风险..." />
      <FM label="分析笔记" value={v.analystNotes ?? ''} onChange={u('analystNotes')} />
    </div>
  );
}

// 板块表单
function SectorForm({ sectorLabel, value, onChange }: {
  sectorLabel: string;
  value?: StockSector;
  onChange: (v: StockSector) => void;
}) {
  const v = value ?? {};
  const u = (key: keyof StockSector) => (val: string) => onChange({ ...v, [key]: val });
  return (
    <div className="border border-slate-100 rounded-2xl p-4 space-y-3 bg-slate-50/20">
      <p className="text-xs font-semibold text-slate-700">{sectorLabel}</p>
      <G2>
        <F label="市值权重" value={v.weight ?? ''} onChange={u('weight')} placeholder="e.g. 32%" />
        <F label="近期表现" value={v.performance ?? ''} onChange={u('performance')} placeholder="e.g. +12% YTD" />
        <F label="板块 P/E" value={v.pe ?? ''} onChange={u('pe')} />
      </G2>
      <FM label="展望" value={v.outlook ?? ''} onChange={u('outlook')} placeholder="逻辑、驱动、风险..." />
      <FM label="精选标的" value={v.topPicks ?? ''} onChange={u('topPicks')} placeholder="推荐关注的个股..." />
    </div>
  );
}

// 个股表单
function SingleStockForm({ value, onChange, onRemove }: {
  value: SingleStock;
  onChange: (v: SingleStock) => void;
  onRemove: () => void;
}) {
  const v = value;
  const u = (key: keyof SingleStock) => (val: string) =>
    onChange({ ...v, [key]: val });

  return (
    <div className="border border-amber-100 rounded-2xl p-4 space-y-3 bg-amber-50/10">
      <div className="flex justify-between items-center">
        <p className="text-xs font-semibold text-amber-700">
          {v.ticker ? `${v.ticker} · ${v.name ?? ''}` : '个股研究'}
        </p>
        <button onClick={onRemove}
          className="text-xs text-rose-400 hover:text-rose-600 transition-colors">
          删除
        </button>
      </div>
      <SL text="基本信息" />
      <G3>
        <F label="股票代码" value={v.ticker ?? ''} onChange={u('ticker')} placeholder="e.g. AAPL" />
        <F label="公司名称" value={v.name ?? ''} onChange={u('name')} />
        <F label="交易所" value={v.exchange ?? ''} onChange={u('exchange')} />
      </G3>
      <G2>
        <F label="行业" value={v.sector ?? ''} onChange={u('sector')} />
        <F label="细分行业" value={v.industry ?? ''} onChange={u('industry')} />
      </G2>

      <SL text="行情" />
      <G3>
        <F label="价格" value={v.price ?? ''} onChange={u('price')} />
        <F label="涨跌%" value={v.changePct ?? ''} onChange={u('changePct')} />
        <F label="52周最高" value={v.week52High ?? ''} onChange={u('week52High')} />
        <F label="52周最低" value={v.week52Low ?? ''} onChange={u('week52Low')} />
        <F label="成交量" value={v.volume ?? ''} onChange={u('volume')} />
        <F label="均量" value={v.avgVolume ?? ''} onChange={u('avgVolume')} />
      </G3>

      <SL text="估值" />
      <G3>
        <F label="P/E" value={v.pe ?? ''} onChange={u('pe')} />
        <F label="Forward P/E" value={v.forwardPe ?? ''} onChange={u('forwardPe')} />
        <F label="P/B" value={v.pb ?? ''} onChange={u('pb')} />
        <F label="P/S" value={v.ps ?? ''} onChange={u('ps')} />
        <F label="EV/EBITDA" value={v.evEbitda ?? ''} onChange={u('evEbitda')} />
        <F label="PEG" value={v.peg ?? ''} onChange={u('peg')} hint="成长性修正PE" />
        <F label="股息率" value={v.dividendYield ?? ''} onChange={u('dividendYield')} />
        <F label="市值" value={v.marketCap ?? ''} onChange={u('marketCap')} />
      </G3>

      <SL text="财务质量" />
      <G3>
        <F label="营收" value={v.revenue ?? ''} onChange={u('revenue')} />
        <F label="营收增速" value={v.revenueGrowth ?? ''} onChange={u('revenueGrowth')} />
        <F label="毛利率" value={v.grossMargin ?? ''} onChange={u('grossMargin')} />
        <F label="营业利润率" value={v.operatingMargin ?? ''} onChange={u('operatingMargin')} />
        <F label="净利润率" value={v.netMargin ?? ''} onChange={u('netMargin')} />
        <F label="自由现金流" value={v.freeCashFlow ?? ''} onChange={u('freeCashFlow')} />
        <F label="FCF Yield" value={v.fcfYield ?? ''} onChange={u('fcfYield')} hint="FCF/市值" />
        <F label="EPS" value={v.eps ?? ''} onChange={u('eps')} />
        <F label="EPS增速" value={v.epsGrowth ?? ''} onChange={u('epsGrowth')} />
        <F label="ROE" value={v.roe ?? ''} onChange={u('roe')} />
        <F label="ROIC" value={v.roic ?? ''} onChange={u('roic')} hint="投入资本回报" />
        <F label="债务/权益" value={v.debtEquity ?? ''} onChange={u('debtEquity')} />
      </G3>

      <SL text="资金面" />
      <G2>
        <F label="机构持仓" value={v.institutionHolding ?? ''} onChange={u('institutionHolding')} />
        <F label="内部人买入" value={v.insiderBuying ?? ''} onChange={u('insiderBuying')} />
        <F label="做空比例" value={v.shortInterest ?? ''} onChange={u('shortInterest')} />
        <F label="Put/Call" value={v.putCallRatio ?? ''} onChange={u('putCallRatio')} />
      </G2>

      <SL text="分析师" />
      <G3>
        <F label="分析师评级" value={v.analystConsensus ?? ''} onChange={u('analystConsensus')} placeholder="Strong Buy/Buy/Hold" />
        <F label="目标价" value={v.priceTarget ?? ''} onChange={u('priceTarget')} />
        <F label="上行空间" value={v.upside ?? ''} onChange={u('upside')} placeholder="e.g. +25%" />
      </G3>

      <SL text="护城河" />
      <FM label="护城河" value={v.moat ?? ''} onChange={u('moat')}
        placeholder="品牌/网络效应/成本优势/转换成本/无形资产..." />
      <FM label="竞争优势" value={v.competitiveAdvantage ?? ''} onChange={u('competitiveAdvantage')} />
      <FM label="商业模式" value={v.businessModel ?? ''} onChange={u('businessModel')} />

      <SL text="风险与信号" />
      <FM label="主要风险" value={v.keyRisks ?? ''} onChange={u('keyRisks')} />
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

// 完整市场表单（宏观 + 板块 + 个股）
function MarketForm({ label, value, onChange }: {
  label: string;
  value?: StockMarketData;
  onChange: (v: StockMarketData) => void;
}) {
  const [innerTab, setInnerTab] = useState<'macro' | 'sector' | 'stock'>('macro');
  const v = value ?? {};

  const addStock = () => {
    onChange({
      ...v,
      watchlist: [...(v.watchlist ?? []), {}],
    });
  };

  const updateStock = (idx: number, stock: SingleStock) => {
    const list = [...(v.watchlist ?? [])];
    list[idx] = stock;
    onChange({ ...v, watchlist: list });
  };

  const removeStock = (idx: number) => {
    const list = [...(v.watchlist ?? [])];
    list.splice(idx, 1);
    onChange({ ...v, watchlist: list });
  };

  return (
    <div className="space-y-3">
      {/* 内层Tab */}
      <div className="flex gap-1 border-b border-slate-100 pb-2">
        {([
          { id: 'macro',  label: '📊 市场宏观' },
          { id: 'sector', label: '🏭 板块分析' },
          { id: 'stock',  label: '📈 个股研究' },
        ] as const).map(t => (
          <button key={t.id} onClick={() => setInnerTab(t.id)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all
              ${innerTab === t.id ? 'bg-slate-700 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {innerTab === 'macro' && (
        <MarketMacroForm label={label} value={v.macro}
          onChange={m => onChange({ ...v, macro: m })} />
      )}

      {innerTab === 'sector' && (
        <div className="space-y-3">
          {SECTOR_KEYS.map(({ key, label: sl }) => (
            <SectorForm key={key} sectorLabel={sl}
              value={v[key] as StockSector | undefined}
              onChange={sec => onChange({ ...v, [key]: sec })} />
          ))}
        </div>
      )}

      {innerTab === 'stock' && (
        <div className="space-y-4">
          {(v.watchlist ?? []).map((stock, idx) => (
            <SingleStockForm key={idx} value={stock}
              onChange={s => updateStock(idx, s)}
              onRemove={() => removeStock(idx)} />
          ))}
          <button onClick={addStock}
            className="w-full py-3 border border-dashed border-amber-300 rounded-2xl text-xs font-medium text-amber-600 hover:bg-amber-50 transition-all">
            + 添加个股
          </button>
          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">市场综合信号</label>
            <div className="flex gap-2 flex-wrap">
              {SIGNAL_OPTIONS.map(o => (
                <button key={o.value} type="button"
                  onClick={() => onChange({ ...v, investmentSignal: o.value })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                    ${v.investmentSignal === o.value ? o.color : 'bg-white border-slate-200 text-slate-400'}`}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          <FM label="市场分析笔记" value={v.analystNotes ?? ''}
            onChange={n => onChange({ ...v, analystNotes: n })} />
        </div>
      )}
    </div>
  );
}

export default function StockForm({ data, onChange }: Props) {
  const [market, setMarket] = useState('usStock');

  const MARKET_LABELS: Record<string, string> = {
    usStock: '美股', hkStock: '港股', chinaAShare: 'A股',
    europeStock: '欧股', japanStock: '日股', koreaStock: '韩股',
    taiwanStock: '台股', seaStock: '东南亚', indiaStock: '印度', southAmericaStock: '南美',
  };

  const set = (key: keyof StockData) => (val: StockMarketData) =>
    onChange({ ...data, [key]: val });

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-1 flex-wrap px-1 py-2 border-b border-slate-100 bg-slate-50/50 shrink-0">
        {MARKET_TABS.map(t => (
          <button key={t.id} onClick={() => setMarket(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap
              ${market === t.id ? 'bg-amber-500 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <MarketForm
          label={MARKET_LABELS[market] ?? market}
          value={data[market as keyof StockData] as StockMarketData | undefined}
          onChange={set(market as keyof StockData)}
        />
      </div>
    </div>
  );
}