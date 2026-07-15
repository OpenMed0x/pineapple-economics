"use client";

import React, { useState } from 'react';
import { IndustryData, RiskLevel, TrendDirection, SignalStrength, LifecycleStage } from '../../types/industry';

interface IndustryFormProps {
  onSubmit: (data: IndustryData) => void;
  onCancel: () => void;
  initialData?: Partial<IndustryData>;
}

const TABS = [
  { id: 'basic',       label: '基本信息' },
  { id: 'scale',       label: '行业规模' },
  { id: 'structure',   label: '产业结构' },
  { id: 'market',      label: '市场分析' },
  { id: 'supplydemand',label: '供需分析' },
  { id: 'cycle',       label: '产业周期' },
  { id: 'policy',      label: '产业政策' },
  { id: 'tech',        label: '技术分析' },
  { id: 'capital',     label: '资本分析' },
  { id: 'ecosystem',   label: '企业生态' },
  { id: 'global',      label: '全球竞争' },
  { id: 'risk',        label: '风险分析' },
  { id: 'signal',      label: '投资信号' },
];

const RISK_OPTIONS: { value: RiskLevel; label: string; color: string }[] = [
  { value: 'low',      label: 'Low',      color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'medium',   label: 'Medium',   color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { value: 'high',     label: 'High',     color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { value: 'critical', label: 'Critical', color: 'bg-rose-100 text-rose-700 border-rose-200' },
];

const TREND_OPTIONS: { value: TrendDirection; label: string; color: string }[] = [
  { value: 'up',   label: '↑ 上升', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'flat', label: '→ 平稳', color: 'bg-slate-100 text-slate-600 border-slate-200' },
  { value: 'down', label: '↓ 下降', color: 'bg-rose-100 text-rose-700 border-rose-200' },
];

const SIGNAL_OPTIONS: { value: SignalStrength; label: string; color: string }[] = [
  { value: 'strong_buy',  label: '强烈买入', color: 'bg-emerald-500 text-white border-emerald-500' },
  { value: 'buy',         label: '买入',     color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'neutral',     label: '中性',     color: 'bg-slate-100 text-slate-600 border-slate-200' },
  { value: 'sell',        label: '卖出',     color: 'bg-rose-100 text-rose-700 border-rose-200' },
  { value: 'strong_sell', label: '强烈卖出', color: 'bg-rose-500 text-white border-rose-500' },
];

const LIFECYCLE_OPTIONS: { value: LifecycleStage; label: string; color: string }[] = [
  { value: 'introduction', label: '导入期', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { value: 'growth',       label: '成长期', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'maturity',     label: '成熟期', color: 'bg-amber-100 text-amber-700 border-amber-200' },
  { value: 'decline',      label: '衰退期', color: 'bg-rose-100 text-rose-700 border-rose-200' },
];

const Field = ({ label, value, onChange, placeholder, multiline = false, hint }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; multiline?: boolean; hint?: string;
}) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      <label className="text-xs font-medium text-slate-500">{label}</label>
      {hint && <span className="text-[10px] text-slate-300 font-mono">{hint}</span>}
    </div>
    {multiline ? (
      <textarea value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? `输入${label}...`} rows={3}
        className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 focus:bg-white transition-all resize-none placeholder:text-slate-300" />
    ) : (
      <input type="text" value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? `输入${label}...`}
        className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 focus:bg-white transition-all placeholder:text-slate-300" />
    )}
  </div>
);

