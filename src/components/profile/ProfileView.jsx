import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Volume2, Globe, Phone, Target, Lock, Sparkles, Check, RefreshCw } from 'lucide-react';

export function ProfileView() {
  const { userProfile, updateProfile, speakText, enableDemoMode, t } = useApp();

  const [language, setLanguageState] = useState(userProfile.language || 'English');
  const [voice, setVoiceState] = useState(userProfile.preferredVoice || 'calm_female');
  const [goal, setGoalState] = useState(userProfile.goal || 'Reduce cravings');
  const [contactName, setContactName] = useState(userProfile.emergencyContact?.name || '');
  const [contactPhone, setContactPhone] = useState(userProfile.emergencyContact?.phone || '');
  const [saved, setSaved] = useState(false);

  const LANGUAGES = ['English', 'Hindi', 'Malayalam', 'Tamil', 'Kannada', 'Telugu'];
  const VOICES = [
    { id: 'calm_female', label: t('voice') + ' (Female)', sample: 'Hello, I am Beacon AI. I am here to support your recovery journey.' },
    { id: 'calm_male', label: t('voice') + ' (Male)', sample: 'Welcome. Take a deep breath with me, you are safe here.' },
    { id: 'neutral', label: t('voice') + ' (Neutral)', sample: 'Grounding protocol ready whenever you feel an urge.' }
  ];

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
    <div className="space-y-6 pb-24 text-[#243746]">
      
      {/* Header */}
      <div className="healthcare-card p-6 bg-white border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#4F7C82]">Settings & Preferences</span>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Companion Profile</h2>
        </div>

        {/* Demo Mode Toggle for Judges */}
        <button
          onClick={() => {
            enableDemoMode();
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          }}
          className="px-3.5 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-800 font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
        >
          <Sparkles className="h-4 w-4 text-amber-600" />
          <span>{t('demoData')}</span>
        </button>
      </div>

      {saved && (
        <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-teal-700 text-xs font-semibold text-center animate-fadeIn">
          ✓ Profile settings saved cleanly!
        </div>
      )}

      {/* Language Preference */}
      <div className="healthcare-card p-6 bg-white border border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 font-display mb-3 flex items-center gap-2">
          <Globe className="h-4 w-4 text-[#4F7C82]" />
          {t('language')}
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang}
              type="button"
              onClick={() => setLanguageState(lang)}
              className={`p-3.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                language === lang
                  ? 'bg-[#F0F5F6] border-[#4F7C82] text-[#2F4D51]'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-350'
              }`}
            >
              <span>{lang}</span>
              {language === lang && <Check className="h-4 w-4 text-[#4F7C82] stroke-[2.5]" />}
            </button>
          ))}
        </div>
      </div>

      {/* AI Voice Persona & Audio Test */}
      <div className="healthcare-card p-6 bg-white border border-slate-100">
        <h3 className="text-sm font-bold text-slate-900 font-display mb-3 flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-[#4F7C82]" />
          {t('voice')}
        </h3>

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
                onClick={() => setVoiceState(v.id)}
                className="flex-1 text-left font-bold text-xs text-slate-900 cursor-pointer"
              >
                {v.label}
              </button>

              <button
                type="button"
                onClick={() => speakText(v.sample)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-[#4F7C82] text-[10px] font-bold hover:bg-slate-100 cursor-pointer"
              >
                <Volume2 className="h-4 w-4" />
                <span>Test Voice</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact (Skipped if User has Caregiver role) */}
      {userProfile?.role !== 'caregiver' && (
        <div className="healthcare-card p-6 bg-white border border-slate-100">
          <h3 className="text-sm font-bold text-slate-900 font-display mb-3 flex items-center gap-2">
            <Phone className="h-4 w-4 text-[#D65A5A]" />
            {t('emergencyContact')}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              placeholder="Contact Name (e.g. Priya Sharma)"
              className="py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-[#4F7C82]"
            />
            <input
              type="tel"
              value={contactPhone}
              onChange={(e) => setContactPhone(e.target.value)}
              placeholder="Phone Number (e.g. 9876543210)"
              className="py-2.5 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-[#4F7C82] font-mono"
            />
          </div>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full py-3.5 rounded-xl bg-[#4F7C82] hover:bg-[#3d6065] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
      >
        {t('save')}
      </button>

    </div>
  );
}
