import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import { X, ArrowLeft, Shield, Lock, Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: Language;
  onAdminLogin: (email: string) => void;
}

const AUTHORIZED_EMAILS = [
  'chartehomes@gmail.com',
  'chartehomes7@gmail.com',
  'emanuelkirubel@gmail.com',
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
          ? 'ይህ ኢሜይል ለቻርቴ ሆምስ አስተዳዳሪ አልተፈቀደም። የተፈቀዱ ኢሜይሎች፡ chartehomes@gmail.com, chartehomes7@gmail.com, emanuelkirubel@gmail.com'
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
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden my-6 border border-blue-100">
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
            <div className="flex items-center gap-2 text-[#0A2244]">
              <Shield className="w-5 h-5 text-[#1E40AF]" />
              <h3
                className="text-lg font-bold font-serif"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {mode === 'login' ? t.admin_login_title : t.admin_register_title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-600 leading-relaxed">
            {mode === 'login' ? t.admin_login_sub : t.admin_register_sub}
          </p>

          <div className="grid grid-cols-2 gap-1 bg-blue-50 p-1 rounded-full border border-blue-100">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(''); }}
              className={`py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                mode === 'login' ? 'bg-[#1E40AF] text-white shadow-xs' : 'text-[#1E40AF] hover:text-[#0A2244]'
              }`}
            >
              {t.login_btn}
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setError(''); }}
              className={`py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                mode === 'register' ? 'bg-[#1E40AF] text-white shadow-xs' : 'text-[#1E40AF] hover:text-[#0A2244]'
              }`}
            >
              {t.register_btn}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488] mb-1.5">
                {t.email_label}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="chartehomes@gmail.com"
                  className="w-full bg-[#F6F9FD] border border-[#D3E1F2] text-[#0A2244] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#1E40AF] focus:outline-none"
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Authorized: chartehomes@gmail.com, chartehomes7@gmail.com, emanuelkirubel@gmail.com
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-[0.15em] text-[#4A6488] mb-1.5">
                {t.password_label}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#F6F9FD] border border-[#D3E1F2] text-[#0A2244] rounded-xl pl-10 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-[#1E40AF] focus:outline-none"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-700">
                <CheckCircle className="w-4 h-4 shrink-0" />
                <span>{success}</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#0A2244] to-[#1E40AF] hover:from-[#061833] hover:to-[#1D4ED8] text-white font-bold py-3.5 px-6 rounded-full shadow-md uppercase tracking-widest text-xs transition-all active:scale-[0.99]"
              >
                {mode === 'login' ? t.login_btn : t.register_btn}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
