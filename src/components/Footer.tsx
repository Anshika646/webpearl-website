import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="py-10 px-6 lg:px-12 border-t border-luxury-rose/20 flex flex-col md:flex-row justify-between items-center gap-6 bg-luxury-ivory text-luxury-charcoal">
      <div className="flex gap-8 items-center">
        <span className="text-[9px] uppercase tracking-[0.2em] font-medium cursor-pointer hover:text-luxury-rose transition-colors">Instagram</span>
        <span className="text-[9px] uppercase tracking-[0.2em] font-medium cursor-pointer hover:text-luxury-rose transition-colors">Pinterest</span>
        <span className="text-[9px] uppercase tracking-[0.2em] font-medium cursor-pointer hover:text-luxury-rose transition-colors">Journal</span>
      </div>
      <div className="text-[9px] tracking-[0.3em] uppercase text-luxury-charcoal/60 animate-pulse text-center font-medium">
        Bespoke Handcrafted Luxury
      </div>
      <div className="text-[10px] text-luxury-charcoal/60 italic font-serif uppercase tracking-widest">
        EST. {new Date().getFullYear()}
      </div>
    </footer>
  );
}
