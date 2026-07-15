"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import TopBar from './TopBar';
import AddPanel from './AddPanel';
import { EnterpriseData } from '../types/enterprise';
import { IndustryData } from '../types/industry';
import { AssetData } from '../types/asset';
import { useResearchStore, ResearchRecord, ResearchData } from '../store/researchStore';
import {
  Building2, Factory, Landmark, ArrowRight,
  Trash2, Clock, FolderOpen, ChevronLeft,
} from 'lucide-react';
import { isEnterpriseData, isIndustryData, isAssetData, isEconomistData, isRegionData } from '../lib/dataGuards';



interface ResearchViewProps {
  category: string;
  categoryLabel: string;
  subItem?: string;
}

const categoryDescriptions: Record<string, string> = {
  enterprise: '覆盖著名企业与创业公司（Startup），聚焦基本面分析与企业估值方法论。',
  industry:   '按细分产业追踪景气度、竞争格局与代表性公司。',
  asset:      '横跨多类金融标的资产的收益特征、风险溢价与配置逻辑。',
  region:     '按地区研究宏观环境、政策周期与资产表现。',
  strategy:   '梳理知名经济学家与投资大师的分析框架与实战策略。',
  behavioral: '从行为经济学视角解读市场非理性与认知偏差对定价的影响。',
  monetary:   '追踪主要央行货币政策路径、利率决议与通胀数据。',
};

const CATEGORIES_WITH_SUBS: Record<string, string[]> = {
  enterprise: ['知名企业', 'Startup 创新企业'],
  industry:   ['科技', '金融', '医疗', '消费', '能源', '房地产', '教育', '文化产业', '农业', '制造业'],
  asset:      ['存款', '股票', '指数', '债券', '大宗商品', '房地产', '加密货币', '外汇', '私募', '公募', '期货', '期权', '保险'],
  region:     ['美国', '欧洲', '东南亚', '中国', '日本', '韩国', '中国台湾', '中国香港', '南美', '中东'],
};

function getRecordTitle(record: ResearchRecord): string {
  if (isAssetData(record.data)) {
    const d = record.data;
    if (d.title && d.title.trim()) return d.title;
    const dateStr = new Date(record.createdAt).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' });
    return `${record.subItem ?? '资产'} · ${dateStr}`;
  }

  // 地区
  if (isRegionData(record.data)) {
    return record.data.title?.trim()
      || record.subItem
      || '未命名地区';
  }

  // 经济学家策略
  if (isEconomistData(record.data)) {
    return record.data.basicInfo.name?.trim()
      || record.title
      || '未命名经济学家';
  }

  return record.title || '未命名记录';
}

function getRecordSummary(record: ResearchRecord): string[] {
  const snippets: string[] = [];

  if (isEnterpriseData(record.data)) {
    const d = record.data;
    if (d.basicInfo.companyType)            snippets.push(d.basicInfo.companyType);
    if (d.basicInfo.headquarters)           snippets.push(`📍 ${d.basicInfo.headquarters}`);
    if (d.basicInfo.isPublic !== undefined) snippets.push(d.basicInfo.isPublic ? '上市公司' : '非上市');
    if (d.financialAnalysis.arr)            snippets.push(`ARR ${d.financialAnalysis.arr}`);
    if (d.financialAnalysis.revenue)        snippets.push(`Revenue ${d.financialAnalysis.revenue}`);
    if (d.fundingAnalysis.valuation)        snippets.push(`估值 ${d.fundingAnalysis.valuation}`);
  } else if (isIndustryData(record.data)) {
    const d = record.data;
    if (d.basicInfo.tier1)                  snippets.push(d.basicInfo.tier1);
    if (d.basicInfo.tier2)                  snippets.push(d.basicInfo.tier2);
    if (d.marketScale.globalMarketSize)     snippets.push(`市场 ${d.marketScale.globalMarketSize}`);
    if (d.marketScale.globalCAGR)           snippets.push(`CAGR ${d.marketScale.globalCAGR}`);
  } else if (isAssetData(record.data)) {
    const d = record.data;
    const SUBTYPE_LABEL: Record<string, string> = {
      crypto: '加密货币', index: '指数', bond: '债券',
      commodity: '大宗商品', fx: '外汇', realestate: '房地产',
      stock: '股票', deposit: '存款', pe: '私募', fund: '公募',
      futures: '期货', options: '期权', insurance: '保险',
    };
    snippets.push(SUBTYPE_LABEL[d.assetSubType] ?? d.assetSubType);
    if (d.snapshotDate) snippets.push(`截止 ${d.snapshotDate}`);
    if (d.commodity?.gold?.price)                  snippets.push(`黄金 ${d.commodity.gold.price}`);
    if (d.stock?.usStock?.macro?.indexPerformance) snippets.push(d.stock.usStock.macro.indexPerformance);
    if (d.deposit?.us?.fixed1y)                    snippets.push(`美国1Y ${d.deposit.us.fixed1y}`);
    if (d.fx?.macro?.dxy)                          snippets.push(`DXY ${d.fx.macro.dxy}`);
    if (d.bond?.usT10y?.yield)                     snippets.push(`10Y ${d.bond.usT10y.yield}`);
    if (d.crypto?.totalMarketCap)                  snippets.push(`总市值 ${d.crypto.totalMarketCap}`);
    if (d.index?.us?.sp500?.quote?.price)          snippets.push(`SPX ${d.index.us.sp500.quote.price}`);
    if (d.realestate?.macro?.usMortgage30y)        snippets.push(`美30Y房贷 ${d.realestate.macro.usMortgage30y}`);
    if (d.pe?.globalPEAum)                         snippets.push(`PE规模 ${d.pe.globalPEAum}`);
  }

  return snippets.filter(Boolean).slice(0, 4) as string[];
}

