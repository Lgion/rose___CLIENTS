import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CatalogSection from './components/CatalogSection';
import QuickViewModal from './components/QuickViewModal';
import LookbookReels from './components/LookbookReels';
import StorySection from './components/StorySection';
import Testimonials from './components/Testimonials';
import CartDrawer from './components/CartDrawer';
import WhatsAppFloat from './components/WhatsAppFloat';
import Footer from './components/Footer';

import { PRODUCTS } from './data/products';

export default function App() {
  const [currency, setCurrency] = useState('FCFA'); // 'FCFA' or 'EUR'
  const [activeSection, setActiveSection] = useState('hero');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Selected product for QuickView modal
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cart operations
  const handleAddToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.product.id === productId ? { ...item, quantity: newQuantity } : item)
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  // Wishlist operations
  const handleToggleWishlist = (productId) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Total quantity in cart
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSelectProductFromReel = (productId) => {
    const found = PRODUCTS.find(p => p.id === productId);
    if (found) {
      setSelectedProduct(found);
    }
    return found;
  };

  const scrollToCatalogue = () => {
    setActiveSection('catalogue');
    const el = document.getElementById('catalogue');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToLookbook = () => {
    setActiveSection('lookbook');
    const el = document.getElementById('lookbook');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Navigation Header */}
      <Header
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {
          setSelectedProduct(PRODUCTS.find(p => wishlist.includes(p.id)) || PRODUCTS[0]);
        }}
        currency={currency}
        setCurrency={setCurrency}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Page Content */}
      <main style={{ flex: 1 }}>
        <Hero
          onExploreClick={scrollToCatalogue}
          onLookbookClick={scrollToLookbook}
        />

        <CatalogSection
          products={PRODUCTS}
          currency={currency}
          onQuickView={(product) => setSelectedProduct(product)}
          onAddToCart={handleAddToCart}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <LookbookReels
          onSelectProduct={handleSelectProductFromReel}
        />

        <StorySection />

        <Testimonials />
      </main>

      {/* Footer & Floating Controls */}
      <Footer />

      <WhatsAppFloat />

      {/* Quick View Modal */}
      {selectedProduct && (
        <QuickViewModal
          product={selectedProduct}
          currency={currency}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          isWishlisted={wishlist.includes(selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        currency={currency}
      />
    </div>
  );
}
