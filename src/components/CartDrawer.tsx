import { motion, AnimatePresence } from 'motion/react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../store/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[70]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-luxury-cream z-[80] shadow-2xl flex flex-col text-luxury-charcoal border-l border-luxury-champagne/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-luxury-champagne/30 bg-luxury-ivory/50">
              <h2 className="text-lg font-serif italic tracking-wide flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-luxury-rose" /> Your Gift Box
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-luxury-rose/10 rounded-full transition-colors text-luxury-charcoal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-luxury-text/40 gap-4">
                  <ShoppingBag className="w-12 h-12 stroke-1 text-luxury-rose/50" />
                  <p className="font-serif italic text-lg">Your box is empty.</p>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/shop');
                    }}
                    className="mt-4 border border-luxury-charcoal text-luxury-charcoal px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-luxury-charcoal hover:text-luxury-cream transition-colors rounded-sm"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 aspect-[3/4] bg-luxury-ivory overflow-hidden border border-luxury-champagne/30 p-1 rounded-sm shadow-sm">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded-sm"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="text-sm font-medium line-clamp-2 text-luxury-charcoal">{item.name}</h3>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-luxury-text/40 hover:text-luxury-rose transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-luxury-text/60 mt-1 font-serif italic">{formatPrice(item.price)}</p>
                      </div>
                      
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-luxury-champagne rounded-sm overflow-hidden bg-luxury-ivory/50">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-luxury-rose/10 transition-colors text-luxury-charcoal"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-medium w-8 text-center text-luxury-charcoal">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-luxury-rose/10 transition-colors text-luxury-charcoal"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold font-serif text-luxury-charcoal">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-luxury-champagne/30 p-6 bg-luxury-ivory/80 shadow-[0_-10px_40px_rgba(220,164,182,0.1)]">
                <div className="flex justify-between items-center mb-6 text-sm">
                  <span className="text-[10px] text-luxury-text/70 font-bold uppercase tracking-[0.2em]">Subtotal</span>
                  <span className="font-semibold text-lg font-serif italic text-luxury-charcoal">{formatPrice(cartTotal)}</span>
                </div>
                <p className="text-xs text-luxury-text/50 mb-6 text-center italic">
                  Shipping, taxes, and bespoke wrapping calculated at checkout.
                </p>
                <button 
                  onClick={handleCheckout}
                  className="w-full bg-luxury-charcoal text-luxury-cream py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-luxury-rose transition-colors rounded-sm shadow-md"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
