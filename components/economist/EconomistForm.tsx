"use client";

import React, { useState } from 'react';
import {
  EconomistData, SchoolOfThought, PredictionAccuracy,
  MarketRelevance, SignalStrength
} from '../../types/economist';

interface EconomistFormProps {
  onSubmit: (data: EconomistData) => void;
  onCancel: () => void;
  initialData?: Partial<EconomistData>;
}

const TABS = [
  { id: 'basic',         label: '基本信息' },
  { id: 'theory',        label: '理论体系' },
  { id: 'publications',  label: '著作论文' },
  { id: 'predictions',   label: '预测记录' },
  { id: 'investment',    label: '投资策略' },
  { id: 'influence',     label: '影响力' },
  { id: 'applicability', label: '适用性分析' },
];

const SCHOOL_OPTIONS: { value: SchoolOfThought; label: string; desc: string }[] = [
  { value: 'keynesian',       label: '凯恩斯主义',   desc: '需求管理、财政刺激' },
  { value: 'monetarist',      label: '货币主义',     desc: '货币供应量、通胀控制（弗里德曼）' },
  { value: 'austrian',        label: '奥地利学派',   desc: '商业周期、自由市场（哈耶克）' },
  { value: 'behavioral',      label: '行为经济学',   desc: '非理性决策、心理偏差（塞勒）' },
  { value: 'institutional',   label: '制度经济学',   desc: '制度与经济行为' },
  { value: 'neoclassical',    label: '新古典主义',   desc: '理性预期、均衡模型' },
  { value: 'post-keynesian',  label: '后凯恩斯主义', desc: '不确定性、金融不稳定（明斯基）' },
  { value: 'mmt',             label: 'MMT 现代货币',  desc: '主权货币、财政空间' },
  { value: 'supply-side',     label: '供给侧经济学', desc: '减税、放松管制' },
  { value: 'other',           label: '其他',         desc: '跨学派或独立体系' },
];

