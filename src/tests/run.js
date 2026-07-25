// Clean standalone test runner for Node 14 compatibility
import assert from 'assert';
import { calculateRiskAssessment } from '../services/riskEngine.js';
import { getTranslation } from '../services/i18n.js';
import { AuthService } from '../services/auth.js';

// Simple mock for browser localStorage in Node test runner
const storage = {};
global.localStorage = {
  getItem: (key) => storage[key] || null,
  setItem: (key, val) => { storage[key] = String(val); },
  removeItem: (key) => { delete storage[key]; },
  clear: () => { Object.keys(storage).forEach(k => delete storage[k]); }
};

console.log("=========================================");
console.log("🏃 Running Automated Healthcare Test Suite");
console.log("=========================================\n");

try {
  // Test 1: i18n translation checks
  console.log("🧪 Running: i18n translation resolver tests...");
  const englishWelcome = getTranslation('English', 'welcome');
  assert.strictEqual(englishWelcome, 'Welcome, Friend');

  const hindiWelcome = getTranslation('Hindi', 'welcome');
  assert.strictEqual(hindiWelcome, 'नमस्ते, मित्र');

  const malayalamWelcome = getTranslation('Malayalam', 'welcome');
  assert.strictEqual(malayalamWelcome, 'സ്വാഗതം, സുഹൃത്തേ');

  const tamilWelcome = getTranslation('Tamil', 'welcome');
  assert.strictEqual(tamilWelcome, 'வரவேற்கிறோம், நண்பரே');

  const kannadaWelcome = getTranslation('Kannada', 'welcome');
  assert.strictEqual(kannadaWelcome, 'ಸ್ವಾಗತ, ಮಿತ್ರರೇ');

  const teluguWelcome = getTranslation('Telugu', 'welcome');
  assert.strictEqual(teluguWelcome, 'స్వాగతం, మిత్రమా');

  const fallback = getTranslation('Telugu', 'non_existent_key');
  assert.strictEqual(fallback, 'non_existent_key');
  console.log("✅ i18n translation tests passed!\n");

  // Test 2: AI Relapse Risk Engine checks
  console.log("🧪 Running: AI Relapse Risk assessment tests...");
  const cleanSlate = calculateRiskAssessment({
    streakDays: 0,
    cravingLogs: [],
    profile: { emergencyContacts: [] }
  });
  assert.strictEqual(cleanSlate.riskLevel, 'High');
  assert.ok(cleanSlate.score <= 50);

  const lowRisk = calculateRiskAssessment({
    streakDays: 30,
    cravingLogs: [
      { intensity: 2, triggers: ['Work Stress'] },
      { intensity: 1 }
    ],
    profile: {
      emergencyContacts: [{ name: 'Priya' }],
      goals: ['Stay sober']
    }
  });
  assert.strictEqual(lowRisk.riskLevel, 'Low');
  assert.ok(lowRisk.score >= 80);
  console.log("✅ AI Relapse Risk engine tests passed!\n");

  // Test 3: Email Sign Up & Login checks
  console.log("🧪 Running: Email Auth Service validation tests...");
  localStorage.clear();
  
  const signUpRes = AuthService.signup('Aparna', 'krishnakumaraparna978@gmail.com', 'testpassword123');
  assert.strictEqual(signUpRes.session.isLoggedIn, true);
  assert.strictEqual(signUpRes.session.isGuest, false);
  assert.strictEqual(signUpRes.profile.name, 'Aparna');
  
  const loginRes = AuthService.login('krishnakumaraparna978@gmail.com', 'testpassword123');
  assert.strictEqual(loginRes.isLoggedIn, true);
  assert.strictEqual(loginRes.isGuest, false);
  
  AuthService.logout();
  const session = AuthService.getCurrentSession();
  assert.strictEqual(session.isLoggedIn, false);
  console.log("✅ Email Auth Service tests passed!\n");

  // Test 4: Guest Mode & Onboarding completion tests
  console.log("🧪 Running: Guest Mode & Onboarding checks...");
  localStorage.clear();
  const guestRes = AuthService.loginAsGuest();
  assert.strictEqual(guestRes.session.isLoggedIn, true);
  assert.strictEqual(guestRes.session.isGuest, true);
  assert.ok(guestRes.profile.name.includes("Guest"));

  // Trigger Onboarding completes
  const onboardingProfile = {
    role: 'caregiver',
    language: 'Tamil',
    preferredVoice: 'calm_male',
    goal: 'Support loved one'
  };
  AuthService.completeOnboarding(onboardingProfile);
  const updatedProf = AuthService.getUserProfile();
  assert.strictEqual(updatedProf.role, 'caregiver');
  assert.strictEqual(updatedProf.language, 'Tamil');
  assert.strictEqual(AuthService.isOnboardingComplete(), true);
  console.log("✅ Guest Mode & Onboarding tests passed!\n");

  console.log("=========================================");
  console.log("🎉 All Tests Passed Cleanly (100% Success)");
  console.log("=========================================");
  process.exit(0);
} catch (e) {
  console.error("❌ Test Suite Failed with Error:");
  console.error(e);
  process.exit(1);
}
