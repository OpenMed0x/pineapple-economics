export type LifecycleStage = 'introduction' | 'growth' | 'maturity' | 'decline';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type TrendDirection = 'up' | 'flat' | 'down';
export type SignalStrength = 'strong_buy' | 'buy' | 'neutral' | 'sell' | 'strong_sell';

export interface IndustryBasicInfo {
  industryName?: string;
  industryNameEn?: string;
  tier1?: string;
  tier2?: string;
  tier3?: string;
  industryCode?: string;         // GICS / SIC / NAICS 代码
  gicsCode?: string;
  sicCode?: string;
  globalMarket?: string;         // 覆盖的全球市场范围
  regionalMarket?: string;
  currentStage?: LifecycleStage;
  introductionDesc?: string;
  growthDesc?: string;
  maturityDesc?: string;
  declineDesc?: string;
  pivotPoint?: string;           // 预计阶段拐点
  keyDrivers?: string;           // 核心驱动因素
  description?: string;
}

export interface MarketScale {
  globalMarketSize?: string;     // e.g. $500B (2024)
  chinaMarketSize?: string;
  europeMarketSize?: string;
  usMarketSize?: string;
  asiaExChinaSize?: string;
  emergingMarketSize?: string;
  globalCAGR?: string;           // e.g. 18.5%
  yoy?: string;                  // 年增长率
  cagr5yr?: string;
  cagr10yr?: string;
  tamGlobal?: string;            // Total Addressable Market
  samGlobal?: string;            // Serviceable Addressable Market
  somEstimate?: string;          // Serviceable Obtainable Market
  marketSizeMethod?: string;     // 估算方法
  dataSource?: string;
}

export interface IndustryStructure {
  // 上游
  upstreamSuppliers?: string;
  upstreamResources?: string;
  upstreamMaterials?: string;
  upstreamEquipment?: string;
  upstreamTech?: string;
  upstreamCostRatio?: string;    // 上游成本占比
  upstreamConcentration?: string;
  upstreamRisk?: string;

  // 中游
  midstreamManufacturers?: string;
  midstreamPlatforms?: string;
  midstreamSoftware?: string;
  midstreamSystems?: string;
  midstreamCapacity?: string;
  midstreamUtilization?: string; // 产能利用率

  // 下游
  downstreamChannels?: string;
  downstreamEndUsers?: string;
  downstreamCustomers?: string;
  downstreamScenarios?: string;  // 应用场景
  downstreamConsumption?: string;

  // 利润与价值链
  profitDistribution?: string;   // 各环节利润分布
  valueChainDesc?: string;       // 价值链描述
  smilesCurve?: string;          // 微笑曲线位置
  verticalIntegration?: string;  // 垂直整合程度
}

export interface MarketAnalysis {
  // 市场结构
  marketShare?: string;          // 前5大企业市占率
  cr4?: string;                  // CR4
  cr8?: string;                  // CR8
  hhi?: string;                  // 赫芬达尔指数
  marketConcentration?: string;  // 高度集中/适度集中/竞争性
  entryBarrier?: string;         // 进入壁垒
  exitBarrier?: string;          // 退出壁垒

  // 盈利指标
  industryProfitMargin?: string;
  industryGrossMargin?: string;
  industryROE?: string;
  industryROIC?: string;         // 投入资本回报率
  industryPE?: string;
  industryPS?: string;
  industryEV?: string;           // EV/EBITDA
  industryPB?: string;

  // 需求结构
  newDemand?: string;
  replacementDemand?: string;
  policyDriven?: string;
  demographicDriven?: string;    // 人口驱动
  exportDriven?: string;
  consumptionUpgrade?: string;
  techDriven?: string;

  // 竞争强度
  porterFiveForces?: string;     // 波特五力整体评分
  supplierPower?: string;
  buyerPower?: string;
  substituteThreat?: string;
  newEntrantThreat?: string;
  rivalryIntensity?: string;
  competitiveAdvantage?: string; // 核心竞争优势来源
}

