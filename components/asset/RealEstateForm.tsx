"use client";

import React, { useState } from 'react';
import {
  RealEstateData, REMacro, CityREData, RESubMarket, SignalStrength
} from '../../types/asset';

interface Props {
  data: RealEstateData;
  onChange: (d: RealEstateData) => void;
}

const SIGNAL_OPTIONS: { value: SignalStrength; label: string; color: string }[] = [
  { value: 'strong_buy',  label: '强烈看多', color: 'bg-emerald-500 text-white border-emerald-500' },
  { value: 'buy',         label: '偏多',     color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'neutral',     label: '中性',     color: 'bg-slate-100 text-slate-600 border-slate-200' },
  { value: 'sell',        label: '偏空',     color: 'bg-rose-100 text-rose-700 border-rose-200' },
  { value: 'strong_sell', label: '强烈看空', color: 'bg-rose-500 text-white border-rose-500' },
];

const CITY_GROUPS = [
  { id: 'us', label: '🇺🇸 美国', cities: [
    { key: 'newYork', label: 'New York' }, { key: 'losAngeles', label: 'Los Angeles' },
    { key: 'sanFrancisco', label: 'San Francisco' }, { key: 'miami', label: 'Miami' },
    { key: 'austin', label: 'Austin' }, { key: 'seattle', label: 'Seattle' },
    { key: 'boston', label: 'Boston' }, { key: 'dallas', label: 'Dallas' },
  ]},
  { id: 'china', label: '🇨🇳 中国', cities: [
    { key: 'beijing', label: '北京' }, { key: 'shanghai', label: '上海' },
    { key: 'shenzhen', label: '深圳' }, { key: 'guangzhou', label: '广州' },
    { key: 'hangzhou', label: '杭州' }, { key: 'chengdu', label: '成都' },
    { key: 'chongqing', label: '重庆' }, { key: 'suzhou', label: '苏州' },
  ]},
  { id: 'japan', label: '🇯🇵 日本', cities: [
    { key: 'tokyo', label: '东京' }, { key: 'osaka', label: '大阪' },
  ]},
  { id: 'asia', label: '🌏 亚洲', cities: [
    { key: 'hongkong', label: '香港' }, { key: 'taipei', label: '台北' },
    { key: 'seoul', label: '首尔' },
  ]},
  { id: 'europe', label: '🇪🇺 欧洲', cities: [
    { key: 'london', label: '伦敦' }, { key: 'paris', label: '巴黎' },
    { key: 'berlin', label: '柏林' }, { key: 'amsterdam', label: '阿姆斯特丹' },
    { key: 'madrid', label: '马德里' },
  ]},
  { id: 'sea', label: '🌏 东南亚', cities: [
    { key: 'singapore', label: '新加坡' }, { key: 'bangkok', label: '曼谷' },
    { key: 'kualaLumpur', label: '吉隆坡' }, { key: 'jakarta', label: '雅加达' },
    { key: 'hochiminh', label: '胡志明市' }, { key: 'manila', label: '马尼拉' },
  ]},
  { id: 'me', label: '🌍 中东', cities: [
    { key: 'dubai', label: '迪拜' }, { key: 'riyadh', label: '利雅得' },
    { key: 'abuDhabi', label: '阿布扎比' },
  ]},
  { id: 'sa', label: '🌎 南美', cities: [
    { key: 'saoPaulo', label: '圣保罗' }, { key: 'buenosAires', label: '布宜诺斯艾利斯' },
    { key: 'santiago', label: '圣地亚哥' },
  ]},
] as const;

// ── 基础表单组件 ──────────────────────────────────────

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
  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-3 pb-1 border-b border-slate-100">{text}</p>
);

