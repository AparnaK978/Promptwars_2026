// Modular authentication and user profile persistence with Clean Slate & Indian Demo Mode support

const AUTH_KEYS = {
  USER_SESSION: 'beacon_user_session',
  USER_PROFILE: 'beacon_user_profile',
  ONBOARDING_COMPLETE: 'beacon_onboarding_complete'
};

// Clean Slate Default Profile for Real First-Time Users
export const CLEAN_SLATE_PROFILE = {
  id: '',
  isGuest: false,
  email: '',
  name: 'User',
  role: 'individual', // 'individual' | 'caregiver'
  language: 'English', // 'English' | 'Hindi' | 'Malayalam' | 'Tamil' | 'Kannada' | 'Telugu'
  preferredVoice: 'calm_female', // 'calm_female' | 'calm_male' | 'neutral'
  emergencyContact: { name: '', phone: '', relationship: '' },
  goal: 'Reduce cravings',
  isDemo: false
};

// Realistic Indian Profile for Hackathon Judges ("Try Demo Experience")
export const INDIAN_DEMO_PROFILE = {
  id: 'demo_judge_1',
  isGuest: true,
  email: 'rahul.sharma@beacon-recovery.in',
  name: 'Rahul Sharma',
  role: 'individual',
  language: 'English',
  preferredVoice: 'calm_female',
  emergencyContact: { name: 'Priya Sharma', phone: '112 / 9876543210', relationship: 'Spouse / Caregiver' },
  goal: 'Stay sober & build daily resilience',
  isDemo: true
};

export const AuthService = {
  getCurrentSession() {
    try {
      const data = localStorage.getItem(AUTH_KEYS.USER_SESSION);
      if (!data) return { isLoggedIn: false, isGuest: false };
      const parsed = JSON.parse(data);
      if (parsed.email) {
        parsed.email = parsed.email.toLowerCase().trim();
      }
      return parsed;
    } catch {
      return { isLoggedIn: false, isGuest: false };
    }
  },

  getUserProfile() {
    try {
      const session = this.getCurrentSession();
      const emailKey = session.email ? session.email.toLowerCase().trim() : '';
      const profileKey = emailKey ? `${AUTH_KEYS.USER_PROFILE}_${emailKey}` : AUTH_KEYS.USER_PROFILE;
      const data = localStorage.getItem(profileKey);
      return data ? JSON.parse(data) : CLEAN_SLATE_PROFILE;
    } catch {
      return CLEAN_SLATE_PROFILE;
    }
  },

  saveUserProfile(profile) {
    const session = this.getCurrentSession();
    const emailKey = session.email ? session.email.toLowerCase().trim() : '';
    const profileKey = emailKey ? `${AUTH_KEYS.USER_PROFILE}_${emailKey}` : AUTH_KEYS.USER_PROFILE;
    const updated = { ...this.getUserProfile(), ...profile };
    if (updated.email) {
      updated.email = updated.email.toLowerCase().trim();
    }
    localStorage.setItem(profileKey, JSON.stringify(updated));
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
    const emailLower = email.toLowerCase().trim();
    const session = { isLoggedIn: true, isGuest: false, email: emailLower };
    localStorage.setItem(AUTH_KEYS.USER_SESSION, JSON.stringify(session));
    
    const profileKey = `${AUTH_KEYS.USER_PROFILE}_${emailLower}`;
    const existing = localStorage.getItem(profileKey);
    if (!existing) {
      const profile = { ...CLEAN_SLATE_PROFILE, email: emailLower, name: emailLower.split('@')[0] };
      localStorage.setItem(profileKey, JSON.stringify(profile));
    }
    return session;
  },

  signup(name, email, password, role) {
    const emailLower = email.toLowerCase().trim();
    const session = { isLoggedIn: true, isGuest: false, email: emailLower };
    localStorage.setItem(AUTH_KEYS.USER_SESSION, JSON.stringify(session));
    const profile = { ...CLEAN_SLATE_PROFILE, email: emailLower, name, role: role || 'individual' };
    
    const profileKey = `${AUTH_KEYS.USER_PROFILE}_${emailLower}`;
    localStorage.setItem(profileKey, JSON.stringify(profile));
    return { session, profile };
  },

  enableDemoMode() {
    localStorage.setItem('beacon_demo_mode', 'true');
    this.saveUserProfile(INDIAN_DEMO_PROFILE);
    localStorage.setItem(AUTH_KEYS.ONBOARDING_COMPLETE, 'true');
    const session = { isLoggedIn: true, isGuest: true, isDemo: true };
    localStorage.setItem(AUTH_KEYS.USER_SESSION, JSON.stringify(session));
    return { session, profile: INDIAN_DEMO_PROFILE };
  },

  loginAsGuest() {
    const guestProf = { ...CLEAN_SLATE_PROFILE, id: 'guest_' + Date.now(), isGuest: true, name: 'Guest User' };
    this.saveUserProfile(guestProf);
    const session = { isLoggedIn: true, isGuest: true };
    localStorage.setItem(AUTH_KEYS.USER_SESSION, JSON.stringify(session));
    return { session, profile: guestProf };
  },

  logout() {
    localStorage.removeItem(AUTH_KEYS.USER_SESSION);
    localStorage.removeItem(AUTH_KEYS.ONBOARDING_COMPLETE);
    localStorage.setItem('beacon_demo_mode', 'false');
  }
};
