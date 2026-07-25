import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, User, Lock, Mail, ArrowRight, UserCheck, Sparkles, HelpCircle } from 'lucide-react';

export function AuthGate({ onStartOnboarding }) {
  const { login, signup, loginAsGuest, enableDemoMode, setRole } = useApp();
  const [mode, setMode] = useState('welcome'); // 'welcome' | 'login' | 'signup' | 'privacy_info'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please fill in both email and password.');
      return;
    }
    login(email, password);
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

  const handleGuest = (selectedRole) => {
    setRole(selectedRole);
    loginAsGuest();
    onStartOnboarding();
  };

  const handleDemo = () => {
    enableDemoMode();
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="bg-white border border-slate-100 rounded-3xl shadow-xl w-full max-w-md p-6 sm:p-8 text-slate-800">
        
        {/* Branding */}
        <div className="text-center mb-6">
          <div className="h-12 w-12 rounded-xl bg-teal-600 flex items-center justify-center mx-auto mb-3 shadow-md">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 font-display">Log in to Beacon</h2>
          <p className="text-xs text-slate-500 mt-1">Select your path to enter recovery support</p>
        </div>

        {error && (
          <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-100 text-rose-700 text-xs text-center font-medium animate-fadeIn">
            {error}
          </div>
        )}

        {mode === 'welcome' && (
          <div className="space-y-3">
            
            <button
              onClick={() => handleGuest('individual')}
              className="w-full py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-between"
            >
              <span>Continue Recovery Journey (Anonymous)</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => handleGuest('caregiver')}
              className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-all flex items-center justify-between"
            >
              <span>Continue as Caregiver (Anonymous)</span>
              <ArrowRight className="h-4 w-4 text-purple-400" />
            </button>

            {/* Judge Demo Trigger */}
            <button
              onClick={handleDemo}
              className="w-full py-3 px-4 rounded-xl bg-amber-50 hover:bg-amber-100/50 border border-amber-200 text-amber-700 font-bold text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>Try Demo Experience (For Judges)</span>
            </button>

            {/* Alternative Methods */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4 text-xs">
              <button
                onClick={() => setMode('login')}
                className="text-slate-500 hover:text-slate-900"
              >
                Log In with Email
              </button>
              
              <button
                onClick={() => setMode('signup')}
                className="text-teal-600 hover:text-teal-700 font-semibold"
              >
                Create Account
              </button>
            </div>

            <button
              onClick={() => setMode('privacy_info')}
              className="w-full text-center text-[10px] text-slate-400 hover:text-slate-600 flex items-center justify-center gap-1 mt-3"
            >
              <HelpCircle className="h-3 w-3" />
              <span>Why Anonymous Mode? (Zero PII Privacy)</span>
            </button>

          </div>
        )}

        {mode === 'privacy_info' && (
          <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
            <h3 className="font-bold text-slate-900 text-sm">Privacy & Trust Commitment</h3>
            <p>
              We believe substance recovery requires absolute confidentiality. Anonymous Guest Mode lets you use all AI voice companions, crisis guidelines, and logs without sharing your identity, email, or credentials.
            </p>
            <button
              onClick={() => setMode('welcome')}
              className="w-full py-2.5 rounded-xl bg-teal-600 text-white font-bold text-xs"
            >
              Back to Sign In
            </button>
          </div>
        )}

        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-md"
            >
              Sign In
            </button>

            <button
              type="button"
              onClick={() => setMode('welcome')}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800"
            >
              ← Back
            </button>
          </form>
        )}

        {mode === 'signup' && (
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Alias / Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rahul"
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-teal-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-md"
            >
              Create Account
            </button>

            <button
              type="button"
              onClick={() => setMode('welcome')}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800"
            >
              ← Back
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
