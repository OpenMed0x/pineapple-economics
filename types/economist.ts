export type SchoolOfThought =
  | 'keynesian' | 'monetarist' | 'austrian' | 'behavioral'
  | 'institutional' | 'neoclassical' | 'post-keynesian'
  | 'mmt' | 'supply-side' | 'other';

export type PredictionAccuracy = 'excellent' | 'good' | 'mixed' | 'poor';
export type MarketRelevance = 'high' | 'medium' | 'low';
export type SignalStrength = 'strong_buy' | 'buy' | 'neutral' | 'sell' | 'strong_sell';

export interface EconomistBasicInfo {
  name?: string;                    // 姓名
  nameEn?: string;                  // 英文名
  birthYear?: string;               // 出生年份
  nationality?: string;             // 国籍
  currentAffiliation?: string;      // 当前所在机构
  title?: string;                   // 职称/头衔
  education?: string;               // 教育背景
  awards?: string;                  // 获奖记录（诺贝尔等）
  website?: string;                 // 个人官网
  twitter?: string;                 // Twitter/X
  wikipedia?: string;               // Wikipedia
  photo?: string;                   // 头像URL（可选）
}

export interface EconomistTheory {
  schoolOfThought?: SchoolOfThought; // 所属学派
  schoolDesc?: string;              // 学派描述
  coreTheories?: string;            // 核心理论（主要贡献）
  keyStrategies?: string;           // 重要策略
  famousModels?: string;            // 著名模型/框架（如IS-LM、菲利普斯曲线）
  keyEquations?: string;            // 代表性公式/方程
  macroView?: string;               // 宏观经济观
  microView?: string;               // 微观经济观
  monetaryView?: string;            // 货币政策立场
  fiscalView?: string;              // 财政政策立场
  tradeView?: string;               // 贸易政策立场
  regulationView?: string;          // 监管立场
  critiquesOfOthers?: string;       // 对其他学派的批评
  critiquesReceived?: string;       // 受到的主要批评
}

export interface EconomistPublications {
  majorBooks?: string;              // 代表著作
  seminalPapers?: string;           // 奠基性论文
  googleScholarCitations?: string;  // Google Scholar 引用数
  hIndex?: string;                  // h指数
  recentPublications?: string;      // 近期发表
  popularWritings?: string;         // 大众读物/专栏
  substack?: string;                // Substack/博客
  podcasts?: string;                // 播客/访谈
}

export interface EconomistPredictions {
  famousPredictions?: string;       // 著名预测（成功案例）
  failedPredictions?: string;       // 著名失误
  predictionAccuracy?: PredictionAccuracy;
  trackRecord?: string;             // 整体预测记录描述
  currentOutlook?: string;          // 当前市场展望
  inflationView?: string;           // 通胀观点
  growthView?: string;              // 增长观点
  rateView?: string;                // 利率观点
  recessionRisk?: string;           // 衰退风险判断
  chinaView?: string;               // 对中国经济的看法
  geopoliticsView?: string;         // 地缘政治经济影响
}

export interface EconomistInvestment {
  investmentPhilosophy?: string;    // 投资哲学
  assetAllocation?: string;         // 推荐资产配置
  stockView?: string;               // 股票观点
  bondView?: string;                // 债券观点
  goldView?: string;                // 黄金观点
  cryptoView?: string;              // 加密货币观点
  realEstateView?: string;          // 房地产观点
  currencyView?: string;            // 汇率观点
  sectorPreferences?: string;       // 偏好行业/板块
  riskManagement?: string;          // 风险管理建议
  timeHorizon?: string;             // 推荐投资周期
  overallSignal?: SignalStrength;   // 综合市场信号
  keyIndicators?: string;           // 关注的核心指标
  tradingRules?: string;            // 代表性交易规则/原则
}

export interface EconomistInfluence {
  influencedBy?: string;            // 师承/影响来源
  influencedWhom?: string;          // 影响了哪些人
  students?: string;                // 著名学生
  policyImpact?: string;            // 政策影响力（曾担任顾问等）
  centralBankInfluence?: string;    // 对央行的影响
  governmentRoles?: string;         // 政府职务
  marketImpact?: string;            // 发言对市场的影响力
  mediaPresence?: string;           // 媒体出现频率
  marketRelevance?: MarketRelevance;// 当前市场相关度
}

export interface EconomistApplicability {
  applicableRegimes?: string;       // 适用的经济环境
  inapplicableRegimes?: string;     // 不适用的经济环境
  currentApplicability?: string;    // 当前环境下的适用性分析
  strengthsWeaknesses?: string;     // 理论优势与局限
  howToApply?: string;              // 如何将其理论用于投资
  compatibleStrategies?: string;    // 与其搭配的其他策略
  conflictingViews?: string;        // 与哪些经济学家观点冲突
  personalNotes?: string;           // 个人研究笔记
}

export interface EconomistData {
  id: string;
  createdAt: string;
  updatedAt?: string;
  basicInfo: EconomistBasicInfo;
  theory: EconomistTheory;
  publications: EconomistPublications;
  predictions: EconomistPredictions;
  investment: EconomistInvestment;
  influence: EconomistInfluence;
  applicability: EconomistApplicability;
}