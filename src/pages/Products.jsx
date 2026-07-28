import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Search, SlidersHorizontal, RotateCcw, PackageSearch } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import {
  selectAllProducts,
  selectSelectedCategory,
  selectSearchQuery,
  selectSortBy,
  selectSelectedPrice,
  setCategory,
  setSearchQuery,
  setSortBy,
  setSelectedPrice,
  resetFilters,
} from '../store/productSlice';

export default function Products() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const allProducts = useSelector(selectAllProducts);
  const selectedCategory = useSelector(selectSelectedCategory);
  const searchQuery = useSelector(selectSearchQuery);
  const sortBy = useSelector(selectSortBy);
  const selectedPrice = useSelector(selectSelectedPrice);

  // Parse category query parameter from URL if navigated via link
  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) {
      dispatch(setCategory(catParam));
    }
  }, [searchParams, dispatch]);

  const categories = [
    { label: 'All Categories', value: 'all' },
    { label: 'Electronics', value: 'electronics' },
    { label: 'Clothing', value: 'clothing' },
    { label: 'Furniture', value: 'furniture' },
    { label: 'Home Essentials', value: 'home' },
    { label: 'Sports & Fitness', value: 'sports' },
    { label: 'Accessories', value: 'accessories' },
  ];

  // Filtering Logic
  const filteredProducts = allProducts.filter((product) => {
    // Category match
    const matchesCategory =
      selectedCategory === 'all' || product.category.toLowerCase() === selectedCategory.toLowerCase();

    // Search query match
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      query === '' ||
      product.title.toLowerCase().includes(query) ||
      product.description.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query);

    // Price match
    const matchesPrice = product.price <= selectedPrice;

    return matchesCategory && matchesQuery && matchesPrice;
  });

  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating-desc') return b.rating.rate - a.rating.rate;
    if (sortBy === 'rating-asc') return a.rating.rate - b.rating.rate;
    return 0;
  });

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-zinc-800">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Explore All Products
          </h1>
          <p className="text-zinc-400 text-sm mt-1">
            Showing <strong className="text-[#bef264]">{sortedProducts.length}</strong> of {allProducts.length} total items
          </p>
        </div>

        {/* Live Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
            placeholder="Search products, brands..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#141416] border border-zinc-800 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-[#bef264] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => dispatch(setSearchQuery(''))}
              className="absolute right-3 top-3 text-xs text-zinc-500 hover:text-zinc-300"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Control Bar: Categories & Sort & Filter Slider */}
      <div className="bg-[#0c0c0e] rounded-2xl p-4 border border-[#222226] flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                dispatch(setCategory(cat.value));
                setSearchParams(cat.value === 'all' ? {} : { category: cat.value });
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.value
                  ? 'bg-[#bef264] text-black font-extrabold shadow-md shadow-[#bef264]/10'
                  : 'bg-[#141416] text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filters Right Column (Price & Sort) */}
        <div className="flex flex-wrap items-center gap-4 pt-2 lg:pt-0 border-t lg:border-t-0 border-zinc-800">
          
          {/* Price Range */}
          <div className="flex items-center gap-2 text-xs text-zinc-400 min-w-[180px]">
            <span>Max Price:</span>
            <input
              type="range"
              min="10"
              max="1000"
              step="10"
              value={selectedPrice}
              onChange={(e) => dispatch(setSelectedPrice(Number(e.target.value)))}
              className="accent-[#bef264] cursor-pointer flex-1"
            />
            <span className="font-bold text-[#bef264]">${selectedPrice}</span>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-zinc-400" />
            <select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
              className="bg-[#141416] border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-200 font-semibold focus:outline-none focus:border-[#bef264]"
            >
              <option value="all">Sort by: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Rated</option>
              <option value="rating-asc">Lowest Rated</option>
            </select>
          </div>

          {/* Reset Filters button */}
          {(selectedCategory !== 'all' || searchQuery !== '' || sortBy !== 'all' || selectedPrice !== 1000) && (
            <button
              onClick={() => {
                dispatch(resetFilters());
                setSearchParams({});
              }}
              className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 font-semibold px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}

        </div>

      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="py-20 text-center bg-[#0c0c0e] rounded-3xl border border-[#222226] max-w-md mx-auto p-8">
          <div className="w-16 h-16 rounded-2xl bg-[#141416] border border-zinc-800 flex items-center justify-center text-zinc-500 mx-auto mb-4">
            <PackageSearch className="w-8 h-8 text-[#bef264]" />
          </div>
          <h3 className="font-heading text-xl font-bold text-white mb-2">No Products Found</h3>
          <p className="text-zinc-400 text-sm mb-6">
            We couldn't find any products matching your current filters or search query.
          </p>
          <button
            onClick={() => {
              dispatch(resetFilters());
              setSearchParams({});
            }}
            className="px-6 py-2.5 bg-[#bef264] hover:bg-[#a3e635] text-black font-extrabold text-sm rounded-xl transition-all shadow-md cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
}
