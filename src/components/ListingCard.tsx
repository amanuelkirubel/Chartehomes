import React, { useState } from 'react';
import { Listing, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { Bed, Bath, Maximize2, MapPin, ChevronRight, ChevronLeft, Camera } from 'lucide-react';

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

  const fallbackPhoto =
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80';
  const photos =
    listing.photos && listing.photos.length > 0 ? listing.photos : [fallbackPhoto];

  const [currentPhotoIdx, setCurrentPhotoIdx] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  // Ribbon logic
  const isNew = () => {
    const days = (Date.now() - new Date(listing.created_at).getTime()) / (1000 * 60 * 60 * 24);
    return days <= 4;
  };

  const formatPrice = (num: number) => {
    return Number(num).toLocaleString('en-US') + ' ETB';
  };

  const handlePrevPhoto = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleNextPhoto = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    setCurrentPhotoIdx((prev) => (prev + 1) % photos.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchStartX - touchEndX;

    if (Math.abs(deltaX) > 40 && photos.length > 1) {
      if (deltaX > 0) {
        // Swiped left -> next photo
        handleNextPhoto(e);
      } else {
        // Swiped right -> previous photo
        handlePrevPhoto(e);
      }
    }
    setTouchStartX(null);
  };

  return (
    <div
      onClick={() => onSelect(listing)}
      className="group bg-white rounded-3xl border border-blue-100 overflow-hidden shadow-sm hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col cursor-pointer transform hover:-translate-y-1"
    >
      {/* Photo Container with Interactive Carousel Controls (Changeable without entering inside) */}
      <div
        className="relative h-64 w-full bg-slate-900 overflow-hidden select-none"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          key={currentPhotoIdx}
          src={photos[currentPhotoIdx]}
          alt={`${listing.title} - Photo ${currentPhotoIdx + 1}`}
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-103"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25 opacity-70 group-hover:opacity-50 transition-opacity" />

        {/* Carousel Navigation Arrows (Visible always on mobile, or on hover on desktop) */}
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrevPhoto}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-[#0A2244] text-white flex items-center justify-center backdrop-blur-md transition-all shadow-lg z-20 hover:scale-110 active:scale-95 border border-white/20 opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
              title="Previous photo"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5 -ml-0.5" />
            </button>

            <button
              type="button"
              onClick={handleNextPhoto}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-[#0A2244] text-white flex items-center justify-center backdrop-blur-md transition-all shadow-lg z-20 hover:scale-110 active:scale-95 border border-white/20 opacity-90 sm:opacity-0 sm:group-hover:opacity-100"
              title="Next photo"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5 -mr-0.5" />
            </button>
          </>
        )}

        {/* Status Ribbon (Top Right) */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          {listing.status === 'sold' && (
            <div className="bg-slate-900/90 backdrop-blur-sm text-white font-bold text-[10px] uppercase px-3 py-1 rounded-full shadow-md tracking-widest border border-white/10">
              {t.status_sold}
            </div>
          )}
          {listing.status === 'urgent' && (
            <div className="bg-amber-600/95 backdrop-blur-sm text-white font-bold text-[10px] uppercase px-3 py-1 rounded-full shadow-md tracking-widest animate-pulse border border-white/20">
              {t.status_urgent}
            </div>
          )}
          {!listing.status && isNew() && (
            <div className="bg-blue-600/95 backdrop-blur-sm text-white font-bold text-[10px] uppercase px-3 py-1 rounded-full shadow-md tracking-widest border border-white/20">
              {t.ribbon_new}
            </div>
          )}
        </div>

        {/* Photo Counter Pill (Top Left) */}
        {photos.length > 1 ? (
          <div className="absolute top-3 left-3 z-10 bg-black/65 backdrop-blur-md text-white text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 border border-white/15 shadow-sm">
            <Camera className="w-3.5 h-3.5 text-blue-300" />
            <span>{currentPhotoIdx + 1} / {photos.length}</span>
          </div>
        ) : null}

        {/* Listing Type & City Pill (Bottom Left) */}
        <div className="absolute bottom-3 left-3 z-10 bg-[#0A2244]/85 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5 border border-white/15 shadow-md">
          <MapPin className="w-3.5 h-3.5 text-blue-300" />
          <span>{listing.city}</span>
          <span className="text-white/40">·</span>
          <span className="text-blue-200 uppercase tracking-wider text-[10px] font-bold">
            {listing.type === 'rent' ? t.for_rent_opt : t.for_sale_opt}
          </span>
        </div>

        {/* Interactive Dots Strip (Bottom Right) */}
        {photos.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/15">
            {photos.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentPhotoIdx(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  currentPhotoIdx === idx
                    ? 'w-4 bg-white shadow-sm'
                    : 'w-1.5 bg-white/40 hover:bg-white/80'
                }`}
                aria-label={`Show photo ${idx + 1}`}
              />
            ))}
          </div>
        )}
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
          <button
            type="button"
            className="w-full flex items-center justify-center gap-1.5 py-3 px-4 rounded-full border border-blue-600 text-[#1E40AF] font-semibold text-xs uppercase tracking-widest group-hover:bg-[#1E40AF] group-hover:text-white transition-all duration-200 shadow-xs"
          >
            <span>{t.card_learn_more}</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
