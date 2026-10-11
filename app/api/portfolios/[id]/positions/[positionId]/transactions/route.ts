import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { getCurrentUserId } from '@/lib/auth/getCurrentUserId';
import { applyTransactionToPosition, calcRealizedPnl } from '@/lib/portfolio/calculations';
import type { CreateTransactionInput } from '@/types/portfolio';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; positionId: string }> }
) {
  const { id: portfolioId, positionId } = await params;
  const userId = await getCurrentUserId();

  const { data: portfolio } = await supabaseAdmin
    .from('portfolios')
    .select('id')
    .eq('id', portfolioId)
    .eq('user_id', userId)
    .single();

  if (!portfolio) {
    return NextResponse.json({ error: '组合不存在' }, { status: 404 });
  }

  const { data: position } = await supabaseAdmin
    .from('positions')
    .select('*')
    .eq('id', positionId)
    .eq('portfolio_id', portfolioId)
    .single();

  if (!position) {
    return NextResponse.json({ error: '持仓不存在' }, { status: 404 });
  }

  const body: CreateTransactionInput = await req.json();

  if (!body.type || !body.trade_date) {
    return NextResponse.json({ error: '缺少必填字段：type, trade_date' }, { status: 400 });
  }

  if (body.type === 'capital_in' || body.type === 'capital_out') {
    return NextResponse.json(
      { error: 'capital_in/capital_out 请调用 /api/portfolios/[id]/capital-flow' },
      { status: 400 }
    );
  }

  let realizedPnl = 0;
  if ((body.type === 'reduce' || body.type === 'close') && body.quantity && body.price) {
    const sellQty = body.type === 'close' ? position.quantity : body.quantity;
    realizedPnl = calcRealizedPnl(position.avg_cost, body.price, sellQty);
  }

  const effectiveQuantity =
    body.type === 'close' ? position.quantity : body.quantity;

  const newState = applyTransactionToPosition(position, {
    type: body.type,
    quantity: effectiveQuantity,
    price: body.price ?? position.avg_cost,
  });

  const { data: tx, error: txError } = await supabaseAdmin
    .from('transactions')
    .insert({
      position_id: positionId,
      portfolio_id: portfolioId,
      type: body.type,
      trade_date: body.trade_date,
      quantity: effectiveQuantity,
      price: body.price ?? null,
      rationale_category: body.rationale_category ?? null,
      rationale_note: body.rationale_note ?? null,
    })
    .select()
    .single();

  if (txError) {
    return NextResponse.json({ error: txError.message }, { status: 500 });
  }

  const updatePayload: Record<string, unknown> = {
    quantity: newState.quantity,
    avg_cost: newState.avg_cost,
  };

  if (body.type === 'close') {
    updatePayload.status = 'closed';
    updatePayload.exit_thesis = body.rationale_note ?? null;
  }

  const { data: updatedPosition, error: updateError } = await supabaseAdmin
    .from('positions')
    .update(updatePayload)
    .eq('id', positionId)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({
    transaction: tx,
    position: updatedPosition,
    realizedPnl,
  }, { status: 201 });
}