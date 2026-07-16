export type SignalStrength = 'strong_buy' | 'buy' | 'neutral' | 'sell' | 'strong_sell';
export type TrendDirection = 'up' | 'flat' | 'down';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

// ═══════════════════════════════════════════════════════
// 加密货币
// ═══════════════════════════════════════════════════════

export interface CryptoLayer1 {
  name?: string; tvl?: string; marketCap?: string; fdv?: string;
  tps?: string; gasFee?: string; validators?: string; stakingRatio?: string;
  activeAddress?: string; transaction?: string; developer?: string;
  revenue?: string; notes?: string;
}

export interface CryptoLayer2 {
  name?: string; tvl?: string; marketCap?: string; fdv?: string;
  tps?: string; gasFee?: string; activeAddress?: string; transaction?: string;
  sequencerRevenue?: string; bridgeVolume?: string; l1Settlement?: string; notes?: string;
}

export interface CryptoDeFi {
  protocol?: string; tvl?: string; revenue?: string; fee?: string;
  user?: string; borrow?: string; lending?: string; staking?: string;
  yield?: string; marketShare?: string; notes?: string;
}

export interface CryptoStablecoin {
  name?: string; supply?: string; marketCap?: string; mint?: string;
  burn?: string; dominance?: string; exchangeReserve?: string;
  chainDistribution?: string; holder?: string; reserveAsset?: string; notes?: string;
}

export interface CryptoRWA {
  rwatvl?: string; treasury?: string; privateCredit?: string;
  tokenizedBond?: string; tokenizedEquity?: string; yield?: string;
  institutionAdoption?: string; aum?: string; notes?: string;
}

export interface CryptoExchange {
  name?: string; spotVolume?: string; futuresVolume?: string;
  reserve?: string; proofOfReserve?: string; btcReserve?: string;
  ethReserve?: string; users?: string; marketShare?: string;
  listingActivity?: string; stablecoinBalance?: string; notes?: string;
}

export interface CryptoWallet {
  name?: string; mau?: string; download?: string; activeWallet?: string;
  connectedDapps?: string; security?: string; institutionAdoption?: string; notes?: string;
}

export interface CryptoToken {
  price?: string; marketCap?: string; fdv?: string; volume?: string;
  holder?: string; whale?: string; exchangeFlow?: string; velocity?: string; dormancy?: string;
  supply?: string; circulatingSupply?: string; unlock?: string; burn?: string;
  inflation?: string; emission?: string;
  etf?: string; funding?: string; oi?: string; liquidation?: string; notes?: string;
}

export interface CryptoNFT {
  collection?: string; floorPrice?: string; volume?: string; holders?: string;
  marketCap?: string; notes?: string;
}

export interface CryptoOnChain {
  btcActiveAddress?: string; ethGas?: string; exchangeReserve?: string;
  stablecoinSupply?: string; whaleMoves?: string; minerReserve?: string;
  etfFlow?: string; mvrv?: string; nupl?: string; hashRate?: string; notes?: string;
}

export interface CryptoData {
  totalMarketCap?: string; btcDominance?: string; ethDominance?: string;
  totalTvl?: string; fearGreedIndex?: string; stablecoinSupply?: string;
  etfAum?: string; institutionAdoption?: string;
  overallOutlook?: string; investmentSignal?: SignalStrength; analystNotes?: string;
  layer1?: CryptoLayer1; layer2?: CryptoLayer2; defi?: CryptoDeFi;
  stablecoin?: CryptoStablecoin; rwa?: CryptoRWA; exchange?: CryptoExchange;
  wallet?: CryptoWallet; token?: CryptoToken; nft?: CryptoNFT; onChain?: CryptoOnChain;
}

// ═══════════════════════════════════════════════════════
// 股票指数
// ═══════════════════════════════════════════════════════

export interface IndexQuote {
  price?: string; change?: string; changePct?: string;
  week52High?: string; week52Low?: string; volume?: string;
}
export interface IndexValuation {
  pe?: string; forwardPe?: string; pb?: string; dividendYield?: string; marketCap?: string;
}
export interface IndexEarnings {
  eps?: string; epsGrowth?: string; revenueGrowth?: string;
}
export interface IndexSector {
  techWeight?: string; financeWeight?: string; healthcareWeight?: string;
  consumerWeight?: string; energyWeight?: string; otherWeights?: string;
}
export interface IndexFlow {
  etfFlow?: string; institutionHolding?: string; foreignInflow?: string; optionOI?: string;
}
export interface IndexMacro {
  fedRate?: string; gdp?: string; cpi?: string; pce?: string;
  unemployment?: string; treasury10y?: string;
}
export interface SingleIndex {
  name?: string; quote?: IndexQuote; valuation?: IndexValuation;
  earnings?: IndexEarnings; sector?: IndexSector; flow?: IndexFlow;
  macro?: IndexMacro; investmentSignal?: SignalStrength; analystNotes?: string;
}

