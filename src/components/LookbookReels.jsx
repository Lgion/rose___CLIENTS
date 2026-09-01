import React, { useState } from 'react';
import { REELS } from '../data/lookbook';
import { Play, Volume2, VolumeX, Sparkles, X, ArrowRight, Eye } from 'lucide-react';

export default function LookbookReels({ onSelectProduct }) {
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  return (
    <section id="lookbook" style={{ padding: '90px 0', background: '#120E0C', color: '#FDFBF7' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 60px auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '999px',
            background: 'rgba(212, 175, 55, 0.15)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            color: '#E6C875',
            fontSize: '0.78rem',
            fontWeight: '700',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            <Sparkles size={14} color="#D4AF37" />
            <span>Le Studio & Catwalk Vidéo</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.2rem, 4vw, 3.4rem)',
            fontWeight: '700',
            color: '#FFFFFF',
            marginBottom: '16px'
          }}>
            La Collection en Mouvement
          </h2>

          <p style={{ fontSize: '1.05rem', color: '#A39B92', lineHeight: '1.6' }}>
            Découvrez la souplesse du cuir, les reflets satinés de la bijouterie et la richesse des textures à travers nos capsules vidéo haute définition.
          </p>
        </div>

        {/* Video Reels Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {REELS.map(reel => (
            <div
              key={reel.id}
              onClick={() => setActiveVideo(reel)}
              style={{
                position: 'relative',
                aspectRatio: '9/16',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: '#1C1613',
                cursor: 'pointer',
                border: '1px solid rgba(212, 175, 55, 0.2)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                transition: 'var(--transition-smooth)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
              {/* Preview Video Loop */}
              <video
                autoPlay
                loop
                muted
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'brightness(0.9)'
                }}
              >
                <source src={reel.video} type="video/mp4" />
              </video>

              {/* Dark Gradient Overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(18,14,12,0.95) 0%, rgba(18,14,12,0.2) 60%, rgba(18,14,12,0.4) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '20px'
              }}>
                {/* Top Badge Tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '999px',
                    background: 'rgba(212, 175, 55, 0.2)',
                    backdropFilter: 'blur(8px)',
                    color: '#E6C875',
                    fontSize: '0.68rem',
                    fontWeight: '700',
                    border: '1px solid rgba(212,175,55,0.4)'
                  }}>
                    {reel.tags[0]}
                  </span>

                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(212, 175, 55, 0.9)',
                    color: '#120E0C',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Play size={16} fill="#120E0C" />
                  </div>
                </div>

                {/* Bottom Info */}
                <div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '4px' }}>
                    {reel.title}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#D8D2C9', marginBottom: '12px' }}>
                    {reel.subtitle}
                  </p>

                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: '#E6C875'
                  }}>
                    <Eye size={14} />
                    <span>Voir le sac : {reel.productName}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Reel Video Modal */}
      {activeVideo && (
        <div className="modal-overlay" onClick={() => setActiveVideo(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: '480px',
              width: '100%',
              aspectRatio: '9/16',
              maxHeight: '90vh',
              background: '#000000',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
              border: '1px solid #D4AF37'
            }}
          >
            {/* Close Modal */}
            <button
              onClick={() => setActiveVideo(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                zIndex: 20,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.7)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={22} />
            </button>

            {/* Mute/Unmute Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                zIndex: 20,
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'rgba(0,0,0,0.7)',
                color: '#E6C875',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>

            {/* Main Reel Video Player */}
            <video
              autoPlay
              loop
              muted={isMuted}
              controls
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            >
              <source src={activeVideo.video} type="video/mp4" />
            </video>

            {/* Bottom Floating Card Overlay */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '16px',
              right: '16px',
              background: 'rgba(18, 14, 12, 0.9)',
              backdropFilter: 'blur(16px)',
              padding: '16px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid rgba(212,175,55,0.4)',
              color: '#FFF'
            }}>
              <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', marginBottom: '4px' }}>
                {activeVideo.title}
              </h4>
              <p style={{ fontSize: '0.8rem', color: '#A39B92', marginBottom: '12px' }}>
                {activeVideo.subtitle}
              </p>

              <button
                onClick={() => {
                  const prod = onSelectProduct(activeVideo.productId);
                  setActiveVideo(null);
                }}
                className="btn-gold"
                style={{ width: '100%', padding: '10px', fontSize: '0.85rem' }}
              >
                <span>Découvrir le sac {activeVideo.productName}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
