"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Search, X, Command, Building2, Factory, Landmark, Globe2 } from 'lucide-react';
import { useResearchStore } from '../store/researchStore';

interface TopBarProps {
  onAddClick: () => void;
}

const categoryIconMap: Record<string, React.ReactNode> = {
  enterprise: <Building2 size={13} className="text-amber-500" />,
  industry:   <Factory size={13} className="text-blue-500" />,
  asset:      <Landmark size={13} className="text-emerald-500" />,
  region:     <Globe2 size={13} className="text-purple-500" />,
};

const categoryLabelMap: Record<string, string> = {
  enterprise: '企业', industry: '产业', asset: '金融标的',
  region: '地区', strategy: '经济学家策略', behavioral: '行为经济', monetary: '货币政策与通胀',
};

export default function TopBar({ onAddClick }: TopBarProps) {
  const router = useRouter();
  const { search } = useResearchStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ReturnType<typeof search>>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchOpen && inputRef.current) inputRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    if (query.trim()) {
      setResults(search(query));
    } else {
      setResults([]);
    }
  }, [query, search]);

  // Esc 关闭 + 点击外部关闭
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setSearchOpen(false); setQuery(''); }
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true); }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setSearchOpen(false); setQuery('');
      }
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onClickOutside);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('mousedown', onClickOutside); };
  }, []);

  const handleSelect = (id: string) => {
    router.push(`/research/${id}`);
    setSearchOpen(false);
    setQuery('');
  };

  return (
    <div className="flex items-center gap-3">
      {/* 搜索区域 */}
      <div className="relative" ref={containerRef}>
        {searchOpen ? (
          <div className="flex items-center gap-2 bg-white border border-slate-300 rounded-xl px-3 py-2 shadow-sm w-80 transition-all">
            <Search size={15} className="text-slate-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="搜索所有企业、产业、标的..."
              className="flex-1 text-sm text-slate-800 placeholder:text-slate-400 bg-transparent outline-none"
            />
            <button onClick={() => { setSearchOpen(false); setQuery(''); }} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-2 text-sm text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-all border border-slate-200"
          >
            <Search size={15} />
            <span className="text-xs">搜索</span>
            <span className="hidden sm:flex items-center gap-1 ml-1 px-1.5 py-0.5 bg-slate-100 rounded text-[10px] text-slate-400 font-mono">
              <Command size={10} />K
            </span>
          </button>
        )}

        {/* 搜索结果下拉 */}
        {searchOpen && (
          <div className="absolute top-full mt-2 right-0 w-96 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden">
            {results.length > 0 ? (
              <>
                <div className="px-4 py-2.5 border-b border-slate-100">
                  <span className="text-xs text-slate-400">找到 {results.length} 条结果</span>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {results.map(r => (
                    <button
                      key={r.id}
                      onClick={() => handleSelect(r.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-amber-50 transition-colors text-left"
                    >
                      <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                        {categoryIconMap[r.category] ?? <Building2 size={13} className="text-slate-400" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-slate-800 truncate">{r.title}</p>
                        <p className="text-xs text-slate-400">
                          {categoryLabelMap[r.category]}{r.subItem ? ` · ${r.subItem}` : ''}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </>
            ) : query.trim() ? (
              <div className="px-4 py-8 text-center">
                <p className="text-sm text-slate-400">没有找到「{query}」相关记录</p>
                <p className="text-xs text-slate-300 mt-1">尝试其他关键词</p>
              </div>
            ) : (
              <div className="px-4 py-8 text-center">
                <p className="text-xs text-slate-400">输入关键词搜索所有研究记录</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 添加按钮 */}
      <button
        onClick={onAddClick}
        className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold rounded-xl transition-all shadow-sm shadow-amber-200"
      >
        <Plus size={16} />
        添加
      </button>
    </div>
  );
}

// 全域搜索逻辑在这里