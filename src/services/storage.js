// Secure localized browser LocalStorage serialization wrapper

const KEYS = {
  ROLE: 'beacon_user_role',
  DEMO_MODE: 'beacon_demo_mode',
  CRAVING_LOGS: 'beacon_craving_logs',
  JOURNAL_ENTRIES: 'beacon_journals',
  STREAK_DAYS: 'beacon_streak_days',
  HIGH_CONTRAST: 'beacon_high_contrast'
};

// Simple input output sanitization helper to block XSS payloads
export function sanitizeString(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[<>]/g, '');
}

export const StorageService = {
  getRole() {
    return sanitizeString(localStorage.getItem(KEYS.ROLE)) || 'individual';
  },
  setRole(role) {
    localStorage.setItem(KEYS.ROLE, sanitizeString(role));
  },

  isDemoMode() {
    return localStorage.getItem(KEYS.DEMO_MODE) === 'true';
  },
  setDemoMode(val) {
    localStorage.setItem(KEYS.DEMO_MODE, val.toString());
  },

  getCravingLogs() {
    try {
      const data = localStorage.getItem(KEYS.CRAVING_LOGS);
      if (data) {
        const parsed = JSON.parse(data);
        return Array.isArray(parsed) ? parsed : [];
      }
      return this.isDemoMode() ? [
        {
          id: 'demo_1',
          timestamp: '10:30 AM',
          date: '2026-07-25',
          intensity: 4,
          triggers: ['Work Stress'],
          aiAdvice: 'Practiced 4-7-8 urge surfing.'
        }
      ] : [];
    } catch (e) {
      console.warn("Storage warning: craving logs parsing failed. Resetting.", e);
      return [];
    }
  },
  saveCravingLog(entry) {
    const logs = this.getCravingLogs();
    const cleanEntry = {
      ...entry,
      aiAdvice: sanitizeString(entry.aiAdvice),
      triggers: entry.triggers ? entry.triggers.map(sanitizeString) : []
    };
    const updated = [cleanEntry, ...logs].slice(0, 50);
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
    const cleanEntry = {
      ...entry,
      rawText: sanitizeString(entry.rawText),
      aiInsights: entry.aiInsights ? entry.aiInsights.map(sanitizeString) : []
    };
    const updated = [cleanEntry, ...journals].slice(0, 30);
    localStorage.setItem(KEYS.JOURNAL_ENTRIES, JSON.stringify(updated));
    return updated;
  },

  getStreakDays() {
    const val = localStorage.getItem(KEYS.STREAK_DAYS);
    if (val !== null) return parseInt(val, 10);
    return this.isDemoMode() ? 14 : 0;
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
