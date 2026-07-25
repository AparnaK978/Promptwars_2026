// AI Recovery Profile & Relapse Risk Assessment Engine

export function calculateRiskAssessment({ streakDays, cravingLogs = [], profile = {} }) {
  // Base recovery points from streak days
  const streakPoints = Math.min(40, streakDays * 2.5); // Max 40 points

  // Recent craving intensity analysis (last 7 logs)
  const recentLogs = cravingLogs.slice(0, 7);
  const avgIntensity = recentLogs.length > 0
    ? recentLogs.reduce((acc, log) => acc + (log.intensity || 5), 0) / recentLogs.length
    : 3; // Default baseline intensity

  // Craving stability points (max 30 points)
  const cravingPoints = Math.max(0, 30 - (avgIntensity * 3));

  // Logging engagement points (max 20 points)
  const engagementPoints = Math.min(20, cravingLogs.length * 4);

  // Profile readiness bonus (max 10 points)
  const profileBonus = (profile.emergencyContacts?.length ? 5 : 0) + (profile.goals?.length ? 5 : 0);

  // Total Recovery Score (0 - 100)
  const score = Math.min(100, Math.round(streakPoints + cravingPoints + engagementPoints + profileBonus));

  // Determine Risk Level
  let riskLevel = 'Low';
  let riskColor = 'text-teal-400 border-teal-500/30 bg-teal-500/10';
  let gaugeColor = '#0d9488';

  if (score < 55 || avgIntensity >= 7) {
    riskLevel = 'High';
    riskColor = 'text-rose-400 border-rose-500/30 bg-rose-500/10';
    gaugeColor = '#e11d48';
  } else if (score < 78 || avgIntensity >= 5) {
    riskLevel = 'Medium';
    riskColor = 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    gaugeColor = '#f59e0b';
  }

  // Contributing Factors
  const factors = [];
  if (avgIntensity >= 6) factors.push(`Elevated craving intensity (avg ${avgIntensity.toFixed(1)}/10 in recent logs)`);
  if (streakDays < 7) factors.push('Early stage recovery phase (< 7 consecutive days)');
  if (!profile.emergencyContacts || profile.emergencyContacts.length === 0) factors.push('Missing emergency caregiver contacts');
  if (profile.triggers && profile.triggers.includes('High Work Stress')) factors.push('Active work stress trigger flagged in profile');
  if (factors.length === 0) factors.push('Consistent grounding usage & stable craving control');

  // Personalized Recommendations
  const recommendations = [];
  if (riskLevel === 'High') {
    recommendations.push('Initiate 4-7-8 Urge Surfing breathing immediately');
    recommendations.push('Alert designated caregiver or recovery counselor');
    recommendations.push('Schedule 15 minutes of hands-free voice journaling');
  } else if (riskLevel === 'Medium') {
    recommendations.push('Review personal trigger list and practice 5-4-3-2-1 sensory grounding');
    recommendations.push('Maintain evening check-in routine');
  } else {
    recommendations.push('Celebrate recovery milestone and share progress with sponsor');
    recommendations.push('Explore harm reduction & boundary-setting educational cards');
  }

  return {
    score,
    riskLevel,
    riskColor,
    gaugeColor,
    avgIntensity: avgIntensity.toFixed(1),
    factors,
    recommendations
  };
}
