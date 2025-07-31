'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import './agenda.css';

export default function AgendaLista({ eventos }) {
  const [mostrarTodos, setMostrarTodos] = useState(false);

  const handleToggle = () => {
    setMostrarTodos(!mostrarTodos);
  };

  const eventosExibidos = mostrarTodos ? eventos : eventos.slice(0, 2);

  return (
    <motion.div
      className="agenda-lista"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1>Agenda</h1>
      <h4>
        Confira a agenda de <strong>Matheus Lessa</strong> e fique por dentro da programação
      </h4>

      {eventosExibidos.map((ev, index) => (
        <motion.div
          className="evento"
          key={ev.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <h3>{ev.cidade}</h3>
          <p>{ev.data_evento?.split('-').reverse().join('/')}</p>
          <p>{ev.local}</p>
          <p>{ev.horario}</p>
        </motion.div>
      ))}

      {eventos.length > 2 && (
        <motion.button
          onClick={handleToggle}
          className="btn-toggle"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {mostrarTodos ? 'Ver menos' : 'Ver mais'}
        </motion.button>
      )}
    </motion.div>
  );
}
