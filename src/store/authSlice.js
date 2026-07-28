import { createSlice } from '@reduxjs/toolkit';

const loadUsersFromStorage = () => {
  try {
    const users = localStorage.getItem('skymart_users');
    return users ? JSON.parse(users) : [];
  } catch (e) {
    return [];
  }
};

const loadSessionUserFromStorage = () => {
  try {
    const user = localStorage.getItem('skymart_auth_user');
    return user ? JSON.parse(user) : null;
  } catch (e) {
    return null;
  }
};

const initialSession = loadSessionUserFromStorage();

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: initialSession,
    isAuthenticated: !!initialSession,
    error: null,
    loading: false,
  },
  reducers: {
    registerUser: (state, action) => {
      const { name, email, password } = action.payload;
      const users = loadUsersFromStorage();

      if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        state.error = 'Email already registered!';
        return;
      }

      const avatarInitial = name ? name.trim()[0].toUpperCase() : 'U';
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        password,
        avatar: avatarInitial,
        joinedAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem('skymart_users', JSON.stringify(users));

      const { password: _, ...userWithoutPassword } = newUser;
      state.user = userWithoutPassword;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('skymart_auth_user', JSON.stringify(userWithoutPassword));
    },
    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const users = loadUsersFromStorage();
      
      const found = users.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (!found) {
        state.error = 'Invalid email or password';
        return;
      }

      const { password: _, ...userWithoutPassword } = found;
      state.user = userWithoutPassword;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem('skymart_auth_user', JSON.stringify(userWithoutPassword));
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('skymart_auth_user');
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { registerUser, loginUser, logoutUser, clearError } = authSlice.actions;
export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer;
