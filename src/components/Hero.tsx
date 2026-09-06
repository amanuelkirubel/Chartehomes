import React from 'react';
import { CharteLogo } from './CharteLogo';
import { FilterState, Language, ViewMode } from '../types';
import { TRANSLATIONS } from '../translations';
import { ETHIOPIAN_CITIES } from '../data/mockListings';
import { Search, RotateCcw, MapPin, BedDouble, DollarSign } from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  activeMode: ViewMode;
  onSetMode: (mode: ViewMode) => void;
  filters: FilterState;
  onFilterChange: (patch: Partial<FilterState>) => void;
  onClearFilters: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang,
  activeMode,
  onSetMode,
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="relative bg-[#2D2D24] text-white overflow-hidden">
      {/* Background Architectural Imagery & Atmospheric Gradients */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80"
          alt="Charte Homes Modern Real Estate"
          className="w-full h-full object-cover opacity-20 scale-105 transform motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D2D24] via-[#2D2D24]/85 to-[#3A3A2C]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(166,139,103,0.22),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-24">
        {/* Brand Header / Eyebrow */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#A68B67]/20 border border-[#A68B67]/40 text-[#D8C7B0] text-xs font-bold uppercase tracking-[0.2em] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A68B67]"></span>
              {t.hero_eyebrow}
            </div>

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight leading-[1.15] mb-4 italic"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {t.hero_title}
            </h1>

            <p className="text-base sm:text-lg text-[#D2CEBE] leading-relaxed font-light">
              {t.hero_desc}
            </p>
          </div>

          {/* Prominent Logo Card Emblem */}
          <div className="hidden lg:flex flex-col items-center shrink-0">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-[36px] bg-gradient-to-r from-[#A68B67] to-[#5A5A40] opacity-30 blur-lg group-hover:opacity-60 transition duration-500"></div>
              <CharteLogo variant="badge" size="lg" theme="natural" className="w-44 h-44 shadow-2xl border-[6px] border-white/15" />
            </div>
            <div className="mt-3 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/15 text-[11px] text-[#E5E2D9] font-serif italic text-center tracking-wide">
              "Sanctuary for the soul"
            </div>
          </div>
        </div>

        {/* Mode switcher tabs: Buy, Rent */}
        <div className="flex items-center gap-2 mb-4">
          <button
            onClick={() => onSetMode('buy')}
            className={`px-8 py-3 rounded-t-2xl text-xs font-bold uppercase tracking-widest transition-all ${
              activeMode === 'buy'
                ? 'bg-[#F5F5F0] text-[#2C2C26] shadow-md border-t-2 border-[#5A5A40]'
                : 'bg-[#3D3D30]/80 text-[#D4D1C5] hover:text-white hover:bg-[#484838]'
            }`}
          >
            {t.mode_buy}
          </button>
          <button
            onClick={() => onSetMode('rent')}
            className={`px-8 py-3 rounded-t-2xl text-xs font-bold uppercase tracking-widest transition-all ${
              activeMode === 'rent'
                ? 'bg-[#F5F5F0] text-[#2C2C26] shadow-md border-t-2 border-[#5A5A40]'
                : 'bg-[#3D3D30]/80 text-[#D4D1C5] hover:text-white hover:bg-[#484838]'
            }`}
          >
            {t.mode_rent}
          </button>
        </div>

        {/* Floating Filter Panel */}
        <div className="bg-[#F5F5F0] rounded-3xl rounded-tl-none p-5 sm:p-6 shadow-2xl border border-[#E5E2D9] text-[#2C2C26]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* City selector */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#7A786C]">
                <MapPin className="w-3.5 h-3.5 text-[#5A5A40]" />
                {t.label_city}
              </label>
              <select
                value={filters.city}
                onChange={(e) => onFilterChange({ city: e.target.value })}
                className="w-full bg-white border border-[#DDD9CE] text-[#2C2C26] rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#5A5A40] transition-all"
              >
                <option value="">{t.all_cities}</option>
                {ETHIOPIAN_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Min Price */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#7A786C]">
                <DollarSign className="w-3.5 h-3.5 text-[#5A5A40]" />
                {t.label_min_price}
              </label>
              <input
                type="number"
                min="0"
                step="100000"
                placeholder="e.g. 5,000,000"
                value={filters.minPrice}
                onChange={(e) => onFilterChange({ minPrice: e.target.value })}
                className="w-full bg-white border border-[#DDD9CE] text-[#2C2C26] rounded-xl px-3.5 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#5A5A40] transition-all"
              />
            </div>

            {/* Max Price */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#7A786C]">
                <DollarSign className="w-3.5 h-3.5 text-[#5A5A40]" />
                {t.label_max_price}
              </label>
              <input
                type="number"
                min="0"
                step="100000"
                placeholder="e.g. 60,000,000"
                value={filters.maxPrice}
                onChange={(e) => onFilterChange({ maxPrice: e.target.value })}
                className="w-full bg-white border border-[#DDD9CE] text-[#2C2C26] rounded-xl px-3.5 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#5A5A40] transition-all"
              />
            </div>

            {/* Bedrooms */}
            <div className="space-y-1.5">
              <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#7A786C]">
                <BedDouble className="w-3.5 h-3.5 text-[#5A5A40]" />
                {t.label_bedrooms}
              </label>
              <select
                value={filters.bedrooms}
                onChange={(e) => onFilterChange({ bedrooms: e.target.value })}
                className="w-full bg-white border border-[#DDD9CE] text-[#2C2C26] rounded-xl px-3.5 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#5A5A40] transition-all"
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
                className="w-full flex items-center justify-center gap-2 bg-[#EAE8DF] hover:bg-[#DDD8CB] text-[#5A5A40] font-semibold text-xs uppercase tracking-widest px-4 py-2.5 rounded-xl border border-[#D5CEBF] transition-all active:scale-[0.98]"
              >
                <RotateCcw className="w-4 h-4 text-[#5A5A40]" />
                <span>{t.btn_clear}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
