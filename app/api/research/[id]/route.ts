import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { rowToDTO, ResearchRecordRow } from '@/types/db';

// 1. 修改 GET 方法
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> } // 👈 类型改为 Promise
) {
  const { id } = await params; // 👈 使用前先 await 解包

  const { data, error } = await supabaseAdmin
    .from('research_records')
    .select('*')
    .eq('id', id) // 👈 替换为解包后的 id
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  return NextResponse.json(rowToDTO(data as ResearchRecordRow));
}

// 2. 修改 PATCH 方法
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> } // 👈 类型改为 Promise
) {
  const { id } = await params; // 👈 使用前先 await 解包
  const body = await req.json();

  const updatePayload: Record<string, unknown> = {};
  if (body.title !== undefined) updatePayload.title = body.title;
  if (body.data !== undefined) updatePayload.data = body.data;
  if (body.subItem !== undefined) updatePayload.sub_item = body.subItem;

  const { data, error } = await supabaseAdmin
    .from('research_records')
    .update(updatePayload)
    .eq('id', id) // 👈 替换为解包后的 id
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(rowToDTO(data as ResearchRecordRow));
}

// 3. 修改 DELETE 方法
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> } // 👈 类型改为 Promise
) {
  const { id } = await params; // 👈 使用前先 await 解包

  const { error } = await supabaseAdmin
    .from('research_records')
    .delete()
    .eq('id', id); // 👈 替换为解包后的 id

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}