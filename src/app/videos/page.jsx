'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './videos.css';

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const porPagina = 7;

  useEffect(() => {
    async function fetchVideos() {
      const res = await fetch('/api/videos');
      const data = await res.json();
      setVideos(data);
    }
    fetchVideos();
  }, []);

  const videosExibidos = videos.slice(0, pagina * porPagina);

  function togglePagina() {
    if (pagina * porPagina >= videos.length) {
      setPagina(1); // Volta ao início
    } else {
      setPagina(pagina + 1); // Mostra mais
    }
  }

  return (
    <div className="videos-page">
      <h1>Vídeos</h1>

      <div className="videos-grid">
        {videosExibidos.map((video, index) => (
          <motion.video
            key={video.id}
            src={video.url}
            controls
            preload="metadata"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ scale: 1.05 }}
          />
        ))}
      </div>

      {videos.length > porPagina && (
        <div className="ver-mais-container">
          <button className="ver-mais-btn" onClick={togglePagina}>
            {pagina * porPagina >= videos.length ? 'Ver Menos' : 'Ver Mais'}
          </button>
        </div>
      )}
    </div>
  );
}
