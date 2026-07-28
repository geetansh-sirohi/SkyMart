import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-md w-full glass-panel rounded-3xl p-10 border border-slate-800 space-y-6">
        <div className="w-20 h-20 rounded-3xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/30">
          <ShoppingBag className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">404 Error</span>
          <h1 className="font-heading text-3xl font-extrabold text-white">Page Not Found</h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            The page you are looking for doesn't exist or has been moved. Go shop something cool!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            to="/home"
            className="w-full sm:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            to="/products"
            className="w-full sm:w-auto px-6 py-3 glass-card hover:bg-slate-800 text-slate-300 rounded-xl font-semibold text-xs border border-slate-700 transition-all"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
