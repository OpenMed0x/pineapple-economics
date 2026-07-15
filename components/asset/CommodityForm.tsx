"use client";

import React, { useState } from 'react';
import { DetailedCommodityData, CommodityDetailItem, SignalStrength } from '../../types/asset';

interface CommodityFormProps {
  data: DetailedCommodityData;
  onChange: (d: DetailedCommodityData) => void;
}

const SIGNAL_OPTIONS: { value: SignalStrength; label: string; color: string }[] = [
  { value: 'strong_buy',  label: '强烈看多', color: 'bg-emerald-500 text-white border-emerald-500' },
  { value: 'buy',         label: '偏多',     color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'neutral',     label: '中性',     color: 'bg-slate-100 text-slate-600 border-slate-200' },
  { value: 'sell',        label: '偏空',     color: 'bg-rose-100 text-rose-700 border-rose-200' },
  { value: 'strong_sell', label: '强烈看空', color: 'bg-rose-500 text-white border-rose-500' },
];

const TABS = [
  { id: 'energy',     label: '⛽ 能源' },
  { id: 'precious',   label: '🥇 贵金属' },
  { id: 'industrial', label: '🔩 工业金属' },
  { id: 'ferrous',    label: '⚙️ 黑色系' },
  { id: 'agri',       label: '🌾 农产品' },
  { id: 'soft',       label: '☕ 软商品' },
  { id: 'overall',    label: '综合研判' },
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

function CommodityBlock({
  label, value, onChange, extraSupply, extraDemand, extraMacro,
}: {
  label: string;
  value?: CommodityDetailItem;
  onChange: (v: CommodityDetailItem) => void;
  extraSupply?: React.ReactNode;
  extraDemand?: React.ReactNode;
  extraMacro?: React.ReactNode;
}) {
  const v = value ?? {};
  const u = (key: keyof CommodityDetailItem) => (val: string) => onChange({ ...v, [key]: val });

  return (
    <div className="border border-slate-100 rounded-2xl p-4 space-y-3 bg-slate-50/20">
      <p className="text-sm font-semibold text-slate-800">{label}</p>

      <SL text="市场行情" />
      <G2>
        <F label="最新价格" value={v.price ?? ''} onChange={u('price')} />
        <F label="涨跌%" value={v.changePct ?? ''} onChange={u('changePct')} />
        <F label="52周最高" value={v.week52High ?? ''} onChange={u('week52High')} />
        <F label="52周最低" value={v.week52Low ?? ''} onChange={u('week52Low')} />
        <F label="成交量" value={v.volume ?? ''} onChange={u('volume')} />
      </G2>

      <SL text="供给" />
      {extraSupply ?? (
        <G2>
          <F label="全球矿山产量" value={v.globalProduction ?? ''} onChange={u('globalProduction')} />
          <F label="主产国1" value={v.keyProducer1 ?? ''} onChange={u('keyProducer1')} />
          <F label="主产国2" value={v.keyProducer2 ?? ''} onChange={u('keyProducer2')} />
          <F label="LME库存" value={v.lmeInventory ?? ''} onChange={u('lmeInventory')} />
          <F label="上海库存" value={v.shInventory ?? ''} onChange={u('shInventory')} />
          <F label="废料/再生供给" value={v.scrapSupply ?? ''} onChange={u('scrapSupply')} />
        </G2>
      )}

      <SL text="需求" />
      {extraDemand ?? (
        <G2>
          <F label="中国消费" value={v.chinaConsumption ?? ''} onChange={u('chinaConsumption')} />
          <F label="欧美消费" value={v.usEuConsumption ?? ''} onChange={u('usEuConsumption')} />
          <F label="新能源需求" value={v.evDemand ?? ''} onChange={u('evDemand')} />
          <F label="建筑需求" value={v.constructionDemand ?? ''} onChange={u('constructionDemand')} />
          <F label="制造业需求" value={v.manufacturingDemand ?? ''} onChange={u('manufacturingDemand')} />
          <F label="其他需求" value={v.otherDemand ?? ''} onChange={u('otherDemand')} />
        </G2>
      )}

      <SL text="宏观" />
      <G2>
        <F label="美元指数 DXY" value={v.dxy ?? ''} onChange={u('dxy')} />
        <F label="美联储利率" value={v.fedRate ?? ''} onChange={u('fedRate')} />
        <F label="中国 PMI" value={v.chinaPmi ?? ''} onChange={u('chinaPmi')} />
        <F label="美国 PMI" value={v.usPmi ?? ''} onChange={u('usPmi')} />
        <F label="全球 PMI" value={v.globalPmi ?? ''} onChange={u('globalPmi')} />
        <F label="GDP 增速" value={v.gdp ?? ''} onChange={u('gdp')} />
      </G2>
      {extraMacro}

      <SL text="风险" />
      <G2>
        <F label="罢工风险" value={v.strikeRisk ?? ''} onChange={u('strikeRisk')} placeholder="高/中/低" />
        <F label="战争/地缘" value={v.warRisk ?? ''} onChange={u('warRisk')} />
        <F label="天气影响" value={v.weatherRisk ?? ''} onChange={u('weatherRisk')} />
        <F label="出口限制" value={v.exportRestriction ?? ''} onChange={u('exportRestriction')} />
        <F label="环保政策" value={v.envPolicy ?? ''} onChange={u('envPolicy')} />
        <F label="地缘政治" value={v.geopolitical ?? ''} onChange={u('geopolitical')} />
      </G2>

      <div className="space-y-1">
        <label className="text-xs font-medium text-slate-500">投资信号</label>
        <div className="flex gap-2 flex-wrap">
          {SIGNAL_OPTIONS.map(o => (
            <button key={o.value} type="button"
              onClick={() => onChange({ ...v, investmentSignal: o.value })}
              className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${v.investmentSignal === o.value ? o.color : 'bg-white border-slate-200 text-slate-400'}`}>
              {o.label}
            </button>
          ))}
        </div>
      </div>
      <F label="价格预测" value={v.forecast ?? ''} onChange={u('forecast')} placeholder="12个月目标价..." />
      <FM label="分析笔记" value={v.analystNotes ?? ''} onChange={u('analystNotes')} />
    </div>
  );
}

export default function CommodityForm({ data, onChange }: CommodityFormProps) {
  const [tab, setTab] = useState('energy');

  const set = <K extends keyof DetailedCommodityData>(key: K) =>
    (val: DetailedCommodityData[K]) => onChange({ ...data, [key]: val });

  const getItem = (key: keyof DetailedCommodityData): CommodityDetailItem =>
    ((data[key] ?? {}) as CommodityDetailItem);

  const uField = (itemKey: keyof DetailedCommodityData, fieldKey: keyof CommodityDetailItem) =>
    (val: string) => {
      const current = getItem(itemKey);
      onChange({ ...data, [itemKey]: { ...current, [fieldKey]: val } });
    };

  const SignalSelect = () => (
    <div className="space-y-1">
      <label className="text-xs font-medium text-slate-500">综合大宗商品信号</label>
      <div className="flex gap-2 flex-wrap">
        {SIGNAL_OPTIONS.map(o => (
          <button key={o.value} type="button"
            onClick={() => onChange({ ...data, investmentSignal: o.value })}
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
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${tab === t.id ? 'bg-amber-500 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-1 py-4 space-y-5">

        {tab === 'energy' && (<>
          <CommodityBlock label="WTI 原油" value={data.wti} onChange={set('wti')}
            extraSupply={
              <G2>
                <F label="OPEC 产量" value={getItem('wti').opecProduction ?? ''} onChange={uField('wti', 'opecProduction')} placeholder="mbpd" />
                <F label="美国页岩油产量" value={getItem('wti').usShaleOutput ?? ''} onChange={uField('wti', 'usShaleOutput')} />
                <F label="EIA 库存" value={getItem('wti').eiaInventory ?? ''} onChange={uField('wti', 'eiaInventory')} hint="周度" />
                <F label="炼厂开工率" value={getItem('wti').refineryRate ?? ''} onChange={uField('wti', 'refineryRate')} />
              </G2>
            }
            extraDemand={
              <G2>
                <F label="需求预测" value={getItem('wti').demandForecast ?? ''} onChange={uField('wti', 'demandForecast')} hint="IEA/OPEC" />
                <F label="中国消费" value={getItem('wti').chinaConsumption ?? ''} onChange={uField('wti', 'chinaConsumption')} />
                <F label="欧美消费" value={getItem('wti').usEuConsumption ?? ''} onChange={uField('wti', 'usEuConsumption')} />
              </G2>
            }
          />
          <CommodityBlock label="Brent 原油" value={data.brent} onChange={set('brent')}
            extraSupply={
              <G2>
                <F label="OPEC 产量" value={getItem('brent').opecProduction ?? ''} onChange={uField('brent', 'opecProduction')} />
                <F label="EIA 库存" value={getItem('brent').eiaInventory ?? ''} onChange={uField('brent', 'eiaInventory')} />
              </G2>
            }
          />
          <CommodityBlock label="天然气（Henry Hub）" value={data.henryHub} onChange={set('henryHub')} />
          <CommodityBlock label="欧洲天然气（TTF）" value={data.ttfGas} onChange={set('ttfGas')} />
          <CommodityBlock label="液化天然气（LNG）" value={data.lng} onChange={set('lng')} />
          <CommodityBlock label="柴油" value={data.diesel} onChange={set('diesel')} />
          <CommodityBlock label="汽油" value={data.gasoline} onChange={set('gasoline')} />
          <CommodityBlock label="煤炭（澳洲煤）" value={data.coal} onChange={set('coal')} />
        </>)}

        {tab === 'precious' && (<>
          <CommodityBlock label="黄金 Gold" value={data.gold} onChange={set('gold')}
            extraSupply={
              <G2>
                <F label="矿山供给" value={getItem('gold').globalProduction ?? ''} onChange={uField('gold', 'globalProduction')} />
                <F label="COMEX 库存" value={getItem('gold').otherInventory ?? ''} onChange={uField('gold', 'otherInventory')} />
                <F label="央行购金" value={getItem('gold').cbGoldBuying ?? ''} onChange={uField('gold', 'cbGoldBuying')} />
                <F label="ETF 持仓" value={getItem('gold').etfHolding ?? ''} onChange={uField('gold', 'etfHolding')} />
              </G2>
            }
            extraDemand={
              <G2>
                <F label="珠宝需求" value={getItem('gold').otherDemand ?? ''} onChange={uField('gold', 'otherDemand')} />
                <F label="工业需求" value={getItem('gold').manufacturingDemand ?? ''} onChange={uField('gold', 'manufacturingDemand')} />
              </G2>
            }
            extraMacro={
              <G2>
                <F label="实际利率 TIPS" value={getItem('gold').realYield ?? ''} onChange={uField('gold', 'realYield')} hint="负相关" />
              </G2>
            }
          />
          <CommodityBlock label="白银 Silver" value={data.silver} onChange={set('silver')} />
          <CommodityBlock label="铂金 Platinum" value={data.platinum} onChange={set('platinum')} />
          <CommodityBlock label="钯金 Palladium" value={data.palladium} onChange={set('palladium')} />
        </>)}

        {tab === 'industrial' && (<>
          {(['copper','aluminum','nickel','zinc','lead','tin','lithium','cobalt','rareEarth'] as const).map(key => {
            const LABELS: Record<string, string> = {
              copper:'铜 Copper', aluminum:'铝 Aluminum', nickel:'镍 Nickel',
              zinc:'锌 Zinc', lead:'铅 Lead', tin:'锡 Tin',
              lithium:'锂 Lithium', cobalt:'钴 Cobalt', rareEarth:'稀土 Rare Earth',
            };
            return <CommodityBlock key={key} label={LABELS[key]} value={data[key]} onChange={set(key)} />;
          })}
        </>)}

        {tab === 'ferrous' && (<>
          {(['ironOre','rebar','hotRolled','cokingCoal','coke'] as const).map(key => {
            const LABELS: Record<string, string> = {
              ironOre:'铁矿石', rebar:'螺纹钢', hotRolled:'热卷', cokingCoal:'焦煤', coke:'焦炭',
            };
            return (
              <CommodityBlock key={key} label={LABELS[key]} value={data[key]} onChange={set(key)}
                extraSupply={
                  <G2>
                    <F label="全球产量" value={getItem(key).globalProduction ?? ''} onChange={uField(key, 'globalProduction')} />
                    <F label="港口库存" value={getItem(key).otherInventory ?? ''} onChange={uField(key, 'otherInventory')} />
                  </G2>
                }
                extraDemand={
                  <G2>
                    <F label="粗钢产量" value={getItem(key).crudeProduction ?? ''} onChange={uField(key, 'crudeProduction')} />
                    <F label="钢厂利润" value={getItem(key).steelMillMargin ?? ''} onChange={uField(key, 'steelMillMargin')} />
                    <F label="房地产需求" value={getItem(key).realEstateDemand ?? ''} onChange={uField(key, 'realEstateDemand')} />
                    <F label="基建需求" value={getItem(key).infraDemand ?? ''} onChange={uField(key, 'infraDemand')} />
                  </G2>
                }
              />
            );
          })}
        </>)}

        {tab === 'agri' && (<>
          {(['corn','wheat','soybean','rice','cotton','rapeseed'] as const).map(key => {
            const LABELS: Record<string, string> = {
              corn:'玉米', wheat:'小麦', soybean:'大豆', rice:'大米', cotton:'棉花', rapeseed:'菜籽',
            };
            return (
              <CommodityBlock key={key} label={LABELS[key]} value={data[key]} onChange={set(key)}
                extraSupply={
                  <G2>
                    <F label="库存" value={getItem(key).otherInventory ?? ''} onChange={uField(key, 'otherInventory')} />
                    <F label="种植面积" value={getItem(key).plantingArea ?? ''} onChange={uField(key, 'plantingArea')} />
                    <F label="单产" value={getItem(key).yieldPerAcre ?? ''} onChange={uField(key, 'yieldPerAcre')} />
                  </G2>
                }
                extraMacro={
                  <>
                    <F label="USDA 报告摘要" value={getItem(key).usdaReport ?? ''} onChange={uField(key, 'usdaReport')} />
                    <F label="天气影响" value={getItem(key).weather ?? ''} onChange={uField(key, 'weather')} />
                  </>
                }
              />
            );
          })}
        </>)}

        {tab === 'soft' && (<>
          {(['coffee','cocoa','sugar','oj','rubber'] as const).map(key => {
            const LABELS: Record<string, string> = {
              coffee:'咖啡', cocoa:'可可', sugar:'糖', oj:'橙汁', rubber:'橡胶',
            };
            return <CommodityBlock key={key} label={LABELS[key]} value={data[key]} onChange={set(key)} />;
          })}
        </>)}

        {tab === 'overall' && (<>
          <SL text="大宗商品综合指数" />
          <G2>
            <F label="CRB 综合指数" value={data.crbIndex ?? ''} onChange={v => onChange({ ...data, crbIndex: v })} />
            <F label="Bloomberg 大宗商品指数" value={data.bloombergCommodity ?? ''} onChange={v => onChange({ ...data, bloombergCommodity: v })} />
          </G2>
          <SignalSelect />
          <FM label="整体展望" value={data.overallOutlook ?? ''} onChange={v => onChange({ ...data, overallOutlook: v })} />
          <FM label="分析笔记" value={data.analystNotes ?? ''} onChange={v => onChange({ ...data, analystNotes: v })} />
        </>)}

      </div>
    </div>
  );
}