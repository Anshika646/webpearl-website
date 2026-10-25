import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Sparkles, ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data';

import slider1 from '../assets/images/luxury_crochet_slider_1_1782937146791.jpg';
import slider2 from '../assets/images/luxury_crochet_slider_1_1782937146791.jpg'; // Reusing 1 for flowers
import slider3 from '../assets/images/luxury_crochet_slider_2_1782937159065.jpg'; // Plush
import slider4 from '../assets/images/luxury_crochet_slider_3_1782937170465.jpg'; // Fashion
import slider5 from '../assets/images/luxury_crochet_slider_4_1782937186677.jpg'; // Home decor
import slider6 from '../assets/images/luxury_crochet_slider_5_1782937199998.jpg'; // Gifts
import slider7 from '../assets/images/luxury_crochet_slider_6_1782937211698.jpg'; // Custom

gsap.registerPlugin(ScrollTrigger);

const slides = [
  { id: 1, title: "Handcrafted With Love", subtitle: "Luxury Brand Introduction", image: slider1, tag: "The Atelier" },
  { id: 2, title: "Ethereal Blooms", subtitle: "Crochet Flower Collection", image: slider2, tag: "Timeless Flora" },
  { id: 3, title: "Heirloom Plushies", subtitle: "Crochet Plush Collection", image: slider3, tag: "Soft Companions" },
  { id: 4, title: "Artisan Fashion", subtitle: "Handbags & Accessories", image: slider4, tag: "Woven Elegance" },
  { id: 5, title: "Sanctuary Decor", subtitle: "Warmth for the Home", image: slider5, tag: "Living Spaces" },
  { id: 6, title: "The Art of Gifting", subtitle: "Bespoke Hampers & Boxes", image: slider6, tag: "Unforgettable Moments" },
  { id: 7, title: "Custom Creations", subtitle: "Design Your Own Masterpiece", image: slider7, tag: "Personalized" },
];

