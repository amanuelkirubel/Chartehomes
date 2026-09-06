import React from 'react';
import { CharteLogo } from './CharteLogo';
import { FilterState, Language, ViewMode } from '../types';
import { TRANSLATIONS } from '../translations';
import { ETHIOPIAN_CITIES } from '../data/mockListings';
import { RotateCcw, MapPin, BedDouble, DollarSign, Download, Sparkles } from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  activeMode: ViewMode;
  onSetMode: (mode: ViewMode) => void;
  filters: FilterState;
  onFilterChange: (patch: Partial<FilterState>) => void;
  onClearFilters: () => void;
  onOpenDownloadApp?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  activeMode,
  onSetMode,
  filters,
  onFilterChange,
  onClearFilters,
  onOpenDownloadApp,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="relative bg-[#071E3D] text-white overflow-hidden">
      {/* Background Architectural Imagery & Atmospheric Blue Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt="Charte Homes Ethiopian Real Estate"
          className="w-full h-full object-cover opacity-20 scale-105 transform motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#071E3D] via-[#0A2244]/85 to-[#0D3166]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.25),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-24">
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

            <p className="text-base sm:text-lg text-blue-100/90 leading-relaxed font-light">
              {t.hero_desc}
            </p>
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

        {/* Mode switcher tabs: Buy, Rent */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => onSetMode('buy')}
            className={`px-8 py-3 rounded-t-2xl text-xs font-bold uppercase tracking-widest transition-all ${
              activeMode === 'buy'
                ? 'bg-white text-[#0A2244] shadow-md border-t-2 border-blue-600'
                : 'bg-white/10 text-blue-200 hover:text-white hover:bg-white/15'
            }`}
          >
            {t.mode_buy}
          </button>
          <button
            onClick={() => onSetMode('rent')}
            className={`px-8 py-3 rounded-t-2xl text-xs font-bold uppercase tracking-widest transition-all ${
              activeMode === 'rent'
                ? 'bg-white text-[#0A2244] shadow-md border-t-2 border-blue-600'
                : 'bg-white/10 text-blue-200 hover:text-white hover:bg-white/15'
            }`}
          >
            {t.mode_rent}
          </button>
        </div>

        {/* Floating Filter Panel */}
        <div className="bg-white rounded-3xl rounded-tl-none p-5 sm:p-6 shadow-2xl border border-blue-100 text-[#0F2340]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* City selector */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488]">
                <MapPin className="w-3.5 h-3.5 text-[#1E40AF]" />
                {t.label_city}
              </label>
              <select
                value={filters.city}
                onChange={(e) => onFilterChange({ city: e.target.value })}
                className="w-full bg-[#F6F9FD] border border-[#D3E1F2] text-[#0A2244] rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1E40AF] transition-all"
              >
                <option value="">{t.all_cities}</option>
                {ETHIOPIAN_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Min Price */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488]">
                <DollarSign className="w-3.5 h-3.5 text-[#1E40AF]" />
                {t.label_min_price}
              </label>
              <input
                type="number"
                min="0"
                step="100000"
                placeholder="e.g. 5,000,000"
                value={filters.minPrice}
                onChange={(e) => onFilterChange({ minPrice: e.target.value })}
                className="w-full bg-[#F6F9FD] border border-[#D3E1F2] text-[#0A2244] rounded-xl px-3.5 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1E40AF] transition-all"
              />
            </div>

            {/* Max Price */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488]">
                <DollarSign className="w-3.5 h-3.5 text-[#1E40AF]" />
                {t.label_max_price}
              </label>
              <input
                type="number"
                min="0"
                step="100000"
                placeholder="e.g. 60,000,000"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
                className="w-full bg-[#F6F9FD] border border-[#D3E1F2] text-[#0A2244] rounded-xl px-3.5 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1E40AF] transition-all"
              />
            </div>

            {/* Bedrooms */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488]">
                <BedDouble className="w-3.5 h-3.5 text-[#1E40AF]" />
                {t.label_bedrooms}
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) => onFilterChange({ bedrooms: e.target.value })}
                className="w-full bg-[#F6F9FD] border border-[#D3E1F2] text-[#0A2244] rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#1E40AF] transition-all"
              >
                <option value="">{t.any_beds}</option>
                <option value="1">1+ Bedrooms</option>
                <option value="2">2+ Bedrooms</option>
                <option value="3">3+ Bedrooms</option>
                <option value="4">4+ Bedrooms</option>
                <option value="5">5+ Bedrooms</option>
              </select>
            </div>

            {/* Clear Button */}
            <div className="flex items-end">
              <button
                onClick={onClearFilters}
                className="w-full flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-[#1E40AF] font-semibold text-xs uppercase tracking-widest px-4 py-2.5 rounded-xl border border-blue-200 transition-all active:scale-[0.98]"
              >
                <RotateCcw className="w-4 h-4 text-[#1E40AF]" />
                <span>{t.btn_clear}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
