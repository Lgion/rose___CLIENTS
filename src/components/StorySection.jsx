import React from 'react';
import { Award, Sparkles, Feather, ShieldCheck } from 'lucide-react';

export default function StorySection() {
  return (
    <section id="histoire" style={{ padding: '100px 0', background: '#FDFBF7' }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1fr) minmax(320px, 1fr)',
          gap: '60px',
          alignItems: 'center'
        }}>
          {/* Left Grid Images Showcase */}
          <div style={{ position: 'relative' }}>
            <div style={{
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-lg)',
              border: '2px solid rgba(212, 175, 55, 0.3)',
              aspectRatio: '4/5'
            }}>
              <img
                src="/sacs/sac-emeraude-wax-geometric.jpg"
                alt="Savoir faire ROSE"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Overlapping Secondary Image */}
            <div className="desktop-only" style={{
              position: 'absolute',
              bottom: '-30px',
              right: '-30px',
              width: '55%',
              aspectRatio: '1',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              border: '4px solid #FFFFFF'
            }}>
              <img
                src="/sacs/sac-bordeaux-dore-geometrique.jpg"
                alt="Finition Cuir et Or"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>

            {/* Floating Artisan Badge */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '-20px',
              background: 'rgba(18, 14, 12, 0.92)',
              backdropFilter: 'blur(12px)',
              border: '1px solid #D4AF37',
              color: '#E6C875',
              padding: '16px 24px',
              borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-gold)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <Award size={28} color="#D4AF37" />
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Artisanat d'Art</span>
                <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: '700', color: '#FFF' }}>Haute Couture</span>
              </div>
            </div>
          </div>

          {/* Right Brand Story Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.78rem',
              fontWeight: '700',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: '#D4AF37'
            }}>
              <Sparkles size={14} />
              <span>Notre Histoire & Philosophie</span>
            </div>

            <h2 style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
              lineHeight: '1.18',
              color: '#120E0C'
            }}>
              Sublimer le Patrimoine Textile à Travers la Maroquinerie de Luxe
            </h2>

            <p style={{ fontSize: '1.05rem', color: '#4A433D', lineHeight: '1.7' }}>
              La Maison <strong>ROSE</strong> est née d'une vision audacieuse : réinventer les codes de la haute maroquinerie internationale en célébrant la richesse inégalée du patrimoine textile africain.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(212,175,55,0.12)', padding: '10px', borderRadius: '50%', color: '#D4AF37' }}>
                  <Feather size={22} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#120E0C', marginBottom: '4px' }}>
                    Teintures Artisanales Wax & Batik
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#6E675F', lineHeight: '1.5' }}>
                    Chaque étoffe est teintée à la main selon des méthodes traditionnelles à la cire perdue et aux pigments naturels, garantissant des motifs d'une profondeur rare.
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ background: 'rgba(212,175,55,0.12)', padding: '10px', borderRadius: '50%', color: '#D4AF37' }}>
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#120E0C', marginBottom: '4px' }}>
                    Cuirs Pleine Fleur & Bijouterie Dorée
                  </h4>
                  <p style={{ fontSize: '0.9rem', color: '#6E675F', lineHeight: '1.5' }}>
                    Nous sélectionnons exclusivement des cuirs de bovin de premier choix et faisons forger nos fermoirs bijoux soleil en bronze doré résistant à l'usure du temps.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
