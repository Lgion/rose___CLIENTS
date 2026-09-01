import React from 'react';
import { Star, Quote, CheckCircle } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      id: 1,
      author: 'Aminata K.',
      location: 'Abidjan / Paris',
      rating: 5,
      date: '28 Août 2026',
      title: 'Une qualité digne des plus grandes maisons',
      content: 'J’ai reçu le sac Pourpre Impérial en début de semaine. Le toucher du cuir et l’éclat du fermoir doré sont tout simplement spectaculaires. Je reçois des compliments à chaque sortie !',
      productName: 'Le Pourpre Impérial'
    },
    {
      id: 2,
      author: 'Clarisse D.',
      location: 'Dakar / Genève',
      rating: 5,
      date: '14 Août 2026',
      title: 'Le Bogolan Noir est une merveille',
      content: 'Commande reçue rapidement. Le sac est très bien structuré, parfait pour mes rendez-vous d’affaires. La touche wax lui donne un charme irrésistible.',
      productName: 'Le Bogolan Signature'
    },
    {
      id: 3,
      author: 'Sophie L.',
      location: 'Bruxelles',
      rating: 5,
      date: '02 Août 2026',
      title: 'Service client très réactif sur WhatsApp',
      content: 'J’hésitais sur la taille, la conciergerie ROSE m’a envoyé une vidéo détaillée du sac avant mon achat. Une expérience d’achat sur-mesure d’une élégance rare.',
      productName: 'Le Cabas Anses Bois'
    }
  ];

  return (
    <section id="avis" style={{ padding: '90px 0', background: '#F6F2EA' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px auto' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: '700', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#D4AF37' }}>
            Témoignages & Expérience Client
          </span>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#120E0C', marginTop: '8px' }}>
            Ce que disent nos Clientes
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {reviews.map(rev => (
            <div
              key={rev.id}
              style={{
                background: '#FFFFFF',
                borderRadius: 'var(--radius-md)',
                padding: '30px',
                boxShadow: 'var(--shadow-sm)',
                border: '1px solid rgba(110, 103, 95, 0.12)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              <Quote size={32} color="rgba(212,175,55,0.25)" style={{ position: 'absolute', top: '24px', right: '24px' }} />

              <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#D4AF37" color="#D4AF37" />
                ))}
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: '#120E0C', marginBottom: '10px' }}>
                "{rev.title}"
              </h3>

              <p style={{ fontSize: '0.92rem', color: '#4A433D', lineHeight: '1.6', flex: 1, marginBottom: '20px' }}>
                {rev.content}
              </p>

              <div style={{ paddingTop: '16px', borderTop: '1px solid rgba(110,103,95,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', color: '#120E0C' }}>{rev.author}</span>
                  <span style={{ fontSize: '0.75rem', color: '#6E675F' }}>{rev.location} • {rev.date}</span>
                </div>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#137333', fontWeight: '700' }}>
                  <CheckCircle size={13} /> Achat Vérifié
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
