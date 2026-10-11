"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, RefreshCw, PlusCircle, TrendingUp, TrendingDown } from 'lucide-react';
import type { Portfolio, Position, PortfolioSnapshot, PositionWithMetrics } from '../../types/portfolio';
import PositionPanel from './PositionPanel';
import TransactionPanel from './TransactionPanel';
import CapitalFlowPanel from './CapitalFlowPanel';
import EditPortfolioPanel from './EditPortfolioPanel';
import { Pencil } from 'lucide-react';

function withMetrics(positions: Position[], totalValue: number): PositionWithMetrics[] {
  return positions.map(p => {
    const marketValue = p.quantity * (p.current_price ?? p.avg_cost);
    return {
      ...p,
      market_value: marketValue,
      unrealized_pnl: marketValue - p.quantity * p.avg_cost,
      weight_pct: totalValue > 0 ? (marketValue / totalValue) * 100 : 0,
    };
  });
}

const POSITIONING_LABEL: Record<string, string> = {
  defensive: '防守', offensive: '进攻', macro_hedge: '宏观对冲', sector_rotation: '行业轮动',
};

const ASSET_CLASS_LABEL: Record<string, string> = {
  equity: '股票', crypto: '加密货币', real_estate: '房产', private_equity: '初创股权',
  bond: '债券', cash_idle: '账面闲置', cash_savings: '储蓄', money_market_fund: '货币基金',
  bond_fund: '债券基金', other: '其他',
};

