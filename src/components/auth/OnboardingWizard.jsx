import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, User, Users, Volume2, Check, ChevronRight, ChevronLeft, Globe, Phone, Target } from 'lucide-react';

export function OnboardingWizard({ onComplete }) {
  const { userProfile, completeOnboarding, setRole, speakText } = useApp();
  const [step, setStep] = useState(1);

  // 1-Question-Per-Step State
  const [role, setRoleState] = useState(userProfile.role || 'individual');
  const [language, setLanguage] = useState(userProfile.language || 'English');
  const [voice, setVoice] = useState(userProfile.preferredVoice || 'calm_female');
  const [contactName, setContactName] = useState(userProfile.emergencyContact?.name || '');
  const [contactPhone, setContactPhone] = useState(userProfile.emergencyContact?.phone || '');
  const [contactRel, setContactRel] = useState(userProfile.emergencyContact?.relationship || '');
  const [goal, setGoal] = useState(userProfile.goal || 'Reduce cravings');

  const LANGUAGES = ['English', 'Hindi', 'Malayalam', 'Tamil', 'Kannada', 'Telugu'];
  const VOICES = [
    { id: 'calm_female', label: 'Calm Female', sampleText: 'Hello, I am Beacon AI. I am here to support your recovery journey.' },
    { id: 'calm_male', label: 'Calm Male', sampleText: 'Welcome. Take a deep breath with me, you are safe here.' },
    { id: 'neutral', label: 'Neutral Voice', sampleText: 'Grounding protocol ready whenever you feel an urge.' }
  ];
  const GOALS = ['Reduce cravings', 'Stay sober', 'Support loved one', 'Learn about recovery'];

  const handlePreviewVoice = (sampleText) => {
    speakText(sampleText);
  };

  const handleFinish = () => {
    const finalProfile = {
      role,
      language,
      preferredVoice: voice,
      emergencyContact: { name: contactName, phone: contactPhone, relationship: contactRel },
      goal,
      isDemo: false
    };

    setRole(role);
    completeOnboarding(finalProfile);
    if (onComplete) onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-lg p-6 sm:p-8 relative border border-slate-700 shadow-2xl bg-slate-950">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-400">Step {step} of 5</span>
            <h2 className="text-xl font-bold text-white font-display">Personalize Companion</h2>
          </div>
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-2 w-6 rounded-full transition-colors ${
                  s <= step ? 'bg-teal-400' : 'bg-slate-800'
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: Who are you? */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-white font-display">Step 1: Who are you?</h3>
            <p className="text-xs text-slate-400">Select how Beacon AI should tailor your companion experience.</p>
            
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setRoleState('individual')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                  role === 'individual'
                    ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <User className="h-6 w-6 text-teal-400 shrink-0" />
                <div>
                  <div className="font-bold text-sm text-white">Recovering Individual</div>
                  <div className="text-xs text-slate-400 mt-0.5">Urge surfing, voice journals, and zero-typing crisis support.</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRoleState('caregiver')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                  role === 'caregiver'
                    ? 'bg-purple-600/20 border-purple-400 text-purple-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Users className="h-6 w-6 text-purple-400 shrink-0" />
                <div>
                  <div className="font-bold text-sm text-white">Caregiver / Loved One</div>
                  <div className="text-xs text-slate-400 mt-0.5">De-escalation scripts, family support, and 112/108 guides.</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Preferred Language */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-white font-display">Step 2: Preferred Language</h3>
            <p className="text-xs text-slate-400">Select your preferred language for prompts and resources.</p>

            <div className="grid grid-cols-2 gap-2.5">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                    language === lang
                      ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span>{lang}</span>
                  {language === lang && <Check className="h-4 w-4 text-teal-400" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Preferred Voice Persona */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-white font-display">Step 3: Preferred Voice</h3>
            <p className="text-xs text-slate-400">Listen to audio previews and choose your preferred AI companion voice.</p>

            <div className="space-y-2.5">
              {VOICES.map((v) => (
                <div
                  key={v.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                    voice === v.id
                      ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setVoice(v.id)}
                    className="flex-1 text-left"
                  >
                    <div className="font-bold text-sm text-white">{v.label}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePreviewVoice(v.sampleText)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 text-teal-300 text-xs font-semibold hover:bg-slate-700"
                  >
                    <Volume2 className="h-4 w-4" />
                    <span>Preview</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Emergency Contact (Optional) */}
        {step === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-white font-display">Step 4: Emergency Contact</h3>
            <p className="text-xs text-slate-400">Optional: Add a trusted family member or counselor for 1-tap SOS contact.</p>

            <div className="space-y-3">
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Contact Name (e.g. Priya Sharma)"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-teal-400"
              />
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder="Phone Number (e.g. 9876543210)"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-teal-400 font-mono"
              />
              <input
                type="text"
                value={contactRel}
                onChange={(e) => setContactRel(e.target.value)}
                placeholder="Relationship (e.g. Spouse / Sister / Counselor)"
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-teal-400"
              />
            </div>
          </div>
        )}

        {/* STEP 5: Recovery Goal */}
        {step === 5 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-lg font-bold text-white font-display">Step 5: Primary Goal</h3>
            <p className="text-xs text-slate-400">Select what you would like to focus on first.</p>

            <div className="space-y-2">
              {GOALS.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGoal(g)}
                  className={`w-full p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                    goal === g
                      ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span>{g}</span>
                  {goal === g && <Check className="h-4 w-4 text-teal-400" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Wizard Controls */}
        <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white disabled:opacity-40 text-xs font-semibold flex items-center gap-1"
          >
            <ChevronLeft className="h-4 w-4" /> Previous
          </button>

          {step < 5 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-5 py-2 rounded-xl bg-teal-500 text-slate-950 font-extrabold text-xs shadow-md shadow-teal-500/30 hover:bg-teal-400 flex items-center gap-1"
            >
              <span>Next</span> <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-black text-xs shadow-lg shadow-teal-500/30 hover:brightness-110 flex items-center gap-1.5"
            >
              <Check className="h-4 w-4 stroke-[3]" />
              <span>Launch Companion</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
