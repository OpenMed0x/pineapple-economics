import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { getCurrentUserId } from '@/lib/auth/getCurrentUserId';
import type { CreatePositionInput } from '@/types/portfolio';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = await getCurrentUserId();

  const { data: portfolio } = await supabaseAdmin
    .from('portfolios')
    .select('id')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (!portfolio) {
    return NextResponse.json({ error: '组合不存在' }, { status: 404 });
  }

  const { data, error } = await supabaseAdmin
    .from('positions')
    .select('*')
    .eq('portfolio_id', id)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ positions: data });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = await getCurrentUserId();

  const { data: portfolio } = await supabaseAdmin
    .from('portfolios')
    .select('id')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (!portfolio) {
    return NextResponse.json({ error: '组合不存在' }, { status: 404 });
  }

  const body: CreatePositionInput = await req.json();

  if (!body.symbol || !body.asset_class || !body.valuation_method ||
      !body.initial_quantity || !body.initial_price || !body.trade_date) {
    return NextResponse.json({ error: '缺少必填字段' }, { status: 400 });
  }

  const { data: position, error: positionError } = await supabaseAdmin
    .from('positions')
    .insert({
      portfolio_id: id,
      symbol: body.symbol,
      asset_class: body.asset_class,
      valuation_method: body.valuation_method,
      region: body.region ?? null,
      sector: body.sector ?? null,
      entry_thesis: body.entry_thesis ?? null,
      target_price: body.target_price ?? null,
      stop_loss_price: body.stop_loss_price ?? null,
      annual_rate: body.annual_rate ?? null,
      quantity: 0,
      avg_cost: 0,
      current_price: body.initial_price,
      last_valued_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (positionError || !position) {
    return NextResponse.json({ error: positionError?.message }, { status: 500 });
  }

  const { error: txError } = await supabaseAdmin.from('transactions').insert({
    position_id: position.id,
    portfolio_id: id,
    type: 'buy',
    trade_date: body.trade_date,
    quantity: body.initial_quantity,
    price: body.initial_price,
  });

  if (txError) {
    return NextResponse.json({ error: txError.message }, { status: 500 });
  }

  const { data: updatedPosition, error: updateError } = await supabaseAdmin
    .from('positions')
    .update({
      quantity: body.initial_quantity,
      avg_cost: body.initial_price,
    })
    .eq('id', position.id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ position: updatedPosition }, { status: 201 });
}