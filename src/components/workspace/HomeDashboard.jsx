import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Mic, MicOff, AlertCircle, Heart, PhoneCall, Sparkles } from 'lucide-react';
import { VoiceJournal } from '../recovery/VoiceJournal';

export function HomeDashboard() {
  const { userProfile, speakText, cravingLogs, streakDays, setActiveModal } = useApp();
  const [isListening, setIsListening] = useState(false);

  const toggleVoiceCompanion = () => {
    setIsListening(!isListening);
    if (!isListening) {
      speakText("Hello, I am listening. Take your time, speak naturally.");
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Calm Warm Greeting & Voice Assistant Card */}
      <div className="healthcare-card p-6 sm:p-8 text-center bg-white border border-slate-100 rounded-3xl relative">
        <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-100 inline-block mb-3">
          Voice Companion Active
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
          Namaste, {userProfile?.name || 'Friend'}
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
          Tap the companion button below once and speak naturally. Your companion is listening to help support you.
        </p>

        {/* Large Central Voice Assistant Microphone Button */}
        <div className="my-8">
          <button
            onClick={toggleVoiceCompanion}
            className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto flex flex-col items-center justify-center gap-2 transition-all duration-300 shadow-lg cursor-pointer ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse border-4 border-rose-200'
                : 'bg-teal-600 text-white hover:scale-105 border-4 border-teal-200 animate-voice-pulse'
            }`}
            aria-label="Tap to activate voice companion"
          >
            {isListening ? (
              <>
                <MicOff className="h-9 w-9 stroke-[2.5]" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider">Listening...</span>
              </>
            ) : (
              <>
                <Mic className="h-9 w-9 stroke-[2.5]" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider">Tap to Speak</span>
              </>
            )}
          </button>
        </div>

        <p className="text-[11px] text-slate-400 font-mono">
          {isListening ? '🎙️ Companion speech recognition active...' : 'No typing required • Hands-Free Assistance'}
        </p>
      </div>

      {/* Daily Check-in Alert */}
      <div className="healthcare-card p-5 border border-slate-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-teal-50 text-teal-600 border border-teal-100">
            <Heart className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">Daily Wellness Check-in</h3>
            <p className="text-xs text-slate-500">
              {cravingLogs.length > 0
                ? `Last logged. Active streak: ${streakDays} days.`
                : "Let's update your companion. Complete your brief 1-tap check-in."}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveModal('craving_scale')}
          className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shrink-0 transition-colors shadow-sm"
        >
          Check In
        </button>
      </div>

      {/* Voice Journaling Input Box */}
      <VoiceJournal />

      {/* Floating emergency trigger indicator */}
      <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-rose-800 font-medium">
          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
          <span>Need crisis assistance? Contact de-addiction response team:</span>
        </div>
        <button
          onClick={() => setActiveModal('emergency_script')}
          className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm"
        >
          Get Help
        </button>
      </div>

    </div>
  );
}