export default function PortfolioDetail({ portfolioId }: { portfolioId: string }) {
  const router = useRouter();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [positions, setPositions] = useState<Position[]>([]);
  const [latestSnapshot, setLatestSnapshot] = useState<PortfolioSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [positionPanelOpen, setPositionPanelOpen] = useState(false);
  const [txPanel, setTxPanel] = useState<{ position: Position; type: string } | null>(null);
  const [capitalFlowOpen, setCapitalFlowOpen] = useState(false);
  const [editPanelOpen, setEditPanelOpen] = useState(false);

  const fetchDetail = useCallback(async () => {
    setIsLoading(true);
    const res = await fetch(`/api/portfolios/${portfolioId}`);
    const json = await res.json();
    setPortfolio(json.portfolio ?? null);
    setPositions(json.positions ?? []);
    setLatestSnapshot(json.latestSnapshot ?? null);
    setIsLoading(false);
  }, [portfolioId]);

  useEffect(() => { fetchDetail(); }, [fetchDetail]);

  const handleRefresh = async () => {
    setRefreshing(true);
    const res = await fetch(`/api/portfolios/${portfolioId}/refresh`, { method: 'POST' });
    const json = await res.json();
    if (json.priceErrors?.length > 0) {
      const failed = json.priceErrors.map((e: any) => `${e.symbol}: ${e.error}`).join('\n');
      alert(`部分标的价格未能更新：\n${failed}`);
    }
    await fetchDetail();
    setRefreshing(false);
  };

  if (isLoading || !portfolio) {
    return <div className="flex items-center justify-center h-96"><p className="text-sm text-slate-400">加载中...</p></div>;
  }

  const totalValue = latestSnapshot?.total_value ?? portfolio.initial_capital;
  const totalPnl = latestSnapshot
    ? latestSnapshot.total_value - latestSnapshot.net_contributed_capital
    : 0;
  const cumulativeReturnPct = latestSnapshot?.cumulative_return_pct ?? 0;
  const openPositions = positions.filter(p => p.status === 'open');
  const closedPositions = positions.filter(p => p.status === 'closed');
  const positionsWithMetrics = withMetrics(openPositions, totalValue);

  return (
    <div className="space-y-6">
      {/* 头部 */}
      <div className="flex items-start gap-3 border-b border-slate-200 pb-5">
        <button
          onClick={() => router.push('/')}
          className="mt-1 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all shrink-0"
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">{portfolio.name}</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-medium">
              {POSITIONING_LABEL[portfolio.positioning]}
            </span>
          </div>
          {portfolio.thesis && <p className="text-sm text-slate-400 mt-1">{portfolio.thesis}</p>}
        </div>
        <div className="flex items-center gap-2">
           <button
    onClick={() => setEditPanelOpen(true)}
    className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all"
  >
    <Pencil size={13} /> 编辑
  </button>
          <button
            onClick={() => setCapitalFlowOpen(true)}
            className="px-3 py-2 text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all"
          >
            资金追加/抽出
          </button>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-white bg-amber-500 hover:bg-amber-600 rounded-xl transition-all disabled:opacity-50"
          >
            <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} />
            {refreshing ? '刷新中...' : '刷新行情'}
          </button>
        </div>
      </div>

      {/* 组合级统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="当前总资产" value={`${portfolio.currency} ${totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}`} />
        <StatCard
          label="总盈亏"
          value={`${totalPnl >= 0 ? '+' : ''}${totalPnl.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
          positive={totalPnl >= 0}
        />
        <StatCard
          label="累计收益率"
          value={`${cumulativeReturnPct >= 0 ? '+' : ''}${cumulativeReturnPct.toFixed(2)}%`}
          positive={cumulativeReturnPct >= 0}
        />
        <StatCard label="持仓标的数" value={String(openPositions.length)} />
      </div>

      {/* 基础信息区 */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-slate-700 mb-4">组合基础信息</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <InfoItem label="对比基准" value={!portfolio.benchmark || portfolio.benchmark === 'none' ? '不设基准' : portfolio.benchmark} />
          <InfoItem label="初始本金" value={`${portfolio.currency} ${portfolio.initial_capital.toLocaleString()}`} />
          <InfoItem label="目标收益率" value={portfolio.target_return ? `${portfolio.target_return}%` : '—'} />
          <InfoItem label="可承受最大回撤" value={portfolio.max_drawdown_tolerance ? `${portfolio.max_drawdown_tolerance}%` : '—'} />
          <InfoItem label="最大单标的仓位" value={portfolio.max_single_position_pct ? `${portfolio.max_single_position_pct}%` : '—'} />
          <InfoItem label="最大行业仓位" value={portfolio.max_sector_pct ? `${portfolio.max_sector_pct}%` : '—'} />
        </div>
        {portfolio.stop_loss_rule && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs text-slate-400 mb-1">止损规则</p>
            <p className="text-sm text-slate-600">{portfolio.stop_loss_rule}</p>
          </div>
        )}
      </div>

      {/* 持仓明细 */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-700">持仓明细</h3>
          <button
            onClick={() => setPositionPanelOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-700 bg-amber-50 hover:bg-amber-100 rounded-xl transition-all"
          >
            <PlusCircle size={13} /> 新建持仓
          </button>
        </div>

        {positionsWithMetrics.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-8">暂无持仓，点击"新建持仓"开始</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
                  <th className="py-2 pr-3 font-medium">标的</th>
                  <th className="py-2 pr-3 font-medium">类别</th>
                  <th className="py-2 pr-3 font-medium text-right">数量</th>
                  <th className="py-2 pr-3 font-medium text-right">成本</th>
                  <th className="py-2 pr-3 font-medium text-right">市值</th>
                  <th className="py-2 pr-3 font-medium text-right">浮盈亏</th>
                  <th className="py-2 pr-3 font-medium text-right">仓位%</th>
                  <th className="py-2 pr-3 font-medium">操作</th>
                </tr>
              </thead>
              <tbody>
                {positionsWithMetrics.map(p => (
                  <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                    <td className="py-3 pr-3">
                      <p className="font-medium text-slate-800">{p.symbol}</p>
                      {p.entry_thesis && (
                        <p className="text-xs text-slate-400 truncate max-w-[200px]" title={p.entry_thesis}>
                          {p.entry_thesis}
                        </p>
                      )}
                    </td>
                    <td className="py-3 pr-3 text-slate-500">{ASSET_CLASS_LABEL[p.asset_class]}</td>
                    <td className="py-3 pr-3 text-right text-slate-600">{p.quantity.toLocaleString()}</td>
                    <td className="py-3 pr-3 text-right text-slate-600">{p.avg_cost.toFixed(2)}</td>
                    <td className="py-3 pr-3 text-right text-slate-600">{p.market_value.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                    <td className={`py-3 pr-3 text-right font-medium ${p.unrealized_pnl >= 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                      {p.unrealized_pnl >= 0 ? '+' : ''}{p.unrealized_pnl.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </td>
                    <td className="py-3 pr-3 text-right text-slate-500">{p.weight_pct.toFixed(1)}%</td>
                    <td className="py-3 pr-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() => setTxPanel({ position: p, type: 'add' })}
                          className="text-xs px-2 py-1 text-emerald-600 hover:bg-emerald-50 rounded-lg"
                        >
                          加仓
                        </button>
                        <button
                          onClick={() => setTxPanel({ position: p, type: 'reduce' })}
                          className="text-xs px-2 py-1 text-amber-600 hover:bg-amber-50 rounded-lg"
                        >
                          减仓
                        </button>
                        <button
                          onClick={() => setTxPanel({ position: p, type: 'close' })}
                          className="text-xs px-2 py-1 text-rose-500 hover:bg-rose-50 rounded-lg"
                        >
                          清仓
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 已清仓持仓（复盘用） */}
      {closedPositions.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">已清仓 · 复盘</h3>
          <div className="space-y-3">
            {closedPositions.map(p => (
              <div key={p.id} className="border border-slate-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-slate-800 text-sm">{p.symbol}</p>
                  {p.review_verdict && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      p.review_verdict === 'correct' ? 'bg-emerald-50 text-emerald-700' :
                      p.review_verdict === 'incorrect' ? 'bg-rose-50 text-rose-600' :
                      'bg-amber-50 text-amber-700'
                    }`}>
                      {p.review_verdict === 'correct' ? '判断正确' : p.review_verdict === 'incorrect' ? '判断错误' : '部分正确'}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs text-slate-500">
                  <div>
                    <p className="text-slate-400 mb-1">入场逻辑</p>
                    <p>{p.entry_thesis || '—'}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 mb-1">退出逻辑</p>
                    <p>{p.exit_thesis || '—'}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {positionPanelOpen && (
        <PositionPanel
          portfolioId={portfolioId}
          onClose={() => setPositionPanelOpen(false)}
          onSaved={() => { setPositionPanelOpen(false); fetchDetail(); }}
        />
      )}

      {txPanel && (
        <TransactionPanel
          portfolioId={portfolioId}
          position={txPanel.position}
          type={txPanel.type}
          onClose={() => setTxPanel(null)}
          onSaved={() => { setTxPanel(null); fetchDetail(); }}
        />
      )}

      {capitalFlowOpen && (
        <CapitalFlowPanel
          portfolioId={portfolioId}
          onClose={() => setCapitalFlowOpen(false)}
          onSaved={() => { setCapitalFlowOpen(false); fetchDetail(); }}
        />
      )}
      {editPanelOpen && (
  <EditPortfolioPanel
    portfolio={portfolio}
    onClose={() => setEditPanelOpen(false)}
    onSaved={() => { setEditPanelOpen(false); fetchDetail(); }}
  />
)}
    </div>
  );
}

function StatCard({ label, value, positive }: { label: string; value: string; positive?: boolean }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4">
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className={`text-lg font-semibold ${
        positive === undefined ? 'text-slate-800' : positive ? 'text-emerald-600' : 'text-rose-500'
      }`}>
        {value}
      </p>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className="text-slate-700">{value}</p>
    </div>
  );
}