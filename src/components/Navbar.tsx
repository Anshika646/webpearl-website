import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X, Heart } from 'lucide-react';
import { useCart } from '../store/CartContext';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsCartOpen, items } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navClasses = `fixed w-full z-50 transition-all duration-500 border-b border-luxury-rose/20 ${
    isScrolled || !isHome
      ? 'bg-luxury-ivory/80 backdrop-blur-md py-5 text-luxury-text'
      : 'bg-luxury-ivory/80 backdrop-blur-md py-8 text-luxury-text'
  }`;

  const linkHoverColor = 'after:bg-luxury-charcoal';

  const cartItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className={navClasses}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button 
            className="lg:hidden p-2 -ml-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-medium tracking-[0.2em] uppercase text-luxury-charcoal">
            <Link to="/shop" className={`hover:text-luxury-rose transition-colors`}>Shop</Link>
            <Link to="/shop?category=Bouquets" className={`hover:text-luxury-rose transition-colors`}>Bouquets</Link>
            <Link to="/shop?category=Amigurumi" className={`hover:text-luxury-rose transition-colors`}>Amigurumi</Link>
            <Link to="/shop?category=Handbags" className={`hover:text-luxury-rose transition-colors`}>Handbags</Link>
          </div>

          {/* Logo */}
          <Link to="/" className="text-2xl font-serif font-bold tracking-[0.1em] italic absolute left-1/2 -translate-x-1/2 text-luxury-charcoal">
            WebPearll
          </Link>

          {/* Icons */}
          <div className="flex items-center gap-4 lg:gap-6">
            <button className="p-2 hidden sm:block hover:opacity-70 transition-opacity">
              <Search className="w-5 h-5" />
            </button>
            <Link to="/account" className="p-2 hidden sm:block hover:opacity-70 transition-opacity">
              <User className="w-5 h-5" />
            </Link>
            <button className="p-2 hidden sm:block hover:opacity-70 transition-opacity">
              <Heart className="w-5 h-5" />
            </button>
            <button 
              className="p-2 relative hover:opacity-70 transition-opacity"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-neutral-900 text-white text-[10px] flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-[60] lg:hidden backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 left-0 w-[80%] max-w-sm h-full bg-white text-neutral-900 p-6 flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-12">
                <span className="text-xl font-serif font-bold tracking-tighter uppercase">WebPearll</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-6 text-lg font-medium text-[#1A1816]">
                <Link to="/" className="hover:text-[#8C8275] transition-colors">Home</Link>
                <Link to="/shop" className="hover:text-[#8C8275] transition-colors">Shop All</Link>
                <Link to="/shop?category=Bouquets" className="hover:text-[#8C8275] transition-colors">Bouquets</Link>
                <Link to="/shop?category=Amigurumi" className="hover:text-[#8C8275] transition-colors">Amigurumi</Link>
                <Link to="/shop?category=Handbags" className="hover:text-[#8C8275] transition-colors">Handbags</Link>
                <div className="w-full h-px bg-[#EBE5DA] my-4" />
                <Link to="/account" className="flex items-center gap-3 hover:text-[#8C8275] transition-colors">
                  <User className="w-5 h-5" /> My Account
                </Link>
                <Link to="/wishlist" className="flex items-center gap-3 hover:text-neutral-500 transition-colors">
                  <Heart className="w-5 h-5" /> Wishlist
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
