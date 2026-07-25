import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, TrendingUp, Sparkles, Award } from 'lucide-react';

export function RecoveryTimeline() {
  const { streakDays, cravingLogs } = useApp();
  const [timeframe, setTimeframe] = useState(7);

  const MOCK_TIMELINE = [
    { day: 'Mon', mood: 'Hopeful', craving: 2, streak: streakDays - 6, insight: 'Stable morning breathing routine' },
    { day: 'Tue', mood: 'Stressed', craving: 5, streak: streakDays - 5, insight: 'Mitigated craving with voice companion' },
    { day: 'Wed', mood: 'Determined', craving: 3, streak: streakDays - 4, insight: 'Journaled emotional fatigue' },
    { day: 'Thu', mood: 'Anxious', craving: 7, streak: streakDays - 3, insight: 'Urge surfing used for intense craving' },
    { day: 'Fri', mood: 'Calm', craving: 2, streak: streakDays - 2, insight: 'Caregiver de-escalation check-in' },
    { day: 'Sat', mood: 'Empowered', craving: 1, streak: streakDays - 1, insight: 'Zero urges experienced' },
    { day: 'Today', mood: 'Resilient', craving: cravingLogs[0]?.intensity || 3, streak: streakDays, insight: 'Check-in completed cleanly' }
  ];

  return (
    <div className="healthcare-card p-6 bg-white border border-slate-100 mb-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-teal-600 mb-1">
            <Calendar className="h-5 w-5" />
            <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500">Timeline Logs</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Daily Recovery Journey</h2>
        </div>

        {/* Timeframe Filter */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
          {[7, 14, 30].map((days) => (
            <button
              key={days}
              onClick={() => setTimeframe(days)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                timeframe === days ? 'bg-teal-600 text-white font-bold' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {days} Days
            </button>
          ))}
        </div>
      </div>

      {/* Visual Timeline Chart */}
      <div className="healthcare-card p-5 border border-slate-100 mb-6">
        <div className="flex items-center justify-between gap-2 mb-4">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
            <TrendingUp className="h-4 w-4 text-teal-600" />
            Daily Craving Intensity Trends
          </span>
          <span className="text-xs text-slate-400 font-mono">1 = Mild • 10 = Severe Spike</span>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-40 pt-4 pb-2 border-b border-slate-100">
          {MOCK_TIMELINE.map((item, idx) => {
            const heightPercent = (item.craving / 10) * 100;
            return (
              <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                <div className="opacity-0 group-hover:opacity-100 text-[10px] font-bold font-mono text-teal-600 transition-opacity bg-slate-50 px-1.5 py-0.5 rounded border border-slate-100">
                  Lvl {item.craving}
                </div>
                <div
                  style={{ height: `${Math.max(15, heightPercent)}%` }}
                  className={`w-full max-w-[36px] rounded-t-xl transition-all duration-500 ${
                    item.craving >= 6 ? 'bg-gradient-to-t from-rose-600 to-rose-400' : 'bg-gradient-to-t from-teal-600 to-cyan-500'
                  }`}
                />
                <span className="text-xs font-bold text-slate-500">{item.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Daily Timeline Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Daily Timeline Insights</h3>
        {MOCK_TIMELINE.slice(-4).reverse().map((entry, idx) => (
          <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center font-bold text-teal-600 shrink-0">
                {entry.day}
              </div>
              <div>
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span>Mood: {entry.mood}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-200 text-slate-600 font-mono">Day {entry.streak}</span>
                </div>
                <div className="text-slate-500 mt-0.5 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-teal-600" />
                  <span>{entry.insight}</span>
                </div>
              </div>
            </div>

            <span className={`px-2.5 py-1 rounded-full font-extrabold ${
              entry.craving >= 6 ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-teal-50 text-teal-600 border border-teal-100'
            }`}>
              Urge: {entry.craving}/10
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}
