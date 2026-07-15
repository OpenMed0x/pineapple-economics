"use client";

import React, { useState } from 'react';
import { EnterpriseData, RiskLevel } from '../../types/enterprise';

interface EnterpriseFormProps {
  onSubmit: (data: EnterpriseData) => void;
  onCancel: () => void;
  initialData?: Partial<EnterpriseData>;
}

const TABS = [
  { id: 'basic',       label: '基本信息' },
  { id: 'business',    label: '商业模式' },
  { id: 'product',     label: '产品分析' },
  { id: 'market',      label: '市场分析' },
  { id: 'competition', label: '竞争分析' },
  { id: 'customer',    label: '客户分析' },
  { id: 'growth',      label: '增长分析' },
  { id: 'financial',   label: '财务分析' },
  { id: 'funding',     label: '融资分析' },
  { id: 'team',        label: '团队分析' },
  { id: 'tech',        label: '技术分析' },
  { id: 'brand',       label: '品牌分析' },
  { id: 'legal',       label: '法律风险' },
  { id: 'valuation',   label: '企业估值' },
];

const RISK_OPTIONS: { value: RiskLevel; label: string; color: string }[] = [
  { value: 'low',      label: 'Low',      color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'medium',   label: 'Medium',   color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { value: 'high',     label: 'High',     color: 'bg-orange-100 text-orange-700 border-orange-200' },
  { value: 'critical', label: 'Critical', color: 'bg-rose-100 text-rose-700 border-rose-200' },
];

// 通用输入组件
const Field = ({ label, value, onChange, placeholder, multiline = false }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; multiline?: boolean;
}) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-slate-500">{label}</label>
    {multiline ? (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? `输入${label}...`}
        rows={3}
        className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 focus:bg-white transition-all resize-none placeholder:text-slate-300"
      />
    ) : (
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder ?? `输入${label}...`}
        className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 focus:bg-white transition-all placeholder:text-slate-300"
      />
    )}
  </div>
);

