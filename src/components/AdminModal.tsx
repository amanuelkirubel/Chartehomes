import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { X, Shield, Lock, Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onAdminLogin: (email: string) => void;
}

const AUTHORIZED_EMAILS = [
  'chartehomes@gmail.com',
  'annahomesinethiopia@gmail.com',
  'houseinethiopia7@gmail.com'
];

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  onAdminLogin,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[currentLang];
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('chartehomes@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const cleanEmail = email.toLowerCase().trim();
    if (!AUTHORIZED_EMAILS.includes(cleanEmail)) {
      setError(
        currentLang === 'am'
          ? 'ይህ ኢሜይል ለቻርቴ ሆምስ አስተዳዳሪ አልተፈቀደም።'
          : 'That email is not authorized for a Charte Homes admin account.'
      );
      return;
    }

    if (!password || password.length < 4) {
      setError(
        currentLang === 'am'
          ? 'እባክዎ ትክክለኛ የይለፍ ቃል ያስገቡ።'
          : 'Please enter a valid password (at least 4 characters).'
      );
      return;
    }

    setSuccess(
      currentLang === 'am'
        ? 'በስኬት ገብተዋል!'
        : 'Successfully authenticated as Charte Homes Administrator!'
    );

    setTimeout(() => {
      onAdminLogin(cleanEmail);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-[32px] shadow-2xl overflow-hidden my-6 border border-[#E5E2D9]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E2D9] bg-[#FAF9F5]">
          <div className="flex items-center gap-2 text-[#5A5A40]">
            <Shield className="w-5 h-5" />
            <h3
              className="text-lg font-bold text-[#1C1C1C] font-serif"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {mode === 'login' ? t.admin_login_title : t.admin_register_title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#8E8B7D] hover:text-[#2C2C26] hover:bg-[#EAE8DF]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-[#7A786C] leading-relaxed">
            {mode === 'login' ? t.admin_login_sub : t.admin_register_sub}
          </p>

          <div className="grid grid-cols-2 gap-1 bg-[#EAE8DF] p-1 rounded-full">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              className={`py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                mode === 'login' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#5A5A40] hover:text-[#2C2C26]'
              }`}
            >
              {t.login_btn}
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setError(''); }}
              className={`py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                mode === 'register' ? 'bg-[#5A5A40] text-white shadow-xs' : 'text-[#5A5A40] hover:text-[#2C2C26]'
              }`}
            >
              {t.register_btn}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#7A786C] mb-1.5">
                {t.email_label}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8E8B7D] absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="chartehomes@gmail.com"
                  className="w-full bg-[#FAF9F5] border border-[#DDD9CE] text-[#2C2C26] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#5A5A40] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#7A786C] mb-1.5">
                {t.password_label}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8E8B7D] absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#FAF9F5] border border-[#DDD9CE] text-[#2C2C26] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#5A5A40] focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs text-emerald-700">
                <CheckCircle className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{success}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#5A5A40] hover:bg-[#484833] text-white font-bold py-3.5 px-6 rounded-full shadow-sm uppercase tracking-widest text-xs transition-all active:scale-[0.99]"
            >
              {mode === 'login' ? t.login_btn : t.create_admin_btn}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