const ACCURACY_OPTIONS: { value: PredictionAccuracy; label: string; color: string }[] = [
  { value: 'excellent', label: '极准确',  color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'good',      label: '较准确',  color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { value: 'mixed',     label: '褒贬不一', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { value: 'poor',      label: '误差较大', color: 'bg-rose-100 text-rose-700 border-rose-200' },
];

const RELEVANCE_OPTIONS: { value: MarketRelevance; label: string; color: string }[] = [
  { value: 'high',   label: '高度相关', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'medium', label: '中等相关', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { value: 'low',    label: '参考价值有限', color: 'bg-slate-100 text-slate-600 border-slate-200' },
];

const SIGNAL_OPTIONS: { value: SignalStrength; label: string; color: string }[] = [
  { value: 'strong_buy',  label: '强烈看多', color: 'bg-emerald-500 text-white border-emerald-500' },
  { value: 'buy',         label: '偏多',     color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'neutral',     label: '中性',     color: 'bg-slate-100 text-slate-600 border-slate-200' },
  { value: 'sell',        label: '偏空',     color: 'bg-rose-100 text-rose-700 border-rose-200' },
  { value: 'strong_sell', label: '强烈看空', color: 'bg-rose-500 text-white border-rose-500' },
];

const Field = ({
  label, value, onChange, placeholder, multiline = false, hint,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; multiline?: boolean; hint?: string;
}) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      <label className="text-xs font-medium text-slate-500">{label}</label>
      {hint && <span className="text-[10px] text-slate-300 font-mono">{hint}</span>}
    </div>
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

function SelectField<T extends string>({
  label, value, onChange, options,
}: {
  label: string;
  value: T | undefined;
  onChange: (v: T) => void;
  options: { value: T; label: string; color?: string; desc?: string }[];
}) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-slate-500">{label}</label>
      <div className="flex gap-2 flex-wrap">
        {options.map(opt => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
              value === opt.value
                ? (opt.color ?? 'bg-amber-100 text-amber-700 border-amber-300')
                : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const SectionLabel = ({ text }: { text: string }) => (
  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-2 pb-1 border-b border-slate-100">
    {text}
  </p>
);

export default function EconomistForm({ onSubmit, onCancel, initialData }: EconomistFormProps) {
  const [activeTab, setActiveTab] = useState('basic');

  const [basic, setBasic] = useState({
    name: '', nameEn: '', birthYear: '', nationality: '',
    currentAffiliation: '', title: '', education: '',
    awards: '', website: '', twitter: '', wikipedia: '',
    ...(initialData?.basicInfo ?? {}),
  });

  const [theory, setTheory] = useState({
    schoolOfThought: undefined as SchoolOfThought | undefined,
    schoolDesc: '', coreTheories: '', keyStrategies: '',
    famousModels: '', keyEquations: '', macroView: '',
    microView: '', monetaryView: '', fiscalView: '',
    tradeView: '', regulationView: '',
    critiquesOfOthers: '', critiquesReceived: '',
    ...(initialData?.theory ?? {}),
  });

  const [publications, setPublications] = useState({
    majorBooks: '', seminalPapers: '', googleScholarCitations: '',
    hIndex: '', recentPublications: '', popularWritings: '',
    substack: '', podcasts: '',
    ...(initialData?.publications ?? {}),
  });

  const [predictions, setPredictions] = useState({
    famousPredictions: '', failedPredictions: '',
    predictionAccuracy: undefined as PredictionAccuracy | undefined,
    trackRecord: '', currentOutlook: '', inflationView: '',
    growthView: '', rateView: '', recessionRisk: '',
    chinaView: '', geopoliticsView: '',
    ...(initialData?.predictions ?? {}),
  });

  const [investment, setInvestment] = useState({
    investmentPhilosophy: '', assetAllocation: '',
    stockView: '', bondView: '', goldView: '', cryptoView: '',
    realEstateView: '', currencyView: '', sectorPreferences: '',
    riskManagement: '', timeHorizon: '',
    overallSignal: undefined as SignalStrength | undefined,
    keyIndicators: '', tradingRules: '',
    ...(initialData?.investment ?? {}),
  });

  const [influence, setInfluence] = useState({
    influencedBy: '', influencedWhom: '', students: '',
    policyImpact: '', centralBankInfluence: '', governmentRoles: '',
    marketImpact: '', mediaPresence: '',
    marketRelevance: undefined as MarketRelevance | undefined,
    ...(initialData?.influence ?? {}),
  });

  const [applicability, setApplicability] = useState({
    applicableRegimes: '', inapplicableRegimes: '',
    currentApplicability: '', strengthsWeaknesses: '',
    howToApply: '', compatibleStrategies: '',
    conflictingViews: '', personalNotes: '',
    ...(initialData?.applicability ?? {}),
  });

  const s = <T extends object>(setter: React.Dispatch<React.SetStateAction<T>>, key: keyof T) =>
    (v: string) => setter(prev => ({ ...prev, [key]: v as T[keyof T] }));

  const sv = <T extends object, V>(setter: React.Dispatch<React.SetStateAction<T>>, key: keyof T) =>
    (v: V) => setter(prev => ({ ...prev, [key]: v as T[keyof T] }));

  const handleSubmit = () => {
    const data: EconomistData = {
      id: initialData?.id ?? Date.now().toString(),
      createdAt: initialData?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      basicInfo: basic,
      theory,
      publications,
      predictions,
      investment,
      influence,
      applicability,
    };
    onSubmit(data);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Tab 导航 */}
      <div className="flex gap-1 flex-wrap px-6 py-3 border-b border-slate-100 bg-slate-50/50 shrink-0">
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

        {activeTab === 'basic' && (<>
          <Field label="姓名 *" value={basic.name} onChange={s(setBasic, 'name')} placeholder="e.g. 保罗·克鲁格曼" />
          <Field label="英文名" value={basic.nameEn} onChange={s(setBasic, 'nameEn')} placeholder="e.g. Paul Krugman" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="出生年份" value={basic.birthYear} onChange={s(setBasic, 'birthYear')} placeholder="e.g. 1953" />
            <Field label="国籍" value={basic.nationality} onChange={s(setBasic, 'nationality')} placeholder="e.g. 美国" />
          </div>
          <Field label="当前所在机构" value={basic.currentAffiliation} onChange={s(setBasic, 'currentAffiliation')} placeholder="e.g. 普林斯顿大学、纽约时报" />
          <Field label="职称 / 头衔" value={basic.title} onChange={s(setBasic, 'title')} placeholder="e.g. 经济学教授、诺贝尔经济学奖得主" />
          <Field label="教育背景" value={basic.education} onChange={s(setBasic, 'education')} multiline placeholder="本科、硕士、博士院校及专业..." />
          <Field label="获奖记录" value={basic.awards} onChange={s(setBasic, 'awards')} multiline placeholder="诺贝尔经济学奖（年份）、克拉克奖章..." />
          <SectionLabel text="社交与链接" />
          <div className="grid grid-cols-1 gap-3">
            <Field label="个人官网" value={basic.website} onChange={s(setBasic, 'website')} placeholder="https://" />
            <Field label="X (Twitter)" value={basic.twitter} onChange={s(setBasic, 'twitter')} placeholder="@handle" />
            <Field label="Wikipedia" value={basic.wikipedia} onChange={s(setBasic, 'wikipedia')} placeholder="Wikipedia URL" />
          </div>
        </>)}

        {activeTab === 'theory' && (<>
          <SelectField
            label="所属学派"
            value={theory.schoolOfThought}
            onChange={sv(setTheory, 'schoolOfThought')}
            options={SCHOOL_OPTIONS}
          />
          <Field label="学派补充说明" value={theory.schoolDesc} onChange={s(setTheory, 'schoolDesc')} multiline />
          <Field label="核心理论（主要贡献）" value={theory.coreTheories} onChange={s(setTheory, 'coreTheories')} multiline placeholder="比较优势理论、新贸易理论、流动性陷阱..." />
          <Field label="重要策略 / 政策主张" value={theory.keyStrategies} onChange={s(setTheory, 'keyStrategies')} multiline placeholder="量化宽松支持者、财政乘数效应..." />
          <Field label="著名模型 / 分析框架" value={theory.famousModels} onChange={s(setTheory, 'famousModels')} multiline placeholder="IS-LM模型、菲利普斯曲线、明斯基时刻..." />
          <Field label="代表性公式 / 方程" value={theory.keyEquations} onChange={s(setTheory, 'keyEquations')} multiline placeholder="MV=PQ、AD-AS模型..." />
          <SectionLabel text="政策立场" />
          <Field label="宏观经济观" value={theory.macroView} onChange={s(setTheory, 'macroView')} multiline />
          <Field label="货币政策立场" value={theory.monetaryView} onChange={s(setTheory, 'monetaryView')} multiline placeholder="鸽派/鹰派，对加息/降息的态度..." />
          <Field label="财政政策立场" value={theory.fiscalView} onChange={s(setTheory, 'fiscalView')} multiline placeholder="支持/反对财政刺激，政府支出观..." />
          <Field label="贸易政策立场" value={theory.tradeView} onChange={s(setTheory, 'tradeView')} multiline placeholder="自由贸易/保护主义..." />
          <Field label="监管立场" value={theory.regulationView} onChange={s(setTheory, 'regulationView')} multiline />
          <SectionLabel text="学术争论" />
          <Field label="对其他学派的批评" value={theory.critiquesOfOthers} onChange={s(setTheory, 'critiquesOfOthers')} multiline />
          <Field label="受到的主要批评" value={theory.critiquesReceived} onChange={s(setTheory, 'critiquesReceived')} multiline />
        </>)}

        {activeTab === 'publications' && (<>
          <Field label="代表著作" value={publications.majorBooks} onChange={s(setPublications, 'majorBooks')} multiline placeholder="《经济大萧条的经济学》《克鲁格曼的预言》..." />
          <Field label="奠基性论文" value={publications.seminalPapers} onChange={s(setPublications, 'seminalPapers')} multiline placeholder="论文标题、发表期刊、年份..." />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Google Scholar 引用数" value={publications.googleScholarCitations} onChange={s(setPublications, 'googleScholarCitations')} placeholder="e.g. 120,000+" />
            <Field label="h 指数" value={publications.hIndex} onChange={s(setPublications, 'hIndex')} hint="学术影响力" placeholder="e.g. 85" />
          </div>
          <Field label="近期发表" value={publications.recentPublications} onChange={s(setPublications, 'recentPublications')} multiline placeholder="近2年的论文或研究报告..." />
          <Field label="大众读物 / 专栏" value={publications.popularWritings} onChange={s(setPublications, 'popularWritings')} multiline placeholder="NYT专栏、Project Syndicate..." />
          <div className="grid grid-cols-1 gap-3">
            <Field label="Substack / 博客" value={publications.substack} onChange={s(setPublications, 'substack')} placeholder="URL" />
            <Field label="播客 / 访谈" value={publications.podcasts} onChange={s(setPublications, 'podcasts')} placeholder="常出没的媒体节目..." />
          </div>
        </>)}

        {activeTab === 'predictions' && (<>
          <SelectField
            label="整体预测准确度"
            value={predictions.predictionAccuracy}
            onChange={sv(setPredictions, 'predictionAccuracy')}
            options={ACCURACY_OPTIONS}
          />
          <Field label="整体预测记录" value={predictions.trackRecord} onChange={s(setPredictions, 'trackRecord')} multiline placeholder="历史预测的总体评价..." />
          <Field label="著名成功预测" value={predictions.famousPredictions} onChange={s(setPredictions, 'famousPredictions')} multiline placeholder="2008金融危机预警、科技泡沫预测..." />
          <Field label="著名失误预测" value={predictions.failedPredictions} onChange={s(setPredictions, 'failedPredictions')} multiline placeholder="低估通胀、错判衰退时间..." />
          <SectionLabel text="当前市场观点" />
          <Field label="当前市场展望" value={predictions.currentOutlook} onChange={s(setPredictions, 'currentOutlook')} multiline placeholder="对未来12-24个月的整体判断..." />
          <Field label="通胀观点" value={predictions.inflationView} onChange={s(setPredictions, 'inflationView')} multiline placeholder="通胀是否持续？央行应如何应对？" />
          <Field label="经济增长观点" value={predictions.growthView} onChange={s(setPredictions, 'growthView')} multiline />
          <Field label="利率观点" value={predictions.rateView} onChange={s(setPredictions, 'rateView')} multiline placeholder="对当前加息/降息周期的判断..." />
          <Field label="衰退风险判断" value={predictions.recessionRisk} onChange={s(setPredictions, 'recessionRisk')} multiline placeholder="衰退概率、时间窗口..." />
          <Field label="对中国经济的看法" value={predictions.chinaView} onChange={s(setPredictions, 'chinaView')} multiline />
          <Field label="地缘政治经济影响" value={predictions.geopoliticsView} onChange={s(setPredictions, 'geopoliticsView')} multiline />
        </>)}

        {activeTab === 'investment' && (<>
          <SelectField
            label="综合市场信号"
            value={investment.overallSignal}
            onChange={sv(setInvestment, 'overallSignal')}
            options={SIGNAL_OPTIONS}
          />
          <Field label="投资哲学" value={investment.investmentPhilosophy} onChange={s(setInvestment, 'investmentPhilosophy')} multiline placeholder="长期主义、价值投资、宏观驱动..." />
          <Field label="推荐资产配置" value={investment.assetAllocation} onChange={s(setInvestment, 'assetAllocation')} multiline placeholder="股债比例、另类资产比例..." />
          <SectionLabel text="各类资产观点" />
          <Field label="股票观点" value={investment.stockView} onChange={s(setInvestment, 'stockView')} multiline placeholder="看多/看空，偏好哪些市场或行业..." />
          <Field label="债券观点" value={investment.bondView} onChange={s(setInvestment, 'bondView')} multiline />
          <Field label="黄金观点" value={investment.goldView} onChange={s(setInvestment, 'goldView')} multiline />
          <Field label="加密货币观点" value={investment.cryptoView} onChange={s(setInvestment, 'cryptoView')} multiline />
          <Field label="房地产观点" value={investment.realEstateView} onChange={s(setInvestment, 'realEstateView')} multiline />
          <Field label="汇率观点" value={investment.currencyView} onChange={s(setInvestment, 'currencyView')} multiline placeholder="美元走势、人民币、新兴市场货币..." />
          <Field label="偏好行业 / 板块" value={investment.sectorPreferences} onChange={s(setInvestment, 'sectorPreferences')} multiline />
          <SectionLabel text="策略指导" />
          <Field label="风险管理建议" value={investment.riskManagement} onChange={s(setInvestment, 'riskManagement')} multiline />
          <Field label="推荐投资周期" value={investment.timeHorizon} onChange={s(setInvestment, 'timeHorizon')} placeholder="短期/中期/长期，具体年限..." />
          <Field label="关注的核心指标" value={investment.keyIndicators} onChange={s(setInvestment, 'keyIndicators')} multiline placeholder="收益率曲线、PMI、M2增速..." />
          <Field label="代表性交易规则 / 原则" value={investment.tradingRules} onChange={s(setInvestment, 'tradingRules')} multiline placeholder="逆向投资、趋势跟随、分散配置..." />
        </>)}

        {activeTab === 'influence' && (<>
          <SelectField
            label="当前市场相关度"
            value={influence.marketRelevance}
            onChange={sv(setInfluence, 'marketRelevance')}
            options={RELEVANCE_OPTIONS}
          />
          <Field label="师承 / 思想来源" value={influence.influencedBy} onChange={s(setInfluence, 'influencedBy')} multiline placeholder="凯恩斯、弗里德曼、萨缪尔森..." />
          <Field label="影响了哪些人" value={influence.influencedWhom} onChange={s(setInfluence, 'influencedWhom')} multiline />
          <Field label="著名学生" value={influence.students} onChange={s(setInfluence, 'students')} multiline />
          <Field label="政策影响力" value={influence.policyImpact} onChange={s(setInfluence, 'policyImpact')} multiline placeholder="曾担任政府顾问、参与政策制定..." />
          <Field label="对央行的影响" value={influence.centralBankInfluence} onChange={s(setInfluence, 'centralBankInfluence')} multiline placeholder="与Fed、ECB、PBOC的关系..." />
          <Field label="政府职务" value={influence.governmentRoles} onChange={s(setInfluence, 'governmentRoles')} multiline placeholder="CEA主席、财政部顾问..." />
          <Field label="发言对市场的影响力" value={influence.marketImpact} onChange={s(setInfluence, 'marketImpact')} multiline placeholder="其公开言论是否会影响市场走势..." />
          <Field label="媒体出现频率" value={influence.mediaPresence} onChange={s(setInfluence, 'mediaPresence')} multiline placeholder="Bloomberg、CNBC、NYT..." />
        </>)}

        {activeTab === 'applicability' && (<>
          <Field label="适用的经济环境" value={applicability.applicableRegimes} onChange={s(setApplicability, 'applicableRegimes')} multiline placeholder="高通胀时期、衰退期、低利率环境..." />
          <Field label="不适用的经济环境" value={applicability.inapplicableRegimes} onChange={s(setApplicability, 'inapplicableRegimes')} multiline placeholder="在哪些环境下其理论失效..." />
          <Field label="当前环境适用性分析" value={applicability.currentApplicability} onChange={s(setApplicability, 'currentApplicability')} multiline placeholder="结合当前宏观环境，评估其理论的参考价值..." />
          <Field label="理论优势与局限" value={applicability.strengthsWeaknesses} onChange={s(setApplicability, 'strengthsWeaknesses')} multiline />
          <Field label="如何将其理论用于投资" value={applicability.howToApply} onChange={s(setApplicability, 'howToApply')} multiline placeholder="具体操作层面的应用方法..." />
          <Field label="可搭配的其他策略" value={applicability.compatibleStrategies} onChange={s(setApplicability, 'compatibleStrategies')} multiline placeholder="与其观点互补的其他经济学家或策略..." />
          <Field label="与哪些经济学家观点冲突" value={applicability.conflictingViews} onChange={s(setApplicability, 'conflictingViews')} multiline />
          <Field label="个人研究笔记" value={applicability.personalNotes} onChange={s(setApplicability, 'personalNotes')} multiline placeholder="自由记录你的思考、疑问、灵感..." />
        </>)}

      </div>

      {/* 底部按钮 */}
      <div className="px-6 py-4 border-t border-slate-100 flex justify-between items-center shrink-0">
        <span className="text-xs text-slate-400">* 仅已填写的字段会显示在研究页面</span>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all"
          >
            取消
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2 text-sm bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-xl transition-all shadow-sm shadow-amber-200"
          >
            确认添加
          </button>
        </div>
      </div>
    </div>
  );
}