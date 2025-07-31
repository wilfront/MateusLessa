import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

// GET - Lista vídeos
export async function GET() {
  const { data, error } = await supabase
    .from('midias')
    .select('*')
    .eq('tipo', 'video')
    .order('id', { ascending: false });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}

// POST - Cadastra novo vídeo
export async function POST(req) {
  const { url } = await req.json();

  const { error } = await supabase
    .from('midias')
    .insert([{ url, tipo: 'video' }]);

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true });
}

// DELETE - Exclui vídeo por ID
export async function DELETE(req) {
  const { id } = await req.json();

  const { error } = await supabase
    .from('midias')
    .delete()
    .eq('id', id);

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true });
}
