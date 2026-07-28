import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Truck } from 'lucide-react';
import {
  selectCartItems,
  selectCartIsOpen,
  selectTotalAmount,
  selectTotalQuantity,
  closeCart,
  increment,
  decrement,
  removeFromCart,
  clearCart,
} from '../store/cartSlice';

export default function CartDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector(selectCartItems);
  const isOpen = useSelector(selectCartIsOpen);
  const totalAmount = useSelector(selectTotalAmount);
  const totalQuantity = useSelector(selectTotalQuantity);
  
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'SKY10') {
      setDiscount(0.10);
      setCouponApplied(true);
    } else if (couponCode.trim().toUpperCase() === 'SKY20') {
      setDiscount(0.20);
      setCouponApplied(true);
    } else {
      alert('Invalid Coupon Code! Try SKY10 or SKY20.');
    }
  };

  const freeDeliveryThreshold = 999;
  const progressToFreeDelivery = Math.min(100, (totalAmount / freeDeliveryThreshold) * 100);
  const amountLeftForFreeDelivery = Math.max(0, freeDeliveryThreshold - totalAmount);

  const discountAmount = totalAmount * discount;
  const finalTotal = Math.max(0, totalAmount - discountAmount);

  const handleCheckout = () => {
    if (items.length === 0) return;
    setCheckoutSuccess(true);
    setTimeout(() => {
      dispatch(clearCart());
      setCheckoutSuccess(false);
      dispatch(closeCart());
      navigate('/home');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop Overlay */}
      <div
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
        onClick={() => dispatch(closeCart())}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md glass-panel bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Your Shopping Cart</h3>
              <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                {totalQuantity} items
              </span>
            </div>
            <button
              onClick={() => dispatch(closeCart())}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Banner */}
          {items.length > 0 && (
            <div className="px-6 py-3 bg-slate-900/80 border-b border-slate-800/60">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <Truck className="w-3.5 h-3.5 text-indigo-400" />
                  {amountLeftForFreeDelivery === 0 ? (
                    <span className="text-emerald-400 font-semibold">🎉 You unlocked FREE Delivery!</span>
                  ) : (
                    <span>Add <strong className="text-white">₹{amountLeftForFreeDelivery.toFixed(0)}</strong> more for Free Delivery</span>
                  )}
                </span>
                <span className="text-slate-400 font-semibold">{progressToFreeDelivery.toFixed(0)}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${progressToFreeDelivery}%` }}
                />
              </div>
            </div>
          )}

          {/* Checkout Success Celebration Banner */}
          {checkoutSuccess && (
            <div className="p-4 bg-emerald-500/20 border-b border-emerald-500/30 text-center animate-bounce">
              <p className="text-emerald-400 font-bold text-sm">🎉 Order Placed Successfully!</p>
              <p className="text-slate-300 text-xs mt-1">Thank you for shopping with SkyMart!</p>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-heading text-lg font-bold text-white mb-1">Your cart is empty</h4>
                <p className="text-slate-400 text-sm mb-6 max-w-xs">
                  Looks like you haven't added anything to your cart yet. Explore our top catalog items!
                </p>
                <button
                  onClick={() => {
                    dispatch(closeCart());
                    navigate('/products');
                  }}
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm transition-all shadow-lg shadow-indigo-600/30"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-2xl glass-card border border-slate-800/80 hover:border-slate-700 transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-xl object-cover bg-slate-900 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-white truncate">{item.title}</h4>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-slate-500 hover:text-red-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-indigo-400 font-semibold mt-0.5">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg p-1">
                        <button
                          onClick={() => dispatch(decrement(item.id))}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(increment(item.id))}
                          className="w-6 h-6 rounded flex items-center justify-center text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950 space-y-4">
              
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon (e.g. SKY10)"
                    disabled={couponApplied}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 uppercase placeholder:normal-case focus:outline-none focus:border-indigo-500 disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={couponApplied}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition-colors disabled:opacity-50"
                >
                  {couponApplied ? 'Applied' : 'Apply'}
                </button>
              </form>

              {/* Price Calculation Lines */}
              <div className="space-y-1.5 text-xs text-slate-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-slate-200 font-semibold">${totalAmount.toFixed(2)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="text-emerald-400 font-semibold">
                    {totalAmount >= freeDeliveryThreshold ? 'FREE' : '$5.99'}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-white font-bold pt-2 border-t border-slate-800">
                  <span>Grand Total</span>
                  <span className="text-indigo-400">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => dispatch(clearCart())}
                  className="py-3 px-4 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white font-medium text-xs transition-colors"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={checkoutSuccess}
                  className="py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
                >
                  Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
