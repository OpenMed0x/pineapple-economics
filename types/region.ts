export type RegionId =
  | 'us' | 'china' | 'europe' | 'japan' | 'korea'
  | 'taiwan' | 'hongkong' | 'southeast_asia' | 'middle_east' | 'south_america';

export type TrendDirection = 'up' | 'flat' | 'down';
export type SignalStrength = 'strong_buy' | 'buy' | 'neutral' | 'sell' | 'strong_sell';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

// ─── 美国 ────────────────────────────────────────────
export interface USData {
  // 经济增长
  gdp?: string;
  gdpGrowth?: string;
  gdpNow?: string;
  ismManufacturing?: string;
  ismServices?: string;
  retailSales?: string;
  consumerConfidence?: string;
  leadingIndex?: string;           // 领先指标 LEI

  // 就业
  nfp?: string;
  unemploymentRate?: string;
  u6?: string;                     // 广义失业率
  wageGrowth?: string;
  jobOpenings?: string;            // JOLTS 职位空缺
  initialJoblessClaims?: string;

  // 通胀
  cpi?: string;
  coreCpi?: string;
  pce?: string;
  corePce?: string;
  breakEvenInflation?: string;     // 盈亏平衡通胀率（5Y5Y）
  ppi?: string;

  // 货币政策
  fedFundsRate?: string;
  dotPlot?: string;
  fedBalanceSheet?: string;
  treasury2y?: string;
  treasury10y?: string;
  treasury30y?: string;
  yieldCurve?: string;             // 2Y-10Y 利差
  realYield?: string;              // 实际利率（TIPS）

  // 资本市场
  sp500?: string;
  nasdaq100?: string;
  dowJones?: string;
  russell2000?: string;
  vix?: string;
  dxy?: string;
  goldPrice?: string;
  crudeoil?: string;               // WTI

  // 房地产
  housePriceIndex?: string;
  mortgageRate?: string;
  housingStarts?: string;
  existingHomeSales?: string;

  // 财政
  federalDebtGdp?: string;
  budgetDeficit?: string;
  usDebtCeiling?: string;

  // 企业
  sp500Earnings?: string;          // EPS 增速
  sp500Pe?: string;
  creditSpread?: string;           // IG/HY 信用利差
  ipoActivity?: string;

  // 宏观综合
  currentAccountBalance?: string;
  dollarCyclePhase?: string;       // 美元周期位置
  recessionProbability?: string;
  overallOutlook?: string;
  investmentSignal?: SignalStrength;
  analystNotes?: string;
}

// ─── 中国 ────────────────────────────────────────────
export interface ChinaData {
  // 经济增长
  gdp?: string;
  gdpGrowth?: string;
  gdpTarget?: string;              // 政府增长目标
  manufacturingPmi?: string;
  servicesPmi?: string;
  caixinManufacturing?: string;    // 财新制造业PMI
  industrialOutput?: string;
  retailSales?: string;
  fixedAssetInvestment?: string;
  exports?: string;
  imports?: string;
  tradeBalance?: string;
  currentAccount?: string;

  // 通胀
  cpi?: string;
  ppi?: string;
  deflationRisk?: string;          // 通缩风险评估

  // 货币政策
  lpr1y?: string;
  lpr5y?: string;
  m2Growth?: string;
  tsf?: string;                    // 社融（TSF）
  newLoans?: string;
  rrr?: string;                    // 存款准备金率
  mlf?: string;                    // MLF利率
  cnyUsd?: string;                 // 人民币汇率

  // 财政
  fiscalDeficitGdp?: string;
  localGovtDebt?: string;
  specialBonds?: string;           // 专项债规模

  // 房地产
  housePriceIndex?: string;
  residentialSales?: string;
  realEstateInvestment?: string;
  developerDebt?: string;          // 房企债务（恒大等）
  landSales?: string;

  // 股票
  shanghaiComposite?: string;
  csi300?: string;
  chinextIndex?: string;           // 创业板
  northboundFlow?: string;         // 北向资金
  southboundFlow?: string;
  aSharePe?: string;
  hShareDiscount?: string;         // AH溢价

  // 科技与产业
  aiInvestment?: string;
  semiconductorOutput?: string;
  evSales?: string;                // 新能源汽车销量
  techRegulation?: string;         // 科技监管动态

  // 地缘政治
  usChinaRelations?: string;
  taiwanRisk?: string;
  sanctionsRisk?: string;

  // 综合
  overallOutlook?: string;
  investmentSignal?: SignalStrength;
  policyStance?: string;           // 政策总基调
  analystNotes?: string;
}

// ─── 欧洲 ────────────────────────────────────────────
export interface EuropeData {
  // 经济增长
  gdp?: string;
  gdpGrowth?: string;
  manufacturingPmi?: string;
  servicesPmi?: string;
  industrialProduction?: string;
  retailSales?: string;
  germanZew?: string;              // ZEW 景气指数
  sentix?: string;

