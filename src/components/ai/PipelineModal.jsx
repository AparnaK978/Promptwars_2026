import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Cpu, ShieldAlert, Zap, ArrowRight, CheckCircle2, Lock, Sparkles, FileCode } from 'lucide-react';

export function PipelineModal() {
  const { setActiveModal } = useApp();

  const STAGES = [
    {
      step: "1. Multi-Modal Input",
      title: "Voice / Text / Image Capture",
      desc: "Captures Web Speech API audio transcripts, user zero-typing card taps, or camera base64 image data.",
      tech: "Web Speech API & FileReader"
    },
    {
      step: "2. Context Builder",
      title: "Profile & History Assembly",
      desc: "Injects recovery role, active streak, known personal triggers, and preferred coping strategies.",
      tech: "React Context & LocalStorage"
    },
    {
      step: "3. Risk Assessment Engine",
      title: "Real-Time Score Computation",
      desc: "Calculates Recovery Score (0-100) and Relapse Risk Level (Low/Medium/High) to contextualize prompt weight.",
      tech: "Deterministic Risk Engine"
    },
    {
      step: "4. Clinical Safety Intercept",
      title: "Regex & Semantic Safety Check",
      desc: "Scans for suicidal ideation, fatal overdose flags, or self-harm keywords prior to calling LLM API.",
      tech: "Clinical Safety Middleware"
    },
    {
      step: "5. Gemini LLM Inference",
      title: "Trauma-Informed Prompt Execution",
      desc: "Dispatches payload to Gemini 1.5 Flash using persona system prompts (Recovery Companion / Caregiver De-escalator).",
      tech: "Google Gemini 1.5 Flash API"
    },
    {
      step: "6. Multi-Modal Response & TTS",
      title: "Synthesized Output & Override",
      desc: "Returns concise, actionable guidance, triggers SpeechSynthesis voice output, or displays 988 emergency override.",
      tech: "SpeechSynthesis & UI Overlay"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-2xl p-6 sm:p-8 relative border border-teal-500/30 shadow-2xl bg-slate-950 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-teal-400 mb-1">
          <Cpu className="h-5 w-5" />
          <span className="text-xs uppercase font-extrabold tracking-wider">Judge Architectural View</span>
        </div>

        <h2 className="text-2xl font-bold text-white font-display mb-2">Beacon AI Reasoning Pipeline</h2>
        <p className="text-xs text-slate-400 mb-6">End-to-end multi-modal data processing and safety validation pipeline</p>

        {/* Pipeline Steps Flow */}
        <div className="space-y-3 mb-6">
          {STAGES.map((s, idx) => (
            <div key={idx} className="glass-card p-4 rounded-xl border border-slate-800 flex items-start justify-between gap-4 hover:border-teal-500/40">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                    {s.step}
                  </span>
                  <h3 className="text-sm font-bold text-white">{s.title}</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-2">{s.desc}</p>
                <div className="text-[10px] font-mono text-slate-400">⚡ Component: {s.tech}</div>
              </div>
              <CheckCircle2 className="h-5 w-5 text-teal-400 shrink-0 mt-1" />
            </div>
          ))}
        </div>

        {/* Emergency Override Banner */}
        <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-200">
          🚨 <strong>Safety Guarantee:</strong> If Step 4 detects an acute emergency flag, the pipeline bypasses LLM generation and triggers immediate 988 Crisis Lifeline and Naloxone CPR protocols.
        </div>

      </div>
    </div>
  );
}
