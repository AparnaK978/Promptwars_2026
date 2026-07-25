import React from 'react';
import { Phone, AlertCircle, HeartHandshake, ShieldAlert } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function EmergencyBanner() {
  const { setActiveModal } = useApp();

  return (
    <div className="bg-gradient-to-r from-rose-950/80 via-slate-900 to-rose-950/80 border-b border-rose-900/40 px-4 py-2 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-rose-200 font-medium">
          <ShieldAlert className="h-4 w-4 text-rose-400 shrink-0" />
          <span>Need immediate crisis help or suspect an overdose? Free 24/7 confidential support:</span>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          <a
            href="tel:988"
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors shadow-sm"
          >
            <Phone className="h-3.5 w-3.5" />
            <span>Call 988 (Crisis Line)</span>
          </a>

          <a
            href="tel:18006624357"
            className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
          >
            <HeartHandshake className="h-3.5 w-3.5 text-teal-400" />
            <span>SAMHSA Helpline: 1-800-662-4357</span>
          </a>

          <button
            onClick={() => setActiveModal('emergency_script')}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 text-xs font-semibold"
          >
            <AlertCircle className="h-3.5 w-3.5 text-amber-400" />
            <span>Naloxone Step-by-Step</span>
          </button>
        </div>
      </div>
    </div>
  );
}