export interface IndexData {
  us?: { sp500?: SingleIndex; nasdaq100?: SingleIndex; dowJones?: SingleIndex; };
  china?: { shanghai?: SingleIndex; shenzhen?: SingleIndex; csi300?: SingleIndex; csi500?: SingleIndex; csi1000?: SingleIndex; chinext?: SingleIndex; star50?: SingleIndex; };
  hongkong?: { hsi?: SingleIndex; hsTech?: SingleIndex; hscei?: SingleIndex; };
  japan?: { nikkei225?: SingleIndex; topix?: SingleIndex; };
  korea?: { kospi?: SingleIndex; kosdaq?: SingleIndex; };
  taiwan?: { taiex?: SingleIndex; tw50?: SingleIndex; };
  europe?: { stoxx600?: SingleIndex; euroStoxx50?: SingleIndex; dax?: SingleIndex; cac40?: SingleIndex; ftse100?: SingleIndex; ibex35?: SingleIndex; ftseMib?: SingleIndex; };
  southeastAsia?: { sti?: SingleIndex; vnindex?: SingleIndex; jci?: SingleIndex; set?: SingleIndex; klci?: SingleIndex; psei?: SingleIndex; };
  india?: { nifty50?: SingleIndex; sensex?: SingleIndex; };
  southAmerica?: { bovespa?: SingleIndex; merval?: SingleIndex; ipsa?: SingleIndex; };
  middleEast?: { tadawul?: SingleIndex; adx?: SingleIndex; dfm?: SingleIndex; qe?: SingleIndex; bourse_kuwait?: SingleIndex; };
  global?: { msciWorld?: SingleIndex; msciAcwi?: SingleIndex; msciEM?: SingleIndex; ftseAllWorld?: SingleIndex; ftseEmerging?: SingleIndex; };
  volatility?: { vix?: SingleIndex; move?: SingleIndex; cryptoVix?: SingleIndex; };
  overallOutlook?: string; investmentSignal?: SignalStrength; analystNotes?: string;
}

// ═══════════════════════════════════════════════════════
// 大宗商品（基础版）
// ═══════════════════════════════════════════════════════

export interface CommodityItem {
  name?: string; price?: string; change?: string; changePct?: string;
  week52High?: string; week52Low?: string; unit?: string;
  supply?: string; demand?: string; inventory?: string;
  productionCost?: string; majorProducers?: string; majorConsumers?: string;
  usdCorrelation?: string; inflationCorrelation?: string;
  etfAum?: string; futuresOI?: string; specPosition?: string;
  forecast?: string; investmentSignal?: SignalStrength; analystNotes?: string;
}

// 大宗商品（细化版）
export interface CommodityDetailItem {
  // 市场行情
  price?: string; change?: string; changePct?: string;
  week52High?: string; week52Low?: string; volume?: string;
  // 供给
  globalProduction?: string; keyProducer1?: string; keyProducer2?: string;
  lmeInventory?: string; shInventory?: string; otherInventory?: string; scrapSupply?: string;
  // 需求
  chinaConsumption?: string; usEuConsumption?: string; evDemand?: string;
  constructionDemand?: string; manufacturingDemand?: string; otherDemand?: string;
  // 宏观
  dxy?: string; fedRate?: string; chinaPmi?: string; usPmi?: string;
  globalPmi?: string; gdp?: string; realYield?: string;
  cbGoldBuying?: string; etfHolding?: string;
  // 行业特有
  opecProduction?: string; usShaleOutput?: string; eiaInventory?: string;
  refineryRate?: string; demandForecast?: string;
  steelMillMargin?: string; realEstateDemand?: string; infraDemand?: string;
  crudeProduction?: string; usdaReport?: string; plantingArea?: string;
  yieldPerAcre?: string; weather?: string;
  // 风险
  strikeRisk?: string; warRisk?: string; weatherRisk?: string;
  exportRestriction?: string; envPolicy?: string; geopolitical?: string;
  investmentSignal?: SignalStrength; forecast?: string; analystNotes?: string;
}

