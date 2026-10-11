import type { Position, Transaction, TransactionType } from '@/types/portfolio';

/**
 * 根据一笔新的调仓记录，计算持仓的新数量和新加权平均成本。
 * 只处理会改变持仓数量/成本的交易类型：buy / add / reduce / close
 * capital_in / capital_out 不影响任何持仓，只影响组合层面的现金，不走这个函数。
 */
export function applyTransactionToPosition(
  position: Pick<Position, 'quantity' | 'avg_cost'>,
  tx: Pick<Transaction, 'type' | 'quantity' | 'price'>
): { quantity: number; avg_cost: number } {
  const { type, quantity, price } = tx;

  if (quantity == null || price == null) {
    throw new Error(`交易类型 ${type} 必须提供 quantity 和 price`);
  }

  switch (type) {
    case 'buy':
    case 'add': {
      // 加权平均成本 = (原持仓成本总额 + 新买入成本总额) / 新总数量
      const oldCostTotal = position.quantity * position.avg_cost;
      const newCostTotal = quantity * price;
      const newQuantity = position.quantity + quantity;
      const newAvgCost = newQuantity > 0 ? (oldCostTotal + newCostTotal) / newQuantity : 0;
      return { quantity: newQuantity, avg_cost: newAvgCost };
    }

    case 'reduce': {
      // 减仓不改变剩余部分的平均成本，只减数量
      const newQuantity = position.quantity - quantity;
      if (newQuantity < 0) {
        throw new Error('减仓数量超过当前持仓数量');
      }
      return { quantity: newQuantity, avg_cost: position.avg_cost };
    }

    case 'close': {
      // 清仓，数量归零，成本保留最后一次的值仅作历史参考
      return { quantity: 0, avg_cost: position.avg_cost };
    }

    default:
      throw new Error(`未知交易类型: ${type}`);
  }
}

/** 单笔卖出（reduce/close）产生的已实现盈亏 */
export function calcRealizedPnl(
  avgCostBeforeSale: number,
  sellPrice: number,
  sellQuantity: number
): number {
  return (sellPrice - avgCostBeforeSale) * sellQuantity;
}

/** 单笔持仓的未实现盈亏 */
export function calcUnrealizedPnl(
  quantity: number,
  avgCost: number,
  currentPrice: number
): number {
  return (currentPrice - avgCost) * quantity;
}

/** 组合累计收益率 = 组合总盈亏 / 累计净投入本金 */
export function calcCumulativeReturnPct(
  totalPnl: number,
  netContributedCapital: number
): number | null {
  if (netContributedCapital <= 0) return null;
  return (totalPnl / netContributedCapital) * 100;
}

/**
 * 现金子类持仓的复利增长：按距上次估值的天数、年化利率复利滚动
 * 用于 cash_idle（此时 rate 传通胀率，结果用于计算购买力，不直接改市值本身）
 * 用于 cash_savings / money_market_fund / bond_fund（rate 为真实计息利率，直接更新市值）
 */
export function accrueCashValue(
  currentValue: number,
  annualRatePct: number,
  daysSinceLastValuation: number
): number {
  const dailyRate = annualRatePct / 100 / 365;
  return currentValue * Math.pow(1 + dailyRate, daysSinceLastValuation);
}

/** 名义收益率 - 通胀率 = 真实收益率 */
export function calcRealReturnPct(nominalReturnPct: number, inflationRatePct: number): number {
  return nominalReturnPct - inflationRatePct;
}