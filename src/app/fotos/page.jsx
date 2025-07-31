'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './fotos.css';

export default function FotosPage() {
  const [fotos, setFotos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const porPagina = 8;
  const [fotoAmpliada, setFotoAmpliada] = useState(null);

  useEffect(() => {
    async function fetchFotos() {
      const res = await fetch('/api/fotos');
      const data = await res.json();
      setFotos(data);
    }
    fetchFotos();
  }, []);

  const fotosExibidas = fotos.slice(0, pagina * porPagina);

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8 },
  };

  function togglePagina() {
    if (pagina * porPagina >= fotos.length) {
      setPagina(1);
    } else {
      setPagina(pagina + 1);
    }
  }

  function ampliarFoto(url) {
    setFotoAmpliada(url);
  }

  function fecharZoom() {
    setFotoAmpliada(null);
  }

  return (
    <div className="fotos-page">
      <h1>Fotos</h1>

      <motion.div
        className="fotos-grid"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence>
          {fotosExibidas.map((foto) => (
            <motion.div
              key={foto.id}
              className="foto-item"
              onClick={() => ampliarFoto(foto.url)}
              variants={itemVariants}
              initial="hidden"
              animate="show"
              exit="exit"
            >
              <motion.img
                src={foto.url}
                alt="Foto"
                className="foto-img"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {fotos.length > porPagina && (
        <div className="ver-mais-container">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ver-mais-btn"
            onClick={togglePagina}
          >
            {pagina * porPagina >= fotos.length ? 'Ver Menos' : 'Ver Mais'}
          </motion.button>
        </div>
      )}

      <AnimatePresence>
        {fotoAmpliada && (
          <motion.div
            className="overlay"
            onClick={fecharZoom}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src={fotoAmpliada}
              alt="Foto Ampliada"
              className="zoomed-foto"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
