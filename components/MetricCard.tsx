import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  unit?: string;
  subtitle?: string;
}

export default function MetricCard({ title, value, change, unit = "", subtitle }: MetricCardProps) {
  const isPositive = change >= 0;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:border-slate-300 hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-medium text-slate-400 tracking-wider uppercase">{title}</span>
        <span className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full ${
          isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
        }`}>
          {isPositive ? <ArrowUpRight size={12} className="mr-0.5" /> : <ArrowDownRight size={12} className="mr-0.5" />}
          {isPositive ? '+' : ''}{change.toFixed(2)}%
        </span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold tracking-tight text-slate-900">{value}</span>
        {unit && <span className="text-xs text-slate-400 font-medium ml-0.5">{unit}</span>}
      </div>
      {subtitle && <p className="text-xs text-slate-400 mt-2 font-mono">{subtitle}</p>}
    </div>
  );
}