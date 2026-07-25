import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, PhoneCall, AlertTriangle, ShieldCheck, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

export function EmergencyScriptModal() {
  const { setActiveModal, speakText } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  const STEPS = [
    {
      title: "Step 1: Assess for Opioid Overdose",
      instruction: "Check for unresponsiveness, slow or stopped breathing, pale/blue lips/fingertips, or pinpoint pupils. Shake shoulders and call their name loudly.",
      warning: "Call 911 IMMEDIATELY if the person does not respond.",
      badge: "Identify"
    },
    {
      title: "Step 2: Administer Naloxone (Narcan)",
      instruction: "Peel back the package. Insert the nozzle tip into one nostril until your fingers touch their nose. Press the plunger firmly to release the dose.",
      warning: "Do not test or prime the spray before inserting.",
      badge: "Naloxone Dose 1"
    },
    {
      title: "Step 3: Call 911 & Perform Rescue Breathing",
      instruction: "Tell the emergency dispatcher someone is unresponsive and not breathing. Place them on their back, tilt chin up, and give 1 rescue breath every 5 seconds.",
      warning: "Stay on the line with the 911 operator.",
      badge: "Emergency Services"
    },
    {
      title: "Step 4: Second Dose & Recovery Position",
      instruction: "If no response after 2-3 minutes, administer a 2nd dose in the OTHER nostril. Turn the person onto their side (Recovery Position) to prevent choking.",
      warning: "Stay with the person until medical personnel arrive.",
      badge: "Recovery Position"
    }
  ];

  const handleNextStep = () => {
    if (currentStep < STEPS.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      speakText(`${STEPS[nextStep].title}. ${STEPS[nextStep].instruction}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-xl p-6 sm:p-8 relative border-2 border-rose-600/50 shadow-2xl bg-slate-950">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-rose-600/20 text-rose-500 border border-rose-500/30">
              <AlertTriangle className="h-6 w-6 animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-400">Emergency Response Protocol</span>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-display">Naloxone (Narcan) & CPR Guide</h2>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Call 911 Banner */}
        <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-rose-600/20 border border-rose-500/40 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-200">
            <PhoneCall className="h-4 w-4 text-rose-400 shrink-0" />
            <span>If unresponsive, call 911 right now. Good Samaritan laws protect callers.</span>
          </div>
          <a
            href="tel:911"
            className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-black text-xs shrink-0 shadow-md shadow-rose-600/40"
          >
            DIAL 911
          </a>
        </div>

        {/* Step Progression Bar */}
        <div className="flex items-center gap-1.5 mb-6">
          {STEPS.map((s, idx) => (
            <div
              key={idx}
              className={`h-2 flex-1 rounded-full transition-colors ${
                idx <= currentStep ? 'bg-rose-500' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Current Step Card */}
        <div className="glass-card p-5 rounded-2xl border border-slate-700 mb-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">{STEPS[currentStep].badge}</span>
            <span className="text-xs text-slate-400 font-mono">Step {currentStep + 1} of {STEPS.length}</span>
          </div>

          <h3 className="text-lg font-bold text-white mb-2">{STEPS[currentStep].title}</h3>
          <p className="text-sm text-slate-200 leading-relaxed mb-4">{STEPS[currentStep].instruction}</p>
          
          <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-900/50 text-xs text-rose-300 font-medium">
            🚨 <strong>Important:</strong> {STEPS[currentStep].warning}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 disabled:opacity-50 text-xs font-semibold"
          >
            Previous
          </button>

          {currentStep < STEPS.length - 1 ? (
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-sm shadow-lg shadow-rose-600/30"
            >
              <span>Next Step</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => setActiveModal(null)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-lg shadow-teal-500/30"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Complete Guide</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
