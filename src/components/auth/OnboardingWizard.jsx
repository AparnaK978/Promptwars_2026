import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, User, Users, Calendar, Target, AlertTriangle, Heart, Volume2, Bell, Check, ChevronRight, ChevronLeft } from 'lucide-react';

export function OnboardingWizard({ onComplete }) {
  const { userProfile, updateProfile, completeOnboarding, setRole } = useApp();
  const [step, setStep] = useState(1);

  // Form State
  const [role, setRoleState] = useState(userProfile.role || 'individual');
  const [startDate, setStartDate] = useState(userProfile.startDate || new Date().toISOString().split('T')[0]);
  const [goals, setGoals] = useState(userProfile.goals || ['Maintain daily urge surfing', 'Improve sleep quality']);
  const [contacts, setContacts] = useState(userProfile.emergencyContacts || [
    { id: '1', name: 'Sarah Morgan', relationship: 'Sister / Caregiver', phone: '555-0199' }
  ]);
  const [triggers, setTriggers] = useState(userProfile.triggers || ['High Work Stress', 'Sleep Deprivation']);
  const [coping, setCoping] = useState(userProfile.copingStrategies || ['4-7-8 Breathing', 'Voice Journaling']);
  const [voice, setVoice] = useState(userProfile.preferredVoice || 'calm_female');
  const [notifications, setNotifications] = useState(userProfile.notifications || {
    dailyCheckin: true,
    cravingAlerts: true,
    caregiverSync: false
  });

  const GOAL_OPTIONS = ['Maintain daily urge surfing', 'Improve sleep quality', 'Build crisis resilience', 'Learn caregiver de-escalation', 'Track daily streaks'];
  const TRIGGER_OPTIONS = ['High Work Stress', 'Environmental Cues', 'Sleep Deprivation', 'Emotional Fatigue', 'Social Pressure', 'Physical Pain'];
  const COPING_OPTIONS = ['4-7-8 Breathing', 'Voice Journaling', '5-4-3-2-1 Grounding', '1-Tap Craving SOS', 'Caregiver Call Script'];

  const toggleArrayItem = (arr, setArr, item) => {
    if (arr.includes(item)) {
      setArr(arr.filter((i) => i !== item));
    } else {
      setArr([...arr, item]);
    }
  };

  const handleFinish = () => {
    const finalProfile = {
      role,
      startDate,
      goals,
      emergencyContacts: contacts,
      triggers,
      copingStrategies: coping,
      preferredVoice: voice,
      notifications
    };

    setRole(role);
    completeOnboarding(finalProfile);
    if (onComplete) onComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-fadeIn">
      <div className="glass-panel w-full max-w-xl p-6 sm:p-8 relative border border-slate-700 shadow-2xl bg-slate-950">
        
        {/* Step Progression Bar */}
        <div className="flex items-center justify-between gap-2 mb-6 pb-4 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-teal-400">Step {step} of 5</span>
            <h2 className="text-xl font-bold text-white font-display">Personalize Recovery Profile</h2>
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

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-white">Select Your Primary Role</h3>
            <p className="text-xs text-slate-400">Beacon AI adapts its layout, prompts, and emergency tools to your role.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRoleState('individual')}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  role === 'individual'
                    ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <User className="h-6 w-6 mb-3 text-teal-400" />
                <div>
                  <div className="font-bold text-sm text-white">Individual in Recovery</div>
                  <div className="text-xs text-slate-400 mt-1">Access zero-typing SOS, urge surfing, and voice journals.</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRoleState('caregiver')}
                className={`p-5 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  role === 'caregiver'
                    ? 'bg-purple-600/20 border-purple-400 text-purple-200'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <Users className="h-6 w-6 mb-3 text-purple-400" />
                <div>
                  <div className="font-bold text-sm text-white">Caregiver / Family</div>
                  <div className="text-xs text-slate-400 mt-1">Access AI de-escalation scripts and Naloxone CPR protocols.</div>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Start Date & Goals */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-white">Recovery Start Date & Target Goals</h3>
            
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Recovery Start / Commitment Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-400 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Primary Goals (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {GOAL_OPTIONS.map((g) => {
                  const selected = goals.includes(g);
                  return (
                    <button
                      key={g}
                      type="button"
                      onClick={() => toggleArrayItem(goals, setGoals, g)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        selected
                          ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {selected ? '✓ ' : '+ '}{g}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Emergency Contacts */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-white">Emergency Contacts</h3>
            <p className="text-xs text-slate-400">Designate trusted loved ones or counselors for 1-tap crisis notification.</p>

            <div className="space-y-2">
              {contacts.map((c, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                  <div>
                    <div className="font-bold text-white">{c.name} ({c.relationship})</div>
                    <div className="text-slate-400 font-mono">{c.phone}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <input
                type="text"
                placeholder="Contact Name & Relationship"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && e.target.value.trim()) {
                    setContacts([...contacts, { id: Date.now().toString(), name: e.target.value, relationship: 'Support', phone: '555-0100' }]);
                    e.target.value = '';
                  }
                }}
                className="w-full py-2 px-3 rounded-lg bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-teal-400"
              />
              <span className="text-[10px] text-slate-500">Press Enter to add contact</span>
            </div>
          </div>
        )}

        {/* Step 4: Personal Triggers & Coping Strategies */}
        {step === 4 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-white">Triggers & Coping Preferences</h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Known Personal Triggers
              </label>
              <div className="flex flex-wrap gap-2">
                {TRIGGER_OPTIONS.map((t) => {
                  const selected = triggers.includes(t);
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => toggleArrayItem(triggers, setTriggers, t)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        selected
                          ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {selected ? '✓ ' : '+ '}{t}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Preferred Coping Tools
              </label>
              <div className="flex flex-wrap gap-2">
                {COPING_OPTIONS.map((c) => {
                  const selected = coping.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleArrayItem(coping, setCoping, c)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        selected
                          ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {selected ? '✓ ' : '+ '}{c}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Voice & Notifications */}
        {step === 5 && (
          <div className="space-y-4 animate-fadeIn">
            <h3 className="text-base font-bold text-white">AI Voice & Notification Preferences</h3>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Preferred AI Voice Persona
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'calm_female', label: 'Calm Female' },
                  { id: 'encouraging_male', label: 'Encouraging Male' },
                  { id: 'gentle_neutral', label: 'Gentle Neutral' }
                ].map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVoice(v.id)}
                    className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                      voice === v.id
                        ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Notification Alerts
              </label>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 cursor-pointer">
                  <span>Daily Morning Recovery Check-in</span>
                  <input
                    type="checkbox"
                    checked={notifications.dailyCheckin}
                    onChange={(e) => setNotifications({ ...notifications, dailyCheckin: e.target.checked })}
                    className="accent-teal-400"
                  />
                </label>
                <label className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 cursor-pointer">
                  <span>High Craving Risk Warning Notifications</span>
                  <input
                    type="checkbox"
                    checked={notifications.cravingAlerts}
                    onChange={(e) => setNotifications({ ...notifications, cravingAlerts: e.target.checked })}
                    className="accent-teal-400"
                  />
                </label>
              </div>
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
              <span>Complete Setup & Launch Beacon</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
