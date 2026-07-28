import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Star, ShoppingBag, Check } from 'lucide-react';
import { addToCart, selectCartItems } from '../store/cartSlice';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);

  const cartItem = cartItems.find((item) => item.id === product.id);
  const inCartCount = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <div
      onClick={() => navigate(`/products/${product.id}`)}
      className="group relative bg-[#0e0e11] rounded-2xl p-4 flex flex-col justify-between cursor-pointer border border-[#232328] hover:border-volt/40 transition-all duration-300 hover:-translate-y-1"
    >
      <div>
        {/* Thumbnail Image Container */}
        <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-zinc-900 mb-4">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md text-[11px] font-semibold text-volt border border-zinc-800 uppercase tracking-wider">
              {product.category}
            </span>
          </div>
        </div>

        {/* Rating Meter */}
        <div className="flex items-center gap-1.5 mb-2">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          </div>
          <span className="text-xs font-bold text-zinc-200">{product.rating.rate}</span>
          <span className="text-[11px] text-zinc-500">({product.rating.count})</span>
        </div>

        {/* Product Title */}
        <h3 className="font-heading text-base font-bold text-white group-hover:text-volt transition-colors line-clamp-1 mb-1">
          {product.title}
        </h3>

        {/* Product Description snippet */}
        <p className="text-xs text-zinc-400 line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Footer Price & Add to Cart Action */}
      <div className="flex items-center justify-between pt-3 border-t border-zinc-800/60">
        <div>
          <span className="text-xs text-zinc-500 block">Price</span>
          <span className="text-lg font-bold text-white">${product.price.toFixed(2)}</span>
        </div>

        <button
          onClick={handleAddToCart}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
            inCartCount > 0
              ? 'bg-volt/15 text-volt border border-volt/30 hover:bg-volt/25'
              : 'bg-volt hover:bg-[#b5dc00] text-ink shadow-volt/10'
          }`}
        >
          {inCartCount > 0 ? (
            <>
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>In cart ({inCartCount})</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
