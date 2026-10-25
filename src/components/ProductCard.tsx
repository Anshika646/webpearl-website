import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../data';
import { useCart } from '../store/CartContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col relative"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-luxury-cream mb-4 rounded-xl border border-luxury-champagne/30 shadow-sm transition-all duration-500 group-hover:shadow-[0_8px_30px_rgb(220,164,182,0.15)] group-hover:border-luxury-rose/40">
        <Link to={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-110"
            loading="lazy"
          />
          {product.images[1] && (
            <img 
              src={product.images[1]} 
              alt={`${product.name} alternate`}
              className="absolute inset-0 w-full h-full object-cover object-center opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              loading="lazy"
            />
          )}
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-charcoal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isBestseller && (
            <span className="bg-luxury-ivory/90 backdrop-blur-md text-luxury-charcoal text-[8px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] rounded-full shadow-sm">
              Best Seller
            </span>
          )}
          {product.isNew && (
            <span className="bg-luxury-rose/90 backdrop-blur-md text-white text-[8px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] rounded-full shadow-sm">
              Limited Edition
            </span>
          )}
          <span className="bg-luxury-champagne/90 backdrop-blur-md text-luxury-charcoal text-[8px] font-bold px-3 py-1.5 uppercase tracking-[0.2em] rounded-full shadow-sm w-max">
            Handmade
          </span>
        </div>

        {/* Floating Heart Button */}
        <button 
          onClick={(e) => {
            e.preventDefault();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-luxury-ivory/80 backdrop-blur-md flex items-center justify-center text-luxury-charcoal hover:text-luxury-rose hover:bg-white transition-all shadow-sm z-10"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={isWishlisted ? 'filled' : 'outline'}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Heart 
                className="w-4 h-4" 
                fill={isWishlisted ? "currentColor" : "none"}
                strokeWidth={isWishlisted ? 0 : 2}
              />
            </motion.div>
          </AnimatePresence>
        </button>

        {/* Hover Actions */}
        <div className="absolute bottom-4 left-0 right-0 px-4 flex gap-2 translate-y-[120%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-10">
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="flex-1 bg-white/95 backdrop-blur-md text-luxury-charcoal py-3 rounded-full flex items-center justify-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:bg-luxury-charcoal hover:text-luxury-ivory transition-all shadow-lg border border-luxury-champagne/50"
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 px-1 text-center items-center">
        <p className="text-[9px] text-luxury-text/50 uppercase tracking-[0.3em] font-medium">{product.category}</p>
        <Link to={`/product/${product.id}`} className="text-sm font-medium text-luxury-charcoal hover:text-luxury-rose transition-colors line-clamp-1">
          {product.name}
        </Link>
        <div className="flex items-center justify-center gap-3 mt-0.5">
          <span className="text-sm font-serif italic text-luxury-charcoal">{formatPrice(product.price)}</span>
          {product.price < product.mrp && (
            <span className="text-sm text-luxury-text/40 line-through font-serif italic">{formatPrice(product.mrp)}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
