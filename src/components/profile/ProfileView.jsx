import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Volume2, Globe, Phone, Target, Lock, Sparkles, Check, RefreshCw } from 'lucide-react';

export function ProfileView() {
  const { userProfile, updateProfile, speakText, enableDemoMode } = useApp();

  const [language, setLanguageState] = useState(userProfile.language || 'English');
  const [voice, setVoiceState] = useState(userProfile.preferredVoice || 'calm_female');
  const [goal, setGoalState] = useState(userProfile.goal || 'Reduce cravings');
  const [contactName, setContactName] = useState(userProfile.emergencyContact?.name || '');
  const [contactPhone, setContactPhone] = useState(userProfile.emergencyContact?.phone || '');
  const [saved, setSaved] = useState(false);

  const LANGUAGES = ['English', 'Hindi', 'Malayalam', 'Tamil', 'Kannada', 'Telugu'];
  const VOICES = [
    { id: 'calm_female', label: 'Calm Female', sample: 'Hello, I am Beacon AI. I am here to support your recovery journey.' },
    { id: 'calm_male', label: 'Calm Male', sample: 'Welcome. Take a deep breath with me, you are safe here.' },
    { id: 'neutral', label: 'Neutral Voice', sample: 'Grounding protocol ready whenever you feel an urge.' }
  ];
  const GOALS = ['Reduce cravings', 'Stay sober', 'Support loved one', 'Learn about recovery'];

  const handleSave = () => {
    updateProfile({
      language,
      preferredVoice: voice,
      goal,
      emergencyContact: { name: contactName, phone: contactPhone, relationship: 'Caregiver' }
    });
    setSaved(true);
    speakText("Profile settings updated successfully.");
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-6 pb-24">
      
      {/* Header */}
      <div className="glass-panel p-6 border border-slate-800 flex items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-wider text-slate-400">Settings & Preferences</span>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">Companion Profile</h2>
        </div>

        {/* Demo Mode Toggle for Judges */}
        <button
          onClick={() => {
            enableDemoMode();
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          }}
          className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
        >
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>Toggle Judge Demo Data</span>
        </button>
      </div>

      {saved && (
        <div className="p-3 rounded-xl bg-teal-500/20 border border-teal-400 text-teal-300 text-xs font-semibold text-center animate-fadeIn">
          ✓ Profile settings saved cleanly!
        </div>
      )}

      {/* Language Preference */}
      <div className="glass-panel p-6 border border-slate-800">
        <h3 className="text-sm font-bold text-white font-display mb-3 flex items-center gap-2">
          <Globe className="h-4 w-4 text-teal-400" />
          Preferred Language
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setLanguageState(lang)}
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

      {/* AI Voice Persona & Audio Test */}
      <div className="glass-panel p-6 border border-slate-800">
        <h3 className="text-sm font-bold text-white font-display mb-3 flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-teal-400" />
          Preferred AI Companion Voice
        </h3>

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
                onClick={() => setVoiceState(v.id)}
                className="flex-1 text-left font-bold text-xs text-white"
              >
                {v.label}
              </button>

              <button
                type="button"
                onClick={() => speakText(v.sample)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-800 text-teal-300 text-xs font-semibold hover:bg-slate-700"
              >
                <Volume2 className="h-4 w-4" />
                <span>Test Voice</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="glass-panel p-6 border border-slate-800">
        <h3 className="text-sm font-bold text-white font-display mb-3 flex items-center gap-2">
          <Phone className="h-4 w-4 text-rose-400" />
          Emergency Contact Details
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            placeholder="Contact Name (e.g. Priya Sharma)"
            className="py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-teal-400"
          />
          <input
            type="tel"
            value={contactPhone}
            onChange={(e) => setContactPhone(e.target.value)}
            placeholder="Phone Number (e.g. 9876543210)"
            className="py-2.5 px-4 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-teal-400 font-mono"
          />
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-teal-500/30 hover:brightness-110 transition-all"
      >
        Save Profile Settings
      </button>

    </div>
  );
}
