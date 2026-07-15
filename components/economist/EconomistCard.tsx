"use client";

import React, { useState } from 'react';
import {
  EconomistData, SchoolOfThought, PredictionAccuracy,
  MarketRelevance, SignalStrength
} from '../../types/economist';
import { Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';

interface EconomistCardProps {
  data: EconomistData;
  onEdit: (data: EconomistData) => void;
  onDelete: () => void;
}

const SCHOOL_LABEL: Record<SchoolOfThought, string> = {
  keynesian:      '凯恩斯主义',
  monetarist:     '货币主义',
  austrian:       '奥地利学派',
  behavioral:     '行为经济学',
  institutional:  '制度经济学',
  neoclassical:   '新古典主义',
  'post-keynesian': '后凯恩斯主义',
  mmt:            'MMT 现代货币',
  'supply-side':  '供给侧经济学',
  other:          '其他学派',
};

const SCHOOL_COLOR: Record<SchoolOfThought, string> = {
  keynesian:      'bg-blue-100 text-blue-700',
  monetarist:     'bg-purple-100 text-purple-700',
  austrian:       'bg-amber-100 text-amber-700',
  behavioral:     'bg-pink-100 text-pink-700',
  institutional:  'bg-teal-100 text-teal-700',
  neoclassical:   'bg-indigo-100 text-indigo-700',
  'post-keynesian': 'bg-cyan-100 text-cyan-700',
  mmt:            'bg-emerald-100 text-emerald-700',
  'supply-side':  'bg-orange-100 text-orange-700',
  other:          'bg-slate-100 text-slate-600',
};

const ACCURACY_LABEL: Record<PredictionAccuracy, string> = {
  excellent: '极准确', good: '较准确', mixed: '褒贬不一', poor: '误差较大',
};
const ACCURACY_COLOR: Record<PredictionAccuracy, string> = {
  excellent: 'bg-emerald-100 text-emerald-700',
  good:      'bg-blue-100 text-blue-700',
  mixed:     'bg-yellow-100 text-yellow-700',
  poor:      'bg-rose-100 text-rose-700',
};

const SIGNAL_LABEL: Record<SignalStrength, string> = {
  strong_buy: '强烈看多', buy: '偏多', neutral: '中性', sell: '偏空', strong_sell: '强烈看空',
};
const SIGNAL_COLOR: Record<SignalStrength, string> = {
  strong_buy:  'bg-emerald-500 text-white',
  buy:         'bg-emerald-100 text-emerald-700',
  neutral:     'bg-slate-100 text-slate-600',
  sell:        'bg-rose-100 text-rose-700',
  strong_sell: 'bg-rose-500 text-white',
};

const RELEVANCE_LABEL: Record<MarketRelevance, string> = {
  high: '高度相关', medium: '中等相关', low: '参考有限',
};
const RELEVANCE_COLOR: Record<MarketRelevance, string> = {
  high:   'bg-emerald-100 text-emerald-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low:    'bg-slate-100 text-slate-600',
};

const KV = ({ label, value }: { label: string; value?: string }) => {
  if (!value) return null;
  return (
    <div className="flex gap-2 py-1.5 border-b border-slate-50 last:border-0">
      <span className="text-xs text-slate-400 w-40 shrink-0">{label}</span>
      <span className="text-xs text-slate-700 flex-1 whitespace-pre-wrap">{value}</span>
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

export default function EconomistCard({ data, onEdit, onDelete }: EconomistCardProps) {
  const b = data.basicInfo;
  const t = data.theory;
  const inv = data.investment;
  const inf = data.influence;

  return (
    <div className="space-y-4">
      {/* 头部 */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h3 className="text-xl font-bold text-slate-900">{b.name || '未命名经济学家'}</h3>
            {b.nameEn && <span className="text-sm text-slate-400">{b.nameEn}</span>}
          </div>
          <div className="flex gap-2 mt-2 flex-wrap">
            {t.schoolOfThought && (
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${SCHOOL_COLOR[t.schoolOfThought]}`}>
                {SCHOOL_LABEL[t.schoolOfThought]}
              </span>
            )}
            {data.predictions.predictionAccuracy && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${ACCURACY_COLOR[data.predictions.predictionAccuracy]}`}>
                {ACCURACY_LABEL[data.predictions.predictionAccuracy]}
              </span>
            )}
            {inf.marketRelevance && (
              <span className={`text-xs px-2 py-0.5 rounded-full ${RELEVANCE_COLOR[inf.marketRelevance]}`}>
                {RELEVANCE_LABEL[inf.marketRelevance]}
              </span>
            )}
            {inv.overallSignal && (
              <span className={`text-xs px-3 py-0.5 rounded-full font-semibold ${SIGNAL_COLOR[inv.overallSignal]}`}>
                {SIGNAL_LABEL[inv.overallSignal]}
              </span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onEdit(data)} className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all">
            <Pencil size={15} />
          </button>
          <button onClick={onDelete} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
            <Trash2 size={15} />
          </button>
        </div>
      </div>

      <Section title="基本信息">
        <KV label="英文名" value={b.nameEn} />
        <KV label="出生年份" value={b.birthYear} />
        <KV label="国籍" value={b.nationality} />
        <KV label="当前机构" value={b.currentAffiliation} />
        <KV label="职称 / 头衔" value={b.title} />
        <KV label="教育背景" value={b.education} />
        <KV label="获奖记录" value={b.awards} />
        <KV label="官网" value={b.website} />
        <KV label="X (Twitter)" value={b.twitter} />
      </Section>

      <Section title="理论体系">
        <KV label="核心理论" value={t.coreTheories} />
        <KV label="重要策略 / 主张" value={t.keyStrategies} />
        <KV label="著名模型 / 框架" value={t.famousModels} />
        <KV label="代表性公式" value={t.keyEquations} />
        <KV label="宏观经济观" value={t.macroView} />
        <KV label="货币政策立场" value={t.monetaryView} />
        <KV label="财政政策立场" value={t.fiscalView} />
        <KV label="贸易政策立场" value={t.tradeView} />
        <KV label="对他派的批评" value={t.critiquesOfOthers} />
        <KV label="受到的批评" value={t.critiquesReceived} />
      </Section>

      <Section title="著作与论文">
        <KV label="代表著作" value={data.publications.majorBooks} />
        <KV label="奠基性论文" value={data.publications.seminalPapers} />
        <KV label="Google Scholar 引用" value={data.publications.googleScholarCitations} />
        <KV label="h 指数" value={data.publications.hIndex} />
        <KV label="近期发表" value={data.publications.recentPublications} />
        <KV label="大众读物 / 专栏" value={data.publications.popularWritings} />
        <KV label="Substack / 博客" value={data.publications.substack} />
        <KV label="播客 / 访谈" value={data.publications.podcasts} />
      </Section>

      <Section title="预测记录">
        <KV label="整体记录" value={data.predictions.trackRecord} />
        <KV label="著名成功预测" value={data.predictions.famousPredictions} />
        <KV label="著名失误" value={data.predictions.failedPredictions} />
        <KV label="当前市场展望" value={data.predictions.currentOutlook} />
        <KV label="通胀观点" value={data.predictions.inflationView} />
        <KV label="增长观点" value={data.predictions.growthView} />
        <KV label="利率观点" value={data.predictions.rateView} />
        <KV label="衰退风险判断" value={data.predictions.recessionRisk} />
        <KV label="对中国经济看法" value={data.predictions.chinaView} />
        <KV label="地缘政治影响" value={data.predictions.geopoliticsView} />
      </Section>

      <Section title="投资策略">
        <KV label="投资哲学" value={inv.investmentPhilosophy} />
        <KV label="推荐资产配置" value={inv.assetAllocation} />
        <KV label="股票观点" value={inv.stockView} />
        <KV label="债券观点" value={inv.bondView} />
        <KV label="黄金观点" value={inv.goldView} />
        <KV label="加密货币观点" value={inv.cryptoView} />
        <KV label="汇率观点" value={inv.currencyView} />
        <KV label="偏好行业" value={inv.sectorPreferences} />
        <KV label="风险管理建议" value={inv.riskManagement} />
        <KV label="推荐投资周期" value={inv.timeHorizon} />
        <KV label="关注的核心指标" value={inv.keyIndicators} />
        <KV label="代表性交易规则" value={inv.tradingRules} />
      </Section>

      <Section title="影响力">
        <KV label="师承 / 思想来源" value={inf.influencedBy} />
        <KV label="影响了哪些人" value={inf.influencedWhom} />
        <KV label="著名学生" value={inf.students} />
        <KV label="政策影响力" value={inf.policyImpact} />
        <KV label="对央行的影响" value={inf.centralBankInfluence} />
        <KV label="政府职务" value={inf.governmentRoles} />
        <KV label="发言对市场影响" value={inf.marketImpact} />
        <KV label="媒体出现频率" value={inf.mediaPresence} />
      </Section>

      <Section title="适用性分析">
        <KV label="适用的经济环境" value={data.applicability.applicableRegimes} />
        <KV label="不适用的环境" value={data.applicability.inapplicableRegimes} />
        <KV label="当前环境适用性" value={data.applicability.currentApplicability} />
        <KV label="理论优势与局限" value={data.applicability.strengthsWeaknesses} />
        <KV label="如何用于投资" value={data.applicability.howToApply} />
        <KV label="可搭配的策略" value={data.applicability.compatibleStrategies} />
        <KV label="与哪些观点冲突" value={data.applicability.conflictingViews} />
        <KV label="个人研究笔记" value={data.applicability.personalNotes} />
      </Section>
    </div>
  );
}