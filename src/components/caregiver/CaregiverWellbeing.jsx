import React, { useState } from 'react';
import { Heart, RefreshCw, Sparkles, BookOpen } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function CaregiverWellbeing() {
  const { t } = useApp();
  const [tipIndex, setTipIndex] = useState(0);

  const TIPS = [
    {
      title: "Set Soft Boundaries",
      desc: "It is okay to prioritize your own sleep and emotional boundaries. You cannot support someone else on an empty tank."
    },
    {
      title: "Practice Non-Judgment",
      desc: "Relapse is often a clinical phase of recovery. Reframe your responses to focus on safety and support rather than blame."
    },
    {
      title: "Take 10 Minutes to Breathe",
      desc: "When tensions run high, step into another room and take five deep, slow breaths before responding. De-escalate yourself first."
    },
    {
      title: "Join a Support Group",
      desc: "Connect with other families sharing this journey. Knowing you are not alone reduces caregiver isolation and guilt."
    }
  ];

  const handleNextTip = () => {
    setTipIndex((prev) => (prev + 1) % TIPS.length);
  };

  return (
    <div className="healthcare-card p-6 bg-white border border-slate-100 mb-6">
      <div className="flex items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-purple-50 text-purple-700 rounded-xl">
            <Heart className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">Caregiver Wellbeing</h3>
            <p className="text-[11px] text-slate-500">Reminders and boundaries to support your own health.</p>
          </div>
        </div>

        <button
          onClick={handleNextTip}
          className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
          aria-label="Next wellbeing suggestion"
        >
          <RefreshCw className="h-3.5 w-3.5" />
        </button>
      </div>

      <div className="bg-purple-50/40 border border-purple-100/50 rounded-2xl p-4 text-slate-800 animate-fadeIn">
        <div className="flex items-center gap-1.5 text-purple-800 font-bold text-xs mb-1">
          <Sparkles className="h-3.5 w-3.5" />
          <span>{TIPS[tipIndex].title}</span>
        </div>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          {TIPS[tipIndex].desc}
        </p>
      </div>

      <div className="mt-4 flex items-start gap-2.5 text-[10px] text-slate-400">
        <BookOpen className="h-4 w-4 text-purple-400 shrink-0 mt-0.5" />
        <span>Caregiver fatigue is real. If you are feeling overwhelmed, remember you can dial Tele-MANAS (14446) for support.</span>
      </div>
    </div>
  );
}
