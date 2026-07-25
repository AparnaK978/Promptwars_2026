import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { queryGeminiAI } from '../../services/gemini';
import { Sparkles, MessageSquare, Volume2, ShieldCheck, Copy, Check, Users } from 'lucide-react';

export function DeescalationScriptGen() {
  const { speakText } = useApp();
  const [scenario, setScenario] = useState('acute_argument');
  const [tone, setTone] = useState('calm');
  const [loading, setLoading] = useState(false);
  const [generatedScript, setGeneratedScript] = useState(null);
  const [copied, setCopied] = useState(false);

  const SCENARIOS = [
    { id: 'acute_argument', label: 'Tense Argument / Anger' },
    { id: 'suspected_relapse', label: 'Suspected Relapse Discussion' },
    { id: 'refusing_treatment', label: 'Refusing Help or Treatment' },
    { id: 'setting_boundaries', label: 'Setting Financial/Living Boundaries' }
  ];

  const TONES = [
    { id: 'calm', label: 'Calm & Loving' },
    { id: 'firm', label: 'Firm & Clear Boundaries' },
    { id: 'neutral', label: 'Low-Stimulation Neutral' }
  ];

  const handleGenerate = async () => {
    setLoading(true);
    setCopied(false);

    const scenarioText = SCENARIOS.find(s => s.id === scenario)?.label;
    const toneText = TONES.find(t => t.id === tone)?.label;

    const res = await queryGeminiAI({
      role: 'caregiver',
      mode: 'deescalate',
      userInput: `Generate a de-escalation script for scenario: "${scenarioText}" using tone: "${toneText}". Give 3 exact lines I should say, 1 thing to avoid saying, and 1 safety tip.`
    });

    setGeneratedScript(res.text);
    setLoading(false);
    speakText("De-escalation script generated for caregiver guidance.");
  };

  const handleCopy = () => {
    if (!generatedScript) return;
    navigator.clipboard.writeText(generatedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel p-6 border border-purple-500/20 mb-8 bg-slate-950/70">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
          <Users className="h-6 w-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white font-display">Caregiver AI De-escalation Script Builder</h2>
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
              GenAI Engine
            </span>
          </div>
          <p className="text-xs text-slate-400">Generate context-aware, non-confrontational scripts during intense family tension</p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        
        {/* Scenario Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Current High-Stress Scenario
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SCENARIOS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setScenario(item.id)}
                className={`p-3 rounded-xl text-xs font-semibold border text-left transition-all ${
                  scenario === item.id
                    ? 'bg-purple-600/20 border-purple-400 text-purple-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tone Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Desired Emotional Tone
          </label>
          <div className="flex flex-col gap-2">
            {TONES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTone(t.id)}
                className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all ${
                  tone === t.id
                    ? 'bg-purple-600/20 border-purple-400 text-purple-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Action Button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-sm shadow-lg shadow-purple-600/30 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2 mb-6"
      >
        <Sparkles className="h-4 w-4" />
        <span>{loading ? 'Generating AI De-escalation Script...' : 'Generate Context-Aware Script'}</span>
      </button>

      {/* Generated Output */}
      {generatedScript && (
        <div className="glass-card p-5 rounded-2xl border border-purple-500/30 bg-purple-950/10 animate-fadeIn">
          <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-800">
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-300 flex items-center gap-1.5">
              <MessageSquare className="h-4 w-4 text-purple-400" />
              Recommended Words To Use Right Now
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => speakText(generatedScript)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                title="Listen to script"
              >
                <Volume2 className="h-4 w-4" />
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-teal-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="text-sm text-slate-200 whitespace-pre-line leading-relaxed font-sans">
            {generatedScript}
          </div>
        </div>
      )}

    </div>
  );
}
