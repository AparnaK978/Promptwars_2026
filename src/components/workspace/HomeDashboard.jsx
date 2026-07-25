import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { queryGeminiAI } from '../../services/gemini';
import { Mic, MicOff, AlertCircle, Heart, PhoneCall, Sparkles } from 'lucide-react';
import { VoiceJournal } from '../recovery/VoiceJournal';

export function HomeDashboard() {
  const { userProfile, speakText, cravingLogs, streakDays, setActiveModal, voiceAssistantState, setVoiceAssistantState, t } = useApp();
  const [speechSupported, setSpeechSupported] = useState(true);
  const [speechError, setSpeechError] = useState('');
  const [recognition, setRecognition] = useState(null);

  // Initialize Speech Recognition cleanly with error bounds and timeouts
  useEffect(() => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      setSpeechSupported(false);
      return;
    }

    const SpeechRecObj = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recInstance = new SpeechRecObj();
    recInstance.continuous = false;
    recInstance.interimResults = false;

    recInstance.onstart = () => {
      setVoiceAssistantState('listening');
      setSpeechError('');
    };

    recInstance.onresult = async (event) => {
      setVoiceAssistantState('processing');
      const transcript = event.results[0][0].transcript;
      
      // Request Gemini / Local Fallback response
      const res = await queryGeminiAI({
        role: userProfile.role || 'individual',
        mode: 'sos',
        userInput: transcript
      });

      speakText(res.text);
    };

    recInstance.onerror = (e) => {
      console.warn("Speech recognition error status:", e.error);
      setVoiceAssistantState('idle');
      if (e.error === 'not-allowed') {
        setSpeechError("Microphone permission denied. Please allow microphone access.");
      } else if (e.error === 'no-speech') {
        setSpeechError("No speech detected. Try speaking again.");
      } else {
        setSpeechError("Speech service interrupted. Fallback to text box.");
      }
    };

    recInstance.onend = () => {
      // Return state to idle unless speaking is active
      setVoiceAssistantState((prev) => prev === 'listening' ? 'idle' : prev);
    };

    setRecognition(recInstance);
  }, []);

  const handleVoiceAssistantToggle = () => {
    if (!speechSupported) {
      alert("Browser speech recognition is not supported in this version. Please use the text check-in logs.");
      return;
    }
    if (!recognition) return;

    if (voiceAssistantState === 'listening') {
      recognition.stop();
    } else {
      try {
        recognition.start();
      } catch (e) {
        console.warn("Speech recognition restart failed:", e);
      }
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Dynamic Voice Companion Card */}
      <div className="healthcare-card p-6 sm:p-8 text-center bg-white border border-slate-100 rounded-3xl relative">
        <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-100 inline-block mb-3">
          {t('voiceCompanion')}
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display">
          {t('welcome')}, {userProfile?.name || 'Friend'}
        </h2>
        
        <p className="text-xs sm:text-sm text-slate-500 mt-2 max-w-sm mx-auto leading-relaxed">
          {t('idle')}
        </p>

        {speechError && (
          <div className="mt-3 text-xs text-rose-600 font-semibold p-2 bg-rose-50 border border-rose-100 rounded-xl max-w-xs mx-auto">
            {speechError}
          </div>
        )}

        {/* Large Central Voice Assistant Microphone Button */}
        <div className="my-8">
          <button
            onClick={handleVoiceAssistantToggle}
            className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full mx-auto flex flex-col items-center justify-center gap-2 transition-all duration-300 shadow-lg cursor-pointer ${
              voiceAssistantState === 'listening'
                ? 'bg-rose-600 text-white animate-pulse border-4 border-rose-200 shadow-[0_0_30px_rgba(225,29,72,0.4)]'
                : voiceAssistantState === 'processing'
                ? 'bg-amber-500 text-white border-4 border-amber-200'
                : voiceAssistantState === 'speaking'
                ? 'bg-sky-500 text-white border-4 border-sky-200'
                : 'bg-teal-600 text-white hover:scale-105 border-4 border-teal-200 animate-voice-pulse'
            }`}
            aria-label="Toggle voice companion assistant"
          >
            {voiceAssistantState === 'listening' ? (
              <>
                <MicOff className="h-9 w-9 stroke-[2.5]" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider">{t('listening')}</span>
              </>
            ) : voiceAssistantState === 'processing' ? (
              <>
                <Sparkles className="h-9 w-9 text-white animate-spin" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Processing...</span>
              </>
            ) : voiceAssistantState === 'speaking' ? (
              <>
                <Sparkles className="h-9 w-9 text-white animate-bounce" />
                <span className="text-[9px] font-bold uppercase tracking-wider">Speaking...</span>
              </>
            ) : (
              <>
                <Mic className="h-9 w-9 stroke-[2.5]" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider">{t('tapToSpeak')}</span>
              </>
            )}
          </button>
        </div>

        <div className="text-[10px] font-bold text-slate-400 font-mono tracking-wider">
          Status: <span className="uppercase text-teal-600">{voiceAssistantState}</span>
        </div>
      </div>

      {/* Daily Check-in Alert */}
      <div className="healthcare-card p-5 border border-slate-100 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-teal-50 text-teal-600 border border-teal-100">
            <Heart className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 font-display">{t('dailyCheckin')}</h3>
            <p className="text-xs text-slate-500">
              {cravingLogs.length > 0
                ? `${t('activeStreak')}: ${streakDays} ${t('daysConsecutive')}.`
                : t('idle')}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveModal('craving_scale')}
          className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shrink-0 transition-colors shadow-sm"
        >
          {t('checkInNow')}
        </button>
      </div>

      <VoiceJournal />

      {/* Crisis Warning Section */}
      <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-rose-800 font-medium">
          <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
          <span>{t('crisisHelp')}</span>
        </div>
        <button
          onClick={() => setActiveModal('emergency_script')}
          className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm"
        >
          {t('getHelp')}
        </button>
      </div>

    </div>
  );
}
