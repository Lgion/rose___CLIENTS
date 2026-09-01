import React from 'react';
import { Sparkles, Phone, Mail, MapPin, Instagram, Facebook, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#120E0C', color: '#FDFBF7', borderTop: '1px solid rgba(212, 175, 55, 0.25)', paddingTop: '80px', paddingBottom: '40px' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '60px'
        }}>
          {/* Col 1: Brand Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a href="#" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: '700', letterSpacing: '0.18em', color: '#FFF' }}>
                R O S E
              </span>
              <span style={{ fontSize: '0.65rem', fontWeight: '600', letterSpacing: '0.28em', color: '#D4AF37' }}>
                HAUTE MAROQUINERIE
              </span>
            </a>

            <p style={{ fontSize: '0.88rem', color: '#A39B92', lineHeight: '1.6' }}>
              L'excellence du cuir noble alliée à la magie des textiles d'art africains. Des pièces uniques confectionnées pour sublimer votre élégance au quotidien.
            </p>

            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
              <a href="#" style={{ padding: '10px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', color: '#E6C875' }}>
                <Instagram size={18} />
              </a>
              <a href="#" style={{ padding: '10px', borderRadius: '50%', background: 'rgba(212,175,55,0.1)', color: '#E6C875' }}>
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#E6C875', marginBottom: '8px' }}>
              Navigation
            </h4>
            {['Accueil', 'Collection Des Sacs', 'Le Studio Vidéo', 'Notre Savoir-Faire', 'Avis Clients'].map((link, idx) => (
              <a key={idx} href={`#${['hero', 'catalogue', 'lookbook', 'histoire', 'avis'][idx]}`} style={{ fontSize: '0.88rem', color: '#A39B92', textDecoration: 'none' }}>
                {link}
              </a>
            ))}
          </div>

          {/* Col 3: Customer Concierge */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#E6C875', marginBottom: '8px' }}>
              Conciergerie & Contact
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#A39B92' }}>
              <Phone size={16} color="#D4AF37" />
              <span>+225 07 00 00 00 00</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#A39B92' }}>
              <Mail size={16} color="#D4AF37" />
              <span>contact@maison-rose.com</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem', color: '#A39B92' }}>
              <MapPin size={16} color="#D4AF37" />
              <span>Boutique & Showroom Luxe</span>
            </div>
          </div>

          {/* Col 4: VIP Newsletter */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#E6C875', marginBottom: '8px' }}>
              Club VIP Maison ROSE
            </h4>
            <p style={{ fontSize: '0.85rem', color: '#A39B92' }}>
              Recevez en avant-première les alertes pour nos pièces uniques et éditions limitées.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Merci pour votre inscription au Club VIP ROSE !'); }} style={{ display: 'flex', gap: '6px' }}>
              <input
                type="email"
                placeholder="Votre e-mail..."
                required
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '999px',
                  border: '1px solid rgba(212,175,55,0.3)',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#FFF',
                  fontSize: '0.82rem',
                  outline: 'none'
                }}
              />
              <button type="submit" className="btn-gold" style={{ padding: '10px 16px' }}>
                <ArrowRight size={16} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Rights */}
        <div style={{
          paddingTop: '30px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          textAlign: 'center',
          fontSize: '0.8rem',
          color: '#6E675F',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <span>© 2026 Maison ROSE Haute Maroquinerie. Tous droits réservés.</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>Mentions Légales</span>
            <span>Politique de Confidentialité</span>
            <span>Conditions Générales</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
