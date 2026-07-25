import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { queryGeminiAI } from '../../services/gemini';
import { Sparkles, MessageSquare, Volume2, Copy, Check, Users } from 'lucide-react';

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
      userInput: `Generate de-escalation statements for: "${scenarioText}" using tone: "${toneText}". Output 3 simple statements, 1 phrase to avoid, and 1 safety tip.`
    });

    setGeneratedScript(res.text);
    setLoading(false);
    speakText("Verbal statements generated for caregiver support.");
  };

  const handleCopy = () => {
    if (!generatedScript) return;
    navigator.clipboard.writeText(generatedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="healthcare-card p-6 bg-white border border-slate-100 mb-8">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
          <Users className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-900 font-display">Caregiver Communication Guide</h2>
          <p className="text-xs text-slate-500 mt-0.5">Generate verbal guidelines to help navigate difficult family conversations calmly.</p>
        </div>
      </div>

      {/* Scenario Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            What is the current situation?
          </label>
          <div className="grid grid-cols-1 gap-2">
            {SCENARIOS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setScenario(item.id)}
                className={`p-3 rounded-xl text-xs font-semibold border text-left transition-all ${
                  scenario === item.id
                    ? 'bg-purple-50 border-purple-200 text-purple-700 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tone Selection */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Select Preferred Tone
          </label>
          <div className="grid grid-cols-1 gap-2">
            {TONES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTone(t.id)}
                className={`p-3 rounded-xl text-xs font-semibold border text-left transition-all ${
                  tone === t.id
                    ? 'bg-purple-50 border-purple-200 text-purple-700 font-bold'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Trigger */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 mb-6"
      >
        <Sparkles className="h-4 w-4" />
        <span>{loading ? 'Structuring Statements...' : 'Generate Verbal Guide'}</span>
      </button>

      {/* Output */}
      {generatedScript && (
        <div className="healthcare-card p-5 border border-purple-100 bg-purple-50/10 animate-fadeIn">
          <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700 flex items-center gap-1">
              <MessageSquare className="h-4 w-4 text-purple-500" />
              Suggested Verbal Response
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => speakText(generatedScript)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800"
              >
                <Volume2 className="h-4 w-4" />
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-800 text-xs font-semibold"
              >
                {copied ? <Check className="h-3.5 w-3.5 text-teal-600" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          <div className="text-xs sm:text-sm text-slate-700 whitespace-pre-line leading-relaxed font-sans">
            {generatedScript}
          </div>
        </div>
      )}

    </div>
  );
}
