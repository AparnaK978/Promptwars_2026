import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mic, MicOff, Wind, Heart, PhoneCall, Sparkles, Volume2, Shield } from 'lucide-react';

export function ZeroTypingSOS({ onSelectAction }) {
  const { setActiveModal, speakText, userProfile } = useApp();
  const [isListening, setIsListening] = useState(false);

  const handleVoiceAssistant = () => {
    setIsListening(!isListening);
    if (!isListening) {
      speakText("I am listening. Speak naturally about how you are feeling.");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Calm Voice-First Primary Hero Card */}
      <div className="glass-panel p-6 sm:p-8 text-center border border-teal-500/30 bg-gradient-to-b from-slate-950 via-teal-950/20 to-slate-950 rounded-3xl relative overflow-hidden">
        
        <div className="max-w-md mx-auto">
          <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 inline-block mb-3">
            Voice-First Recovery Assistant
          </span>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-2">
            Welcome, {userProfile?.name || 'Friend'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
            Tap the button once and speak naturally. Your AI companion is standing by to listen and guide you softly.
          </p>

          {/* Large Central Voice Assistant Microphone Button */}
          <button
            onClick={handleVoiceAssistant}
            className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto flex flex-col items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-2xl ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse shadow-[0_0_50px_rgba(225,29,72,0.6)] border-4 border-rose-400'
                : 'bg-gradient-to-tr from-teal-500 to-cyan-400 text-slate-950 hover:scale-105 shadow-[0_0_40px_rgba(13,148,136,0.4)] border-4 border-teal-300'
            }`}
            aria-label="Tap once to speak with AI companion"
          >
            {isListening ? (
              <>
                <MicOff className="h-10 w-10 stroke-[2.5]" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider">Listening...</span>
              </>
            ) : (
              <>
                <Mic className="h-10 w-10 stroke-[2.5]" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider">Tap To Speak</span>
              </>
            )}
          </button>

          <p className="text-[11px] text-slate-400 mt-4 font-mono">
            {isListening ? '🎙️ Speech engine listening... Speak now.' : 'No typing required • Hands-Free Support'}
          </p>
        </div>

      </div>

      {/* Quick 1-Tap Calming Tools */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        
        <button
          onClick={() => setActiveModal('breathing')}
          className="p-4 rounded-2xl border border-cyan-500/30 bg-cyan-950/20 text-left hover:border-cyan-400 transition-all flex items-center gap-3"
        >
          <div className="p-3 rounded-xl bg-slate-900 text-cyan-400 border border-slate-800">
            <Wind className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold text-sm text-white">4-7-8 Urge Surfing</div>
            <div className="text-xs text-slate-400 mt-0.5">Visual grounding exercise</div>
          </div>
        </button>

        <button
          onClick={() => setActiveModal('craving_scale')}
          className="p-4 rounded-2xl border border-amber-500/30 bg-amber-950/20 text-left hover:border-amber-400 transition-all flex items-center gap-3"
        >
          <div className="p-3 rounded-xl bg-slate-900 text-amber-400 border border-slate-800">
            <Heart className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold text-sm text-white">Craving Check-in</div>
            <div className="text-xs text-slate-400 mt-0.5">1-10 zero-typing scale</div>
          </div>
        </button>

        <button
          onClick={() => setActiveModal('emergency_script')}
          className="p-4 rounded-2xl border border-rose-500/30 bg-rose-950/20 text-left hover:border-rose-400 transition-all flex items-center gap-3"
        >
          <div className="p-3 rounded-xl bg-slate-900 text-rose-400 border border-slate-800">
            <PhoneCall className="h-5 w-5" />
          </div>
          <div>
            <div className="font-bold text-sm text-white">Emergency 112 / 108</div>
            <div className="text-xs text-slate-400 mt-0.5">Naloxone & CPR protocol</div>
          </div>
        </button>

      </div>

    </div>
  );
}
