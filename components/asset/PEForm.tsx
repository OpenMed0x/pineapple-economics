"use client";

import React, { useState } from 'react';
import { PEData, PEFundCompany, SignalStrength } from '../../types/asset';

interface Props {
  data: PEData;
  onChange: (d: PEData) => void;
}

const SIGNAL_OPTIONS: { value: SignalStrength; label: string; color: string }[] = [
  { value: 'strong_buy',  label: '强烈看多', color: 'bg-emerald-500 text-white border-emerald-500' },
  { value: 'buy',         label: '偏多',     color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  { value: 'neutral',     label: '中性',     color: 'bg-slate-100 text-slate-600 border-slate-200' },
  { value: 'sell',        label: '偏空',     color: 'bg-rose-100 text-rose-700 border-rose-200' },
  { value: 'strong_sell', label: '强烈看空', color: 'bg-rose-500 text-white border-rose-500' },
];

const F = ({ label, value, onChange, placeholder, hint }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; hint?: string;
}) => (
  <div className="space-y-1">
    <div className="flex items-center gap-2">
      <label className="text-xs font-medium text-slate-500">{label}</label>
      {hint && <span className="text-[10px] text-slate-300 font-mono">{hint}</span>}
    </div>
    <input type="text" value={value} onChange={e => onChange(e.target.value)}
      placeholder={placeholder ?? `输入${label}...`}
      className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 focus:bg-white transition-all placeholder:text-slate-300" />
  </div>
);

const FM = ({ label, value, onChange, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string;
}) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-slate-500">{label}</label>
    <textarea value={value} onChange={e => onChange(e.target.value)} rows={2}
      placeholder={placeholder}
      className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 focus:bg-white transition-all resize-none placeholder:text-slate-300" />
  </div>
);

const G2 = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-2 gap-3">{children}</div>
);

const G3 = ({ children }: { children: React.ReactNode }) => (
  <div className="grid grid-cols-3 gap-3">{children}</div>
);

const SL = ({ text }: { text: string }) => (
  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pt-3 pb-1 border-b border-slate-100">
    {text}
  </p>
);

