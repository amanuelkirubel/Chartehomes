import React from 'react';
import { Listing, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { Bed, Bath, Maximize2, MapPin, ChevronRight } from 'lucide-react';

interface ListingCardProps {
  listing: Listing;
  currentLang: Language;
  onSelect: (listing: Listing) => void;
}

export const ListingCard: React.FC<ListingCardProps> = ({
  listing,
  currentLang,
  onSelect,
}) => {
  const t = TRANSLATIONS[currentLang];

  // Ribbon logic
  const isNew = () => {
    const days = (Date.now() - new Date(listing.created_at).getTime()) / (1000 * 60 * 60 * 24);
    return days <= 4;
  };

  const formatPrice = (num: number) => {
    return Number(num).toLocaleString('en-US') + ' ETB';
  };

  const coverPhoto = listing.photos && listing.photos[0]
    ? listing.photos[0]
    : 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80';

  return (
    <div
      onClick={() => onSelect(listing)}
      className="group bg-white rounded-3xl border border-blue-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Photo Container with Ribbon */}
      <div className="relative h-60 w-full bg-slate-100 overflow-hidden">
        <img
          src={coverPhoto}
          alt={listing.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Status Ribbon */}
        {listing.status === 'sold' && (
          <div className="absolute top-3 right-3 bg-slate-800 text-white font-bold text-[10px] uppercase px-3 py-1 rounded-full shadow-md tracking-widest">
            {t.status_sold}
          </div>
        )}
        {listing.status === 'urgent' && (
          <div className="absolute top-3 right-3 bg-amber-600 text-white font-bold text-[10px] uppercase px-3 py-1 rounded-full shadow-md tracking-widest animate-pulse">
            {t.status_urgent}
          </div>
        )}
        {!listing.status && isNew() && (
          <div className="absolute top-3 right-3 bg-blue-600 text-white font-bold text-[10px] uppercase px-3 py-1 rounded-full shadow-md tracking-widest">
            {t.ribbon_new}
          </div>
        )}

        {/* Listing Type Pill on image */}
        <div className="absolute bottom-3 left-3 bg-[#0A2244]/85 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/15">
          <MapPin className="w-3.5 h-3.5 text-blue-300" />
          <span>{listing.city}</span>
          <span className="text-white/40">·</span>
          <span className="text-blue-200 uppercase tracking-wider text-[10px]">
            {listing.type === 'rent' ? t.for_rent_opt : t.for_sale_opt}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1 justify-between text-center">
        <div>
          {/* Title */}
          <h3
            className="text-lg font-semibold text-[#0F2340] line-clamp-1 mb-2 font-serif group-hover:text-[#1E40AF] transition-colors"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {listing.title}
          </h3>

          {/* Price display */}
          <div className="mb-4">
            <span
              className="text-2xl font-bold text-[#1E40AF] tracking-tight block"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {formatPrice(listing.price)}
              {listing.type === 'rent' && (
                <span className="text-xs font-normal text-slate-500 tracking-normal ml-1">
                  {t.card_per_month}
                </span>
              )}
            </span>
          </div>
        </div>

        <div>
          {/* Key Specs Bar */}
          <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-slate-100 text-xs font-medium text-slate-600 mb-5">
            <div className="flex items-center justify-center gap-1.5">
              <Bed className="w-4 h-4 text-[#1E40AF]" />
              <span>{listing.bedrooms} {t.card_bd}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 border-x border-slate-100">
              <Bath className="w-4 h-4 text-[#1E40AF]" />
              <span>{listing.bathrooms} {t.card_ba}</span>
            </div>
            <div className="flex items-center justify-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5 text-[#1E40AF]" />
              <span>{listing.area} M²</span>
            </div>
          </div>

          {/* CTA button */}
          <button className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-full border border-blue-600 text-[#1E40AF] font-semibold text-xs uppercase tracking-widest group-hover:bg-[#1E40AF] group-hover:text-white transition-all duration-200">
            <span>{t.card_learn_more}</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
