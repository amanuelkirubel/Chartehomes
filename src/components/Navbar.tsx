import React, { useState } from 'react';
import { CharteLogo } from './CharteLogo';
import { Language, ViewMode } from '../types';
import { TRANSLATIONS, OWNER_CONTACTS } from '../translations';
import { Phone, MessageCircle, PlusCircle, Menu, X, ShieldCheck, LogOut } from 'lucide-react';

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
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  return (
    <header className="sticky top-0 z-40 bg-[#F5F5F0]/95 backdrop-blur-md border-b border-[#E5E2D9] shadow-sm text-[#2C2C26]">
      {/* Top micro contact bar */}
      <div className="hidden sm:block bg-[#3D3D2C] border-b border-[#323224] py-1.5 px-4 text-xs text-[#DCD9CE]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-[#F5F5F0] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#A68B67] animate-pulse"></span>
              {t.brand_tagline}
            </span>
            <span className="text-[#686850]">|</span>
            <span className="hover:text-white transition-colors">
              Call / WhatsApp: <a href={`tel:+${OWNER_CONTACTS.primaryPhone}`} className="text-white font-mono font-semibold hover:underline">{OWNER_CONTACTS.primaryPhoneDisplay}</a>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/${OWNER_CONTACTS.primaryPhone}?text=${encodeURIComponent('Hello Charte Homes, I have an inquiry regarding Ethiopian properties.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[#C4AF8B] hover:text-white font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#A68B67]" />
              <span>WhatsApp Inquiry</span>
            </a>
            <span className="text-[#686850]">|</span>
            <a
              href={`https://t.me/${OWNER_CONTACTS.telegram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D8D5CC] hover:text-white transition-colors"
            >
              Telegram @{OWNER_CONTACTS.telegram}
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
            <CharteLogo size="md" variant="horizontal" theme="natural" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5 bg-[#EAE8DF] p-1 rounded-full border border-[#DCD7CB]">
            <button
              onClick={() => { onSetMode('buy'); onNavigateHome(); }}
              className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeMode === 'buy'
                  ? 'bg-[#5A5A40] text-white shadow-sm'
                  : 'text-[#5A5A40] hover:text-[#2C2C26] hover:bg-white/50'
              }`}
            >
              {t.nav_buy}
            </button>
            <button
              onClick={() => { onSetMode('rent'); onNavigateHome(); }}
              className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeMode === 'rent'
                  ? 'bg-[#5A5A40] text-white shadow-sm'
                  : 'text-[#5A5A40] hover:text-[#2C2C26] hover:bg-white/50'
              }`}
            >
              {t.nav_rent}
            </button>
            <button
              onClick={onOpenSell}
              className={`px-6 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                activeMode === 'sell'
                  ? 'bg-[#5A5A40] text-white shadow-sm'
                  : 'text-[#5A5A40] hover:text-[#2C2C26] hover:bg-white/50'
              }`}
            >
              {t.nav_list}
            </button>
          </nav>

          {/* Actions: Lang Switcher, CTA, Admin */}
          <div className="flex items-center gap-3">
            {/* Language switch */}
            <div className="flex items-center bg-[#EAE8DF] border border-[#DCD7CB] rounded-full p-0.5 text-xs font-bold">
              <button
                onClick={() => onSetLang('en')}
                className={`px-2.5 py-1.5 rounded-full transition-colors ${
                  currentLang === 'en' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#5A5A40] hover:text-[#2C2C26]'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => onSetLang('am')}
                className={`px-2.5 py-1.5 rounded-full transition-colors ${
                  currentLang === 'am' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#5A5A40] hover:text-[#2C2C26]'
                }`}
              >
                አማ
              </button>
            </div>

            {/* List Property Button */}
            <button
              onClick={onOpenSell}
              className="hidden sm:flex items-center gap-2 bg-[#5A5A40] hover:bg-[#474732] text-white font-semibold text-xs uppercase tracking-widest px-5 py-2.5 rounded-full shadow-sm border border-[#5A5A40] transition-all hover:scale-[1.01]"
            >
              <PlusCircle className="w-4 h-4 text-[#D5CEBF]" />
              <span>{t.nav_list}</span>
            </button>

            {/* Admin status pill */}
            {adminEmail ? (
              <div className="hidden lg:flex items-center gap-2 bg-[#EAE8DF] border border-[#DCD7CB] text-[#5A5A40] text-xs px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-[#A68B67]" />
                <span className="font-mono truncate max-w-[140px] text-[#2C2C26]">{adminEmail}</span>
                <button
                  onClick={onAdminLogout}
                  title={t.admin_logout}
                  className="text-[#8A887A] hover:text-[#2C2C26] p-0.5 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : null}

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-[#EAE8DF] border border-[#DCD7CB] text-[#5A5A40] hover:text-[#2C2C26]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#F5F5F0] border-t border-[#E5E2D9] px-4 pt-4 pb-6 space-y-4 animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => { onSetMode('buy'); onNavigateHome(); setMobileMenuOpen(false); }}
              className={`py-2.5 text-center text-xs font-semibold uppercase tracking-wider rounded-full ${
                activeMode === 'buy' ? 'bg-[#5A5A40] text-white shadow-sm' : 'bg-[#EAE8DF] text-[#5A5A40]'
              }`}
            >
              {t.nav_buy}
            </button>
            <button
              onClick={() => { onSetMode('rent'); onNavigateHome(); setMobileMenuOpen(false); }}
              className={`py-2.5 text-center text-xs font-semibold uppercase tracking-wider rounded-full ${
                activeMode === 'rent' ? 'bg-[#5A5A40] text-white shadow-sm' : 'bg-[#EAE8DF] text-[#5A5A40]'
              }`}
            >
              {t.nav_rent}
            </button>
            <button
              onClick={() => { onOpenSell(); setMobileMenuOpen(false); }}
              className={`py-2.5 text-center text-xs font-semibold uppercase tracking-wider rounded-full ${
                activeMode === 'sell' ? 'bg-[#5A5A40] text-white shadow-sm' : 'bg-[#EAE8DF] text-[#5A5A40]'
              }`}
            >
              {t.nav_list}
            </button>
          </div>

          <div className="pt-3 border-t border-[#E5E2D9] space-y-2 text-sm">
            <a
              href={`tel:+${OWNER_CONTACTS.primaryPhone}`}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-[#E5E2D9] text-[#2C2C26] hover:bg-[#FAF9F5]"
            >
              <Phone className="w-4 h-4 text-[#5A5A40]" />
              <span>Call {OWNER_CONTACTS.primaryPhoneDisplay}</span>
            </a>
            <a
              href={`https://wa.me/${OWNER_CONTACTS.primaryPhone}?text=${encodeURIComponent('Hello Charte Homes, I would like to inquire about properties.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white border border-[#E5E2D9] text-[#2C2C26] hover:bg-[#FAF9F5]"
            >
              <MessageCircle className="w-4 h-4 text-[#A68B67]" />
              <span>WhatsApp Chat</span>
            </a>

            {adminEmail ? (
              <div className="flex items-center justify-between px-4 py-2.5 bg-[#EAE8DF] rounded-xl text-xs text-[#5A5A40] border border-[#DCD7CB]">
                <span className="font-mono">{adminEmail}</span>
                <button
                  onClick={() => { onAdminLogout(); setMobileMenuOpen(false); }}
                  className="text-[#8B3A2C] font-medium underline"
                >
                  {t.admin_logout}
                </button>
              </div>
            ) : (
              <button
                onClick={() => { onOpenAdmin(); setMobileMenuOpen(false); }}
                className="w-full text-left px-4 py-2 text-xs text-[#7A786C] hover:text-[#2C2C26]"
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