const SelectField = <T extends string>({ label, value, onChange, options }: {
  label: string;
  value: T | undefined;
  onChange: (v: T) => void;
  options: { value: T; label: string; color: string }[];
}) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-slate-500">{label}</label>
    <div className="flex gap-2 flex-wrap">
      {options.map(opt => (
        <button key={opt.value} type="button" onClick={() => onChange(opt.value)}
          className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
            value === opt.value ? opt.color : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
          }`}>
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

const SectionLabel = ({ text }: { text: string }) => (
  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-2 pb-1 border-b border-slate-100">
    {text}
  </p>
);

export default function IndustryForm({ onSubmit, onCancel, initialData }: IndustryFormProps) {
  const [activeTab, setActiveTab] = useState('basic');

  const [basic, setBasic] = useState({
    industryName: '', industryNameEn: '', tier1: '', tier2: '', tier3: '',
    industryCode: '', gicsCode: '', sicCode: '', globalMarket: '', regionalMarket: '',
    currentStage: undefined as LifecycleStage | undefined,
    introductionDesc: '', growthDesc: '', maturityDesc: '', declineDesc: '',
    pivotPoint: '', keyDrivers: '', description: '',
    ...(initialData?.basicInfo ?? {}),
  });

  const [scale, setScale] = useState({
    globalMarketSize: '', chinaMarketSize: '', europeMarketSize: '', usMarketSize: '',
    asiaExChinaSize: '', emergingMarketSize: '', globalCAGR: '', yoy: '',
    cagr5yr: '', cagr10yr: '', tamGlobal: '', samGlobal: '', somEstimate: '',
    marketSizeMethod: '', dataSource: '',
    ...(initialData?.marketScale ?? {}),
  });

  const [structure, setStructure] = useState({
    upstreamSuppliers: '', upstreamResources: '', upstreamMaterials: '', upstreamEquipment: '',
    upstreamTech: '', upstreamCostRatio: '', upstreamConcentration: '', upstreamRisk: '',
    midstreamManufacturers: '', midstreamPlatforms: '', midstreamSoftware: '',
    midstreamSystems: '', midstreamCapacity: '', midstreamUtilization: '',
    downstreamChannels: '', downstreamEndUsers: '', downstreamCustomers: '',
    downstreamScenarios: '', downstreamConsumption: '',
    profitDistribution: '', valueChainDesc: '', smilesCurve: '', verticalIntegration: '',
    ...(initialData?.industryStructure ?? {}),
  });

  const [market, setMarket] = useState({
    marketShare: '', cr4: '', cr8: '', hhi: '', marketConcentration: '',
    entryBarrier: '', exitBarrier: '',
    industryProfitMargin: '', industryGrossMargin: '', industryROE: '', industryROIC: '',
    industryPE: '', industryPS: '', industryEV: '', industryPB: '',
    newDemand: '', replacementDemand: '', policyDriven: '', demographicDriven: '',
    exportDriven: '', consumptionUpgrade: '', techDriven: '',
    porterFiveForces: '', supplierPower: '', buyerPower: '',
    substituteThreat: '', newEntrantThreat: '', rivalryIntensity: '', competitiveAdvantage: '',
    ...(initialData?.marketAnalysis ?? {}),
  });

  const [supplyDemand, setSupplyDemand] = useState({
    totalCapacity: '', inventory: '', inventoryCycle: '', productionRate: '',
    newCapacityAdded: '', capacityRetired: '', imports: '', exports: '',
    capacityUtilization: '', supplyElasticity: '',
    consumerDemand: '', industrialDemand: '', enterpriseDemand: '', governmentDemand: '',
    internationalDemand: '', replacementDemand: '', incrementalDemand: '',
    demandElasticity: '', incomeElasticity: '',
    currentPrice: '', priceTrend: undefined as TrendDirection | undefined,
    priceVolatility: '', forecast1yr: '', forecast3yr: '', forecast5yr: '', forecast10yr: '',
    forecastMethod: '', correlationWithGDP: '', correlationWithCPI: '', correlationWithPMI: '',
    ...(initialData?.supplyDemand ?? {}),
  });

  const [cycle, setCycle] = useState({
    currentStage: undefined as LifecycleStage | undefined,
    stageDesc: '', cycleLength: '', currentPosition: '', pivotSignals: '',
    leadingIndicators: '', coincidentIndicators: '', laggingIndicators: '',
    correlationWithBusiness: '', kitchinCycle: '', juglarCycle: '',
    kuznetsCycle: '', kondratievCycle: '', nextPivotEstimate: '', investmentTiming: '',
    ...(initialData?.industryCycle ?? {}),
  });

  const [policy, setPolicy] = useState({
    nationalPolicy: '', localPolicy: '', taxIncentives: '', subsidies: '',
    restrictions: '', exportPolicy: '', importPolicy: '', tariffs: '',
    environmentalRegs: '', regulatoryBody: '', aiRegulation: '',
    dataPolicy: '', internationalRelations: '', tradeAgreements: '',
    policyScore: '', policyRisk: undefined as RiskLevel | undefined,
    policyOpportunity: '', regulatoryTrend: undefined as TrendDirection | undefined, policyTimeline: '',
    ...(initialData?.policy ?? {}),
  });

  const [tech, setTech] = useState({
    maturityLevel: '', trl: '', rdInvestment: '', rdIntensity: '',
    patentCount: '', patentGrowthRate: '', paperCount: '', githubActivity: '',
    openSourceEcosystem: '', techBarrier: '', disruptionRisk: '',
    keyTechnologies: '', emergingTech: '', aiImpact: '', techLeaders: '', innovationCycle: '',
    ...(initialData?.techAnalysis ?? {}),
  });

  const [capital, setCapital] = useState({
    vcInvestment: '', peInvestment: '', primaryMarket: '', secondaryMarket: '',
    govFund: '', industryFund: '', foreignCapital: '',
    totalFundingYTD: '', avgValuation: '', ipoCount: '', maCount: '',
    exitMultiple: '', failureRate: '', topInvestors: '',
    capitalHeatQ: '', capitalHeatYoY: '', hotRegions: '',
    capitalTrend: undefined as TrendDirection | undefined, investmentThesis: '',
    ...(initialData?.capitalAnalysis ?? {}),
  });

  const [ecosystem, setEcosystem] = useState({
    leaders: '', unicorns: '', startups: '', publicCompanies: '',
    researchInstitutions: '', universities: '', government: '',
    associations: '', investmentFirms: '', media: '', communities: '',
    keyConferences: '', standardBodies: '',
    ...(initialData?.ecosystem ?? {}),
  });

  const [global, setGlobal] = useState({
    marketLeaders: '', techLeaders: '', talentPool: '', capitalFlow: '',
    policyAdvantage: '', costAdvantage: '', manufacturingHub: '', supplyChainMap: '',
    exportLeaders: '', importDependence: '', geopoliticalRisk: '',
    decouplingRisk: '', chinaPosition: '', usPosition: '',
    ...(initialData?.globalCompetition ?? {}),
  });

  const [risk, setRisk] = useState({
    techFailureRisk: undefined as RiskLevel | undefined,
    policyRisk: undefined as RiskLevel | undefined,
    supplyChainRisk: undefined as RiskLevel | undefined,
    warRisk: undefined as RiskLevel | undefined,
    fxRisk: undefined as RiskLevel | undefined,
    interestRateRisk: undefined as RiskLevel | undefined,
    environmentalRisk: undefined as RiskLevel | undefined,
    tradeWarRisk: undefined as RiskLevel | undefined,
    talentRisk: undefined as RiskLevel | undefined,
    capitalExitRisk: undefined as RiskLevel | undefined,
    blackSwanRisk: undefined as RiskLevel | undefined,
    cyclicalRisk: undefined as RiskLevel | undefined,
    disruptionRisk: undefined as RiskLevel | undefined,
    concentrationRisk: undefined as RiskLevel | undefined,
    riskSummary: '', riskMitigation: '',
    ...(initialData?.riskAnalysis ?? {}),
  });

  const [signal, setSignal] = useState({
    overallSignal: undefined as SignalStrength | undefined,
    valuation: '', momentum: undefined as TrendDirection | undefined,
    fundamentalScore: '', cyclePosition: '', catalysts: '',
    risks: '', timeHorizon: '', entryStrategy: '', exitStrategy: '',
    benchmarkETF: '', analystConsensus: '',
    ...(initialData?.investmentSignal ?? {}),
  });

  const s = <T extends object>(setter: React.Dispatch<React.SetStateAction<T>>, key: keyof T) =>
    (v: string) => setter(prev => ({ ...prev, [key]: v as T[keyof T] }));

  const sv = <T extends object, V>(setter: React.Dispatch<React.SetStateAction<T>>, key: keyof T) =>
    (v: V) => setter(prev => ({ ...prev, [key]: v as T[keyof T] }));

  const handleSubmit = () => {
    const data: IndustryData = {
      id: initialData?.id ?? Date.now().toString(),
      createdAt: initialData?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      basicInfo: basic,
      marketScale: scale,
      industryStructure: structure,
      marketAnalysis: market,
      supplyDemand,
      industryCycle: cycle,
      policy,
      techAnalysis: tech,
      capitalAnalysis: capital,
      ecosystem,
      globalCompetition: global,
      riskAnalysis: risk,
      investmentSignal: signal,
    };
    onSubmit(data);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tab 导航 */}
      <div className="flex gap-1 flex-wrap px-6 py-3 border-b border-slate-100 bg-slate-50/50 shrink-0">
        {TABS.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 内容 */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

        {activeTab === 'basic' && (<>
          <Field label="产业名称 *" value={basic.industryName} onChange={s(setBasic, 'industryName')} />
          <Field label="英文名称" value={basic.industryNameEn} onChange={s(setBasic, 'industryNameEn')} />
          <div className="grid grid-cols-3 gap-3">
            <Field label="一级行业" value={basic.tier1} onChange={s(setBasic, 'tier1')} placeholder="e.g. 信息技术" />
            <Field label="二级行业" value={basic.tier2} onChange={s(setBasic, 'tier2')} placeholder="e.g. 软件服务" />
            <Field label="三级行业" value={basic.tier3} onChange={s(setBasic, 'tier3')} placeholder="e.g. SaaS" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Field label="产业代码" value={basic.industryCode} onChange={s(setBasic, 'industryCode')} hint="GICS/SIC" />
            <Field label="GICS 代码" value={basic.gicsCode} onChange={s(setBasic, 'gicsCode')} />
            <Field label="SIC/NAICS" value={basic.sicCode} onChange={s(setBasic, 'sicCode')} />
          </div>
          <Field label="全球市场覆盖" value={basic.globalMarket} onChange={s(setBasic, 'globalMarket')} placeholder="覆盖的主要全球市场..." />
          <Field label="区域市场" value={basic.regionalMarket} onChange={s(setBasic, 'regionalMarket')} />
          <SelectField label="当前生命周期阶段" value={basic.currentStage} onChange={sv(setBasic, 'currentStage')} options={LIFECYCLE_OPTIONS} />
          <Field label="核心驱动因素" value={basic.keyDrivers} onChange={s(setBasic, 'keyDrivers')} multiline placeholder="技术、政策、人口、资本等核心驱动..." />
          <Field label="预计阶段拐点" value={basic.pivotPoint} onChange={s(setBasic, 'pivotPoint')} placeholder="e.g. 2026年进入成熟期" />
          <Field label="产业简述" value={basic.description} onChange={s(setBasic, 'description')} multiline />
          <SectionLabel text="各生命周期特征描述" />
          <Field label="导入期特征" value={basic.introductionDesc} onChange={s(setBasic, 'introductionDesc')} multiline />
          <Field label="成长期特征" value={basic.growthDesc} onChange={s(setBasic, 'growthDesc')} multiline />
          <Field label="成熟期特征" value={basic.maturityDesc} onChange={s(setBasic, 'maturityDesc')} multiline />
          <Field label="衰退期特征" value={basic.declineDesc} onChange={s(setBasic, 'declineDesc')} multiline />
        </>)}

        {activeTab === 'scale' && (<>
          <SectionLabel text="市场规模" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="全球市场规模" value={scale.globalMarketSize} onChange={s(setScale, 'globalMarketSize')} placeholder="e.g. $500B (2024)" />
            <Field label="中国市场规模" value={scale.chinaMarketSize} onChange={s(setScale, 'chinaMarketSize')} />
            <Field label="欧洲市场" value={scale.europeMarketSize} onChange={s(setScale, 'europeMarketSize')} />
            <Field label="美国市场" value={scale.usMarketSize} onChange={s(setScale, 'usMarketSize')} />
            <Field label="亚太（除中国）" value={scale.asiaExChinaSize} onChange={s(setScale, 'asiaExChinaSize')} />
            <Field label="新兴市场" value={scale.emergingMarketSize} onChange={s(setScale, 'emergingMarketSize')} />
          </div>
          <SectionLabel text="增长率" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="全球 CAGR" value={scale.globalCAGR} onChange={s(setScale, 'globalCAGR')} hint="复合年增长率" placeholder="e.g. 18.5%" />
            <Field label="年增长率 (YoY)" value={scale.yoy} onChange={s(setScale, 'yoy')} />
            <Field label="5年 CAGR" value={scale.cagr5yr} onChange={s(setScale, 'cagr5yr')} />
            <Field label="10年 CAGR" value={scale.cagr10yr} onChange={s(setScale, 'cagr10yr')} />
          </div>
          <SectionLabel text="可寻址市场（TAM/SAM/SOM）" />
          <div className="grid grid-cols-3 gap-3">
            <Field label="TAM" value={scale.tamGlobal} onChange={s(setScale, 'tamGlobal')} hint="总可寻址市场" />
            <Field label="SAM" value={scale.samGlobal} onChange={s(setScale, 'samGlobal')} hint="可服务市场" />
            <Field label="SOM" value={scale.somEstimate} onChange={s(setScale, 'somEstimate')} hint="可获取市场" />
          </div>
          <Field label="规模估算方法" value={scale.marketSizeMethod} onChange={s(setScale, 'marketSizeMethod')} placeholder="自上而下 / 自下而上 / 混合" />
          <Field label="数据来源" value={scale.dataSource} onChange={s(setScale, 'dataSource')} placeholder="Gartner、IDC、Bloomberg..." />
        </>)}

        {activeTab === 'structure' && (<>
          <SectionLabel text="上游（资源/供应层）" />
          <Field label="主要供应商" value={structure.upstreamSuppliers} onChange={s(setStructure, 'upstreamSuppliers')} multiline />
          <div className="grid grid-cols-2 gap-3">
            <Field label="核心资源" value={structure.upstreamResources} onChange={s(setStructure, 'upstreamResources')} />
            <Field label="关键材料" value={structure.upstreamMaterials} onChange={s(setStructure, 'upstreamMaterials')} />
            <Field label="主要设备" value={structure.upstreamEquipment} onChange={s(setStructure, 'upstreamEquipment')} />
            <Field label="核心技术" value={structure.upstreamTech} onChange={s(setStructure, 'upstreamTech')} />
            <Field label="上游成本占比" value={structure.upstreamCostRatio} onChange={s(setStructure, 'upstreamCostRatio')} placeholder="e.g. 45%" />
            <Field label="上游集中度" value={structure.upstreamConcentration} onChange={s(setStructure, 'upstreamConcentration')} />
          </div>
          <Field label="上游供应风险" value={structure.upstreamRisk} onChange={s(setStructure, 'upstreamRisk')} multiline />

          <SectionLabel text="中游（制造/平台层）" />
          <Field label="主要制造商" value={structure.midstreamManufacturers} onChange={s(setStructure, 'midstreamManufacturers')} multiline />
          <div className="grid grid-cols-2 gap-3">
            <Field label="平台/中间商" value={structure.midstreamPlatforms} onChange={s(setStructure, 'midstreamPlatforms')} />
            <Field label="软件/系统" value={structure.midstreamSoftware} onChange={s(setStructure, 'midstreamSoftware')} />
            <Field label="总产能" value={structure.midstreamCapacity} onChange={s(setStructure, 'midstreamCapacity')} />
            <Field label="产能利用率" value={structure.midstreamUtilization} onChange={s(setStructure, 'midstreamUtilization')} placeholder="e.g. 82%" />
          </div>

          <SectionLabel text="下游（渠道/终端层）" />
          <Field label="主要渠道" value={structure.downstreamChannels} onChange={s(setStructure, 'downstreamChannels')} multiline />
          <div className="grid grid-cols-2 gap-3">
            <Field label="终端用户" value={structure.downstreamEndUsers} onChange={s(setStructure, 'downstreamEndUsers')} />
            <Field label="客户类型" value={structure.downstreamCustomers} onChange={s(setStructure, 'downstreamCustomers')} />
          </div>
          <Field label="应用场景" value={structure.downstreamScenarios} onChange={s(setStructure, 'downstreamScenarios')} multiline />

          <SectionLabel text="价值链分析" />
          <Field label="利润分布" value={structure.profitDistribution} onChange={s(setStructure, 'profitDistribution')} multiline placeholder="上游X%，中游Y%，下游Z%..." />
          <Field label="价值链描述" value={structure.valueChainDesc} onChange={s(setStructure, 'valueChainDesc')} multiline />
          <div className="grid grid-cols-2 gap-3">
            <Field label="微笑曲线位置" value={structure.smilesCurve} onChange={s(setStructure, 'smilesCurve')} placeholder="偏左/中间/偏右" />
            <Field label="垂直整合程度" value={structure.verticalIntegration} onChange={s(setStructure, 'verticalIntegration')} placeholder="高度整合/分散" />
          </div>
        </>)}

        {activeTab === 'market' && (<>
          <SectionLabel text="市场结构（产业组织理论）" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="前5市占率" value={market.marketShare} onChange={s(setMarket, 'marketShare')} placeholder="e.g. CR5=65%" />
            <Field label="CR4" value={market.cr4} onChange={s(setMarket, 'cr4')} hint="前4集中度" />
            <Field label="CR8" value={market.cr8} onChange={s(setMarket, 'cr8')} />
            <Field label="HHI 指数" value={market.hhi} onChange={s(setMarket, 'hhi')} hint="赫芬达尔指数" placeholder="0-10000" />
            <Field label="市场集中度" value={market.marketConcentration} onChange={s(setMarket, 'marketConcentration')} placeholder="高度垄断/寡占/竞争性" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="进入壁垒" value={market.entryBarrier} onChange={s(setMarket, 'entryBarrier')} placeholder="高/中/低，主要来源..." />
            <Field label="退出壁垒" value={market.exitBarrier} onChange={s(setMarket, 'exitBarrier')} />
          </div>

          <SectionLabel text="行业盈利指标" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="行业净利润率" value={market.industryProfitMargin} onChange={s(setMarket, 'industryProfitMargin')} />
            <Field label="行业毛利率" value={market.industryGrossMargin} onChange={s(setMarket, 'industryGrossMargin')} />
            <Field label="行业 ROE" value={market.industryROE} onChange={s(setMarket, 'industryROE')} />
            <Field label="行业 ROIC" value={market.industryROIC} onChange={s(setMarket, 'industryROIC')} hint="投入资本回报" />
            <Field label="行业 P/E" value={market.industryPE} onChange={s(setMarket, 'industryPE')} />
            <Field label="行业 P/S" value={market.industryPS} onChange={s(setMarket, 'industryPS')} />
            <Field label="EV/EBITDA" value={market.industryEV} onChange={s(setMarket, 'industryEV')} />
            <Field label="行业 P/B" value={market.industryPB} onChange={s(setMarket, 'industryPB')} />
          </div>

          <SectionLabel text="需求结构" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="新增需求" value={market.newDemand} onChange={s(setMarket, 'newDemand')} />
            <Field label="替换需求" value={market.replacementDemand} onChange={s(setMarket, 'replacementDemand')} />
            <Field label="政策驱动" value={market.policyDriven} onChange={s(setMarket, 'policyDriven')} />
            <Field label="人口驱动" value={market.demographicDriven} onChange={s(setMarket, 'demographicDriven')} />
            <Field label="出口驱动" value={market.exportDriven} onChange={s(setMarket, 'exportDriven')} />
            <Field label="消费升级" value={market.consumptionUpgrade} onChange={s(setMarket, 'consumptionUpgrade')} />
            <Field label="技术驱动" value={market.techDriven} onChange={s(setMarket, 'techDriven')} />
          </div>

          <SectionLabel text="波特五力分析" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="供应商议价力" value={market.supplierPower} onChange={s(setMarket, 'supplierPower')} placeholder="高/中/低" />
            <Field label="买方议价力" value={market.buyerPower} onChange={s(setMarket, 'buyerPower')} placeholder="高/中/低" />
            <Field label="替代品威胁" value={market.substituteThreat} onChange={s(setMarket, 'substituteThreat')} />
            <Field label="新进入者威胁" value={market.newEntrantThreat} onChange={s(setMarket, 'newEntrantThreat')} />
            <Field label="同业竞争强度" value={market.rivalryIntensity} onChange={s(setMarket, 'rivalryIntensity')} />
          </div>
          <Field label="核心竞争优势来源" value={market.competitiveAdvantage} onChange={s(setMarket, 'competitiveAdvantage')} multiline />
        </>)}

        {activeTab === 'supplydemand' && (<>
          <SectionLabel text="供给侧" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="总产能" value={supplyDemand.totalCapacity} onChange={s(setSupplyDemand, 'totalCapacity')} />
            <Field label="产能利用率" value={supplyDemand.capacityUtilization} onChange={s(setSupplyDemand, 'capacityUtilization')} placeholder="e.g. 78%" />
            <Field label="库存水平" value={supplyDemand.inventory} onChange={s(setSupplyDemand, 'inventory')} />
            <Field label="库存周期" value={supplyDemand.inventoryCycle} onChange={s(setSupplyDemand, 'inventoryCycle')} hint="月" placeholder="e.g. 3.5个月" />
            <Field label="新增产能" value={supplyDemand.newCapacityAdded} onChange={s(setSupplyDemand, 'newCapacityAdded')} />
            <Field label="退出产能" value={supplyDemand.capacityRetired} onChange={s(setSupplyDemand, 'capacityRetired')} />
            <Field label="进口量" value={supplyDemand.imports} onChange={s(setSupplyDemand, 'imports')} />
            <Field label="出口量" value={supplyDemand.exports} onChange={s(setSupplyDemand, 'exports')} />
            <Field label="供给弹性" value={supplyDemand.supplyElasticity} onChange={s(setSupplyDemand, 'supplyElasticity')} hint="ε_s" />
          </div>

          <SectionLabel text="需求侧" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="消费端需求" value={supplyDemand.consumerDemand} onChange={s(setSupplyDemand, 'consumerDemand')} />
            <Field label="工业端需求" value={supplyDemand.industrialDemand} onChange={s(setSupplyDemand, 'industrialDemand')} />
            <Field label="企业端需求" value={supplyDemand.enterpriseDemand} onChange={s(setSupplyDemand, 'enterpriseDemand')} />
            <Field label="政府采购" value={supplyDemand.governmentDemand} onChange={s(setSupplyDemand, 'governmentDemand')} />
            <Field label="国际需求" value={supplyDemand.internationalDemand} onChange={s(setSupplyDemand, 'internationalDemand')} />
            <Field label="需求价格弹性" value={supplyDemand.demandElasticity} onChange={s(setSupplyDemand, 'demandElasticity')} hint="ε_d" />
            <Field label="收入弹性" value={supplyDemand.incomeElasticity} onChange={s(setSupplyDemand, 'incomeElasticity')} hint="ε_y" />
          </div>

          <SectionLabel text="价格与计量预测" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="当前均价" value={supplyDemand.currentPrice} onChange={s(setSupplyDemand, 'currentPrice')} />
            <Field label="价格波动率" value={supplyDemand.priceVolatility} onChange={s(setSupplyDemand, 'priceVolatility')} placeholder="e.g. σ=12.4%" />
          </div>
          <SelectField label="价格走势" value={supplyDemand.priceTrend} onChange={sv(setSupplyDemand, 'priceTrend')} options={TREND_OPTIONS} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="1年价格预测" value={supplyDemand.forecast1yr} onChange={s(setSupplyDemand, 'forecast1yr')} placeholder="区间/点估计" />
            <Field label="3年价格预测" value={supplyDemand.forecast3yr} onChange={s(setSupplyDemand, 'forecast3yr')} />
            <Field label="5年价格预测" value={supplyDemand.forecast5yr} onChange={s(setSupplyDemand, 'forecast5yr')} />
            <Field label="10年价格预测" value={supplyDemand.forecast10yr} onChange={s(setSupplyDemand, 'forecast10yr')} />
          </div>
          <Field label="预测方法" value={supplyDemand.forecastMethod} onChange={s(setSupplyDemand, 'forecastMethod')} placeholder="ARIMA / VAR / ML / 专家判断" />
          <SectionLabel text="宏观相关性（计量分析）" />
          <div className="grid grid-cols-3 gap-3">
            <Field label="与 GDP 相关性" value={supplyDemand.correlationWithGDP} onChange={s(setSupplyDemand, 'correlationWithGDP')} hint="ρ" placeholder="e.g. 0.82" />
            <Field label="与 CPI 相关性" value={supplyDemand.correlationWithCPI} onChange={s(setSupplyDemand, 'correlationWithCPI')} hint="ρ" />
            <Field label="与 PMI 相关性" value={supplyDemand.correlationWithPMI} onChange={s(setSupplyDemand, 'correlationWithPMI')} hint="ρ" />
          </div>
        </>)}

        {activeTab === 'cycle' && (<>
          <SelectField label="当前所处阶段" value={cycle.currentStage} onChange={sv(setCycle, 'currentStage')} options={LIFECYCLE_OPTIONS} />
          <Field label="阶段描述" value={cycle.stageDesc} onChange={s(setCycle, 'stageDesc')} multiline />
          <div className="grid grid-cols-2 gap-3">
            <Field label="平均周期长度" value={cycle.cycleLength} onChange={s(setCycle, 'cycleLength')} placeholder="e.g. 8-12年" />
            <Field label="当前周期位置" value={cycle.currentPosition} onChange={s(setCycle, 'currentPosition')} placeholder="e.g. 约60%处" />
          </div>
          <Field label="拐点信号" value={cycle.pivotSignals} onChange={s(setCycle, 'pivotSignals')} multiline placeholder="当前观察到的周期拐点信号..." />
          <SectionLabel text="景气指标体系" />
          <Field label="领先指标" value={cycle.leadingIndicators} onChange={s(setCycle, 'leadingIndicators')} multiline placeholder="新订单、PMI子项、融资活动..." />
          <Field label="同步指标" value={cycle.coincidentIndicators} onChange={s(setCycle, 'coincidentIndicators')} multiline placeholder="产量、销售额、就业..." />
          <Field label="滞后指标" value={cycle.laggingIndicators} onChange={s(setCycle, 'laggingIndicators')} multiline placeholder="库存、贷款利率..." />
          <SectionLabel text="多级周期分析（熊彼特框架）" />
          <div className="grid grid-cols-1 gap-3">
            <Field label="基钦周期（3-4年，库存）" value={cycle.kitchinCycle} onChange={s(setCycle, 'kitchinCycle')} placeholder="当前所处位置..." />
            <Field label="朱格拉周期（7-11年，设备投资）" value={cycle.juglarCycle} onChange={s(setCycle, 'juglarCycle')} />
            <Field label="库兹涅茨周期（15-25年，建设）" value={cycle.kuznetsCycle} onChange={s(setCycle, 'kuznetsCycle')} />
            <Field label="康德拉季耶夫周期（45-60年，技术）" value={cycle.kondratievCycle} onChange={s(setCycle, 'kondratievCycle')} />
          </div>
          <Field label="与经济大周期相关性" value={cycle.correlationWithBusiness} onChange={s(setCycle, 'correlationWithBusiness')} placeholder="顺周期/逆周期/弱相关，β系数..." />
          <Field label="预计下一拐点" value={cycle.nextPivotEstimate} onChange={s(setCycle, 'nextPivotEstimate')} placeholder="e.g. 2026年Q2 进入成熟期" />
          <Field label="当前投资时机评估" value={cycle.investmentTiming} onChange={s(setCycle, 'investmentTiming')} multiline />
        </>)}

        {activeTab === 'policy' && (<>
          <Field label="国家政策" value={policy.nationalPolicy} onChange={s(setPolicy, 'nationalPolicy')} multiline />
          <Field label="地方/区域政策" value={policy.localPolicy} onChange={s(setPolicy, 'localPolicy')} multiline />
          <div className="grid grid-cols-2 gap-3">
            <Field label="税收优惠" value={policy.taxIncentives} onChange={s(setPolicy, 'taxIncentives')} />
            <Field label="补贴政策" value={policy.subsidies} onChange={s(setPolicy, 'subsidies')} />
            <Field label="限制措施" value={policy.restrictions} onChange={s(setPolicy, 'restrictions')} />
            <Field label="出口政策" value={policy.exportPolicy} onChange={s(setPolicy, 'exportPolicy')} />
            <Field label="进口政策" value={policy.importPolicy} onChange={s(setPolicy, 'importPolicy')} />
            <Field label="关税水平" value={policy.tariffs} onChange={s(setPolicy, 'tariffs')} placeholder="e.g. 25%" />
          </div>
          <Field label="环保监管" value={policy.environmentalRegs} onChange={s(setPolicy, 'environmentalRegs')} multiline />
          <Field label="主要监管机构" value={policy.regulatoryBody} onChange={s(setPolicy, 'regulatoryBody')} />
          <SectionLabel text="新兴监管领域" />
          <Field label="AI 法规" value={policy.aiRegulation} onChange={s(setPolicy, 'aiRegulation')} multiline />
          <Field label="数据政策" value={policy.dataPolicy} onChange={s(setPolicy, 'dataPolicy')} placeholder="GDPR、数据本地化、数据安全法..." />
          <Field label="国际关系影响" value={policy.internationalRelations} onChange={s(setPolicy, 'internationalRelations')} multiline />
          <Field label="相关贸易协定" value={policy.tradeAgreements} onChange={s(setPolicy, 'tradeAgreements')} placeholder="RCEP、CPTPP、双边协定..." />
          <SectionLabel text="政策评估" />
          <Field label="政策友好度评分" value={policy.policyScore} onChange={s(setPolicy, 'policyScore')} hint="1-10" placeholder="e.g. 7.5" />
          <SelectField label="政策风险" value={policy.policyRisk} onChange={sv(setPolicy, 'policyRisk')} options={RISK_OPTIONS} />
          <SelectField label="监管趋势" value={policy.regulatoryTrend} onChange={sv(setPolicy, 'regulatoryTrend')} options={TREND_OPTIONS} />
          <Field label="政策机会" value={policy.policyOpportunity} onChange={s(setPolicy, 'policyOpportunity')} multiline />
          <Field label="关键政策时间线" value={policy.policyTimeline} onChange={s(setPolicy, 'policyTimeline')} multiline placeholder="2024Q4: 新规落地..." />
        </>)}

        {activeTab === 'tech' && (<>
          <div className="grid grid-cols-2 gap-3">
            <Field label="技术成熟度" value={tech.maturityLevel} onChange={s(setTech, 'maturityLevel')} placeholder="早期/发展中/成熟/过时" />
            <Field label="TRL" value={tech.trl} onChange={s(setTech, 'trl')} hint="技术就绪度 1-9" placeholder="e.g. TRL 7" />
            <Field label="全行业研发投入" value={tech.rdInvestment} onChange={s(setTech, 'rdInvestment')} placeholder="e.g. $50B/yr" />
            <Field label="研发强度" value={tech.rdIntensity} onChange={s(setTech, 'rdIntensity')} hint="R&D/Revenue" placeholder="e.g. 12%" />
            <Field label="年度专利数量" value={tech.patentCount} onChange={s(setTech, 'patentCount')} />
            <Field label="专利增长率" value={tech.patentGrowthRate} onChange={s(setTech, 'patentGrowthRate')} />
            <Field label="年度论文数" value={tech.paperCount} onChange={s(setTech, 'paperCount')} />
            <Field label="GitHub 活跃度" value={tech.githubActivity} onChange={s(setTech, 'githubActivity')} placeholder="Stars增长/月..." />
          </div>
          <Field label="开源生态" value={tech.openSourceEcosystem} onChange={s(setTech, 'openSourceEcosystem')} multiline />
          <div className="grid grid-cols-2 gap-3">
            <Field label="技术壁垒" value={tech.techBarrier} onChange={s(setTech, 'techBarrier')} placeholder="高/中/低，主要来源..." />
            <Field label="被颠覆风险" value={tech.disruptionRisk} onChange={s(setTech, 'disruptionRisk')} placeholder="高/中/低" />
          </div>
          <Field label="核心技术清单" value={tech.keyTechnologies} onChange={s(setTech, 'keyTechnologies')} multiline />
          <Field label="新兴技术威胁/机会" value={tech.emergingTech} onChange={s(setTech, 'emergingTech')} multiline />
          <Field label="AI 对本行业影响" value={tech.aiImpact} onChange={s(setTech, 'aiImpact')} multiline />
          <div className="grid grid-cols-2 gap-3">
            <Field label="技术领先国家/企业" value={tech.techLeaders} onChange={s(setTech, 'techLeaders')} />
            <Field label="技术创新周期" value={tech.innovationCycle} onChange={s(setTech, 'innovationCycle')} placeholder="e.g. 2-3年迭代一次" />
          </div>
        </>)}

        {activeTab === 'capital' && (<>
          <SectionLabel text="资金流向" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="VC 投资规模" value={capital.vcInvestment} onChange={s(setCapital, 'vcInvestment')} />
            <Field label="PE 投资规模" value={capital.peInvestment} onChange={s(setCapital, 'peInvestment')} />
            <Field label="一级市场总额" value={capital.primaryMarket} onChange={s(setCapital, 'primaryMarket')} />
            <Field label="二级市场表现" value={capital.secondaryMarket} onChange={s(setCapital, 'secondaryMarket')} placeholder="指数涨跌幅..." />
            <Field label="政府基金" value={capital.govFund} onChange={s(setCapital, 'govFund')} />
            <Field label="产业基金" value={capital.industryFund} onChange={s(setCapital, 'industryFund')} />
            <Field label="海外资本" value={capital.foreignCapital} onChange={s(setCapital, 'foreignCapital')} />
          </div>
          <SectionLabel text="融资活动" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="YTD 融资总额" value={capital.totalFundingYTD} onChange={s(setCapital, 'totalFundingYTD')} />
            <Field label="平均估值" value={capital.avgValuation} onChange={s(setCapital, 'avgValuation')} />
            <Field label="IPO 数量" value={capital.ipoCount} onChange={s(setCapital, 'ipoCount')} />
            <Field label="并购数量" value={capital.maCount} onChange={s(setCapital, 'maCount')} />
            <Field label="平均退出倍数" value={capital.exitMultiple} onChange={s(setCapital, 'exitMultiple')} placeholder="e.g. 4.2x" />
            <Field label="投资失败率" value={capital.failureRate} onChange={s(setCapital, 'failureRate')} placeholder="e.g. 35%" />
          </div>
          <Field label="活跃投资机构" value={capital.topInvestors} onChange={s(setCapital, 'topInvestors')} multiline />
          <SectionLabel text="资本热度" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="季度热度" value={capital.capitalHeatQ} onChange={s(setCapital, 'capitalHeatQ')} placeholder="e.g. 高热/降温" />
            <Field label="同比变化" value={capital.capitalHeatYoY} onChange={s(setCapital, 'capitalHeatYoY')} placeholder="e.g. +45% YoY" />
          </div>
          <Field label="热门投资地区" value={capital.hotRegions} onChange={s(setCapital, 'hotRegions')} />
          <SelectField label="资本趋势" value={capital.capitalTrend} onChange={sv(setCapital, 'capitalTrend')} options={TREND_OPTIONS} />
          <Field label="主流投资逻辑" value={capital.investmentThesis} onChange={s(setCapital, 'investmentThesis')} multiline />
        </>)}

        {activeTab === 'ecosystem' && (<>
          <Field label="龙头企业" value={ecosystem.leaders} onChange={s(setEcosystem, 'leaders')} multiline placeholder="市值/营收前5..." />
          <Field label="独角兽企业" value={ecosystem.unicorns} onChange={s(setEcosystem, 'unicorns')} multiline />
          <Field label="代表性 Startup" value={ecosystem.startups} onChange={s(setEcosystem, 'startups')} multiline />
          <Field label="上市公司/ETF" value={ecosystem.publicCompanies} onChange={s(setEcosystem, 'publicCompanies')} placeholder="代表性股票代码或ETF..." />
          <div className="grid grid-cols-2 gap-3">
            <Field label="科研机构" value={ecosystem.researchInstitutions} onChange={s(setEcosystem, 'researchInstitutions')} />
            <Field label="高校" value={ecosystem.universities} onChange={s(setEcosystem, 'universities')} />
            <Field label="政府机构" value={ecosystem.government} onChange={s(setEcosystem, 'government')} />
            <Field label="行业协会" value={ecosystem.associations} onChange={s(setEcosystem, 'associations')} />
            <Field label="投资机构" value={ecosystem.investmentFirms} onChange={s(setEcosystem, 'investmentFirms')} />
            <Field label="行业媒体" value={ecosystem.media} onChange={s(setEcosystem, 'media')} />
          </div>
          <Field label="从业者社区" value={ecosystem.communities} onChange={s(setEcosystem, 'communities')} />
          <Field label="重要行业会议" value={ecosystem.keyConferences} onChange={s(setEcosystem, 'keyConferences')} />
          <Field label="标准化组织" value={ecosystem.standardBodies} onChange={s(setEcosystem, 'standardBodies')} />
        </>)}

        {activeTab === 'global' && (<>
          <div className="grid grid-cols-2 gap-3">
            <Field label="市场领先国" value={global.marketLeaders} onChange={s(setGlobal, 'marketLeaders')} />
            <Field label="技术领先国/企业" value={global.techLeaders} onChange={s(setGlobal, 'techLeaders')} />
            <Field label="人才集中地" value={global.talentPool} onChange={s(setGlobal, 'talentPool')} />
            <Field label="资本流向" value={global.capitalFlow} onChange={s(setGlobal, 'capitalFlow')} />
            <Field label="政策优势国" value={global.policyAdvantage} onChange={s(setGlobal, 'policyAdvantage')} />
            <Field label="成本优势国" value={global.costAdvantage} onChange={s(setGlobal, 'costAdvantage')} />
            <Field label="制造业中心" value={global.manufacturingHub} onChange={s(setGlobal, 'manufacturingHub')} />
            <Field label="出口领先国" value={global.exportLeaders} onChange={s(setGlobal, 'exportLeaders')} />
            <Field label="进口依赖" value={global.importDependence} onChange={s(setGlobal, 'importDependence')} />
          </div>
          <Field label="供应链地图" value={global.supplyChainMap} onChange={s(setGlobal, 'supplyChainMap')} multiline />
          <Field label="地缘政治风险" value={global.geopoliticalRisk} onChange={s(setGlobal, 'geopoliticalRisk')} multiline />
          <Field label="产业链脱钩风险" value={global.decouplingRisk} onChange={s(setGlobal, 'decouplingRisk')} multiline />
          <div className="grid grid-cols-1 gap-3">
            <Field label="中国在全球的定位" value={global.chinaPosition} onChange={s(setGlobal, 'chinaPosition')} multiline />
            <Field label="美国在全球的定位" value={global.usPosition} onChange={s(setGlobal, 'usPosition')} multiline />
          </div>
        </>)}

        {activeTab === 'risk' && (
          <div className="grid grid-cols-1 gap-4">
            {([
              { key: 'techFailureRisk',    label: '技术失败风险' },
              { key: 'policyRisk',         label: '政策监管风险' },
              { key: 'supplyChainRisk',    label: '供应链风险' },
              { key: 'warRisk',            label: '战争/地缘风险' },
              { key: 'fxRisk',             label: '汇率风险' },
              { key: 'interestRateRisk',   label: '利率风险' },
              { key: 'environmentalRisk',  label: '环保风险' },
              { key: 'tradeWarRisk',       label: '贸易战风险' },
              { key: 'talentRisk',         label: '人才风险' },
              { key: 'capitalExitRisk',    label: '资本退出风险' },
              { key: 'blackSwanRisk',      label: '黑天鹅风险' },
              { key: 'cyclicalRisk',       label: '周期性风险' },
              { key: 'disruptionRisk',     label: '技术颠覆风险' },
              { key: 'concentrationRisk',  label: '集中度风险' },
            ] as { key: string; label: string }[]).map(({ key, label }) => (
              <SelectField
                key={key}
                label={label}
                value={risk[key as keyof typeof risk] as RiskLevel | undefined}
                onChange={(v: RiskLevel) => setRisk(p => ({ ...p, [key]: v }))}
                options={RISK_OPTIONS}
              />
            ))}
            <Field label="风险综合评估" value={risk.riskSummary} onChange={s(setRisk, 'riskSummary')} multiline />
            <Field label="风险对冲策略" value={risk.riskMitigation} onChange={s(setRisk, 'riskMitigation')} multiline />
          </div>
        )}

        {activeTab === 'signal' && (<>
          <SelectField label="综合投资信号" value={signal.overallSignal} onChange={sv(setSignal, 'overallSignal')} options={SIGNAL_OPTIONS} />
          <SelectField label="价格动量" value={signal.momentum} onChange={sv(setSignal, 'momentum')} options={TREND_OPTIONS} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="估值水平" value={signal.valuation} onChange={s(setSignal, 'valuation')} placeholder="低估/合理/偏高/泡沫" />
            <Field label="基本面评分" value={signal.fundamentalScore} onChange={s(setSignal, 'fundamentalScore')} hint="1-10" />
            <Field label="周期位置评分" value={signal.cyclePosition} onChange={s(setSignal, 'cyclePosition')} hint="1-10" />
            <Field label="建议持仓周期" value={signal.timeHorizon} onChange={s(setSignal, 'timeHorizon')} placeholder="短期/中期/长期" />
          </div>
          <Field label="近期催化剂" value={signal.catalysts} onChange={s(setSignal, 'catalysts')} multiline placeholder="政策落地、技术突破、季报..." />
          <Field label="主要风险提示" value={signal.risks} onChange={s(setSignal, 'risks')} multiline />
          <Field label="入场策略" value={signal.entryStrategy} onChange={s(setSignal, 'entryStrategy')} multiline placeholder="分批建仓、逢回调入场..." />
          <Field label="退出条件" value={signal.exitStrategy} onChange={s(setSignal, 'exitStrategy')} multiline />
          <div className="grid grid-cols-2 gap-3">
            <Field label="参考 ETF / 指数" value={signal.benchmarkETF} onChange={s(setSignal, 'benchmarkETF')} placeholder="e.g. XLK、KWEB..." />
            <Field label="分析师一致预期" value={signal.analystConsensus} onChange={s(setSignal, 'analystConsensus')} placeholder="e.g. 超配/中性" />
          </div>
        </>)}
      </div>

      {/* 底部按钮 */}
      <div className="px-6 py-4 border-t border-slate-100 flex justify-between items-center shrink-0">
        <span className="text-xs text-slate-400">* 仅已填写的字段会显示在研究页面</span>
        <div className="flex gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all">取消</button>
          <button onClick={handleSubmit} className="px-5 py-2 text-sm bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all shadow-sm shadow-amber-200">确认添加</button>
        </div>
      </div>
    </div>
  );
}