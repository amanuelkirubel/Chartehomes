import React, { useState } from 'react';
import { Listing, Language, ListingStatus } from '../types';
import { TRANSLATIONS, OWNER_CONTACTS } from '../translations';
import {
  X,
  ArrowLeft,
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
  Clock,
  Mail
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
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 border border-blue-100 max-h-[92vh] flex flex-col">
        {/* Header Bar with Back button and Close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-50 bg-[#F0F6FF]">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-blue-200 text-[#1E40AF] hover:bg-blue-50 transition-colors shadow-xs"
              title="Return to previous page"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.btn_back}</span>
            </button>

            <div className="flex items-center gap-2 text-sm text-slate-600">
              <span className="font-semibold text-[#0A2244]">{listing.city}</span>
              <span>·</span>
              <span className="capitalize">{listing.type === 'rent' ? t.for_rent_opt : t.for_sale_opt}</span>
              <span>·</span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3" />
                {listing.created_at ? new Date(listing.created_at).toLocaleDateString() : 'Active'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-slate-500 hover:text-[#1E40AF] hover:bg-white transition-colors"
              title="Share listing link"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
              title="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Admin quick bar */}
          {isAdmin && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-amber-900">{t.admin_label}:</span>
                <span className="text-amber-700">Status: {listing.status || 'Active'}</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenEdit(listing)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-amber-300 text-amber-900 font-semibold hover:bg-amber-100"
                >
                  <Edit className="w-3.5 h-3.5" />
                  <span>{t.edit_details_btn}</span>
                </button>
                <button
                  onClick={() => onUpdateStatus(listing.id, 'sold')}
                  className="px-3 py-1.5 rounded-full bg-slate-800 text-white font-semibold hover:bg-slate-900"
                >
                  {t.mark_sold_btn}
                </button>
                <button
                  onClick={() => onUpdateStatus(listing.id, 'urgent')}
                  className="px-3 py-1.5 rounded-full bg-amber-600 text-white font-semibold hover:bg-amber-700"
                >
                  {t.mark_urgent_btn}
                </button>
                {listing.status && (
                  <button
                    onClick={() => onUpdateStatus(listing.id, null)}
                    className="px-3 py-1.5 rounded-full bg-white text-slate-600 border border-slate-300 hover:bg-slate-50"
                  >
                    {t.clear_status_btn}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Top Gallery and Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Gallery Column (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-100 border border-blue-50 shadow-sm">
                <img
                  src={photos[activePhotoIdx]}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />

                {/* Status overlay badge */}
                {listing.status === 'sold' && (
                  <div className="absolute top-4 left-4 bg-slate-900/90 text-white font-bold text-xs uppercase px-3 py-1 rounded-full tracking-wider">
                    {t.status_sold}
                  </div>
                )}
                {listing.status === 'urgent' && (
                  <div className="absolute top-4 left-4 bg-amber-600 text-white font-bold text-xs uppercase px-3 py-1 rounded-full tracking-wider animate-pulse">
                    {t.status_urgent}
                  </div>
                )}
              </div>

              {/* Photo selector thumbnails */}
              {photos.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                  {photos.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                        activePhotoIdx === idx ? 'border-blue-600 scale-95 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={p} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Property specs bar */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-blue-50/70 border border-blue-100 text-center">
                <div>
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E40AF] mb-1">
                    <Bed className="w-4 h-4" />
                    <span>{t.stat_bedrooms}</span>
                  </div>
                  <span className="text-lg font-bold text-[#0A2244]">{listing.bedrooms}</span>
                </div>
                <div className="border-x border-blue-200">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E40AF] mb-1">
                    <Bath className="w-4 h-4" />
                    <span>{t.stat_bathrooms}</span>
                  </div>
                  <span className="text-lg font-bold text-[#0A2244]">{listing.bathrooms}</span>
                </div>
                <div>
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E40AF] mb-1">
                    <Maximize2 className="w-4 h-4" />
                    <span>{t.stat_area}</span>
                  </div>
                  <span className="text-lg font-bold text-[#0A2244]">{listing.area} M²</span>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t.description_label}
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                  {listing.description || t.no_description}
                </p>
              </div>
            </div>

            {/* Inquiries and Actions Column (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              <div className="space-y-4">
                {/* Title and City */}
                <div>
                  <div className="flex items-center gap-1.5 text-[#1E40AF] text-xs font-bold uppercase tracking-[0.15em] mb-2">
                    <MapPin className="w-4 h-4" />
                    <span>{listing.city}, Ethiopia</span>
                  </div>
                  <h2
                    className="text-2xl sm:text-3xl font-bold text-[#0A2244] font-serif leading-snug"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {listing.title}
                  </h2>
                </div>

                {/* Price Display */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-[#0A2244] via-[#0D3166] to-[#1E40AF] text-white shadow-lg">
                  <div className="text-[11px] uppercase tracking-widest text-blue-200 font-semibold mb-1">
                    {listing.type === 'rent' ? t.price_per_month_label : t.price_label}
                  </div>
                  <div
                    className="text-3xl sm:text-4xl font-bold tracking-tight"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {formatPrice(listing.price)}
                    {listing.type === 'rent' && (
                      <span className="text-sm font-normal text-blue-200 ml-1.5">{t.card_per_month}</span>
                    )}
                  </div>
                </div>

                {/* Direct Contact Card with Both Numbers (WhatsApp & Call) */}
                <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-4">
                  <div className="text-xs font-bold uppercase tracking-[0.15em] text-[#0A2244]">
                    {t.contact_us_about_house}
                  </div>

                  {/* Primary WhatsApp Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                      href={`https://wa.me/${OWNER_CONTACTS.phone1}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-3 rounded-full shadow-sm text-xs transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp ({OWNER_CONTACTS.phone1Display})</span>
                    </a>

                    <a
                      href={`https://wa.me/${OWNER_CONTACTS.phone2}?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-3 rounded-full shadow-sm text-xs transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp ({OWNER_CONTACTS.phone2Display})</span>
                    </a>
                  </div>

                  {/* Direct Phone Call Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <a
                      href={`tel:+${OWNER_CONTACTS.phone1}`}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-blue-200 rounded-full font-bold text-[#0A2244] hover:bg-blue-50 transition-colors shadow-xs"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#1E40AF]" />
                      <span>Call {OWNER_CONTACTS.phone1Display}</span>
                    </a>
                    <a
                      href={`tel:+${OWNER_CONTACTS.phone2}`}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white border border-blue-200 rounded-full font-bold text-[#0A2244] hover:bg-blue-50 transition-colors shadow-xs"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#1E40AF]" />
                      <span>Call {OWNER_CONTACTS.phone2Display}</span>
                    </a>
                  </div>

                  {/* Official Emails */}
                  <div className="pt-2 border-t border-blue-100 space-y-1 text-xs">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Official Emails:</p>
                    <div className="flex flex-col gap-1 text-[12px] font-mono text-slate-700">
                      <a href="mailto:chartehomes@gmail.com" className="hover:text-[#1E40AF] flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-blue-600 shrink-0" />
                        <span>chartehomes@gmail.com</span>
                      </a>
                      <a href="mailto:chartehomes7@gmail.com" className="hover:text-[#1E40AF] flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-blue-600 shrink-0" />
                        <span>chartehomes7@gmail.com</span>
                      </a>
                      <a href="mailto:emanuelkirubel@gmail.com" className="hover:text-[#1E40AF] flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-blue-600 shrink-0" />
                        <span>emanuelkirubel@gmail.com</span>
                      </a>
                    </div>
                  </div>

                  {/* Social and Video Channels */}
                  <div className="pt-2 border-t border-blue-100 space-y-2 text-xs">
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="https://t.me/charte7"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 rounded-full bg-white border border-sky-200 text-sky-800 font-semibold hover:bg-sky-50 transition-colors"
                      >
                        <Send className="w-3.5 h-3.5 text-sky-500" />
                        <span>TG @charte7</span>
                      </a>
                      <a
                        href="https://t.me/Charte77"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 rounded-full bg-white border border-sky-200 text-sky-800 font-semibold hover:bg-sky-50 transition-colors"
                      >
                        <Send className="w-3.5 h-3.5 text-sky-500" />
                        <span>TG @Charte77</span>
                      </a>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href="https://www.tiktok.com/@chartehomes"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 rounded-full bg-white border border-slate-200 text-slate-800 font-semibold hover:bg-slate-50 transition-colors font-mono text-[11px]"
                      >
                        TT @Chartehomes
                      </a>
                      <a
                        href="https://www.tiktok.com/@chartecars"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2 rounded-full bg-white border border-slate-200 text-slate-800 font-semibold hover:bg-slate-50 transition-colors font-mono text-[11px]"
                      >
                        TT @chartecars
                      </a>
                    </div>

                    <a
                      href={OWNER_CONTACTS.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold transition-colors"
                    >
                      <Video className="w-4 h-4" />
                      <span>YouTube Video Tours (@chartehomes)</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Safety & Verification Guarantee */}
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-[#0A2244]">
                <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
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