export interface SupplyDemandAnalysis {
  // 供给侧
  totalCapacity?: string;
  inventory?: string;
  inventoryCycle?: string;       // 库存周期（月）
  productionRate?: string;
  newCapacityAdded?: string;
  capacityRetired?: string;
  imports?: string;
  exports?: string;
  capacityUtilization?: string;
  supplyElasticity?: string;     // 供给弹性

  // 需求侧
  consumerDemand?: string;
  industrialDemand?: string;
  enterpriseDemand?: string;
  governmentDemand?: string;
  internationalDemand?: string;
  replacementDemand?: string;
  incrementalDemand?: string;
  demandElasticity?: string;     // 需求价格弹性
  incomeElasticity?: string;     // 收入弹性

  // 价格与预测
  currentPrice?: string;
  priceTrend?: TrendDirection;
  priceVolatility?: string;      // 价格波动率
  forecast1yr?: string;
  forecast3yr?: string;
  forecast5yr?: string;
  forecast10yr?: string;
  forecastMethod?: string;       // 预测方法（回归/ARIMA/ML）
  correlationWithGDP?: string;   // 与GDP相关性
  correlationWithCPI?: string;
  correlationWithPMI?: string;
}

export interface IndustryCycle {
  currentStage?: LifecycleStage;
  stageDesc?: string;
  cycleLength?: string;          // 平均周期长度
  currentPosition?: string;      // 周期内位置（%）
  pivotSignals?: string;         // 拐点信号
  leadingIndicators?: string;    // 领先指标
  coincidentIndicators?: string; // 同步指标
  laggingIndicators?: string;    // 滞后指标
  correlationWithBusiness?: string; // 与经济大周期相关性
  kitchinCycle?: string;         // 基钦周期（库存，3-4年）
  juglarCycle?: string;          // 朱格拉周期（设备，7-11年）
  kuznetsCycle?: string;         // 库兹涅茨周期（建筑，15-25年）
  kondratievCycle?: string;      // 康德拉季耶夫周期（技术，45-60年）
  nextPivotEstimate?: string;    // 预计下一个拐点
  investmentTiming?: string;     // 当前投资时机评估
}

export interface IndustryPolicy {
  // 政策环境
  nationalPolicy?: string;
  localPolicy?: string;
  taxIncentives?: string;
  subsidies?: string;
  restrictions?: string;
  exportPolicy?: string;
  importPolicy?: string;
  tariffs?: string;
  environmentalRegs?: string;
  regulatoryBody?: string;       // 主要监管机构

  // 新兴监管
  aiRegulation?: string;
  dataPolicy?: string;           // 数据本地化、GDPR等
  internationalRelations?: string;
  tradeAgreements?: string;      // 相关贸易协定

  // 评分
  policyScore?: string;          // 1-10综合政策友好度
  policyRisk?: RiskLevel;
  policyOpportunity?: string;
  regulatoryTrend?: TrendDirection; // 监管趋势（收紧/宽松）
  policyTimeline?: string;       // 关键政策时间线
}

export interface TechAnalysis {
  maturityLevel?: string;        // 技术成熟度描述
  trl?: string;                  // TRL 1-9
  rdInvestment?: string;         // 全行业研发投入
  rdIntensity?: string;          // R&D/Revenue
  patentCount?: string;
  patentGrowthRate?: string;
  paperCount?: string;           // 年度论文数
  githubActivity?: string;       // 开源活跃度
  openSourceEcosystem?: string;
  techBarrier?: string;          // 技术壁垒高低
  disruptionRisk?: string;       // 被颠覆风险
  keyTechnologies?: string;      // 核心技术清单
  emergingTech?: string;         // 新兴技术威胁/机会
  aiImpact?: string;             // AI对本行业的影响
  techLeaders?: string;          // 技术领先国家/企业
  innovationCycle?: string;      // 技术创新周期
}

export interface CapitalAnalysis {
  // 资金流向
  vcInvestment?: string;
  peInvestment?: string;
  primaryMarket?: string;
  secondaryMarket?: string;
  govFund?: string;
  industryFund?: string;
  foreignCapital?: string;

