import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, LogOut, Menu, X, Zap } from 'lucide-react';
import { toggleCart, selectTotalQuantity } from '../store/cartSlice';
import { selectUser, selectIsAuthenticated, logoutUser } from '../store/authSlice';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalQuantity = useSelector(selectTotalQuantity);
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === '/' || path === '/home') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    return location.pathname.startsWith(path);
  };

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Shop', path: '/products' },
    { name: 'About', path: '/about' },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#0a0a0c]/90 backdrop-blur-xl border-b border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/home" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-[#bef264] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
            <Zap className="w-4 h-4 text-black fill-black" />
          </div>
          <span className="font-heading text-xl font-extrabold tracking-tight text-white">
            SkyMart
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors duration-200 ${
                isActive(link.path)
                  ? 'text-[#bef264] font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {isAuthenticated && user ? (
            <>
              {/* User Profile Badge Pill */}
              <div className="flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-full bg-[#141416] border border-zinc-800/80">
                <div className="w-6 h-6 rounded-full bg-[#bef264] text-black font-extrabold text-xs flex items-center justify-center shadow-xs shrink-0">
                  {user.avatar || user.name?.charAt(0).toUpperCase() || 'G'}
                </div>
                <span className="text-xs font-semibold text-zinc-200 truncate max-w-[130px] sm:max-w-[160px]">
                  {user.name}
                </span>
              </div>

              {/* Cart Trigger */}
              <button
                onClick={() => dispatch(toggleCart())}
                className="w-9 h-9 rounded-xl bg-[#141416] hover:bg-zinc-800/80 border border-zinc-800/80 text-zinc-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center relative"
                title="Shopping Cart"
              >
                <ShoppingCart className="w-4 h-4" />
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#bef264] text-black text-[10px] font-extrabold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalQuantity}
                  </span>
                )}
              </button>

              {/* Direct Logout Button */}
              <button
                onClick={handleLogout}
                className="w-9 h-9 rounded-xl bg-[#141416] hover:bg-zinc-800/80 border border-zinc-800/80 text-zinc-300 hover:text-white transition-colors cursor-pointer flex items-center justify-center"
                title="Log out"
              >
                <LogOut className="w-4 h-4 text-zinc-300" />
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-medium text-zinc-400 hover:text-white px-3 py-2 transition-colors"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-[#bef264] hover:bg-[#a3e635] text-black font-extrabold text-xs rounded-xl transition-all"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-xl bg-[#141416] text-zinc-300 hover:text-white border border-zinc-800 flex items-center justify-center cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-[#0c0c0e]/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive(link.path)
                  ? 'bg-volt/10 text-volt border border-volt/20'
                  : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
          {!isAuthenticated && (
            <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl text-zinc-300 bg-[#18181b] hover:bg-zinc-800 font-medium text-xs border border-zinc-800"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center btn-volt py-2.5 text-xs font-bold"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
