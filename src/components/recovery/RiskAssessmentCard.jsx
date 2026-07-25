import React from 'react';
import { useApp } from '../../context/AppContext';
import { calculateRiskAssessment } from '../../services/riskEngine';
import { ShieldCheck, AlertTriangle, Activity, Sparkles, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

export function RiskAssessmentCard() {
  const { streakDays, cravingLogs, userProfile, setActiveModal } = useApp();

  const assessment = calculateRiskAssessment({
    streakDays,
    cravingLogs,
    profile: userProfile
  });

  return (
    <div className="glass-panel p-6 border border-slate-800 mb-6 bg-gradient-to-br from-slate-950 via-slate-900/90 to-slate-950">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-teal-400 mb-1">
            <Activity className="h-5 w-5" />
            <span className="text-xs uppercase font-extrabold tracking-wider">AI Recovery Profile Engine</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">Real-Time Relapse Risk Assessment</h2>
        </div>

        <div className={`px-4 py-1.5 rounded-full border text-xs font-extrabold flex items-center gap-2 ${assessment.riskColor}`}>
          <AlertTriangle className="h-4 w-4" />
          <span>Relapse Risk: {assessment.riskLevel}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Score Dial / Gauge */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-center">
          <div className="relative my-2">
            <svg className="w-32 h-32">
              <circle
                cx="64"
                cy="64"
                r="52"
                stroke="#1e293b"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="64"
                cy="64"
                r="52"
                stroke={assessment.gaugeColor}
                strokeWidth="10"
                fill="transparent"
                strokeDasharray="326"
                strokeDashoffset={326 - (326 * assessment.score) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-black font-display text-white">{assessment.score}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Score / 100</span>
            </div>
          </div>
          <div className="text-xs font-semibold text-slate-300 mt-2">
            Avg Urge Level: <span className="text-teal-400 font-bold">{assessment.avgIntensity}/10</span>
          </div>
        </div>

        {/* Contributing Risk Factors */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-teal-400" />
              Contributing Risk Factors
            </h3>
            <ul className="space-y-2">
              {assessment.factors.map((factor, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-teal-400 mt-0.5">•</span>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" />
              Personalized AI Recommendations
            </h3>
            <div className="space-y-2 mb-4">
              {assessment.recommendations.map((rec, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-200 font-medium flex items-center justify-between gap-2">
                  <span>{rec}</span>
                  <CheckCircle2 className="h-3.5 w-3.5 text-teal-400 shrink-0" />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveModal('breathing')}
            className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs shadow-md shadow-teal-500/20 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Execute Interventions</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
}
