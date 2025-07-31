'use client';

import { useEffect, useState } from 'react';
import './PainelVideos.css';

export default function PainelVideos() {
  const [videos, setVideos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [uploading, setUploading] = useState(false);
  const porPagina = 6;

  useEffect(() => {
    buscarVideos();
  }, []);

  async function buscarVideos() {
    const res = await fetch('/api/videos');
    const data = await res.json();
    setVideos(data);
  }

  async function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/video/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (data.secure_url) {
      await fetch('/api/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: data.secure_url })
      });
      buscarVideos();
    } else {
      alert('Erro ao enviar vídeo');
    }

    setUploading(false);
  }

  async function handleDelete(id) {
    if (!window.confirm('Tem certeza que deseja excluir este vídeo?')) return;

    const res = await fetch('/api/videos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      buscarVideos();
    } else {
      alert('Erro ao excluir');
    }
  }

  const videosExibidos = videos.slice(0, pagina * porPagina);

  return (
    <div className='dashboard-videos'>
      <h2>Vídeos</h2>

      <input
        type="file"
        accept="video/*"
        onChange={handleUpload}
        disabled={uploading}
        className="upload-input"
      />
      {uploading && <p className="upload-status">Enviando vídeo...</p>}

      <div className="videos-grid">
        {videosExibidos.map((video) => (
          <div key={video.id} className="video-item">
            <video
              src={video.url}
              controls
              preload="metadata"
              poster={video.url.replace('/upload/', '/upload/so_1/').replace('.mp4', '.jpg')}
            />
            <button className="delete-btn" onClick={() => handleDelete(video.id)} aria-label="Excluir vídeo">×</button>
          </div>
        ))}
      </div>

      {videos.length > porPagina && (
        <button
          className="ver-mais"
          onClick={() => {
            if (pagina * porPagina >= videos.length) {
              setPagina(1); // voltar ao início
            } else {
              setPagina(pagina + 1); // ver mais
            }
          }}
        >
          {pagina * porPagina >= videos.length ? 'Ver Menos' : 'Ver Mais'}
        </button>
      )}
    </div>
  );
}
