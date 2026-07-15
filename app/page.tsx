"use client";

import React, { useState, useEffect } from 'react';
import MetricCard from '../components/MetricCard';
import RealTimeChart from '../components/RealTimeChart';
import RegPanel from '../components/RegPanel';
import ResearchView from '../components/ResearchView';
import { useNav } from '../contexts/NavContext';
import { Play, Pause, RefreshCw } from 'lucide-react';
import { ResearchData } from '../store/researchStore';


interface DataPoint {
  time: string;
  actual: number;
  forecast: number;
}

const generateInitialData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  let basePrice = 150;
  for (let i = 30; i >= 1; i--) {
    const time = new Date(Date.now() - i * 5000);
    const actual = basePrice + (Math.random() - 0.48) * 4;
    const forecast = actual + (Math.random() - 0.5) * 1.5;
    basePrice = actual;
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      actual: parseFloat(actual.toFixed(2)),
      forecast: parseFloat(forecast.toFixed(2))
    });
  }
  return data;
};

const categoryLabels: Record<string, string> = {
  live: 'Live Terminal',
  enterprise: '企业',
  industry: '产业',
  asset: '金融标的',
  region: '地区',
  strategy: '经济学家策略',
  behavioral: '行为经济',
  monetary: '货币政策与通胀',
};

export default function Dashboard() {
  const { selection } = useNav();
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [regParams, setRegParams] = useState({
    rSquared: 0.7421,
    adjRSquared: 0.7315,
    fStatistic: 142.4,
    dwStat: 1.92,
    beta: 1.2451,
    pValue: 0.0021
  });

  useEffect(() => {
    setChartData(generateInitialData());
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && chartData.length > 0) {
      interval = setInterval(() => {
        setChartData((prevData) => {
          if (prevData.length === 0) return prevData;
          const nextData = [...prevData.slice(1)];
          const lastPoint = prevData[prevData.length - 1];
          const nextActual = lastPoint.actual + (Math.random() - 0.49) * 3;
          const nextForecast = nextActual + (Math.random() - 0.5) * 1.2;

          const now = new Date();
          nextData.push({
            time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            actual: parseFloat(nextActual.toFixed(2)),
            forecast: parseFloat(nextForecast.toFixed(2))
          });
          return nextData;
        });

        setRegParams(prev => ({
          ...prev,
          rSquared: Math.min(0.95, Math.max(0.6, prev.rSquared + (Math.random() - 0.5) * 0.01)),
          beta: prev.beta + (Math.random() - 0.5) * 0.02,
          dwStat: Math.min(2.2, Math.max(1.7, prev.dwStat + (Math.random() - 0.5) * 0.03))
        }));
      }, 3000);
    }

    return () => clearInterval(interval);
  }, [isActive, chartData.length]);

  // 非 Live Terminal 分类：渲染对应研究页面
  if (selection.category !== 'live') {
    return (
      <ResearchView
        category={selection.category}
        categoryLabel={categoryLabels[selection.category] ?? selection.category}
        subItem={selection.subItem}
      />
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center text-sm text-slate-400 animate-pulse">
        Initializing Pineapple Econometrics Terminal...
      </div>
    );
  }

  const currentPrice = chartData[chartData.length - 1].actual;
  const previousPrice = chartData[0].actual;
  const priceChange = ((currentPrice - previousPrice) / previousPrice) * 100;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">实时计量分析看板</h2>
          <p className="text-sm text-slate-400">驱动引擎: Python (Statsmodels) + PostgreSQL 实时数据通道</p>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-xl border border-slate-200">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isActive ? 'bg-amber-500 text-white font-semibold' : 'text-slate-400 hover:text-slate-700'
            }`}
          >
            {isActive ? <Pause size={14} /> : <Play size={14} />}
            {isActive ? '数据同步中' : '暂停同步'}
          </button>
          <button
            onClick={() => setChartData(generateInitialData())}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-all"
          >
            <RefreshCw size={14} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="凤梨核心指数 (PAI)" value={`$${currentPrice.toFixed(2)}`} change={priceChange} subtitle="实时标的资产结算价" />
        <MetricCard title="宏观流动性代理变量 (M2-Proxy)" value="14.2" change={0.45} unit="T" subtitle="自变量 X1 (高频估算值)" />
        <MetricCard title="中美利差期现差" value="1.84" change={-2.12} unit="%" subtitle="自变量 X2 (日频更新)" />
        <MetricCard title="系统预测夏普比率" value="2.31" change={5.14} subtitle="结合无风险资产滚动调整" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RealTimeChart data={chartData} />
        </div>
        <div>
          <RegPanel params={regParams} />
        </div>
      </div>
    </div>
  );
}