import React from 'react';
import { CharteLogo } from './CharteLogo';
import { Language, ViewMode } from '../types';
import { TRANSLATIONS, OWNER_CONTACTS } from '../translations';
import { Phone, Mail, Send, Video, Facebook, ShieldCheck } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onSetMode: (mode: ViewMode) => void;
  onOpenSell: () => void;
  onOpenAdmin: () => void;
  onNavigateHome: () => void;
  isAdmin: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onSetMode,
  onOpenSell,
  onOpenAdmin,
  onNavigateHome,
  isAdmin,
}) => {
  const t = TRANSLATIONS[currentLang];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#28281F] text-[#C4C0B0] border-t border-[#38382C] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Presentation (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="cursor-pointer" onClick={onNavigateHome}>
              <CharteLogo size="lg" variant="horizontal" theme="natural" />
            </div>

            <p className="text-sm leading-relaxed text-[#9E9B8C] max-w-sm font-light">
              {t.footer_tagline}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={OWNER_CONTACTS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#38382B] border border-[#484838] flex items-center justify-center text-[#D8D4C8] hover:bg-[#5A5A40] hover:text-white transition-all shadow-sm"
                title="YouTube"
              >
                <Video className="w-4 h-4" />
              </a>
              <a
                href={OWNER_CONTACTS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#38382B] border border-[#484838] flex items-center justify-center text-[#D8D4C8] hover:bg-[#5A5A40] hover:text-white transition-all shadow-sm"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://t.me/${OWNER_CONTACTS.telegram}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#38382B] border border-[#484838] flex items-center justify-center text-[#D8D4C8] hover:bg-[#5A5A40] hover:text-white transition-all shadow-sm"
                title="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
              <a
                href={`https://www.tiktok.com/${OWNER_CONTACTS.tiktok}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#38382B] border border-[#484838] flex items-center justify-center text-[#D8D4C8] hover:bg-[#5A5A40] hover:text-white transition-all shadow-sm text-xs font-black font-mono"
                title="TikTok"
              >
                TT
              </a>
            </div>
          </div>

          {/* Explore Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#F5F5F0]">
              {t.footer_explore}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => { onSetMode('buy'); onNavigateHome(); }}
                  className="hover:text-white transition-colors text-[#B5B0A0]"
                >
                  {t.nav_buy}
                </button>
              </li>
              <li>
                <button
                  onClick={() => { onSetMode('rent'); onNavigateHome(); }}
                  className="hover:text-white transition-colors text-[#B5B0A0]"
                >
                  {t.nav_rent}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSell}
                  className="hover:text-white transition-colors font-medium text-[#C4AF8B]"
                >
                  {t.footer_sell_link}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#F5F5F0]">
              {t.footer_contact}
            </h4>
            <div className="space-y-2 text-sm">
              <a
                href={`tel:+${OWNER_CONTACTS.primaryPhone}`}
                className="flex items-center gap-2 hover:text-white transition-colors text-[#B5B0A0]"
              >
                <Phone className="w-4 h-4 text-[#A68B67] shrink-0" />
                <span className="font-mono">{OWNER_CONTACTS.primaryPhoneDisplay}</span>
              </a>
              <a
                href={`tel:+${OWNER_CONTACTS.secondaryPhone}`}
                className="flex items-center gap-2 hover:text-white transition-colors text-[#B5B0A0]"
              >
                <Phone className="w-4 h-4 text-[#A68B67] shrink-0" />
                <span className="font-mono">{OWNER_CONTACTS.secondaryPhoneDisplay}</span>
              </a>
              <a
                href={`mailto:${OWNER_CONTACTS.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors text-xs truncate text-[#B5B0A0]"
              >
                <Mail className="w-4 h-4 text-[#A68B67] shrink-0" />
                <span>{OWNER_CONTACTS.email}</span>
              </a>
            </div>
          </div>

          {/* Connect & Admin (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-[#F5F5F0]">
              {t.footer_connect}
            </h4>
            <p className="text-xs text-[#8E8B7C] leading-relaxed">
              Addis Ababa · Hawassa · Bahir Dar · Adama · Mekelle
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-xs text-[#D8D4C8] hover:text-white transition-colors py-1.5 px-3 rounded-full bg-[#38382B] border border-[#484838] hover:bg-[#4A4A38]"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#A68B67]" />
                <span>{isAdmin ? 'Admin Dashboard' : t.admin_login}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer and Copyright bottom strip */}
        <div className="mt-12 pt-6 border-t border-[#38382C] text-xs text-[#828073] space-y-3">
          <p className="leading-relaxed max-w-4xl">
            {t.footer_disclaimer}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[#6D6B60]">
            <div>
              &copy; {year} Charte Homes. {t.footer_rights}
            </div>
            <div className="font-mono text-[11px] text-[#8C887A]">
              chartehomes.com · Verified Ethiopian Real Estate
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
