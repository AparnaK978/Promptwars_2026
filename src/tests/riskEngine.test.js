import { describe, it, expect } from 'vitest';
import { calculateRiskAssessment } from '../services/riskEngine';

describe('AI Risk Assessment Engine Unit Tests', () => {
  
  it('should calculate clean slate initial risk correctly', () => {
    const assessment = calculateRiskAssessment({
      streakDays: 0,
      cravingLogs: [],
      profile: { emergencyContacts: [] }
    });

    expect(assessment.score).toBeLessThanOrEqual(50);
    expect(assessment.riskLevel).toBe('High');
  });

  it('should compute Low Relapse Risk for steady streak users', () => {
    const assessment = calculateRiskAssessment({
      streakDays: 30,
      cravingLogs: [
        { intensity: 2, triggers: ['Work Stress'] },
        { intensity: 1, triggers: ['Environmental Cue'] }
      ],
      profile: {
        emergencyContacts: [{ name: 'Priya' }],
        goals: ['Stay sober']
      }
    });

    expect(assessment.score).toBeGreaterThanOrEqual(80);
    expect(assessment.riskLevel).toBe('Low');
    expect(assessment.recommendations[0]).toContain('Celebrate');
  });

  it('should trigger Medium Relapse Risk on moderate craving spike', () => {
    const assessment = calculateRiskAssessment({
      streakDays: 14,
      cravingLogs: [
        { intensity: 5 },
        { intensity: 6 }
      ],
      profile: {
        emergencyContacts: [{ name: 'Priya' }]
      }
    });

    expect(assessment.riskLevel).toBe('Medium');
    expect(assessment.recommendations[0]).toContain('Practice');
  });
});