function getCategoryIcon(category: string) {
  if (category === 'industry') return <Factory size={17} className="text-blue-500" />;
  if (category === 'asset')    return <Landmark size={17} className="text-emerald-500" />;
  return <Building2 size={17} className="text-amber-500" />;
}

function getCategoryIconBg(category: string) {
  if (category === 'industry') return 'bg-blue-50';
  if (category === 'asset')    return 'bg-emerald-50';
  return 'bg-amber-50';
}

function RecordCard({
  record, category, onDelete, onClick,
}: {
  record: ResearchRecord;
  category: string;
  onDelete: () => void;
  onClick: () => void;
}) {
  const title = getRecordTitle(record);
  const summary = getRecordSummary(record);

  return (
    <div
      className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-amber-200 transition-all cursor-pointer relative"
      onClick={onClick}
    >
      <button
        onClick={e => { e.stopPropagation(); onDelete(); }}
        className="absolute top-3 right-3 p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
      >
        <Trash2 size={13} />
      </button>

      <div className="flex items-start gap-3 mb-3">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${getCategoryIconBg(category)}`}>
          {getCategoryIcon(category)}
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-800 truncate pr-6">{title}</h3>
          {record.subItem && (
            <span className="text-xs text-slate-400">{record.subItem}</span>
          )}
        </div>
      </div>

      {summary.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {summary.map((s, i) => (
            <span key={i} className="text-xs bg-slate-50 text-slate-500 px-2 py-0.5 rounded-full border border-slate-100">
              {s}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1 text-[11px] text-slate-300">
          <Clock size={11} />
          {new Date(record.createdAt).toLocaleDateString('zh-CN')}
        </div>
        <ArrowRight size={14} className="text-slate-300 group-hover:text-amber-500 transition-colors" />
      </div>
    </div>
  );
}

export default function ResearchView({ category, categoryLabel, subItem }: ResearchViewProps) {
  const router = useRouter();
  const { records, addRecord, deleteRecord } = useResearchStore();
  const [panelOpen, setPanelOpen] = useState(false);

  const hasSubs = Boolean(CATEGORIES_WITH_SUBS[category]);

  const filtered = records.filter(r => {
    if (r.category !== category) return false;
    if (subItem) return r.subItem === subItem;
    if (hasSubs) return false;
    return true;
  });

  const subCounts = hasSubs && !subItem
    ? CATEGORIES_WITH_SUBS[category].reduce<Record<string, number>>((acc, sub) => {
        acc[sub] = records.filter(r => r.category === category && r.subItem === sub).length;
        return acc;
      }, {})
    : null;

  const handleSubmit = (data: ResearchData, resolvedSubItem?: string) => {
    let title = '未命名记录';
    if (isEnterpriseData(data))       title = data.basicInfo.companyName  || '未命名企业';
    else if (isIndustryData(data))    title = data.basicInfo.industryName || '未命名产业';
    else if (isAssetData(data)) {
      const dateStr = new Date().toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' });
      title = (data.title && data.title.trim())
        ? data.title
        : `${resolvedSubItem ?? subItem ?? '资产'} · ${dateStr}`;
    }
    else if (isRegionData(data)) {
    title = data.title?.trim()
        ? data.title
        : resolvedSubItem ?? subItem ?? "地区";
   }
   else if (isEconomistData(data)) {
    title =
      data.basicInfo.name?.trim()
      || resolvedSubItem
      || subItem
      || "未命名经济学家";
}  // 使经济学策略的前端标题显示为经济学家姓名，不同类型的数据，不能强行统一成一个title字段，行业、企业、经济学家等核心字段不一样，不能一概而论。

    const newRecord: ResearchRecord = {
      id: Date.now().toString(),
      category,
      subItem: resolvedSubItem ?? subItem,
      title,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      data,
    };
    addRecord(newRecord);
    setPanelOpen(false);
    router.push(`/research/${newRecord.id}`);
  };

  // 点击子分类卡片 → 进入该子分类
  const handleSubCardClick = (sub: string) => {
    window.dispatchEvent(new CustomEvent('nav-select', {
      detail: { category, subItem: sub },
    }));
  };

  // 返回父级 → subItem 传空字符串（SidebarNav 里需要能处理这个信号，回到父级列表）
  const handleBackToParent = () => {
    window.dispatchEvent(new CustomEvent('nav-select', {
      detail: { category, subItem: '' },
    }));
  };

  return (
    <div className="space-y-6">
      {/* 页头 */}
      <div className="flex items-start justify-between border-b border-slate-200 pb-5">
        <div className="flex items-start gap-3">
          {/* 返回上级按钮：只在子页面（有 subItem）时显示 */}
          {subItem && (
            <button
              onClick={handleBackToParent}
              className="mt-1 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all shrink-0"
              title={`返回 ${categoryLabel}`}
            >
              <ChevronLeft size={18} />
            </button>
          )}
          <div>
            <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2 flex-wrap">
              <span
                className={subItem ? 'cursor-pointer hover:text-amber-600 transition-colors' : ''}
                onClick={subItem ? handleBackToParent : undefined}
              >
                {categoryLabel}
              </span>
              {subItem && (
                <>
                  <span>/</span>
                  <span className="text-amber-600 font-medium">{subItem}</span>
                </>
              )}
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              {subItem ?? categoryLabel}
            </h2>
            <p className="text-sm text-slate-400 mt-1">{categoryDescriptions[category]}</p>
          </div>
        </div>

        {(subItem || !hasSubs || category === 'asset') && (
          <TopBar onAddClick={() => setPanelOpen(true)} />
        )}
      </div>

      {/* 父级页面：子分类汇总卡片（非 asset 类） */}
      {hasSubs && !subItem && subCounts && category !== 'asset' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {CATEGORIES_WITH_SUBS[category].map(sub => (
            <div
              key={sub}
              className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-amber-200 transition-all cursor-pointer"
              onClick={() => handleSubCardClick(sub)}
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${getCategoryIconBg(category)}`}>
                  <FolderOpen size={17} className={
                    category === 'industry' ? 'text-blue-500' : 'text-amber-500'
                  } />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-slate-800">{sub}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {subCounts[sub] > 0 ? `${subCounts[sub]} 条记录` : '暂无记录'}
                  </p>
                </div>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-amber-500 transition-colors shrink-0" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* asset 父级：所有子类入口卡片 */}
      {category === 'asset' && !subItem && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {CATEGORIES_WITH_SUBS['asset'].map(sub => {
            const count = records.filter(r => r.category === 'asset' && r.subItem === sub).length;
            const latestRecord = records
              .filter(r => r.category === 'asset' && r.subItem === sub)
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0];

            return (
              <div
                key={sub}
                className="group bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer"
                onClick={() => handleSubCardClick(sub)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <Landmark size={17} className="text-emerald-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-slate-800">{sub}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {count > 0 ? `${count} 条研究记录` : '暂无记录，点击添加'}
                    </p>
                    {latestRecord && (
                      <p className="text-[11px] text-slate-300 mt-1 truncate">
                        最近：{getRecordTitle(latestRecord)}
                      </p>
                    )}
                  </div>
                  <ArrowRight size={14} className="text-slate-300 group-hover:text-emerald-500 transition-colors shrink-0 mt-1" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 子页面 或 无子分类的父级：记录列表 */}
      {(subItem || (!hasSubs && category !== 'asset')) && (
        filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filtered.map(record => (
              <RecordCard
                key={record.id}
                record={record}
                category={category}
                onDelete={() => deleteRecord(record.id)}
                onClick={() => router.push(`/research/${record.id}`)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white border border-dashed border-slate-200 rounded-2xl p-12 text-center">
            <p className="text-sm text-slate-400 mb-1">「{subItem ?? categoryLabel}」暂无记录</p>
            <p className="text-xs text-slate-300">点击右上角「添加」开始第一条研究记录</p>
          </div>
        )
      )}

      <AddPanel
        open={panelOpen}
        onClose={() => setPanelOpen(false)}
        category={category}
        subItem={subItem}
        categoryLabel={categoryLabel}
        onSubmit={handleSubmit}
      />
    </div>
  );
}