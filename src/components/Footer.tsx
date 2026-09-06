import React from 'react';
import { CharteLogo } from './CharteLogo';
import { Language, ViewMode } from '../types';
import { TRANSLATIONS, OWNER_CONTACTS } from '../translations';
import { Phone, Mail, Send, Video, MessageCircle, ShieldCheck, Download } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onSetMode: (mode: ViewMode) => void;
  onOpenSell: () => void;
  onOpenAdmin: () => void;
  onNavigateHome: () => void;
  onOpenDownloadApp: () => void;
  isAdmin: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onSetMode,
  onOpenSell,
  onOpenAdmin,
  onNavigateHome,
  onOpenDownloadApp,
  isAdmin,
}) => {
  const t = TRANSLATIONS[currentLang];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#071E3D] text-blue-100 border-t border-[#0D3166] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Presentation (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="cursor-pointer" onClick={onNavigateHome}>
              <CharteLogo size="lg" variant="horizontal" theme="blue" />
            </div>

            <p className="text-sm leading-relaxed text-blue-200/80 max-w-sm font-light">
              {t.footer_tagline}
            </p>

            {/* Social media icons */}
            <div className="flex items-center gap-2.5 pt-2 flex-wrap">
              {/* YouTube */}
              <a
                href={OWNER_CONTACTS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-blue-900/60 border border-blue-700/50 flex items-center justify-center text-red-400 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                title="YouTube @chartehomes"
              >
                <Video className="w-4 h-4" />
              </a>

              {/* Telegram 1 */}
              <a
                href="https://t.me/charte7"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-blue-900/60 border border-blue-700/50 flex items-center justify-center text-sky-300 hover:bg-sky-500 hover:text-white transition-all shadow-sm"
                title="Telegram @charte7"
              >
                <Send className="w-4 h-4" />
              </a>

              {/* Telegram 2 */}
              <a
                href="https://t.me/Charte77"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-blue-900/60 border border-blue-700/50 flex items-center justify-center text-sky-300 hover:bg-sky-500 hover:text-white transition-all shadow-sm text-xs font-bold font-mono"
                title="Telegram @Charte77"
              >
                77
              </a>

              {/* TikTok 1 */}
              <a
                href="https://www.tiktok.com/@chartehomes"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-blue-900/60 border border-blue-700/50 flex items-center justify-center text-slate-200 hover:bg-black hover:text-white transition-all shadow-sm text-xs font-bold font-mono"
                title="TikTok @Chartehomes"
              >
                TT1
              </a>

              {/* TikTok 2 */}
              <a
                href="https://www.tiktok.com/@chartecars"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-blue-900/60 border border-blue-700/50 flex items-center justify-center text-slate-200 hover:bg-black hover:text-white transition-all shadow-sm text-xs font-bold font-mono"
                title="TikTok @chartecars"
              >
                TT2
              </a>
            </div>

            {/* App download button */}
            <div className="pt-2">
              <button
                onClick={onOpenDownloadApp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.download_app}</span>
              </button>
            </div>
          </div>

          {/* Explore Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-white">
              {t.footer_explore}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => { onSetMode('buy'); onNavigateHome(); }}
                  className="hover:text-white transition-colors text-blue-200/80"
                >
                  {t.nav_buy}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSell}
                  className="hover:text-white transition-colors font-medium text-emerald-300"
                >
                  {t.nav_sell}
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDownloadApp}
                  className="hover:text-white transition-colors text-sky-300 flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{t.download_app}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-white">
              {t.footer_contact}
            </h4>
            <div className="space-y-2 text-xs">
              {/* Phone 1 */}
              <div className="flex items-center gap-2">
                <a
                  href={`tel:+${OWNER_CONTACTS.phone1}`}
                  className="flex items-center gap-1.5 hover:text-white transition-colors text-blue-100 font-mono font-bold"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{OWNER_CONTACTS.phone1Display}</span>
                </a>
                <a
                  href={`https://wa.me/${OWNER_CONTACTS.phone1}?text=${encodeURIComponent('Hello Charte Homes, I would like to inquire about properties.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-0.5 text-[11px]"
                >
                  <MessageCircle className="w-3 h-3" /> WhatsApp
                </a>
              </div>

              {/* Phone 2 */}
              <div className="flex items-center gap-2">
                <a
                  href={`tel:+${OWNER_CONTACTS.phone2}`}
                  className="flex items-center gap-1.5 hover:text-white transition-colors text-blue-100 font-mono font-bold"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>{OWNER_CONTACTS.phone2Display}</span>
                </a>
                <a
                  href={`https://wa.me/${OWNER_CONTACTS.phone2}?text=${encodeURIComponent('Hello Charte Homes, I would like to inquire about properties.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-0.5 text-[11px]"
                >
                  <MessageCircle className="w-3 h-3" /> WhatsApp
                </a>
              </div>

              {/* Emails */}
              <div className="pt-2 border-t border-blue-900/60 space-y-1 font-mono text-[11px] text-blue-200">
                <a href="mailto:chartehomes@gmail.com" className="flex items-center gap-1.5 hover:text-white">
                  <Mail className="w-3 h-3 text-blue-400 shrink-0" />
                  <span>chartehomes@gmail.com</span>
                </a>
                <a href="mailto:chartehomes7@gmail.com" className="flex items-center gap-1.5 hover:text-white">
                  <Mail className="w-3 h-3 text-blue-400 shrink-0" />
                  <span>chartehomes7@gmail.com</span>
                </a>
                <a href="mailto:emanuelkirubel@gmail.com" className="flex items-center gap-1.5 hover:text-white">
                  <Mail className="w-3 h-3 text-blue-400 shrink-0" />
                  <span>emanuelkirubel@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Social Channels & Admin (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase font-bold tracking-widest text-white">
              Social & Community
            </h4>
            <div className="space-y-1.5 text-xs text-blue-200">
              <div>
                <span className="text-blue-400">Telegram:</span>{' '}
                <a href="https://t.me/charte7" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">@charte7</a>,{' '}
                <a href="https://t.me/Charte77" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">@Charte77</a>
              </div>
              <div>
                <span className="text-blue-400">TikTok:</span>{' '}
                <a href="https://www.tiktok.com/@chartehomes" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">@Chartehomes</a>,{' '}
                <a href="https://www.tiktok.com/@chartecars" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">@chartecars</a>
              </div>
              <div>
                <span className="text-blue-400">YouTube:</span>{' '}
                <a href="https://www.youtube.com/@chartehomes" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">@chartehomes</a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-xs text-blue-200 hover:text-white transition-colors py-1.5 px-3 rounded-full bg-blue-900/60 border border-blue-700/50 hover:bg-blue-800"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>{isAdmin ? 'Admin Dashboard' : t.admin_login}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Disclaimer and Copyright bottom strip */}
        <div className="mt-12 pt-6 border-t border-[#0D3166] text-xs text-blue-300/60 space-y-3">
          <p className="leading-relaxed max-w-4xl">
            {t.footer_disclaimer}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-blue-300/40">
            <div>
              &copy; {year} Charte Homes. {t.footer_rights}
            </div>
            <div className="font-mono text-[11px] text-blue-400/80">
              chartehomes.com · Verified Ethiopian Real Estate
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
