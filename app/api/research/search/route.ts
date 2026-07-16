import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { rowToDTO, ResearchRecordRow } from '@/types/db';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q');
  if (!q || !q.trim()) {
    return NextResponse.json([]);
  }

  const { data, error } = await supabaseAdmin
    .from('research_records')
    .select('*')
    .or(`title.ilike.%${q}%,category.ilike.%${q}%,sub_item.ilike.%${q}%`)
    .order('created_at', { ascending: false })
    .limit(20);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const records = (data as ResearchRecordRow[]).map(rowToDTO);
  return NextResponse.json(records);
}