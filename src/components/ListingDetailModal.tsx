import React, { useState } from 'react';
import { Listing, Language, ListingStatus } from '../types';
import { TRANSLATIONS, OWNER_CONTACTS } from '../translations';
import {
  X,
  Bed,
  Bath,
  Maximize2,
  MapPin,
  Phone,
  MessageCircle,
  Share2,
  Edit,
  CheckCircle2,
  AlertTriangle,
  Send,
  Video,
  Clock
} from 'lucide-react';

interface ListingDetailModalProps {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  isAdmin: boolean;
  onUpdateStatus: (id: string, status: ListingStatus) => void;
  onOpenEdit: (listing: Listing) => void;
}

export const ListingDetailModal: React.FC<ListingDetailModalProps> = ({
  listing,
  isOpen,
  onClose,
  currentLang,
  isAdmin,
  onUpdateStatus,
  onOpenEdit,
}) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !listing) return null;

  const t = TRANSLATIONS[currentLang];
  const photos = listing.photos && listing.photos.length > 0 ? listing.photos : [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  ];

  const formatPrice = (num: number) => {
    return Number(num).toLocaleString('en-US') + ' ETB';
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Charte Homes, I am interested in property #${listing.id}: "${listing.title}" in ${listing.city} priced at ${formatPrice(listing.price)}.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-white rounded-[32px] shadow-2xl overflow-hidden my-6 border border-[#E5E2D9] max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E2D9] bg-[#FAF9F5]">
          <div className="flex items-center gap-2 text-sm text-[#7A786C]">
            <span className="font-semibold text-[#5A5A40]">{listing.city}</span>
            <span>·</span>
            <span className="capitalize">{listing.type === 'rent' ? t.for_rent_opt : t.for_sale_opt}</span>
            <span>·</span>
            <span className="text-xs text-[#8E8B7D] flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3" />
              ID: {listing.id}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-[#7A786C] hover:text-[#2C2C26] hover:bg-[#EAE8DF] transition-colors"
              title="Share listing"
            >
              <Share2 className="w-5 h-5" />
            </button>
            {copied && (
              <span className="text-xs text-[#5A5A40] font-semibold animate-pulse">
                Link copied!
              </span>
            )}
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#8E8B7D] hover:text-[#2C2C26] hover:bg-[#EAE8DF] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Photos & Details (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Main Photo */}
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-[#EAE8E0] shadow-inner">
                <img
                  src={photos[activePhotoIdx]}
                  alt={listing.title}
                  className="w-full h-full object-cover transition-all duration-300"
                />

                {/* Status Badge */}
                {listing.status === 'sold' && (
                  <span className="absolute top-4 left-4 bg-[#7A3E2D] text-white font-bold text-[10px] uppercase px-3.5 py-1.5 rounded-full shadow-lg tracking-widest">
                    {t.status_sold}
                  </span>
                )}
                {listing.status === 'urgent' && (
                  <span className="absolute top-4 left-4 bg-[#A68B67] text-white font-bold text-[10px] uppercase px-3.5 py-1.5 rounded-full shadow-lg tracking-widest animate-pulse">
                    {t.status_urgent}
                  </span>
                )}
              </div>

              {/* Photo Thumbnails */}
              {photos.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {photos.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activePhotoIdx === idx ? 'border-[#5A5A40] scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={p} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Specifications Card */}
              <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E5E2D9] grid grid-cols-3 gap-4 text-center">
                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-[#5A5A40]">
                    <Bed className="w-5 h-5" />
                    <span className="text-xl font-bold text-[#1C1C1C] font-serif">{listing.bedrooms}</span>
                  </div>
                  <div className="text-[11px] uppercase font-bold text-[#7A786C] tracking-wider">
                    {t.stat_bedrooms}
                  </div>
                </div>

                <div className="space-y-1 border-x border-[#E5E2D9]">
                  <div className="flex items-center justify-center gap-1.5 text-[#5A5A40]">
                    <Bath className="w-5 h-5" />
                    <span className="text-xl font-bold text-[#1C1C1C] font-serif">{listing.bathrooms}</span>
                  </div>
                  <div className="text-[11px] uppercase font-bold text-[#7A786C] tracking-wider">
                    {t.stat_bathrooms}
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-[#5A5A40]">
                    <Maximize2 className="w-5 h-5" />
                    <span className="text-xl font-bold text-[#1C1C1C] font-serif">{listing.area}</span>
                  </div>
                  <div className="text-[11px] uppercase font-bold text-[#7A786C] tracking-wider">
                    {t.stat_area} (m²)
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#7A786C]">
                  {t.description_label}
                </h4>
                <p className="text-[#383730] leading-relaxed text-sm whitespace-pre-line bg-[#FAF9F5] p-5 rounded-2xl border border-[#E5E2D9]">
                  {listing.description || t.no_description}
                </p>
              </div>

              {/* Admin Actions Toolbar */}
              {isAdmin && (
                <div className="p-4 rounded-2xl bg-[#EAE8DF] border border-[#DCD7CB] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#5A5A40]">
                      {t.admin_label}
                    </span>
                    <button
                      onClick={() => onOpenEdit(listing)}
                      className="flex items-center gap-1 text-xs font-semibold text-[#5A5A40] hover:text-[#2C2C26]"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      {t.edit_details_btn}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => onUpdateStatus(listing.id, 'sold')}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${
                        listing.status === 'sold'
                          ? 'bg-[#7A3E2D] text-white'
                          : 'bg-white text-[#7A3E2D] border border-[#E5D5D0] hover:bg-red-50'
                      }`}
                    >
                      {t.mark_sold_btn}
                    </button>
                    <button
                      onClick={() => onUpdateStatus(listing.id, 'urgent')}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${
                        listing.status === 'urgent'
                          ? 'bg-[#A68B67] text-white'
                          : 'bg-white text-[#A68B67] border border-[#EADFCF] hover:bg-amber-50'
                      }`}
                    >
                      {t.mark_urgent_btn}
                    </button>
                    {listing.status && (
                      <button
                        onClick={() => onUpdateStatus(listing.id, null)}
                        className="px-3 py-1.5 rounded-full text-xs font-bold uppercase bg-white text-[#7A786C] border border-[#DDD9CE] hover:bg-gray-100"
                      >
                        {t.clear_status_btn}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Title, Price & Direct Contact (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Title and City */}
                <div>
                  <div className="flex items-center gap-1.5 text-[#5A5A40] text-xs font-bold uppercase tracking-[0.15em] mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.city}, Ethiopia</span>
                  </div>
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] font-serif leading-snug"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {listing.title}
                  </h2>
                </div>

                {/* Price Display */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#2D2D24] to-[#3D3D2D] text-white shadow-lg">
                  <div className="text-[11px] uppercase tracking-widest text-[#D2CEBE] font-semibold mb-1">
                    {listing.type === 'rent' ? t.price_per_month_label : t.price_label}
                  </div>
                  <div
                    className="text-3xl sm:text-4xl font-bold tracking-tight"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {formatPrice(listing.price)}
                    {listing.type === 'rent' && (
                      <span className="text-sm font-normal text-[#D2CEBE] ml-1.5">{t.card_per_month}</span>
                    )}
                  </div>
                </div>

                {/* Direct Contact Card */}
                <div className="p-5 rounded-2xl bg-[#FAF9F5] border border-[#E5E2D9] space-y-4">
                  <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#7A786C]">
                    {t.contact_us_about_house}
                  </div>

                  {/* Primary WhatsApp Action */}
                  <a
                    href={`https://wa.me/${OWNER_CONTACTS.primaryPhone}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2.5 bg-[#5A5A40] hover:bg-[#484833] text-white font-bold py-3.5 px-4 rounded-full shadow-sm uppercase tracking-widest text-xs transition-all active:scale-[0.99]"
                  >
                    <MessageCircle className="w-4 h-4 text-[#D8D4C8]" />
                    <span>{t.whatsapp_btn}</span>
                  </a>

                  {/* Direct Phone Numbers */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <a
                      href={`tel:+${OWNER_CONTACTS.primaryPhone}`}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-[#DDD9CE] rounded-full font-bold text-[#2C2C26] hover:border-[#5A5A40] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#5A5A40]" />
                      <span>{OWNER_CONTACTS.primaryPhoneDisplay}</span>
                    </a>
                    <a
                      href={`tel:+${OWNER_CONTACTS.secondaryPhone}`}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-[#DDD9CE] rounded-full font-bold text-[#2C2C26] hover:border-[#5A5A40] transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#5A5A40]" />
                      <span>{OWNER_CONTACTS.secondaryPhoneDisplay}</span>
                    </a>
                  </div>

                  <p className="text-[11px] text-[#7A786C] text-center leading-normal">
                    {t.all_inquiries_note}
                  </p>

                  {/* Social and Video Channels */}
                  <div className="pt-2 border-t border-[#E5E2D9] grid grid-cols-2 gap-2 text-xs">
                    <a
                      href={`https://t.me/${OWNER_CONTACTS.telegram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 rounded-full bg-[#EAE8DF] text-[#5A5A40] font-semibold hover:bg-[#DDD8CB] transition-colors"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Telegram @{OWNER_CONTACTS.telegram}</span>
                    </a>
                    <a
                      href={OWNER_CONTACTS.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2 rounded-full bg-[#EAE8DF] text-[#7A3E2D] font-semibold hover:bg-[#DDD8CB] transition-colors"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Video Tours</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Safety & Verification Guarantee */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#EFEFEA] border border-[#DDD9CE] text-xs text-[#444338]">
                <CheckCircle2 className="w-5 h-5 text-[#5A5A40] shrink-0" />
                <span>
                  <strong>Charte Homes Verified:</strong> Title documents, compound survey, and pricing verified before publishing.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
