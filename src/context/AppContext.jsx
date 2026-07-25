import React, { createContext, useContext, useState } from 'react';
import { StorageService } from '../services/storage';
import { AuthService, CLEAN_SLATE_PROFILE } from '../services/auth';

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

  // Modals & Overlays
  const [activeModal, setActiveModal] = useState(null);
  const [speechOutputEnabled, setSpeechOutputEnabled] = useState(true);

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

  // Auth Operations
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
