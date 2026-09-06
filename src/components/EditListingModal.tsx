import React, { useState } from 'react';
import { Listing, Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { ETHIOPIAN_CITIES } from '../data/mockListings';
import { X, ArrowLeft, Save } from 'lucide-react';

interface EditListingModalProps {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onSave: (updated: Listing) => void;
}

export const EditListingModal: React.FC<EditListingModalProps> = ({
  listing,
  isOpen,
  onClose,
  currentLang,
  onSave,
}) => {
  if (!isOpen || !listing) return null;

  const t = TRANSLATIONS[currentLang];

  const [title, setTitle] = useState(listing.title);
  const [city, setCity] = useState(listing.city);
  const [price, setPrice] = useState(String(listing.price));
  const [bedrooms, setBedrooms] = useState(String(listing.bedrooms));
  const [bathrooms, setBathrooms] = useState(String(listing.bathrooms));
  const [area, setArea] = useState(String(listing.area));
  const [description, setDescription] = useState(listing.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...listing,
      title,
      city,
      price: Number(price) || 0,
      bedrooms: Number(bedrooms) || 0,
      bathrooms: Number(bathrooms) || 0,
      area: Number(area) || 0,
      description,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden my-6 border border-blue-100">
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
            <h3
              className="text-lg sm:text-xl font-bold text-[#0A2244] font-serif"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {t.edit_title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488] mb-1.5">
              {t.title_label}
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#F6F9FD] border border-[#D3E1F2] text-[#0A2244] rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-[#1E40AF] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488] mb-1.5">
                {t.city_label}
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-[#F6F9FD] border border-[#D3E1F2] text-[#0A2244] rounded-xl px-3.5 py-2.5 text-sm focus:ring-2 focus:ring-[#1E40AF] focus:outline-none"
              >
                {ETHIOPIAN_CITIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488] mb-1.5">
                {t.price_label} (ETB)
              </label>
              <input
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-[#F6F9FD] border border-[#D3E1F2] text-[#0A2244] rounded-xl px-4 py-2.5 text-sm font-mono focus:ring-2 focus:ring-[#1E40AF] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488] mb-1.5">
                {t.bedrooms_label}
              </label>
              <input
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-[#F6F9FD] border border-[#D3E1F2] text-[#0A2244] rounded-xl px-3 py-2 text-sm text-center focus:ring-2 focus:ring-[#1E40AF] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488] mb-1.5">
                {t.bathrooms_label}
              </label>
              <input
                type="number"
                value={bathrooms}
                onChange={(e) => setBathrooms(e.target.value)}
                className="w-full bg-[#F6F9FD] border border-[#D3E1F2] text-[#0A2244] rounded-xl px-3 py-2 text-sm text-center focus:ring-2 focus:ring-[#1E40AF] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488] mb-1.5">
                {t.area_label}
              </label>
              <input
                type="number"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full bg-[#F6F9FD] border border-[#D3E1F2] text-[#0A2244] rounded-xl px-3 py-2 text-sm text-center focus:ring-2 focus:ring-[#1E40AF] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488] mb-1.5">
              {t.description_label}
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-[#F6F9FD] border border-[#D3E1F2] text-[#0A2244] rounded-xl p-3 text-sm focus:ring-2 focus:ring-[#1E40AF] focus:outline-none resize-none"
            />
          </div>

          <div className="pt-3">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#0A2244] to-[#1E40AF] hover:from-[#061833] hover:to-[#1D4ED8] text-white font-bold py-3.5 px-6 rounded-full shadow-md uppercase tracking-widest text-xs transition-all"
            >
              <Save className="w-4 h-4" />
              <span>{t.save_changes_btn}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
