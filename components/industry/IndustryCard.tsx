"use client";

import React, { useState } from 'react';
import { IndustryData, RiskLevel, TrendDirection, SignalStrength, LifecycleStage } from '../../types/industry';
import { Pencil, Trash2, ChevronDown, ChevronUp, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface IndustryCardProps {
  data: IndustryData;
  onEdit: (data: IndustryData) => void;
  onDelete: () => void;
}

const RISK_STYLE: Record<RiskLevel, string> = {
  low:      'bg-emerald-100 text-emerald-700',
  medium:   'bg-yellow-100 text-yellow-700',
  high:     'bg-orange-100 text-orange-700',
  critical: 'bg-rose-100 text-rose-700 font-bold',
};

const SIGNAL_STYLE: Record<SignalStrength, string> = {
  strong_buy:  'bg-emerald-500 text-white',
  buy:         'bg-emerald-100 text-emerald-700',
  neutral:     'bg-slate-100 text-slate-600',
  sell:        'bg-rose-100 text-rose-700',
  strong_sell: 'bg-rose-500 text-white',
};

const SIGNAL_LABEL: Record<SignalStrength, string> = {
  strong_buy: '强烈买入', buy: '买入', neutral: '中性', sell: '卖出', strong_sell: '强烈卖出',
};

const LIFECYCLE_LABEL: Record<LifecycleStage, string> = {
  introduction: '导入期', growth: '成长期', maturity: '成熟期', decline: '衰退期',
};

const LIFECYCLE_STYLE: Record<LifecycleStage, string> = {
  introduction: 'bg-blue-100 text-blue-700',
  growth:       'bg-emerald-100 text-emerald-700',
  maturity:     'bg-amber-100 text-amber-700',
  decline:      'bg-rose-100 text-rose-700',
};

const TrendIcon = ({ value }: { value?: TrendDirection }) => {
  if (!value) return null;
  if (value === 'up')   return <TrendingUp size={12} className="text-emerald-500" />;
  if (value === 'down') return <TrendingDown size={12} className="text-rose-500" />;
  return <Minus size={12} className="text-slate-400" />;
};

const KV = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;
  return (
    <div className="flex gap-2 py-1.5 border-b border-slate-50 last:border-0">
      <span className="text-xs text-slate-400 w-40 shrink-0">{label}</span>
      <span className="text-xs text-slate-700 flex-1">{value}</span>
    </div>
  );
};