const cubeFaces = [
  { title: "Flowers", cat: "Bouquets" },
  { title: "Plushies", cat: "Amigurumi" },
  { title: "Bags", cat: "Handbags" },
  { title: "Decor", cat: "Home Decor" },
  { title: "Baby", cat: "Baby Collection" },
  { title: "Gifts", cat: "Gift Hampers" },
];

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useGSAP(() => {
    // Parallax slides logic
    const panels = gsap.utils.toArray('.slide-panel');
    
    // We pin the slider container and animate the panels up
    ScrollTrigger.create({
      trigger: sliderRef.current,
      start: "top top",
      end: "+=" + (panels.length * 100) + "%",
      pin: true,
      animation: gsap.timeline()
        .to(panels.slice(1), {
          yPercent: -100,
          stagger: 1,
          ease: "none",
        }),
      scrub: 1,
    });

    // Animate content inside panels as they arrive
    panels.forEach((panel: any, i) => {
      const q = gsap.utils.selector(panel);
      gsap.fromTo(q('.slide-text-anim'), 
        { y: 50, opacity: 0 }, 
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          stagger: 0.1,
          scrollTrigger: {
            trigger: sliderRef.current,
            start: "top top-=" + (i * window.innerHeight),
            end: "top top-=" + ((i + 1) * window.innerHeight),
            toggleActions: "play reverse play reverse",
          }
        }
      );
    });

    // Initial load animation for the first slide
    gsap.fromTo(".slide-text-anim-initial",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power4.out", delay: 0.2 }
    );

    // 3D Cube mouse interaction
    const cube = cubeRef.current;
    if (cube) {
      gsap.to(cube, {
        rotationY: "+=360",
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    }

  }, { scope: container });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cubeRef.current) return;
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 40;
    const yPos = (clientY / window.innerHeight - 0.5) * 40;
    
    gsap.to(cubeRef.current, {
      rotationX: -yPos,
      rotationY: xPos,
      duration: 1,
      ease: "power2.out",
      overwrite: "auto" // Pause auto-rotation when hovering
    });
  };

  const handleMouseLeave = () => {
    if (!cubeRef.current) return;
    gsap.to(cubeRef.current, {
      rotationX: 0,
      duration: 1,
      ease: "power2.out"
    });
    // Resume auto rotation
    gsap.to(cubeRef.current, {
      rotationY: "+=360",
      duration: 20,
      repeat: -1,
      ease: "none",
    });
  };

  const bestSellers = PRODUCTS.filter(p => p.isBestseller).slice(0, 4);

  return (
    <div ref={container} className="bg-luxury-cream text-luxury-charcoal selection:bg-luxury-rose selection:text-white">
      
      {/* Pinned Slider Section */}
      <div ref={sliderRef} className="h-screen w-full relative overflow-hidden bg-luxury-charcoal">
        {slides.map((slide, i) => (
          <div 
            key={slide.id} 
            className="slide-panel absolute inset-0 w-full h-full will-change-transform flex items-center justify-center bg-luxury-cream"
            style={{ zIndex: i + 1, top: i === 0 ? '0%' : '100%' }}
          >
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-luxury-cream via-luxury-cream/80 to-transparent z-10 w-2/3 lg:w-1/2"></div>
              <div className="absolute inset-0 bg-luxury-charcoal/10 z-10"></div>
              <img 
                src={slide.image} 
                alt={slide.title}
                className="w-full h-full object-cover object-center scale-105"
              />
            </div>

            {/* Content */}
            <div className="relative z-20 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col justify-center h-full">
              <div className="max-w-2xl mt-20">
                <div className="overflow-hidden mb-6">
                  <div className={`flex items-center gap-3 text-luxury-rose ${i === 0 ? 'slide-text-anim-initial' : 'slide-text-anim'}`}>
                    <Sparkles className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-bold">{slide.tag}</span>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="overflow-hidden py-2">
                    <h2 className={`text-5xl md:text-7xl lg:text-8xl font-serif italic leading-[1.1] tracking-tighter text-luxury-charcoal ${i === 0 ? 'slide-text-anim-initial' : 'slide-text-anim'}`}>
                      {slide.title.split(' ')[0]}
                    </h2>
                  </div>
                  <div className="overflow-hidden py-2">
                    <h2 className={`text-5xl md:text-7xl lg:text-8xl font-serif italic leading-[1.1] tracking-tighter text-luxury-charcoal ${i === 0 ? 'slide-text-anim-initial' : 'slide-text-anim'}`}>
                      {slide.title.split(' ').slice(1).join(' ')}
                    </h2>
                  </div>
                </div>
                
                <div className="overflow-hidden mb-10">
                  <p className={`text-lg md:text-xl text-luxury-text/80 font-light max-w-md ${i === 0 ? 'slide-text-anim-initial' : 'slide-text-anim'}`}>
                    {slide.subtitle}
                  </p>
                </div>
                
                <div className="overflow-hidden">
                  <div className={i === 0 ? 'slide-text-anim-initial' : 'slide-text-anim'}>
                    <Link 
                      to="/shop" 
                      className="group inline-flex items-center gap-4 px-8 py-4 bg-luxury-charcoal text-luxury-cream text-[10px] uppercase tracking-[0.2em] transition-all hover:bg-luxury-rose overflow-hidden rounded-sm shadow-xl"
                    >
                      <span className="relative z-10 font-bold">Discover Collection</span>
                      <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Slide Indicators */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-4">
              {slides.map((_, idx) => (
                <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${i === idx ? 'bg-luxury-rose scale-150' : 'bg-luxury-charcoal/30'}`} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 3D Interactive Cube Section */}
      <section className="py-32 lg:py-48 px-6 bg-luxury-ivory relative overflow-hidden border-y border-luxury-champagne/30">
        {/* Soft glowing backgrounds */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-luxury-blush rounded-full mix-blend-multiply filter blur-[120px] opacity-30 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-rose font-bold block mb-4">Curated Excellence</span>
            <h2 className="text-5xl md:text-7xl font-serif italic tracking-tighter text-luxury-charcoal">Explore The Universe</h2>
          </div>

          {/* Cube Container */}
          <div 
            className="w-full h-[500px] flex items-center justify-center perspective-[1200px]"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div 
              ref={cubeRef}
              className="w-64 h-64 relative preserve-3d will-change-transform"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {cubeFaces.map((face, index) => {
                // Determine rotation for each face to form a cube
                let transform = '';
                switch(index) {
                  case 0: transform = 'rotateY(0deg) translateZ(128px)'; break; // Front
                  case 1: transform = 'rotateY(90deg) translateZ(128px)'; break; // Right
                  case 2: transform = 'rotateY(180deg) translateZ(128px)'; break; // Back
                  case 3: transform = 'rotateY(-90deg) translateZ(128px)'; break; // Left
                  case 4: transform = 'rotateX(90deg) translateZ(128px)'; break; // Top
                  case 5: transform = 'rotateX(-90deg) translateZ(128px)'; break; // Bottom
                }
                
                return (
                  <Link
                    key={index}
                    to={`/shop?category=${face.cat}`}
                    className="absolute inset-0 w-full h-full bg-white/40 backdrop-blur-md border border-luxury-champagne/60 flex flex-col items-center justify-center text-center shadow-[0_0_40px_rgba(220,164,182,0.1)] transition-all hover:bg-white/80 hover:border-luxury-rose group"
                    style={{ 
                      transform,
                      backfaceVisibility: 'hidden',
                    }}
                  >
                    <span className="text-sm font-serif italic text-luxury-charcoal group-hover:text-luxury-rose transition-colors">{face.cat}</span>
                    <h3 className="text-2xl font-bold uppercase tracking-[0.1em] text-luxury-charcoal mt-2">{face.title}</h3>
                    <div className="mt-6 w-10 h-10 rounded-full border border-luxury-champagne flex items-center justify-center group-hover:bg-luxury-rose group-hover:text-white group-hover:border-luxury-rose transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
          
          <div className="text-center mt-20 text-xs text-luxury-text/50 uppercase tracking-[0.2em]">
            Drag to explore • Click to discover
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-8 bg-luxury-charcoal text-luxury-cream overflow-hidden">
        <div className="whitespace-nowrap flex overflow-hidden w-full">
          <div className="marquee-content flex gap-12 text-[10px] font-bold uppercase tracking-[0.3em]">
            {[...Array(6)].fill("WEBPEARLL • LUXURY HANDCRAFTED CROCHET • BESPOKE CREATIONS • ").map((text, i) => (
              <span key={i}>{text}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Storytelling Section */}
      <section className="story-section py-24 md:py-32 px-6 lg:px-12 max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row items-center gap-16 lg:gap-24">
          <div className="w-full md:w-1/2 relative">
            <div className="story-image relative aspect-[4/5] rounded-t-full overflow-hidden p-2 border border-luxury-rose/30 bg-luxury-ivory/40 backdrop-blur-sm">
              <img 
                src={slider3} 
                alt="Handcrafted Crochet" 
                className="w-full h-full object-cover rounded-t-full"
              />
              <div className="absolute inset-0 rounded-t-full shadow-[inset_0_0_40px_rgba(220,164,182,0.2)] pointer-events-none"></div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-full shadow-xl border border-luxury-champagne/40 w-32 h-32 flex flex-col items-center justify-center text-center story-text">
              <span className="text-3xl font-serif italic text-luxury-rose">100%</span>
              <span className="text-[8px] uppercase tracking-widest font-bold text-luxury-charcoal">Handmade</span>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <span className="story-text text-[10px] uppercase tracking-[0.3em] text-luxury-rose font-bold mb-6 block">The WebPearll Atelier</span>
            <h2 className="story-text text-4xl md:text-5xl lg:text-6xl font-serif italic mb-8 leading-tight tracking-tighter">
              Woven with <br />intention & grace.
            </h2>
            <p className="story-text text-luxury-text/70 mb-6 leading-relaxed font-light text-base md:text-lg">
              Every piece in our collection is meticulously handcrafted by skilled artisans. We believe in the slow art of crochet, where each stitch tells a story of patience, dedication, and unparalleled attention to detail.
            </p>
            <p className="story-text text-luxury-text/70 mb-10 leading-relaxed font-light text-base md:text-lg">
              From ethereal rose bouquets to heirloom amigurumi bears, our creations are designed to be treasured forever. Experience the luxury of true craftsmanship.
            </p>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-32 px-6 lg:px-12 max-w-7xl mx-auto border-t border-luxury-champagne/30">
        <div className="text-center mb-16 collection-item">
          <span className="text-[10px] uppercase tracking-[0.3em] text-luxury-rose font-bold mb-4 block">Signature Pieces</span>
          <h2 className="text-4xl md:text-5xl font-serif italic tracking-tighter">Most Coveted</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {bestSellers.map(product => (
            <div key={product.id} className="collection-item">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center collection-item">
          <Link 
            to="/shop" 
            className="inline-flex items-center gap-3 px-8 py-4 border border-luxury-charcoal text-[11px] uppercase tracking-[0.2em] hover:bg-luxury-charcoal hover:text-luxury-cream transition-colors rounded-sm font-bold shadow-sm"
          >
            Discover All Products
          </Link>
        </div>
      </section>
      
    </div>
  );
}
