import React, { createContext, useContext, useState, useEffect } from 'react';
import { StorageService } from '../services/storage';
import { AuthService } from '../services/auth';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [session, setSession] = useState(() => AuthService.getCurrentSession());
  const [userProfile, setUserProfile] = useState(() => AuthService.getUserProfile());
  const [showOnboarding, setShowOnboarding] = useState(() => !AuthService.isOnboardingComplete());

  const [role, setRoleState] = useState(() => userProfile.role || StorageService.getRole());
  const [highContrast, setHighContrastState] = useState(() => StorageService.getHighContrast());
  const [streakDays, setStreakDays] = useState(() => StorageService.getStreakDays());
  const [cravingLogs, setCravingLogs] = useState(() => StorageService.getCravingLogs());
  const [journals, setJournals] = useState(() => StorageService.getJournals());

  // Modals & Overlays: 'emergency_script' | 'breathing' | 'image_scanner' | 'craving_scale' | 'auth' | 'pipeline'
  const [activeModal, setActiveModal] = useState(null);
  const [speechOutputEnabled, setSpeechOutputEnabled] = useState(true);

  // Audio Speech Synthesis Helper
  const speakText = (text) => {
    if (!speechOutputEnabled || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    window.speechSynthesis.speak(utterance);
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

  // Auth Operations
  const login = (email, password) => {
    const sess = AuthService.login(email, password);
    setSession(sess);
    const prof = AuthService.getUserProfile();
    setUserProfile(prof);
  };

  const signup = (name, email, password) => {
    const { session: sess, profile: prof } = AuthService.signup(name, email, password);
    setSession(sess);
    setUserProfile(prof);
    setShowOnboarding(true);
  };

  const loginAsGuest = () => {
    const sess = AuthService.loginAsGuest();
    setSession(sess);
    const prof = AuthService.getUserProfile();
    setUserProfile(prof);
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
      speakText,
      login,
      signup,
      loginAsGuest,
      completeOnboarding,
      updateProfile
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
