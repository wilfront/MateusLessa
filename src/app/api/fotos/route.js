import { NextResponse } from 'next/server';
import supabase from '@/lib/supabase';

// GET: Lista todas as fotos
export async function GET() {
  const { data, error } = await supabase
    .from('midias')
    .select('*')
    .eq('tipo', 'foto')
    .order('id', { ascending: false });

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json(data);
}

// POST: Salva uma nova foto
export async function POST(req) {
  const { url } = await req.json();

  const { error } = await supabase
    .from('midias')
    .insert([{ url, tipo: 'foto' }]);

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true });
}

// DELETE: Remove uma foto pelo ID
export async function DELETE(req) {
  const { id } = await req.json();

  const { error } = await supabase
    .from('midias')
    .delete()
    .eq('id', id);

  if (error) return NextResponse.json({ error }, { status: 500 });
  return NextResponse.json({ success: true });
}
