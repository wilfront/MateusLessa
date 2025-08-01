'use client'
import React, { useState } from 'react'
import './Header.css'
import Link from 'next/link'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="header">
        <a className='logo' href="/">
          <img src="/imagens/logo.png" alt="logo" />
        </a>

        {/* Menu horizontal - desktop */}
        <nav className="menu-desktop">
          <ul className='menu-list'>
            <li><Link href='/'>Home</Link></li>
            <li><Link href='/biografia'>Biografia</Link></li>
            <li><Link href='/agenda'>Agenda</Link></li>
            <li><Link href='/fotos'>Fotos</Link></li>
            <li><Link href='/videos'>Vídeos</Link></li>
            <li><Link href='/contato'>Contato</Link></li>
          </ul>
        </nav>

        {/* Botão hambúrguer visível no mobile quando fechado */}
        {!menuOpen && (
          <button
            className="hamburguer-btn"
            onClick={toggleMenu}
            aria-label="Abrir menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}
      </header>

      {/* Menu lateral mobile */}
      <nav className={`sidebar ${menuOpen ? 'sidebar-open' : ''}`}>
        {/* Botão X dentro do menu */}
        <button
          className="hamburguer-btn open"
          onClick={toggleMenu}
          aria-label="Fechar menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className='sidebar-menu'>
          <li><Link href='/' onClick={closeMenu}>Home</Link></li>
          <li><Link href='/biografia' onClick={closeMenu}>Biografia</Link></li>
          <li><Link href='/agenda' onClick={closeMenu}>Agenda</Link></li>
          <li><Link href='/fotos' onClick={closeMenu}>Fotos</Link></li>
          <li><Link href='/videos' onClick={closeMenu}>Vídeos</Link></li>
          <li><Link href='/contato' onClick={closeMenu}>Contato</Link></li>
        </ul>
      </nav>

      {/* Overlay para fechar clicando fora */}
      {menuOpen && <div className="overlay" onClick={closeMenu}></div>}
    </>
  )
}
