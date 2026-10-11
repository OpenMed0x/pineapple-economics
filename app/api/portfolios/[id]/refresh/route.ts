import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '../../../../../lib/supabase/server';
import { getCurrentUserId } from '../../../../../lib/auth/getCurrentUserId';
import { getMarketPrice } from '../../../../../lib/portfolio/marketData';
import { accrueCashValue, calcUnrealizedPnl, calcCumulativeReturnPct } from '../../../../../lib/portfolio/calculations';

const CASH_TYPES = ['cash_idle', 'cash_savings', 'money_market_fund', 'bond_fund'];

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: portfolioId } = await params;
  const userId = await getCurrentUserId();

  const { data: portfolio } = await supabaseAdmin
    .from('portfolios')
    .select('*')
    .eq('id', portfolioId)
    .eq('user_id', userId)
    .single();

  if (!portfolio) {
    return NextResponse.json({ error: '组合不存在' }, { status: 404 });
  }

  const { data: positions, error: posError } = await supabaseAdmin
    .from('positions')
    .select('*')
    .eq('portfolio_id', portfolioId)
    .eq('status', 'open');

  if (posError) {
    return NextResponse.json({ error: posError.message }, { status: 500 });
  }

  const now = new Date();
  const priceErrors: { symbol: string; error: string }[] = [];

  // 逐个持仓更新价格
  for (const position of positions ?? []) {
    try {
      let newPrice: number;

      if (CASH_TYPES.includes(position.asset_class)) {
        // 现金子类：按年化利率复利滚动（cash_idle 的 rate 是通胀率，用于展示购买力，不改名义市值）
        if (position.asset_class === 'cash_idle') {
          newPrice = position.current_price ?? 1; // 名义值不变
        } else {
          const daysSince = position.last_valued_at
            ? (now.getTime() - new Date(position.last_valued_at).getTime()) / 86400000
            : 0;
          const currentValue = position.quantity * (position.current_price ?? 1);
          const newValue = accrueCashValue(currentValue, position.annual_rate ?? 0, daysSince);
          newPrice = position.quantity > 0 ? newValue / position.quantity : 0;
        }
      } else if (position.valuation_method === 'api_auto') {
        newPrice = await getMarketPrice(position.asset_class, position.symbol);
      } else {
        // 手动估值资产，不自动更新，保留原值
        continue;
      }

      await supabaseAdmin
        .from('positions')
        .update({ current_price: newPrice, last_valued_at: now.toISOString() })
        .eq('id', position.id);

      position.current_price = newPrice; // 更新内存中的值，供下面汇总用
    } catch (err) {
      priceErrors.push({
        symbol: position.symbol,
        error: err instanceof Error ? err.message : '未知错误',
      });
    }
  }

  // 重新读取最新持仓（含刚更新的价格），计算组合汇总
  const { data: freshPositions } = await supabaseAdmin
    .from('positions')
    .select('*')
    .eq('portfolio_id', portfolioId);

  const openPositions = (freshPositions ?? []).filter(p => p.status === 'open');

  let cashValue = 0;
  let equityValue = 0;
  let altValue = 0;
  let unrealizedPnl = 0;

  for (const p of openPositions) {
    const marketValue = p.quantity * (p.current_price ?? p.avg_cost);
    unrealizedPnl += calcUnrealizedPnl(p.quantity, p.avg_cost, p.current_price ?? p.avg_cost);

    if (CASH_TYPES.includes(p.asset_class)) {
      cashValue += marketValue;
    } else if (p.asset_class === 'equity') {
      equityValue += marketValue;
    } else {
      altValue += marketValue; // crypto / real_estate / private_equity / bond / other
    }
  }

  // 已实现盈亏 = 组合所有清仓的历史累计（简化：从交易记录里汇总，这里先用 0 占位，
  // 后续如果需要精确展示，可以在清仓 API 那一步把 realizedPnl 写回一个累计字段）
  const { data: allTx } = await supabaseAdmin
    .from('transactions')
    .select('*')
    .eq('portfolio_id', portfolioId);

  const capitalIn = (allTx ?? [])
    .filter(t => t.type === 'capital_in')
    .reduce((sum, t) => sum + (t.amount ?? 0), 0);
  const capitalOut = (allTx ?? [])
    .filter(t => t.type === 'capital_out')
    .reduce((sum, t) => sum + (t.amount ?? 0), 0);

  const netContributedCapital = portfolio.initial_capital + capitalIn - capitalOut;
  const totalValue = cashValue + equityValue + altValue;
  const cumulativeReturnPct = calcCumulativeReturnPct(
    totalValue - netContributedCapital,
    netContributedCapital
  );

  const { data: snapshot, error: snapshotError } = await supabaseAdmin
    .from('portfolio_snapshots')
    .insert({
      portfolio_id: portfolioId,
      total_value: totalValue,
      cash_value: cashValue,
      equity_value: equityValue,
      alt_value: altValue,
      net_contributed_capital: netContributedCapital,
      realized_pnl: 0,
      unrealized_pnl: unrealizedPnl,
      cumulative_return_pct: cumulativeReturnPct,
    })
    .select()
    .single();

  if (snapshotError) {
    return NextResponse.json({ error: snapshotError.message }, { status: 500 });
  }

  return NextResponse.json({
    snapshot,
    priceErrors, // 哪些标的这次没刷新成功（比如股票API未配置key），前端可以提示用户
  });
}