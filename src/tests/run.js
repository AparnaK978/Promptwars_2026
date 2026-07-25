// Clean standalone test runner for Node 14 compatibility
import assert from 'assert';
import { calculateRiskAssessment } from '../services/riskEngine.js';
import { getTranslation } from '../services/i18n.js';

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

  console.log("=========================================");
  console.log("🎉 All Tests Passed Cleanly (100% Success)");
  console.log("=========================================");
  process.exit(0);
} catch (e) {
  console.error("❌ Test Suite Failed with Error:");
  console.error(e);
  process.exit(1);
}
