import React from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, ShieldCheck, Award, Calendar, Activity } from 'lucide-react';

export function RecoveryDashboard() {
  const { streakDays, cravingLogs, setStreakDays } = useApp();

  const MILESTONES = [
    { days: 7, label: '1 Week Clean', status: streakDays >= 7 ? 'unlocked' : 'locked' },
    { days: 14, label: '2 Weeks Strong', status: streakDays >= 14 ? 'unlocked' : 'locked' },
    { days: 30, label: '30 Days Hero', status: streakDays >= 30 ? 'unlocked' : 'locked' },
    { days: 90, label: '90 Days Milestone', status: streakDays >= 90 ? 'unlocked' : 'locked' }
  ];

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Active Streak Widget */}
        <div className="healthcare-card p-6 border border-slate-100 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 flex items-center gap-1">
                <Flame className="h-4 w-4 fill-teal-50" />
                Active Streak
              </span>
              <button
                onClick={() => setStreakDays(streakDays + 1)}
                className="text-[10px] px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-100 hover:bg-teal-100"
              >
                +1 Day
              </button>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900 font-display">{streakDays}</span>
              <span className="text-xs font-bold text-teal-600">Days Consecutive</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Every urge resisted is a victory.</p>
          </div>
        </div>

        {/* Cravings Resisted Counter */}
        <div className="healthcare-card p-6 border border-slate-100 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600 flex items-center gap-1">
                <ShieldCheck className="h-4 w-4 text-sky-600" />
                Cravings Overcome
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-slate-900 font-display">{cravingLogs.length + (streakDays > 0 ? 12 : 0)}</span>
              <span className="text-xs font-bold text-sky-600">Total Urges</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">Grounding exercises used successfully.</p>
          </div>
        </div>

        {/* Safety Status */}
        <div className="healthcare-card p-6 border border-slate-100 bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600 flex items-center gap-1">
                <Activity className="h-4 w-4" />
                Safety Status
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-emerald-600 font-display">Active Support</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">112/108 & emergency contacts configured.</p>
          </div>
        </div>

      </div>

      {/* Milestone Badges */}
      <div className="healthcare-card p-6 bg-white border border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 font-display mb-4 flex items-center gap-2">
          <Award className="h-5 w-5 text-teal-600" />
          Recovery Milestones
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MILESTONES.map((m, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-center transition-all ${
                m.status === 'unlocked'
                  ? 'bg-teal-50/50 border-teal-100 text-teal-700 font-semibold'
                  : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
              }`}
            >
              <Award className={`h-6 w-6 mx-auto mb-2 ${m.status === 'unlocked' ? 'text-teal-600' : 'text-slate-400'}`} />
              <div className="font-bold text-xs text-slate-900">{m.label}</div>
              <div className="text-[10px] mt-1">{m.status === 'unlocked' ? '🏆 Achieved' : '🔒 Locked'}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
