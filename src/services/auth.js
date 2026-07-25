// Modular authentication and user profile persistence service

const AUTH_KEYS = {
  USER_SESSION: 'beacon_user_session',
  USER_PROFILE: 'beacon_user_profile',
  ONBOARDING_COMPLETE: 'beacon_onboarding_complete'
};

export const DEFAULT_PROFILE = {
  id: 'guest_user_1',
  isGuest: true,
  email: 'guest@beacon-recovery.ai',
  name: 'Alex Morgan',
  role: 'individual', // 'individual' | 'caregiver'
  startDate: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 14 days ago
  emergencyContacts: [
    { id: '1', name: 'Sarah Morgan', relationship: 'Sister / Caregiver', phone: '555-0199' },
    { id: '2', name: 'Dr. Robert Vance', relationship: 'Recovery Counselor', phone: '555-0144' }
  ],
  goals: ['Maintain daily urge surfing', 'Improve sleep quality', 'Build crisis resilience'],
  triggers: ['High Work Stress', 'Environmental Cues', 'Sleep Deprivation'],
  copingStrategies: ['4-7-8 Breathing', 'Voice Journaling', '5-4-3-2-1 Grounding'],
  preferredVoice: 'calm_female', // 'calm_female' | 'encouraging_male' | 'gentle_neutral'
  notifications: {
    dailyCheckin: true,
    cravingAlerts: true,
    caregiverSync: false
  }
};

export const AuthService = {
  getCurrentSession() {
    try {
      const data = localStorage.getItem(AUTH_KEYS.USER_SESSION);
      return data ? JSON.parse(data) : { isLoggedIn: true, isGuest: true };
    } catch {
      return { isLoggedIn: true, isGuest: true };
    }
  },

  getUserProfile() {
    try {
      const data = localStorage.getItem(AUTH_KEYS.USER_PROFILE);
      return data ? JSON.parse(data) : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  },

  saveUserProfile(profile) {
    const updated = { ...this.getUserProfile(), ...profile };
    localStorage.setItem(AUTH_KEYS.USER_PROFILE, JSON.stringify(updated));
    return updated;
  },

  isOnboardingComplete() {
    return localStorage.getItem(AUTH_KEYS.ONBOARDING_COMPLETE) === 'true';
  },

  completeOnboarding(profileData) {
    this.saveUserProfile(profileData);
    localStorage.setItem(AUTH_KEYS.ONBOARDING_COMPLETE, 'true');
  },

  login(email, password) {
    const session = { isLoggedIn: true, isGuest: false, email };
    localStorage.setItem(AUTH_KEYS.USER_SESSION, JSON.stringify(session));
    return session;
  },

  signup(name, email, password) {
    const profile = { ...DEFAULT_PROFILE, id: Date.now().toString(), name, email, isGuest: false };
    this.saveUserProfile(profile);
    const session = { isLoggedIn: true, isGuest: false, email };
    localStorage.setItem(AUTH_KEYS.USER_SESSION, JSON.stringify(session));
    return { session, profile };
  },

  loginAsGuest() {
    const session = { isLoggedIn: true, isGuest: true };
    localStorage.setItem(AUTH_KEYS.USER_SESSION, JSON.stringify(session));
    return session;
  },

  logout() {
    localStorage.removeItem(AUTH_KEYS.USER_SESSION);
  }
};
