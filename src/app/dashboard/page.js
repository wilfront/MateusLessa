'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './dashboard.css';

import PainelFotos from './components/PainelFotos';
import PainelVideos from './components/PainelVideos';
import PainelAgenda from './components/PainelAgenda';

export default function Dashboard() {
  const [aba, setAba] = useState('fotos');

  const abaAtual = () => {
    switch (aba) {
      case 'fotos':
        return <PainelFotos />;
      case 'videos':
        return <PainelVideos />;
      case 'agenda':
        return <PainelAgenda />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Painel do Administrador</h1>

      <div className="dashboard-tabs">
        {['fotos', 'videos', 'agenda'].map((tab) => (
          <button
            key={tab}
            className={`dashboard-tab ${aba === tab ? 'active' : ''}`}
            onClick={() => setAba(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="dashboard-panel">
        <AnimatePresence mode="wait">
          <motion.div
            key={aba}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {abaAtual()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