  // 融资活动
  totalFundingYTD?: string;
  avgValuation?: string;
  ipoCount?: string;
  maCount?: string;
  exitMultiple?: string;         // 平均退出倍数
  failureRate?: string;
  topInvestors?: string;         // 活跃投资机构

  // 资本热度
  capitalHeatQ?: string;         // 季度热度
  capitalHeatYoY?: string;       // 同比
  hotRegions?: string;           // 热门投资地区
  capitalTrend?: TrendDirection;
  investmentThesis?: string;     // 主流投资逻辑
}

export interface EnterpriseEcosystem {
  leaders?: string;              // 龙头企业
  unicorns?: string;             // 独角兽
  startups?: string;             // 代表性创业公司
  publicCompanies?: string;      // 上市公司（指数/ETF）
  researchInstitutions?: string; // 科研机构
  universities?: string;         // 高校
  government?: string;           // 政府机构
  associations?: string;         // 行业协会
  investmentFirms?: string;
  media?: string;                // 行业媒体
  communities?: string;          // 开发者/从业者社区
  keyConferences?: string;       // 重要会议
  standardBodies?: string;       // 标准化组织
}

export interface GlobalCompetition {
  marketLeaders?: string;        // 全球市场领先国
  techLeaders?: string;
  talentPool?: string;           // 人才分布
  capitalFlow?: string;          // 资本流向
  policyAdvantage?: string;      // 政策优势国
  costAdvantage?: string;        // 成本优势国
  manufacturingHub?: string;
  supplyChainMap?: string;
  exportLeaders?: string;
  importDependence?: string;
  geopoliticalRisk?: string;
  decouplingRisk?: string;       // 产业链脱钩风险
  chinaPosition?: string;        // 中国在全球的定位
  usPosition?: string;
}

export interface RiskAnalysis {
  techFailureRisk?: RiskLevel;
  policyRisk?: RiskLevel;
  supplyChainRisk?: RiskLevel;
  warRisk?: RiskLevel;
  fxRisk?: RiskLevel;
  interestRateRisk?: RiskLevel;
  environmentalRisk?: RiskLevel;
  tradeWarRisk?: RiskLevel;
  talentRisk?: RiskLevel;
  capitalExitRisk?: RiskLevel;
  blackSwanRisk?: RiskLevel;
  cyclicalRisk?: RiskLevel;      // 周期性风险
  disruptionRisk?: RiskLevel;    // 技术颠覆风险
  concentrationRisk?: RiskLevel; // 集中度风险
  riskSummary?: string;
  riskMitigation?: string;       // 风险对冲策略
}

export interface InvestmentSignal {
  overallSignal?: SignalStrength;
  valuation?: string;            // 当前估值水平（偏高/合理/低估）
  momentum?: TrendDirection;     // 价格动量
  fundamentalScore?: string;     // 基本面评分 1-10
  cyclePosition?: string;        // 周期位置评分
  catalysts?: string;            // 近期催化剂
  risks?: string;                // 主要风险提示
  timeHorizon?: string;          // 建议持仓周期
  entryStrategy?: string;        // 建议入场策略
  exitStrategy?: string;         // 建议退出条件
  benchmarkETF?: string;         // 参考ETF/指数
  analystConsensus?: string;     // 分析师一致预期
}

export interface IndustryData {
  id: string;
  createdAt: string;
  updatedAt?: string;
  basicInfo: IndustryBasicInfo;
  marketScale: MarketScale;
  industryStructure: IndustryStructure;
  marketAnalysis: MarketAnalysis;
  supplyDemand: SupplyDemandAnalysis;
  industryCycle: IndustryCycle;
  policy: IndustryPolicy;
  techAnalysis: TechAnalysis;
  capitalAnalysis: CapitalAnalysis;
  ecosystem: EnterpriseEcosystem;
  globalCompetition: GlobalCompetition;
  riskAnalysis: RiskAnalysis;
  investmentSignal: InvestmentSignal;
}