const RiskKV = ({ label, value }: { label: string; value?: RiskLevel }) => {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2 py-1.5 border-b border-slate-50 last:border-0">
      <span className="text-xs text-slate-400 w-40 shrink-0">{label}</span>
      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${RISK_STYLE[value]}`}>{value.toUpperCase()}</span>
    </div>
  );
};

const TrendKV = ({ label, value }: { label: string; value?: TrendDirection }) => {
  if (!value) return null;
  const labels: Record<TrendDirection, string> = { up: '↑ 上升', flat: '→ 平稳', down: '↓ 下降' };
  return (
    <div className="flex items-center gap-2 py-1.5 border-b border-slate-50 last:border-0">
      <span className="text-xs text-slate-400 w-40 shrink-0">{label}</span>
      <span className="flex items-center gap-1 text-xs">
        <TrendIcon value={value} />{labels[value]}
      </span>
    </div>
  );
};

const Section = ({ title, children, defaultOpen = true }: {
  title: string; children: React.ReactNode; defaultOpen?: boolean;
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const valid = React.Children.toArray(children).filter(Boolean);
  if (valid.length === 0) return null;
  return (
    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center px-5 py-3.5 hover:bg-slate-50 transition-colors">
        <span className="text-sm font-semibold text-slate-800">{title}</span>
        {open ? <ChevronUp size={15} className="text-slate-400" /> : <ChevronDown size={15} className="text-slate-400" />}
      </button>
      {open && <div className="px-5 pb-4">{children}</div>}
    </div>
  );
};

export default function IndustryCard({ data, onEdit, onDelete }: IndustryCardProps) {
  const b = data.basicInfo;
  const sig = data.investmentSignal;

  return (
    <div className="space-y-4">
      {/* 产业头部 */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-xl font-bold text-slate-900">{b.industryName || '未命名产业'}</h3>
            {b.industryNameEn && <span className="text-sm text-slate-400">{b.industryNameEn}</span>}
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {b.tier1 && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{b.tier1}</span>}
            {b.tier2 && <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">{b.tier2}</span>}
            {b.tier3 && <span className="text-xs bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">{b.tier3}</span>}
            {b.currentStage && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${LIFECYCLE_STYLE[b.currentStage]}`}>
                {LIFECYCLE_LABEL[b.currentStage]}
              </span>
            )}
            {sig.overallSignal && (
              <span className={`text-xs px-3 py-0.5 rounded-full font-semibold ${SIGNAL_STYLE[sig.overallSignal]}`}>
                {SIGNAL_LABEL[sig.overallSignal]}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(data)} className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all"><Pencil size={15} /></button>
          <button onClick={onDelete} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"><Trash2 size={15} /></button>
        </div>
      </div>

      <Section title="产业基本信息">
        <KV label="英文名称" value={b.industryNameEn} />
        <KV label="一级 / 二级 / 三级" value={[b.tier1, b.tier2, b.tier3].filter(Boolean).join(' → ')} />
        <KV label="产业代码" value={b.industryCode} />
        <KV label="GICS 代码" value={b.gicsCode} />
        <KV label="全球市场" value={b.globalMarket} />
        <KV label="核心驱动因素" value={b.keyDrivers} />
        <KV label="预计拐点" value={b.pivotPoint} />
        <KV label="产业简述" value={b.description} />
      </Section>

      <Section title="行业规模">
        <KV label="全球市场规模" value={data.marketScale.globalMarketSize} />
        <KV label="中国市场" value={data.marketScale.chinaMarketSize} />
        <KV label="欧洲市场" value={data.marketScale.europeMarketSize} />
        <KV label="美国市场" value={data.marketScale.usMarketSize} />
        <KV label="全球 CAGR" value={data.marketScale.globalCAGR} />
        <KV label="YoY 增长率" value={data.marketScale.yoy} />
        <KV label="5年 CAGR" value={data.marketScale.cagr5yr} />
        <KV label="10年 CAGR" value={data.marketScale.cagr10yr} />
        <KV label="TAM" value={data.marketScale.tamGlobal} />
        <KV label="SAM" value={data.marketScale.samGlobal} />
        <KV label="数据来源" value={data.marketScale.dataSource} />
      </Section>

      <Section title="产业结构">
        <KV label="主要供应商" value={data.industryStructure.upstreamSuppliers} />
        <KV label="上游成本占比" value={data.industryStructure.upstreamCostRatio} />
        <KV label="产能利用率" value={data.industryStructure.midstreamUtilization} />
        <KV label="利润分布" value={data.industryStructure.profitDistribution} />
        <KV label="微笑曲线位置" value={data.industryStructure.smilesCurve} />
        <KV label="垂直整合程度" value={data.industryStructure.verticalIntegration} />
        <KV label="价值链描述" value={data.industryStructure.valueChainDesc} />
      </Section>

      <Section title="市场分析">
        <KV label="前5市场集中度" value={data.marketAnalysis.marketShare} />
        <KV label="CR4 / CR8" value={[data.marketAnalysis.cr4, data.marketAnalysis.cr8].filter(Boolean).join(' / ')} />
        <KV label="HHI 指数" value={data.marketAnalysis.hhi} />
        <KV label="市场集中度" value={data.marketAnalysis.marketConcentration} />
        <KV label="进入壁垒" value={data.marketAnalysis.entryBarrier} />
        <KV label="行业净利润率" value={data.marketAnalysis.industryProfitMargin} />
        <KV label="行业毛利率" value={data.marketAnalysis.industryGrossMargin} />
        <KV label="行业 ROE / ROIC" value={[data.marketAnalysis.industryROE, data.marketAnalysis.industryROIC].filter(Boolean).join(' / ')} />
        <KV label="行业 P/E / P/S" value={[data.marketAnalysis.industryPE, data.marketAnalysis.industryPS].filter(Boolean).join(' / ')} />
        <KV label="供应商议价力" value={data.marketAnalysis.supplierPower} />
        <KV label="买方议价力" value={data.marketAnalysis.buyerPower} />
        <KV label="替代品威胁" value={data.marketAnalysis.substituteThreat} />
        <KV label="核心竞争优势" value={data.marketAnalysis.competitiveAdvantage} />
      </Section>

      <Section title="供需分析">
        <KV label="产能利用率" value={data.supplyDemand.capacityUtilization} />
        <KV label="库存周期" value={data.supplyDemand.inventoryCycle} />
        <TrendKV label="价格走势" value={data.supplyDemand.priceTrend} />
        <KV label="价格波动率" value={data.supplyDemand.priceVolatility} />
        <KV label="需求价格弹性 ε_d" value={data.supplyDemand.demandElasticity} />
        <KV label="收入弹性 ε_y" value={data.supplyDemand.incomeElasticity} />
        <KV label="1年价格预测" value={data.supplyDemand.forecast1yr} />
        <KV label="3年价格预测" value={data.supplyDemand.forecast3yr} />
        <KV label="5年价格预测" value={data.supplyDemand.forecast5yr} />
        <KV label="10年价格预测" value={data.supplyDemand.forecast10yr} />
        <KV label="与 GDP 相关性 ρ" value={data.supplyDemand.correlationWithGDP} />
        <KV label="与 CPI 相关性 ρ" value={data.supplyDemand.correlationWithCPI} />
      </Section>

      <Section title="产业周期">
        <KV label="当前周期位置" value={data.industryCycle.currentPosition} />
        <KV label="平均周期长度" value={data.industryCycle.cycleLength} />
        <KV label="拐点信号" value={data.industryCycle.pivotSignals} />
        <KV label="领先指标" value={data.industryCycle.leadingIndicators} />
        <KV label="基钦周期（库存）" value={data.industryCycle.kitchinCycle} />
        <KV label="朱格拉周期（设备）" value={data.industryCycle.juglarCycle} />
        <KV label="康德拉季耶夫周期" value={data.industryCycle.kondratievCycle} />
        <KV label="预计下一拐点" value={data.industryCycle.nextPivotEstimate} />
        <KV label="投资时机评估" value={data.industryCycle.investmentTiming} />
      </Section>

      <Section title="产业政策">
        <KV label="国家政策" value={data.policy.nationalPolicy} />
        <KV label="税收优惠" value={data.policy.taxIncentives} />
        <KV label="补贴政策" value={data.policy.subsidies} />
        <KV label="关税水平" value={data.policy.tariffs} />
        <KV label="AI 法规" value={data.policy.aiRegulation} />
        <KV label="相关贸易协定" value={data.policy.tradeAgreements} />
        <KV label="政策友好度" value={data.policy.policyScore} />
        <RiskKV label="政策风险" value={data.policy.policyRisk} />
        <TrendKV label="监管趋势" value={data.policy.regulatoryTrend} />
        <KV label="政策机会" value={data.policy.policyOpportunity} />
        <KV label="关键政策时间线" value={data.policy.policyTimeline} />
      </Section>

      <Section title="技术分析">
        <KV label="技术成熟度" value={data.techAnalysis.maturityLevel} />
        <KV label="TRL" value={data.techAnalysis.trl} />
        <KV label="全行业研发投入" value={data.techAnalysis.rdInvestment} />
        <KV label="研发强度" value={data.techAnalysis.rdIntensity} />
        <KV label="年度专利数量" value={data.techAnalysis.patentCount} />
        <KV label="技术壁垒" value={data.techAnalysis.techBarrier} />
        <KV label="被颠覆风险" value={data.techAnalysis.disruptionRisk} />
        <KV label="AI 影响" value={data.techAnalysis.aiImpact} />
        <KV label="技术领先国" value={data.techAnalysis.techLeaders} />
      </Section>

      <Section title="资本分析">
        <KV label="VC 投资规模" value={data.capitalAnalysis.vcInvestment} />
        <KV label="PE 投资规模" value={data.capitalAnalysis.peInvestment} />
        <KV label="YTD 融资总额" value={data.capitalAnalysis.totalFundingYTD} />
        <KV label="平均退出倍数" value={data.capitalAnalysis.exitMultiple} />
        <KV label="活跃投资机构" value={data.capitalAnalysis.topInvestors} />
        <TrendKV label="资本趋势" value={data.capitalAnalysis.capitalTrend} />
        <KV label="主流投资逻辑" value={data.capitalAnalysis.investmentThesis} />
      </Section>

      <Section title="企业生态">
        <KV label="龙头企业" value={data.ecosystem.leaders} />
        <KV label="独角兽" value={data.ecosystem.unicorns} />
        <KV label="代表性 Startup" value={data.ecosystem.startups} />
        <KV label="上市公司/ETF" value={data.ecosystem.publicCompanies} />
        <KV label="重要行业会议" value={data.ecosystem.keyConferences} />
      </Section>

      <Section title="全球竞争">
        <KV label="市场领先国" value={data.globalCompetition.marketLeaders} />
        <KV label="技术领先国" value={data.globalCompetition.techLeaders} />
        <KV label="制造业中心" value={data.globalCompetition.manufacturingHub} />
        <KV label="中国定位" value={data.globalCompetition.chinaPosition} />
        <KV label="产业链脱钩风险" value={data.globalCompetition.decouplingRisk} />
        <KV label="地缘政治风险" value={data.globalCompetition.geopoliticalRisk} />
      </Section>

      <Section title="风险评估">
        <RiskKV label="技术失败风险" value={data.riskAnalysis.techFailureRisk} />
        <RiskKV label="政策监管风险" value={data.riskAnalysis.policyRisk} />
        <RiskKV label="供应链风险" value={data.riskAnalysis.supplyChainRisk} />
        <RiskKV label="战争/地缘风险" value={data.riskAnalysis.warRisk} />
        <RiskKV label="汇率风险" value={data.riskAnalysis.fxRisk} />
        <RiskKV label="贸易战风险" value={data.riskAnalysis.tradeWarRisk} />
        <RiskKV label="技术颠覆风险" value={data.riskAnalysis.disruptionRisk} />
        <RiskKV label="黑天鹅风险" value={data.riskAnalysis.blackSwanRisk} />
        <KV label="风险综合评估" value={data.riskAnalysis.riskSummary} />
        <KV label="风险对冲策略" value={data.riskAnalysis.riskMitigation} />
      </Section>

      <Section title="投资信号">
        {sig.overallSignal && (
          <div className="flex items-center gap-2 py-2">
            <span className="text-xs text-slate-400 w-40 shrink-0">综合信号</span>
            <span className={`text-sm font-bold px-3 py-1 rounded-full ${SIGNAL_STYLE[sig.overallSignal]}`}>
              {SIGNAL_LABEL[sig.overallSignal]}
            </span>
          </div>
        )}
        <KV label="估值水平" value={sig.valuation} />
        <TrendKV label="价格动量" value={sig.momentum} />
        <KV label="基本面评分" value={sig.fundamentalScore} />
        <KV label="周期位置评分" value={sig.cyclePosition} />
        <KV label="近期催化剂" value={sig.catalysts} />
        <KV label="主要风险提示" value={sig.risks} />
        <KV label="建议持仓周期" value={sig.timeHorizon} />
        <KV label="入场策略" value={sig.entryStrategy} />
        <KV label="退出条件" value={sig.exitStrategy} />
        <KV label="参考 ETF / 指数" value={sig.benchmarkETF} />
        <KV label="分析师一致预期" value={sig.analystConsensus} />
      </Section>
    </div>
  );
}