export interface DetailedCommodityData {
  // 能源
  wti?: CommodityDetailItem; brent?: CommodityDetailItem;
  henryHub?: CommodityDetailItem; ttfGas?: CommodityDetailItem;
  lng?: CommodityDetailItem; diesel?: CommodityDetailItem;
  gasoline?: CommodityDetailItem; coal?: CommodityDetailItem;
  // 贵金属
  gold?: CommodityDetailItem; silver?: CommodityDetailItem;
  platinum?: CommodityDetailItem; palladium?: CommodityDetailItem;
  // 工业金属
  copper?: CommodityDetailItem; aluminum?: CommodityDetailItem;
  nickel?: CommodityDetailItem; zinc?: CommodityDetailItem;
  lead?: CommodityDetailItem; tin?: CommodityDetailItem;
  lithium?: CommodityDetailItem; cobalt?: CommodityDetailItem;
  rareEarth?: CommodityDetailItem;
  // 黑色系
  ironOre?: CommodityDetailItem; rebar?: CommodityDetailItem;
  hotRolled?: CommodityDetailItem; cokingCoal?: CommodityDetailItem;
  coke?: CommodityDetailItem;
  // 农产品
  corn?: CommodityDetailItem; wheat?: CommodityDetailItem;
  soybean?: CommodityDetailItem; rice?: CommodityDetailItem;
  cotton?: CommodityDetailItem; rapeseed?: CommodityDetailItem;
  // 软商品
  coffee?: CommodityDetailItem; cocoa?: CommodityDetailItem;
  sugar?: CommodityDetailItem; oj?: CommodityDetailItem; rubber?: CommodityDetailItem;
  overallOutlook?: string; investmentSignal?: SignalStrength; analystNotes?: string;
  //大宗商品指数
  crbIndex?: string;
  bloombergCommodity?: string;
}

// ═══════════════════════════════════════════════════════
// 债券（基础版）
// ═══════════════════════════════════════════════════════

export interface BondItem {
  yield?: string; price?: string; duration?: string;
  spread?: string; change?: string; rating?: string; analystNotes?: string;
}

// 债券（细化版）
export interface DetailedBondItem {
  yield?: string; price?: string; change?: string;
  week52High?: string; week52Low?: string;
  curve3m?: string; curve2y?: string; curve5y?: string; curve10y?: string; curve30y?: string;
  spread2y10y?: string; spread10y30y?: string; spreadVsUS?: string; spreadVsGermany?: string;
  fedRate?: string; cpi?: string; pce?: string; gdp?: string;
  unemployment?: string; fiscalDeficit?: string; bondIssuance?: string;
  foreignHolding?: string; chinaHolding?: string; japanHolding?: string;
  centralBankHolding?: string; etfFlow?: string; auctionResult?: string;
  defaultRisk?: string; fiscalRisk?: string; rating?: string;
  creditRisk?: string; durationRisk?: string;
  investmentSignal?: SignalStrength; analystNotes?: string;
}

export interface CorporateBondData {
  yield?: string; creditSpread?: string; duration?: string;
  rating?: string; defaultRisk?: string; cds?: string; analystNotes?: string;
}

export interface DetailedBondData {
  usT3m?: DetailedBondItem; usT2y?: DetailedBondItem; usT5y?: DetailedBondItem;
  usT10y?: DetailedBondItem; usT30y?: DetailedBondItem;
  cnB2y?: DetailedBondItem; cnB5y?: DetailedBondItem;
  cnB10y?: DetailedBondItem; cnB30y?: DetailedBondItem;
  jpB10y?: DetailedBondItem; jpB30y?: DetailedBondItem;
  deB10y?: DetailedBondItem; ukB10y?: DetailedBondItem;
  frB10y?: DetailedBondItem; itB10y?: DetailedBondItem;
  inB10y?: DetailedBondItem; brB10y?: DetailedBondItem;
  ig?: CorporateBondData; hy?: CorporateBondData;
  em?: CorporateBondData; tips?: DetailedBondItem; muni?: CorporateBondData;
  globalAgg?: string; emBondIndex?: string; usCorpIndex?: string;
  moveIndex?: string; overallOutlook?: string;
  investmentSignal?: SignalStrength; analystNotes?: string;
}

// ═══════════════════════════════════════════════════════
// 外汇
// ═══════════════════════════════════════════════════════

export interface FxPairData {
  rate?: string; change?: string; changePct?: string;
  week52High?: string; week52Low?: string; volatility?: string;
  baseCountryRate?: string; quoteCountryRate?: string;
  baseCpi?: string; quoteCpi?: string; baseGdp?: string; quoteGdp?: string;
  baseUnemployment?: string; quoteUnemployment?: string;
  rateDiff?: string; gdpDiff?: string; inflationDiff?: string;
  bond10yDiff?: string; m2Diff?: string;
  tradeBalance?: string; currentAccount?: string; fdi?: string;
  portfolioInflow?: string; fxReserveChange?: string;
  support?: string; resistance?: string; trend?: TrendDirection;
  investmentSignal?: SignalStrength; analystNotes?: string;
}

