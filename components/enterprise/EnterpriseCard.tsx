"use client";

import React, { useState } from 'react';
import { EnterpriseData, RiskLevel } from '../../types/enterprise';
import { Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface EnterpriseCardProps {
  data: EnterpriseData;
  onEdit: (data: EnterpriseData) => void;
  onDelete: () => void;  // 修复1: 去掉 id 参数
}

const RISK_STYLE: Record<RiskLevel, string> = {
  low:      'bg-emerald-100 text-emerald-700',
  medium:   'bg-yellow-100 text-yellow-700',
  high:     'bg-orange-100 text-orange-700',
  critical: 'bg-rose-100 text-rose-700',
};

const KV = ({ label, value }: { label: string; value?: string | boolean }) => {
  if (value === undefined || value === null || value === '') return null;
  return (
    <div className="flex gap-2 py-1.5 border-b border-slate-50 last:border-0">
      <span className="text-xs text-slate-400 w-36 shrink-0">{label}</span>
      <span className="text-xs text-slate-700 flex-1">
        {typeof value === 'boolean' ? (value ? '是' : '否') : value}
      </span>
    </div>
  );
};

const RiskKV = ({ label, value }: { label: string; value?: RiskLevel }) => {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2 py-1.5 border-b border-slate-50 last:border-0">
      <span className="text-xs text-slate-400 w-36 shrink-0">{label}</span>
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${RISK_STYLE[value]}`}>
        {value.toUpperCase()}
      </span>
    </div>
  );
};

// 修复2: Section 的 hasContent 判断改用 filter(Boolean)
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(true);
  const validChildren = React.Children.toArray(children).filter(Boolean);
  if (validChildren.length === 0) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-5 py-3.5 hover:bg-slate-50 transition-colors"
      >
        <span className="text-sm font-semibold text-slate-800">{title}</span>
        {open
          ? <ChevronUp size={15} className="text-slate-400" />
          : <ChevronDown size={15} className="text-slate-400" />
        }
      </button>
      {open && <div className="px-5 pb-4">{children}</div>}
    </div>
  );
};

export default function EnterpriseCard({ data, onEdit, onDelete }: EnterpriseCardProps) {
  const b = data.basicInfo;

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{b.companyName || '未命名企业'}</h3>
          <div className="flex gap-2 mt-1.5 flex-wrap">
            {b.companyType && (
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{b.companyType}</span>
            )}
            {b.isPublic !== undefined && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${b.isPublic ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
                {b.isPublic ? `上市${b.stockCode ? ` · ${b.stockCode}` : ''}` : '非上市'}
              </span>
            )}
            {b.headquarters && (
              <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">📍 {b.headquarters}</span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          {/* 修复3: onDelete 不传参数 */}
          <button onClick={() => onEdit(data)} className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
            <Pencil size={15} />
          </button>
          <button onClick={() => onDelete()} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <Section title="企业基本信息">
        <KV label="成立时间" value={b.founded} />
        <KV label="注册地" value={b.registeredLocation} />
        <KV label="总部" value={b.headquarters} />
        <KV label="创始人" value={b.founders} />
        <KV label="CEO" value={b.ceo} />
        <KV label="管理团队" value={b.managementTeam} />
        <KV label="员工数量" value={b.employeeCount} />
        <KV label="是否上市" value={b.isPublic} />
        <KV label="股票代码" value={b.stockCode} />
        <KV label="官网" value={b.website} />
        <KV label="联系方式" value={b.contact} />
      </Section>

      <Section title="商业模式">
        <KV label="收入来源" value={data.businessModel.revenueStreams} />
        <KV label="收费模式" value={data.businessModel.pricingModel} />
        <KV label="客户类型" value={data.businessModel.customerType} />
        <KV label="成本结构" value={data.businessModel.costStructure} />
        <KV label="关键资源" value={data.businessModel.keyResources} />
      </Section>

      <Section title="产品分析">
        <KV label="产品矩阵" value={data.productAnalysis.productMatrix} />
        <KV label="产品定位" value={data.productAnalysis.positioning} />
        <KV label="核心功能" value={data.productAnalysis.features} />
        <KV label="生命周期" value={data.productAnalysis.lifecycle} />
        <KV label="定价策略" value={data.productAnalysis.pricing} />
        <KV label="MAU" value={data.productAnalysis.mau} />
        <KV label="DAU" value={data.productAnalysis.dau} />
        <KV label="留存率" value={data.productAnalysis.retention} />
        <KV label="增长率" value={data.productAnalysis.growthRate} />
        <KV label="产品竞争力" value={data.productAnalysis.competitiveness} />
        <KV label="功能评分" value={data.productAnalysis.featureScore} />
        <KV label="创新程度" value={data.productAnalysis.innovationLevel} />
        <KV label="技术壁垒" value={data.productAnalysis.techBarrier} />
        <KV label="可复制性" value={data.productAnalysis.replicability} />
        <KV label="用户体验 (UX)" value={data.productAnalysis.ux} />
        <KV label="客户评价" value={data.productAnalysis.customerReviews} />
      </Section>

      <Section title="市场分析">
        <KV label="市场规模 (TAM)" value={data.marketAnalysis.marketSize} />
        <KV label="市场增长率" value={data.marketAnalysis.marketGrowthRate} />
        <KV label="市场成熟度" value={data.marketAnalysis.marketMaturity} />
        <KV label="行业周期" value={data.marketAnalysis.industryCycle} />
        <KV label="行业集中度" value={data.marketAnalysis.industryConcentration} />
        <KV label="行业利润率" value={data.marketAnalysis.industryProfitMargin} />
        <KV label="未来趋势" value={data.marketAnalysis.futureTrends} />
        <KV label="政策影响" value={data.marketAnalysis.policyImpact} />
      </Section>

      <Section title="竞争分析">
        <KV label="价格竞争" value={data.competitionAnalysis.price} />
        <KV label="产品差异" value={data.competitionAnalysis.product} />
        <KV label="渠道优势" value={data.competitionAnalysis.channel} />
        <KV label="品牌力" value={data.competitionAnalysis.brand} />
        <KV label="技术优势" value={data.competitionAnalysis.technology} />
        <KV label="AI 能力" value={data.competitionAnalysis.aiCapability} />
        <KV label="服务能力" value={data.competitionAnalysis.service} />
        <KV label="市场份额" value={data.competitionAnalysis.marketShare} />
        <KV label="国际化程度" value={data.competitionAnalysis.internationalization} />
      </Section>

      <Section title="客户分析">
        <KV label="年龄分布" value={data.customerAnalysis.ageGroup} />
        <KV label="所属行业" value={data.customerAnalysis.industry} />
        <KV label="主要地区" value={data.customerAnalysis.region} />
        <KV label="企业规模" value={data.customerAnalysis.companySize} />
        <KV label="收入水平" value={data.customerAnalysis.income} />
        <KV label="消费能力" value={data.customerAnalysis.spendingPower} />
        <KV label="客户行为" value={data.customerAnalysis.customerBehavior} />
        <KV label="购买周期" value={data.customerAnalysis.purchaseCycle} />
        <KV label="续费率 (NRR)" value={data.customerAnalysis.renewalRate} />
        <KV label="流失率 (Churn)" value={data.customerAnalysis.churnRate} />
        <KV label="推荐率 (NPS)" value={data.customerAnalysis.nps} />
        <KV label="满意度 (CSAT)" value={data.customerAnalysis.csat} />
      </Section>

      <Section title="增长分析">
        <KV label="自然增长" value={data.growthAnalysis.organicGrowth} />
        <KV label="广告投放" value={data.growthAnalysis.paidAds} />
        <KV label="SEO" value={data.growthAnalysis.seo} />
        <KV label="Referral" value={data.growthAnalysis.referral} />
        <KV label="渠道分销" value={data.growthAnalysis.channels} />
        <KV label="销售团队" value={data.growthAnalysis.salesTeam} />
        <KV label="合作伙伴" value={data.growthAnalysis.partnerships} />
        <KV label="API 生态" value={data.growthAnalysis.apiEcosystem} />
      </Section>

      <Section title="财务分析">
        <KV label="营收" value={data.financialAnalysis.revenue} />
        <KV label="净利润" value={data.financialAnalysis.netProfit} />
        <KV label="经营现金流" value={data.financialAnalysis.cashFlow} />
        <KV label="资产负债" value={data.financialAnalysis.balanceSheet} />
        <KV label="R&D 支出" value={data.financialAnalysis.rde} />
        <KV label="ROA" value={data.financialAnalysis.roa} />
        <KV label="EPS" value={data.financialAnalysis.eps} />
        <KV label="Gross Margin" value={data.financialAnalysis.grossMargin} />
        <KV label="Operating Margin" value={data.financialAnalysis.operatingMargin} />
        <KV label="Free Cash Flow" value={data.financialAnalysis.freeCashFlow} />
        <KV label="Debt" value={data.financialAnalysis.debt} />
        <KV label="营运资本" value={data.financialAnalysis.workingCapital} />
        <KV label="Runway" value={data.financialAnalysis.runway} />
        <KV label="Burn Rate" value={data.financialAnalysis.burnRate} />
        <KV label="Cash Balance" value={data.financialAnalysis.cashBalance} />
        <KV label="MRR" value={data.financialAnalysis.mrr} />
        <KV label="ARR" value={data.financialAnalysis.arr} />
        <KV label="CAC" value={data.financialAnalysis.cac} />
        <KV label="LTV" value={data.financialAnalysis.ltv} />
        <KV label="Gross Margin (Startup)" value={data.financialAnalysis.startupGrossMargin} />
        <KV label="Payback Period" value={data.financialAnalysis.paybackPeriod} />
      </Section>

      <Section title="融资分析">
        <KV label="Seed 轮" value={data.fundingAnalysis.seed} />
        <KV label="Angel 轮" value={data.fundingAnalysis.angel} />
        <KV label="Series A" value={data.fundingAnalysis.seriesA} />
        <KV label="Series B" value={data.fundingAnalysis.seriesB} />
        <KV label="Series C+" value={data.fundingAnalysis.seriesC} />
        <KV label="IPO" value={data.fundingAnalysis.ipo} />
        <KV label="并购 (M&A)" value={data.fundingAnalysis.ma} />
        <KV label="SPAC" value={data.fundingAnalysis.spac} />
        <KV label="主要投资人" value={data.fundingAnalysis.investors} />
        <KV label="当前估值" value={data.fundingAnalysis.valuation} />
        <KV label="累计融资额" value={data.fundingAnalysis.fundingAmount} />
        <KV label="机构持股比例" value={data.fundingAnalysis.shareholdingRatio} />
        <KV label="融资用途" value={data.fundingAnalysis.fundingPurpose} />
      </Section>

      <Section title="团队分析">
        <KV label="CEO" value={data.teamAnalysis.ceo} />
        <KV label="CFO" value={data.teamAnalysis.cfo} />
        <KV label="CTO" value={data.teamAnalysis.cto} />
        <KV label="核心团队背景" value={data.teamAnalysis.background} />
        <KV label="教育背景" value={data.teamAnalysis.education} />
        <KV label="创业经历" value={data.teamAnalysis.entrepreneurialHistory} />
        <KV label="退出经历" value={data.teamAnalysis.exitHistory} />
        <KV label="行业经验" value={data.teamAnalysis.industryExperience} />
        <KV label="LinkedIn" value={data.teamAnalysis.linkedin} />
        <KV label="GitHub" value={data.teamAnalysis.github} />
        <KV label="论文 / 专利" value={data.teamAnalysis.papers} />
        <KV label="公开演讲" value={data.teamAnalysis.publicSpeaking} />
      </Section>

      <Section title="技术分析">
        <KV label="技术栈" value={data.techAnalysis.techStack} />
        <KV label="系统架构" value={data.techAnalysis.architecture} />
        <KV label="AI 模型" value={data.techAnalysis.models} />
        <KV label="数据库" value={data.techAnalysis.database} />
        <KV label="云平台" value={data.techAnalysis.cloudPlatform} />
        <KV label="API 开放程度" value={data.techAnalysis.api} />
        <KV label="安全认证" value={data.techAnalysis.security} />
        <KV label="开源项目" value={data.techAnalysis.openSource} />
        <KV label="GitHub Stars" value={data.techAnalysis.githubStars} />
        <KV label="GitHub Commits" value={data.techAnalysis.githubCommits} />
        <KV label="Contributors" value={data.techAnalysis.githubContributors} />
        <KV label="License" value={data.techAnalysis.license} />
        <KV label="专利数量" value={data.techAnalysis.patentCount} />
        <KV label="研发投入" value={data.techAnalysis.rdInvestment} />
      </Section>

      <Section title="品牌分析">
        <KV label="品牌情绪" value={data.brandAnalysis.brandSentiment} />
        <KV label="口碑" value={data.brandAnalysis.reputation} />
        <KV label="综合评分" value={data.brandAnalysis.rating} />
        <KV label="用户评论" value={data.brandAnalysis.reviews} />
        <KV label="用户反馈" value={data.brandAnalysis.userFeedback} />
        <KV label="开发者社区" value={data.brandAnalysis.devCommunity} />
        <KV label="Reddit" value={data.brandAnalysis.reddit} />
        <KV label="GitHub Discussions" value={data.brandAnalysis.githubDiscussion} />
        <KV label="知乎" value={data.brandAnalysis.zhihu} />
        <KV label="X (Twitter)" value={data.brandAnalysis.twitter} />
        <KV label="TikTok" value={data.brandAnalysis.tiktok} />
        <KV label="LinkedIn" value={data.brandAnalysis.linkedin} />
        <KV label="YouTube" value={data.brandAnalysis.youtube} />
        <KV label="媒体曝光" value={data.brandAnalysis.mediaExposure} />
        <KV label="搜索量" value={data.brandAnalysis.searchVolume} />
        <KV label="Google Trends" value={data.brandAnalysis.googleTrends} />
      </Section>

      <Section title="法律与风险评估">
        <RiskKV label="政策风险" value={data.legalAnalysis.policyRisk} />
        <RiskKV label="法律风险" value={data.legalAnalysis.legalRisk} />
        <RiskKV label="竞争风险" value={data.legalAnalysis.competitionRisk} />
        <RiskKV label="技术风险" value={data.legalAnalysis.techRisk} />
        <RiskKV label="人才风险" value={data.legalAnalysis.talentRisk} />
        <RiskKV label="现金流风险" value={data.legalAnalysis.cashFlowRisk} />
        <RiskKV label="供应链风险" value={data.legalAnalysis.supplyChainRisk} />
        <RiskKV label="AI 风险" value={data.legalAnalysis.aiRisk} />
        <RiskKV label="网络安全风险" value={data.legalAnalysis.cyberSecurityRisk} />
        <RiskKV label="数据安全风险" value={data.legalAnalysis.dataSecurityRisk} />
        <RiskKV label="国际贸易风险" value={data.legalAnalysis.internationalTradeRisk} />
        <RiskKV label="汇率风险" value={data.legalAnalysis.fxRisk} />
        <RiskKV label="地缘政治风险" value={data.legalAnalysis.geopoliticalRisk} />
      </Section>

      <Section title="企业估值">
        <KV label="DCF" value={data.valuationAnalysis.dcf} />
        <KV label="市盈率 (P/E)" value={data.valuationAnalysis.peRatio} />
        <KV label="市销率 (P/S)" value={data.valuationAnalysis.psRatio} />
        <KV label="EV/EBITDA" value={data.valuationAnalysis.evEbitda} />
        <KV label="EV/Sales" value={data.valuationAnalysis.evSales} />
        <KV label="PEG" value={data.valuationAnalysis.peg} />
        <KV label="股息折现 (DDM)" value={data.valuationAnalysis.ddm} />
        <KV label="可比公司估值" value={data.valuationAnalysis.comparableCompany} />
        <KV label="可比交易估值" value={data.valuationAnalysis.comparableTransaction} />
        <KV label="企业价值" value={data.valuationAnalysis.equityValue} />
        <KV label="股权价值" value={data.valuationAnalysis.shareValue} />
        <KV label="估值区间" value={data.valuationAnalysis.valuationRange} />
        <KV label="悲观情景" value={data.valuationAnalysis.bearCase} />
        <KV label="基准情景" value={data.valuationAnalysis.baseCase} />
        <KV label="乐观情景" value={data.valuationAnalysis.bullCase} />
        <KV label="增长率敏感性" value={data.valuationAnalysis.sensitivityGrowthRate} />
        <KV label="利润率敏感性" value={data.valuationAnalysis.sensitivityMargin} />
        <KV label="折现率敏感性" value={data.valuationAnalysis.sensitivityDiscountRate} />
      </Section>
    </div>
  );
}