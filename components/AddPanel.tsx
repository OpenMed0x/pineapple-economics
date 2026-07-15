"use client";

import React, { useEffect, useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { EnterpriseData } from '../types/enterprise';
import { IndustryData } from '../types/industry';
import { EconomistData } from '../types/economist';
import { RegionData, RegionId } from '../types/region';
import { ResearchData } from '../store/researchStore';
import EnterpriseForm from './enterprise/EnterpriseForm';
import IndustryForm from './industry/IndustryForm';
import EconomistForm from './economist/EconomistForm';
import RegionForm from './region/RegionForm';
import AssetForm from './asset/AssetForm';
import { AssetData } from '../types/asset';




interface AddPanelProps {
  open: boolean;
  onClose: () => void;
  category: string;
  subItem?: string;
  categoryLabel: string;
  editingData?: ResearchData;
  onSubmit: (data: ResearchData, resolvedSubItem?: string) => void;
}

const SUB_OPTIONS: Record<string, { value: string; label: string; desc: string }[]> = {
  enterprise: [
    { value: '知名企业',         label: '知名企业',         desc: '上市公司、大型跨国企业、行业龙头' },
    { value: 'Startup 创新企业', label: 'Startup 创新企业', desc: '初创公司、独角兽、早期融资企业' },
  ],
  industry: [
    { value: '科技',    label: '科技',    desc: 'AI、半导体、软件、互联网' },
    { value: '金融',    label: '金融',    desc: '银行、保险、资管、FinTech' },
    { value: '医疗',    label: '医疗',    desc: '生物医药、医疗器械、健康服务' },
    { value: '消费',    label: '消费',    desc: '零售、品牌、食品饮料、电商' },
    { value: '能源',    label: '能源',    desc: '传统能源、新能源、储能' },
    { value: '房地产',  label: '房地产',  desc: '开发、物业、REITs、建筑' },
    { value: '教育',    label: '教育',    desc: 'K12、职业教育、EdTech' },
    { value: '文化产业',label: '文化产业',desc: '媒体、娱乐、游戏、IP' },
    { value: '农业',    label: '农业',    desc: '农业科技、食品供应链' },
    { value: '制造业',  label: '制造业',  desc: '先进制造、工业自动化' },
  ],
  asset: [
    { value: '存款',    label: '存款',    desc: '银行存款、货币基金' },
    { value: '股票',    label: '股票',    desc: 'A股、港股、美股' },
    { value: '指数',    label: '指数',    desc: 'ETF、指数基金' },
    { value: '债券',    label: '债券',    desc: '国债、企业债、可转债' },
    { value: '黄金',    label: '黄金',    desc: '实物黄金、黄金ETF、期货' },
    { value: '房地产',  label: '房地产',  desc: '住宅、商业地产、REITs' },
    { value: '加密货币',label: '加密货币',desc: 'BTC、ETH、DeFi' },
    { value: '外汇',    label: '外汇',    desc: '主要货币对、新兴市场货币' },
    { value: '私募',    label: '私募',    desc: 'PE、VC、私募股权' },
    { value: '公募',    label: '公募',    desc: '公募基金、FOF' },
    { value: '期货',    label: '期货',    desc: '商品期货、金融期货' },
    { value: '期权',    label: '期权',    desc: '股票期权、指数期权' },
    { value: '保险',    label: '保险',    desc: '寿险、财险、年金' },
  ],
  region: [
    { value: '美国',    label: '美国',    desc: '纳斯达克、标普500、美联储政策' },
    { value: '欧洲',    label: '欧洲',    desc: 'DAX、CAC40、ECB政策' },
    { value: '东南亚',  label: '东南亚',  desc: 'ASEAN、新加坡、越南、印尼' },
    { value: '中国',    label: '中国',    desc: 'A股、港股、人民币资产' },
    { value: '日本',    label: '日本',    desc: '日经225、日元、日本央行' },
    { value: '韩国',    label: '韩国',    desc: 'KOSPI、半导体、韩元' },
    { value: '中国台湾',label: '中国台湾',desc: '台积电、台湾科技产业链' },
    { value: '中国香港',label: '中国香港',desc: '恒生指数、港元联系汇率' },
    { value: '南美',    label: '南美',    desc: '巴西、阿根廷、智利、大宗商品' },
    { value: '中东',    label: '中东',    desc: '沙特、UAE、石油经济' },
  ],
};

const REGION_ID_MAP: Record<string, RegionId> = {
  '美国': 'us', '欧洲': 'europe', '东南亚': 'southeast_asia',
  '中国': 'china', '日本': 'japan', '韩国': 'korea',
  '中国台湾': 'taiwan', '中国香港': 'hongkong',
  '南美': 'south_america', '中东': 'middle_east',
};

const ADD_HINT: Record<string, string> = {
  enterprise: '添加企业',
  industry:   '添加产业',
  asset:      '添加金融标的',
  region:     '添加地区研究',
  strategy:   '添加经济学家策略',
  behavioral: '添加行为经济主题',
  monetary:   '添加货币政策议题',
};

export default function AddPanel({
  open,
  onClose,
  category,
  subItem,
  categoryLabel,
  editingData,
  onSubmit,
}: AddPanelProps) {
  const subOptions = SUB_OPTIONS[category];
  const needSubSelection = !subItem && !editingData && subOptions && subOptions.length > 0;
  const [selectedSub, setSelectedSub] = useState<string | undefined>(subItem);

  useEffect(() => {
    if (open) setSelectedSub(subItem);
  }, [open, subItem]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  const activeSubItem = selectedSub ?? subItem;
  const showSubSelection = needSubSelection && !selectedSub;

  const handleSubmit = (data: ResearchData) => {
    onSubmit(data, activeSubItem);
    onClose();
  };

  const panelTitle = editingData
    ? `编辑 · ${categoryLabel}`
    : activeSubItem
      ? `${ADD_HINT[category] ?? '添加'} · ${activeSubItem}`
      : ADD_HINT[category] ?? '添加条目';

  const panelSubtitle = activeSubItem
    ? `${categoryLabel} / ${activeSubItem}`
    : categoryLabel;

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/10 z-40" onClick={onClose} />
      )}

      {/*
        ── 核心修复 ──
        - 使用 flex flex-col 确保子元素垂直排列
        - h-screen 而非 h-full，确保面板高度锁定在视口高度
        - overflow-hidden 防止面板自身溢出
        - 内部的 RegionForm / EnterpriseForm 等子组件各自管理自己的 flex-1 + overflow-y-auto
      */}
      <div
        className={`
          fixed top-0 right-0 z-50
          flex flex-col
          h-screen overflow-hidden
          bg-white border-l border-slate-200 shadow-2xl
          transition-transform duration-300 ease-in-out
          ${showSubSelection ? 'w-[420px]' : 'w-[600px]'}
          ${open ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* ── 固定头部 ── */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 shrink-0">
          <div>
            <h2 className="text-base font-semibold text-slate-900">{panelTitle}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{panelSubtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* ── Phase 1：选择子分类 ── */}
        {showSubSelection && subOptions && (
          <div className="flex-1 overflow-y-auto px-6 py-5">
            <p className="text-xs text-slate-400 mb-4">请先选择要归入的子类别：</p>
            <div className="space-y-3">
              {subOptions.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setSelectedSub(opt.value)}
                  className="w-full flex items-center justify-between gap-3 px-4 py-3.5 bg-white border border-slate-200 rounded-2xl hover:border-amber-300 hover:bg-amber-50 transition-all text-left group"
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800 group-hover:text-amber-700">
                      {opt.label}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">{opt.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-slate-300 group-hover:text-amber-500 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── Phase 2：表单（flex-1 让子表单撑满剩余高度）── */}
        {!showSubSelection && (
          <div className="flex-1 flex flex-col min-h-0">
            {/* 返回子分类选择 */}
            {needSubSelection && selectedSub && (
              <div className="px-6 pt-3 pb-1 shrink-0">
                <button
                  onClick={() => setSelectedSub(undefined)}
                  className="text-xs text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors"
                >
                  ← 重新选择子类别
                </button>
              </div>
            )}

            {/* 各分类表单 —— 每个表单组件内部必须是 flex flex-col h-full */}
            {category === 'enterprise' ? (
              <EnterpriseForm
                onSubmit={handleSubmit}
                onCancel={onClose}
                initialData={editingData as EnterpriseData | undefined}
              />
            ) : category === 'industry' ? (
              <IndustryForm
                onSubmit={handleSubmit}
                onCancel={onClose}
                initialData={editingData as IndustryData | undefined}
              />
            ) : category === 'strategy' ? (
              <EconomistForm
                onSubmit={handleSubmit}
                onCancel={onClose}
                initialData={editingData as EconomistData | undefined}
              />
            ) : category === 'region' && activeSubItem ? (
              <RegionForm
                onSubmit={handleSubmit}
                onCancel={onClose}
                initialData={editingData as RegionData | undefined}
                regionId={REGION_ID_MAP[activeSubItem] ?? 'us'}
              />
              ) : category === 'asset' ? (
              <AssetForm
                onSubmit={handleSubmit}
                onCancel={onClose}
                initialData={editingData as AssetData | undefined}
                subItem={activeSubItem}
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 text-slate-400 px-6">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-2xl">
                  🍍
                </div>
                <p className="text-sm font-medium text-slate-500">「{categoryLabel}」表单待填充</p>
                <p className="text-xs text-center text-slate-400">
                  告诉我这个分类需要哪些字段，我来补充。
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}