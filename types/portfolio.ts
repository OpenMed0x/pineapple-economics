// types/portfolio.ts

// 不再限定固定几种，允许自定义文本；这几个是提供给用户快速选择的常见预设
export type PortfolioPositioning = string;

export const PRESET_POSITIONINGS = [
  { value: 'defensive',       label: '防守' },
  { value: 'offensive',       label: '进攻' },
  { value: 'macro_hedge',     label: '宏观对冲' },
  { value: 'sector_rotation', label: '行业轮动' },
] as const;

export type Benchmark = 'sp500' | 'csi300' | 'nasdaq' | 'gold' | 'btc' | 'none';

export type AssetClass =
  | 'equity'
  | 'crypto'
  | 'real_estate'
  | 'private_equity'
  | 'bond'
  | 'cash_idle'
  | 'cash_savings'
  | 'money_market_fund'
  | 'bond_fund'
  | 'other';

export type ValuationMethod = 'api_auto' | 'manual';

export type PositionStatus = 'open' | 'closed';

export type ReviewVerdict = 'correct' | 'incorrect' | 'partially_correct' | null;

export type TransactionType =
  | 'buy'
  | 'add'
  | 'reduce'
  | 'close'
  | 'capital_in'
  | 'capital_out';

export type RationaleCategory =
  | 'macro_shift'
  | 'earnings'
  | 'policy_change'
  | 'thesis_update'
  | 'other';

export interface Portfolio {
  id: string;
  user_id: string;
  name: string;
  positioning: PortfolioPositioning;
  thesis: string | null;
  target_return: number | null;
  max_drawdown_tolerance: number | null;
  max_single_position_pct: number | null;
  max_sector_pct: number | null;
  stop_loss_rule: string | null;
  benchmark: Benchmark | null;
  initial_capital: number;
  currency: string;
  next_review_date: string | null; // ISO date
  status: 'active' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface Position {
  id: string;
  portfolio_id: string;
  symbol: string;
  asset_class: AssetClass;
  valuation_method: ValuationMethod;
  region: string | null;
  sector: string | null;
  entry_thesis: string | null;
  target_price: number | null;
  stop_loss_price: number | null;
  exit_thesis: string | null;
  status: PositionStatus;
  quantity: number;
  avg_cost: number;
  current_price: number | null;
  last_valued_at: string | null;
  annual_rate: number | null;
  review_notes: string | null;
  review_verdict: ReviewVerdict;
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  position_id: string;
  portfolio_id: string;
  type: TransactionType;
  trade_date: string; // ISO date
  quantity: number | null;
  price: number | null;
  amount: number | null;
  rationale_category: RationaleCategory | null;
  rationale_note: string | null;
  created_at: string;
}

export interface PortfolioSnapshot {
  id: string;
  portfolio_id: string;
  snapshot_at: string;
  total_value: number;
  cash_value: number;
  equity_value: number;
  alt_value: number;
  net_contributed_capital: number;
  realized_pnl: number;
  unrealized_pnl: number;
  cumulative_return_pct: number | null;
  created_at: string;
}

// ---- 派生/计算用的复合类型（不对应数据库表，供前端和API层组装展示数据） ----

export interface PositionWithMetrics extends Position {
  market_value: number; // quantity * current_price
  unrealized_pnl: number; // market_value - (quantity * avg_cost)
  weight_pct: number; // 该持仓占组合总市值比例
}

export interface PortfolioSummary extends Portfolio {
  total_value: number;
  net_contributed_capital: number;
  total_pnl: number;
  cumulative_return_pct: number;
  cash_pct: number;
  equity_pct: number;
  alt_pct: number;
  position_count: number;
  max_drawdown_pct: number | null;
}

// ---- API 请求体类型 ----

export interface CreatePortfolioInput {
  name: string;
  positioning: PortfolioPositioning;
  thesis?: string;
  target_return?: number;
  max_drawdown_tolerance?: number;
  max_single_position_pct?: number;
  max_sector_pct?: number;
  stop_loss_rule?: string;
  benchmark?: Benchmark;
  initial_capital: number;
  currency?: string;
}

export interface CreatePositionInput {
  portfolio_id: string;
  symbol: string;
  asset_class: AssetClass;
  valuation_method: ValuationMethod;
  region?: string;
  sector?: string;
  entry_thesis?: string;
  target_price?: number;
  stop_loss_price?: number;
  annual_rate?: number;
  initial_quantity: number;
  initial_price: number;
  trade_date: string;
}

export interface CreateTransactionInput {
  position_id: string;
  type: TransactionType;
  trade_date: string;
  quantity?: number;
  price?: number;
  amount?: number;
  rationale_category?: RationaleCategory;
  rationale_note?: string;
}

export interface CapitalFlowInput {
  portfolio_id: string;
  type: 'capital_in' | 'capital_out';
  amount: number;
  trade_date: string;
  note?: string;
}