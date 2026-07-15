"use client";

import React, { useState, useEffect } from 'react';
import { useNav } from '../contexts/NavContext';
import {
  LayoutDashboard, Building2, Factory, Landmark, Globe2,
  Lightbulb, BrainCircuit, Percent, ChevronDown, ChevronRight,
  PieChart, Settings2
} from 'lucide-react';

interface NavCategory {
  id: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children?: string[];
}

const categories: NavCategory[] = [
  { id: 'live',       label: 'Live Terminal',   icon: LayoutDashboard },
  { id: 'enterprise', label: '企业',             icon: Building2,  children: ['知名企业', 'Startup 创新企业'] },
  { id: 'industry',   label: '产业',             icon: Factory,    children: ['科技', '金融', '医疗', '消费', '能源', '房地产', '教育', '文化产业', '农业', '制造业'] },
  { id: 'asset',      label: '金融标的',          icon: Landmark,   children: ['存款', '股票', '指数', '债券', '大宗商品', '房地产', '加密货币', '外汇', '私募', '公募', '期货', '期权', '保险'] },
  { id: 'region',     label: '地区',             icon: Globe2,     children: ['美国', '欧洲', '东南亚', '中国', '日本', '韩国', '中国台湾', '中国香港', '南美', '中东'] },
  { id: 'strategy',   label: '经济学家策略',      icon: Lightbulb },
  { id: 'behavioral', label: '行为经济',          icon: BrainCircuit },
  { id: 'monetary',   label: '货币政策与通胀',    icon: Percent },
  { id: 'portfolio',  label: '投资组合决策',      icon: PieChart },
];

export default function SidebarNav() {
  const { selection, setSelection } = useNav();
  const [openId, setOpenId] = useState<string | null>(null);

  // 监听 ResearchView 父级页面子栏目卡片的点击事件
  useEffect(() => {
    const handler = (e: Event) => {
      const { category, subItem } = (e as CustomEvent).detail;
      setOpenId(category);
      setSelection({ category, subItem });
    };
    window.addEventListener('nav-select', handler);
    return () => window.removeEventListener('nav-select', handler);
  }, [setSelection]);

  // 当 selection 变化时，自动展开对应父级
  useEffect(() => {
    if (selection.category && selection.category !== 'live') {
      const cat = categories.find(c => c.id === selection.category);
      if (cat?.children) setOpenId(selection.category);
    }
  }, [selection.category]);

  const handleCategoryClick = (cat: NavCategory) => {
    if (cat.children?.length) {
      setOpenId(openId === cat.id ? null : cat.id);
      setSelection({ category: cat.id });
    } else {
      setOpenId(null);
      setSelection({ category: cat.id });
    }
  };

  return (
    <nav className="space-y-1">
      {categories.map(cat => {
        const Icon = cat.icon;
        const isOpen = openId === cat.id;
        const isActiveCategory = selection.category === cat.id;

        return (
          <div key={cat.id}>
            <button
              onClick={() => handleCategoryClick(cat)}
              className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActiveCategory && !selection.subItem
                  ? 'bg-amber-50 text-amber-700 font-semibold'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span className="flex items-center gap-3">
                <Icon size={18} />
                <span>{cat.label}</span>
              </span>
              {cat.children && (
                isOpen
                  ? <ChevronDown size={14} />
                  : <ChevronRight size={14} />
              )}
            </button>

            {cat.children && isOpen && (
              <div className="ml-8 mt-1 space-y-0.5 border-l border-slate-200 pl-3">
                {cat.children.map(child => {
                  const isActiveChild = selection.category === cat.id && selection.subItem === child;
                  return (
                    <button
                      key={child}
                      onClick={() => setSelection({ category: cat.id, subItem: child })}
                      className={`w-full text-left px-2 py-1.5 rounded-lg text-xs transition-all ${
                        isActiveChild
                          ? 'bg-amber-50 text-amber-700 font-semibold'
                          : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {child}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}