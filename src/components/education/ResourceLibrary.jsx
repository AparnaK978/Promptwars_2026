import React from 'react';
import { BookOpen, ShieldAlert, HeartHandshake, PhoneCall, ExternalLink, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ResourceLibrary() {
  const { setActiveModal } = useApp();

  const RESOURCES = [
    {
      title: "Harm Reduction & Overdose Prevention",
      desc: "Comprehensive guidelines on Naloxone distribution, fentanyl test strip usage, and safer consumption principles.",
      category: "Safety Protocol",
      linkText: "View Emergency Guide",
      action: () => setActiveModal('emergency_script')
    },
    {
      title: "SAMHSA Treatment Locator (988)",
      desc: "Confidential, 24/7 information service for individuals and family members facing substance use disorders.",
      category: "Helpline",
      linkText: "Call 1-800-662-4357",
      href: "tel:18006624357"
    },
    {
      title: "Urge Surfing & Cognitive Reframing",
      desc: "Neuroscience-backed techniques to ride out intense cravings without acting on impulses.",
      category: "Psychology",
      linkText: "Start Urge Surfing",
      action: () => setActiveModal('breathing')
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="glass-panel p-6 border border-slate-800">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-6 w-6 text-teal-400" />
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">Educational & Harm Reduction Resources</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Evidence-based guidelines, peer support directories, and emergency protocols curated for individuals and caregivers.
        </p>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {RESOURCES.map((res, idx) => (
          <div key={idx} className="glass-card p-5 rounded-2xl border border-slate-800 flex flex-col justify-between hover:border-teal-500/40">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-teal-400 border border-slate-800 inline-block mb-3">
                {res.category}
              </span>
              <h3 className="text-base font-bold text-white mb-2">{res.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{res.desc}</p>
            </div>

            {res.action ? (
              <button
                onClick={res.action}
                className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1.5"
              >
                <span>{res.linkText}</span> →
              </button>
            ) : (
              <a
                href={res.href}
                className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1.5"
              >
                <span>{res.linkText}</span> <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* HIPAA & Security Footer Box */}
      <div className="glass-panel p-5 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
        <Lock className="h-5 w-5 text-teal-400 shrink-0" />
        <div>
          <strong className="text-slate-200">Zero-PII Privacy Commitment:</strong> Beacon AI processes all personal log entries locally in your browser. No medical names, locations, or identity markers are stored on remote servers.
        </div>
      </div>

    </div>
  );
}