export interface FxMacro {
  dxy?: string; dxyChange?: string; globalFxReserve?: string;
  usdShareOfReserve?: string; globalCBRates?: string; carryTrade?: string;
  globalCapitalFlow?: string; g10Ranking?: string; usdLiquidity?: string;
  overallOutlook?: string; analystNotes?: string;
}

export interface FxData {
  macro?: FxMacro;
  eurusd?: FxPairData; usdjpy?: FxPairData; gbpusd?: FxPairData;
  usdchf?: FxPairData; audusd?: FxPairData; usdcad?: FxPairData;
  usdcnh?: FxPairData; usdcny?: FxPairData; usdsgd?: FxPairData;
  usdhkd?: FxPairData; usdkrw?: FxPairData; usdtwd?: FxPairData;
  usduae?: FxPairData; usdsar?: FxPairData;
  usdvnd?: FxPairData; usdidr?: FxPairData; usdthb?: FxPairData;
  usdmyr?: FxPairData; usdphp?: FxPairData;
  usdbrl?: FxPairData; usdars?: FxPairData; usdclp?: FxPairData;
  overallOutlook?: string; investmentSignal?: SignalStrength; analystNotes?: string;
}

// ═══════════════════════════════════════════════════════
// 房地产
// ═══════════════════════════════════════════════════════

export interface REMacro {
  // 全球宏观
  globalRateEnv?: string;          // 全球利率环境
  mortgageRateTrend?: string;      // 房贷利率趋势
  globalCapitalFlow?: string;      // 全球资本流向房地产
  globalREIndex?: string;          // 全球RE指数（MSCI RE等）
  reitsPerformance?: string;       // REITs市场表现

  // 美国宏观
  usMortgage30y?: string;
  usMortgage15y?: string;
  usCaseShiller?: string;          // Case-Shiller全国指数
  usHousingStarts?: string;
  usExistingHomeSales?: string;
  usNAR?: string;                  // NAR可负担指数
  usForeclosure?: string;          // 全美法拍数量

  // 中国宏观
  cnLpr5y?: string;
  cn70CityIndex?: string;          // 70城房价指数
  cnRealEstateInvestment?: string; // 房地产开发投资
  cnLandSales?: string;            // 土地出让收入
  cnDeveloperDebt?: string;        // 房企债务风险
  cnSalesArea?: string;            // 商品房销售面积

  // 政策
  fedPolicy?: string;
  pbocPolicy?: string;
  macroprudential?: string;        // 宏观审慎政策（LTV限制等）

  overallOutlook?: string;
  investmentSignal?: SignalStrength;
  analystNotes?: string;
}

export interface CityREData {
  // ── 价格 ──
  priceIndex?: string;             // 房价指数（CS/HPI等）
  medianPrice?: string;            // 中位房价
  pricePerSqm?: string;            // 平方米单价
  avgTransactionPrice?: string;    // 成交均价
  luxuryPrice?: string;            // 豪宅均价（Top 10%）
  change1y?: string;               // 近1年涨跌
  change5y?: string;               // 近5年涨跌
  priceHistory?: string;           // 历史走势简述

  // ── 租赁市场 ──
  avgRent?: string;                // 平均月租金
  rentGrowth?: string;             // 租金增长率（YoY）
  occupancyRate?: string;          // 出租率
  priceToRentRatio?: string;       // 租售比（月租/房价，越低越贵）
  grossRentalYield?: string;       // 毛租金收益率（年租/房价）
  netRentalYield?: string;         // 净租金收益率（扣税费）

  // ── 供给 ──
  monthsSupply?: string;           // 月库存（去化周期）
  activeListings?: string;         // 挂牌待售数量
  newHousingStarts?: string;       // 新开工住宅
  buildingPermits?: string;        // 建筑许可
  vacancyRate?: string;            // 空置率
  completionRate?: string;         // 竣工率

  // ── 需求 ──
  salesVolume?: string;            // 成交量（套/面积）
  unitsSold?: string;              // 成交套数
  pendingSales?: string;           // 合同待签（领先指标）
  mortgageApplications?: string;   // 抵押贷款申请数（领先）
  firstTimeBuyerPct?: string;      // 首次购房者比例
  investorPct?: string;            // 投资客比例
  foreignBuyerPct?: string;        // 境外买家比例

  // ── 融资 ──
  mortgage30y?: string;            // 30年房贷利率
  mortgage15y?: string;            // 15年房贷利率
  avgLoanRate?: string;            // 当地平均贷款利率
  ltvRatio?: string;               // 贷款价值比（LTV）
  dtiRatio?: string;               // 债务收入比（DTI）
  loanApprovalRate?: string;       // 贷款批准率
  defaultRate?: string;            // 违约率/不良贷款率
  foreclosures?: string;           // 法拍数量

