import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { queryGeminiAI } from '../../services/gemini';
import { Mic, MicOff, Sparkles, Volume2, Check } from 'lucide-react';

export function VoiceJournal() {
  const { addJournal, speakText } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [aiInsight, setAiInsight] = useState(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let recognition = null;
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event) => {
        let currentText = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentText += event.results[i][0].transcript;
        }
        setTranscript(currentText);
      };

      recognition.onerror = (event) => {
        console.warn("Speech recognition error:", event.error);
        setIsListening(false);
      };
    }

    if (isListening && recognition) {
      recognition.start();
    } else if (recognition) {
      recognition.stop();
    }

    return () => {
      if (recognition) recognition.stop();
    };
  }, [isListening]);

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      alert("Speech recognition is not supported in this browser version. You can type or select pre-loaded text below.");
      return;
    }
    setIsListening(!isListening);
  };

  const handleAnalyze = async () => {
    if (!transcript.trim()) return;
    setAnalyzing(true);

    const res = await queryGeminiAI({
      role: 'individual',
      mode: 'journal',
      userInput: transcript
    });

    setAiInsight(res.text);
    setAnalyzing(false);
    speakText(res.text);

    addJournal({
      rawText: transcript,
      aiInsights: [res.text],
      sentiment: 'hopeful'
    });

    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const PRESET_CHIPS = [
    "I'm feeling intense stress from work today, but I want to stay sober.",
    "I survived a tough craving spike earlier and I feel proud.",
    "I need encouragement to get through this evening."
  ];

  return (
    <div className="healthcare-card p-6 border border-slate-100 bg-white">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 font-display">Hands-Free Voice Journal</h3>
          <p className="text-xs text-slate-500 mt-0.5">Express your feelings out loud. Your companion will respond with gentle support.</p>
        </div>
      </div>

      {/* Preset Chips */}
      <div className="mb-4">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Or tap a sample prompt to simulate voice entry:
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESET_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => setTranscript(chip)}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-teal-500/50 text-xs text-slate-700 transition-colors text-left"
            >
              💬 "{chip}"
            </button>
          ))}
        </div>
      </div>

      {/* Textarea & Mic Trigger */}
      <div className="relative mb-4">
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Tap the microphone button to start recording..."
          className="w-full h-32 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-teal-500 resize-none"
        />

        <button
          onClick={toggleListening}
          className={`absolute bottom-4 right-4 p-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all cursor-pointer ${
            isListening
              ? 'bg-rose-600 text-white animate-pulse shadow-md shadow-rose-600/40'
              : 'bg-teal-600 text-white hover:bg-teal-700 shadow-md'
          }`}
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          <span>{isListening ? 'Stop' : 'Voice Input'}</span>
        </button>
      </div>

      {/* Analysis trigger */}
      <button
        onClick={handleAnalyze}
        disabled={!transcript.trim() || analyzing}
        className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-md disabled:opacity-50 transition-all flex items-center justify-center gap-1.5"
      >
        <Sparkles className="h-4 w-4" />
        <span>{analyzing ? 'Analyzing Voice Log...' : 'Submit Log to Companion'}</span>
      </button>

      {/* AI Output */}
      {aiInsight && (
        <div className="mt-4 healthcare-card p-5 border border-teal-100 bg-teal-50/20 animate-fadeIn">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-700 flex items-center gap-1">
              <Sparkles className="h-4 w-4 text-teal-600" />
              Companion Response
            </span>
            {saved && (
              <span className="text-xs font-semibold text-teal-600 flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> Saved Locally
              </span>
            )}
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">{aiInsight}</p>
        </div>
      )}

    </div>
  );
}
