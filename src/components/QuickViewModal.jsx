import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Phone, Star, ShieldCheck, Check, Sparkles, Play, Award, Truck } from 'lucide-react';

export default function QuickViewModal({
  product,
  currency,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) {
  if (!product) return null;

  const [activeMedia, setActiveMedia] = useState('image'); // 'image', 'secondary', 'video'
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  const formattedPrice = currency === 'FCFA'
    ? `${(product.priceFCFA * quantity).toLocaleString('fr-FR')} FCFA`
    : `${product.priceEUR * quantity} €`;

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `Bonjour Maison ROSE,\n\nJe souhaite commander :\n- Sac : ${product.name}\n- Quantité : ${quantity}\n- Montant Total : ${formattedPrice}\n\nMerci de me confirmer la disponibilité et les modalités de livraison.`
    );
    window.open(`https://wa.me/2250700000000?text=${text}`, '_blank');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#FFFFFF',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '1000px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1fr) minmax(320px, 1.2fr)',
          gap: '0',
          border: '1px solid rgba(212, 175, 55, 0.3)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(18, 14, 12, 0.8)',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        {/* Left Side: Media Showcase & Thumbnails */}
        <div style={{ background: '#F6F2EA', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '1',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            background: '#FFFFFF',
            boxShadow: 'var(--shadow-sm)'
          }}>
            {activeMedia === 'video' && product.video ? (
              <video
                controls
                autoPlay
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              >
                <source src={product.video} type="video/mp4" />
              </video>
            ) : (
              <img
                src={activeMedia === 'secondary' && product.secondaryImage ? product.secondaryImage : product.image}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            )}

            {product.badge && (
              <span className="badge-luxury" style={{ position: 'absolute', top: '12px', left: '12px' }}>
                {product.badge}
              </span>
            )}
          </div>

          {/* Media Thumbnails Picker */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => setActiveMedia('image')}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
                border: activeMedia === 'image' ? '2px solid #D4AF37' : '1px solid rgba(0,0,0,0.1)',
                opacity: activeMedia === 'image' ? 1 : 0.6
              }}
            >
              <img src={product.image} alt="Vue 1" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>

            {product.secondaryImage && (
              <button
                onClick={() => setActiveMedia('secondary')}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-sm)',
                  overflow: 'hidden',
                  border: activeMedia === 'secondary' ? '2px solid #D4AF37' : '1px solid rgba(0,0,0,0.1)',
                  opacity: activeMedia === 'secondary' ? 1 : 0.6
                }}
              >
                <img src={product.secondaryImage} alt="Vue 2" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            )}

            {product.video && (
              <button
                onClick={() => setActiveMedia('video')}
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: 'var(--radius-sm)',
                  background: '#120E0C',
                  color: '#E6C875',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '2px',
                  border: activeMedia === 'video' ? '2px solid #D4AF37' : '1px solid rgba(0,0,0,0.1)'
                }}
              >
                <Play size={18} fill="#E6C875" />
                <span style={{ fontSize: '0.62rem', fontWeight: '700' }}>Vidéo</span>
              </button>
            )}
          </div>
        </div>

        {/* Right Side: Product Details & Buying Section */}
        <div style={{ padding: '36px 30px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#D4AF37' }}>
                {product.category}
              </span>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Star size={14} fill="#D4AF37" color="#D4AF37" />
                <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>{product.rating}</span>
                <span style={{ fontSize: '0.78rem', color: '#6E675F' }}>({product.reviewsCount} avis)</span>
              </div>
            </div>

            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', lineHeight: '1.2', color: '#120E0C', marginBottom: '12px' }}>
              {product.name}
            </h2>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '1.6rem', fontWeight: '700', color: '#120E0C' }}>
                {formattedPrice}
              </span>

              <span style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '999px',
                background: '#E6F4EA',
                color: '#137333'
              }}>
                En Stock (Pièce Confectionnée)
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.92rem', color: '#4A433D', lineHeight: '1.6' }}>
            {product.description}
          </p>

          {/* Product Specifications List */}
          <div style={{ background: '#FDFBF7', padding: '16px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(110,103,95,0.15)' }}>
            <h4 style={{ fontSize: '0.82rem', fontWeight: '700', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#120E0C', marginBottom: '10px' }}>
              Caractéristiques Haute Couture :
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {product.details.map((detail, idx) => (
                <li key={idx} style={{ fontSize: '0.82rem', color: '#6E675F', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Check size={14} color="#D4AF37" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity Modifier */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: '600', color: '#1C1613' }}>Quantité :</label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '1px solid rgba(110,103,95,0.25)',
              borderRadius: '999px',
              overflow: 'hidden',
              background: '#FDFBF7'
            }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{ padding: '6px 14px', fontSize: '1rem', fontWeight: '700', color: '#120E0C' }}
              >
                -
              </button>
              <span style={{ padding: '0 12px', fontSize: '0.9rem', fontWeight: '700' }}>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{ padding: '6px 14px', fontSize: '1rem', fontWeight: '700', color: '#120E0C' }}
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '10px' }}>
            <button
              onClick={handleAddToCart}
              className="btn-gold"
              style={{ width: '100%', padding: '14px' }}
            >
              <ShoppingBag size={18} />
              <span>{addedNotice ? "Ajouté au Panier ✓" : "Ajouter au Panier"}</span>
            </button>

            <button
              onClick={handleWhatsAppOrder}
              className="btn-whatsapp"
              style={{ width: '100%', padding: '14px' }}
            >
              <Phone size={18} />
              <span>Commander Direct via WhatsApp</span>
            </button>
          </div>

          {/* Guarantees */}
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px', paddingTop: '12px', borderTop: '1px solid rgba(110,103,95,0.1)', fontSize: '0.75rem', color: '#6E675F' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <ShieldCheck size={14} color="#D4AF37" /> Authenticité 100% Cuir
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Truck size={14} color="#D4AF37" /> Expédition 24/48h
            </span>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .modal-overlay > div { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
