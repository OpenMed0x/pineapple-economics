import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { rowToDTO, ResearchRecordRow } from '@/types/db';

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category');
  const subItem = req.nextUrl.searchParams.get('subItem');

  let query = supabaseAdmin
    .from('research_records')
    .select('*')
    .order('created_at', { ascending: false });

  if (category) query = query.eq('category', category);
  if (subItem) query = query.eq('sub_item', subItem);

  const { data, error } = await query;

  if (error) {
    console.error('[GET /api/research] Supabase error:', error);
    return NextResponse.json({ error: error.message, details: error }, { status: 500 });
  }

  const records = (data as ResearchRecordRow[]).map(rowToDTO);
  return NextResponse.json(records);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.category || !body.title || !body.data) {
    return NextResponse.json({ error: 'category, title, data 为必填' }, { status: 400 });
  }

  const { data, error } = await supabaseAdmin
    .from('research_records')
    .insert({
      category: body.category,
      sub_item: body.subItem ?? null,
      title: body.title,
      data: body.data,
    })
    .select()
    .single();

  if (error) {
    console.error('[POST /api/research] Supabase error:', error);
    return NextResponse.json({ error: error.message, details: error }, { status: 500 });
  }

  return NextResponse.json(rowToDTO(data as ResearchRecordRow));
}