  // 通胀
  hicp?: string;
  coreHicp?: string;
  germanCpi?: string;
  ppi?: string;

  // 货币政策
  ecbRate?: string;                // 主要再融资利率
  depositFacilityRate?: string;
  ecbBalanceSheet?: string;
  germany10y?: string;
  italy10y?: string;
  peripheralSpread?: string;       // 意大利-德国利差（风险信号）
  eurusd?: string;

  // 能源
  ttfGas?: string;                 // TTF 天然气
  electricityPrice?: string;
  energyImportDependence?: string;
  renewableShare?: string;

  // 财政
  debtGdp?: string;
  budgetDeficit?: string;
  stabilityPact?: string;          // 稳定与增长公约执行情况

  // 股票
  stoxx600?: string;
  dax?: string;
  cac40?: string;
  ftse100?: string;

  // 地缘政治
  ukraineWar?: string;
  energySecurity?: string;
  usEuTrade?: string;
  natoSpending?: string;

  // 综合
  overallOutlook?: string;
  investmentSignal?: SignalStrength;
  analystNotes?: string;
}

// ─── 日本 ────────────────────────────────────────────
export interface JapanData {
  // 经济增长
  gdp?: string;
  gdpGrowth?: string;
  manufacturingPmi?: string;
  servicesPmi?: string;
  tankan?: string;                 // 日银短观
  industrialProduction?: string;
  exports?: string;
  imports?: string;
  tradeBalance?: string;

  // 通胀
  cpi?: string;
  coreCpi?: string;
  tokyoCpi?: string;               // 东京CPI（领先指标）
  ppi?: string;

  // 货币政策
  bojPolicyRate?: string;
  yccTarget?: string;              // YCC（收益率曲线控制）
  jgb10y?: string;
  bojBalanceSheet?: string;
  realRate?: string;

  // 汇率
  usdjpy?: string;
  interventionRisk?: string;       // 日本财务省干预汇率风险
  currencyAccountBalance?: string;

  // 股票
  nikkei225?: string;
  topix?: string;
  foreignBuying?: string;         // 外资买入日股

  // 工资与消费
  wageGrowth?: string;
  baseWage?: string;               // 春斗基本工资
  householdSpending?: string;

  // 结构性
  demographicsRisk?: string;       // 人口老龄化
  corporateReform?: string;        // 东京交易所公司治理改革
  overallOutlook?: string;
  investmentSignal?: SignalStrength;
  analystNotes?: string;
}

// ─── 韩国 ────────────────────────────────────────────
export interface KoreaData {
  gdp?: string;
  gdpGrowth?: string;
  manufacturingPmi?: string;
  exports?: string;
  semiconductorExports?: string;
  chipCycleTrend?: string;         // 半导体周期位置
  cpi?: string;
  baseRate?: string;
  usdjpy?: string;
  usdkrw?: string;
  currentAccount?: string;
  kospi?: string;
  kq11?: string;                   // 科斯达克
  samsungWeight?: string;
  foreignFlow?: string;            // 外资净流入
  housePriceSeoul?: string;
  householdDebt?: string;          // 家庭债务
  overallOutlook?: string;
  investmentSignal?: SignalStrength;
  analystNotes?: string;
}

// ─── 台湾 ────────────────────────────────────────────
export interface TaiwanData {
  gdp?: string;
  gdpGrowth?: string;
  exports?: string;
  semiconductorExports?: string;
  exportOrders?: string;           // 外销订单（领先指标）
  tsmcUtilization?: string;        // 台积电产能利用率
  advancedNodeCapacity?: string;   // 先进制程产能
  aiServerExports?: string;
  cpi?: string;
  policyRate?: string;
  usdtwd?: string;
  taiex?: string;
  tsmcWeight?: string;
  foreignFlow?: string;
  geopoliticalRisk?: string;       // 台海风险溢价
  crossStraitRelations?: string;
  overallOutlook?: string;
  investmentSignal?: SignalStrength;
  analystNotes?: string;
}

// ─── 香港 ────────────────────────────────────────────
export interface HongKongData {
  // 股票
  hsi?: string;                    // 恒生指数
  hsTech?: string;                 // 恒生科技
  hsiPe?: string;
  southboundFlow?: string;         // 南向资金
  ipoRaised?: string;
  adtv?: string;                   // 日均成交额

  // 房地产
  housePriceIndex?: string;
  officeVacancy?: string;
  retailRent?: string;

  // 资金与利率
  usdhkd?: string;
  linkedExchangeRate?: string;     // 联系汇率制度状态
  hibor?: string;
  aggregateBalance?: string;       // 总结余

  // 宏观
  gdpGrowth?: string;
  unemployment?: string;
  retailSales?: string;
  touristArrivals?: string;

  // 政治与监管
  politicalRisk?: string;
  chinaRelations?: string;         // 与内地关系
  financialHubStatus?: string;     // 国际金融中心地位评估

  overallOutlook?: string;
  investmentSignal?: SignalStrength;
  analystNotes?: string;
}