  // ── 人口与社会 ──
  popGrowthRate?: string;          // 人口增长率
  netMigration?: string;           // 净迁入（正=迁入，负=迁出）
  newHouseholds?: string;          // 新增家庭数（有效住房需求）
  householdIncome?: string;        // 家庭收入中位数
  affordabilityIndex?: string;     // 可负担指数（收入/房价）
  collegeGradRate?: string;        // 大学毕业率（人才吸引力）

  // ── 经济 ──
  gdp?: string;                    // 城市/地区GDP
  wageGrowth?: string;             // 工资增长率
  unemployment?: string;           // 失业率
  jobGrowth?: string;              // 就业增长率
  gdpPerCapita?: string;           // 人均GDP（购买力代理）
  hnwi?: string;                   // 高净值人口数量
  fortune500Hq?: string;           // 500强总部数（可选）

  // ── 政策 ──
  propertyTax?: string;            // 房产税（%/年）
  stampDuty?: string;              // 印花税（部分城市）
  rentControl?: string;            // 租金管制状态
  foreignBuyerPolicy?: string;     // 外国人购房政策
  landPolicy?: string;             // 土地政策（供地节奏）
  housingSubsidy?: string;         // 住房补贴/保障房政策
  coolMeasures?: string;           // 冷却措施（限购/限贷等）
  taxIncentive?: string;           // 税收优惠政策

  // ── 风险 ──
  bubbleIndex?: string;            // 泡沫指数（UBS RE Bubble Index）
  affordabilityRisk?: string;      // 可负担性风险
  vacancyRisk?: string;            // 空置率风险
  naturalDisasterRisk?: string;    // 自然灾害风险
  floodRisk?: string;              // 洪水风险
  climateRisk?: string;            // 气候变化长期风险
  crimeRate?: string;              // 犯罪率
  insuranceCost?: string;          // 保险成本（$/年）
  policyRisk?: string;             // 政策风险（税收/监管）

  investmentSignal?: SignalStrength;
  analystNotes?: string;
}

export interface RESubMarket {
  residential?: string;            // 住宅
  commercial?: string;             // 商业地产（综述）
  office?: string;                 // 写字楼（空置率/租金/远程办公）
  retail?: string;                 // 零售（人流/电商冲击）
  industrial?: string;             // 工业/仓储（供应链/电商驱动）
  dataCenter?: string;             // 数据中心（AI驱动新需求）
  luxury?: string;                 // 豪宅
  affordable?: string;             // 保障性住房
  seniorHousing?: string;          // 养老地产（人口老龄化）
  tourism?: string;                // 旅游/短租（Airbnb效应）
  analystNotes?: string;
}

// ═══════════════════════════════════════════════════════
// 公募基金
// ═══════════════════════════════════════════════════════
export interface FundData {
  fundName?: string;
  manager?: string;
  strategy?: string;
  aum?: string;
  inceptionDate?: string;
  currency?: string;
  returnYTD?: string;
  return1y?: string;
  return3y?: string;
  return5y?: string;
  sharpeRatio?: string;
  maxDrawdown?: string;
  volatility?: string;
  beta?: string;
  alpha?: string;
  managementFee?: string;
  performanceFee?: string;
  expenseRatio?: string;
  liquidity?: string;
  lockupPeriod?: string;
  minInvestment?: string;
  benchmark?: string;
  investmentSignal?: SignalStrength;
  analystNotes?: string;
}

export interface RealEstateData {
  macro?: REMacro;
  // 美国
  newYork?: CityREData; losAngeles?: CityREData; sanFrancisco?: CityREData;
  miami?: CityREData; austin?: CityREData; seattle?: CityREData;
  boston?: CityREData; dallas?: CityREData;
  // 中国
  beijing?: CityREData; shanghai?: CityREData; shenzhen?: CityREData;
  guangzhou?: CityREData; hangzhou?: CityREData; chengdu?: CityREData;
  chongqing?: CityREData; suzhou?: CityREData;
  // 日本
  tokyo?: CityREData; osaka?: CityREData;
  // 亚洲
  hongkong?: CityREData; taipei?: CityREData; seoul?: CityREData;
  // 欧洲
  london?: CityREData; paris?: CityREData; berlin?: CityREData;
  amsterdam?: CityREData; madrid?: CityREData;
  // 东南亚
  singapore?: CityREData; bangkok?: CityREData; kualaLumpur?: CityREData;
  jakarta?: CityREData; hochiminh?: CityREData; manila?: CityREData;
  // 中东
  dubai?: CityREData; riyadh?: CityREData; abuDhabi?: CityREData;
  // 南美
  saoPaulo?: CityREData; buenosAires?: CityREData; santiago?: CityREData;
  // 细分市场
  subMarkets?: RESubMarket;
  overallOutlook?: string;
  investmentSignal?: SignalStrength;
  analystNotes?: string;
}

