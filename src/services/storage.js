// LocalStorage privacy-first storage manager for zero-PII retention

const KEYS = {
  ROLE: 'beacon_user_role',
  CRAVING_LOGS: 'beacon_craving_logs',
  JOURNAL_ENTRIES: 'beacon_journals',
  STREAK_DAYS: 'beacon_streak_days',
  HIGH_CONTRAST: 'beacon_high_contrast'
};

export const StorageService = {
  getRole() {
    return localStorage.getItem(KEYS.ROLE) || 'individual';
  },
  setRole(role) {
    localStorage.setItem(KEYS.ROLE, role);
  },

  getCravingLogs() {
    try {
      const data = localStorage.getItem(KEYS.CRAVING_LOGS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },
  saveCravingLog(entry) {
    const logs = this.getCravingLogs();
    const updated = [entry, ...logs].slice(0, 50); // Keep last 50 logs
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
    const val = localStorage.getItem(KEYS.STREAK_DAYS);
    return val ? parseInt(val, 10) : 14; // Default demo streak: 14 days
  },
  incrementStreak() {
    const current = this.getStreakDays();
    localStorage.setItem(KEYS.STREAK_DAYS, (current + 1).toString());
    return current + 1;
  },

  getHighContrast() {
    return localStorage.getItem(KEYS.HIGH_CONTRAST) === 'true';
  },
  setHighContrast(val) {
    localStorage.setItem(KEYS.HIGH_CONTRAST, val.toString());
  }
};
