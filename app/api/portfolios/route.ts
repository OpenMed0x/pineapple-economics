import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { getCurrentUserId } from '@/lib/auth/getCurrentUserId';
import type { CreatePortfolioInput } from '@/types/portfolio';

export async function GET() {
  const userId = await getCurrentUserId();

  const { data, error } = await supabaseAdmin
    .from('portfolios')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ portfolios: data });
}

export async function POST(req: NextRequest) {
  const userId = await getCurrentUserId();
  const body: CreatePortfolioInput = await req.json();

  if (!body.name || !body.positioning || !body.initial_capital) {
    return NextResponse.json(
      { error: '缺少必填字段：name, positioning, initial_capital' },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin
    .from('portfolios')
    .insert({
      user_id: userId,
      name: body.name,
      positioning: body.positioning,
      thesis: body.thesis ?? null,
      target_return: body.target_return ?? null,
      max_drawdown_tolerance: body.max_drawdown_tolerance ?? null,
      max_single_position_pct: body.max_single_position_pct ?? null,
      max_sector_pct: body.max_sector_pct ?? null,
      stop_loss_rule: body.stop_loss_rule ?? null,
      benchmark: body.benchmark ?? 'none',
      initial_capital: body.initial_capital,
      currency: body.currency ?? 'USD',
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ portfolio: data }, { status: 201 });
}