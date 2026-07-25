import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Sparkles, User, Key, AlertCircle, ArrowRight } from 'lucide-react';

export function AuthGate({ onStartOnboarding }) {
  const { login, signup, loginAsGuest, enableDemoMode, t } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
  const [role, setRole] = useState('individual'); // 'individual' | 'caregiver'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      if (isSignUp) {
        if (!name.trim()) {
          setError("Name is required.");
          return;
        }
        signup(name, email, password, role);
      } else {
        login(email, password);
      }
    } catch (err) {
      setError(err.message || "Authentication failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center p-6 text-[#243746]">
      <div className="w-full max-w-md bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm">
        
        {/* Header Logo */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="h-9 w-9 rounded-xl bg-[#4F7C82] flex items-center justify-center shadow-sm text-white">
            <Shield className="h-5 w-5" />
          </div>
          <span className="font-display text-lg font-bold tracking-tight text-[#243746]">BEACON</span>
        </div>

        <div className="text-center mb-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
            {isSignUp ? t('signUp') : t('signIn')}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isSignUp ? t('createAccount') : t('heroSubtitle')}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-100 text-xs text-rose-800 flex items-center gap-2 font-medium" role="alert" aria-live="assertive">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  {t('whoAreYou')}
                </label>
                <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 mb-3" role="group" aria-label="Registration target workspace choice">
                  <button
                    type="button"
                    onClick={() => setRole('individual')}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F7C82] ${
                      role === 'individual'
                        ? 'bg-[#4F7C82] text-white shadow-sm'
                        : 'text-[#243746]'
                    }`}
                    aria-label="Register as recovering individual user"
                  >
                    {t('individualRole')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('caregiver')}
                    className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F7C82] ${
                      role === 'caregiver'
                        ? 'bg-[#4F7C82] text-white shadow-sm'
                        : 'text-[#243746]'
                    }`}
                    aria-label="Register as caregiver support user"
                  >
                    {t('caregiverRole')}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="auth-name" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                  {t('name')}
                </label>
                <input
                  id="auth-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Aparna"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#4F7C82] focus:ring-2 focus:ring-[#4F7C82]"
                />
              </div>
            </>
          )}

          <div>
            <label htmlFor="auth-email" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              {t('email')}
            </label>
            <input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#4F7C82] focus:ring-2 focus:ring-[#4F7C82]"
            />
          </div>

          <div>
            <label htmlFor="auth-password" className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              {t('password')}
            </label>
            <input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#4F7C82] focus:ring-2 focus:ring-[#4F7C82]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#4F7C82] hover:bg-[#3d6065] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F7C82]"
          >
            <span>{isSignUp ? t('signUp') : t('signIn')}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#6B7280] bg-white px-3 relative z-10">
            {t('tryDemo')}
          </span>
          <div className="absolute inset-y-1/2 left-0 right-0 border-b border-slate-100"></div>
        </div>

        {/* Guest and Demo mode options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            onClick={loginAsGuest}
            className="p-3 rounded-xl border border-slate-200 hover:border-[#4F7C82]/50 text-left transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F7C82]"
            aria-label="Enter platform anonymously as Guest"
          >
            <div className="font-bold text-xs text-[#4F7C82] mb-0.5">{t('anonymousMode')}</div>
            <div className="text-[10px] text-slate-500">{t('anonymousDesc')}</div>
          </button>

          <button
            onClick={enableDemoMode}
            className="p-3 rounded-xl border border-slate-200 hover:border-[#4F7C82]/50 text-left transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F7C82]"
            aria-label="Enable Judge Demo mode with loaded metrics logs"
          >
            <div className="font-bold text-xs text-amber-700 mb-0.5">{t('tryDemoMode')}</div>
            <div className="text-[10px] text-slate-500">{t('tryDemoDesc')}</div>
          </button>
        </div>

        {/* Footnote Toggle */}
        <div className="mt-6 text-center text-xs">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#4F7C82] font-semibold hover:underline cursor-pointer focus:outline-none"
            aria-label="Toggle between Sign In and Sign Up views"
          >
            {isSignUp ? t('alreadyHaveAccount') : t('createAccount')}
          </button>
        </div>

      </div>
    </div>
  );
}
