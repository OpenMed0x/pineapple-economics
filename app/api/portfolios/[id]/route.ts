import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { getCurrentUserId } from '@/lib/auth/getCurrentUserId';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = await getCurrentUserId();

  const { data: portfolio, error: portfolioError } = await supabaseAdmin
    .from('portfolios')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (portfolioError || !portfolio) {
    return NextResponse.json({ error: '组合不存在' }, { status: 404 });
  }

  const { data: positions, error: positionsError } = await supabaseAdmin
    .from('positions')
    .select('*')
    .eq('portfolio_id', id)
    .order('created_at', { ascending: false });

  if (positionsError) {
    return NextResponse.json({ error: positionsError.message }, { status: 500 });
  }

  const { data: latestSnapshot } = await supabaseAdmin
    .from('portfolio_snapshots')
    .select('*')
    .eq('portfolio_id', id)
    .order('snapshot_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  return NextResponse.json({ portfolio, positions, latestSnapshot });
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = await getCurrentUserId();
  const body = await req.json();
  const { initial_capital, user_id, id: _id, created_at, ...allowedFields } = body;

  const { data, error } = await supabaseAdmin
    .from('portfolios')
    .update(allowedFields)
    .eq('id', id)
    .eq('user_id', userId)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ portfolio: data });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const userId = await getCurrentUserId();

  const { error } = await supabaseAdmin
    .from('portfolios')
    .delete()
    .eq('id', id)
    .eq('user_id', userId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}