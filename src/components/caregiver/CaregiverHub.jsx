import React, { useState } from 'react';
import { Heart, ShieldCheck, BookOpen, AlertCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function CaregiverHub() {
  const { setActiveModal } = useApp();
  const [burnoutScore, setBurnoutScore] = useState(null);

  const CAREGIVER_MODULES = [
    {
      title: "Healthy Boundaries",
      desc: "Learn how to express care without enabling self-destructive behaviors.",
      tag: "Essential",
      color: "border-teal-100 text-teal-700 bg-teal-50/30"
    },
    {
      title: "Emergency Care Signals",
      desc: "Identify respiratory depression, blue nail beds, and unresponsiveness fast.",
      tag: "Safety",
      color: "border-rose-100 text-rose-700 bg-rose-50/30"
    },
    {
      title: "Caregiver Self-Care",
      desc: "Protect your own emotional health and join local counseling or virtual support groups.",
      tag: "Support",
      color: "border-purple-100 text-purple-700 bg-purple-50/30"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Overview Card */}
      <div className="healthcare-card p-6 bg-white border border-slate-100">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-600 mb-1">
              <Heart className="h-5 w-5 fill-purple-50" />
              <span className="text-xs uppercase font-extrabold tracking-wider">Caregiver Guide</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">You Are Not Alone</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-lg leading-relaxed">
              Supporting a family member requires empathy, firm boundaries, and immediate emergency readiness.
            </p>
          </div>

          <button
            onClick={() => setActiveModal('emergency_script')}
            className="flex items-center gap-1.5 px-4.5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shrink-0 transition-colors shadow-sm"
          >
            <AlertCircle className="h-4 w-4" />
            <span>Naloxone Guide</span>
          </button>
        </div>
      </div>

      {/* Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CAREGIVER_MODULES.map((mod, idx) => (
          <div key={idx} className={`healthcare-card p-5 border flex flex-col justify-between ${mod.color}`}>
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-white text-slate-500 border border-slate-200">
                  {mod.tag}
                </span>
                <BookOpen className="h-4 w-4 text-slate-400" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">{mod.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">{mod.desc}</p>
            </div>
            <button className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1">
              <span>Read Guide</span> →
            </button>
          </div>
        ))}
      </div>

      {/* Burnout Assessment */}
      <div className="healthcare-card p-6 bg-white border border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 font-display mb-1">Wellness Pulse Check</h3>
        <p className="text-xs text-slate-500 mb-4">How overwhelmed do you feel managing care today?</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {['1 - Calm & Supported', '2 - Slight Stress', '3 - Moderate Anxiety', '4 - High Exhaustion', '5 - Complete Burnout'].map((label, index) => (
            <button
              key={index}
              onClick={() => setBurnoutScore(index + 1)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
                burnoutScore === index + 1
                  ? 'bg-purple-600 text-white border-purple-500 shadow-sm'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {burnoutScore && (
          <div className="p-4 rounded-xl bg-purple-50 border border-purple-100 text-xs text-purple-800 leading-relaxed animate-fadeIn">
            ✨ **Wellness Suggestion:** {
              burnoutScore <= 2
                ? "You are maintaining healthy emotional balance. Keep setting clear, loving boundaries."
                : burnoutScore <= 4
                ? "Your stress levels are elevated. Consider scheduling 30 minutes of personal self-care or connecting with a counselor."
                : "You are experiencing severe burnout. Reach out to a professional counselor or de-addiction service hotline."
            }
          </div>
        )}
      </div>

    </div>
  );
}
