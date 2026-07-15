export interface EnterpriseBasicInfo {
  companyName?: string;
  founded?: string;
  registeredLocation?: string;
  headquarters?: string;
  founders?: string;
  ceo?: string;
  managementTeam?: string;
  employeeCount?: string;
  companyType?: string;
  isPublic?: boolean;
  stockCode?: string;
  website?: string;
  contact?: string;
}

export interface BusinessModel {
  revenueStreams?: string;
  pricingModel?: string;
  customerType?: string;
  costStructure?: string;
  keyResources?: string;
}

export interface ProductAnalysis {
  productMatrix?: string;
  positioning?: string;
  features?: string;
  lifecycle?: string;
  pricing?: string;
  customerReviews?: string;
  mau?: string;
  dau?: string;
  retention?: string;
  growthRate?: string;
  competitiveness?: string;
  featureScore?: string;
  innovationLevel?: string;
  techBarrier?: string;
  replicability?: string;
  ux?: string;
}

export interface MarketAnalysis {
  marketSize?: string;
  marketGrowthRate?: string;
  marketMaturity?: string;
  industryCycle?: string;
  industryConcentration?: string;
  industryProfitMargin?: string;
  futureTrends?: string;
  policyImpact?: string;
}

export interface CompetitionAnalysis {
  price?: string;
  product?: string;
  channel?: string;
  brand?: string;
  technology?: string;
  aiCapability?: string;
  service?: string;
  marketShare?: string;
  internationalization?: string;
}

export interface CustomerAnalysis {
  ageGroup?: string;
  industry?: string;
  region?: string;
  companySize?: string;
  income?: string;
  spendingPower?: string;
  customerBehavior?: string;
  purchaseCycle?: string;
  renewalRate?: string;
  churnRate?: string;
  nps?: string;
  csat?: string;
}

export interface GrowthAnalysis {
  organicGrowth?: string;
  paidAds?: string;
  seo?: string;
  referral?: string;
  channels?: string;
  salesTeam?: string;
  partnerships?: string;
  apiEcosystem?: string;
}

export interface FinancialAnalysis {
  // 上市公司
  revenue?: string;
  netProfit?: string;
  cashFlow?: string;
  balanceSheet?: string;
  rde?: string;
  roa?: string;
  eps?: string;
  grossMargin?: string;
  operatingMargin?: string;
  freeCashFlow?: string;
  debt?: string;
  workingCapital?: string;
  // 创业公司
  runway?: string;
  burnRate?: string;
  cashBalance?: string;
  mrr?: string;
  arr?: string;
  cac?: string;
  ltv?: string;
  startupGrossMargin?: string;
  paybackPeriod?: string;
}

export interface FundingAnalysis {
  seed?: string;
  angel?: string;
  seriesA?: string;
  seriesB?: string;
  seriesC?: string;
  ipo?: string;
  ma?: string;
  spac?: string;
  investors?: string;
  valuation?: string;
  fundingAmount?: string;
  shareholdingRatio?: string;
  fundingPurpose?: string;
}

export interface TeamAnalysis {
  ceo?: string;
  cfo?: string;
  cto?: string;
  background?: string;
  education?: string;
  entrepreneurialHistory?: string;
  exitHistory?: string;
  industryExperience?: string;
  linkedin?: string;
  github?: string;
  papers?: string;
  patents?: string;
  publicSpeaking?: string;
}

export interface TechAnalysis {
  techStack?: string;
  architecture?: string;
  models?: string;
  database?: string;
  api?: string;
  cloudPlatform?: string;
  security?: string;
  openSource?: string;
  githubStars?: string;
  githubCommits?: string;
  githubContributors?: string;
  license?: string;
  patentCount?: string;
  rdInvestment?: string;
}

export interface BrandAnalysis {
  brandSentiment?: string;
  reputation?: string;
  rating?: string;
  reviews?: string;
  userFeedback?: string;
  devCommunity?: string;
  reddit?: string;
  githubDiscussion?: string;
  zhihu?: string;
  twitter?: string;
  tiktok?: string;
  linkedin?: string;
  youtube?: string;
  mediaExposure?: string;
  searchVolume?: string;
  googleTrends?: string;
}

export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface LegalAnalysis {
  policyRisk?: RiskLevel;
  legalRisk?: RiskLevel;
  competitionRisk?: RiskLevel;
  techRisk?: RiskLevel;
  talentRisk?: RiskLevel;
  cashFlowRisk?: RiskLevel;
  supplyChainRisk?: RiskLevel;
  aiRisk?: RiskLevel;
  cyberSecurityRisk?: RiskLevel;
  dataSecurityRisk?: RiskLevel;
  internationalTradeRisk?: RiskLevel;
  fxRisk?: RiskLevel;
  geopoliticalRisk?: RiskLevel;
}

export interface ValuationAnalysis {
  // 上市公司
  dcf?: string;
  peRatio?: string;
  psRatio?: string;
  evEbitda?: string;
  evSales?: string;
  peg?: string;
  ddm?: string;
  comparableCompany?: string;
  comparableTransaction?: string;
  // 初创公司
  equityValue?: string;
  shareValue?: string;
  valuationRange?: string;
  bearCase?: string;
  baseCase?: string;
  bullCase?: string;
  sensitivityGrowthRate?: string;
  sensitivityMargin?: string;
  sensitivityDiscountRate?: string;
}

export interface EnterpriseData {
  id: string;
  createdAt: string;
  basicInfo: EnterpriseBasicInfo;
  businessModel: BusinessModel;
  productAnalysis: ProductAnalysis;
  marketAnalysis: MarketAnalysis;
  competitionAnalysis: CompetitionAnalysis;
  customerAnalysis: CustomerAnalysis;
  growthAnalysis: GrowthAnalysis;
  financialAnalysis: FinancialAnalysis;
  fundingAnalysis: FundingAnalysis;
  teamAnalysis: TeamAnalysis;
  techAnalysis: TechAnalysis;
  brandAnalysis: BrandAnalysis;
  legalAnalysis: LegalAnalysis;
  valuationAnalysis: ValuationAnalysis;
}