'use client';

import { useState, useEffect } from 'react';
import './PainelAgenda.css';

export default function PainelAgenda() {
  const [eventos, setEventos] = useState([]);
  const [cidade, setCidade] = useState('');
  const [dataEvento, setDataEvento] = useState('');
  const [local, setLocal] = useState('');
  const [horario, setHorario] = useState('');
  const [msg, setMsg] = useState({ texto: '', tipo: '' }); // tipo: 'sucesso' ou 'erro'

  useEffect(() => {
    fetchEventos();
  }, []);

  async function fetchEventos() {
    try {
      const res = await fetch('/api/agenda');
      if (!res.ok) throw new Error('Erro ao carregar eventos');
      const data = await res.json();
      setEventos(data);
      setMsg({ texto: '', tipo: '' });
    } catch {
      setMsg({ texto: 'Erro ao carregar eventos', tipo: 'erro' });
    }
  }

  async function handleAdicionar(e) {
    e.preventDefault();

    if (!cidade || !dataEvento || !local || !horario) {
      setMsg({ texto: 'Preencha todos os campos', tipo: 'erro' });
      return;
    }

    try {
      const res = await fetch('/api/agenda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cidade, data_evento: dataEvento, local, horario }),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.error || 'Erro ao adicionar evento');

      setMsg({ texto: 'Evento adicionado!', tipo: 'sucesso' });
      setCidade('');
      setDataEvento('');
      setLocal('');
      setHorario('');
      fetchEventos();
    } catch (error) {
      setMsg({ texto: error.message, tipo: 'erro' });
    }
  }

  async function handleDeletar(id) {
    if (!confirm('Confirma excluir este evento?')) return;

    try {
      const res = await fetch(`/api/agenda?id=${id}`, { method: 'DELETE' });
      const json = await res.json();

      if (!res.ok) throw new Error(json.error || 'Erro ao deletar evento');

      setMsg({ texto: 'Evento deletado!', tipo: 'sucesso' });
      fetchEventos();
    } catch (error) {
      setMsg({ texto: error.message, tipo: 'erro' });
    }
  }

  // Formata data no formato local (ex: 31/07/2025)
  function formatarData(dataStr) {
    try {
      const data = new Date(dataStr);
      return new Intl.DateTimeFormat('pt-BR').format(data);
    } catch {
      return dataStr;
    }
  }

  return (
    <div className="dashboard-painel agenda-painel">
      <h2>Gerenciar Agenda</h2>

      {msg.texto && (
        <p className={`msg ${msg.tipo === 'erro' ? 'msg-erro' : 'msg-sucesso'}`}>
          {msg.texto}
        </p>
      )}

      <form onSubmit={handleAdicionar} className="agenda-form">
        <input
          type="text"
          placeholder="Cidade"
          value={cidade}
          onChange={e => setCidade(e.target.value)}
          required
        />
        <input
          type="date"
          value={dataEvento}
          onChange={e => setDataEvento(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Local"
          value={local}
          onChange={e => setLocal(e.target.value)}
          required
        />
        <input
          type="time"
          value={horario}
          onChange={e => setHorario(e.target.value)}
          required
        />
        <button type="submit" className="btn-adicionar">Adicionar Evento</button>
      </form>

      <ul className="lista-eventos">
        {eventos.length === 0 && <li>Nenhum evento cadastrado.</li>}

        {eventos.map(ev => (
          <li key={ev.id} className="evento-item">
            <div className="evento-info">
              <span className="evento-cidade">{ev.cidade}</span> —{' '}
              <span className="evento-data">{formatarData(ev.data_evento)}</span> —{' '}
              <span className="evento-local">{ev.local}</span> —{' '}
              <span className="evento-horario">{ev.horario}</span>
            </div>
            <button
              className="btn-excluir"
              onClick={() => handleDeletar(ev.id)}
              aria-label={`Excluir evento em ${ev.cidade} no dia ${formatarData(ev.data_evento)}`}
              title="Excluir evento"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
