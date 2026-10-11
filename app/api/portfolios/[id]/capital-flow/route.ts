import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { getCurrentUserId } from '@/lib/auth/getCurrentUserId';
import type { CapitalFlowInput } from '@/types/portfolio';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: portfolioId } = await params;
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

  const body: CapitalFlowInput = await req.json();

  if (!body.type || !body.amount || !body.trade_date) {
    return NextResponse.json({ error: '缺少必填字段' }, { status: 400 });
  }

  if (body.type !== 'capital_in' && body.type !== 'capital_out') {
    return NextResponse.json({ error: 'type 必须为 capital_in 或 capital_out' }, { status: 400 });
  }

  const { data: tx, error } = await supabaseAdmin
    .from('transactions')
    .insert({
      position_id: null,
      portfolio_id: portfolioId,
      type: body.type,
      trade_date: body.trade_date,
      amount: body.amount,
      rationale_note: body.note ?? null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ transaction: tx }, { status: 201 });
}