"use client";

import React, { useState, useEffect, useRef } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

interface DataPoint {
  time: string;
  actual: number;
  forecast: number;
}

interface RealTimeChartProps {
  data: DataPoint[];
}

export default function RealTimeChart({ data }: RealTimeChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width, height } = entries[0].contentRect;
      if (width > 0 && height > 0) {
        setDimensions({ width, height });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-[400px] bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between overflow-hidden shadow-sm"
    >
      <div className="mb-4 flex justify-between items-center shrink-0">
        <div>
          <h3 className="text-base font-semibold text-slate-800">目标资产价格 vs 计量模型预测</h3>
          <p className="text-xs text-slate-400">动态滑动窗口：时间序列 ARIMA / 机器学习混合模型实时推断</p>
        </div>
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-1.5 text-slate-500">
            <span className="w-3 h-1.5 bg-amber-500 rounded-full"></span> 观测价 (Actual)
          </div>
          <div className="flex items-center gap-1.5 text-slate-500">
            <span className="w-3 h-1.5 bg-indigo-500 rounded-full"></span> 预测价 (Forecast)
          </div>
        </div>
      </div>

      <div className="w-full flex-1 min-h-0 relative">
        {dimensions.width > 0 && dimensions.height > 0 ? (
          <AreaChart
            data={data}
            width={dimensions.width}
            height={dimensions.height}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.18}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
            <XAxis dataKey="time" stroke="#94a3b8" tickLine={false} axisLine={false} fontSize={11} />
            <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} fontSize={11} domain={['auto', 'auto']} />
            <Tooltip
              contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
              itemStyle={{ fontSize: '12px' }}
              labelStyle={{ color: '#64748b', fontSize: '11px' }}
            />
            <Area type="monotone" dataKey="actual" name="实际价格" stroke="#f59e0b" strokeWidth={2} fillOpacity={1} fill="url(#colorActual)" dot={false} isAnimationActive={false} />
            <Area type="monotone" dataKey="forecast" name="模型预测" stroke="#6366f1" strokeWidth={1.5} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorForecast)" dot={false} isAnimationActive={false} />
          </AreaChart>
        ) : (
          <div className="w-full h-full bg-slate-50 rounded-xl animate-pulse" />
        )}
      </div>
    </div>
  );
}