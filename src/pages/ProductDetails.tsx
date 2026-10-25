import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, ShoppingBag, Share2, ChevronRight, Truck, RefreshCcw } from 'lucide-react';
import { PRODUCTS } from '../data';
import { useCart } from '../store/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [activeImage, setActiveImage] = useState(0);
  const { addToCart } = useCart();
  
  const product = PRODUCTS.find(p => p.id === id);
  const relatedProducts = PRODUCTS.filter(p => p.category === product?.category && p.id !== product?.id).slice(0, 4);

  // Scroll to top on mount or ID change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImage(0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 text-center flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif font-bold uppercase tracking-widest mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-sm font-medium underline underline-offset-4">Back to Shop</Link>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-luxury-cream min-h-screen pt-24 text-luxury-charcoal">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-text/50 flex items-center gap-2">
        <Link to="/" className="hover:text-luxury-rose transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3 text-luxury-rose/50" />
        <Link to={`/shop?category=${product.category}`} className="hover:text-luxury-rose transition-colors">{product.category}</Link>
        <ChevronRight className="w-3 h-3 text-luxury-rose/50" />
        <span className="text-luxury-charcoal">{product.name}</span>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-12 lg:gap-24">
        {/* Image Gallery */}
        <div className="w-full lg:w-1/2 flex flex-col-reverse md:flex-row gap-6">
          <div className="flex md:flex-col gap-4 overflow-x-auto md:w-24 shrink-0 no-scrollbar py-1">
            {product.images.map((img, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-20 md:w-full aspect-[3/4] bg-luxury-ivory shrink-0 rounded-md overflow-hidden border transition-all duration-300 shadow-sm ${activeImage === idx ? 'border-luxury-rose shadow-md opacity-100' : 'border-transparent opacity-60 hover:opacity-100 hover:border-luxury-champagne'}`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="flex-1 bg-luxury-ivory aspect-[3/4] relative overflow-hidden group rounded-xl border border-luxury-champagne/40 shadow-sm">
            <motion.img 
              key={activeImage}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              src={product.images[activeImage]} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 bg-luxury-rose/90 backdrop-blur-md text-white text-[8px] font-bold px-4 py-1.5 uppercase tracking-[0.2em] rounded-full shadow-sm">
                Limited Edition
              </span>
            )}
            {/* Subtle overlay gradient */}
            <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(220,164,182,0.1)] pointer-events-none rounded-xl"></div>
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-2">
              <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-rose font-bold block mb-3">Handcrafted Artisan Piece</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-serif italic tracking-tighter mb-4 text-luxury-charcoal">{product.name}</h1>
            
            <div className="flex items-end gap-4 mb-8">
              <span className="text-3xl font-serif italic text-luxury-charcoal">{formatPrice(product.price)}</span>
              {product.price < product.mrp && (
                <>
                  <span className="text-lg text-luxury-text/40 line-through mb-1 font-serif italic">{formatPrice(product.mrp)}</span>
                  <span className="text-[10px] font-bold text-luxury-rose mb-1.5 tracking-widest uppercase border border-luxury-rose/30 px-2 py-0.5 rounded-sm bg-luxury-rose/5">
                    {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="mb-10">
              <p className="text-base text-luxury-text/80 leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 bg-luxury-charcoal text-luxury-cream py-4 rounded-sm shadow-md flex items-center justify-center gap-3 text-[10px] font-bold tracking-[0.2em] uppercase hover:bg-luxury-rose hover:text-white transition-all"
              >
                <ShoppingBag className="w-4 h-4" /> Add to Gift Box
              </button>
              <div className="flex gap-4">
                <button className="w-14 h-14 rounded-full border border-luxury-champagne flex items-center justify-center text-luxury-charcoal bg-luxury-ivory hover:border-luxury-rose hover:text-luxury-rose hover:bg-white transition-all shadow-sm">
                  <Heart className="w-4 h-4" />
                </button>
                <button className="w-14 h-14 rounded-full border border-luxury-champagne flex items-center justify-center text-luxury-charcoal bg-luxury-ivory hover:border-luxury-rose hover:text-luxury-rose hover:bg-white transition-all shadow-sm">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Details Accordion (Static for now) */}
            <div className="border-t border-luxury-champagne/40 py-6">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-3 text-luxury-charcoal">
                <Truck className="w-4 h-4 text-luxury-rose" /> Shipping & Presentation
              </h3>
              <p className="text-sm text-luxury-text/70 leading-relaxed font-light italic">Every piece arrives in our signature bespoke packaging. Hand-wrapped with premium tissue and satin ribbon. Dispatched within 24-48 hours.</p>
            </div>
            <div className="border-t border-luxury-champagne/40 py-6 border-b">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-3 text-luxury-charcoal">
                <RefreshCcw className="w-4 h-4 text-luxury-rose" /> Care Instructions
              </h3>
              <p className="text-sm text-luxury-text/70 leading-relaxed font-light italic">Keep away from direct sunlight to preserve colors. Gently dust with a soft brush. Do not machine wash.</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 border-t border-luxury-champagne/30 mt-12 bg-luxury-ivory/50 rounded-t-[3rem]">
          <div className="text-center mb-12">
            <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-rose font-bold block mb-3">Discover More</span>
            <h2 className="text-3xl font-serif italic tracking-tight text-luxury-charcoal">Perfect Pairings</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
