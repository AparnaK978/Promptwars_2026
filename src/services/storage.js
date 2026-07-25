// LocalStorage privacy-first storage manager with Clean Slate & Hackathon Demo Mode support

const KEYS = {
  ROLE: 'beacon_user_role',
  DEMO_MODE: 'beacon_demo_mode',
  CRAVING_LOGS: 'beacon_craving_logs',
  JOURNAL_ENTRIES: 'beacon_journals',
  STREAK_DAYS: 'beacon_streak_days',
  HIGH_CONTRAST: 'beacon_high_contrast'
};

// Realistic Indian Demo Data for Hackathon Judges
export const DEMO_SAMPLE_LOGS = [
  {
    id: 'demo_1',
    timestamp: '10:30 AM',
    date: '2026-07-25',
    intensity: 4,
    triggers: ['Work Stress', 'Evening Routine'],
    aiAdvice: 'Practiced 4-7-8 urge surfing. Craving passed in 6 minutes.'
  },
  {
    id: 'demo_2',
    timestamp: '08:15 PM',
    date: '2026-07-24',
    intensity: 6,
    triggers: ['Social Pressure'],
    aiAdvice: 'Used 1-tap de-escalation audio and spoke with family counselor.'
  }
];

export const StorageService = {
  getRole() {
    return localStorage.getItem(KEYS.ROLE) || 'individual';
  },
  setRole(role) {
    localStorage.setItem(KEYS.ROLE, role);
  },

  isDemoMode() {
    return localStorage.getItem(KEYS.DEMO_MODE) === 'true';
  },
  setDemoMode(val) {
    localStorage.setItem(KEYS.DEMO_MODE, val.toString());
  },

  getCravingLogs() {
    try {
      const isDemo = this.isDemoMode();
      const data = localStorage.getItem(KEYS.CRAVING_LOGS);
      if (data) return JSON.parse(data);
      return isDemo ? DEMO_SAMPLE_LOGS : []; // Clean Slate by default!
    } catch {
      return [];
    }
  },
  saveCravingLog(entry) {
    const logs = this.getCravingLogs();
    const updated = [entry, ...logs].slice(0, 50);
    localStorage.setItem(KEYS.CRAVING_LOGS, JSON.stringify(updated));
    return updated;
  },

  getJournals() {
    try {
      const data = localStorage.getItem(KEYS.JOURNAL_ENTRIES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  saveJournal(entry) {
    const journals = this.getJournals();
    const updated = [entry, ...journals].slice(0, 30);
    localStorage.setItem(KEYS.JOURNAL_ENTRIES, JSON.stringify(updated));
    return updated;
  },

  getStreakDays() {
    const isDemo = this.isDemoMode();
    const val = localStorage.getItem(KEYS.STREAK_DAYS);
    if (val !== null) return parseInt(val, 10);
    return isDemo ? 14 : 0; // Clean Slate: 0 days for real users, 14 days for judges in Demo Mode!
  },
  setStreakDays(val) {
    localStorage.setItem(KEYS.STREAK_DAYS, val.toString());
  },

  getHighContrast() {
    return localStorage.getItem(KEYS.HIGH_CONTRAST) === 'true';
  },
  setHighContrast(val) {
    localStorage.setItem(KEYS.HIGH_CONTRAST, val.toString());
  }
};
