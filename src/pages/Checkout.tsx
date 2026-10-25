import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../store/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle2, QrCode, ArrowLeft, Smartphone, Upload, Camera } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

export default function Checkout() {
  const { items, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation' | 'success'>('details');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });

    if (items.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-luxury-cream px-6 text-luxury-charcoal">
        <h2 className="text-2xl font-serif italic tracking-tighter mb-6 text-luxury-charcoal">Your gift box is empty</h2>
        <button onClick={() => navigate('/shop')} className="border border-luxury-charcoal px-8 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-luxury-charcoal hover:text-luxury-cream transition-colors rounded-sm shadow-sm">
          Return to Shop
        </button>
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

  const gst = cartTotal * 0.18;
  const shipping = cartTotal > 15000 ? 0 : 500;
  // Calculate total discount from products if they have MRP > Price
  const totalDiscount = items.reduce((acc, item) => acc + ((item.mrp - item.price) * item.quantity), 0);
  const grandTotal = cartTotal + gst + shipping;

  const upiId = "anshikatrikha4@okhdfcbank";
  const upiName = "WebPearll";
  const upiAmount = grandTotal.toFixed(2);
  const upiString = `upi://pay?pa=${upiId}&pn=${upiName}&am=${upiAmount}&cu=INR`;
  
  const gpayLink = `gpay://upi/pay?pa=${upiId}&pn=${upiName}&am=${upiAmount}&cu=INR`;
  const phonepeLink = `phonepe://pay?pa=${upiId}&pn=${upiName}&am=${upiAmount}&cu=INR`;
  const paytmLink = `paytmmp://pay?pa=${upiId}&pn=${upiName}&am=${upiAmount}&cu=INR`;
  const bhimLink = `bhim://pay?pa=${upiId}&pn=${upiName}&am=${upiAmount}&cu=INR`;

  const handleDetailsSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePaymentConfirm = (e: FormEvent) => {
    e.preventDefault();
    
    // Grab transaction ID
    const transactionIdInput = document.getElementById('transactionId') as HTMLInputElement;
    const transactionId = transactionIdInput?.value || 'Unknown';

    // Save order to localStorage for admin panel
    const newOrder = {
      id: 'ORD-' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
      customer: formData,
      items: items,
      total: grandTotal,
      transactionId: transactionId,
      status: 'Pending',
      createdAt: new Date().toISOString()
    };
    
    try {
      const existingOrders = JSON.parse(localStorage.getItem('webpearll_orders') || '[]');
      const safeOrders = Array.isArray(existingOrders) ? existingOrders : [];
      localStorage.setItem('webpearll_orders', JSON.stringify([newOrder, ...safeOrders]));
    } catch {
      // Ignore storage quota / privacy mode errors
    }

    setStep('success');
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-luxury-cream min-h-screen pt-24 pb-24 text-luxury-charcoal">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        
        {step !== 'success' && (
          <div className="flex items-center gap-4 mb-12 text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-text/40 border-b border-luxury-champagne/30 pb-6">
            <span className={step === 'details' ? 'text-luxury-charcoal' : ''}>1. Details</span>
            <span>/</span>
            <span className={step === 'payment' || step === 'confirmation' ? 'text-luxury-charcoal' : ''}>2. Payment</span>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative items-start">
          
          {/* Main Content Area */}
          <div className="w-full lg:w-3/5">
            <AnimatePresence mode="wait">
              {step === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <h2 className="text-3xl font-serif italic tracking-tighter mb-8 text-luxury-charcoal">Delivery Details</h2>
                  <form onSubmit={handleDetailsSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-text/70">Full Name</label>
                        <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-luxury-ivory border border-luxury-champagne/50 px-4 py-3 focus:outline-none focus:border-luxury-rose focus:ring-1 focus:ring-luxury-rose/20 transition-all text-sm rounded-sm shadow-sm" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-text/70">Phone Number</label>
                        <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="bg-luxury-ivory border border-luxury-champagne/50 px-4 py-3 focus:outline-none focus:border-luxury-rose focus:ring-1 focus:ring-luxury-rose/20 transition-all text-sm rounded-sm shadow-sm" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-text/70">Email Address</label>
                      <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-luxury-ivory border border-luxury-champagne/50 px-4 py-3 focus:outline-none focus:border-luxury-rose focus:ring-1 focus:ring-luxury-rose/20 transition-all text-sm rounded-sm shadow-sm" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-text/70">Delivery Address</label>
                      <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="House, Street, Area" className="bg-luxury-ivory border border-luxury-champagne/50 px-4 py-3 focus:outline-none focus:border-luxury-rose focus:ring-1 focus:ring-luxury-rose/20 transition-all text-sm rounded-sm shadow-sm placeholder:text-luxury-text/30" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-text/70">City</label>
                        <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="bg-luxury-ivory border border-luxury-champagne/50 px-4 py-3 focus:outline-none focus:border-luxury-rose focus:ring-1 focus:ring-luxury-rose/20 transition-all text-sm rounded-sm shadow-sm" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-text/70">PIN Code</label>
                        <input required type="text" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} className="bg-luxury-ivory border border-luxury-champagne/50 px-4 py-3 focus:outline-none focus:border-luxury-rose focus:ring-1 focus:ring-luxury-rose/20 transition-all text-sm rounded-sm shadow-sm" />
                      </div>
                    </div>
                    
                    <button type="submit" className="mt-6 bg-luxury-charcoal text-luxury-cream py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-luxury-rose transition-colors rounded-sm shadow-md">
                      Continue to Payment
                    </button>
                  </form>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <button onClick={() => setStep('details')} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-luxury-text/50 hover:text-luxury-charcoal mb-8 transition-colors">
                    <ArrowLeft className="w-3 h-3 text-luxury-rose" /> Back to details
                  </button>
                  
                  <h2 className="text-3xl font-serif italic tracking-tighter mb-8 text-luxury-charcoal">Premium UPI Checkout</h2>
                  
                  <div className="bg-luxury-ivory border border-luxury-champagne/50 p-8 flex flex-col items-center text-center rounded-sm shadow-sm">
                    <div className="w-64 h-64 bg-white flex flex-col items-center justify-center mb-8 relative border border-luxury-champagne/30 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(220,164,182,0.15)] p-4">
                      <QRCodeSVG value={upiString} size={224} />
                    </div>
                    
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-text/50 mb-2">Amount to Pay</p>
                    <h3 className="text-4xl font-serif italic mb-10 text-luxury-charcoal">{formatPrice(grandTotal)}</h3>
                    
                    <div className="w-full border-t border-luxury-champagne/30 pt-8 mb-10">
                      <p className="text-sm text-luxury-text/70 mb-6 font-light">Scan this QR using any UPI app. Supported payment methods:</p>
                      
                      <div className="flex flex-wrap justify-center gap-6 mb-10">
                        {/* Fake logos for UPI apps */}
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full border border-luxury-champagne/30 flex items-center justify-center bg-white shadow-sm">
                            <span className="font-bold text-lg text-blue-600">G</span>
                          </div>
                          <span className="text-[9px] uppercase tracking-widest text-luxury-text/60 font-bold">GPay</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full border border-luxury-champagne/30 flex items-center justify-center bg-white shadow-sm">
                            <span className="font-bold text-lg text-purple-600">पे</span>
                          </div>
                          <span className="text-[9px] uppercase tracking-widest text-luxury-text/60 font-bold">PhonePe</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full border border-luxury-champagne/30 flex items-center justify-center bg-white shadow-sm">
                            <span className="font-bold text-lg text-sky-500">Pay</span>
                          </div>
                          <span className="text-[9px] uppercase tracking-widest text-luxury-text/60 font-bold">Paytm</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-12 h-12 rounded-full border border-luxury-champagne/30 flex items-center justify-center bg-white shadow-sm">
                            <span className="font-bold text-lg text-orange-500">B</span>
                          </div>
                          <span className="text-[9px] uppercase tracking-widest text-luxury-text/60 font-bold">BHIM</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <a href={gpayLink} className="flex items-center justify-center gap-3 border border-luxury-champagne/50 py-3 px-4 hover:border-luxury-rose transition-colors text-[10px] font-bold uppercase tracking-wider text-luxury-charcoal bg-white rounded-sm shadow-sm">
                          Pay with GPay
                        </a>
                        <a href={phonepeLink} className="flex items-center justify-center gap-3 border border-luxury-champagne/50 py-3 px-4 hover:border-luxury-rose transition-colors text-[10px] font-bold uppercase tracking-wider text-luxury-charcoal bg-white rounded-sm shadow-sm">
                          Pay with PhonePe
                        </a>
                        <a href={paytmLink} className="flex items-center justify-center gap-3 border border-luxury-champagne/50 py-3 px-4 hover:border-luxury-rose transition-colors text-[10px] font-bold uppercase tracking-wider text-luxury-charcoal bg-white rounded-sm shadow-sm">
                          Pay with Paytm
                        </a>
                        <a href={bhimLink} className="flex items-center justify-center gap-3 border border-luxury-champagne/50 py-3 px-4 hover:border-luxury-rose transition-colors text-[10px] font-bold uppercase tracking-wider text-luxury-charcoal bg-white rounded-sm shadow-sm">
                          Pay with BHIM
                        </a>
                        <a href={upiString} className="flex items-center justify-center gap-3 border border-luxury-champagne/50 py-3 px-4 hover:border-luxury-rose transition-colors text-[10px] font-bold uppercase tracking-wider sm:col-span-2 text-luxury-charcoal bg-white rounded-sm shadow-sm">
                          <Smartphone className="w-4 h-4 text-luxury-rose" /> Pay with Any UPI App
                        </a>
                      </div>
                    </div>

                    <button 
                      onClick={() => setStep('confirmation')}
                      className="w-full bg-luxury-rose text-white py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#DCA4B6]/90 transition-colors flex items-center justify-center gap-2 rounded-sm shadow-md"
                    >
                      <CheckCircle2 className="w-4 h-4" /> I Have Paid
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'confirmation' && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                   <button onClick={() => setStep('payment')} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-text/50 hover:text-luxury-charcoal mb-8 transition-colors">
                    <ArrowLeft className="w-3 h-3 text-luxury-rose" /> Back to Payment Options
                  </button>

                  <h2 className="text-3xl font-serif italic tracking-tighter mb-8 text-luxury-charcoal">Payment Verification</h2>
                  
                  <div className="bg-luxury-ivory border border-luxury-champagne/50 p-8 rounded-sm shadow-sm">
                    <p className="text-sm text-luxury-text/70 mb-8 leading-relaxed font-light">
                      Please provide your payment details for verification. Our team will verify the UPI transaction before processing your order.
                    </p>
                    <form onSubmit={handlePaymentConfirm} className="flex flex-col gap-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-text/70">Full Name</label>
                          <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="bg-white border border-luxury-champagne/30 px-4 py-3 focus:outline-none focus:border-luxury-rose transition-colors text-sm rounded-sm shadow-sm" placeholder="Name on account" />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-text/70">Phone Number</label>
                          <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="bg-white border border-luxury-champagne/30 px-4 py-3 focus:outline-none focus:border-luxury-rose transition-colors text-sm rounded-sm shadow-sm" placeholder="Number linked to UPI" />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-text/70">Email Address (Optional)</label>
                        <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="bg-white border border-luxury-champagne/30 px-4 py-3 focus:outline-none focus:border-luxury-rose transition-colors text-sm rounded-sm shadow-sm" />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-charcoal flex items-center gap-2">
                          UPI Transaction ID / UTR Number <span className="text-luxury-rose">*</span>
                        </label>
                        <input required type="text" id="transactionId" placeholder="12-digit UTR Number" className="bg-white border border-luxury-champagne/30 px-4 py-3 focus:outline-none focus:border-luxury-rose transition-colors text-sm font-mono rounded-sm shadow-sm" />
                        <span className="text-xs text-luxury-text/40 italic">Found in your UPI app's transaction history.</span>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-text/70">Upload Screenshot (Optional)</label>
                        <div className="border-2 border-dashed border-luxury-champagne/50 bg-white p-6 text-center hover:border-luxury-rose/50 transition-colors relative cursor-pointer rounded-sm">
                          <input type="file" accept="image/*" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                          <Camera className="w-6 h-6 text-luxury-rose/50 mx-auto mb-2" />
                          <span className="text-xs text-luxury-text/50">Click to upload payment screenshot</span>
                        </div>
                      </div>

                       <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-luxury-text/70">Order Notes (Optional)</label>
                        <textarea rows={3} className="bg-white border border-luxury-champagne/30 px-4 py-3 focus:outline-none focus:border-luxury-rose transition-colors text-sm resize-none rounded-sm shadow-sm"></textarea>
                      </div>
                      
                      <div className="flex gap-4 mt-6">
                         <button type="button" onClick={() => setStep('payment')} className="w-1/3 bg-transparent border border-luxury-charcoal text-luxury-charcoal py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-luxury-rose/10 hover:border-luxury-rose transition-colors rounded-sm shadow-sm">
                          Cancel
                        </button>
                        <button type="submit" className="w-2/3 bg-luxury-charcoal text-luxury-cream py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-luxury-rose transition-colors rounded-sm shadow-md">
                          Submit Payment
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-luxury-ivory p-12 text-center flex flex-col items-center justify-center border border-luxury-champagne/50 rounded-xl shadow-lg"
                >
                  <CheckCircle2 className="w-16 h-16 text-luxury-rose mb-6" />
                  <h2 className="text-3xl font-serif italic tracking-tighter mb-4 text-luxury-charcoal">Payment Submitted Successfully!</h2>
                  <p className="text-luxury-text/70 mb-8 max-w-md mx-auto leading-relaxed text-sm font-light">
                    Thank you. Your payment request has been received. Our team will verify your UPI transaction and confirm your order shortly. You'll receive updates via WhatsApp, SMS, or Email.
                  </p>
                  <Link to="/" className="bg-luxury-charcoal text-luxury-cream px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-luxury-rose transition-colors inline-block rounded-sm shadow-md">
                    Return to Home
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          {step !== 'success' && (
            <div className="w-full lg:w-2/5 lg:sticky lg:top-32">
              <div className="bg-luxury-ivory border border-luxury-champagne/50 p-8 shadow-sm rounded-sm">
                <h3 className="text-lg font-serif italic tracking-wide mb-6 text-luxury-charcoal">Order Summary</h3>
                
                <div className="flex flex-col gap-6 mb-6 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map(item => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="relative">
                        <img src={item.image} alt={item.name} className="w-20 h-24 object-cover bg-luxury-cream rounded-sm border border-luxury-champagne/30 group-hover:border-luxury-rose/30 transition-colors" />
                        <span className="absolute -top-2 -right-2 bg-luxury-rose text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <h4 className="text-sm font-medium line-clamp-1 text-luxury-charcoal">{item.name}</h4>
                        <div className="flex items-center gap-2 mt-2">
                           <span className="text-sm font-serif italic text-luxury-charcoal">{formatPrice(item.price)}</span>
                           {item.price < item.mrp && (
                             <span className="text-xs text-luxury-text/40 line-through font-serif italic">{formatPrice(item.mrp)}</span>
                           )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-luxury-champagne/40 pt-6 flex flex-col gap-4 text-sm font-light text-luxury-text/80">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-serif italic text-luxury-charcoal">{formatPrice(cartTotal)}</span>
                  </div>
                  {totalDiscount > 0 && (
                     <div className="flex justify-between text-luxury-rose font-medium">
                      <span>Discount</span>
                      <span className="font-serif italic">-{formatPrice(totalDiscount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span className="font-serif italic text-luxury-charcoal">{formatPrice(gst)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-serif italic text-luxury-charcoal">{shipping === 0 ? 'Complimentary' : formatPrice(shipping)}</span>
                  </div>
                  <div className="border-t border-luxury-champagne/40 pt-4 flex justify-between font-bold text-lg mt-2 items-center">
                    <span className="text-luxury-charcoal text-[10px] uppercase tracking-[0.2em]">Grand Total</span>
                    <span className="font-serif italic text-2xl text-luxury-charcoal">{formatPrice(grandTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
