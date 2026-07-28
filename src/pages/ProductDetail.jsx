import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Star,
  ShoppingBag,
  ArrowLeft,
  Check,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
  Sparkles,
  PackageSearch,
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { selectAllProducts } from '../store/productSlice';
import { addToCart, openCart, selectCartItems } from '../store/cartSlice';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const cartItems = useSelector(selectCartItems);

  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="max-w-md mx-auto py-20 text-center glass-panel rounded-3xl border border-slate-800 p-8 my-10">
        <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-600 mx-auto mb-4">
          <PackageSearch className="w-8 h-8 text-indigo-400" />
        </div>
        <h3 className="font-heading text-xl font-bold text-white mb-2">Product Not Found</h3>
        <p className="text-slate-400 text-sm mb-6">
          The requested product ID could not be located in our catalog.
        </p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-sm shadow-lg shadow-indigo-600/30"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>
      </div>
    );
  }

  const cartItem = cartItems.find((item) => item.id === product.id);
  const inCartCount = cartItem ? cartItem.quantity : 0;

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
  };

  const handleBuyNow = () => {
    dispatch(addToCart({ ...product, quantity }));
    dispatch(openCart());
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link to="/home" className="hover:text-indigo-400 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-indigo-400 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-slate-200 font-semibold truncate max-w-xs">{product.title}</span>
      </div>

      {/* Main Detail Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left Column: Image Showcase */}
        <div className="relative rounded-3xl overflow-hidden glass-card border border-slate-800 p-4 aspect-square bg-slate-900">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover object-center rounded-2xl"
          />
          <div className="absolute top-8 left-8">
            <span className="px-3.5 py-1.5 rounded-xl bg-slate-950/80 backdrop-blur-md text-xs font-bold text-indigo-400 border border-slate-800 uppercase tracking-widest">
              {product.category}
            </span>
          </div>
        </div>

        {/* Right Column: Product Information & Purchase Controls */}
        <div className="space-y-6">
          
          {/* Header & Rating */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="flex items-center text-amber-400 gap-1 bg-amber-400/10 px-2.5 py-1 rounded-lg border border-amber-400/20">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="text-xs font-bold text-amber-300">{product.rating.rate}</span>
              </div>
              <span className="text-xs text-slate-400">({product.rating.count} customer reviews)</span>
              <span className="text-slate-600">•</span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                In Stock & Ready to Ship
              </span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              {product.title}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-extrabold text-white">${product.price.toFixed(2)}</span>
              <span className="text-xs text-slate-400">Inclusive of all local taxes</span>
            </div>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed border-t border-b border-slate-800/80 py-4">
            {product.description}
          </p>

          {/* Key Features Bullet List */}
          {product.features && product.features.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Highlights</h4>
              <div className="grid grid-cols-2 gap-2.5">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300 glass-card px-3 py-2 rounded-xl border border-slate-800">
                    <Check className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector & Action CTAs */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quantity:</span>
              <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-xl p-1.5">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold text-white px-2">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="py-4 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm flex items-center justify-center gap-2 border border-slate-700 transition-all shadow-lg"
              >
                <ShoppingBag className="w-4 h-4 text-indigo-400" />
                {inCartCount > 0 ? `Add More (${inCartCount} in cart)` : 'Add to Cart'}
              </button>
              <button
                onClick={handleBuyNow}
                className="py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 transition-all hover:scale-105"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Guarantee Badges */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-indigo-400" />
              <span>Fast Express Dispatch</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Authentic Product</span>
            </div>
          </div>

        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-slate-800 space-y-8">
          <div>
            <h3 className="font-heading text-2xl font-bold text-white">Related Products</h3>
            <p className="text-slate-400 text-xs mt-1">More items from the <span className="text-indigo-400 uppercase font-semibold">{product.category}</span> category</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.id} product={relProduct} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
