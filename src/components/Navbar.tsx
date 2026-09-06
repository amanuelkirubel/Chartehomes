import React, { useState } from 'react';
import { CharteLogo } from './CharteLogo';
import { Language, ViewMode } from '../types';
import { TRANSLATIONS, OWNER_CONTACTS } from '../translations';
import { Phone, MessageCircle, PlusCircle, Menu, X, ShieldCheck, LogOut, Download, Send, Video } from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onSetLang: (lang: Language) => void;
  activeMode: ViewMode;
  onSetMode: (mode: ViewMode) => void;
  onOpenSell: () => void;
  onOpenAdmin: () => void;
  adminEmail: string | null;
  onAdminLogout: () => void;
  onNavigateHome: () => void;
  onOpenDownloadApp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onSetLang,
  activeMode,
  onSetMode,
  onOpenSell,
  onOpenAdmin,
  adminEmail,
  onAdminLogout,
  onNavigateHome,
  onOpenDownloadApp,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-blue-100 shadow-sm text-[#0F2340]">
      {/* Top micro contact bar in Charte Royal Navy */}
      <div className="hidden sm:block bg-[#0A2244] border-b border-[#0D3166] py-1.5 px-4 text-xs text-blue-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-white font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {t.brand_tagline}
            </span>
            <span className="text-blue-400/40">|</span>
            {/* Phone 1: 0939804748 */}
            <a href={`tel:+${OWNER_CONTACTS.phone1}`} className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3 h-3 text-blue-300" />
              <span className="font-mono font-semibold text-white">{OWNER_CONTACTS.phone1Display}</span>
            </a>
            <span className="text-blue-400/40">·</span>
            {/* Phone 2: 0715737393 */}
            <a href={`tel:+${OWNER_CONTACTS.phone2}`} className="flex items-center gap-1 hover:text-white transition-colors">
              <Phone className="w-3 h-3 text-blue-300" />
              <span className="font-mono font-semibold text-white">{OWNER_CONTACTS.phone2Display}</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            {/* WhatsApp links */}
            <a
              href={`https://wa.me/${OWNER_CONTACTS.phone1}?text=${encodeURIComponent('Hello Charte Homes, I have an inquiry regarding Ethiopian properties.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-300 hover:text-white font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
            <span className="text-blue-400/40">|</span>
            {/* Telegram channels */}
            <a
              href="https://t.me/charte7"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-white transition-colors"
            >
              <Send className="w-3 h-3 text-sky-400" />
              <span>@charte7</span>
            </a>
            <a
              href="https://t.me/Charte77"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              <span>@Charte77</span>
            </a>
            <span className="text-blue-400/40">|</span>
            {/* TikTok channels */}
            <a
              href="https://www.tiktok.com/@chartehomes"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors text-[11px]"
            >
              TT @Chartehomes
            </a>
            <a
              href="https://www.tiktok.com/@chartecars"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors text-[11px]"
            >
              @chartecars
            </a>
            <span className="text-blue-400/40">|</span>
            {/* YouTube */}
            <a
              href={OWNER_CONTACTS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-red-400 hover:text-white transition-colors"
            >
              <Video className="w-3 h-3" />
              <span>YouTube</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo */}
          <button
            onClick={onNavigateHome}
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="Charte Homes Home"
          >
            <CharteLogo size="md" variant="horizontal" theme="blue" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-blue-50/80 p-1 rounded-full border border-blue-200">
            <button
              onClick={() => { onSetMode('buy'); onNavigateHome(); }}
              className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeMode === 'buy'
                  ? 'bg-[#1E40AF] text-white shadow-sm'
                  : 'text-[#1E40AF] hover:text-[#0A2244] hover:bg-white/60'
              }`}
            >
              {t.nav_buy}
            </button>
            <button
              onClick={() => { onSetMode('rent'); onNavigateHome(); }}
              className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeMode === 'rent'
                  ? 'bg-[#1E40AF] text-white shadow-sm'
                  : 'text-[#1E40AF] hover:text-[#0A2244] hover:bg-white/60'
              }`}
            >
              {t.nav_rent}
            </button>
            <button
              onClick={onOpenSell}
              className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeMode === 'sell'
                  ? 'bg-[#1E40AF] text-white shadow-sm'
                  : 'text-[#1E40AF] hover:text-[#0A2244] hover:bg-white/60'
              }`}
            >
              {t.nav_list}
            </button>
          </nav>

          {/* Actions: Download App, Lang Switcher, CTA, Admin */}
          <div className="flex items-center gap-2.5">
            {/* Download App Button */}
            <button
              onClick={onOpenDownloadApp}
              className="flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 text-[#1E40AF] font-bold text-xs uppercase tracking-wider px-3.5 py-2 rounded-full border border-blue-200 transition-all shadow-xs"
              title="Download & Install App"
            >
              <Download className="w-3.5 h-3.5 text-[#2563EB]" />
              <span className="hidden sm:inline">{t.download_app}</span>
              <span className="sm:hidden">App</span>
            </button>

            {/* Language switch */}
            <div className="flex items-center bg-blue-50 border border-blue-200 rounded-full p-0.5 text-xs font-bold">
              <button
                onClick={() => onSetLang('en')}
                className={`px-2.5 py-1.5 rounded-full transition-colors ${
                  currentLang === 'en' ? 'bg-[#1E40AF] text-white shadow-xs' : 'text-[#1E40AF] hover:text-[#0A2244]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onSetLang('am')}
                className={`px-2.5 py-1.5 rounded-full transition-colors ${
                  currentLang === 'am' ? 'bg-[#1E40AF] text-white shadow-xs' : 'text-[#1E40AF] hover:text-[#0A2244]'
                }`}
              >
                አማ
              </button>
            </div>

            {/* List Property Button */}
            <button
              onClick={onOpenSell}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-[#0A2244] to-[#1E40AF] hover:from-[#061833] hover:to-[#1D4ED8] text-white font-semibold text-xs uppercase tracking-widest px-5 py-2.5 rounded-full shadow-sm transition-all hover:scale-[1.01]"
            >
              <PlusCircle className="w-4 h-4 text-blue-200" />
              <span>{t.nav_list}</span>
            </button>

            {/* Admin status pill */}
            {adminEmail ? (
              <div className="hidden lg:flex items-center gap-2 bg-blue-50 border border-blue-200 text-[#1E40AF] text-xs px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                <span className="font-mono truncate max-w-[140px] text-[#0A2244]">{adminEmail}</span>
                <button
                  onClick={onAdminLogout}
                  title={t.admin_logout}
                  className="text-slate-400 hover:text-red-600 p-0.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : null}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-blue-50 border border-blue-200 text-[#1E40AF] hover:text-[#0A2244]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-blue-100 px-4 pt-4 pb-6 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => { onSetMode('buy'); onNavigateHome(); setMobileMenuOpen(false); }}
              className={`py-2.5 text-center text-xs font-semibold uppercase tracking-wider rounded-full ${
                activeMode === 'buy' ? 'bg-[#1E40AF] text-white shadow-sm' : 'bg-blue-50 text-[#1E40AF]'
              }`}
            >
              {t.nav_buy}
            </button>
            <button
              onClick={() => { onSetMode('rent'); onNavigateHome(); setMobileMenuOpen(false); }}
              className={`py-2.5 text-center text-xs font-semibold uppercase tracking-wider rounded-full ${
                activeMode === 'rent' ? 'bg-[#1E40AF] text-white shadow-sm' : 'bg-blue-50 text-[#1E40AF]'
              }`}
            >
              {t.nav_rent}
            </button>
            <button
              onClick={() => { onOpenSell(); setMobileMenuOpen(false); }}
              className={`py-2.5 text-center text-xs font-semibold uppercase tracking-wider rounded-full ${
                activeMode === 'sell' ? 'bg-[#1E40AF] text-white shadow-sm' : 'bg-blue-50 text-[#1E40AF]'
              }`}
            >
              {t.nav_list}
            </button>
          </div>

          <div className="pt-2">
            <button
              onClick={() => { onOpenDownloadApp(); setMobileMenuOpen(false); }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-wider shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>{t.download_app}</span>
            </button>
          </div>

          <div className="pt-3 border-t border-blue-100 space-y-2 text-sm">
            {/* Direct Call links */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:+${OWNER_CONTACTS.phone1}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[#0A2244] font-semibold text-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#1E40AF]" />
                <span>Call {OWNER_CONTACTS.phone1Display}</span>
              </a>
              <a
                href={`tel:+${OWNER_CONTACTS.phone2}`}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-[#0A2244] font-semibold text-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#1E40AF]" />
                <span>Call {OWNER_CONTACTS.phone2Display}</span>
              </a>
            </div>

            {/* Direct WhatsApp links */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`https://wa.me/${OWNER_CONTACTS.phone1}?text=${encodeURIComponent('Hello Charte Homes, I would like to inquire about properties.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold text-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp 1</span>
              </a>
              <a
                href={`https://wa.me/${OWNER_CONTACTS.phone2}?text=${encodeURIComponent('Hello Charte Homes, I would like to inquire about properties.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-semibold text-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp 2</span>
              </a>
            </div>

            {/* Social channels */}
            <div className="grid grid-cols-2 gap-2 text-xs pt-1">
              <a
                href="https://t.me/charte7"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-sky-50 text-sky-800 border border-sky-200"
              >
                <Send className="w-3 h-3" />
                <span>Telegram @charte7</span>
              </a>
              <a
                href="https://t.me/Charte77"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-sky-50 text-sky-800 border border-sky-200"
              >
                <Send className="w-3 h-3" />
                <span>Telegram @Charte77</span>
              </a>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href="https://www.tiktok.com/@chartehomes"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 font-mono text-[11px]"
              >
                TikTok @Chartehomes
              </a>
              <a
                href="https://www.tiktok.com/@chartecars"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 font-mono text-[11px]"
              >
                TikTok @chartecars
              </a>
            </div>

            <a
              href={OWNER_CONTACTS.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2 rounded-xl bg-red-50 text-red-700 border border-red-200 font-semibold text-xs"
            >
              <Video className="w-3.5 h-3.5" />
              <span>YouTube @chartehomes</span>
            </a>

            {adminEmail ? (
              <div className="flex items-center justify-between px-4 py-2.5 bg-blue-50 rounded-xl text-xs text-[#1E40AF] border border-blue-200">
                <span className="font-mono">{adminEmail}</span>
                <button
                  onClick={() => { onAdminLogout(); setMobileMenuOpen(false); }}
                  className="text-red-600 font-medium underline"
                >
                  {t.admin_logout}
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-2 text-xs text-slate-500 hover:text-[#0A2244]"
              >
                {t.admin_login}
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
