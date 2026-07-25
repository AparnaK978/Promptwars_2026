import React from 'react';
import { Award, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function MilestoneTracker() {
  const { streakDays, t } = useApp();

  const MILESTONES = [
    { target: 1, title: "First Step", desc: "Completed your first check-in log." },
    { target: 3, title: "Building Momentum", desc: "Achieved a 3-day consistency streak." },
    { target: 7, title: "Sustained Effort", desc: "A full week of mindful recovery tracking." },
    { target: 14, title: "Inner Strength", desc: "Two weeks of grounding and stress monitoring." },
    { target: 30, title: "Resilience Champion", desc: "30 days of persistent SUD recovery companion usage." }
  ];

  return (
    <div className="healthcare-card p-6 bg-white border border-slate-100 mb-6">
      <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
        <div className="p-2 bg-[#F0F5F6] text-[#4F7C82] rounded-xl">
          <Award className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-display">Recovery Milestones</h3>
          <p className="text-[11px] text-slate-500">Celebrate your consistency and strength step-by-step.</p>
        </div>
      </div>

      <div className="space-y-3.5">
        {MILESTONES.map((m) => {
          const isAchieved = streakDays >= m.target;
          return (
            <div
              key={m.target}
              className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 transition-all ${
                isAchieved
                  ? 'bg-[#F0F5F6] border-[#4F7C82]/30 text-[#2F4D51]'
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-70'
              }`}
            >
              <div className="flex items-center gap-3">
                {isAchieved ? (
                  <CheckCircle2 className="h-5 w-5 text-[#4F7C82] shrink-0" />
                ) : (
                  <Lock className="h-5 w-5 text-slate-400 shrink-0" />
                )}
                <div>
                  <div className={`text-xs font-bold ${isAchieved ? 'text-slate-900' : 'text-slate-600'}`}>
                    {m.title} ({m.target} {m.target === 1 ? 'Day' : 'Days'})
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{m.desc}</div>
                </div>
              </div>

              {isAchieved && (
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#4F7C82] bg-white px-2 py-0.5 rounded-md border border-[#4F7C82]/20 flex items-center gap-1 shadow-sm shrink-0">
                  <Sparkles className="h-3 w-3" />
                  Unlocked
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