// ═══════════════════════════════════════════════════════
// 股票（个股研究，区别于指数）
// ═══════════════════════════════════════════════════════

export interface StockMarketMacro {
  // 市场整体
  indexPerformance?: string;     // 代表指数表现
  marketCap?: string;            // 总市值
  tradingVolume?: string;        // 日均成交量
  marketPe?: string;             // 市场整体PE
  marketPb?: string;             // 市场整体PB
  dividendYield?: string;        // 市场平均股息率
  // 资金
  foreignFlow?: string;          // 外资流入/流出
  institutionActivity?: string;  // 机构动向
  etfFlow?: string;              // ETF资金流
  marginBalance?: string;        // 融资余额
  shortInterest?: string;        // 做空比例
  // 宏观
  gdpGrowth?: string;
  cpi?: string;
  centralBankRate?: string;
  currency?: string;             // 本币汇率
  // 情绪
  vix?: string;                  // 波动率指数
  bullBearRatio?: string;        // 牛熊比例
  putCallRatio?: string;
  // 政策
  regulatoryEnv?: string;        // 监管环境
  geopoliticalRisk?: string;     // 地缘政治风险
  marketAccessRisk?: string;     // 市场准入风险
  analystNotes?: string;
}

export interface StockSector {
  name?: string;                 // 板块名称
  weight?: string;               // 市值权重
  performance?: string;          // 近期表现
  pe?: string;
  outlook?: string;
  topPicks?: string;             // 精选标的
}

export interface SingleStock {
  // 基本
  ticker?: string;
  name?: string;
  exchange?: string;
  sector?: string;
  industry?: string;
  // 行情
  price?: string;
  change?: string;
  changePct?: string;
  week52High?: string;
  week52Low?: string;
  volume?: string;
  avgVolume?: string;
  // 估值
  pe?: string;
  forwardPe?: string;
  pb?: string;
  ps?: string;
  evEbitda?: string;
  evSales?: string;
  peg?: string;
  dividendYield?: string;
  marketCap?: string;
  // 财务质量
  revenue?: string;
  revenueGrowth?: string;
  grossMargin?: string;
  operatingMargin?: string;
  netMargin?: string;
  freeCashFlow?: string;
  fcfYield?: string;
  eps?: string;
  epsGrowth?: string;
  roe?: string;
  roic?: string;
  debtEquity?: string;
  currentRatio?: string;
  // 资金面
  institutionHolding?: string;
  insiderBuying?: string;
  shortInterest?: string;
  putCallRatio?: string;
  etfWeight?: string;
  // 分析师
  analystConsensus?: string;
  priceTarget?: string;
  upside?: string;
  // 护城河
  moat?: string;
  competitiveAdvantage?: string;
  businessModel?: string;
  // 风险
  keyRisks?: string;
  investmentSignal?: SignalStrength;
  analystNotes?: string;
}

export interface StockMarketData {
  macro?: StockMarketMacro;
  // 核心板块
  technology?: StockSector;
  finance?: StockSector;
  healthcare?: StockSector;
  consumer?: StockSector;
  energy?: StockSector;
  industrial?: StockSector;
  realestate?: StockSector;
  materials?: StockSector;
  utilities?: StockSector;
  communication?: StockSector;
  // 个股列表（可添加多个）
  watchlist?: SingleStock[];
  investmentSignal?: SignalStrength;
  analystNotes?: string;
}

export interface StockData {
  // 按市场分类
  usStock?: StockMarketData;        // 美股（NYSE/NASDAQ）
  hkStock?: StockMarketData;        // 港股
  chinaAShare?: StockMarketData;    // A股
  europeStock?: StockMarketData;    // 欧股
  japanStock?: StockMarketData;     // 日股
  koreaStock?: StockMarketData;     // 韩股
  taiwanStock?: StockMarketData;    // 台湾股市
  seaStock?: StockMarketData;       // 东南亚股市
  southAmericaStock?: StockMarketData; // 南美股市
  indiaStock?: StockMarketData;     // 印度股市
  overallOutlook?: string;
  investmentSignal?: SignalStrength;
  analystNotes?: string;
}


// ═══════════════════════════════════════════════════════
// 存款 / 货币市场
// ═══════════════════════════════════════════════════════

