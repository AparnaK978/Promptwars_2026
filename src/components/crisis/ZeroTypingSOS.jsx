import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Wind, Mic, Heart, Shield, Radio, ArrowRight } from 'lucide-react';

export function ZeroTypingSOS({ onSelectAction }) {
  const { setActiveModal, speakText } = useApp();

  const QUICK_INTERVENTIONS = [
    {
      id: 'craving_relief',
      title: 'Craving Relief SOS',
      subtitle: '1-Tap grounding & calm voice',
      icon: Sparkles,
      color: 'from-teal-500/20 to-cyan-500/20 border-teal-500/30 text-teal-400 hover:border-teal-400',
      badge: 'Immediate',
      action: () => {
        speakText("Breathe with me now. Inhale deeply through your nose, hold for four seconds, and release slowly. You are in control of this moment.");
        if (onSelectAction) onSelectAction('craving_sos');
      }
    },
    {
      id: 'breathing_timer',
      title: '4-7-8 Urge Surfing',
      subtitle: 'Visual breathing exercise',
      icon: Wind,
      color: 'from-cyan-500/20 to-blue-500/20 border-cyan-500/30 text-cyan-400 hover:border-cyan-400',
      badge: 'Visual & Audio',
      action: () => {
        setActiveModal('breathing');
      }
    },
    {
      id: 'voice_journal',
      title: 'Voice Venting',
      subtitle: 'Speak aloud without typing',
      icon: Mic,
      color: 'from-purple-500/20 to-indigo-500/20 border-purple-500/30 text-purple-400 hover:border-purple-400',
      badge: 'Hands-Free',
      action: () => {
        if (onSelectAction) onSelectAction('voice_journal');
      }
    },
    {
      id: 'log_craving',
      title: 'Log Craving Scale',
      subtitle: '1-10 visual tag selector',
      icon: Heart,
      color: 'from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-400 hover:border-amber-400',
      badge: 'Zero Typing',
      action: () => {
        setActiveModal('craving_scale');
      }
    }
  ];

  return (
    <div className="glass-panel p-5 sm:p-6 mb-6 border border-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <Radio className="h-5 w-5 text-teal-400 animate-pulse" />
            <h2 className="text-lg sm:text-xl font-bold text-white font-display">Zero-Typing Intervention Hub</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">One-tap tools designed for acute stress & craving spikes</p>
        </div>
        <span className="self-start sm:self-auto text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-800 text-teal-300 border border-slate-700">
          ⚡ Instant Response
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {QUICK_INTERVENTIONS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className={`p-4 rounded-xl border bg-gradient-to-br transition-all duration-200 text-left flex flex-col justify-between group cursor-pointer ${item.color}`}
              aria-label={item.title}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-700/50 group-hover:scale-110 transition-transform">
                  <Icon className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900/90 text-slate-300">
                  {item.badge}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-sm group-hover:text-white flex items-center justify-between">
                  <span>{item.title}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-slate-400 mt-1">{item.subtitle}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
