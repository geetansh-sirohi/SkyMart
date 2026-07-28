import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, AlertCircle, Zap } from 'lucide-react';
import { registerUser, clearError, selectIsAuthenticated, selectAuthError } from '../store/authSlice';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authError = useSelector(selectAuthError);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

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
    setLocalError('');

    if (formData.password !== formData.confirm) {
      setLocalError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setLocalError('Password must be at least 6 characters long');
      return;
    }

    dispatch(
      registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    );
  };

  const displayError = localError || authError;

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex flex-col items-center justify-center p-4 text-white font-sans">
      
      {/* Top Centered Logo */}
      <div className="flex items-center gap-2.5 mb-8">
        <div className="w-9 h-9 bg-volt rounded-xl flex items-center justify-center shadow-lg shadow-volt/20">
          <Zap size={16} className="text-ink fill-ink" />
        </div>
        <span className="font-heading font-bold text-xl tracking-tight">
          Sky<span className="text-volt">Mart</span>
        </span>
      </div>

      {/* Auth Card */}
      <div className="w-full max-w-md auth-card">
        <h2 className="font-heading font-bold text-2xl mb-1">Create account</h2>
        <p className="text-white/40 text-sm font-body mb-8">
          Join SkyMart and start shopping
        </p>

        {displayError && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl mb-6 font-body flex items-center gap-2">
            <AlertCircle size={16} className="shrink-0" />
            <span>{displayError}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
            <input
              type="text"
              name="name"
              placeholder="Full name"
              value={formData.name}
              onChange={handleChange}
              className="field pl-10"
              required
            />
          </div>

          <div className="relative">
            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="field pl-10"
              required
            />
          </div>

          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password (min 6 chars)"
              value={formData.password}
              onChange={handleChange}
              className="field pl-10 pr-10"
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

          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/25" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="confirm"
              placeholder="Confirm password"
              value={formData.confirm}
              onChange={handleChange}
              className="field pl-10"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full btn-volt flex items-center justify-center gap-2 py-3.5 text-base font-heading font-bold hover:scale-[1.01] active:scale-[0.99] transition-transform"
          >
            <span>Create Account</span>
            <ArrowRight size={16} />
          </button>
        </form>

        <p className="text-center text-white/40 text-sm font-body mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-volt hover:underline font-semibold">
            Sign in
          </Link>
        </p>
      </div>

    </div>
  );
}
