import { createSlice } from '@reduxjs/toolkit';
import { products as initialProducts } from '../data/products.js';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: initialProducts,
    selectedCategory: 'all',
    searchQuery: '',
    sortBy: 'all',
    maxPrice: 1000,
    selectedPrice: 1000,
  },
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    setSelectedPrice: (state, action) => {
      state.selectedPrice = action.payload;
    },
    resetFilters: (state) => {
      state.selectedCategory = 'all';
      state.searchQuery = '';
      state.sortBy = 'all';
      state.selectedPrice = 1000;
    },
  },
});

export const {
  setCategory,
  setSearchQuery,
  setSortBy,
  setSelectedPrice,
  resetFilters,
} = productSlice.actions;

export const selectAllProducts = (state) => state.products.items;
export const selectSelectedCategory = (state) => state.products.selectedCategory;
export const selectSearchQuery = (state) => state.products.searchQuery;
export const selectSortBy = (state) => state.products.sortBy;
export const selectSelectedPrice = (state) => state.products.selectedPrice;

export default productSlice.reducer;
