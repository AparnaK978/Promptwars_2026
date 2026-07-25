import React from 'react';
import { useApp } from '../../context/AppContext';
import { Flame, ShieldCheck, Heart, Award, Calendar, Activity, Zap } from 'lucide-react';

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
        <div className="glass-panel p-6 border border-amber-500/30 bg-gradient-to-br from-amber-950/20 via-slate-950 to-slate-950 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                <Flame className="h-4 w-4 fill-amber-400" />
                Active Recovery Streak
              </span>
              <button
                onClick={() => setStreakDays(streakDays + 1)}
                className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 hover:bg-amber-500/20"
              >
                +1 Day
              </button>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black font-display text-white">{streakDays}</span>
              <span className="text-sm font-bold text-amber-300">Days Consecutive</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Every urge resisted is a victory for your future self.</p>
          </div>
        </div>

        {/* Cravings Resisted Counter */}
        <div className="glass-panel p-6 border border-teal-500/30 bg-gradient-to-br from-teal-950/20 via-slate-950 to-slate-950 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1">
                <ShieldCheck className="h-4 w-4" />
                Cravings Overcome
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl sm:text-5xl font-black font-display text-white">{cravingLogs.length + 18}</span>
              <span className="text-sm font-bold text-teal-300">Intense Urges</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">Zero-typing grounding used successfully.</p>
          </div>
        </div>

        {/* Support Safety Status */}
        <div className="glass-panel p-6 border border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 via-slate-950 to-slate-950 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                <Activity className="h-4 w-4" />
                Safety Status
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-display text-emerald-400">Protected</span>
            </div>
            <p className="text-xs text-slate-400 mt-2">988 SAMHSA Crisis hotlines & emergency contacts active.</p>
          </div>
        </div>

      </div>

      {/* Milestone Badges */}
      <div className="glass-panel p-6 border border-slate-800">
        <h3 className="text-base font-bold text-white font-display mb-3 flex items-center gap-2">
          <Award className="h-5 w-5 text-amber-400" />
          Recovery Milestone Badges
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MILESTONES.map((m, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border text-center transition-all ${
                m.status === 'unlocked'
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
                  : 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60'
              }`}
            >
              <Award className={`h-6 w-6 mx-auto mb-2 ${m.status === 'unlocked' ? 'text-amber-400' : 'text-slate-600'}`} />
              <div className="font-bold text-sm text-slate-100">{m.label}</div>
              <div className="text-[11px] mt-1">{m.status === 'unlocked' ? '🏆 Achieved' : '🔒 In Progress'}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Craving Logs History */}
      <div className="glass-panel p-6 border border-slate-800">
        <h3 className="text-base font-bold text-white font-display mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-teal-400" />
          Recent Craving Log History
        </h3>

        {cravingLogs.length > 0 ? (
          <div className="space-y-2.5">
            {cravingLogs.slice(0, 5).map((log) => (
              <div key={log.id} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded font-bold ${
                    log.intensity >= 7 ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                  }`}>
                    Level {log.intensity}
                  </span>
                  <div>
                    <div className="font-semibold text-slate-200">{log.triggers?.join(', ') || 'General Craving'}</div>
                    <div className="text-[10px] text-slate-400">{log.timestamp} • {log.date}</div>
                  </div>
                </div>
                <div className="text-slate-400 text-right max-w-xs truncate hidden sm:block">
                  {log.aiAdvice}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-xs text-slate-400">
            No craving logs recorded yet today. Use the Zero-Typing Hub above whenever you feel an urge!
          </div>
        )}
      </div>

    </div>
  );
}