// 风险等级选择组件
const RiskField = ({ label, value, onChange }: {
  label: string; value: RiskLevel | undefined; onChange: (v: RiskLevel) => void;
}) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-slate-500">{label}</label>
    <div className="flex gap-2 flex-wrap">
      {RISK_OPTIONS.map(opt => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
            value === opt.value ? opt.color : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  </div>
);

export default function EnterpriseForm({ onSubmit, onCancel, initialData }: EnterpriseFormProps) {
  const [activeTab, setActiveTab] = useState('basic');

  // ── 各模块状态 ──
  const [basic, setBasic] = useState({ companyName: '', founded: '', registeredLocation: '', headquarters: '', founders: '', ceo: '', managementTeam: '', employeeCount: '', companyType: '', isPublic: false, stockCode: '', website: '', contact: '', ...initialData?.basicInfo ?? {}});
  const [business, setBusiness] = useState({ revenueStreams: '', pricingModel: '', customerType: '', costStructure: '', keyResources: '', ...initialData?.businessModel ?? {}});
  const [product, setProduct] = useState({ productMatrix: '', positioning: '', features: '', lifecycle: '', pricing: '', customerReviews: '', mau: '', dau: '', retention: '', growthRate: '', competitiveness: '', featureScore: '', innovationLevel: '', techBarrier: '', replicability: '', ux: '', ...initialData?.productAnalysis ?? {}});
  const [market, setMarket] = useState({ marketSize: '', marketGrowthRate: '', marketMaturity: '', industryCycle: '', industryConcentration: '', industryProfitMargin: '', futureTrends: '', policyImpact: '', ...initialData?.marketAnalysis ?? {}});
  const [competition, setCompetition] = useState({ price: '', product: '', channel: '', brand: '', technology: '', aiCapability: '', service: '', marketShare: '', internationalization: '', ...initialData?.competitionAnalysis ?? {}});
  const [customer, setCustomer] = useState({ ageGroup: '', industry: '', region: '', companySize: '', income: '', spendingPower: '', customerBehavior: '', purchaseCycle: '', renewalRate: '', churnRate: '', nps: '', csat: '', ...initialData?.customerAnalysis ?? {}});
  const [growth, setGrowth] = useState({ organicGrowth: '', paidAds: '', seo: '', referral: '', channels: '', salesTeam: '', partnerships: '', apiEcosystem: '', ...initialData?.growthAnalysis ?? {}});
  const [financial, setFinancial] = useState({ revenue: '', netProfit: '', cashFlow: '', balanceSheet: '', rde: '', roa: '', eps: '', grossMargin: '', operatingMargin: '', freeCashFlow: '', debt: '', workingCapital: '', runway: '', burnRate: '', cashBalance: '', mrr: '', arr: '', cac: '', ltv: '', startupGrossMargin: '', paybackPeriod: '', ...initialData?.financialAnalysis ?? {}});
  const [funding, setFunding] = useState({ seed: '', angel: '', seriesA: '', seriesB: '', seriesC: '', ipo: '', ma: '', spac: '', investors: '', valuation: '', fundingAmount: '', shareholdingRatio: '', fundingPurpose: '', ...initialData?.fundingAnalysis ?? {}});
  const [team, setTeam] = useState({ ceo: '', cfo: '', cto: '', background: '', education: '', entrepreneurialHistory: '', exitHistory: '', industryExperience: '', linkedin: '', github: '', papers: '', patents: '', publicSpeaking: '', ...initialData?.teamAnalysis ?? {}});
  const [tech, setTech] = useState({ techStack: '', architecture: '', models: '', database: '', api: '', cloudPlatform: '', security: '', openSource: '', githubStars: '', githubCommits: '', githubContributors: '', license: '', patentCount: '', rdInvestment: '', ...initialData?.techAnalysis ?? {}});
  const [brand, setBrand] = useState({ brandSentiment: '', reputation: '', rating: '', reviews: '', userFeedback: '', devCommunity: '', reddit: '', githubDiscussion: '', zhihu: '', twitter: '', tiktok: '', linkedin: '', youtube: '', mediaExposure: '', searchVolume: '', googleTrends: '', ...initialData?.brandAnalysis ?? {}});
  const [legal, setLegal] = useState<Record<string, RiskLevel | undefined>>({ policyRisk: undefined, legalRisk: undefined, competitionRisk: undefined, techRisk: undefined, talentRisk: undefined, cashFlowRisk: undefined, supplyChainRisk: undefined, aiRisk: undefined, cyberSecurityRisk: undefined, dataSecurityRisk: undefined, internationalTradeRisk: undefined, fxRisk: undefined, geopoliticalRisk: undefined, ...initialData?.legalAnalysis ?? {} });
  const [valuation, setValuation] = useState({ dcf: '', peRatio: '', psRatio: '', evEbitda: '', evSales: '', peg: '', ddm: '', comparableCompany: '', comparableTransaction: '', equityValue: '', shareValue: '', valuationRange: '', bearCase: '', baseCase: '', bullCase: '', sensitivityGrowthRate: '', sensitivityMargin: '', sensitivityDiscountRate: '', ...initialData?.valuationAnalysis ?? {} });

  const handleSubmit = () => {
    const data: EnterpriseData = {
      id: initialData?.id ?? Date.now().toString(),
      createdAt: initialData?.createdAt ?? new Date().toISOString(),
      basicInfo: basic,
      businessModel: business,
      productAnalysis: product,
      marketAnalysis: market,
      competitionAnalysis: competition,
      customerAnalysis: customer,
      growthAnalysis: growth,
      financialAnalysis: financial,
      fundingAnalysis: funding,
      teamAnalysis: team,
      techAnalysis: tech,
      brandAnalysis: brand,
      legalAnalysis: legal as any,
      valuationAnalysis: valuation,
    };
    onSubmit(data);
  };

  const u = <T,>(setter: React.Dispatch<React.SetStateAction<T>>, key: keyof T) =>
    (v: string | boolean) => setter(prev => ({ ...prev, [key]: v }));

  return (
    <div className="flex flex-col h-full">
      {/* Tab 导航 */}
      <div className="flex gap-1 flex-wrap px-6 py-3 border-b border-slate-100 bg-slate-50/50">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 内容 */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">

        {activeTab === 'basic' && (
          <>
            <Field label="公司名称 *" value={basic.companyName} onChange={u(setBasic, 'companyName')} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="成立时间" value={basic.founded} onChange={u(setBasic, 'founded')} placeholder="e.g. 2010-01" />
              <Field label="注册地" value={basic.registeredLocation} onChange={u(setBasic, 'registeredLocation')} />
            </div>
            <Field label="总部" value={basic.headquarters} onChange={u(setBasic, 'headquarters')} />
            <Field label="创始人" value={basic.founders} onChange={u(setBasic, 'founders')} placeholder="多人用逗号分隔" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="CEO" value={basic.ceo} onChange={u(setBasic, 'ceo')} />
              <Field label="员工数量" value={basic.employeeCount} onChange={u(setBasic, 'employeeCount')} placeholder="e.g. 5000" />
            </div>
            <Field label="管理团队" value={basic.managementTeam} onChange={u(setBasic, 'managementTeam')} multiline />
            <div className="grid grid-cols-2 gap-3">
              <Field label="企业类型" value={basic.companyType} onChange={u(setBasic, 'companyType')} placeholder="e.g. SaaS / 制造业" />
              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-500">是否上市</label>
                <div className="flex gap-2 mt-1">
                  {['是', '否'].map(opt => (
                    <button key={opt} type="button" onClick={() => setBasic(p => ({ ...p, isPublic: opt === '是' }))}
                      className={`flex-1 py-2 rounded-xl text-xs font-medium border transition-all ${
                        (opt === '是') === basic.isPublic
                          ? 'bg-amber-50 border-amber-300 text-amber-700'
                          : 'bg-white border-slate-200 text-slate-400'
                      }`}>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {basic.isPublic && <Field label="股票代码" value={basic.stockCode} onChange={u(setBasic, 'stockCode')} placeholder="e.g. AAPL / 600519.SH" />}
            <Field label="官网" value={basic.website} onChange={u(setBasic, 'website')} placeholder="https://" />
            <Field label="联系方式" value={basic.contact} onChange={u(setBasic, 'contact')} />
          </>
        )}

        {activeTab === 'business' && (
          <>
            <Field label="收入来源" value={business.revenueStreams} onChange={u(setBusiness, 'revenueStreams')} multiline placeholder="订阅、广告、交易佣金等..." />
            <Field label="收费模式" value={business.pricingModel} onChange={u(setBusiness, 'pricingModel')} placeholder="e.g. SaaS 订阅 / 按使用量 / 一次性" />
            <Field label="客户类型" value={business.customerType} onChange={u(setBusiness, 'customerType')} placeholder="B2B / B2C / B2B2C" />
            <Field label="成本结构" value={business.costStructure} onChange={u(setBusiness, 'costStructure')} multiline />
            <Field label="关键资源" value={business.keyResources} onChange={u(setBusiness, 'keyResources')} multiline placeholder="数据、技术、品牌、人才等..." />
          </>
        )}

        {activeTab === 'product' && (
          <>
            <Field label="产品矩阵" value={product.productMatrix} onChange={u(setProduct, 'productMatrix')} multiline />
            <div className="grid grid-cols-2 gap-3">
              <Field label="产品定位" value={product.positioning} onChange={u(setProduct, 'positioning')} />
              <Field label="生命周期" value={product.lifecycle} onChange={u(setProduct, 'lifecycle')} placeholder="成长期 / 成熟期 / 衰退期" />
            </div>
            <Field label="核心功能" value={product.features} onChange={u(setProduct, 'features')} multiline />
            <Field label="定价策略" value={product.pricing} onChange={u(setProduct, 'pricing')} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="MAU" value={product.mau} onChange={u(setProduct, 'mau')} placeholder="e.g. 5M" />
              <Field label="DAU" value={product.dau} onChange={u(setProduct, 'dau')} placeholder="e.g. 800K" />
              <Field label="留存率" value={product.retention} onChange={u(setProduct, 'retention')} placeholder="e.g. D30: 40%" />
              <Field label="增长率" value={product.growthRate} onChange={u(setProduct, 'growthRate')} placeholder="e.g. MoM 15%" />
              <Field label="功能评分" value={product.featureScore} onChange={u(setProduct, 'featureScore')} placeholder="e.g. 8.5/10" />
              <Field label="用户体验 (UX)" value={product.ux} onChange={u(setProduct, 'ux')} placeholder="e.g. 优秀 / 一般" />
            </div>
            <Field label="产品竞争力" value={product.competitiveness} onChange={u(setProduct, 'competitiveness')} multiline />
            <div className="grid grid-cols-2 gap-3">
              <Field label="创新程度" value={product.innovationLevel} onChange={u(setProduct, 'innovationLevel')} placeholder="颠覆性 / 渐进式 / 微创新" />
              <Field label="技术壁垒" value={product.techBarrier} onChange={u(setProduct, 'techBarrier')} placeholder="高 / 中 / 低" />
              <Field label="可复制性" value={product.replicability} onChange={u(setProduct, 'replicability')} placeholder="难以复制 / 容易复制" />
            </div>
            <Field label="客户评价" value={product.customerReviews} onChange={u(setProduct, 'customerReviews')} multiline />
          </>
        )}

        {activeTab === 'market' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label="市场规模 (TAM)" value={market.marketSize} onChange={u(setMarket, 'marketSize')} placeholder="e.g. $50B" />
              <Field label="市场增长率 (CAGR)" value={market.marketGrowthRate} onChange={u(setMarket, 'marketGrowthRate')} placeholder="e.g. 18% YoY" />
              <Field label="市场成熟度" value={market.marketMaturity} onChange={u(setMarket, 'marketMaturity')} placeholder="新兴 / 成长 / 成熟 / 衰退" />
              <Field label="行业周期" value={market.industryCycle} onChange={u(setMarket, 'industryCycle')} placeholder="顺周期 / 逆周期" />
              <Field label="行业集中度 (CR5)" value={market.industryConcentration} onChange={u(setMarket, 'industryConcentration')} placeholder="e.g. 65%" />
              <Field label="行业利润率" value={market.industryProfitMargin} onChange={u(setMarket, 'industryProfitMargin')} placeholder="e.g. Avg 22%" />
            </div>
            <Field label="未来趋势" value={market.futureTrends} onChange={u(setMarket, 'futureTrends')} multiline />
            <Field label="政策影响" value={market.policyImpact} onChange={u(setMarket, 'policyImpact')} multiline />
          </>
        )}

        {activeTab === 'competition' && (
          <>
            <Field label="价格竞争" value={competition.price} onChange={u(setCompetition, 'price')} multiline placeholder="与主要竞争对手的价格对比..." />
            <Field label="产品差异" value={competition.product} onChange={u(setCompetition, 'product')} multiline />
            <Field label="渠道优势" value={competition.channel} onChange={u(setCompetition, 'channel')} multiline />
            <Field label="品牌力" value={competition.brand} onChange={u(setCompetition, 'brand')} multiline />
            <Field label="技术优势" value={competition.technology} onChange={u(setCompetition, 'technology')} multiline />
            <Field label="AI 能力" value={competition.aiCapability} onChange={u(setCompetition, 'aiCapability')} multiline />
            <Field label="服务能力" value={competition.service} onChange={u(setCompetition, 'service')} multiline />
            <div className="grid grid-cols-2 gap-3">
              <Field label="市场份额" value={competition.marketShare} onChange={u(setCompetition, 'marketShare')} placeholder="e.g. 23%" />
              <Field label="国际化程度" value={competition.internationalization} onChange={u(setCompetition, 'internationalization')} placeholder="全球 / 区域 / 本地" />
            </div>
          </>
        )}

        {activeTab === 'customer' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label="年龄分布" value={customer.ageGroup} onChange={u(setCustomer, 'ageGroup')} placeholder="e.g. 25-35 岁为主" />
              <Field label="所属行业" value={customer.industry} onChange={u(setCustomer, 'industry')} />
              <Field label="主要地区" value={customer.region} onChange={u(setCustomer, 'region')} />
              <Field label="企业规模" value={customer.companySize} onChange={u(setCustomer, 'companySize')} placeholder="SMB / Mid-Market / Enterprise" />
              <Field label="收入水平" value={customer.income} onChange={u(setCustomer, 'income')} />
              <Field label="消费能力" value={customer.spendingPower} onChange={u(setCustomer, 'spendingPower')} />
              <Field label="购买周期" value={customer.purchaseCycle} onChange={u(setCustomer, 'purchaseCycle')} placeholder="e.g. 月付 / 年付" />
              <Field label="续费率 (NRR)" value={customer.renewalRate} onChange={u(setCustomer, 'renewalRate')} placeholder="e.g. 120%" />
              <Field label="流失率 (Churn)" value={customer.churnRate} onChange={u(setCustomer, 'churnRate')} placeholder="e.g. Monthly 2%" />
              <Field label="推荐率 (NPS)" value={customer.nps} onChange={u(setCustomer, 'nps')} placeholder="e.g. 72" />
              <Field label="满意度 (CSAT)" value={customer.csat} onChange={u(setCustomer, 'csat')} placeholder="e.g. 4.6/5" />
            </div>
            <Field label="客户行为分析" value={customer.customerBehavior} onChange={u(setCustomer, 'customerBehavior')} multiline />
          </>
        )}

        {activeTab === 'growth' && (
          <>
            <Field label="自然增长 (Organic)" value={growth.organicGrowth} onChange={u(setGrowth, 'organicGrowth')} multiline placeholder="口碑、品牌驱动的自然增长..." />
            <Field label="广告投放" value={growth.paidAds} onChange={u(setGrowth, 'paidAds')} multiline placeholder="Google Ads、社媒广告、KOL..." />
            <Field label="SEO" value={growth.seo} onChange={u(setGrowth, 'seo')} multiline />
            <Field label="Referral / 裂变" value={growth.referral} onChange={u(setGrowth, 'referral')} multiline />
            <Field label="渠道分销" value={growth.channels} onChange={u(setGrowth, 'channels')} multiline />
            <Field label="销售团队" value={growth.salesTeam} onChange={u(setGrowth, 'salesTeam')} multiline placeholder="规模、结构、地区覆盖..." />
            <Field label="合作伙伴" value={growth.partnerships} onChange={u(setGrowth, 'partnerships')} multiline />
            <Field label="API 生态" value={growth.apiEcosystem} onChange={u(setGrowth, 'apiEcosystem')} multiline placeholder="开发者生态、第三方集成..." />
          </>
        )}

        {activeTab === 'financial' && (
          <>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">上市公司指标</p>
            <div className="grid grid-cols-2 gap-3">
              <Field label="营收 (Revenue)" value={financial.revenue} onChange={u(setFinancial, 'revenue')} placeholder="e.g. $10.2B" />
              <Field label="净利润 (Net Profit)" value={financial.netProfit} onChange={u(setFinancial, 'netProfit')} />
              <Field label="经营现金流" value={financial.cashFlow} onChange={u(setFinancial, 'cashFlow')} />
              <Field label="资产负债" value={financial.balanceSheet} onChange={u(setFinancial, 'balanceSheet')} />
              <Field label="R&D 支出 (RDE)" value={financial.rde} onChange={u(setFinancial, 'rde')} />
              <Field label="ROA" value={financial.roa} onChange={u(setFinancial, 'roa')} placeholder="e.g. 12.4%" />
              <Field label="EPS" value={financial.eps} onChange={u(setFinancial, 'eps')} />
              <Field label="Gross Margin" value={financial.grossMargin} onChange={u(setFinancial, 'grossMargin')} placeholder="e.g. 72%" />
              <Field label="Operating Margin" value={financial.operatingMargin} onChange={u(setFinancial, 'operatingMargin')} />
              <Field label="Free Cash Flow" value={financial.freeCashFlow} onChange={u(setFinancial, 'freeCashFlow')} />
              <Field label="债务 (Debt)" value={financial.debt} onChange={u(setFinancial, 'debt')} />
              <Field label="营运资本" value={financial.workingCapital} onChange={u(setFinancial, 'workingCapital')} />
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-2">创业公司指标</p>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Runway" value={financial.runway} onChange={u(setFinancial, 'runway')} placeholder="e.g. 18 months" />
              <Field label="Burn Rate" value={financial.burnRate} onChange={u(setFinancial, 'burnRate')} placeholder="e.g. $500K/mo" />
              <Field label="Cash Balance" value={financial.cashBalance} onChange={u(setFinancial, 'cashBalance')} />
              <Field label="MRR" value={financial.mrr} onChange={u(setFinancial, 'mrr')} placeholder="e.g. $1.2M" />
              <Field label="ARR" value={financial.arr} onChange={u(setFinancial, 'arr')} placeholder="e.g. $14.4M" />
              <Field label="CAC" value={financial.cac} onChange={u(setFinancial, 'cac')} />
              <Field label="LTV" value={financial.ltv} onChange={u(setFinancial, 'ltv')} />
              <Field label="Gross Margin" value={financial.startupGrossMargin} onChange={u(setFinancial, 'startupGrossMargin')} />
              <Field label="Payback Period" value={financial.paybackPeriod} onChange={u(setFinancial, 'paybackPeriod')} placeholder="e.g. 14 months" />
            </div>
          </>
        )}

        {activeTab === 'funding' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Seed 轮" value={funding.seed} onChange={u(setFunding, 'seed')} placeholder="金额 + 时间" />
              <Field label="Angel 轮" value={funding.angel} onChange={u(setFunding, 'angel')} />
              <Field label="Series A" value={funding.seriesA} onChange={u(setFunding, 'seriesA')} />
              <Field label="Series B" value={funding.seriesB} onChange={u(setFunding, 'seriesB')} />
              <Field label="Series C+" value={funding.seriesC} onChange={u(setFunding, 'seriesC')} />
              <Field label="IPO" value={funding.ipo} onChange={u(setFunding, 'ipo')} placeholder="上市时间 + 价格" />
              <Field label="并购 (M&A)" value={funding.ma} onChange={u(setFunding, 'ma')} />
              <Field label="SPAC" value={funding.spac} onChange={u(setFunding, 'spac')} />
            </div>
            <Field label="主要投资人" value={funding.investors} onChange={u(setFunding, 'investors')} multiline placeholder="Sequoia、a16z、红杉中国..." />
            <div className="grid grid-cols-2 gap-3">
              <Field label="当前估值" value={funding.valuation} onChange={u(setFunding, 'valuation')} placeholder="e.g. $2.4B" />
              <Field label="累计融资额" value={funding.fundingAmount} onChange={u(setFunding, 'fundingAmount')} />
              <Field label="机构持股比例" value={funding.shareholdingRatio} onChange={u(setFunding, 'shareholdingRatio')} placeholder="e.g. 45%" />
            </div>
            <Field label="融资用途" value={funding.fundingPurpose} onChange={u(setFunding, 'fundingPurpose')} multiline />
          </>
        )}

        {activeTab === 'team' && (
          <>
            <Field label="CEO" value={team.ceo} onChange={u(setTeam, 'ceo')} />
            <Field label="CFO" value={team.cfo} onChange={u(setTeam, 'cfo')} />
            <Field label="CTO" value={team.cto} onChange={u(setTeam, 'cto')} />
            <Field label="核心团队背景" value={team.background} onChange={u(setTeam, 'background')} multiline placeholder="前 Google、McKinsey、Stanford..." />
            <Field label="教育背景" value={team.education} onChange={u(setTeam, 'education')} multiline />
            <Field label="创业经历" value={team.entrepreneurialHistory} onChange={u(setTeam, 'entrepreneurialHistory')} multiline />
            <Field label="退出经历 (Exit)" value={team.exitHistory} onChange={u(setTeam, 'exitHistory')} multiline placeholder="IPO、并购..." />
            <Field label="行业经验" value={team.industryExperience} onChange={u(setTeam, 'industryExperience')} multiline />
            <div className="grid grid-cols-2 gap-3">
              <Field label="LinkedIn" value={team.linkedin} onChange={u(setTeam, 'linkedin')} placeholder="URL" />
              <Field label="GitHub" value={team.github} onChange={u(setTeam, 'github')} placeholder="URL / @handle" />
            </div>
            <Field label="论文 / 专利" value={team.papers} onChange={u(setTeam, 'papers')} multiline />
            <Field label="公开演讲" value={team.publicSpeaking} onChange={u(setTeam, 'publicSpeaking')} multiline placeholder="TED、大会演讲、播客..." />
          </>
        )}

        {activeTab === 'tech' && (
          <>
            <Field label="技术栈" value={tech.techStack} onChange={u(setTech, 'techStack')} multiline placeholder="React、Python、Rust..." />
            <Field label="系统架构" value={tech.architecture} onChange={u(setTech, 'architecture')} multiline placeholder="微服务、Monolith、Serverless..." />
            <Field label="AI 模型 / 算法" value={tech.models} onChange={u(setTech, 'models')} multiline />
            <div className="grid grid-cols-2 gap-3">
              <Field label="数据库" value={tech.database} onChange={u(setTech, 'database')} placeholder="PostgreSQL、Redis..." />
              <Field label="云平台" value={tech.cloudPlatform} onChange={u(setTech, 'cloudPlatform')} placeholder="AWS / GCP / Azure" />
              <Field label="API 开放程度" value={tech.api} onChange={u(setTech, 'api')} placeholder="Public / Internal" />
              <Field label="安全认证" value={tech.security} onChange={u(setTech, 'security')} placeholder="SOC2、ISO27001..." />
            </div>
            <Field label="开源项目" value={tech.openSource} onChange={u(setTech, 'openSource')} multiline />
            <div className="grid grid-cols-2 gap-3">
              <Field label="GitHub Stars" value={tech.githubStars} onChange={u(setTech, 'githubStars')} placeholder="e.g. 42K" />
              <Field label="GitHub Commits" value={tech.githubCommits} onChange={u(setTech, 'githubCommits')} />
              <Field label="Contributors" value={tech.githubContributors} onChange={u(setTech, 'githubContributors')} />
              <Field label="License" value={tech.license} onChange={u(setTech, 'license')} placeholder="MIT / Apache 2.0 / Proprietary" />
              <Field label="专利数量" value={tech.patentCount} onChange={u(setTech, 'patentCount')} />
              <Field label="研发投入 (R&D)" value={tech.rdInvestment} onChange={u(setTech, 'rdInvestment')} placeholder="e.g. $2.1B / 18% of Revenue" />
            </div>
          </>
        )}

        {activeTab === 'brand' && (
          <>
            <div className="grid grid-cols-2 gap-3">
              <Field label="品牌情绪" value={brand.brandSentiment} onChange={u(setBrand, 'brandSentiment')} placeholder="正面 / 中性 / 负面" />
              <Field label="综合评分" value={brand.rating} onChange={u(setBrand, 'rating')} placeholder="e.g. G2: 4.7/5" />
              <Field label="搜索量" value={brand.searchVolume} onChange={u(setBrand, 'searchVolume')} placeholder="e.g. 500K/mo" />
              <Field label="Google Trends" value={brand.googleTrends} onChange={u(setBrand, 'googleTrends')} placeholder="上升 / 平稳 / 下降" />
            </div>
            <Field label="口碑 / 品牌认知" value={brand.reputation} onChange={u(setBrand, 'reputation')} multiline />
            <Field label="用户评论摘要" value={brand.reviews} onChange={u(setBrand, 'reviews')} multiline />
            <Field label="用户反馈" value={brand.userFeedback} onChange={u(setBrand, 'userFeedback')} multiline />
            <Field label="开发者社区" value={brand.devCommunity} onChange={u(setBrand, 'devCommunity')} multiline />
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-2">社媒与媒体</p>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Reddit" value={brand.reddit} onChange={u(setBrand, 'reddit')} />
              <Field label="GitHub Discussions" value={brand.githubDiscussion} onChange={u(setBrand, 'githubDiscussion')} />
              <Field label="知乎" value={brand.zhihu} onChange={u(setBrand, 'zhihu')} />
              <Field label="X (Twitter)" value={brand.twitter} onChange={u(setBrand, 'twitter')} placeholder="Followers + 互动率" />
              <Field label="TikTok" value={brand.tiktok} onChange={u(setBrand, 'tiktok')} />
              <Field label="LinkedIn" value={brand.linkedin} onChange={u(setBrand, 'linkedin')} />
              <Field label="YouTube" value={brand.youtube} onChange={u(setBrand, 'youtube')} />
            </div>
            <Field label="媒体曝光" value={brand.mediaExposure} onChange={u(setBrand, 'mediaExposure')} multiline placeholder="TechCrunch、Bloomberg、36氪..." />
          </>
        )}

        {activeTab === 'legal' && (
          <div className="grid grid-cols-1 gap-4">
            {[
              { key: 'policyRisk',           label: '政策风险' },
              { key: 'legalRisk',            label: '法律风险' },
              { key: 'competitionRisk',      label: '竞争风险' },
              { key: 'techRisk',             label: '技术风险' },
              { key: 'talentRisk',           label: '人才风险' },
              { key: 'cashFlowRisk',         label: '现金流风险' },
              { key: 'supplyChainRisk',      label: '供应链风险' },
              { key: 'aiRisk',               label: 'AI 风险' },
              { key: 'cyberSecurityRisk',    label: '网络安全风险' },
              { key: 'dataSecurityRisk',     label: '数据安全风险' },
              { key: 'internationalTradeRisk', label: '国际贸易风险' },
              { key: 'fxRisk',               label: '汇率风险' },
              { key: 'geopoliticalRisk',     label: '地缘政治风险' },
            ].map(({ key, label }) => (
              <RiskField
                key={key}
                label={label}
                value={legal[key] as RiskLevel | undefined}
                onChange={(v) => setLegal(p => ({ ...p, [key]: v }))}
              />
            ))}
          </div>
        )}

        {activeTab === 'valuation' && (
          <>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">上市公司估值方法</p>
            <div className="grid grid-cols-2 gap-3">
              <Field label="DCF（现金流折现）" value={valuation.dcf} onChange={u(setValuation, 'dcf')} placeholder="e.g. $180/share" />
              <Field label="市盈率 (P/E)" value={valuation.peRatio} onChange={u(setValuation, 'peRatio')} placeholder="e.g. 28x" />
              <Field label="市销率 (P/S)" value={valuation.psRatio} onChange={u(setValuation, 'psRatio')} />
              <Field label="EV/EBITDA" value={valuation.evEbitda} onChange={u(setValuation, 'evEbitda')} />
              <Field label="EV/Sales" value={valuation.evSales} onChange={u(setValuation, 'evSales')} />
              <Field label="PEG" value={valuation.peg} onChange={u(setValuation, 'peg')} />
              <Field label="股息折现 (DDM)" value={valuation.ddm} onChange={u(setValuation, 'ddm')} />
              <Field label="可比公司估值" value={valuation.comparableCompany} onChange={u(setValuation, 'comparableCompany')} />
              <Field label="可比交易估值" value={valuation.comparableTransaction} onChange={u(setValuation, 'comparableTransaction')} />
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-2">初创公司估值</p>
            <div className="grid grid-cols-2 gap-3">
              <Field label="企业价值" value={valuation.equityValue} onChange={u(setValuation, 'equityValue')} />
              <Field label="股权价值" value={valuation.shareValue} onChange={u(setValuation, 'shareValue')} />
              <Field label="估值区间" value={valuation.valuationRange} onChange={u(setValuation, 'valuationRange')} placeholder="e.g. $1.2B–$1.8B" />
              <Field label="悲观情景 (Bear)" value={valuation.bearCase} onChange={u(setValuation, 'bearCase')} />
              <Field label="基准情景 (Base)" value={valuation.baseCase} onChange={u(setValuation, 'baseCase')} />
              <Field label="乐观情景 (Bull)" value={valuation.bullCase} onChange={u(setValuation, 'bullCase')} />
            </div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-2">敏感性分析</p>
            <div className="grid grid-cols-1 gap-3">
              <Field label="增长率敏感性" value={valuation.sensitivityGrowthRate} onChange={u(setValuation, 'sensitivityGrowthRate')} multiline placeholder="e.g. 增长率 15% → $1.2B；20% → $1.6B；25% → $2.1B" />
              <Field label="利润率敏感性" value={valuation.sensitivityMargin} onChange={u(setValuation, 'sensitivityMargin')} multiline />
              <Field label="折现率敏感性" value={valuation.sensitivityDiscountRate} onChange={u(setValuation, 'sensitivityDiscountRate')} multiline />
            </div>
          </>
        )}
      </div>

      {/* 底部按钮 */}
      <div className="px-6 py-4 border-t border-slate-100 flex justify-between items-center">
        <span className="text-xs text-slate-400">* 仅已填写的字段会显示在研究页面</span>
        <div className="flex gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all">取消</button>
          <button onClick={handleSubmit} className="px-5 py-2 text-sm bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all shadow-sm shadow-amber-200">确认添加</button>
        </div>
      </div>
    </div>
  );
}