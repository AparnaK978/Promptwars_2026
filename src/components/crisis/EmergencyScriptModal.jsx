import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, PhoneCall, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

export function EmergencyScriptModal() {
  const { setActiveModal, speakText, t } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  const STEPS = [
    {
      title: "Step 1: Assess Unresponsiveness",
      instruction: "Check for unresponsiveness, slow or stopped breathing, pale/blue lips or fingertips. Shake shoulders and call loudly.",
      warning: "Dial 112 or 108 IMMEDIATELY if the person does not respond.",
      badge: "Identify"
    },
    {
      title: "Step 2: Administer Naloxone (Narcan)",
      instruction: "Peel back package. Insert nozzle tip into one nostril until fingers touch nose. Press plunger firmly to release dose.",
      warning: "Do not test or prime spray before inserting.",
      badge: "Naloxone Dose 1"
    },
    {
      title: "Step 3: Call 112 / 108 & Perform Rescue Breathing",
      instruction: "Tell emergency dispatcher someone is unresponsive and not breathing. Place them on back, tilt chin up, give 1 rescue breath every 5 seconds.",
      warning: "Stay on the line with the emergency operator.",
      badge: "Emergency Services"
    },
    {
      title: "Step 4: Second Dose & Recovery Position",
      instruction: "If no response after 2-3 minutes, administer 2nd dose in OTHER nostril. Turn person onto their side (Recovery Position) to prevent choking.",
      warning: "Stay with person until medical responders arrive.",
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn text-[#243746]">
      <div className="bg-white rounded-3xl w-full max-w-xl p-6 sm:p-8 relative border-2 border-rose-500/40 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
              <AlertTriangle className="h-6 w-6 animate-bounce" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-500">Emergency Protocol (India)</span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Naloxone & CPR Response Guide</h2>
            </div>
          </div>
          <button
            onClick={() => setActiveModal(null)}
            className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Dial 112 / 108 Call Banner */}
        <div className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-rose-50 border border-rose-200 mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-800">
            <PhoneCall className="h-4 w-4 text-rose-600 shrink-0" />
            <span>If unresponsive, call emergency services:</span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="tel:112"
              className="px-3.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shrink-0 shadow-md shadow-rose-600/30"
            >
              112
            </a>
            <a
              href="tel:108"
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shrink-0"
            >
              108
            </a>
          </div>
        </div>

        {/* Step Progression Bar */}
        <div className="flex items-center gap-1.5 mb-6">
          {STEPS.map((s, idx) => (
            <div
              key={idx}
              className={`h-2 flex-1 rounded-full transition-colors ${
                idx <= currentStep ? 'bg-rose-500' : 'bg-slate-100'
              }`}
            />
          ))}
        </div>

        {/* Step Card */}
        <div className="healthcare-card p-5 bg-white border border-slate-100 mb-6">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">{STEPS[currentStep].badge}</span>
            <span className="text-xs text-slate-400 font-mono">Step {currentStep + 1} of {STEPS.length}</span>
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-2">{STEPS[currentStep].title}</h3>
          <p className="text-sm text-slate-650 leading-relaxed mb-4">{STEPS[currentStep].instruction}</p>
          
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-100 text-xs text-rose-800 font-medium">
            🚨 <strong>Important:</strong> {STEPS[currentStep].warning}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 disabled:opacity-50 text-xs font-semibold cursor-pointer"
          >
            {t('previous')}
          </button>

          {currentStep < STEPS.length - 1 ? (
            <button
              onClick={handleNextStep}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md cursor-pointer"
            >
              <span>{t('next')}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={() => setActiveModal(null)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#4F7C82] hover:bg-[#3d6065] text-white font-bold text-sm shadow-md cursor-pointer"
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
