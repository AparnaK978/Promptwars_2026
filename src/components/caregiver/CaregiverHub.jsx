import React, { useState } from 'react';
import { Heart, ShieldCheck, BookOpen, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function CaregiverHub() {
  const { setActiveModal } = useApp();
  const [burnoutScore, setBurnoutScore] = useState(null);

  const CAREGIVER_MODULES = [
    {
      title: "Healthy Boundaries",
      desc: "Learn how to express care without enabling self-destructive behaviors.",
      tag: "Essential",
      color: "border-teal-500/30 text-teal-400"
    },
    {
      title: "Recognizing Overdose Signals",
      desc: "Identify respiratory depression, blue nail beds, and unresponsiveness fast.",
      tag: "Safety",
      color: "border-rose-500/30 text-rose-400"
    },
    {
      title: "Caregiver Burnout Prevention",
      desc: "Protect your own emotional health and join Al-Anon / Nar-Anon support groups.",
      tag: "Self-Care",
      color: "border-purple-500/30 text-purple-400"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Overview Banner */}
      <div className="glass-panel p-6 border border-purple-500/30 bg-gradient-to-r from-slate-950 via-purple-950/20 to-slate-950">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 mb-1">
              <Heart className="h-5 w-5 fill-purple-400/20" />
              <span className="text-xs uppercase font-extrabold tracking-wider">Caregiver Support Hub</span>
            </div>
            <h2 className="text-2xl font-bold text-white font-display">You Are Not Alone in This Journey</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Supporting a loved one through addiction requires empathy, clear boundaries, and immediate emergency preparedness.
            </p>
          </div>

          <button
            onClick={() => setActiveModal('emergency_script')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-rose-600/30 transition-all shrink-0"
          >
            <AlertCircle className="h-4 w-4" />
            <span>Naloxone / CPR Protocol</span>
          </button>
        </div>
      </div>

      {/* Educational Micro-Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CAREGIVER_MODULES.map((mod, idx) => (
          <div key={idx} className={`glass-card p-5 rounded-2xl border ${mod.color} flex flex-col justify-between`}>
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-slate-300">
                  {mod.tag}
                </span>
                <BookOpen className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">{mod.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{mod.desc}</p>
            </div>
            <button className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1">
              <span>Read Guide</span> →
            </button>
          </div>
        ))}
      </div>

      {/* Caregiver Burnout Check */}
      <div className="glass-panel p-6 border border-slate-800">
        <h3 className="text-lg font-bold text-white font-display mb-1">Quick Caregiver Wellness Check</h3>
        <p className="text-xs text-slate-400 mb-4">How overwhelmed do you feel managing your loved one's care today?</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {['1 - Calm & Supported', '2 - Slight Stress', '3 - Moderate Anxiety', '4 - High Exhaustion', '5 - Complete Burnout'].map((label, index) => (
            <button
              key={index}
              onClick={() => setBurnoutScore(index + 1)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                burnoutScore === index + 1
                  ? 'bg-purple-600 text-white border-purple-400'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {burnoutScore && (
          <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-200 leading-relaxed animate-fadeIn">
            ✨ <strong>Caregiver Recommendation:</strong> {
              burnoutScore <= 2
                ? "You are maintaining healthy emotional balance. Keep setting clear, loving boundaries."
                : burnoutScore <= 4
                ? "Your stress levels are elevated. Consider scheduling 30 minutes of personal self-care today or attending a virtual Al-Anon meeting."
                : "You are experiencing severe burnout. Remember that you cannot pour from an empty cup. Reach out to a professional counselor or helpline."
            }
          </div>
        )}
      </div>

    </div>
  );
}
