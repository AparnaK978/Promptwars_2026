import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, User, Users, Volume2, VolumeX, Eye, AlertTriangle, Cpu, LogOut } from 'lucide-react';

export function Navbar() {
  const { role, setRole, highContrast, toggleHighContrast, speechOutputEnabled, setSpeechOutputEnabled, setActiveModal, userProfile, logout, t } = useApp();

  return (
    <div className="sticky top-0 z-40 w-full border-b border-slate-100 bg-white/90 backdrop-blur-md px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-[#4F7C82] flex items-center justify-center shadow-sm">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-lg font-bold tracking-tight text-slate-900">BEACON</span>
              <span className="text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-100">
                {userProfile.language || 'English'}
              </span>
            </div>
          </div>
        </div>

        {/* Dual Role Toggle */}
        {userProfile?.isDemo && (
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200" role="group" aria-label="Role Switcher Controls">
            <button
              onClick={() => setRole('individual')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F7C82] ${
                role === 'individual'
                  ? 'bg-[#4F7C82] text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              aria-label="Switch to Individual recovery workspace"
            >
              <User className="h-3.5 w-3.5" />
              <span>Individual</span>
            </button>
            <button
              onClick={() => setRole('caregiver')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F7C82] ${
                role === 'caregiver'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              aria-label="Switch to Caregiver support hub"
            >
              <Users className="h-3.5 w-3.5" />
              <span>Caregiver</span>
            </button>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* AI Pipeline Architecture */}
          <button
            onClick={() => setActiveModal('pipeline')}
            className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-teal-700 text-xs font-semibold cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F7C82]"
            aria-label="View AI Pipeline Architecture Detail"
          >
            <Cpu className="h-3.5 w-3.5 text-teal-600" />
            <span>Pipeline</span>
          </button>

          {/* Audio Speech Toggle */}
          <button
            onClick={() => setSpeechOutputEnabled(!speechOutputEnabled)}
            className={`p-2 rounded-xl border transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F7C82] ${
              speechOutputEnabled ? 'bg-slate-100 border-slate-200 text-teal-650' : 'bg-slate-50 border-slate-105 text-slate-400'
            }`}
            aria-label="Toggle Audio companion speech output"
          >
            {speechOutputEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* High Contrast */}
          <button
            onClick={toggleHighContrast}
            className={`p-2 rounded-xl border transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F7C82] ${
              highContrast ? 'bg-[#4F7C82] text-white' : 'bg-slate-50 border-slate-105 text-slate-500'
            }`}
            aria-label="Toggle High Contrast Theme Mode"
          >
            <Eye className="h-4 w-4" />
          </button>

          {/* Log Out */}
          <button
            onClick={logout}
            className="p-2 rounded-xl border border-slate-205 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#4F7C82]"
            aria-label="Sign out of current account session"
          >
            <LogOut className="h-4 w-4" />
          </button>

        </div>

      </div>
    </div>
  );
}
