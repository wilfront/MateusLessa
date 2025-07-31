import supabase from '@/lib/supabase';
import './agenda.css';
import AgendaLista from './AgendaLista';

export default async function AgendaPage() {
  const { data: eventos, error } = await supabase
    .from('agenda')
    .select('*')
    .order('id', { ascending: true });

  if (error) {
    return (
      <main className="agenda-page">
        <h1>Agenda de Shows</h1>
        <p>Erro ao carregar agenda.</p>
      </main>
    );
  }

  return (
    <main className="agenda-page">
      <div className="agenda-container">
        <AgendaLista eventos={eventos} />
      </div>
    </main>
  );
}
