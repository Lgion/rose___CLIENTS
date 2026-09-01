import React, { useState, useRef } from 'react';
import { Play, Volume2, VolumeX, ArrowRight, Sparkles, ShieldCheck, Award, Truck } from 'lucide-react';

export default function Hero({ onExploreClick, onLookbookClick }) {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section id="hero" style={{
      position: 'relative',
      minHeight: '88vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      background: '#120E0C',
      color: '#FFFFFF'
    }}>
      {/* Background Video Loop */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.42,
          filter: 'contrast(1.1) brightness(0.85)'
        }}
      >
        <source src="./sacs/video-presentation-collection.mp4" type="video/mp4" />
      </video>

      {/* Luxury Gradient Dark Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at center, rgba(18,14,12,0.3) 0%, rgba(18,14,12,0.85) 100%)',
        pointerEvents: 'none'
      }} />

      {/* Video Audio Control Floating Button */}
      <button
        onClick={toggleMute}
        style={{
          position: 'absolute',
          bottom: '120px',
          right: '30px',
          zIndex: 10,
          background: 'rgba(255,255,255,0.15)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(212,175,55,0.4)',
          borderRadius: '50%',
          width: '46px',
          height: '46px',
          color: '#E6C875',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        title={isMuted ? "Activer le son" : "Désactiver le son"}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Hero Central Content */}
      <div className="container" style={{
        position: 'relative',
        zIndex: 5,
        textAlign: 'center',
        padding: '60px 20px',
        maxWidth: '900px'
      }}>
        {/* Luxury Tag */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 20px',
          borderRadius: '999px',
          background: 'rgba(212, 175, 55, 0.15)',
          border: '1px solid rgba(212, 175, 55, 0.4)',
          color: '#E6C875',
          fontSize: '0.82rem',
          fontWeight: '700',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '24px',
          animation: 'fadeIn 0.8s ease-out'
        }}>
          <Sparkles size={14} color="#D4AF37" />
          <span>Haute Maroquinerie & Prints d'Art</span>
        </div>

        {/* Main Title */}
        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)',
          fontWeight: '700',
          lineHeight: '1.12',
          letterSpacing: '-0.02em',
          marginBottom: '24px',
          color: '#FDFBF7'
        }}>
          L'Élégance Suprême du <span className="gold-gradient-text">Cuir & Wax Haute Couture</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
          color: '#D8D2C9',
          fontWeight: '300',
          lineHeight: '1.6',
          maxWidth: '720px',
          margin: '0 auto 36px auto'
        }}>
          Chaque création est une œuvre d'art unique façonnée à la main. Mariage d'exception entre cuirs nobles sélectionnées, estampes textiles traditionnelles et bijouterie dorée gravée.
        </p>

        {/* Call to Actions */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px'
        }}>
          <button onClick={onExploreClick} className="btn-gold">
            <span>Explorer la Collection</span>
            <ArrowRight size={18} />
          </button>
          
          <button onClick={onLookbookClick} className="btn-outline" style={{ color: '#FDFBF7', borderColor: 'rgba(255,255,255,0.4)' }}>
            <Play size={16} fill="#E6C875" color="#E6C875" />
            <span>Voir le Studio Vidéo</span>
          </button>
        </div>
      </div>

      {/* Bottom Feature Badges Bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(18, 14, 12, 0.85)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(212, 175, 55, 0.2)',
        padding: '16px 20px',
        zIndex: 5
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          color: '#E6C875',
          fontSize: '0.82rem',
          fontWeight: '600'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} color="#D4AF37" />
            <span>100% Cuir Véritable & Artisanat d'Art</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="#D4AF37" />
            <span>Pièces Uniques & Éditions Limitées</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Truck size={18} color="#D4AF37" />
            <span>Livraison Sécurisée avec Suivi</span>
          </div>
        </div>
      </div>
    </section>
  );
}
