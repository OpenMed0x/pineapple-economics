import React from 'react';

export default function BrandLogo() {
  return (
    <div className="flex flex-col px-2 py-4 mb-6 border-b border-slate-200 pb-5">
      <div className="flex items-center gap-2">
        <span className="text-xl select-none">🍍</span>
        <h1 className="font-bold text-base tracking-tight bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 bg-clip-text text-transparent font-sans lowercase whitespace-nowrap">
          pineapple economics
        </h1>
      </div>
      <p className="text-[11px] text-slate-400 tracking-[0.2em] font-medium mt-1.5 pl-7 whitespace-nowrap">
        分析 · 预测 · 投资
      </p>
    </div>
  );
}