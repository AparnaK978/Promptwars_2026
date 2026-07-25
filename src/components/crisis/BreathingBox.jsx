import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Play, Pause, RefreshCw, Volume2, Wind } from 'lucide-react';

export function BreathingBox() {
  const { setActiveModal, speakText } = useApp();
  const [isActive, setIsActive] = useState(true);
  const [phase, setPhase] = useState('Inhale'); // 'Inhale' | 'Hold' | 'Exhale'
  const [timer, setTimer] = useState(4);
  const [cycleCount, setCycleCount] = useState(1);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev > 1) return prev - 1;

        // Transition phases
        if (phase === 'Inhale') {
          setPhase('Hold');
          speakText("Hold your breath smoothly.");
          return 7;
        } else if (phase === 'Hold') {
          setPhase('Exhale');
          speakText("Exhale slowly through your mouth.");
          return 8;
        } else {
          setPhase('Inhale');
          setCycleCount((c) => c + 1);
          speakText("Inhale peace and stability.");
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, phase]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg animate-fadeIn">
      <div className="glass-panel w-full max-w-lg p-6 sm:p-8 text-center relative border border-slate-700 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          aria-label="Close breathing modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center justify-center gap-2 mb-2 text-teal-400">
          <Wind className="h-5 w-5 animate-pulse" />
          <span className="text-xs uppercase font-extrabold tracking-wider">Urge Surfing Protocol</span>
        </div>

        <h2 className="text-2xl font-bold text-white font-display mb-1">4-7-8 Grounding Breathing</h2>
        <p className="text-xs text-slate-400 mb-6">Regulate your nervous system and reduce craving intensity</p>

        {/* Dynamic Breathing Visual Circle */}
        <div className="relative my-8 flex items-center justify-center">
          <div className={`w-48 h-48 sm:w-56 sm:h-56 rounded-full flex items-center justify-center transition-all duration-1000 ${
            phase === 'Inhale' ? 'scale-110 bg-teal-500/20 border-4 border-teal-400 shadow-[0_0_50px_rgba(45,212,191,0.5)]' :
            phase === 'Hold' ? 'scale-110 bg-cyan-500/20 border-4 border-cyan-400 shadow-[0_0_50px_rgba(56,189,248,0.5)]' :
            'scale-90 bg-indigo-500/20 border-4 border-indigo-400 shadow-[0_0_20px_rgba(129,140,248,0.3)]'
          }`}>
            <div className="text-center">
              <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400 block mb-1">Phase</span>
              <span className={`text-2xl sm:text-3xl font-black ${
                phase === 'Inhale' ? 'gradient-text-teal' : phase === 'Hold' ? 'gradient-text-amber' : 'gradient-text-purple'
              }`}>
                {phase}
              </span>
              <span className="text-4xl font-extrabold text-white block mt-1 font-mono">{timer}s</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-400 mb-6 font-medium">
          Cycle <span className="text-teal-300 font-bold">{cycleCount}</span> completed • Urge peaks usually subside within 3-5 cycles
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsActive(!isActive)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/30 hover:bg-teal-400 transition-colors"
          >
            {isActive ? <Pause className="h-4 w-4 fill-slate-950" /> : <Play className="h-4 w-4 fill-slate-950" />}
            <span>{isActive ? 'Pause' : 'Resume'}</span>
          </button>

          <button
            onClick={() => {
              setPhase('Inhale');
              setTimer(4);
              setCycleCount(1);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-sm font-semibold transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reset</span>
          </button>
        </div>

      </div>
    </div>
  );
}
