import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { queryGeminiAI } from '../../services/gemini';
import { Mic, MicOff, Sparkles, Volume2, Save, History, Check } from 'lucide-react';

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
      alert("Speech recognition is not supported in this browser version. You can type or use preset voice chips below.");
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

  // Preset zero-typing voice chips
  const PRESET_VOICE_CHIPS = [
    "I'm feeling intense stress from work today, but I want to stay sober.",
    "I survived a tough craving spike earlier and I feel proud.",
    "I need encouragement to get through this evening."
  ];

  return (
    <div className="glass-panel p-6 border border-slate-800 mb-8">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <Mic className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white font-display">Hands-Free Voice Journal</h2>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                Web Speech API
              </span>
            </div>
            <p className="text-xs text-slate-400">Speak naturally to express your feelings; Gemini will provide supportive feedback</p>
          </div>
        </div>
      </div>

      {/* Preset Zero-Typing Voice Chips */}
      <div className="mb-4">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Or tap a sample prompt to simulate voice input:
        </span>
        <div className="flex flex-wrap gap-2">
          {PRESET_VOICE_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => setTranscript(chip)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-teal-500/50 text-xs text-slate-300 transition-colors text-left"
            >
              💬 "{chip}"
            </button>
          ))}
        </div>
      </div>

      {/* Transcript Textbox */}
      <div className="relative mb-4">
        <textarea
          value={transcript}
          onChange={(e) => setTranscript(e.target.value)}
          placeholder="Tap the microphone button and start speaking, or choose a prompt above..."
          className="w-full h-32 p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-teal-400 resize-none font-sans"
        />

        <button
          onClick={toggleListening}
          className={`absolute bottom-4 right-4 p-3 rounded-xl font-bold text-xs flex items-center gap-2 transition-all ${
            isListening
              ? 'bg-rose-600 text-white animate-pulse shadow-lg shadow-rose-600/40'
              : 'bg-teal-500 text-slate-950 hover:bg-teal-400 shadow-lg shadow-teal-500/30'
          }`}
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          <span>{isListening ? 'Stop Recording' : 'Start Voice Input'}</span>
        </button>
      </div>

      {/* Action Button */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={handleAnalyze}
          disabled={!transcript.trim() || analyzing}
          className="flex-1 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-teal-500/30 hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
        >
          <Sparkles className="h-4 w-4 fill-slate-950" />
          <span>{analyzing ? 'Analyzing Voice Sentiment...' : 'Analyze Journal with Gemini AI'}</span>
        </button>
      </div>

      {/* AI Sentiment Analysis Result */}
      {aiInsight && (
        <div className="mt-4 glass-card p-5 rounded-2xl border border-teal-500/30 bg-teal-950/10 animate-fadeIn">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              Beacon AI Compassionate Insight
            </span>
            {saved && (
              <span className="text-xs font-semibold text-teal-300 flex items-center gap-1">
                <Check className="h-3.5 w-3.5" /> Saved to Local Logs
              </span>
            )}
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">{aiInsight}</p>
        </div>
      )}

    </div>
  );
}
