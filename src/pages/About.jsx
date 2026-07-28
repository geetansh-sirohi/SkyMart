import React from 'react';
import { ShoppingBag, Award, Sparkles, Globe, Heart } from 'lucide-react';

export default function About() {
  const team = [
    {
      name: 'Aryan Shah',
      role: 'Founder & CEO',
      bio: 'Visionary entrepreneur with over 12 years of retail tech innovation leadership.',
      avatar: 'A',
    },
    {
      name: 'Priya Mehta',
      role: 'Head of Product',
      bio: 'Product strategist focused on creating intuitive, user-centric e-commerce applications.',
      avatar: 'P',
    },
    {
      name: 'Rohan Verma',
      role: 'Lead Engineer',
      bio: 'Full-stack architect ensuring sub-second performance and solid system reliability.',
      avatar: 'R',
    },
    {
      name: 'Sneha Kapoor',
      role: 'Design Director',
      bio: 'UI/UX specialist crafting visual systems and delightful micro-interactions.',
      avatar: 'S',
    },
  ];

  const values = [
    {
      title: 'Uncompromised Quality',
      description: 'We source only certified authentic products directly from authorized manufacturer channels.',
      icon: Award,
    },
    {
      title: 'Customer-First Ethos',
      description: 'Your satisfaction is our primary metric. We offer instant refunds and 24/7 dedicated support.',
      icon: Heart,
    },
    {
      title: 'Tech Innovation',
      description: 'Leveraging modern web architecture to provide seamless, lightning-fast shopping interfaces.',
      icon: Sparkles,
    },
    {
      title: 'Sustainable Retail',
      description: 'Committed to eco-friendly packaging and carbon-neutral delivery logistics.',
      icon: Globe,
    },
  ];

  return (
    <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#141416] border border-zinc-800 text-[#bef264] text-xs font-semibold">
          <ShoppingBag className="w-4 h-4 text-[#bef264]" />
          <span>Our Story & Mission</span>
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-white tracking-tight">
          What We Stand For
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
          Founded with a simple mission: to build the world's most accessible, transparent, and aesthetically stunning online shopping destination.
        </p>
      </div>

      {/* Stats Counter Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl bg-[#0c0c0e] border border-[#222226] text-center">
          <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#bef264] mb-1">50+</div>
          <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Curated Products</span>
        </div>
        <div className="p-6 rounded-2xl bg-[#0c0c0e] border border-[#222226] text-center">
          <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#bef264] mb-1">10k+</div>
          <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Happy Shoppers</span>
        </div>
        <div className="p-6 rounded-2xl bg-[#0c0c0e] border border-[#222226] text-center">
          <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#bef264] mb-1">99.9%</div>
          <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">On-Time Delivery</span>
        </div>
        <div className="p-6 rounded-2xl bg-[#0c0c0e] border border-[#222226] text-center">
          <div className="font-heading text-3xl sm:text-4xl font-extrabold text-[#bef264] mb-1">24/7</div>
          <span className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Customer Care</span>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="space-y-10">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-white">Core Values</h2>
          <p className="text-zinc-400 text-sm mt-1">The foundational pillars that guide everything we build.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div key={idx} className="p-6 rounded-2xl bg-[#0c0c0e] border border-[#222226] space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#192d0a] border border-[#2a4810] text-[#bef264] flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="font-heading font-bold text-white text-base">{v.title}</h4>
                <p className="text-xs text-zinc-400 leading-relaxed">{v.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Leadership Team Showcase */}
      <div className="space-y-10">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold text-white">Meet the Team</h2>
          <p className="text-zinc-400 text-sm mt-1">The passionate minds driving SkyMart's vision forward.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((m, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#0c0c0e] border border-[#222226] text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-2xl bg-[#bef264] text-black flex items-center justify-center text-2xl font-extrabold shadow-md">
                {m.avatar}
              </div>
              <div>
                <h4 className="font-heading font-bold text-white text-lg">{m.name}</h4>
                <span className="text-xs font-semibold text-[#bef264]">{m.role}</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
