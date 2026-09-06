import React from 'react';
import { CharteLogo } from './CharteLogo';
import { Language, ViewMode } from '../types';
import { TRANSLATIONS } from '../translations';
import { Download, Sparkles, Home, PlusCircle, ArrowDown } from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  activeMode: ViewMode;
  onSetMode: (mode: ViewMode) => void;
  onOpenSell: () => void;
  onOpenDownloadApp?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  activeMode,
  onSetMode,
  onOpenSell,
  onOpenDownloadApp,
}) => {
  const t = TRANSLATIONS[currentLang];

  const handleBuyClick = () => {
    onSetMode('buy');
    const listingsEl = document.getElementById('listings-section');
    if (listingsEl) {
      listingsEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative bg-[#071E3D] text-white overflow-hidden">
      {/* Background Architectural Imagery & Atmospheric Blue Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt="Charte Homes Ethiopian Real Estate"
          className="w-full h-full object-cover opacity-20 scale-105 transform motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071E3D] via-[#0A2244]/90 to-[#0D3166]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.25),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-20">
        {/* Brand Header / Eyebrow */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 flex-wrap mb-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-bold uppercase tracking-[0.2em]">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                {t.hero_eyebrow}
              </div>

              {onOpenDownloadApp && (
                <button
                  onClick={onOpenDownloadApp}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-xs font-semibold text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-blue-300" />
                  <span>{t.download_app}</span>
                </button>
              )}
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] mb-4"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {t.hero_title}
            </h1>

            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed font-light mb-8">
              {t.hero_desc}
            </p>

            {/* Sell and Buy Buttons Only (Replacing the old filter bar) */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-5 pt-2">
              {/* BUY Button */}
              <button
                onClick={handleBuyClick}
                className={`flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 rounded-full font-bold text-sm sm:text-base uppercase tracking-wider transition-all duration-200 shadow-xl active:scale-95 ${
                  activeMode === 'buy'
                    ? 'bg-white text-[#0A2244] shadow-blue-950/40 ring-4 ring-blue-400/40 hover:bg-blue-50 scale-102'
                    : 'bg-[#1E40AF] text-white hover:bg-[#1D4ED8] border border-blue-400/30'
                }`}
                aria-label="Browse homes to buy"
              >
                <Home className="w-5 h-5 text-[#2563EB]" />
                <span>{t.nav_buy}</span>
                <ArrowDown className="w-4 h-4 opacity-70 ml-1" />
              </button>

              {/* SELL Button */}
              <button
                onClick={onOpenSell}
                className="flex items-center justify-center gap-2.5 px-8 sm:px-10 py-4 rounded-full font-bold text-sm sm:text-base uppercase tracking-wider bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-xl shadow-emerald-950/30 hover:scale-102 active:scale-95 transition-all duration-200 border border-emerald-300/30"
                aria-label="Sell or list your home with Charte Homes"
              >
                <PlusCircle className="w-5 h-5 text-emerald-100" />
                <span>{t.nav_sell}</span>
              </button>
            </div>
          </div>

          {/* Prominent Logo Card Emblem */}
          <div className="hidden lg:flex flex-col items-center shrink-0">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-[36px] bg-gradient-to-r from-blue-500 to-indigo-600 opacity-40 blur-lg group-hover:opacity-75 transition duration-500"></div>
              <CharteLogo variant="badge" size="lg" theme="blue" className="w-44 h-44 shadow-2xl border-[4px] border-white/20" />
            </div>
            <div className="mt-3 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 text-[11px] text-blue-100 font-serif italic text-center tracking-wide flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Ethiopian Verified Real Estate</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
