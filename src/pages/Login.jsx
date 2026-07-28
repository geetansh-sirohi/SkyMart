import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle, Zap } from 'lucide-react';
import { loginUser, clearError, selectIsAuthenticated, selectAuthError } from '../store/authSlice';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authError = useSelector(selectAuthError);

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) return;
    dispatch(loginUser({ email: formData.email, password: formData.password }));
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex text-white font-sans">
      
      {/* Left Column Showcase (Always visible on lg screens as shown in target screenshot) */}
      <div className="hidden lg:flex flex-1 flex-col justify-between p-12 relative overflow-hidden border-r border-white/8 bg-[#0a0a0a]">
        
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-volt/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-volt/5 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Logo Header */}
        <div className="flex items-center gap-2.5 relative z-10">
          <div className="w-9 h-9 bg-volt rounded-xl flex items-center justify-center shadow-lg shadow-volt/20">
            <Zap size={16} className="text-ink fill-ink" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight">
            Sky<span className="text-volt">Mart</span>
          </span>
        </div>

        {/* Hero Section Copy */}
        <div className="flex-1 flex flex-col justify-center relative z-10 my-auto py-12 max-w-lg">
          <p className="text-volt text-xs font-heading font-semibold mb-4 tracking-widest uppercase">
            WELCOME BACK
          </p>
          <h1 className="font-heading font-bold text-5xl sm:text-6xl leading-[1.1] mb-6">
            Shop the future.<br />
            <span className="text-volt">Today.</span>
          </h1>
          <p className="text-white/40 text-base font-body max-w-md leading-relaxed mb-10">
            Thousands of products, lightning-fast delivery, and prices that make your wallet happy.
          </p>

          {/* 3 Stat Cards */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/4 border border-white/8 rounded-2xl p-4 text-center">
              <p className="font-heading font-bold text-2xl text-volt">20K+</p>
              <p className="text-white/40 text-xs font-body mt-1">Products</p>
            </div>
            <div className="bg-white/4 border border-white/8 rounded-2xl p-4 text-center">
              <p className="font-heading font-bold text-2xl text-volt">50K+</p>
              <p className="text-white/40 text-xs font-body mt-1">Users</p>
            </div>
            <div className="bg-white/4 border border-white/8 rounded-2xl p-4 text-center">
              <p className="font-heading font-bold text-2xl text-volt">4.9★</p>
              <p className="text-white/40 text-xs font-body mt-1">Rating</p>
            </div>
          </div>
        </div>

        {/* Copyright Footer */}
        <div className="text-xs text-white/20 font-body relative z-10">
          © {new Date().getFullYear()} SkyMart Inc. All rights reserved.
        </div>
      </div>

      {/* Right Column Auth Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12 relative bg-[#0d0d0d]">
        
        {/* Mobile Header Logo (Visible on mobile/tablet) */}
        <div className="lg:hidden flex items-center gap-2.5 mb-8">
          <div className="w-9 h-9 bg-volt rounded-xl flex items-center justify-center shadow-lg shadow-volt/20">
            <Zap size={16} className="text-ink fill-ink" />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight">
            Sky<span className="text-volt">Mart</span>
          </span>
        </div>

        {/* Auth Card */}
        <div className="w-full max-w-md auth-card">
          <h2 className="font-heading font-bold text-2xl mb-1">Sign in</h2>
          <p className="text-white/40 text-sm font-body mb-8">
            Enter your credentials to continue
          </p>

          {authError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6 font-body flex items-center gap-2">
              <AlertCircle size={16} className="shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                className="field pl-10"
                autoComplete="email"
                required
              />
            </div>

            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="field pl-10 pr-10"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            <button
              type="submit"
              className="w-full btn-volt flex items-center justify-center gap-2 py-3.5 text-base font-heading font-bold hover:scale-[1.01] active:scale-[0.99] transition-transform"
            >
              <span>Sign in</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <p className="text-center text-white/40 text-sm font-body mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-volt hover:underline font-semibold">
              Create one
            </Link>
          </p>
        </div>

      </div>

    </div>
  );
}
