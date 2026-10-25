import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data';
import ProductCard from '../components/ProductCard';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState('featured');

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    if (currentCategory) {
      result = result.filter(p => p.category === currentCategory);
    }
    
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
    }
    return result;
  }, [currentCategory, sortOption]);

  const handleCategoryClick = (category: string | null) => {
    if (category) {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsFilterOpen(false);
  };

  return (
    <div className="bg-luxury-cream min-h-screen pt-24 pb-20 text-luxury-charcoal">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-serif italic tracking-tighter mb-4 text-luxury-charcoal"
        >
          {currentCategory ? currentCategory : 'The Collection'}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-luxury-text/70 max-w-2xl text-sm leading-relaxed font-light"
        >
          Explore our curated selection of premium handcrafted crochet. Find your signature piece among our newest creations and timeless classics.
        </motion.p>
      </div>

      <div className="border-y border-luxury-champagne/30 bg-luxury-cream/80 backdrop-blur-md sticky top-[80px] z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex items-center justify-between">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest hover:text-luxury-rose transition-colors md:hidden text-luxury-charcoal"
          >
            <Filter className="w-4 h-4" /> Filters
          </button>
          <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest text-luxury-text/50">
             <button 
              onClick={() => handleCategoryClick(null)}
              className={`hover:text-luxury-charcoal transition-colors ${!currentCategory ? 'text-luxury-charcoal border-b border-luxury-charcoal pb-1' : ''}`}
            >
              All
            </button>
            {CATEGORIES.slice(0, 5).map(cat => (
               <button 
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`hover:text-luxury-charcoal transition-colors ${currentCategory === cat ? 'text-luxury-charcoal border-b border-luxury-charcoal pb-1' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-luxury-charcoal">
            <span className="text-luxury-text/50 hidden sm:inline">Sort by:</span>
            <div className="relative group">
              <select 
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="appearance-none bg-transparent font-bold pr-6 py-1 cursor-pointer focus:outline-none"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="w-4 h-4 absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-luxury-rose" />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 flex relative">
        {/* Mobile Filters */}
        {isFilterOpen && (
          <div className="fixed inset-0 bg-luxury-cream z-50 p-6 flex flex-col md:hidden">
            <div className="flex justify-between items-center mb-8 text-luxury-charcoal">
              <span className="text-xl font-serif italic tracking-tight">Filters</span>
              <button onClick={() => setIsFilterOpen(false)}><X className="w-6 h-6" /></button>
            </div>
            <div className="flex flex-col gap-4 text-lg text-luxury-charcoal">
              <button 
                onClick={() => handleCategoryClick(null)}
                className={`text-left font-serif italic ${!currentCategory ? 'font-bold text-luxury-rose' : ''}`}
              >
                All Categories
              </button>
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => handleCategoryClick(cat)}
                  className={`text-left font-serif italic ${currentCategory === cat ? 'font-bold text-luxury-rose' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center text-luxury-text/50 font-serif italic text-lg">
              <p>No treasures found in this collection.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