// ─── 东南亚 ───────────────────────────────────────────
export interface SEAsiaData {
  // 整体
  regionGdpGrowth?: string;
  aseanGdp?: string;
  regionPmi?: string;
  fdi?: string;                    // 外商直接投资
  supplyChainShift?: string;       // 制造业转移指数
  chinaPlus1?: string;             // 中国+1战略受益情况

  // 分国家
  // 越南
  vietnamGdp?: string;
  vietnamExports?: string;
  vietnamFdi?: string;
  vietnamDong?: string;            // USD/VND

  // 印尼
  indonesiaGdp?: string;
  indonesiaCpi?: string;
  indonesiaRate?: string;
  idrUsd?: string;
  jakartaComposite?: string;
  nickelExports?: string;          // 印尼关键出口

  // 泰国
  thailandGdp?: string;
  tourism?: string;
  thbUsd?: string;
  set?: string;                    // 泰国股指

  // 新加坡
  singaporeGdp?: string;
  singaporeCpi?: string;
  usdsgd?: string;
  sti?: string;                    // 海峡时报指数
  financialHubScore?: string;

  // 马来西亚
  malaysiaGdp?: string;
  semiconductorExports?: string;
  usdmyr?: string;
  klci?: string;

  // 菲律宾
  philippinesGdp?: string;
  remittances?: string;            // 海外汇款
  usdphp?: string;

  // 综合
  populationGrowth?: string;
  middleClassExpansion?: string;
  digitalEconomy?: string;
  overallOutlook?: string;
  investmentSignal?: SignalStrength;
  analystNotes?: string;
}

// ─── 中东 ─────────────────────────────────────────────
export interface MiddleEastData {
  // 能源
  brentOil?: string;
  wtioil?: string;
  opecProduction?: string;
  opecSpareCapacity?: string;      // 剩余产能
  saudiAramcoOutput?: string;
  oilFiscalBreakeven?: string;     // 财政平衡油价

  // 财政与主权财富基金
  swfAum?: string;                 // 主权财富基金规模（PIF、ADIA、QIA）
  pifStrategy?: string;            // 沙特PIF战略
  vision2030?: string;             // 沙特2030愿景进展
  fiscalBalance?: string;

  // 股票
  tadawul?: string;                // 沙特交易所
  dfm?: string;                    // 迪拜金融市场
  adx?: string;                    // 阿布扎比交易所

  // 房地产与旅游
  dubaiHousePrice?: string;
  dubaiRentalYield?: string;
  touristArrivals?: string;
  neomProgress?: string;           // NEOM项目进展

  // 地缘政治
  iranNuclear?: string;
  israelConflict?: string;
  usGccRelations?: string;
  chinaMiddleEast?: string;        // 中东与中国关系

  // 货币
  usdSar?: string;                 // 美元/沙特里亚尔（钉住汇率）
  usdAed?: string;

  overallOutlook?: string;
  investmentSignal?: SignalStrength;
  analystNotes?: string;
}

// ─── 南美 ─────────────────────────────────────────────
export interface SouthAmericaData {
  // 巴西
  brazilGdp?: string;
  brazilCpi?: string;
  brazilRate?: string;             // Selic Rate
  brlusd?: string;
  bovespa?: string;
  brazilFiscal?: string;           // 财政赤字/GDP
  brazilCurrentAccount?: string;

  // 阿根廷
  argentinaCpi?: string;           // 通胀率（全球最高之一）
  arsusd?: string;                 // 黑市/官方汇率
  argentinaDebt?: string;          // 主权债务状态
  imfProgram?: string;             // IMF 计划进展

  // 智利
  chileGdp?: string;
  copperProduction?: string;       // 铜产量（全球最大）
  usdclp?: string;

  // 大宗商品
  copperPrice?: string;
  ironorePrice?: string;
  soybeanPrice?: string;
  lithiumPrice?: string;           // 锂（南美锂三角）
  oilProduction?: string;          // 委内瑞拉/巴西石油

  // 整体
  regionGdpGrowth?: string;
  fdInflows?: string;
  politicalRisk?: string;          // 政治风险（左翼浪潮等）
  commodityCycle?: string;         // 大宗商品周期位置
  chinaTradeReliance?: string;     // 对华贸易依存度

  overallOutlook?: string;
  investmentSignal?: SignalStrength;
  analystNotes?: string;
}

// ─── 主数据结构 ───────────────────────────────────────
export interface RegionData {
  id: string;
  createdAt: string;
  updatedAt?: string;
  regionId: RegionId;
  title?: string;                  // 自定义标题（e.g. "2024Q3 美国经济快照"）
  snapshotDate?: string;           // 数据截止日期
  us?: USData;
  china?: ChinaData;
  europe?: EuropeData;
  japan?: JapanData;
  korea?: KoreaData;
  taiwan?: TaiwanData;
  hongkong?: HongKongData;
  southeast_asia?: SEAsiaData;
  middle_east?: MiddleEastData;
  south_america?: SouthAmericaData;
}