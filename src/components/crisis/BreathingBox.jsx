import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Play, Pause, RefreshCw, Wind } from 'lucide-react';

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

        if (phase === 'Inhale') {
          setPhase('Hold');
          speakText("Hold breath.");
          return 7;
        } else if (phase === 'Hold') {
          setPhase('Exhale');
          speakText("Exhale slowly.");
          return 8;
        } else {
          setPhase('Inhale');
          setCycleCount((c) => c + 1);
          speakText("Inhale.");
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, phase]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-100 w-full max-w-md p-6 sm:p-8 text-center relative shadow-2xl text-slate-800">
        
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-400 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center justify-center gap-1.5 mb-2 text-teal-600">
          <Wind className="h-5 w-5 animate-pulse" />
          <span className="text-xs uppercase font-extrabold tracking-wider">Grounding Support</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">4-7-8 Deep Breathing</h2>
        <p className="text-xs text-slate-500 mb-6">Slow down and regulate your breathing to ride out cravings.</p>

        {/* Breathing Circle */}
        <div className="relative my-8 flex items-center justify-center">
          <div className={`w-44 h-44 sm:w-48 sm:h-48 rounded-full flex items-center justify-center transition-all duration-1000 ${
            phase === 'Inhale' ? 'scale-105 bg-teal-50 border-4 border-teal-400 shadow-[0_0_20px_rgba(13,148,136,0.15)]' :
            phase === 'Hold' ? 'scale-105 bg-sky-50 border-4 border-sky-400 shadow-[0_0_20px_rgba(14,165,233,0.15)]' :
            'scale-95 bg-slate-50 border-4 border-slate-300'
          }`}>
            <div className="text-center">
              <span className={`text-xl sm:text-2xl font-extrabold block ${
                phase === 'Inhale' ? 'text-teal-600' : phase === 'Hold' ? 'text-sky-600' : 'text-slate-600'
              }`}>
                {phase}
              </span>
              <span className="text-4xl font-extrabold text-slate-900 block mt-1 font-mono">{timer}s</span>
            </div>
          </div>
        </div>

        <div className="text-xs text-slate-500 mb-6 font-medium">
          Cycle <span className="text-teal-600 font-bold">{cycleCount}</span> completed • Urge peaks usually subside within 3-5 cycles
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => setIsActive(!isActive)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 text-white font-bold text-sm shadow-md hover:bg-teal-700"
          >
            {isActive ? <Pause className="h-4 w-4 fill-white" /> : <Play className="h-4 w-4 fill-white" />}
            <span>{isActive ? 'Pause' : 'Resume'}</span>
          </button>

          <button
            onClick={() => {
              setPhase('Inhale');
              setTimer(4);
              setCycleCount(1);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 text-sm font-semibold hover:bg-slate-200"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Reset</span>
          </button>
        </div>

      </div>
    </div>
  );
}
