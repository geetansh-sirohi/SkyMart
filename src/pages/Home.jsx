import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  ArrowRight,
  Package,
  TrendingUp,
  Star,
  Tag,
  ShoppingBag,
  Zap,
} from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { selectAllProducts } from '../store/productSlice';
import { selectUser } from '../store/authSlice';
import { selectTotalQuantity, selectTotalAmount, addToCart } from '../store/cartSlice';

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(selectAllProducts);
  const user = useSelector(selectUser);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalAmount = useSelector(selectTotalAmount);

  const firstName = user?.name ? user.name.split(' ')[0] : 'Geetansh';

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'GOOD MORNING 👋';
    if (hour < 17) return 'GOOD AFTERNOON 👋';
    return 'GOOD EVENING 👋';
  };

  const categories = [
    { name: 'Electronics', key: 'electronics', emoji: '💻', count: '17 items' },
    { name: 'Clothing', key: 'clothing', emoji: '📦', count: '2 items' },
    { name: 'Furniture', key: 'furniture', emoji: '📦', count: '3 items' },
    { name: 'Home', key: 'home', emoji: '📦', count: '14 items' },
    { name: 'Sports', key: 'sports', emoji: '📦', count: '8 items' },
    { name: 'Accessories', key: 'accessories', emoji: '📦', count: '6 items' },
  ];

  // Specific products for Top Rated and New Arrivals matching reference image 2
  const topRatedProducts = products.filter(p => p.id === 6 || p.id === 4 || p.rating?.rate >= 4.5).slice(0, 2);
  const newArrivalsProducts = products.filter(p => p.id === 1 || p.id === 2 || p.id === 13).slice(0, 2);

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Exact Pixel-Perfect Main Hero Box */}
      <section className="rounded-3xl hero-card-grid border border-[#222226] p-8 sm:p-10 lg:p-12 relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-stretch gap-8 relative z-10">
          
          {/* Left Side Content */}
          <div className="flex-1 min-w-0 pr-0 md:pr-4">
            <p className="text-[#bef264] text-xs sm:text-sm font-bold uppercase tracking-widest mb-3 flex items-center gap-1.5 font-heading">
              {getGreeting()}
            </p>

            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-white tracking-tight leading-[1.08]">
              Welcome back,
            </h1>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#bef264] tracking-tight leading-[1.08] mb-6">
              {firstName}!
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-8 max-w-md font-sans">
              Discover today's picks — hand-curated products across electronics, fashion, and more.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="px-7 py-3.5 bg-[#bef264] hover:bg-[#a3e635] text-black font-extrabold text-sm rounded-full flex items-center justify-center gap-2 transition-all shadow-md shadow-[#bef264]/10 cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
              <Link
                to="/products"
                className="px-6 py-3.5 bg-[#141416] border border-zinc-800 hover:border-zinc-700 text-zinc-200 font-semibold text-sm rounded-2xl flex items-center justify-center transition-all cursor-pointer"
              >
                View All Products
              </Link>
            </div>
          </div>

          {/* Right Side Stacked Stat Cards Column */}
          <div className="w-full md:w-[230px] shrink-0 flex flex-col justify-between gap-4">
            
            {/* Top Stat Box */}
            <div className="flex-1 bg-[#15240c] border border-[#2b4810] rounded-2xl p-6 flex flex-col justify-center min-h-[110px]">
              <h3 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#bef264] mb-1 leading-none">
                20+
              </h3>
              <p className="text-xs text-zinc-400 font-medium">Products Available</p>
            </div>

            {/* Bottom Stat Box */}
            <div className="flex-1 bg-[#141416] border border-zinc-800 rounded-2xl p-6 flex flex-col justify-center min-h-[110px]">
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-1 leading-none">
                Free
              </h3>
              <p className="text-xs text-zinc-400 font-medium">Delivery on ₹999+</p>
            </div>

          </div>

        </div>
      </section>

      {/* 4 Metric Cards Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Cart Items */}
        <div className="bg-[#0c0c0e] border border-[#222226] rounded-2xl p-5 flex items-center gap-4 hover:border-zinc-700 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-[#192d0a] border border-[#2a4810] text-[#bef264] flex items-center justify-center shrink-0">
            <Package className="w-6 h-6" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-white leading-none mb-1">
              {totalQuantity || 0}
            </span>
            <span className="text-sm font-semibold text-zinc-200 truncate">Cart Items</span>
            <span className="text-xs text-zinc-400 mt-0.5">In your bag</span>
          </div>
        </div>

        {/* Card 2: Cart Value */}
        <div className="bg-[#0c0c0e] border border-[#222226] rounded-2xl p-5 flex items-center gap-4 hover:border-zinc-700 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-[#0e2136] border border-[#1a3b61] text-blue-400 flex items-center justify-center shrink-0">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-white leading-none mb-1">
              ${totalAmount.toFixed(2)}
            </span>
            <span className="text-sm font-semibold text-zinc-200 truncate">Cart Value</span>
            <span className="text-xs text-zinc-400 mt-0.5">Ready to checkout</span>
          </div>
        </div>

        {/* Card 3: Top Products */}
        <div className="bg-[#0c0c0e] border border-[#222226] rounded-2xl p-5 flex items-center gap-4 hover:border-zinc-700 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-[#2a2009] border border-[#48370d] text-amber-400 flex items-center justify-center shrink-0">
            <Star className="w-6 h-6 fill-amber-400/20" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-white leading-none mb-1">
              5
            </span>
            <span className="text-sm font-semibold text-zinc-200 truncate">Top Products</span>
            <span className="text-xs text-zinc-400 mt-0.5">Highly rated</span>
          </div>
        </div>

        {/* Card 4: Categories */}
        <div className="bg-[#0c0c0e] border border-[#222226] rounded-2xl p-5 flex items-center gap-4 hover:border-zinc-700 transition-colors">
          <div className="w-12 h-12 rounded-xl bg-[#250f35] border border-[#411a5c] text-purple-400 flex items-center justify-center shrink-0">
            <Tag className="w-6 h-6" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-heading font-extrabold text-2xl sm:text-3xl text-white leading-none mb-1">
              6
            </span>
            <span className="text-sm font-semibold text-zinc-200 truncate">Categories</span>
            <span className="text-xs text-zinc-400 mt-0.5">To explore</span>
          </div>
        </div>

      </section>

      {/* Shop by Category Section (Pixel Perfect Match to Image 2) */}
      <section className="pt-2">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-heading text-2xl font-bold text-white tracking-tight">Shop by Category</h2>
          <Link
            to="/products"
            className="text-xs sm:text-sm font-semibold text-[#bef264] hover:underline flex items-center gap-1"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <div
              key={cat.key}
              onClick={() => navigate(`/products?category=${cat.key}`)}
              className="p-6 rounded-3xl bg-white hover:bg-slate-50 text-center cursor-pointer transition-all duration-200 shadow-md border border-gray-100 flex flex-col items-center justify-center"
            >
              <div className="text-3xl mb-3">
                {cat.emoji}
              </div>
              <h3 className="font-heading font-bold text-gray-900 text-sm sm:text-base mb-0.5">
                {cat.name}
              </h3>
              <span className="text-xs text-gray-500 font-medium">{cat.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Top Rated & New Arrivals Section (Pixel Perfect Match to Image 2) */}
      <section className="pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Left Column: Top Rated */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                <span className="text-amber-400">⭐</span> Top Rated
              </h2>
              <Link
                to="/products"
                className="text-xs font-semibold text-[#bef264] hover:underline flex items-center gap-1"
              >
                See all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-xl border border-gray-100 space-y-3">
              {topRatedProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="bg-[#f8f9fa] border border-gray-200/60 rounded-2xl p-3.5 flex items-center justify-between shadow-xs hover:border-gray-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl shadow-xs shrink-0"
                    />
                    <div className="min-w-0 hidden sm:block">
                      <h4 className="text-xs font-bold text-gray-900 truncate max-w-[160px]">{product.title}</h4>
                      <p className="text-[11px] text-gray-500 truncate max-w-[160px]">{product.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-extrabold text-base sm:text-lg text-[#84cc16]">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-10 h-10 rounded-xl bg-[#f4fce3] hover:bg-[#e4f8b0] text-[#84cc16] flex items-center justify-center cursor-pointer transition-colors shadow-xs shrink-0"
                      title="Add to cart"
                    >
                      <ShoppingBag className="w-4 h-4 fill-[#84cc16]/10" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: New Arrivals */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-bold text-white flex items-center gap-2">
                <span className="text-[#bef264]">⚡</span> New Arrivals
              </h2>
              <Link
                to="/products"
                className="text-xs font-semibold text-[#bef264] hover:underline flex items-center gap-1"
              >
                See all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="bg-white rounded-3xl p-5 shadow-xl border border-gray-100 space-y-3">
              {newArrivalsProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/products/${product.id}`)}
                  className="bg-[#f8f9fa] border border-gray-200/60 rounded-2xl p-3.5 flex items-center justify-between shadow-xs hover:border-gray-300 transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl shadow-xs shrink-0"
                    />
                    <div className="min-w-0 hidden sm:block">
                      <h4 className="text-xs font-bold text-gray-900 truncate max-w-[160px]">{product.title}</h4>
                      <p className="text-[11px] text-gray-500 truncate max-w-[160px]">{product.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-extrabold text-base sm:text-lg text-[#84cc16]">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => handleAddToCart(e, product)}
                      className="w-10 h-10 rounded-xl bg-[#f4fce3] hover:bg-[#e4f8b0] text-[#84cc16] flex items-center justify-center cursor-pointer transition-colors shadow-xs shrink-0"
                      title="Add to cart"
                    >
                      <ShoppingBag className="w-4 h-4 fill-[#84cc16]/10" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