export interface DepositRateItem {
  demand?: string;           // 活期利率
  fixed3m?: string;          // 3个月定期
  fixed6m?: string;          // 6个月定期
  fixed1y?: string;          // 1年定期
  fixed3y?: string;          // 3年定期
  fixed5y?: string;          // 5年定期
  mmf?: string;              // 货币基金收益率
  notes?: string;
}

export interface DepositData {
  // 各国存款利率
  us?: DepositRateItem;          // 美国（Fed管控）
  china?: DepositRateItem;       // 中国（PBOC基准）
  eurozone?: DepositRateItem;    // 欧元区
  japan?: DepositRateItem;       // 日本
  uk?: DepositRateItem;          // 英国
  singapore?: DepositRateItem;   // 新加坡
  hongkong?: DepositRateItem;    // 香港
  australia?: DepositRateItem;   // 澳大利亚

  // 货币市场工具
  usTBill3m?: string;            // 美国3个月国债（无风险利率基准）
  sofrRate?: string;             // SOFR隔夜利率
  fedFundsRate?: string;         // 联邦基金利率
  chinaLpr1y?: string;           // 中国LPR 1年
  chinaLpr5y?: string;           // 中国LPR 5年
  chinaMLF?: string;             // 中国MLF利率
  chinaRRR?: string;             // 存款准备金率

  // 横向比较（帮助资产配置决策）
  globalRealRate?: string;       // 全球实际利率对比
  yieldVsInflation?: string;     // 存款收益 vs 通胀（实际购买力）
  yieldVsBond10y?: string;       // 存款 vs 10Y国债
  yieldVsEquity?: string;        // 存款 vs 股票股息率
  yieldVsREYield?: string;       // 存款 vs 租金收益率
  opportunityCost?: string;      // 机会成本分析

  // 宏观
  globalCentralBankPolicy?: string;   // 全球央行政策方向
  rateHikeCycle?: string;             // 加息/降息周期位置
  inflationOutlook?: string;          // 通胀展望
  currencyRisk?: string;              // 外币存款汇率风险

  overallOutlook?: string;
  analystNotes?: string;
}


// ═══════════════════════════════════════════════════════
// 私募 / 公募
// ═══════════════════════════════════════════════════════

export interface PEFundCompany {
  // 机构基本信息
  firmName?: string;             // 机构名称
  firmType?: string;             // PE / VC / 成长型 / 并购型 / 地产基金 / 对冲基金
  founded?: string;              // 成立年份
  headquarters?: string;         // 总部
  aum?: string;                  // 管理规模
  partners?: string;             // 核心合伙人
  lps?: string;                  // 主要LP（出资人）
  website?: string;

  // 投资策略
  strategy?: string;             // 核心策略
  focusSectors?: string;         // 重点行业
  geographicFocus?: string;      // 地理侧重
  stagePreference?: string;      // 阶段偏好（种子/天使/A/B/成长/并购）
  ticketSize?: string;           // 单笔投资规模
  holdingPeriod?: string;        // 平均持有期
  irr?: string;                  // 历史IRR（内部收益率）
  moic?: string;                 // MOIC（投资回报倍数）
  tvpi?: string;                 // TVPI（总价值/实缴资本）
  dpi?: string;                  // DPI（已分配/实缴资本）
  rvpi?: string;                 // RVPI（剩余价值/实缴资本）

  // 当前基金
  currentFundName?: string;      // 当前基金名称
  currentFundSize?: string;      // 当前基金规模
  vintage?: string;              // 年份（Vintage Year）
  deployed?: string;             // 已部署比例
  reserveRatio?: string;         // 预留后续跟投比例
  managementFee?: string;        // 管理费（通常2%）
  carriedInterest?: string;      // 绩效分成（通常20%）
  hurdleRate?: string;           // 最低收益率门槛
  minCommitment?: string;        // 最低认购额

  // 历史基金表现
  fundTrackRecord?: string;      // 历史基金业绩列表
  exitHistory?: string;          // 退出案例（IPO/并购/清算）
  successfulExits?: string;      // 成功退出数量
  failedInvestments?: string;    // 失败/减值投资

  // 代表性投资组合
  portfolioHighlights?: string;  // 代表性被投企业
  unicorns?: string;             // 培育的独角兽
  sectorExposure?: string;       // 当前组合行业分布

  // 团队
  ceo?: string;
  managingPartners?: string;
  investmentTeamSize?: string;
  networkStrength?: string;      // 资源网络评估

  // 市场地位
  ranking?: string;              // 行业排名（PitchBook/Preqin）
  reputation?: string;           // 行业声誉
  coinvestors?: string;          // 常见联合投资方
  competitiveDiff?: string;      // 差异化竞争优势

