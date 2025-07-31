'use client';

import { useEffect, useState } from 'react';
import './PainelFotos.css';

export default function PainelFotos() {
  const [fotos, setFotos] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [pagina, setPagina] = useState(1);
  const porPagina = 6; // quantas fotos mostrar por página

  useEffect(() => {
    buscarFotos();
  }, []);

  async function buscarFotos() {
    const res = await fetch('/api/fotos');
    const data = await res.json();
    setFotos(data);
  }

  async function handleUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (data.secure_url) {
      await fetch('/api/fotos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: data.secure_url }),
      });
      buscarFotos();
    } else {
      alert('Erro ao enviar imagem');
    }

    setUploading(false);
  }

  async function handleDelete(id) {
    const confirm = window.confirm('Tem certeza que deseja excluir esta foto?');
    if (!confirm) return;

    const res = await fetch('/api/fotos', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      buscarFotos();
    } else {
      alert('Erro ao excluir');
    }
  }

  // Fotos exibidas controladas pela paginação
  const fotosExibidas = fotos.slice(0, pagina * porPagina);

  return (
    <div className="dashboard-fotos">
      <h2>Fotos</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        disabled={uploading}
        className="upload-input"
      />
      {uploading && <p className="upload-status">Enviando...</p>}

      <div className="fotos-galeria">
        {fotosExibidas.map((foto) => (
          <div key={foto.id} className="foto-card">
            <img src={foto.url} alt="foto" />
            <button
              onClick={() => handleDelete(foto.id)}
              className="btn-excluir-foto"
              aria-label="Excluir foto"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Botões Ver Mais / Ver Menos */}
      {fotos.length > porPagina && (
        <button
          className="ver-mais"
          onClick={() => {
            if (pagina * porPagina >= fotos.length) {
              setPagina(1); // volta ao início (ver menos)
            } else {
              setPagina(pagina + 1); // ver mais
            }
          }}
        >
          {pagina * porPagina >= fotos.length ? 'Ver Menos' : 'Ver Mais'}
        </button>
      )}
    </div>
  );
}
