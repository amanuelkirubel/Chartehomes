import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { CharteLogo } from './CharteLogo';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { X, ArrowLeft, Download, Smartphone, Apple, Monitor, CheckCircle, Share2, PlusSquare } from 'lucide-react';

interface DownloadAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
}

export const DownloadAppModal: React.FC<DownloadAppModalProps> = ({
  isOpen,
  onClose,
  currentLang,
}) => {
  const t = TRANSLATIONS[currentLang];
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();

  if (!isOpen) return null;

  const handleInstallClick = async () => {
    if (isInstallable) {
      await install();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden my-6 border border-blue-100">
        {/* Header with Back button and Close button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-blue-50 bg-gradient-to-r from-[#0A2244] via-[#0D3166] to-[#1E40AF] text-white">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/20"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{t.btn_back}</span>
            </button>
            <h3 className="text-lg font-bold font-serif text-white tracking-wide">
              {currentLang === 'am' ? 'የቻርቴ ሆምስ መተግበሪያ' : 'Charte Homes App'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-blue-100 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* App Hero Badge */}
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-br from-blue-50 via-slate-50 to-white border border-blue-100">
            <CharteLogo variant="badge" size="sm" theme="blue" showText={false} />
            <div className="flex-1">
              <h4 className="font-bold text-[#0A2244] text-base">Charte Homes Mobile & Desktop</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                {currentLang === 'am'
                  ? 'ፈጣን፣ ያለ ደላላ፣ እና ከመስመር ውጭ የሚሰራ ይፋዊ መተግበሪያ'
                  : 'Fast, direct access to verified homes across Ethiopia without broker delays.'}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle className="w-3 h-3" /> PWA Certified
                </span>
                <span className="text-[11px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                  Fast & Lightweight
                </span>
              </div>
            </div>
          </div>

          {/* Primary Action Button */}
          {isInstalled ? (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center">
              <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <p className="font-bold text-emerald-900 text-sm">
                {currentLang === 'am' ? 'መተግበሪያው በመሳሪያዎ ላይ ተጭኗል!' : 'Application is already installed!'}
              </p>
              <p className="text-xs text-emerald-700 mt-1">
                {currentLang === 'am'
                  ? 'ከመነሻ ገጽዎ በቀጥታ መክፈት ይችላሉ።'
                  : 'You can launch Charte Homes anytime from your home screen or app drawer.'}
              </p>
            </div>
          ) : isInstallable ? (
            <button
              onClick={handleInstallClick}
              className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#0A2244] via-[#1E40AF] to-[#2563EB] hover:from-[#061833] hover:to-[#1D4ED8] text-white font-bold py-3.5 px-6 rounded-2xl shadow-lg shadow-blue-900/25 transition-all transform active:scale-95"
            >
              <Download className="w-5 h-5" />
              <span className="text-sm tracking-wide">
                {currentLang === 'am' ? 'መተግበሪያውን አሁን ጫን (አውርድ)' : 'Download & Install App Now'}
              </span>
            </button>
          ) : null}

          {/* Platform Step-by-Step Instructions */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              {currentLang === 'am' ? 'በመሳሪያዎ ላይ ለመጫን ቀላል ደረጃዎች' : 'Installation Options by Device'}
            </h5>

            {/* Android Option */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
                <Smartphone className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-700 leading-relaxed">
                <p className="font-bold text-slate-900 mb-0.5">Android (Chrome / Samsung Internet)</p>
                <p>
                  {currentLang === 'am'
                    ? 'ከላይ ያለውን "አውርድ" ቁልፍ ይጫኑ ወይም በChrome ሜኑ (⋮) ላይ "Add to Home screen / Install app" የሚለውን ይምረጡ።'
                    : 'Tap the download button above or open your browser menu (⋮) and tap "Install app" or "Add to Home screen".'}
                </p>
              </div>
            </div>

            {/* iOS Option */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-blue-100 text-blue-800 shrink-0">
                <Apple className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-700 leading-relaxed">
                <p className="font-bold text-slate-900 mb-0.5">iPhone & iPad (Safari)</p>
                <p className="flex items-center gap-1.5 flex-wrap">
                  <span>1. Tap</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                    <Share2 className="w-3 h-3" /> Share
                  </span>
                  <span>in Safari toolbar</span>
                </p>
                <p className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span>2. Scroll & tap</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-300">
                    <PlusSquare className="w-3 h-3 text-blue-600" /> Add to Home Screen
                  </span>
                </p>
              </div>
            </div>

            {/* PC / Desktop Option */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
              <div className="p-2 rounded-xl bg-indigo-100 text-indigo-800 shrink-0">
                <Monitor className="w-5 h-5" />
              </div>
              <div className="text-xs text-slate-700 leading-relaxed">
                <p className="font-bold text-slate-900 mb-0.5">Windows PC & Mac (Chrome / Edge)</p>
                <p>
                  {currentLang === 'am'
                    ? 'በአድራሻ አሞሌው (URL bar) በቀኝ በኩል የሚታየውን የመጫኛ አዶ (Install icon) ይጫኑ።'
                    : 'Click the install icon in the top-right corner of your browser address bar to install on your computer.'}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-1 text-xs font-semibold text-[#1E40AF] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t.btn_back}</span>
            </button>
            <span className="text-[11px] text-slate-400">Charte Homes · chartehomes.com</span>
          </div>
        </div>
      </div>
    </div>
  );
};
