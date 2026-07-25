import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { AuthService, CLEAN_SLATE_PROFILE } from '../services/auth';
import { getTranslation } from '../services/i18n';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [session, setSession] = useState(() => AuthService.getCurrentSession());
  const [userProfile, setUserProfile] = useState(() => AuthService.getUserProfile());
  const [showOnboarding, setShowOnboarding] = useState(false);

  const [role, setRoleState] = useState(() => userProfile.role || StorageService.getRole());
  const [highContrast, setHighContrastState] = useState(() => StorageService.getHighContrast());
  const [streakDays, setStreakDaysState] = useState(() => StorageService.getStreakDays());
  const [cravingLogs, setCravingLogs] = useState(() => StorageService.getCravingLogs());
  const [journals, setJournals] = useState(() => StorageService.getJournals());

  // Speech Recognition States: 'idle' | 'listening' | 'processing' | 'speaking'
  const [voiceAssistantState, setVoiceAssistantState] = useState('idle');
  const [speechOutputEnabled, setSpeechOutputEnabled] = useState(true);
  const [activeModal, setActiveModal] = useState(null);

  // Internationalization Helper
  const t = (key) => {
    return getTranslation(userProfile.language || 'English', key);
  };

  // Browser Speech Synthesis Engine voice selection mapping
  const getSelectedVoice = () => {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    const pref = userProfile.preferredVoice || 'calm_female';

    if (pref === 'calm_female') {
      return voices.find(v => v.name.includes('Female') || v.name.includes('Zira') || v.name.includes('Google US English')) || voices[0];
    } else if (pref === 'calm_male') {
      return voices.find(v => v.name.includes('Male') || v.name.includes('David') || v.name.includes('Google UK English Male')) || voices[0];
    }
    return voices.find(v => v.name.includes('Natural') || v.name.includes('Google')) || voices[0];
  };

  const speakText = (text) => {
    if (!speechOutputEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      setVoiceAssistantState('speaking');
      const cleanText = text.replace(/[*_#`]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      
      const matchedVoice = getSelectedVoice();
      if (matchedVoice) {
        utterance.voice = matchedVoice;
      }
      
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => {
        setVoiceAssistantState('idle');
      };
      utterance.onerror = () => {
        setVoiceAssistantState('idle');
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Speech Synthesis failed:", e);
      setVoiceAssistantState('idle');
    }
  };

  const setRole = (newRole) => {
    setRoleState(newRole);
    StorageService.setRole(newRole);
    const updated = { ...userProfile, role: newRole };
    setUserProfile(updated);
    AuthService.saveUserProfile(updated);
  };

  const toggleHighContrast = () => {
    const nextVal = !highContrast;
    setHighContrastState(nextVal);
    StorageService.setHighContrast(nextVal);
  };

  const setStreakDays = (val) => {
    setStreakDaysState(val);
    StorageService.setStreakDays(val);
  };

  const logCraving = (entry) => {
    const newEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      date: new Date().toLocaleDateString(),
      ...entry
    };
    const updated = StorageService.saveCravingLog(newEntry);
    setCravingLogs(updated);
  };

  const addJournal = (entry) => {
    const newEntry = {
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      ...entry
    };
    const updated = StorageService.saveJournal(newEntry);
    setJournals(updated);
  };

  const login = (email, password) => {
    const sess = AuthService.login(email, password);
    setSession(sess);
    const prof = AuthService.getUserProfile();
    setUserProfile(prof);
    setStreakDaysState(StorageService.getStreakDays());
    setCravingLogs(StorageService.getCravingLogs());
  };

  const signup = (name, email, password) => {
    const { session: sess, profile: prof } = AuthService.signup(name, email, password);
    setSession(sess);
    setUserProfile(prof);
    setShowOnboarding(true);
    setStreakDaysState(StorageService.getStreakDays());
    setCravingLogs(StorageService.getCravingLogs());
  };

  const loginAsGuest = () => {
    const { session: sess, profile: prof } = AuthService.loginAsGuest();
    setSession(sess);
    setUserProfile(prof);
    setStreakDaysState(StorageService.getStreakDays());
    setCravingLogs(StorageService.getCravingLogs());
  };

  const enableDemoMode = () => {
    const { session: sess, profile: prof } = AuthService.enableDemoMode();
    setSession(sess);
    setUserProfile(prof);
    setStreakDaysState(StorageService.getStreakDays());
    setCravingLogs(StorageService.getCravingLogs());
  };

  const completeOnboarding = (profileData) => {
    AuthService.completeOnboarding(profileData);
    setUserProfile(AuthService.getUserProfile());
    setShowOnboarding(false);
  };

  const updateProfile = (data) => {
    const updated = AuthService.saveUserProfile(data);
    setUserProfile(updated);
  };

  const logout = () => {
    AuthService.logout();
    setSession({ isLoggedIn: false, isGuest: false });
    setUserProfile(CLEAN_SLATE_PROFILE);
    setStreakDaysState(0);
    setCravingLogs([]);
    setShowOnboarding(false);
  };

  // Populate browser voices on start
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  return (
    <AppContext.Provider value={{
      session,
      userProfile,
      showOnboarding,
      setShowOnboarding,
      role,
      setRole,
      highContrast,
      toggleHighContrast,
      streakDays,
      setStreakDays,
      cravingLogs,
      logCraving,
      journals,
      addJournal,
      activeModal,
      setActiveModal,
      speechOutputEnabled,
      setSpeechOutputEnabled,
      voiceAssistantState,
      setVoiceAssistantState,
      speakText,
      t,
      login,
      signup,
      loginAsGuest,
      enableDemoMode,
      completeOnboarding,
      updateProfile,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
