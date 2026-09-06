import React, { useState } from 'react';
import { Listing, Language, ListingType } from '../types';
import { TRANSLATIONS } from '../translations';
import { ETHIOPIAN_CITIES } from '../data/mockListings';
import { X, ArrowLeft, UploadCloud, ShieldAlert } from 'lucide-react';

interface SellListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onListingCreated: (newListing: Listing, scrubbed: boolean) => void;
}

const CONTACT_PATTERN = /(\+?\d[\d\s\-()]{6,}\d)|(@[a-zA-Z0-9_]{3,})|(\bt\.me\/\S+)|(\btelegram\b)|(\bwhatsapp\b)|(\btiktok\b)|(\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b)/gi;

function stripContactInfo(text: string): string {
  return String(text || '').replace(CONTACT_PATTERN, '').replace(/\s{2,}/g, ' ').trim();
}

export const SellListingModal: React.FC<SellListingModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onListingCreated,
}) => {
  const t = TRANSLATIONS[currentLang];

  const [type, setType] = useState<ListingType>('sale');
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('Addis Ababa');
  const [price, setPrice] = useState('');
  const [bedrooms, setBedrooms] = useState('3');
  const [bathrooms, setBathrooms] = useState('2');
  const [area, setArea] = useState('250');
  const [description, setDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const remainingSlots = 10 - photos.length;
    const count = Math.min(files.length, remainingSlots);
    for (let i = 0; i < count; i++) {
      const file = files.item(i);
      if (!file) continue;
      const reader = new FileReader();
      reader.onload = (loadEvt) => {
        if (loadEvt.target?.result) {
          setPhotos((prev) => [...prev, loadEvt.target!.result as string].slice(0, 10));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (idx: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !price || !city) {
      setError('Please fill in the property title, city, and price.');
      return;
    }

    setIsSubmitting(true);

    const cleanTitle = stripContactInfo(title);
    const cleanDesc = stripContactInfo(description);
    const wasScrubbed = cleanTitle !== title.trim() || cleanDesc !== description.trim();

    const sampleFallbackPhotos = [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ];

    const newListing: Listing = {
      id: String(Date.now()),
      title: cleanTitle,
      type,
      city,
      price: Number(price) || 0,
      bedrooms: Number(bedrooms) || 0,
      bathrooms: Number(bathrooms) || 0,
      area: Number(area) || 0,
      description: cleanDesc,
      photos: photos.length > 0 ? photos : sampleFallbackPhotos,
      status: null,
      created_at: new Date().toISOString(),
      edit_token: 'edit-' + Math.random().toString(36).slice(2, 10),
    };

    setTimeout(() => {
      onListingCreated(newListing, wasScrubbed);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 border border-blue-100">
        {/* Header with Back button and Close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-50 bg-[#F0F6FF]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white border border-blue-200 text-[#1E40AF] hover:bg-blue-50 transition-colors shadow-xs"
              title="Return to previous page"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.btn_back}</span>
            </button>
            <div>
              <h3
                className="text-lg sm:text-xl font-bold text-[#0A2244] font-serif"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {t.sell_title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Ethiopian Real Estate Verified Listing Portal
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Notice banner */}
        <div className="mx-6 mt-4 p-3.5 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-2.5 text-xs text-[#0A2244] leading-relaxed">
          <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <span>{t.sell_desc}</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Listing Type Toggle */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488] mb-1.5">
              {t.listing_type_label}
            </label>
            <div className="grid grid-cols-2 gap-1 bg-blue-50 p-1 rounded-full border border-blue-100">
              <button
                type="button"
                onClick={() => setType('sale')}
                className={`py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  type === 'sale'
                    ? 'bg-[#1E40AF] text-white shadow-xs'
                    : 'text-[#1E40AF] hover:text-[#0A2244]'
                }`}
              >
                {t.for_sale_opt}
              </button>
              <button
                type="button"
                onClick={() => setType('rent')}
                className={`py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  type === 'rent'
                    ? 'bg-[#1E40AF] text-white shadow-xs'
                    : 'text-[#1E40AF] hover:text-[#0A2244]'
                }`}
              >
                {t.for_rent_opt}
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488] mb-1.5">
              {t.title_label} *
            </label>
            <input
              type="text"
              required
              placeholder={t.title_placeholder}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#F6F9FD] border border-[#D3E1F2] text-[#0A2244] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF] transition-all"
            />
          </div>

          {/* City and Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488] mb-1.5">
                {t.city_label} *
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#F6F9FD] border border-[#D3E1F2] text-[#0A2244] rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF] transition-all"
              >
                {ETHIOPIAN_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488] mb-1.5">
                {t.price_label} (ETB) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="1000"
                placeholder="e.g. 15,000,000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#F6F9FD] border border-[#D3E1F2] text-[#0A2244] rounded-xl px-4 py-2.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-[#1E40AF] transition-all"
              />
            </div>
          </div>

          {/* Bedrooms, Bathrooms, Area */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488] mb-1.5">
                {t.bedrooms_label}
              </label>
              <input
                type="number"
                min="0"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-[#F6F9FD] border border-[#D3E1F2] text-[#0A2244] rounded-xl px-3 py-2 text-sm text-center font-mono focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488] mb-1.5">
                {t.bathrooms_label}
              </label>
              <input
                type="number"
                min="0"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full bg-[#F6F9FD] border border-[#D3E1F2] text-[#0A2244] rounded-xl px-3 py-2 text-sm text-center font-mono focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488] mb-1.5">
                {t.area_label}
              </label>
              <input
                type="number"
                min="0"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-[#F6F9FD] border border-[#D3E1F2] text-[#0A2244] rounded-xl px-3 py-2 text-sm text-center font-mono focus:outline-none focus:ring-2 focus:ring-[#1E40AF]"
              />
            </div>
          </div>

          {/* Photo Upload Zone */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488] mb-1.5">
              {t.photos_label}
            </label>
            <div className="border-2 border-dashed border-blue-200 hover:border-blue-500 rounded-2xl p-4 text-center bg-blue-50/40 cursor-pointer transition-colors relative">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <UploadCloud className="w-7 h-7 text-[#1E40AF] mx-auto mb-1.5" />
              <p className="text-xs font-semibold text-[#0A2244]">
                Click or drag images to upload (up to 10 photos)
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                JPEG, PNG, WebP supported
              </p>
            </div>

            {/* Thumbnail preview grid */}
            {photos.length > 0 && (
              <div className="grid grid-cols-5 gap-2 mt-3">
                {photos.map((p, idx) => (
                  <div key={idx} className="relative group rounded-xl overflow-hidden h-16 border border-blue-200">
                    <img src={p} alt="" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(idx)}
                      className="absolute top-1 right-1 bg-black/70 hover:bg-red-600 text-white p-0.5 rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488] mb-1.5">
              {t.description_label}
            </label>
            <textarea
              rows={3}
              placeholder={t.description_placeholder}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#F6F9FD] border border-[#D3E1F2] text-[#0A2244] rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E40AF] transition-all resize-none"
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 font-semibold bg-red-50 p-2.5 rounded-xl border border-red-200">
              {error}
            </p>
          )}

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#0A2244] to-[#1E40AF] hover:from-[#061833] hover:to-[#1D4ED8] text-white font-bold py-3.5 px-6 rounded-full shadow-md uppercase tracking-widest text-xs transition-all active:scale-[0.99] disabled:opacity-50"
            >
              {isSubmitting ? t.toast_publishing : t.publish_btn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
