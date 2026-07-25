import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, User, Users, Volume2, Check, ChevronRight, ChevronLeft, Globe, Phone, Target } from 'lucide-react';

export function OnboardingWizard({ onComplete }) {
  const { userProfile, completeOnboarding, setRole, speakText, t } = useApp();
  const [step, setStep] = useState(1);

  // Onboarding Options
  const [role, setRoleState] = useState(userProfile.role || 'individual');
  const [language, setLanguage] = useState(userProfile.language || 'English');
  const [voice, setVoice] = useState(userProfile.preferredVoice || 'calm_female');
  const [contactName, setContactName] = useState(userProfile.emergencyContact?.name || '');
  const [contactPhone, setContactPhone] = useState(userProfile.emergencyContact?.phone || '');
  const [contactRel, setContactRel] = useState(userProfile.emergencyContact?.relationship || '');
  const [goal, setGoal] = useState(userProfile.goal || 'Reduce cravings');

  const LANGUAGES = ['English', 'Hindi', 'Malayalam', 'Tamil', 'Kannada', 'Telugu'];
  const VOICES = [
    { id: 'calm_female', label: t('voice') + ' (Female)', sampleText: 'Hello, I am Beacon AI. I am here to support your recovery journey.' },
    { id: 'calm_male', label: t('voice') + ' (Male)', sampleText: 'Welcome. Take a deep breath with me, you are safe here.' },
    { id: 'neutral', label: t('voice') + ' (Neutral)', sampleText: 'Grounding protocol ready whenever you feel an urge.' }
  ];

  const handleRoleSelect = (selectedRole) => {
    setRoleState(selectedRole);
    if (selectedRole === 'caregiver') {
      setGoal('Support loved one');
    } else {
      setGoal('Reduce cravings');
    }
  };

  const activeGoals = role === 'caregiver'
    ? [t('copingStrDesc'), t('recPlansDesc')] // "Support loved one" or "Learn about recovery" resolved via i18n mapping keys if needed
    : [t('recoveryGoal'), t('activeStreak'), t('recPlansDesc')];

  // Dynamic Navigation to skip Emergency Contact for Caregivers
  const handleNext = () => {
    if (step === 3 && role === 'caregiver') {
      setStep(5);
    } else {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step === 5 && role === 'caregiver') {
      setStep(3);
    } else {
      setStep(step - 1);
    }
  };

  const handlePreviewVoice = (sampleText) => {
    speakText(sampleText);
  };

  const handleFinish = () => {
    const finalProfile = {
      role,
      language,
      preferredVoice: voice,
      emergencyContact: role === 'caregiver' ? { name: '', phone: '', relationship: '' } : { name: contactName, phone: contactPhone, relationship: contactRel },
      goal,
      isDemo: false
    };

    setRole(role);
    completeOnboarding(finalProfile);
    if (onComplete) onComplete();
  };

  // Human readable step indicators
  const totalSteps = role === 'caregiver' ? 4 : 5;
  const displayStep = (step === 5 && role === 'caregiver') ? 4 : step;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fadeIn text-[#243746]">
      <div className="bg-white rounded-3xl w-full max-w-lg p-6 sm:p-8 relative border border-slate-100 shadow-2xl">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-100">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#4F7C82]">{t('stepTitle')} {displayStep} {t('of')} {totalSteps}</span>
            <h2 className="text-xl font-bold text-slate-900 font-display">{t('personalizeCompanion')}</h2>
          </div>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalSteps }).map((_, idx) => (
              <div
                key={idx}
                className={`h-2 w-6 rounded-full transition-colors ${
                  (idx + 1) <= displayStep ? 'bg-[#4F7C82]' : 'bg-slate-100'
                }`}
              />
            ))}
          </div>
        </div>

        {/* STEP 1: Recovery Role */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-900 font-display">{t('stepTitle')} 1: {t('whoAreYou')}</h3>
            <p className="text-xs text-slate-500">{t('roleSub')}</p>
            
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => handleRoleSelect('individual')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                  role === 'individual'
                    ? 'bg-[#F0F5F6] border-[#4F7C82] text-[#2F4D51] font-medium'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <User className="h-6 w-6 text-[#4F7C82] shrink-0" />
                <div>
                  <div className="font-bold text-xs text-slate-900">{t('individualRole')}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{t('individualSub')}</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect('caregiver')}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
                  role === 'caregiver'
                    ? 'bg-[#F0F5F6] border-[#4F7C82] text-[#2F4D51] font-medium'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                }`}
              >
                <Users className="h-6 w-6 text-[#4F7C82] shrink-0" />
                <div>
                  <div className="font-bold text-xs text-slate-900">{t('caregiverRole')}</div>
                  <div className="text-[11px] text-slate-500 mt-0.5">{t('caregiverSub')}</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Language Preference */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-900 font-display">{t('stepTitle')} 2: {t('language')}</h3>
            <p className="text-xs text-slate-500">{t('langSub')}</p>

            <div className="grid grid-cols-2 gap-2.5">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => setLanguage(lang)}
                  className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    language === lang
                      ? 'bg-[#F0F5F6] border-[#4F7C82] text-[#2F4D51]'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span>{lang}</span>
                  {language === lang && <Check className="h-4 w-4 text-[#4F7C82] stroke-[2.5]" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 3: Speech Voice Persona */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-900 font-display">{t('stepTitle')} 3: {t('voice')}</h3>
            <p className="text-xs text-slate-500">{t('voiceSub')}</p>

            <div className="space-y-2.5">
              {VOICES.map((v) => (
                <div
                  key={v.id}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-all ${
                    voice === v.id
                      ? 'bg-[#F0F5F6] border-[#4F7C82] text-[#2F4D51]'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setVoice(v.id)}
                    className="flex-1 text-left cursor-pointer"
                  >
                    <div className="font-bold text-xs text-slate-900">{v.label}</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePreviewVoice(v.sampleText)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-[#4F7C82] text-[10px] font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    <Volume2 className="h-3.5 w-3.5" />
                    <span>Preview</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: Emergency Contacts (Skipped for Caregivers) */}
        {step === 4 && role !== 'caregiver' && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-900 font-display">{t('stepTitle')} 4: {t('emergencyContact')}</h3>
            <p className="text-xs text-slate-500">{t('contactSub')}</p>

            <div className="space-y-3">
              <input
                type="text"
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder={t('contactName')}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-[#4F7C82]"
              />
              <input
                type="tel"
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                placeholder={t('contactPhone')}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-[#4F7C82] font-mono"
              />
              <input
                type="text"
                value={contactRel}
                onChange={(e) => setContactRel(e.target.value)}
                placeholder={t('contactRel')}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-[#4F7C82]"
              />
            </div>
          </div>
        )}

        {/* STEP 5: Goals */}
        {step === 5 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-slate-900 font-display">{t('stepTitle')} {totalSteps}: {t('recoveryGoal')}</h3>
            <p className="text-xs text-slate-500">{t('goalSubText')}</p>

            <div className="space-y-2">
              {activeGoals.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGoal(g)}
                  className={`w-full p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                    goal === g
                      ? 'bg-[#F0F5F6] border-[#4F7C82] text-[#2F4D51]'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <span>{g}</span>
                  {goal === g && <Check className="h-4 w-4 text-[#4F7C82] stroke-[2.5]" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Wizard Navigation Controls */}
        <div className="flex items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handlePrev}
            disabled={step === 1}
            className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600 hover:bg-slate-250 disabled:opacity-40 text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4" /> {t('previous')}
          </button>

          {step < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-[#4F7C82] hover:bg-[#3d6065] text-white font-bold text-xs shadow-sm flex items-center gap-1 cursor-pointer"
            >
              <span>{t('next')}</span> <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinish}
              className="px-6 py-2.5 rounded-xl bg-[#4F7C82] hover:bg-[#3d6065] text-white font-bold text-xs shadow-sm flex items-center gap-1 cursor-pointer"
            >
              <Check className="h-4 w-4 stroke-[3]" />
              <span>{t('completeSetup')}</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
