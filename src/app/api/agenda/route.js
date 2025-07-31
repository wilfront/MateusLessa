import supabase from '@/lib/supabase'

export async function GET() {
  const { data, error } = await supabase
    .from('agenda')
    .select('*')
    .order('data_evento', { ascending: true })

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }

  return new Response(JSON.stringify(data), { status: 200 })
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { cidade, data_evento, local, horario } = body

    if (!cidade || !data_evento || !local || !horario) {
      return new Response(JSON.stringify({ error: 'Campos obrigatórios faltando' }), { status: 400 })
    }

    const { data, error } = await supabase
      .from('agenda')
      .insert([{ cidade, data_evento, local, horario }])

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }

    return new Response(JSON.stringify(data), { status: 201 })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Erro no servidor' }), { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return new Response(JSON.stringify({ error: 'ID é obrigatório' }), { status: 400 })
    }

    const { data, error } = await supabase
      .from('agenda')
      .delete()
      .eq('id', id)

    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 500 })
    }

    return new Response(JSON.stringify({ message: 'Evento deletado' }), { status: 200 })
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Erro no servidor' }), { status: 500 })
  }
}
