import React, { useState } from 'react';
import { Eye, Heart, ShoppingBag, Phone, Star, Play, Sparkles } from 'lucide-react';

export default function ProductCard({
  product,
  currency,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Format price
  const formattedPrice = currency === 'FCFA'
    ? `${product.priceFCFA.toLocaleString('fr-FR')} FCFA`
    : `${product.priceEUR} €`;

  const handleWhatsAppOrder = (e) => {
    e.stopPropagation();
    const text = encodeURIComponent(
      `Bonjour Maison ROSE, je souhaite commander le sac "${product.name}" (${formattedPrice}). Est-il disponible ?`
    );
    window.open(`https://wa.me/2250700000000?text=${text}`, '_blank');
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#FFFFFF',
        borderRadius: 'var(--radius-md)',
        border: '1px solid rgba(110, 103, 95, 0.12)',
        overflow: 'hidden',
        boxShadow: isHovered ? '0 16px 36px rgba(28, 22, 19, 0.12)' : 'var(--shadow-sm)',
        transform: isHovered ? 'translateY(-6px)' : 'none',
        transition: 'var(--transition-smooth)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Product Image Container */}
      <div
        onClick={() => onQuickView(product)}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4/4.8',
          background: '#F6F2EA',
          overflow: 'hidden',
          cursor: 'pointer'
        }}
      >
        <img
          src={isHovered && product.secondaryImage ? product.secondaryImage : product.image}
          alt={product.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transform: isHovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        />

        {/* Floating Badges */}
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 2
        }}>
          {product.badge && (
            <span className="badge-luxury" style={{ background: 'rgba(18, 14, 12, 0.85)', color: '#E6C875', border: '1px solid #D4AF37' }}>
              {product.badge}
            </span>
          )}
          {product.video && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              borderRadius: '999px',
              background: 'rgba(74, 18, 26, 0.85)',
              color: '#FFFFFF',
              fontSize: '0.68rem',
              fontWeight: '700'
            }}>
              <Play size={10} fill="#FFF" />
              <span>Vidéo Studio</span>
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 3,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isWishlisted ? '#4A121A' : '#1C1613',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
          title={isWishlisted ? "Retirer des favoris" : "Ajouter aux favoris"}
        >
          <Heart size={18} fill={isWishlisted ? '#4A121A' : 'none'} color={isWishlisted ? '#4A121A' : '#1C1613'} />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '12px',
          right: '12px',
          display: 'flex',
          gap: '8px',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0)' : 'translateY(10px)',
          transition: 'var(--transition-smooth)',
          zIndex: 3
        }}>
          <button
            onClick={() => onQuickView(product)}
            style={{
              flex: 1,
              padding: '10px 14px',
              borderRadius: '999px',
              background: 'rgba(18, 14, 12, 0.9)',
              color: '#FDFBF7',
              fontSize: '0.8rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              backdropFilter: 'blur(8px)'
            }}
          >
            <Eye size={15} color="#D4AF37" />
            <span>Aperçu Rapide</span>
          </button>
        </div>
      </div>

      {/* Card Info Section */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Category & Color indicator */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{
            fontSize: '0.72rem',
            fontWeight: '700',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: '#D4AF37'
          }}>
            {product.category}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Star size={13} fill="#D4AF37" color="#D4AF37" />
            <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#1C1613' }}>{product.rating}</span>
            <span style={{ fontSize: '0.72rem', color: '#6E675F' }}>({product.reviewsCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3
          onClick={() => onQuickView(product)}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.15rem',
            fontWeight: '600',
            lineHeight: '1.3',
            color: '#120E0C',
            marginBottom: '10px',
            cursor: 'pointer',
            minHeight: '2.6em'
          }}
        >
          {product.name}
        </h3>

        {/* Color swatch name */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
          <span style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: product.color,
            border: '1px solid rgba(0,0,0,0.15)'
          }} />
          <span style={{ fontSize: '0.78rem', color: '#6E675F', fontWeight: '500' }}>{product.colorName}</span>
        </div>

        {/* Price & Action Buttons */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '12px',
          borderTop: '1px solid rgba(110, 103, 95, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px'
        }}>
          <div>
            <span style={{
              display: 'block',
              fontSize: '1.15rem',
              fontWeight: '700',
              color: '#120E0C',
              fontFamily: 'var(--font-sans)'
            }}>
              {formattedPrice}
            </span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={handleWhatsAppOrder}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#25D366',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(37,211,102,0.3)'
              }}
              title="Commander direct via WhatsApp"
            >
              <Phone size={16} />
            </button>

            <button
              onClick={() => onAddToCart(product)}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: '#120E0C',
                color: '#E6C875',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              title="Ajouter au panier"
            >
              <ShoppingBag size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
