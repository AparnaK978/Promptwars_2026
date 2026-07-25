import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Cpu, CheckCircle2 } from 'lucide-react';

export function PipelineModal() {
  const { setActiveModal } = useApp();

  const STAGES = [
    {
      step: "1. Capture Input",
      title: "Voice / Text / Vision Image",
      desc: "Converts audio recordings to text transcriptions, captures vision uploads, or logs visual checks."
    },
    {
      step: "2. Build Context",
      title: "Profile & History Assembly",
      desc: "Gathers active user goals, current role, streak count, and known active triggers."
    },
    {
      step: "3. Evaluate Score",
      title: "Personalized Wellness Score",
      desc: "Calculates Recovery Score (0-100) and risk level factors to build context prompts."
    },
    {
      step: "4. Safety Verification",
      title: "Safety Filter Intercept",
      desc: "Performs strict safety checks for active distress or self-harm before processing."
    },
    {
      step: "5. Process Companion Response",
      title: "Empathetic Advice Formulation",
      desc: "Generates supportive responses tailored for early recovery and boundary management."
    },
    {
      step: "6. Synthesized Output",
      title: "Voice Response & Crisis Override",
      desc: "Delivers spoken response audio or triggers 112 / 108 helpline overlays."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-100 w-full max-w-lg p-6 sm:p-8 relative shadow-2xl text-slate-800 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-teal-600 mb-1">
          <Cpu className="h-5 w-5" />
          <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500">Architecture Overview</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mb-2">Beacon AI Reasoning Pipeline</h2>
        <p className="text-xs text-slate-500 mb-6">Overview of our step-by-step safety verification and response processing pipeline.</p>

        {/* Pipeline Steps Flow */}
        <div className="space-y-3.5 mb-6">
          {STAGES.map((s, idx) => (
            <div key={idx} className="healthcare-card p-4 bg-slate-50/50 border border-slate-200/60 flex items-start justify-between gap-4 hover:border-teal-400">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-teal-50 text-teal-700 border border-teal-100">
                    {s.step}
                  </span>
                  <h3 className="text-xs font-bold text-slate-900">{s.title}</h3>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
              <CheckCircle2 className="h-4 w-4 text-teal-600 shrink-0 mt-0.5" />
            </div>
          ))}
        </div>

        {/* Emergency Override Banner */}
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 text-xs text-rose-800 leading-relaxed font-medium">
          🚨 **Safety Priority**: If Step 4 intercepts a crisis trigger, the pipeline halts normal processes and displays emergency contact overlays for 112 / 108.
        </div>

      </div>
    </div>
  );
}