const Signal = ({ value, onChange }: {
  value?: SignalStrength; onChange: (v: SignalStrength) => void;
}) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-slate-500">投资信号</label>
    <div className="flex gap-2 flex-wrap">
      {SIGNAL_OPTIONS.map(o => (
        <button key={o.value} type="button" onClick={() => onChange(o.value)}
          className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all
            ${value === o.value ? o.color : 'bg-white border-slate-200 text-slate-400'}`}>
          {o.label}
        </button>
      ))}
    </div>
  </div>
);

// 单家机构表单
function FirmForm({ value, onChange, onRemove, index }: {
  value: PEFundCompany;
  onChange: (v: PEFundCompany) => void;
  onRemove: () => void;
  index: number;
}) {
  const [section, setSection] = useState<'basic' | 'fund' | 'portfolio' | 'team' | 'market' | 'risk'>('basic');
  const v = value;
  const u = (key: keyof PEFundCompany) => (val: string) =>
    onChange({ ...v, [key]: val });

  const SECTIONS = [
    { id: 'basic',     label: '机构基本' },
    { id: 'fund',      label: '基金详情' },
    { id: 'portfolio', label: '投资组合' },
    { id: 'team',      label: '团队' },
    { id: 'market',    label: '退出环境' },
    { id: 'risk',      label: '风险' },
  ] as const;

  return (
    <div className="border border-amber-100 rounded-2xl overflow-hidden bg-amber-50/10">
      <div className="flex justify-between items-center px-4 py-3 border-b border-amber-100 bg-amber-50/30">
        <span className="text-sm font-semibold text-amber-800">
          {v.firmName ? `${index + 1}. ${v.firmName}` : `机构 #${index + 1}`}
        </span>
        <button onClick={onRemove}
          className="text-xs text-rose-400 hover:text-rose-600 transition-colors">
          删除
        </button>
      </div>

      {/* 子Tab */}
      <div className="flex gap-1 flex-wrap px-4 py-2 border-b border-amber-100 bg-white/50">
        {SECTIONS.map(s => (
          <button key={s.id} onClick={() => setSection(s.id)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-all
              ${section === s.id ? 'bg-amber-500 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="px-4 py-4 space-y-4">

        {section === 'basic' && (<>
          <G2>
            <F label="机构名称 *" value={v.firmName ?? ''} onChange={u('firmName')}
              placeholder="e.g. Sequoia Capital" />
            <F label="机构类型" value={v.firmType ?? ''} onChange={u('firmType')}
              placeholder="PE / VC / 成长型 / 并购型" />
            <F label="成立年份" value={v.founded ?? ''} onChange={u('founded')}
              placeholder="e.g. 1972" />
            <F label="总部" value={v.headquarters ?? ''} onChange={u('headquarters')} />
            <F label="管理规模（AUM）" value={v.aum ?? ''} onChange={u('aum')}
              placeholder="e.g. $85B" />
            <F label="官网" value={v.website ?? ''} onChange={u('website')}
              placeholder="https://" />
          </G2>
          <FM label="核心合伙人" value={v.partners ?? ''} onChange={u('partners')}
            placeholder="Managing Partner、General Partner..." />
          <FM label="主要LP（出资人）" value={v.lps ?? ''} onChange={u('lps')}
            placeholder="养老金、主权基金、捐赠基金、FOF..." />
          <SL text="投资策略" />
          <FM label="核心策略" value={v.strategy ?? ''} onChange={u('strategy')}
            placeholder="LBO / 成长型 / VC / 行业专注型..." />
          <G2>
            <FM label="重点行业" value={v.focusSectors ?? ''} onChange={u('focusSectors')}
              placeholder="科技/医疗/消费/金融..." />
            <FM label="地理侧重" value={v.geographicFocus ?? ''} onChange={u('geographicFocus')}
              placeholder="北美/全球/亚太/新兴市场..." />
          </G2>
          <G3>
            <F label="阶段偏好" value={v.stagePreference ?? ''} onChange={u('stagePreference')}
              placeholder="种子/A/成长/并购" />
            <F label="单笔投资规模" value={v.ticketSize ?? ''} onChange={u('ticketSize')}
              placeholder="e.g. $50M-$500M" />
            <F label="平均持有期" value={v.holdingPeriod ?? ''} onChange={u('holdingPeriod')}
              placeholder="e.g. 5-7年" />
          </G3>
          <F label="行业排名" value={v.ranking ?? ''} onChange={u('ranking')}
            hint="PitchBook/Preqin" placeholder="e.g. Top 10 Global PE" />
          <FM label="差异化竞争优势" value={v.competitiveDiff ?? ''} onChange={u('competitiveDiff')} />
        </>)}

        {section === 'fund' && (<>
          <SL text="历史业绩" />
          <G3>
            <F label="历史 IRR" value={v.irr ?? ''} onChange={u('irr')}
              hint="内部收益率" placeholder="e.g. 22% Net IRR" />
            <F label="MOIC" value={v.moic ?? ''} onChange={u('moic')}
              hint="投资回报倍数" placeholder="e.g. 2.8x" />
            <F label="TVPI" value={v.tvpi ?? ''} onChange={u('tvpi')}
              hint="总价值/实缴" placeholder="e.g. 2.5x" />
            <F label="DPI" value={v.dpi ?? ''} onChange={u('dpi')}
              hint="已分配/实缴" placeholder="e.g. 1.8x" />
            <F label="RVPI" value={v.rvpi ?? ''} onChange={u('rvpi')}
              hint="剩余价值/实缴" placeholder="e.g. 0.7x" />
          </G3>
          <FM label="历史基金业绩" value={v.fundTrackRecord ?? ''} onChange={u('fundTrackRecord')}
            placeholder="Fund I: 3.2x MOIC, 28% IRR; Fund II: ..." />
          <SL text="当前基金" />
          <G2>
            <F label="基金名称" value={v.currentFundName ?? ''} onChange={u('currentFundName')}
              placeholder="e.g. Fund XI" />
            <F label="基金规模" value={v.currentFundSize ?? ''} onChange={u('currentFundSize')}
              placeholder="e.g. $15B" />
            <F label="年份（Vintage）" value={v.vintage ?? ''} onChange={u('vintage')}
              placeholder="e.g. 2023" />
            <F label="已部署比例" value={v.deployed ?? ''} onChange={u('deployed')}
              placeholder="e.g. 45%" />
            <F label="预留后续跟投" value={v.reserveRatio ?? ''} onChange={u('reserveRatio')}
              hint="通常30-40%" />
          </G2>
          <SL text="费率结构" />
          <G3>
            <F label="管理费" value={v.managementFee ?? ''} onChange={u('managementFee')}
              hint="通常2%" placeholder="e.g. 2%/年" />
            <F label="绩效分成（Carry）" value={v.carriedInterest ?? ''} onChange={u('carriedInterest')}
              hint="通常20%" placeholder="e.g. 20%" />
            <F label="最低收益门槛" value={v.hurdleRate ?? ''} onChange={u('hurdleRate')}
              hint="Hurdle Rate" placeholder="e.g. 8%" />
          </G3>
          <F label="最低认购额" value={v.minCommitment ?? ''} onChange={u('minCommitment')}
            placeholder="e.g. $5M" />
        </>)}

        {section === 'portfolio' && (<>
          <FM label="代表性被投企业" value={v.portfolioHighlights ?? ''} onChange={u('portfolioHighlights')}
            placeholder="公司名（行业/阶段/投资年份/现状）..." />
          <FM label="培育的独角兽" value={v.unicorns ?? ''} onChange={u('unicorns')} />
          <FM label="当前组合行业分布" value={v.sectorExposure ?? ''} onChange={u('sectorExposure')}
            placeholder="科技40% 医疗25% 消费15%..." />
          <FM label="退出案例" value={v.exitHistory ?? ''} onChange={u('exitHistory')}
            placeholder="IPO：公司A（2021，5x）；并购：公司B（2022，3.5x）..." />
          <G2>
            <F label="成功退出数量" value={v.successfulExits ?? ''} onChange={u('successfulExits')} />
            <F label="失败/减值投资" value={v.failedInvestments ?? ''} onChange={u('failedInvestments')} />
          </G2>
        </>)}

        {section === 'team' && (<>
          <G2>
            <F label="CEO / Managing Partner" value={v.ceo ?? ''} onChange={u('ceo')} />
            <F label="Managing Partners" value={v.managingPartners ?? ''} onChange={u('managingPartners')} />
            <F label="投资团队规模" value={v.investmentTeamSize ?? ''} onChange={u('investmentTeamSize')}
              placeholder="e.g. 120人" />
          </G2>
          <FM label="行业声誉" value={v.reputation ?? ''} onChange={u('reputation')} />
          <FM label="资源网络评估" value={v.networkStrength ?? ''} onChange={u('networkStrength')}
            placeholder="政府关系、行业专家网络、LP关系..." />
          <FM label="常见联合投资方" value={v.coinvestors ?? ''} onChange={u('coinvestors')}
            placeholder="经常共同投资的机构..." />
        </>)}

        {section === 'market' && (<>
          <FM label="IPO窗口评估" value={v.ipoWindow ?? ''} onChange={u('ipoWindow')}
            placeholder="当前IPO市场活跃度、窗口期预测..." />
          <FM label="并购市场活跃度" value={v.maActivity ?? ''} onChange={u('maActivity')}
            placeholder="战略并购 vs 财务并购，买方情绪..." />
          <FM label="S市场（二级交易）" value={v.secondaryMarket ?? ''} onChange={u('secondaryMarket')}
            placeholder="LP份额转让市场，折价/溢价情况..." />
          <FM label="估值环境" value={v.valuationEnv ?? ''} onChange={u('valuationEnv')}
            placeholder="当前EV/EBITDA倍数、利率对估值影响..." />
          <F label="预计退出时间窗口" value={v.exitTimeline ?? ''} onChange={u('exitTimeline')}
            placeholder="e.g. 2025-2027" />
          <Signal value={v.investmentSignal}
            onChange={sig => onChange({ ...v, investmentSignal: sig })} />
          <FM label="分析笔记" value={v.analystNotes ?? ''} onChange={u('analystNotes')} />
        </>)}

        {section === 'risk' && (<>
          <G2>
            <FM label="集中度风险" value={v.concentrationRisk ?? ''} onChange={u('concentrationRisk')}
              placeholder="组合过于集中某行业/地区..." />
            <FM label="年份风险" value={v.vintageRisk ?? ''} onChange={u('vintageRisk')}
              placeholder="Vintage Year 是否处于高点..." />
            <FM label="流动性风险" value={v.liquidityRisk ?? ''} onChange={u('liquidityRisk')}
              placeholder="封闭期、LP赎回压力..." />
            <FM label="GP风险" value={v.gpRisk ?? ''} onChange={u('gpRisk')}
              placeholder="核心团队稳定性、Key Man条款..." />
            <FM label="监管风险" value={v.regulatoryRisk ?? ''} onChange={u('regulatoryRisk')} />
            <FM label="汇率风险" value={v.currencyRisk ?? ''} onChange={u('currencyRisk')}
              placeholder="跨境基金的汇率敞口..." />
          </G2>
        </>)}
      </div>
    </div>
  );
}

export default function PEForm({ data, onChange }: Props) {
  const [tab, setTab] = useState<'market' | 'firms'>('market');

  const addFirm = () => {
    onChange({ ...data, firms: [...(data.firms ?? []), {}] });
  };

  const updateFirm = (idx: number, firm: PEFundCompany) => {
    const firms = [...(data.firms ?? [])];
    firms[idx] = firm;
    onChange({ ...data, firms });
  };

  const removeFirm = (idx: number) => {
    const firms = [...(data.firms ?? [])];
    firms.splice(idx, 1);
    onChange({ ...data, firms });
  };

  const FM_outer = ({ label, value, onChange: oc, placeholder }: {
    label: string; value: string; onChange: (v: string) => void; placeholder?: string;
  }) => (
    <div className="space-y-1">
      <label className="text-xs font-medium text-slate-500">{label}</label>
      <textarea value={value} onChange={e => oc(e.target.value)} rows={2}
        placeholder={placeholder}
        className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 focus:bg-white transition-all resize-none placeholder:text-slate-300" />
    </div>
  );

  const F_outer = ({ label, value, onChange: oc, placeholder, hint }: {
    label: string; value: string; onChange: (v: string) => void;
    placeholder?: string; hint?: string;
  }) => (
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <label className="text-xs font-medium text-slate-500">{label}</label>
        {hint && <span className="text-[10px] text-slate-300 font-mono">{hint}</span>}
      </div>
      <input type="text" value={value} onChange={e => oc(e.target.value)}
        placeholder={placeholder ?? `输入${label}...`}
        className="w-full text-sm text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 outline-none focus:border-amber-400 focus:bg-white transition-all placeholder:text-slate-300" />
    </div>
  );

  return (
    <div className="flex flex-col h-full">
      <div className="flex gap-1 px-1 py-2 border-b border-slate-100 bg-slate-50/50 shrink-0">
        {([
          { id: 'market', label: '🌐 市场环境' },
          { id: 'firms',  label: '🏦 机构研究' },
        ] as const).map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all
              ${tab === t.id ? 'bg-amber-500 text-white' : 'text-slate-500 hover:bg-slate-100'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {tab === 'market' && (<>
          <SL text="全球私募市场宏观" />
          <G2>
            <F_outer label="全球PE市场规模" value={data.globalPEAum ?? ''} onChange={v => onChange({ ...data, globalPEAum: v })} placeholder="e.g. $12T" />
            <F_outer label="Dry Powder" value={data.dryPowder ?? ''} onChange={v => onChange({ ...data, dryPowder: v })} hint="待部署资金" placeholder="e.g. $3.7T" />
            <F_outer label="平均估值倍数" value={data.valuationMultiple ?? ''} onChange={v => onChange({ ...data, valuationMultiple: v })} hint="EV/EBITDA" placeholder="e.g. 11.5x" />
          </G2>
          <FM_outer label="募资环境" value={data.fundraisingEnv ?? ''} onChange={v => onChange({ ...data, fundraisingEnv: v })}
            placeholder="LP情绪、融资难度、周期位置..." />
          <FM_outer label="Deal Flow活跃度" value={data.dealflow ?? ''} onChange={v => onChange({ ...data, dealflow: v })} />
          <FM_outer label="退出环境" value={data.exitEnv ?? ''} onChange={v => onChange({ ...data, exitEnv: v })}
            placeholder="IPO窗口、并购活跃度、估值环境..." />
          <FM_outer label="利率对PE估值影响" value={data.rateImpact ?? ''} onChange={v => onChange({ ...data, rateImpact: v })}
            placeholder="高利率压缩估值倍数、影响LBO杠杆成本..." />
          <FM_outer label="年份分析（Vintage Analysis）" value={data.vintageAnalysis ?? ''} onChange={v => onChange({ ...data, vintageAnalysis: v })}
            placeholder="哪个Vintage年份最具吸引力..." />
          <FM_outer label="LP情绪与再投资意愿" value={data.lpSentiment ?? ''} onChange={v => onChange({ ...data, lpSentiment: v })} />
          <FM_outer label="GP-LP关系动态" value={data.gpLpDynamics ?? ''} onChange={v => onChange({ ...data, gpLpDynamics: v })}
            placeholder="条款谈判、Preferred Return调整..." />

          <SL text="按策略分类" />
          <FM_outer label="杠杆收购（LBO/Buyout）" value={data.buyout ?? ''} onChange={v => onChange({ ...data, buyout: v })} />
          <FM_outer label="成长型 PE（Growth Equity）" value={data.growthEquity ?? ''} onChange={v => onChange({ ...data, growthEquity: v })} />
          <FM_outer label="风险投资（VC）" value={data.venture ?? ''} onChange={v => onChange({ ...data, venture: v })} />
          <FM_outer label="私募信贷（Credit Funds）" value={data.creditFunds ?? ''} onChange={v => onChange({ ...data, creditFunds: v })} />
          <FM_outer label="基础设施基金" value={data.infrastructure ?? ''} onChange={v => onChange({ ...data, infrastructure: v })} />
          <FM_outer label="实物资产（Real Assets）" value={data.realAssets ?? ''} onChange={v => onChange({ ...data, realAssets: v })} />

          <SL text="按地区分类" />
          <FM_outer label="美国 PE 市场" value={data.usMarket ?? ''} onChange={v => onChange({ ...data, usMarket: v })} />
          <FM_outer label="中国 PE/VC 市场" value={data.chinaMarket ?? ''} onChange={v => onChange({ ...data, chinaMarket: v })} />
          <FM_outer label="欧洲 PE 市场" value={data.europeMarket ?? ''} onChange={v => onChange({ ...data, europeMarket: v })} />
          <FM_outer label="亚太（除中国）" value={data.asiaExChina ?? ''} onChange={v => onChange({ ...data, asiaExChina: v })} />
          <FM_outer label="新兴市场" value={data.emergingMarkets ?? ''} onChange={v => onChange({ ...data, emergingMarkets: v })} />

          <div className="space-y-1">
            <label className="text-xs font-medium text-slate-500">综合投资信号</label>
            <div className="flex gap-2 flex-wrap">
              {SIGNAL_OPTIONS.map(o => (
                <button key={o.value} type="button"
                  onClick={() => onChange({ ...data, investmentSignal: o.value })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                    ${data.investmentSignal === o.value ? o.color : 'bg-white border-slate-200 text-slate-400'}`}>
                  {o.label}
                </button>
              ))}
            </div>
          </div>
          <FM_outer label="整体展望" value={data.overallOutlook ?? ''} onChange={v => onChange({ ...data, overallOutlook: v })} />
          <FM_outer label="分析师笔记" value={data.analystNotes ?? ''} onChange={v => onChange({ ...data, analystNotes: v })} />
        </>)}

        {tab === 'firms' && (
          <div className="space-y-5">
            {(data.firms ?? []).map((firm, idx) => (
              <FirmForm key={idx} index={idx} value={firm}
                onChange={f => updateFirm(idx, f)}
                onRemove={() => removeFirm(idx)} />
            ))}
            <button onClick={addFirm}
              className="w-full py-4 border border-dashed border-amber-300 rounded-2xl text-xs font-medium text-amber-600 hover:bg-amber-50 transition-all">
              + 添加机构
            </button>
          </div>
        )}

      </div>
    </div>
  );
}