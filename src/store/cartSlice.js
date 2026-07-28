import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem('skymart_cart');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    return [];
  }
};

const saveCartToStorage = (items) => {
  try {
    localStorage.setItem('skymart_cart', JSON.stringify(items));
  } catch (e) {
    console.error('Failed to save cart to localStorage', e);
  }
};

const initialItems = loadCartFromStorage();

const calculateTotals = (items) => {
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { totalQuantity, totalAmount: parseFloat(totalAmount.toFixed(2)) };
};

const totals = calculateTotals(initialItems);

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: initialItems,
    isOpen: false,
    totalQuantity: totals.totalQuantity,
    totalAmount: totals.totalAmount,
    toastMessage: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find(item => item.id === product.id);

      if (existing) {
        existing.quantity += (product.quantity || 1);
      } else {
        state.items.push({
          ...product,
          quantity: product.quantity || 1,
        });
      }

      const { totalQuantity, totalAmount } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
      state.toastMessage = `Added "${product.title}" to cart`;
      saveCartToStorage(state.items);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      const existing = state.items.find(item => item.id === id);
      state.items = state.items.filter(item => item.id !== id);

      const { totalQuantity, totalAmount } = calculateTotals(state.items);
      state.totalQuantity = totalQuantity;
      state.totalAmount = totalAmount;
      if (existing) {
        state.toastMessage = `Removed "${existing.title}" from cart`;
      }
      saveCartToStorage(state.items);
    },
    increment: (state, action) => {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity += 1;
        const { totalQuantity, totalAmount } = calculateTotals(state.items);
        state.totalQuantity = totalQuantity;
        state.totalAmount = totalAmount;
        saveCartToStorage(state.items);
      }
    },
    decrement: (state, action) => {
      const id = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.items = state.items.filter(i => i.id !== id);
        }
        const { totalQuantity, totalAmount } = calculateTotals(state.items);
        state.totalQuantity = totalQuantity;
        state.totalAmount = totalAmount;
        saveCartToStorage(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      state.toastMessage = 'Cart cleared';
      saveCartToStorage([]);
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    clearToast: (state) => {
      state.toastMessage = null;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increment,
  decrement,
  clearCart,
  openCart,
  closeCart,
  toggleCart,
  clearToast,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartIsOpen = (state) => state.cart.isOpen;
export const selectTotalQuantity = (state) => state.cart.totalQuantity;
export const selectTotalAmount = (state) => state.cart.totalAmount;
export const selectToastMessage = (state) => state.cart.toastMessage;

export default cartSlice.reducer;
