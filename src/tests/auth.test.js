import { describe, it, expect, beforeEach } from 'vitest';
import { AuthService, CLEAN_SLATE_PROFILE } from '../services/auth';

describe('Auth Service & Onboarding Unit Tests', () => {
  
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return default clean slate session by default', () => {
    const session = AuthService.getCurrentSession();
    expect(session.isLoggedIn).toBe(false);
    expect(session.isGuest).toBe(false);
  });

  it('should initialize clean slate profile correctly', () => {
    const profile = AuthService.getUserProfile();
    expect(profile.name).toBe('User');
    expect(profile.role).toBe('individual');
    expect(profile.isDemo).toBe(false);
  });

  it('should enable judge Demo Mode cleanly', () => {
    const { session, profile } = AuthService.enableDemoMode();
    expect(session.isLoggedIn).toBe(true);
    expect(session.isDemo).toBe(true);
    expect(profile.name).toBe('Rahul Sharma');
    expect(profile.language).toBe('English');
  });

  it('should log out user cleanly', () => {
    AuthService.loginAsGuest();
    AuthService.logout();
    const session = AuthService.getCurrentSession();
    expect(session.isLoggedIn).toBe(false);
  });
});
