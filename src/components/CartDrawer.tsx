import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, ShoppingBag, Trash, Minus, Plus, Tag, ArrowRight, 
  CreditCard, ShieldCheck, CheckCircle2, FileDown, Globe, Sparkles
} from 'lucide-react';

interface CartDrawerProps {
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ onClose }) => {
  const { 
    cart, updateCartQuantity, removeFromCart, appliedCoupon, 
    applyCouponCode, removeCouponCode, createOrder, currentUser
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  
  const [paymentMethod, setPaymentMethod] = useState('easypaisa');
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [placedOrder, setPlacedOrder] = useState<any>(null);
  
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');

  const subtotal = cart.reduce((sum, item) => {
    const price = item.product.discountPrice ?? item.product.price;
    return sum + (price * item.quantity);
  }, 0);

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      discount = subtotal * (appliedCoupon.discountValue / 100);
    } else {
      discount = appliedCoupon.discountValue;
    }
  }

  const total = Math.max(0, subtotal - discount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    setCouponSuccess('');
    if (!couponInput.trim()) return;

    const res = applyCouponCode(couponInput);
    if (res.success) {
      setCouponSuccess(res.message);
      setCouponInput('');
    } else {
      setCouponError(res.message);
    }
  };

  const handleRemoveCoupon = () => {
    removeCouponCode();
    setCouponSuccess('');
    setCouponError('');
  };

  const handleProceedToCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep('checkout');
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    const order = await createOrder(paymentMethod);
    setPlacedOrder(order);
    setCheckoutStep('success');
  };

  const gateways = [
    { id: 'easypaisa', name: 'Easypaisa Mobile Wallet', desc: 'Instant mobile checkout' },
    { id: 'jazzcash', name: 'JazzCash Wallet', desc: 'Secure local payments' },
    { id: 'bank', name: 'Bank Transfer (HBL/UBL)', desc: 'Direct bank authorization' },
    { id: 'stripe', name: 'Credit / Debit Card (Stripe)', desc: 'International visa/master' },
    { id: 'paypal', name: 'PayPal Checkout', desc: 'Global payment gateway' },
    { id: 'cod', name: 'Cash on Delivery (Services only)', desc: 'Valid for enterprise project orders' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      {/* Cart Slider */}
      <div className="relative w-full max-w-md bg-white border-l-2 border-slate-900 h-full flex flex-col justify-between shadow-2xl z-10 animate-slide-left">
        
        {/* Header */}
        <div className="p-5 border-b-2 border-slate-900 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-indigo-600" />
            <h2 className="text-base font-black text-slate-900 uppercase tracking-tight font-display">
              {checkoutStep === 'cart' && 'Your Shopping Cart'}
              {checkoutStep === 'checkout' && 'Secure Checkout'}
              {checkoutStep === 'success' && 'Order Placed!'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-500 hover:text-slate-900 border border-slate-200 hover:bg-slate-50 rounded-none transition-all cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {checkoutStep === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="h-16 w-16 bg-slate-50 border-2 border-slate-900 rounded-none flex items-center justify-center text-slate-700">
                    <ShoppingBag className="h-8 w-8 text-indigo-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 uppercase font-display">Your cart is empty</h3>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px] font-medium">Explore our catalog and find the source code you need!</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-xs font-bold uppercase tracking-wider text-white rounded-none border-2 border-slate-900 transition-colors cursor-pointer"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  {cart.map((item) => {
                    const price = item.product.discountPrice ?? item.product.price;
                    return (
                      <div key={item.product.id} className="flex gap-4 p-3 bg-slate-50 border-2 border-slate-900 rounded-none shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name} 
                          className="h-14 w-20 object-cover rounded-none shrink-0 bg-slate-100 border border-slate-200" 
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-black text-slate-900 uppercase font-display tracking-tight truncate">{item.product.name}</h4>
                          <p className="text-[9px] text-indigo-600 font-bold uppercase font-mono mt-0.5">{item.product.category}</p>
                          
                          <div className="flex items-center justify-between mt-2.5">
                            <span className="text-xs font-black text-slate-900">${(price * item.quantity).toFixed(2)}</span>
                            
                            <div className="flex items-center gap-2 border-2 border-slate-900 rounded-none p-0.5 bg-white">
                              <button 
                                onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 hover:text-slate-900 text-slate-400 hover:bg-slate-50 rounded-none transition-colors"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-xs font-mono font-bold text-slate-900 w-4 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 hover:text-slate-900 text-slate-400 hover:bg-slate-50 rounded-none transition-colors"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 self-start cursor-pointer"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </>
          )}

          {checkoutStep === 'checkout' && (
            <form onSubmit={handlePlaceOrder} className="space-y-6 animate-fade-in">
              <div className="space-y-3">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono">Billing details</h3>
                <div className="space-y-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-4 py-2.5 text-xs text-slate-900 placeholder-slate-450 focus:bg-white focus:outline-none font-semibold"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-900 rounded-none px-4 py-2.5 text-xs text-slate-900 placeholder-slate-450 focus:bg-white focus:outline-none font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono">Payment Method</h3>
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {gateways.map((gate) => (
                    <label 
                      key={gate.id} 
                      className={`flex items-start gap-3 p-3 border-2 rounded-none cursor-pointer transition-all ${
                        paymentMethod === gate.id 
                          ? 'border-indigo-600 bg-indigo-50/50' 
                          : 'border-slate-900 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment_gateway"
                        checked={paymentMethod === gate.id}
                        onChange={() => setPaymentMethod(gate.id)}
                        className="mt-1 accent-indigo-600 shrink-0"
                      />
                      <div>
                        <p className="text-xs font-black text-slate-900 font-display uppercase tracking-tight">{gate.name}</p>
                        <p className="text-[9px] text-slate-500 font-bold font-mono uppercase mt-0.5">{gate.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-widest text-xs rounded-none border-2 border-slate-900 transition-all shadow-[2px_2px_0px_0px_rgba(16,185,129,1)] hover:translate-x-0.5 hover:translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="h-4 w-4" />
                <span>Authorize & Complete Payment</span>
              </button>
            </form>
          )}

          {checkoutStep === 'success' && placedOrder && (
            <div className="text-center py-6 space-y-6 animate-fade-in">
              <div className="h-14 w-14 bg-emerald-50 border-2 border-emerald-600 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 uppercase font-display">Payment Successful!</h3>
                <p className="text-xs text-slate-500 mt-1">Order Ref: <span className="font-mono font-black text-slate-900 bg-slate-50 border border-slate-200 px-1.5">{placedOrder.id}</span></p>
                <p className="text-[11px] font-semibold text-slate-500 mt-1">Your downloads are verified and active below.</p>
              </div>

              {/* Digital Invoice / Download Tray */}
              <div className="bg-slate-50 border-2 border-slate-900 rounded-none p-4 text-left space-y-3">
                <div className="flex justify-between border-b-2 border-slate-900 pb-2">
                  <span className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Item</span>
                  <span className="text-[10px] uppercase font-black text-slate-500 font-mono tracking-widest">Source Package</span>
                </div>
                
                {placedOrder.items.map((it: any) => (
                  <div key={it.id} className="flex justify-between items-center text-xs gap-3">
                    <span className="text-slate-900 font-bold truncate max-w-[150px]">{it.name}</span>
                    <button 
                      onClick={() => alert(`Downloading source package: ${it.downloadFile}`)}
                      className="flex items-center gap-1 py-1.5 px-3 border-2 border-emerald-600 hover:bg-emerald-50 bg-white text-emerald-700 rounded-none text-[9px] font-black uppercase tracking-wider cursor-pointer transition-all"
                    >
                      <FileDown className="h-3 w-3" /> Get Code (.zip)
                    </button>
                  </div>
                ))}

                <div className="border-t-2 border-slate-900 pt-3 flex justify-between text-xs font-mono font-bold">
                  <span className="text-slate-500 uppercase">Total Paid:</span>
                  <span className="text-slate-900 font-black">${placedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setCheckoutStep('cart');
                  setPlacedOrder(null);
                  onClose();
                }}
                className="w-full py-3 bg-white hover:bg-slate-50 border-2 border-slate-900 text-xs text-slate-900 rounded-none font-bold uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-x-0.5 hover:translate-y-0.5 cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Footer Summary (Not visible on success) */}
        {checkoutStep !== 'success' && cart.length > 0 && (
          <div className="p-5 border-t-2 border-slate-900 bg-white space-y-4">
            {checkoutStep === 'cart' && (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1 border-2 border-slate-900 bg-slate-50 text-slate-900 rounded-none focus-within:bg-white">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Coupon Code (e.g. SOULWELCOME)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full bg-transparent pl-9 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none font-semibold"
                  />
                </div>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border-2 border-slate-900 text-white font-bold uppercase tracking-wider text-xs rounded-none transition-all cursor-pointer"
                >
                  Apply
                </button>
              </form>
            )}

            {couponError && <p className="text-[10px] text-rose-600 font-bold uppercase tracking-wider font-mono">{couponError}</p>}
            {couponSuccess && <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider font-mono">{couponSuccess}</p>}

            {appliedCoupon && (
              <div className="flex justify-between text-xs items-center font-bold">
                <span className="text-slate-500 uppercase text-[10px] tracking-widest font-mono">
                  Coupon: <strong className="text-emerald-600 font-black font-mono">{appliedCoupon.code}</strong>
                </span>
                <button onClick={handleRemoveCoupon} className="text-rose-600 font-bold uppercase text-[10px] tracking-widest hover:underline">Remove</button>
              </div>
            )}

            <div className="space-y-1.5 border-t-2 border-slate-900 pt-3 text-xs">
              <div className="flex justify-between text-slate-500 font-bold uppercase font-mono">
                <span>Subtotal:</span>
                <span className="text-slate-900 font-bold">${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold uppercase font-mono">
                  <span>Discount:</span>
                  <span className="text-emerald-700 font-bold">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-900 font-black text-sm border-t-2 border-slate-900 pt-2 font-display uppercase tracking-tight">
                <span>Total amount:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            {checkoutStep === 'cart' && (
              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-widest text-xs rounded-none border-2 border-slate-900 transition-all shadow-[2px_2px_0px_0px_rgba(16,185,129,1)] hover:translate-x-0.5 hover:translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
