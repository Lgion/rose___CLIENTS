import React from 'react';
import { Phone } from 'lucide-react';

export default function WhatsAppFloat() {
  return (
    <a
      href="https://wa.me/2250700000000?text=Bonjour%20Maison%20ROSE,%20je%20souhaite%20des%20informations%20sur%20vos%20sacs%20de%20luxe."
      target="_blank"
      rel="noreferrer"
      style={{
        position: 'fixed',
        bottom: '30px',
        left: '30px',
        zIndex: 90,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: '#25D366',
        color: '#FFFFFF',
        padding: '12px 20px',
        borderRadius: '999px',
        boxShadow: '0 10px 25px rgba(37, 211, 102, 0.4)',
        textDecoration: 'none',
        fontWeight: '700',
        fontSize: '0.88rem',
        transition: 'var(--transition-smooth)'
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px) scale(1.04)'}
      onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
    >
      <Phone size={20} />
      <span className="desktop-only">Conciergerie WhatsApp</span>
    </a>
  );
}
