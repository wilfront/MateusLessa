'use client';

import React from 'react';
import './Footer.css';
import { BsThreads } from 'react-icons/bs';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <a href="https://portfolio-wilfront.vercel.app/" className="footer-link">
          © {new Date().getFullYear()} @wilfront - Todos os direitos reservados.
        </a>

        <div className="footer-socials">
          <a
            href="https://www.facebook.com/groups/505651276730195"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="footer-link"
          >
            <FaFacebook size={22} />
          </a>
          <a
            href="https://www.instagram.com/cantormateuslessa.oficial/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="footer-link"
          >
            <FaInstagram size={22} />
          </a>
          <a
            href="https://www.threads.com/@cantormateuslessa.oficial"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Threads"
            className="footer-link"
          >
            <BsThreads size={22} />
          </a>
        </div>
      </div>
    </footer>
  );
}
