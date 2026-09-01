import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Phone, CreditCard, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  currency
}) {
  if (!isOpen) return null;

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoNotice, setPromoNotice] = useState('');
  const [checkoutModal, setCheckoutModal] = useState(false);

  // Calculate totals
  const subtotalFCFA = cartItems.reduce((acc, item) => acc + (item.product.priceFCFA * item.quantity), 0);
  const subtotalEUR = cartItems.reduce((acc, item) => acc + (item.product.priceEUR * item.quantity), 0);

  const discountFCFA = Math.round(subtotalFCFA * (discountPercent / 100));
  const discountEUR = Math.round(subtotalEUR * (discountPercent / 100));

  const totalFCFA = subtotalFCFA - discountFCFA;
  const totalEUR = subtotalEUR - discountEUR;

  const formattedTotal = currency === 'FCFA'
    ? `${totalFCFA.toLocaleString('fr-FR')} FCFA`
    : `${totalEUR} €`;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ROSE10') {
      setDiscountPercent(10);
      setPromoNotice('Code ROSE10 appliqué (-10%) !');
    } else {
      setPromoNotice('Code invalide. Essayez "ROSE10"');
    }
  };

  const handleWhatsAppCheckout = () => {
    if (cartItems.length === 0) return;

    let itemsListStr = cartItems.map(item => {
      const price = currency === 'FCFA'
        ? `${(item.product.priceFCFA * item.quantity).toLocaleString('fr-FR')} FCFA`
        : `${item.product.priceEUR * item.quantity} €`;
      return `• ${item.product.name} (x${item.quantity}) : ${price}`;
    }).join('\n');

    const text = encodeURIComponent(
      `Bonjour Maison ROSE,\n\nJe souhaite valider ma commande :\n\n${itemsListStr}\n\nTotal à régler : ${formattedTotal}${discountPercent > 0 ? ` (dont -${discountPercent}% remise)` : ''}\n\nMerci de me donner les instructions pour la livraison.`
    );

    window.open(`https://wa.me/2250700000000?text=${text}`, '_blank');
  };

  return (
    <>
      <div className="modal-overlay" onClick={onClose} style={{ justifyContent: 'flex-end', padding: 0 }}>
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            maxWidth: '460px',
            height: '100vh',
            background: '#FFFFFF',
            boxShadow: '-10px 0 30px rgba(0,0,0,0.2)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            animation: 'fadeIn 0.3s ease-out'
          }}
        >
          {/* Header */}
          <div style={{
            padding: '24px',
            borderBottom: '1px solid rgba(110,103,95,0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: '#120E0C',
            color: '#FDFBF7'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShoppingBag size={22} color="#D4AF37" />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', color: '#FFF' }}>
                Votre Panier Maison ROSE
              </h3>
            </div>

            <button onClick={onClose} style={{ color: '#FDFBF7' }}>
              <X size={24} />
            </button>
          </div>

          {/* Cart Items List */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {cartItems.length > 0 ? (
              cartItems.map(item => {
                const itemPrice = currency === 'FCFA'
                  ? `${(item.product.priceFCFA * item.quantity).toLocaleString('fr-FR')} FCFA`
                  : `${item.product.priceEUR * item.quantity} €`;

                return (
                  <div
                    key={item.product.id}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      padding: '12px',
                      borderRadius: 'var(--radius-sm)',
                      background: '#FDFBF7',
                      border: '1px solid rgba(110,103,95,0.12)'
                    }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: '75px', height: '75px', objectFit: 'cover', borderRadius: 'var(--radius-sm)' }}
                    />

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem', color: '#120E0C', lineHeight: '1.2' }}>
                          {item.product.name}
                        </h4>
                        <span style={{ fontSize: '0.78rem', color: '#6E675F' }}>{item.product.colorName}</span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #CCC', borderRadius: '999px', overflow: 'hidden' }}>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            style={{ padding: '2px 8px', fontSize: '0.85rem' }}
                          >
                            -
                          </button>
                          <span style={{ padding: '0 8px', fontSize: '0.8rem', fontWeight: '700' }}>{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            style={{ padding: '2px 8px', fontSize: '0.85rem' }}
                          >
                            +
                          </button>
                        </div>

                        <span style={{ fontWeight: '700', fontSize: '0.9rem', color: '#120E0C' }}>
                          {itemPrice}
                        </span>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          style={{ color: '#A33', padding: '4px' }}
                          title="Supprimer"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6E675F' }}>
                <ShoppingBag size={48} color="#D4AF37" style={{ marginBottom: '12px' }} />
                <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.2rem', color: '#120E0C' }}>
                  Votre panier est vide
                </h4>
                <p style={{ fontSize: '0.85rem', marginTop: '6px' }}>
                  Découvrez nos sacs d'exception et ajoutez votre premier coup de cœur.
                </p>
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div style={{
              padding: '24px',
              borderTop: '1px solid rgba(110,103,95,0.15)',
              background: '#FDFBF7',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Code promo (ex: ROSE10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid rgba(110,103,95,0.25)',
                    fontSize: '0.82rem',
                    outline: 'none'
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-sm)',
                    background: '#120E0C',
                    color: '#E6C875',
                    fontSize: '0.8rem',
                    fontWeight: '700'
                  }}
                >
                  Appliquer
                </button>
              </form>
              {promoNotice && (
                <span style={{ fontSize: '0.75rem', color: discountPercent > 0 ? '#137333' : '#A33', fontWeight: '600' }}>
                  {promoNotice}
                </span>
              )}

              {/* Subtotal & Total */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.9rem' }}>
                {discountPercent > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#137333', fontWeight: '600' }}>
                    <span>Remise ({discountPercent}%) :</span>
                    <span>-{currency === 'FCFA' ? `${discountFCFA.toLocaleString('fr-FR')} FCFA` : `${discountEUR} €`}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: '700', color: '#120E0C', paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
                  <span>Total :</span>
                  <span>{formattedTotal}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  onClick={handleWhatsAppCheckout}
                  className="btn-whatsapp"
                  style={{ width: '100%', padding: '14px' }}
                >
                  <Phone size={18} />
                  <span>Commander via WhatsApp</span>
                </button>

                <button
                  onClick={() => setCheckoutModal(true)}
                  className="btn-gold"
                  style={{ width: '100%', padding: '14px' }}
                >
                  <CreditCard size={18} />
                  <span>Paiement Sécurisé CB / Mobile Money</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Simulated Payment Modal */}
      {checkoutModal && (
        <div className="modal-overlay" onClick={() => setCheckoutModal(false)}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: 'var(--radius-lg)',
              maxWidth: '480px',
              width: '100%',
              padding: '30px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.3)',
              position: 'relative'
            }}
          >
            <button
              onClick={() => setCheckoutModal(false)}
              style={{ position: 'absolute', top: '16px', right: '16px' }}
            >
              <X size={20} />
            </button>

            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <Sparkles size={36} color="#D4AF37" style={{ marginBottom: '8px' }} />
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#120E0C' }}>
                Paiement Sécurisé Maison ROSE
              </h3>
              <p style={{ fontSize: '0.85rem', color: '#6E675F' }}>
                Montant total : <strong>{formattedTotal}</strong>
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              <div style={{ padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid #D4AF37', background: '#FDFBF7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>💳 Carte Bancaire (Visa / Mastercard)</span>
                <span style={{ fontSize: '0.75rem', background: '#D4AF37', color: '#120E0C', fontWeight: '700', padding: '2px 6px', borderRadius: '4px' }}>Actif</span>
              </div>
              <div style={{ padding: '14px', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(0,0,0,0.1)', background: '#FDFBF7', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>📱 Wave / Orange Money / MTN</span>
                <span style={{ fontSize: '0.75rem', background: '#25D366', color: '#FFF', fontWeight: '700', padding: '2px 6px', borderRadius: '4px' }}>Instant</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Merci pour votre commande ! Notre conciergerie vous contactera sous quelques minutes pour confirmer la livraison.');
                setCheckoutModal(false);
                onClose();
              }}
              className="btn-primary"
              style={{ width: '100%', padding: '14px' }}
            >
              Valider et Régler ({formattedTotal})
            </button>
          </div>
        </div>
      )}
    </>
  );
}