  // 宏观与退出环境
  ipoWindow?: string;            // IPO窗口评估
  maActivity?: string;           // 并购市场活跃度
  secondaryMarket?: string;      // 二级市场（S市场）
  valuationEnv?: string;         // 估值环境（利率/倍数）
  exitTimeline?: string;         // 预计退出时间窗口

  // 风险
  concentrationRisk?: string;    // 集中度风险
  vintageRisk?: string;          // 年份风险
  liquidityRisk?: string;        // 流动性风险
  regulatoryRisk?: string;       // 监管风险
  currencyRisk?: string;         // 汇率风险（跨境基金）
  gpRisk?: string;               // GP风险（团队稳定性）

  investmentSignal?: SignalStrength;
  analystNotes?: string;
}

export interface PEData {
  // 宏观私募市场环境
  globalPEAum?: string;          // 全球PE市场规模
  dryPowder?: string;            // Dry Powder（待部署资金）
  fundraisingEnv?: string;       // 募资环境
  dealflow?: string;             // Deal Flow活跃度
  valuationMultiple?: string;    // 市场平均估值倍数（EV/EBITDA）
  exitEnv?: string;              // 退出环境
  rateImpact?: string;           // 利率对PE估值的影响
  vintageAnalysis?: string;      // 年份分析（哪个vintage最有吸引力）
  secureDistribution?: string;   // 已分配收益情况
  lpSentiment?: string;          // LP情绪/再投资意愿
  gpLpDynamics?: string;         // GP-LP关系动态

  // 按策略分类概览
  buyout?: string;               // 杠杆收购（LBO）市场
  growthEquity?: string;         // 成长型PE
  venture?: string;              // 风险投资（VC）
  creditFunds?: string;          // 私募信贷
  infrastructure?: string;       // 基础设施基金
  realAssets?: string;           // 实物资产

  // 按地区概览
  usMarket?: string;             // 美国PE市场
  chinaMarket?: string;          // 中国PE/VC市场
  europeMarket?: string;         // 欧洲PE市场
  asiaExChina?: string;          // 亚太（除中国）
  emergingMarkets?: string;      // 新兴市场

  // 具体基金公司研究（可添加多家）
  firms?: PEFundCompany[];

  overallOutlook?: string;
  investmentSignal?: SignalStrength;
  analystNotes?: string;
}

// ═══════════════════════════════════════════════════════
// 期货
// ═══════════════════════════════════════════════════════

export interface FuturesData {
  contractName?: string; exchange?: string; underlying?: string;
  price?: string; change?: string; changePct?: string;
  volume?: string; openInterest?: string; settlementDate?: string;
  contango?: string; backwardation?: string;
  basisSpread?: string; rollCost?: string;
  specPosition?: string; commercialPosition?: string;
  investmentSignal?: SignalStrength; analystNotes?: string;
}

// ═══════════════════════════════════════════════════════
// 期权
// ═══════════════════════════════════════════════════════

export interface OptionsData {
  underlying?: string; expiry?: string;
  impliedVolatility?: string; ivRank?: string; ivPercentile?: string;
  putCallRatio?: string; maxPain?: string;
  skew?: string; termStructure?: string;
  delta?: string; gamma?: string; theta?: string; vega?: string;
  notionalOI?: string; unusualActivity?: string;
  investmentSignal?: SignalStrength; analystNotes?: string;
}

// ═══════════════════════════════════════════════════════
// 保险
// ═══════════════════════════════════════════════════════

export interface InsuranceData {
  productName?: string; insurer?: string; type?: string;
  premium?: string; coverage?: string; term?: string;
  guaranteedReturn?: string; dividendHistory?: string;
  cashValue?: string; irr?: string;
  rating?: string; solvencyRatio?: string;
  analystNotes?: string;
}

// ═══════════════════════════════════════════════════════
// 主数据结构
// ═══════════════════════════════════════════════════════

export type AssetSubType =
  | 'crypto' | 'index' | 'bond' | 'commodity' | 'fx' | 'realestate'
  | 'stock' | 'deposit' | 'pe' | 'fund' | 'futures' | 'options' | 'insurance';

export interface AssetData {
  id: string;
  createdAt: string;
  updatedAt?: string;
  assetSubType: AssetSubType;
  title?: string;
  snapshotDate?: string;

  crypto?: CryptoData;
  index?: IndexData;
  bond?: DetailedBondData;
  commodity?: DetailedCommodityData;
  fx?: FxData;
  realestate?: RealEstateData;
  stock?: StockData;
  deposit?: DepositData;
  pe?: PEData;   // 加了这里，researchview.tsx就不会报错了
  fund?: FundData;
  futures?: FuturesData;
  options?: OptionsData;
  insurance?: InsuranceData;
}