import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, User, Users, PhoneCall, Volume2, VolumeX, Eye, AlertTriangle, Cpu, Globe } from 'lucide-react';

export function Navbar() {
  const { role, setRole, highContrast, toggleHighContrast, speechOutputEnabled, setSpeechOutputEnabled, setActiveModal, userProfile } = useApp();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
            <Shield className="h-6 w-6 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-extrabold tracking-tight text-white">BEACON <span className="gradient-text-teal">AI</span></span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                India
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Calm Recovery Companion</p>
          </div>
        </div>

        {/* Center: Dual Role Toggle */}
        <div className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-slate-800 shadow-inner">
          <button
            onClick={() => setRole('individual')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              role === 'individual'
                ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <User className="h-4 w-4" />
            <span>Individual</span>
          </button>
          <button
            onClick={() => setRole('caregiver')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
              role === 'caregiver'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Caregiver</span>
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* AI Pipeline Architecture Trigger for Judges */}
          <button
            onClick={() => setActiveModal('pipeline')}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-teal-300 text-xs font-semibold"
            title="View AI Pipeline Architecture"
          >
            <Cpu className="h-4 w-4 text-teal-400" />
            <span>AI Pipeline</span>
          </button>

          {/* Audio Speech Toggle */}
          <button
            onClick={() => setSpeechOutputEnabled(!speechOutputEnabled)}
            className={`p-2 rounded-xl border transition-colors ${
              speechOutputEnabled ? 'bg-slate-800 border-slate-700 text-cyan-400' : 'bg-slate-900 border-slate-800 text-slate-500'
            }`}
            title={speechOutputEnabled ? "Voice Output Active" : "Voice Output Muted"}
          >
            {speechOutputEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* High Contrast Toggle */}
          <button
            onClick={toggleHighContrast}
            className={`p-2 rounded-xl border transition-colors ${
              highContrast ? 'bg-amber-400 text-slate-950 border-amber-300 font-bold' : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
            title="Toggle Accessibility High Contrast"
          >
            <Eye className="h-4 w-4" />
          </button>

          {/* Crisis SOS Emergency Button */}
          <button
            onClick={() => setActiveModal('emergency_script')}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/30 hover:from-rose-500 hover:to-red-500 active:scale-95 transition-all animate-pulse-glow"
          >
            <AlertTriangle className="h-4 w-4 stroke-[2.5]" />
            <span>112 SOS</span>
          </button>

        </div>

      </div>
    </header>
  );
}