const Signal = ({ value, onChange }: { value?: SignalStrength; onChange: (v: SignalStrength) => void }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-slate-500">投资信号</label>
    <div className="flex gap-2 flex-wrap">
      {SIGNAL_OPTIONS.map(o => (
        <button key={o.value} type="button" onClick={() => onChange(o.value)}
          className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${value === o.value ? o.color : 'bg-white border-slate-200 text-slate-400'}`}>
          {o.label}
        </button>
      ))}
    </div>
  </div>
);

// ── 宏观层 ────────────────────────────────────────────

function MacroForm({ value, onChange }: { value?: REMacro; onChange: (v: REMacro) => void }) {
  const v = value ?? {};
  const u = (key: keyof REMacro) => (val: string) => onChange({ ...v, [key]: val });

  return (
    <div className="space-y-4">
      <SL text="全球宏观" />
      <G2>
        <F label="全球利率环境" value={v.globalRateEnv ?? ''} onChange={u('globalRateEnv')} placeholder="加息/降息周期..." />
        <F label="房贷利率趋势" value={v.mortgageRateTrend ?? ''} onChange={u('mortgageRateTrend')} />
        <F label="全球资本流向" value={v.globalCapitalFlow ?? ''} onChange={u('globalCapitalFlow')} />
        <F label="全球RE指数" value={v.globalREIndex ?? ''} onChange={u('globalREIndex')} hint="MSCI RE" />
        <F label="REITs表现" value={v.reitsPerformance ?? ''} onChange={u('reitsPerformance')} />
      </G2>
      <SL text="美国宏观" />
      <G2>
        <F label="30Y房贷利率" value={v.usMortgage30y ?? ''} onChange={u('usMortgage30y')} placeholder="e.g. 7.2%" />
        <F label="15Y房贷利率" value={v.usMortgage15y ?? ''} onChange={u('usMortgage15y')} />
        <F label="Case-Shiller全国" value={v.usCaseShiller ?? ''} onChange={u('usCaseShiller')} />
        <F label="新屋开工" value={v.usHousingStarts ?? ''} onChange={u('usHousingStarts')} />
        <F label="成屋销售" value={v.usExistingHomeSales ?? ''} onChange={u('usExistingHomeSales')} />
        <F label="NAR可负担指数" value={v.usNAR ?? ''} onChange={u('usNAR')} hint="越低越难负担" />
        <F label="全美法拍数量" value={v.usForeclosure ?? ''} onChange={u('usForeclosure')} />
      </G2>
      <SL text="中国宏观" />
      <G2>
        <F label="LPR 5年期" value={v.cnLpr5y ?? ''} onChange={u('cnLpr5y')} />
        <F label="70城房价指数" value={v.cn70CityIndex ?? ''} onChange={u('cn70CityIndex')} />
        <F label="房地产开发投资" value={v.cnRealEstateInvestment ?? ''} onChange={u('cnRealEstateInvestment')} placeholder="YTD YoY%" />
        <F label="土地出让收入" value={v.cnLandSales ?? ''} onChange={u('cnLandSales')} />
        <F label="商品房销售面积" value={v.cnSalesArea ?? ''} onChange={u('cnSalesArea')} placeholder="YoY%" />
        <F label="房企债务风险" value={v.cnDeveloperDebt ?? ''} onChange={u('cnDeveloperDebt')} />
      </G2>
      <SL text="政策" />
      <FM label="Fed 政策" value={v.fedPolicy ?? ''} onChange={u('fedPolicy')} />
      <FM label="PBOC 政策" value={v.pbocPolicy ?? ''} onChange={u('pbocPolicy')} />
      <FM label="宏观审慎政策" value={v.macroprudential ?? ''} onChange={u('macroprudential')} placeholder="LTV上限、压力测试、限购限贷..." />
      <Signal value={v.investmentSignal} onChange={v2 => onChange({ ...v, investmentSignal: v2 })} />
      <FM label="整体展望" value={v.overallOutlook ?? ''} onChange={u('overallOutlook')} />
      <FM label="分析师笔记" value={v.analystNotes ?? ''} onChange={u('analystNotes')} />
    </div>
  );
}

// ── 城市层 ────────────────────────────────────────────

function CityForm({ label, value, onChange }: {
  label: string;
  value?: CityREData;
  onChange: (v: CityREData) => void;
}) {
  const v = value ?? {};
  const u = (key: keyof CityREData) => (val: string) => onChange({ ...v, [key]: val });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <span className="text-base font-bold text-slate-800">🏙️ {label}</span>
      </div>

      <SL text="价格" />
      <G2>
        <F label="房价指数" value={v.priceIndex ?? ''} onChange={u('priceIndex')} hint="CS/HPI" />
        <F label="中位房价" value={v.medianPrice ?? ''} onChange={u('medianPrice')} placeholder="e.g. $850K / ¥600万" />
        <F label="平方米单价" value={v.pricePerSqm ?? ''} onChange={u('pricePerSqm')} />
        <F label="成交均价" value={v.avgTransactionPrice ?? ''} onChange={u('avgTransactionPrice')} />
        <F label="豪宅均价 (Top 10%)" value={v.luxuryPrice ?? ''} onChange={u('luxuryPrice')} />
        <F label="近1年涨跌" value={v.change1y ?? ''} onChange={u('change1y')} placeholder="e.g. +8.5%" />
        <F label="近5年涨跌" value={v.change5y ?? ''} onChange={u('change5y')} placeholder="e.g. +45%" />
      </G2>
      <FM label="历史走势" value={v.priceHistory ?? ''} onChange={u('priceHistory')} placeholder="简述价格周期..." />

      <SL text="租赁市场" />
      <G2>
        <F label="平均月租金" value={v.avgRent ?? ''} onChange={u('avgRent')} />
        <F label="租金增长率 YoY" value={v.rentGrowth ?? ''} onChange={u('rentGrowth')} />
        <F label="出租率" value={v.occupancyRate ?? ''} onChange={u('occupancyRate')} placeholder="e.g. 95%" />
        <F label="租售比" value={v.priceToRentRatio ?? ''} onChange={u('priceToRentRatio')} hint="月租/房价" placeholder="e.g. 1:400" />
        <F label="毛租金收益率" value={v.grossRentalYield ?? ''} onChange={u('grossRentalYield')} hint="年租/房价" placeholder="e.g. 3.5%" />
        <F label="净租金收益率" value={v.netRentalYield ?? ''} onChange={u('netRentalYield')} hint="扣税费后" placeholder="e.g. 2.8%" />
      </G2>

      <SL text="供给" />
      <G2>
        <F label="月库存（去化周期）" value={v.monthsSupply ?? ''} onChange={u('monthsSupply')} hint="<3紧缺 >6过剩" placeholder="e.g. 2.8个月" />
        <F label="挂牌待售数量" value={v.activeListings ?? ''} onChange={u('activeListings')} />
        <F label="新开工住宅" value={v.newHousingStarts ?? ''} onChange={u('newHousingStarts')} />
        <F label="建筑许可" value={v.buildingPermits ?? ''} onChange={u('buildingPermits')} hint="领先6-12月" />
        <F label="空置率" value={v.vacancyRate ?? ''} onChange={u('vacancyRate')} />
        <F label="竣工率" value={v.completionRate ?? ''} onChange={u('completionRate')} />
      </G2>

      <SL text="需求" />
      <G2>
        <F label="成交量" value={v.salesVolume ?? ''} onChange={u('salesVolume')} />
        <F label="成交套数" value={v.unitsSold ?? ''} onChange={u('unitsSold')} />
        <F label="Pending Sales" value={v.pendingSales ?? ''} onChange={u('pendingSales')} hint="领先指标" />
        <F label="Mortgage Applications" value={v.mortgageApplications ?? ''} onChange={u('mortgageApplications')} hint="领先指标" />
        <F label="首次购房者比例" value={v.firstTimeBuyerPct ?? ''} onChange={u('firstTimeBuyerPct')} placeholder="e.g. 32%" />
        <F label="投资客比例" value={v.investorPct ?? ''} onChange={u('investorPct')} />
        <F label="境外买家比例" value={v.foreignBuyerPct ?? ''} onChange={u('foreignBuyerPct')} />
      </G2>

      <SL text="融资" />
      <G2>
        <F label="30年房贷利率" value={v.mortgage30y ?? ''} onChange={u('mortgage30y')} />
        <F label="15年房贷利率" value={v.mortgage15y ?? ''} onChange={u('mortgage15y')} />
        <F label="平均贷款利率" value={v.avgLoanRate ?? ''} onChange={u('avgLoanRate')} />
        <F label="贷款价值比 LTV" value={v.ltvRatio ?? ''} onChange={u('ltvRatio')} hint="越高杠杆越大" placeholder="e.g. 80%" />
        <F label="债务收入比 DTI" value={v.dtiRatio ?? ''} onChange={u('dtiRatio')} hint="压力测试核心" placeholder="e.g. 43%" />
        <F label="贷款批准率" value={v.loanApprovalRate ?? ''} onChange={u('loanApprovalRate')} />
        <F label="违约率" value={v.defaultRate ?? ''} onChange={u('defaultRate')} />
        <F label="法拍数量" value={v.foreclosures ?? ''} onChange={u('foreclosures')} hint="滞后风险信号" />
      </G2>

      <SL text="人口与社会" />
      <G2>
        <F label="人口增长率" value={v.popGrowthRate ?? ''} onChange={u('popGrowthRate')} />
        <F label="净迁入/迁出" value={v.netMigration ?? ''} onChange={u('netMigration')} hint="正=迁入" placeholder="e.g. +50,000/年" />
        <F label="新增家庭数" value={v.newHouseholds ?? ''} onChange={u('newHouseholds')} hint="住房有效需求" />
        <F label="家庭收入中位数" value={v.householdIncome ?? ''} onChange={u('householdIncome')} />
        <F label="可负担指数" value={v.affordabilityIndex ?? ''} onChange={u('affordabilityIndex')} hint="收入/还款能力" />
        <F label="大学毕业率" value={v.collegeGradRate ?? ''} onChange={u('collegeGradRate')} hint="人才吸引力" />
      </G2>

      <SL text="经济" />
      <G2>
        <F label="城市 GDP" value={v.gdp ?? ''} onChange={u('gdp')} />
        <F label="工资增长率" value={v.wageGrowth ?? ''} onChange={u('wageGrowth')} />
        <F label="失业率" value={v.unemployment ?? ''} onChange={u('unemployment')} />
        <F label="就业增长率" value={v.jobGrowth ?? ''} onChange={u('jobGrowth')} />
        <F label="人均 GDP" value={v.gdpPerCapita ?? ''} onChange={u('gdpPerCapita')} hint="购买力代理" />
        <F label="高净值人口 HNWI" value={v.hnwi ?? ''} onChange={u('hnwi')} />
        <F label="Fortune500总部数" value={v.fortune500Hq ?? ''} onChange={u('fortune500Hq')} hint="可选" />
      </G2>

      <SL text="政策" />
      <G2>
        <F label="房产税率" value={v.propertyTax ?? ''} onChange={u('propertyTax')} placeholder="e.g. 1.2%/年" />
        <F label="印花税" value={v.stampDuty ?? ''} onChange={u('stampDuty')} placeholder="部分城市适用" />
        <F label="租金管制" value={v.rentControl ?? ''} onChange={u('rentControl')} placeholder="有/无/部分" />
        <F label="外国人购房政策" value={v.foreignBuyerPolicy ?? ''} onChange={u('foreignBuyerPolicy')} />
        <F label="土地政策" value={v.landPolicy ?? ''} onChange={u('landPolicy')} />
        <F label="住房补贴" value={v.housingSubsidy ?? ''} onChange={u('housingSubsidy')} />
        <F label="冷却措施" value={v.coolMeasures ?? ''} onChange={u('coolMeasures')} placeholder="限购/限贷/空置税..." />
        <F label="税收优惠" value={v.taxIncentive ?? ''} onChange={u('taxIncentive')} />
      </G2>

      <SL text="风险" />
      <G2>
        <F label="泡沫指数" value={v.bubbleIndex ?? ''} onChange={u('bubbleIndex')} hint="UBS RE Bubble" />
        <F label="可负担性风险" value={v.affordabilityRisk ?? ''} onChange={u('affordabilityRisk')} placeholder="高/中/低" />
        <F label="空置率风险" value={v.vacancyRisk ?? ''} onChange={u('vacancyRisk')} />
        <F label="自然灾害风险" value={v.naturalDisasterRisk ?? ''} onChange={u('naturalDisasterRisk')} />
        <F label="洪水风险" value={v.floodRisk ?? ''} onChange={u('floodRisk')} />
        <F label="气候长期风险" value={v.climateRisk ?? ''} onChange={u('climateRisk')} hint="海平面/极端天气" />
        <F label="犯罪率" value={v.crimeRate ?? ''} onChange={u('crimeRate')} />
        <F label="保险成本" value={v.insuranceCost ?? ''} onChange={u('insuranceCost')} placeholder="$/年" />
        <F label="政策风险" value={v.policyRisk ?? ''} onChange={u('policyRisk')} />
      </G2>

      <Signal value={v.investmentSignal} onChange={v2 => onChange({ ...v, investmentSignal: v2 })} />
      <FM label="分析笔记" value={v.analystNotes ?? ''} onChange={u('analystNotes')} />
    </div>
  );
}

// ── 细分市场层 ────────────────────────────────────────

function SubMarketForm({ value, onChange }: { value?: RESubMarket; onChange: (v: RESubMarket) => void }) {
  const v = value ?? {};
  const u = (key: keyof RESubMarket) => (val: string) => onChange({ ...v, [key]: val });
  return (
    <div className="space-y-4">
      <SL text="细分市场分析" />
      <FM label="住宅（Residential）" value={v.residential ?? ''} onChange={u('residential')} placeholder="供需、价格、投资机会..." />
      <FM label="商业地产（Commercial）" value={v.commercial ?? ''} onChange={u('commercial')} />
      <FM label="写字楼（Office）" value={v.office ?? ''} onChange={u('office')} placeholder="空置率、租金、远程办公影响..." />
      <FM label="零售（Retail）" value={v.retail ?? ''} onChange={u('retail')} placeholder="人流、电商冲击、重建利用..." />
      <FM label="工业/仓储（Industrial）" value={v.industrial ?? ''} onChange={u('industrial')} placeholder="电商驱动需求、供应链仓库..." />
      <FM label="数据中心（Data Center）" value={v.dataCenter ?? ''} onChange={u('dataCenter')} placeholder="AI算力需求、超大规模租户..." />
      <FM label="豪宅（Luxury）" value={v.luxury ?? ''} onChange={u('luxury')} />
      <FM label="保障性住房（Affordable）" value={v.affordable ?? ''} onChange={u('affordable')} />
      <FM label="养老地产（Senior Housing）" value={v.seniorHousing ?? ''} onChange={u('seniorHousing')} hint="人口老龄化驱动" />
      <FM label="旅游/短租（Tourism RE）" value={v.tourism ?? ''} onChange={u('tourism')} placeholder="Airbnb效应、政策管控..." />
      <FM label="综合分析笔记" value={v.analystNotes ?? ''} onChange={u('analystNotes')} />
    </div>
  );
}

// ── 主组件 ────────────────────────────────────────────

export default function RealEstateForm({ data, onChange }: Props) {
  const [layer, setLayer] = useState<'macro' | 'city' | 'submarket'>('macro');
  const [selectedGroupIdx, setSelectedGroupIdx] = useState(0);
  const [selectedCityKey, setSelectedCityKey] = useState<string>('newYork');

  const set = <K extends keyof RealEstateData>(key: K) =>
    (val: RealEstateData[K]) => onChange({ ...data, [key]: val });

  return (
    <div className="flex flex-col h-full">

      {/* 第一层：宏观 / 城市 / 细分市场 */}
      <div className="flex gap-1 px-1 py-2 border-b border-slate-100 bg-slate-50/60 shrink-0">
        {([
          { id: 'macro',     label: '🌐 宏观' },
          { id: 'city',      label: '🏙️ 城市' },
          { id: 'submarket', label: '🏢 细分市场' },
        ] as const).map(t => (
          <button key={t.id} onClick={() => setLayer(t.id)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all ${layer === t.id ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* 城市层 - 地区选择 */}
      {layer === 'city' && (
        <div className="flex gap-1 flex-wrap px-1 py-1.5 border-b border-slate-100 bg-slate-50/30 shrink-0">
          {CITY_GROUPS.map((g, idx) => (
            <button key={g.id} onClick={() => {
              setSelectedGroupIdx(idx);
              setSelectedCityKey((g.cities[0] as { key: string }).key);
            }}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${selectedGroupIdx === idx ? 'bg-slate-700 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
              {g.label}
            </button>
          ))}
        </div>
      )}

      {/* 城市层 - 城市选择 */}
      {layer === 'city' && (
        <div className="flex gap-1 flex-wrap px-1 py-1.5 border-b border-slate-100 shrink-0">
          {CITY_GROUPS[selectedGroupIdx].cities.map((c: { key: string; label: string }) => (
            <button key={c.key} onClick={() => setSelectedCityKey(c.key)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${selectedCityKey === c.key ? 'bg-amber-100 text-amber-700 border border-amber-200' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`}>
              {c.label}
            </button>
          ))}
        </div>
      )}

      {/* 内容区 */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {layer === 'macro' && (
          <MacroForm value={data.macro} onChange={set('macro')} />
        )}

        {layer === 'city' && (() => {
          const cityKey = selectedCityKey as keyof RealEstateData;
          const cityLabel = CITY_GROUPS[selectedGroupIdx].cities.find(
            (c: { key: string; label: string }) => c.key === selectedCityKey
          )?.label ?? selectedCityKey;
          return (
            <CityForm
              label={cityLabel}
              value={data[cityKey] as CityREData | undefined}
              onChange={v => onChange({ ...data, [cityKey]: v })}
            />
          );
        })()}

        {layer === 'submarket' && (
          <SubMarketForm value={data.subMarkets} onChange={set('subMarkets')} />
        )}

      </div>
    </div>
  );
}