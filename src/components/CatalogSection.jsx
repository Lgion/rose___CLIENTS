import React, { useState } from 'react';
import { COLLECTIONS } from '../data/products';
import ProductCard from './ProductCard';
import { SlidersHorizontal, Search, Sparkles } from 'lucide-react';

export default function CatalogSection({
  products,
  currency,
  onQuickView,
  onAddToCart,
  wishlist,
  onToggleWishlist,
  searchQuery,
  setSearchQuery
}) {
  const [selectedCollection, setSelectedCollection] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  // Filter products by collection and search query
  let filteredProducts = products.filter(product => {
    const matchesCollection = selectedCollection === 'all' || product.collection === selectedCollection;
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.colorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCollection && matchesSearch;
  });

  // Sort products
  if (sortBy === 'price-low') {
    filteredProducts.sort((a, b) => a.priceFCFA - b.priceFCFA);
  } else if (sortBy === 'price-high') {
    filteredProducts.sort((a, b) => b.priceFCFA - a.priceFCFA);
  } else if (sortBy === 'rating') {
    filteredProducts.sort((a, b) => b.rating - a.rating);
  }

  return (
    <section id="catalogue" style={{ padding: '90px 0', background: '#FDFBF7' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '750px', margin: '0 auto 50px auto' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            fontWeight: '700',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#D4AF37',
            marginBottom: '12px'
          }}>
            <Sparkles size={14} />
            <span>Catalogue Officiel Maison ROSE</span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
            fontFamily: 'var(--font-serif)',
            fontWeight: '700',
            color: '#120E0C',
            marginBottom: '16px'
          }}>
            Nos Créations d'Exception
          </h2>

          <p style={{ fontSize: '1.05rem', color: '#6E675F', lineHeight: '1.6' }}>
            Découvrez nos sacs en cuir véritable sublimés par l'art textile Wax & Batik. Chaque pièce est confectionnée à la main avec une rigueur haute couture.
          </p>
        </div>

        {/* Collection Filter Tabs */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          marginBottom: '36px'
        }}>
          {COLLECTIONS.map(col => (
            <button
              key={col.id}
              onClick={() => setSelectedCollection(col.id)}
              style={{
                padding: '10px 22px',
                borderRadius: '999px',
                fontSize: '0.85rem',
                fontWeight: '600',
                letterSpacing: '0.02em',
                transition: 'var(--transition-smooth)',
                background: selectedCollection === col.id ? '#120E0C' : '#FFFFFF',
                color: selectedCollection === col.id ? '#E6C875' : '#1C1613',
                border: selectedCollection === col.id ? '1px solid #D4AF37' : '1px solid rgba(110, 103, 95, 0.18)',
                boxShadow: selectedCollection === col.id ? '0 8px 20px rgba(18,14,12,0.15)' : 'none'
              }}
            >
              {col.name}
            </button>
          ))}
        </div>

        {/* Filter Bar & Sort Selector */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '16px 24px',
          background: '#FFFFFF',
          borderRadius: 'var(--radius-md)',
          border: '1px solid rgba(110, 103, 95, 0.12)',
          marginBottom: '40px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#6E675F', fontSize: '0.9rem' }}>
            <SlidersHorizontal size={18} color="#D4AF37" />
            <span style={{ fontWeight: '600', color: '#1C1613' }}>
              {filteredProducts.length} {filteredProducts.length > 1 ? 'modèles disponibles' : 'modèle disponible'}
            </span>
            {searchQuery && (
              <span style={{ color: '#4A121A', fontWeight: '500' }}>
                (Filtre : "{searchQuery}")
              </span>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <label style={{ fontSize: '0.85rem', color: '#6E675F', fontWeight: '600' }}>Trier par :</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: '8px 14px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(110, 103, 95, 0.2)',
                background: '#FDFBF7',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#1C1613',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="default">Sélection Recommandée</option>
              <option value="price-low">Prix : Du moins cher au plus cher</option>
              <option value="price-high">Prix : Du plus cher au moins cher</option>
              <option value="rating">Les mieux notés</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '30px'
          }}>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                isWishlisted={wishlist.includes(product.id)}
                onToggleWishlist={onToggleWishlist}
              />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: '#FFFFFF',
            borderRadius: 'var(--radius-md)',
            border: '1px border rgba(110,103,95,0.15)'
          }}>
            <Search size={48} color="#D4AF37" style={{ marginBottom: '16px' }} />
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '8px' }}>
              Aucune création ne correspond à votre recherche
            </h3>
            <p style={{ color: '#6E675F', marginBottom: '20px' }}>
              Essayez de modifier votre mot-clé ou réinitialisez les filtres.
            </p>
            <button
              onClick={() => { setSelectedCollection('all'); setSearchQuery(''); }}
              className="btn-primary"
            >
              Voir toute la collection
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
