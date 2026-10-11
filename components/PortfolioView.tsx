"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpenCheck,
  ChevronLeft,
  CircleDollarSign,
  LineChart,
  Pencil,
  PieChart,
  PlusCircle,
  Target,
  Trash2,
  TrendingUp,
  X,
} from 'lucide-react';
import TopBar from './TopBar';
import AddPanel from './AddPanel';
import type { Portfolio, CreatePortfolioInput } from '../types/portfolio';
import { useResearchRecords, type ResearchData, type ResearchRecord } from '../store/researchStore';
import type { FinLabExperiment, FinLabStatus } from '../types/finLab';

function PortfolioCard({
  portfolio, onClick, onEdit, onDelete,
}: {
  portfolio: Portfolio;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const positioningLabel: Record<string, string> = {
    defensive: '防守', offensive: '进攻',
    macro_hedge: '宏观对冲', sector_rotation: '行业轮动',
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-amber-200 transition-all cursor-pointer relative"
    >
      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
        <button
          onClick={e => { e.stopPropagation(); onEdit(); }}
          className="p-1.5 text-slate-300 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
        >
          <Pencil size={13} />
        </button>
        <button
          onClick={e => { e.stopPropagation(); onDelete(); }}
          className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg"
        >
          <Trash2 size={13} />
        </button>
      </div>

      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
          <PieChart size={17} className="text-amber-500" />
        </div>
        <div className="min-w-0 flex-1 pr-12">
          <h3 className="text-sm font-semibold text-slate-800 truncate">{portfolio.name}</h3>
          <span className="text-xs text-slate-400">
            {positioningLabel[portfolio.positioning] ?? portfolio.positioning}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between text-xs text-slate-400 mt-3">
        <span>本金 {portfolio.currency} {portfolio.initial_capital.toLocaleString()}</span>
        <span>{new Date(portfolio.created_at).toLocaleDateString('zh-CN')}</span>
      </div>
    </div>
  );
}

function LabBackHeader({
  title,
  description,
  onBack,
  action,
}: {
  title: string;
  description: string;
  onBack: () => void;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-5">
      <div className="flex items-start gap-3">
        <button
          onClick={onBack}
          className="mt-1 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all shrink-0"
          title="返回投资组合决策"
        >
          <ChevronLeft size={18} />
        </button>
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
            <button onClick={onBack} className="hover:text-amber-600 transition-colors">投资组合决策</button>
            <span>/</span>
            <span className="text-amber-600 font-medium">{title}</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
          <p className="text-sm text-slate-400 mt-1">{description}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

function SimulationExperiment({
  portfolios,
  isLoading,
  onCreate,
  onEdit,
  onDelete,
  onBack,
}: {
  portfolios: Portfolio[];
  isLoading: boolean;
  onCreate: () => void;
  onEdit: (portfolio: Portfolio) => void;
  onDelete: (id: string) => void;
  onBack: () => void;
}) {
  const router = useRouter();

  const totalCapital = portfolios.reduce((sum, p) => sum + p.initial_capital, 0);

  if (isLoading) {
    return <div className="flex items-center justify-center h-96"><p className="text-sm text-slate-400">加载中...</p></div>;
  }

  return (
    <div className="space-y-6">
      <LabBackHeader
        title="投资组合决策"
        description="用模拟本金建立投资决策肌肉：先定义约束，再下注，再用复盘修正系统。"
        onBack={onBack}
        action={<TopBar onAddClick={onCreate} />}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <LabMetric icon={PieChart} label="模拟组合数" value={String(portfolios.length)} />
        <LabMetric icon={CircleDollarSign} label="已配置模拟本金" value={totalCapital.toLocaleString()} />
        <LabMetric icon={Target} label="核心训练目标" value="纪律 + 复盘" />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-slate-800 mb-4">实验流程</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {['设定本金与约束', '写下入场假设', '记录调仓行为', '复盘盈亏归因'].map((step, index) => (
            <div key={step} className="border border-slate-100 rounded-xl p-4 bg-slate-50/50">
              <p className="text-xs text-amber-600 font-semibold">STEP {index + 1}</p>
              <p className="text-sm text-slate-700 font-medium mt-1">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {portfolios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {portfolios.map(p => (
            <PortfolioCard
              key={p.id}
              portfolio={p}
              onClick={() => router.push(`/portfolio/${p.id}`)}
              onEdit={() => onEdit(p)}
              onDelete={() => onDelete(p.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center">
          <p className="text-sm text-slate-400 mb-1">还没有模拟金组合</p>
          <p className="text-xs text-slate-300">点击右上角「添加」新建第一个模拟组合</p>
        </div>
      )}
    </div>
  );
}

function LabMetric({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center">
          <Icon size={17} className="text-slate-500" />
        </div>
        <div>
          <p className="text-xs text-slate-400">{label}</p>
          <p className="text-lg font-bold text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  );
}

const STATUS_LABEL: Record<FinLabStatus, string> = {
  idea: '想法池',
  testing: '实验中',
  profitable: '已赚钱',
  paused: '暂停',
  failed: '未跑通',
};

const FIN_LAB_STARTER: FinLabExperiment = {
  caseName: '网球技能变现：教练 / 教学 / 陪练',
  status: 'profitable',
  experimentDate: new Date().toISOString().slice(0, 10),
  monetizationMode: '按小时收费的技能服务',
  skillAsset: '网球技能 + 教学表达 + 陪练交付能力',
  customerSegment: '想提升网球水平、需要陪练或入门教学的个人客户',
  pricePerUnit: 150,
  unit: '小时',
  acquisitionChannel: '熟人介绍、球场社群、本地运动圈',
  economicPrinciple: '把稀缺技能服务化，用清晰定价降低交易成本，用稳定交付提高复购率。',
  financeModel: '轻资产现金流模型：几乎不需要固定资产投入，主要成本是时间和获客。',
  hypothesis: '如果能稳定获取本地网球学习者，并保持每小时 150 元定价，就能形成可复购的技能现金流。',
  evidence: '已经出现每小时 150 元的真实成交。',
  keyMetrics: '课时数、复购率、获客来源、每小时净收入、客户满意度。',
  risks: '时间不可无限扩张、受天气/场地影响、客户来源不稳定。',
  nextExperiment: '记录每周获客渠道、复购率和满意度，测试 5 次课套餐与更高客单价。',
};

function formatMoney(value?: number) {
  if (value === undefined || Number.isNaN(value)) return '—';
  return `¥${value.toLocaleString()}`;
}

function getFinLabTitle(data: FinLabExperiment) {
  return data.caseName.trim() || '未命名赚钱实验';
}

function FinLab({ onBack }: { onBack: () => void }) {
  const { records, addRecord, updateRecord, deleteRecord, isLoading } = useResearchRecords('fin_lab');
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<ResearchRecord | null>(null);

  const experiments = records.map(record => ({
    record,
    data: record.data as FinLabExperiment,
  }));

  const profitable = experiments.filter(item => item.data.status === 'profitable');
  const bestHourlyPrice = experiments.reduce((max, item) => {
    if ((item.data.unit ?? '').includes('小时')) return Math.max(max, item.data.pricePerUnit ?? 0);
    return max;
  }, 0);

  const handleCreateFromStarter = () => {
    setEditingRecord({
      id: '',
      category: 'fin_lab',
      title: getFinLabTitle(FIN_LAB_STARTER),
      data: FIN_LAB_STARTER,
      createdAt: '',
      updatedAt: '',
    });
    setPanelOpen(true);
  };

  const handleSubmit = async (data: FinLabExperiment) => {
    const title = getFinLabTitle(data);
    if (editingRecord?.id) {
      await updateRecord(editingRecord.id, { title, data: data as ResearchData });
    } else {
      await addRecord({
        category: 'fin_lab',
        title,
        data: data as ResearchData,
      });
    }
    setPanelOpen(false);
    setEditingRecord(null);
  };

  return (
    <div className="space-y-6">
      <LabBackHeader
        title="Fin-lab 赚钱研究"
        description="通过现实实战研究如何应用经济学、金融学和个人技能，精通赚钱并沉淀可复利的资本系统。"
        onBack={onBack}
        action={
          <button
            onClick={() => { setEditingRecord(null); setPanelOpen(true); }}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shadow-amber-200"
          >
            <PlusCircle size={16} />
            添加实验
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <LabMetric icon={BookOpenCheck} label="已记录实验" value={String(records.length)} />
        <LabMetric icon={TrendingUp} label="已赚钱案例" value={String(profitable.length)} />
        <LabMetric icon={LineChart} label="研究主线" value="技能现金流" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-4">
          {isLoading ? (
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center">
              <p className="text-sm text-slate-400">加载 Fin-lab 记录中...</p>
            </div>
          ) : experiments.length > 0 ? (
            experiments.map(({ record, data }) => (
              <div key={record.id} className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all relative">
                <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                  <button
                    onClick={() => { setEditingRecord(record); setPanelOpen(true); }}
                    className="p-1.5 text-slate-300 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm('确定删除这个赚钱实验吗？')) deleteRecord(record.id);
                    }}
                    className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                <div className="flex items-start justify-between gap-3 pr-14">
                  <div>
                    <span className={`inline-flex text-xs px-2 py-0.5 rounded-full font-medium ${
                      data.status === 'profitable' ? 'bg-emerald-50 text-emerald-700' :
                      data.status === 'testing' ? 'bg-amber-50 text-amber-700' :
                      data.status === 'failed' ? 'bg-rose-50 text-rose-600' :
                      'bg-slate-100 text-slate-500'
                    }`}>
                      {STATUS_LABEL[data.status] ?? data.status}
                    </span>
                    <h3 className="text-base font-semibold text-slate-900 mt-3">{getFinLabTitle(data)}</h3>
                    {data.monetizationMode && (
                      <p className="text-sm text-slate-400 mt-1">{data.monetizationMode}</p>
                    )}
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-slate-400">单价</p>
                    <p className="text-lg font-bold text-emerald-600">
                      {data.pricePerUnit ? `${formatMoney(data.pricePerUnit)} / ${data.unit || '次'}` : '—'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-5">
                  <InfoBlock label="投入资本" value={data.skillAsset || '—'} />
                  <InfoBlock label="经济学模型" value={data.economicPrinciple || '—'} />
                  <InfoBlock label="下一步实验" value={data.nextExperiment || '—'} />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                  <MiniStat label="月收入" value={formatMoney(data.monthlyRevenue)} />
                  <MiniStat label="时间投入" value={data.timeInvestmentHours ? `${data.timeInvestmentHours}h` : '—'} />
                  <MiniStat label="获客渠道" value={data.acquisitionChannel || '—'} />
                  <MiniStat label="更新日期" value={new Date(record.updatedAt).toLocaleDateString('zh-CN')} />
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center">
              <p className="text-sm text-slate-400 mb-1">还没有 Fin-lab 实验记录</p>
              <p className="text-xs text-slate-300 mb-4">可以从你的网球教练成功案例开始，沉淀第一条真实现金流样本</p>
              <button
                onClick={handleCreateFromStarter}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-semibold rounded-xl transition-all"
              >
                用网球案例创建第一条
              </button>
            </div>
          )}
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 h-fit space-y-5">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">赚钱实验模型</h3>
            <p className="text-xs text-slate-400 mt-1">每条记录都按“资产-市场-定价-现金流-复盘”建模。</p>
          </div>
          <div className="mt-4 space-y-3">
            {['赚钱假设', '目标客户', '技能/资本资产', '定价方式', '获客渠道', '现金流结构', '关键指标', '下一步实验'].map(field => (
              <div key={field} className="flex items-center gap-2 text-sm text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                {field}
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 pt-4">
            <p className="text-xs text-slate-400">当前最高小时单价</p>
            <p className="text-xl font-bold text-slate-900">{bestHourlyPrice > 0 ? `${formatMoney(bestHourlyPrice)} / 小时` : '—'}</p>
          </div>
        </div>
      </div>

      {panelOpen && (
        <FinLabPanel
          initialData={editingRecord?.data as FinLabExperiment | undefined}
          onClose={() => { setPanelOpen(false); setEditingRecord(null); }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl px-3 py-2">
      <p className="text-[11px] text-slate-400">{label}</p>
      <p className="text-xs font-medium text-slate-700 truncate mt-0.5">{value}</p>
    </div>
  );
}

function FinLabPanel({
  initialData,
  onClose,
  onSubmit,
}: {
  initialData?: FinLabExperiment;
  onClose: () => void;
  onSubmit: (data: FinLabExperiment) => Promise<void>;
}) {
  const [form, setForm] = useState<FinLabExperiment>(initialData ?? {
    caseName: '',
    status: 'testing',
    experimentDate: new Date().toISOString().slice(0, 10),
    unit: '小时',
  });
  const [submitting, setSubmitting] = useState(false);

  const setField = <K extends keyof FinLabExperiment>(key: K, value: FinLabExperiment[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const setNumberField = (key: keyof FinLabExperiment, value: string) => {
    setForm(prev => ({ ...prev, [key]: value === '' ? undefined : Number(value) }));
  };

  const canSubmit = form.caseName.trim().length > 0;

  const handleSubmit = async () => {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    await onSubmit({
      ...form,
      caseName: form.caseName.trim(),
    });
    setSubmitting(false);
  };

  return (
    <>
      <div className="fixed inset-0 bg-black/10 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 z-50 w-[620px] h-screen bg-white border-l border-slate-200 shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-base font-semibold text-slate-900">{initialData ? '编辑赚钱实验' : '添加赚钱实验'}</h2>
            <p className="text-xs text-slate-400 mt-0.5">用经济学和金融学框架记录现实现金流实验</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          <Field label="实验名称 *">
            <input className={inputClass} value={form.caseName} onChange={e => setField('caseName', e.target.value)} placeholder="例如：网球技能教练/陪练" />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="状态">
              <select className={inputClass} value={form.status} onChange={e => setField('status', e.target.value as FinLabStatus)}>
                {Object.entries(STATUS_LABEL).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
              </select>
            </Field>
            <Field label="实验日期">
              <input className={inputClass} type="date" value={form.experimentDate ?? ''} onChange={e => setField('experimentDate', e.target.value)} />
            </Field>
          </div>

          <Field label="变现方式">
            <input className={inputClass} value={form.monetizationMode ?? ''} onChange={e => setField('monetizationMode', e.target.value)} placeholder="按小时收费 / 订阅 / 项目制 / 分成..." />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="单价">
              <input className={inputClass} type="number" value={form.pricePerUnit ?? ''} onChange={e => setNumberField('pricePerUnit', e.target.value)} placeholder="150" />
            </Field>
            <Field label="计价单位">
              <input className={inputClass} value={form.unit ?? ''} onChange={e => setField('unit', e.target.value)} placeholder="小时 / 次 / 月 / 项目" />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Field label="月收入">
              <input className={inputClass} type="number" value={form.monthlyRevenue ?? ''} onChange={e => setNumberField('monthlyRevenue', e.target.value)} />
            </Field>
            <Field label="时间投入（小时）">
              <input className={inputClass} type="number" value={form.timeInvestmentHours ?? ''} onChange={e => setNumberField('timeInvestmentHours', e.target.value)} />
            </Field>
            <Field label="变动成本">
              <input className={inputClass} type="number" value={form.variableCost ?? ''} onChange={e => setNumberField('variableCost', e.target.value)} />
            </Field>
            <Field label="固定成本">
              <input className={inputClass} type="number" value={form.fixedCost ?? ''} onChange={e => setNumberField('fixedCost', e.target.value)} />
            </Field>
          </div>

          <Field label="技能/资本资产">
            <textarea className={inputClass} rows={2} value={form.skillAsset ?? ''} onChange={e => setField('skillAsset', e.target.value)} placeholder="你投入的技能、时间、工具、资金、信用、网络..." />
          </Field>

          <Field label="目标客户">
            <textarea className={inputClass} rows={2} value={form.customerSegment ?? ''} onChange={e => setField('customerSegment', e.target.value)} placeholder="谁愿意付钱，为什么现在愿意付钱..." />
          </Field>

          <Field label="获客渠道">
            <input className={inputClass} value={form.acquisitionChannel ?? ''} onChange={e => setField('acquisitionChannel', e.target.value)} placeholder="熟人介绍、社群、内容平台、线下场景..." />
          </Field>

          <Field label="经济学模型">
            <textarea className={inputClass} rows={3} value={form.economicPrinciple ?? ''} onChange={e => setField('economicPrinciple', e.target.value)} placeholder="稀缺性、交易成本、信息不对称、定价权、需求弹性、规模经济..." />
          </Field>

          <Field label="金融学模型">
            <textarea className={inputClass} rows={3} value={form.financeModel ?? ''} onChange={e => setField('financeModel', e.target.value)} placeholder="现金流、ROI、回本周期、杠杆、风险收益比、可复利性..." />
          </Field>

          <Field label="赚钱假设">
            <textarea className={inputClass} rows={3} value={form.hypothesis ?? ''} onChange={e => setField('hypothesis', e.target.value)} />
          </Field>

          <Field label="实战证据">
            <textarea className={inputClass} rows={3} value={form.evidence ?? ''} onChange={e => setField('evidence', e.target.value)} placeholder="真实成交、客户反馈、询盘、复购、失败证据..." />
          </Field>

          <Field label="关键指标">
            <textarea className={inputClass} rows={2} value={form.keyMetrics ?? ''} onChange={e => setField('keyMetrics', e.target.value)} placeholder="转化率、复购率、客单价、毛利率、小时净收入..." />
          </Field>

          <Field label="风险">
            <textarea className={inputClass} rows={2} value={form.risks ?? ''} onChange={e => setField('risks', e.target.value)} />
          </Field>

          <Field label="下一步实验">
            <textarea className={inputClass} rows={3} value={form.nextExperiment ?? ''} onChange={e => setField('nextExperiment', e.target.value)} />
          </Field>

          <Field label="复盘笔记">
            <textarea className={inputClass} rows={3} value={form.notes ?? ''} onChange={e => setField('notes', e.target.value)} />
          </Field>
        </div>

        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 shrink-0">
          <button onClick={onClose} className="px-4 py-2 text-sm text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all">
            取消
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit || submitting}
            className="px-5 py-2 text-sm font-medium bg-amber-500 text-white rounded-xl hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {submitting ? '保存中...' : '保存实验'}
          </button>
        </div>
      </div>
    </>
  );
}

const inputClass =
  'w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-800 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-all';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-slate-500 mb-1 block">{label}</label>
      {children}
    </div>
  );
}

function InfoBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-slate-50 border border-slate-100 rounded-xl p-4">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-sm text-slate-700 leading-6">{value}</p>
    </div>
  );
}

export default function PortfolioView({ subItem }: { subItem?: string }) {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<Portfolio | null>(null);

  const fetchPortfolios = useCallback(async () => {
    setIsLoading(true);
    const res = await fetch('/api/portfolios');
    const json = await res.json();
    setPortfolios(json.portfolios ?? []);
    setIsLoading(false);
  }, []);

  useEffect(() => { fetchPortfolios(); }, [fetchPortfolios]);

  const handleSubmit = async (data: CreatePortfolioInput) => {
    const isEditing = Boolean(editingPortfolio);
    const url = isEditing ? `/api/portfolios/${editingPortfolio!.id}` : '/api/portfolios';
    const method = isEditing ? 'PATCH' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      alert(`${isEditing ? '编辑' : '创建'}失败：${err.error ?? '未知错误'}`);
      return;
    }
    setPanelOpen(false);
    setEditingPortfolio(null);
    await fetchPortfolios();
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定删除这个组合吗？这会同时删除其下所有持仓和调仓记录，且不可恢复。')) return;
    const res = await fetch(`/api/portfolios/${id}`, { method: 'DELETE' });
    if (!res.ok) {
      alert('删除失败');
      return;
    }
    await fetchPortfolios();
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-96"><p className="text-sm text-slate-400">加载中...</p></div>;
  }

  const handleBackToPortfolioHome = () => {
    window.dispatchEvent(new CustomEvent('nav-select', {
      detail: { category: 'portfolio', subItem: '' },
    }));
  };

  if (subItem === 'Fin-lab 赚钱研究') {
    return <FinLab onBack={handleBackToPortfolioHome} />;
  }

  if (!subItem) {
    return (
      <>
        <SimulationExperiment
          portfolios={portfolios}
          isLoading={isLoading}
          onCreate={() => { setEditingPortfolio(null); setPanelOpen(true); }}
          onEdit={(portfolio) => { setEditingPortfolio(portfolio); setPanelOpen(true); }}
          onDelete={handleDelete}
          onBack={handleBackToPortfolioHome}
        />

        <AddPanel
          open={panelOpen}
          onClose={() => { setPanelOpen(false); setEditingPortfolio(null); }}
          category="portfolio"
          categoryLabel="投资组合决策"
          editingData={editingPortfolio as unknown as ResearchData}
          onSubmit={(data) => handleSubmit(data as unknown as CreatePortfolioInput)}
        />
      </>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">投资组合决策</h2>
          <p className="text-sm text-slate-400 mt-1">模拟资金投资训练系统，长期练习投资纪律与复盘能力</p>
        </div>
        <TopBar onAddClick={() => { setEditingPortfolio(null); setPanelOpen(true); }} />
      </div>

      {portfolios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {portfolios.map(p => (
            <PortfolioCard
              key={p.id}
              portfolio={p}
              onClick={() => router.push(`/portfolio/${p.id}`)}
              onEdit={() => { setEditingPortfolio(p); setPanelOpen(true); }}
              onDelete={() => handleDelete(p.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center">
          <p className="text-sm text-slate-400 mb-1">还没有投资组合</p>
          <p className="text-xs text-slate-300">点击右上角「添加」新建第一个模拟组合</p>
        </div>
      )}

      <AddPanel
        open={panelOpen}
        onClose={() => { setPanelOpen(false); setEditingPortfolio(null); }}
        category="portfolio"
        categoryLabel="投资组合决策"
        editingData={editingPortfolio as unknown as ResearchData}
        onSubmit={(data) => handleSubmit(data as unknown as CreatePortfolioInput)}
      />
    </div>
  );
}
