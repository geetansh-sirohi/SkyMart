import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Instagram, Mail, Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0c] border-t border-zinc-800/80 text-zinc-400 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-zinc-800/60">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/home" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-volt flex items-center justify-center shadow-lg shadow-volt/20">
                <Zap className="w-4 h-4 text-ink fill-ink" />
              </div>
              <span className="font-heading text-xl font-bold text-white">
                SkyMart
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
              Your premier destination for high-quality electronics, apparel, home decor, and lifestyle essentials at unbeatable prices.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-xl bg-[#18181b] hover:bg-zinc-800 hover:text-white text-zinc-400 flex items-center justify-center border border-zinc-800 transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-[#18181b] hover:bg-zinc-800 hover:text-white text-zinc-400 flex items-center justify-center border border-zinc-800 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-xl bg-[#18181b] hover:bg-zinc-800 hover:text-white text-zinc-400 flex items-center justify-center border border-zinc-800 transition-all">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link to="/home" className="hover:text-volt transition-colors">Home</Link></li>
              <li><Link to="/products" className="hover:text-volt transition-colors">Shop All Products</Link></li>
              <li><Link to="/about" className="hover:text-volt transition-colors">About Us</Link></li>
              <li><Link to="/login" className="hover:text-volt transition-colors">My Account</Link></li>
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">Categories</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link to="/products?category=electronics" className="hover:text-volt transition-colors">Electronics</Link></li>
              <li><Link to="/products?category=clothing" className="hover:text-volt transition-colors">Clothing & Apparel</Link></li>
              <li><Link to="/products?category=furniture" className="hover:text-volt transition-colors">Furniture</Link></li>
              <li><Link to="/products?category=home" className="hover:text-volt transition-colors">Home Essentials</Link></li>
              <li><Link to="/products?category=sports" className="hover:text-volt transition-colors">Sports & Fitness</Link></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm mb-4">Stay Connected</h4>
            <p className="text-xs sm:text-sm text-zinc-400 mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#18181b] border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-volt transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 bottom-1.5 px-3 bg-volt hover:bg-[#b5dc00] text-ink rounded-lg text-xs font-bold transition-colors flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Join
                </button>
              </div>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} SkyMart Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-400 transition-colors">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
