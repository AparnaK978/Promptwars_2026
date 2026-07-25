import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, User, Users, Lock, Mail, ArrowRight, UserCheck, Sparkles, HelpCircle, Eye, EyeOff } from 'lucide-react';

export function AuthModal({ onClose, onStartOnboarding }) {
  const { login, signup, loginAsGuest, enableDemoMode, setRole } = useApp();
  const [mode, setMode] = useState('welcome'); // 'welcome' | 'login' | 'signup' | 'privacy_info'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }
    login(email, password);
    onClose();
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    signup(name, email, password);
    onStartOnboarding();
  };

  const handleGuest = () => {
    loginAsGuest();
    onStartOnboarding();
  };

  const handleDemoMode = () => {
    enableDemoMode();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-md p-6 sm:p-8 relative border border-slate-700 shadow-2xl bg-slate-950">
        
        {/* Calm Header Branding */}
        <div className="text-center mb-6">
          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center mx-auto mb-3 shadow-lg shadow-teal-500/20">
            <Shield className="h-8 w-8 text-slate-950 stroke-[2.5]" />
          </div>
          <h2 className="text-2xl font-black text-white font-display tracking-tight">BEACON <span className="gradient-text-teal">AI</span></h2>
          <p className="text-xs text-slate-400 mt-1">Calm, Trauma-Informed Voice Recovery Companion</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs text-center font-medium">
            {error}
          </div>
        )}

        {/* Welcome Mode */}
        {mode === 'welcome' && (
          <div className="space-y-3">
            
            {/* Primary Action 1: Continue Recovery Journey */}
            <button
              onClick={() => {
                setRole('individual');
                handleGuest();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-teal-500/30 hover:brightness-110 active:scale-98 transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <User className="h-5 w-5 stroke-[2.5]" />
                <span>Continue Recovery Journey</span>
              </div>
              <ArrowRight className="h-4 w-4 stroke-[2.5]" />
            </button>

            {/* Primary Action 2: I'm a Caregiver */}
            <button
              onClick={() => {
                setRole('caregiver');
                handleGuest();
              }}
              className="w-full py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-purple-500/30 text-purple-200 font-bold text-sm transition-all flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <Users className="h-5 w-5 text-purple-400" />
                <span>I'm a Caregiver</span>
              </div>
              <ArrowRight className="h-4 w-4 text-purple-400" />
            </button>

            {/* Hackathon Judge Demo Mode Button */}
            <div className="pt-2">
              <button
                onClick={handleDemoMode}
                className="w-full py-3 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span>Try Demo Experience (For Judges)</span>
              </button>
            </div>

            {/* Anonymous Mode & Privacy Info */}
            <div className="pt-2 border-t border-slate-800">
              <button
                onClick={() => setMode('privacy_info')}
                className="w-full text-center text-xs text-slate-400 hover:text-teal-300 flex items-center justify-center gap-1 py-1"
              >
                <HelpCircle className="h-3.5 w-3.5" />
                <span>Why Anonymous Guest Mode? (Zero PII Privacy)</span>
              </button>

              <button
                onClick={() => setMode('login')}
                className="w-full text-center text-xs text-slate-400 hover:text-white mt-1 py-1 font-medium"
              >
                Sign in with existing account
              </button>
            </div>

          </div>
        )}

        {/* Privacy Info Mode */}
        {mode === 'privacy_info' && (
          <div className="space-y-4 text-xs text-slate-300">
            <h3 className="text-sm font-bold text-white font-display">Zero-PII Anonymous Privacy</h3>
            <p className="leading-relaxed">
              Substance use disorder recovery requires absolute psychological safety. Anonymous Guest Mode allows you to use Beacon AI without providing a name, email address, or phone number.
            </p>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <strong className="text-teal-400">Privacy Guarantees:</strong>
              <ul className="list-disc list-inside text-[11px] text-slate-400 space-y-1">
                <li>All journal logs and craving scales stay on your browser.</li>
                <li>No data is sold or shared with external servers.</li>
                <li>Emergency numbers (112 / 108) are always accessible.</li>
              </ul>
            </div>
            <button
              onClick={() => setMode('welcome')}
              className="w-full py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs"
            >
              Back to Options
            </button>
          </div>
        )}

        {/* Login Mode */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full py-2.5 pl-10 pr-4 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full py-2.5 pl-10 pr-10 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-teal-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-teal-500/30 hover:bg-teal-400 transition-all"
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => setMode('welcome')}
              className="w-full text-center text-xs text-slate-400 hover:text-slate-200 mt-2"
            >
              ← Back to options
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
