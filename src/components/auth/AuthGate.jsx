import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Sparkles, User, Key, AlertCircle, ArrowRight } from 'lucide-react';

export function AuthGate({ onStartOnboarding }) {
  const { login, signup, loginAsGuest, enableDemoMode } = useApp();
  const [isSignUp, setIsSignUp] = useState(false);
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
        signup(name, email, password);
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
            {isSignUp ? 'Create Safe Space' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isSignUp ? 'Register to persist recovery progress' : 'Access your personalized recovery companion'}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-100 text-xs text-rose-800 flex items-center gap-2 font-medium">
            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#4F7C82]"
              />
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#4F7C82]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-xs focus:outline-none focus:border-[#4F7C82]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[#4F7C82] hover:bg-[#3d6065] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
          >
            <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6 text-center">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 bg-white px-3 relative z-10">
            Or Choose Secure Entry
          </span>
          <div className="absolute inset-y-1/2 left-0 right-0 border-b border-slate-100"></div>
        </div>

        {/* Guest and Demo mode options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            onClick={loginAsGuest}
            className="p-3 rounded-xl border border-slate-200 hover:border-[#4F7C82]/50 text-left transition-all"
          >
            <div className="font-bold text-xs text-[#4F7C82] mb-0.5">Anonymous Mode</div>
            <div className="text-[10px] text-slate-500">Zero-tracking offline session.</div>
          </button>

          <button
            onClick={enableDemoMode}
            className="p-3 rounded-xl border border-slate-200 hover:border-[#4F7C82]/50 text-left transition-all"
          >
            <div className="font-bold text-xs text-amber-700 mb-0.5">Try Demo Mode</div>
            <div className="text-[10px] text-slate-500">Preloads judge evaluation logs.</div>
          </button>
        </div>

        {/* Footnote Toggle */}
        <div className="mt-6 text-center text-xs">
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#4F7C82] font-semibold hover:underline"
          >
            {isSignUp ? 'Already have an account? Sign In' : 'Create new persistent account'}
          </button>
        </div>

      </div>
    </div>
  );
}
