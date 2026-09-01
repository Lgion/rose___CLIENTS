import React, { useState, useEffect } from 'react';
import { ShoppingBag, Heart, Search, Menu, X, Phone, Sparkles } from 'lucide-react';

export default function Header({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  currency,
  setCurrency,
  searchQuery,
  setSearchQuery,
  activeSection,
  setActiveSection
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Banner Announcement */}
      <div style={{
        background: 'linear-gradient(90deg, #120E0C 0%, #4A121A 50%, #120E0C 100%)',
        color: '#E6C875',
        fontSize: '0.78rem',
        fontWeight: '600',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        padding: '8px 16px',
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        borderBottom: '1px solid rgba(212, 175, 55, 0.2)'
      }}>
        <Sparkles size={13} color="#D4AF37" />
        <span>Nouvelle Collection Wax & Leather 2026 — Livraison Offerte dès 50 000 FCFA / 75€</span>
        <Sparkles size={13} color="#D4AF37" />
      </div>

      {/* Main Header Bar */}
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        transition: 'all 0.35s ease',
        background: isScrolled ? 'rgba(253, 251, 247, 0.94)' : 'rgba(253, 251, 247, 0.85)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isScrolled ? '1px solid rgba(212, 175, 55, 0.25)' : '1px solid rgba(110, 103, 95, 0.12)',
        boxShadow: isScrolled ? '0 10px 30px rgba(28, 22, 19, 0.06)' : 'none'
      }}>
        <div className="container" style={{
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px'
        }}>
          {/* Left: Mobile Toggle & Brand Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{ display: 'flex', padding: '6px', color: '#1C1613' }}
              className="mobile-only"
              aria-label="Menu Mobile"
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>

            <a href="#" style={{ display: 'flex', flexDirection: 'column', textDecoration: 'none' }}>
              <span style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.95rem',
                fontWeight: '700',
                letterSpacing: '0.18em',
                lineHeight: 1,
                color: '#120E0C',
                textTransform: 'uppercase'
              }}>
                R O S E
              </span>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.62rem',
                fontWeight: '600',
                letterSpacing: '0.28em',
                color: '#D4AF37',
                textTransform: 'uppercase',
                marginTop: '3px'
              }}>
                HAUTE MAROQUINERIE
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            {[
              { id: 'hero', label: 'Accueil' },
              { id: 'catalogue', label: 'Collection' },
              { id: 'lookbook', label: 'Le Studio (Vidéos)' },
              { id: 'histoire', label: 'Savoir-Faire' },
              { id: 'avis', label: 'Avis Clients' }
            ].map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  color: activeSection === link.id ? '#D4AF37' : '#1C1613',
                  borderBottom: activeSection === link.id ? '2px solid #D4AF37' : '2px solid transparent',
                  padding: '6px 0',
                  transition: 'all 0.25s ease'
                }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Controls: Search, Currency, Wishlist, Cart */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Search Bar Input / Toggle */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              {searchOpen ? (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  background: '#FFFFFF',
                  border: '1px solid #D4AF37',
                  borderRadius: '999px',
                  padding: '4px 12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
                }}>
                  <Search size={16} color="#6E675F" />
                  <input
                    type="text"
                    placeholder="Rechercher un sac..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{
                      border: 'none',
                      outline: 'none',
                      padding: '6px 8px',
                      fontSize: '0.85rem',
                      width: '180px'
                    }}
                    autoFocus
                  />
                  <button onClick={() => setSearchOpen(false)} style={{ color: '#6E675F' }}>
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  style={{
                    padding: '8px',
                    borderRadius: '50%',
                    background: 'rgba(212, 175, 55, 0.08)',
                    color: '#1C1613',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Rechercher"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Currency Selector Toggle */}
            <div style={{
              display: 'flex',
              background: '#F6F2EA',
              padding: '3px',
              borderRadius: '999px',
              border: '1px solid rgba(110, 103, 95, 0.15)'
            }}>
              <button
                onClick={() => setCurrency('FCFA')}
                style={{
                  padding: '4px 9px',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  background: currency === 'FCFA' ? '#120E0C' : 'transparent',
                  color: currency === 'FCFA' ? '#E6C875' : '#6E675F'
                }}
              >
                FCFA
              </button>
              <button
                onClick={() => setCurrency('EUR')}
                style={{
                  padding: '4px 9px',
                  borderRadius: '999px',
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  background: currency === 'EUR' ? '#120E0C' : 'transparent',
                  color: currency === 'EUR' ? '#E6C875' : '#6E675F'
                }}
              >
                EUR (€)
              </button>
            </div>

            {/* Wishlist Icon */}
            <button
              onClick={onOpenWishlist}
              style={{
                position: 'relative',
                padding: '8px',
                borderRadius: '50%',
                background: 'rgba(212, 175, 55, 0.08)',
                color: '#1C1613',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Favoris"
            >
              <Heart size={20} color={wishlistCount > 0 ? '#4A121A' : '#1C1613'} fill={wishlistCount > 0 ? '#4A121A' : 'none'} />
              {wishlistCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  background: '#4A121A',
                  color: '#FFFFFF',
                  fontSize: '0.65rem',
                  fontWeight: '700',
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                borderRadius: '999px',
                background: 'linear-gradient(135deg, #120E0C 0%, #2A1F1B 100%)',
                color: '#E6C875',
                boxShadow: '0 4px 14px rgba(18, 14, 12, 0.15)',
                fontWeight: '600',
                fontSize: '0.85rem'
              }}
            >
              <ShoppingBag size={18} color="#D4AF37" />
              <span>Panier</span>
              {cartCount > 0 && (
                <span style={{
                  background: '#D4AF37',
                  color: '#120E0C',
                  fontSize: '0.7rem',
                  fontWeight: '800',
                  padding: '2px 7px',
                  borderRadius: '999px'
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div style={{
            background: '#FDFBF7',
            borderTop: '1px solid var(--border-gold)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            {[
              { id: 'hero', label: 'Accueil' },
              { id: 'catalogue', label: 'Collection Des Sacs' },
              { id: 'lookbook', label: 'Le Studio Vidéo' },
              { id: 'histoire', label: 'Notre Savoir-Faire' },
              { id: 'avis', label: 'Témoignages Clients' }
            ].map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                style={{
                  textAlign: 'left',
                  fontSize: '1rem',
                  fontWeight: '600',
                  color: '#120E0C',
                  padding: '8px 0',
                  borderBottom: '1px solid rgba(110, 103, 95, 0.1)'
                }}
              >
                {link.label}
              </button>
            ))}

            <a
              href="https://wa.me/2250700000000?text=Bonjour%20Maison%20ROSE,%20je%20souhaite%20des%20informations%20sur%20vos%20sacs."
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
              style={{ marginTop: '10px' }}
            >
              <Phone size={16} />
              <span>Contacter la Conciergerie</span>
            </a>
          </div>
        )}
      </header>

      {/* Responsive Inline CSS overrides */}
      <style>{`
        @media (max-width: 900px) {
          .desktop-only { display: none !important; }
        }
        @media (min-width: 901px) {
          .mobile-only { display: none !important; }
        }
      `}</style>
    </>
  );
}
