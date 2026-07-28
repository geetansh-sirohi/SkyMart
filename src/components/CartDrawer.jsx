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
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => dispatch(closeCart())}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0c0c0e] border-l border-[#222226] shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#192d0a] border border-[#2a4810] text-[#bef264] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <h3 className="font-heading text-lg font-bold text-white">Your Shopping Cart</h3>
              <span className="text-xs bg-[#141416] text-[#bef264] font-semibold px-2 py-0.5 rounded-full border border-zinc-800">
                {totalQuantity} items
              </span>
            </div>
            <button
              onClick={() => dispatch(closeCart())}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Delivery Banner */}
          {items.length > 0 && (
            <div className="px-6 py-3 bg-[#141416] border-b border-zinc-800/60">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5 text-zinc-300 font-medium">
                  <Truck className="w-3.5 h-3.5 text-[#bef264]" />
                  {amountLeftForFreeDelivery === 0 ? (
                    <span className="text-[#bef264] font-semibold">🎉 You unlocked FREE Delivery!</span>
                  ) : (
                    <span>Add <strong className="text-white">₹{amountLeftForFreeDelivery.toFixed(0)}</strong> more for Free Delivery</span>
                  )}
                </span>
                <span className="text-zinc-400 font-semibold">{progressToFreeDelivery.toFixed(0)}%</span>
              </div>
              <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#bef264] transition-all duration-300"
                  style={{ width: `${progressToFreeDelivery}%` }}
                />
              </div>
            </div>
          )}

          {/* Checkout Success Celebration Banner */}
          {checkoutSuccess && (
            <div className="p-4 bg-[#bef264]/20 border-b border-[#bef264]/30 text-center animate-bounce">
              <p className="text-[#bef264] font-bold text-sm">🎉 Order Placed Successfully!</p>
              <p className="text-zinc-300 text-xs mt-1">Thank you for shopping with SkyMart!</p>
            </div>
          )}

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8">
                <div className="w-16 h-16 rounded-2xl bg-[#141416] border border-zinc-800 flex items-center justify-center text-zinc-600 mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#bef264]" />
                </div>
                <h4 className="font-heading text-lg font-bold text-white mb-1">Your cart is empty</h4>
                <p className="text-zinc-400 text-sm mb-6 max-w-xs">
                  Looks like you haven't added anything to your cart yet. Explore our top catalog items!
                </p>
                <button
                  onClick={() => {
                    dispatch(closeCart());
                    navigate('/products');
                  }}
                  className="px-6 py-2.5 bg-[#bef264] hover:bg-[#a3e635] text-black font-extrabold text-sm rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 rounded-2xl bg-[#141416] border border-zinc-800 hover:border-zinc-700 transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-xl object-cover bg-black flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-semibold text-white truncate">{item.title}</h4>
                        <button
                          onClick={() => dispatch(removeFromCart(item.id))}
                          className="text-zinc-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-[#bef264] font-semibold mt-0.5">${item.price.toFixed(2)}</p>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 bg-[#0c0c0e] border border-zinc-800 rounded-lg p-1">
                        <button
                          onClick={() => dispatch(decrement(item.id))}
                          className="w-6 h-6 rounded flex items-center justify-center text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-white px-1">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(increment(item.id))}
                          className="w-6 h-6 rounded flex items-center justify-center text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors cursor-pointer"
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
            <div className="p-6 border-t border-zinc-800 bg-[#0c0c0e] space-y-4">
              
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon (e.g. SKY10)"
                    disabled={couponApplied}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#141416] border border-zinc-800 text-xs text-zinc-200 uppercase placeholder:normal-case focus:outline-none focus:border-[#bef264] disabled:opacity-50"
                  />
                </div>
                <button
                  type="submit"
                  disabled={couponApplied}
                  className="px-4 py-2 bg-[#141416] hover:bg-zinc-800 text-zinc-200 text-xs font-semibold rounded-xl border border-zinc-800 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {couponApplied ? 'Applied' : 'Apply'}
                </button>
              </form>

              {/* Price Calculation Lines */}
              <div className="space-y-1.5 text-xs text-zinc-400">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-zinc-200 font-semibold">${totalAmount.toFixed(2)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-[#bef264]">
                    <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Delivery</span>
                  <span className="text-[#bef264] font-semibold">
                    {totalAmount >= freeDeliveryThreshold ? 'FREE' : '$5.99'}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-white font-bold pt-2 border-t border-zinc-800">
                  <span>Grand Total</span>
                  <span className="text-[#bef264]">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => dispatch(clearCart())}
                  className="py-3 px-4 rounded-xl border border-zinc-800 bg-[#141416] hover:bg-zinc-800 text-zinc-400 hover:text-white font-medium text-xs transition-colors cursor-pointer"
                >
                  Clear Cart
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={checkoutSuccess}
                  className="py-3 px-4 rounded-xl bg-[#bef264] hover:bg-[#a3e635] text-black font-extrabold text-xs flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
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
