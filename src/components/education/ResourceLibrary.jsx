import React from 'react';
import { BookOpen, ShieldAlert, HeartHandshake, PhoneCall, ExternalLink, Lock } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ResourceLibrary() {
  const { setActiveModal, t } = useApp();

  const INDIAN_RESOURCES = [
    {
      title: t('callTeleManas'),
      desc: "Free 24/7 tele-mental health helpline (14446) established by the Government of India for comprehensive psychological counseling.",
      category: "Government Helpline",
      linkText: "Call 14446",
      href: "tel:14446"
    },
    {
      title: "National De-Addiction Helpline",
      desc: "Toll-free helpline (1800-11-0031) operated by Ministry of Social Justice and Empowerment for treatment referrals and counseling.",
      category: "Ministry Helpline",
      linkText: "Call 1800-11-0031",
      href: "tel:1800110031"
    },
    {
      title: "Government De-Addiction Centres & ASHAs",
      desc: "Community-based support through primary health centres, accredited social health activists (ASHAs), and rehabilitation programs.",
      category: "Community Health",
      linkText: "Naloxone / CPR Protocol",
      action: () => setActiveModal('emergency_script')
    }
  ];

  return (
    <div className="space-y-6 pb-20 text-[#243746]">
      
      {/* Header */}
      <div className="healthcare-card p-6 bg-white border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="h-6 w-6 text-[#4F7C82]" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Indian Healthcare & De-Addiction Resources</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 max-w-2xl">
          Verified government helplines, community healthcare workers, and counseling resources across India.
        </p>
      </div>

      {/* Resource Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {INDIAN_RESOURCES.map((res, idx) => (
          <div key={idx} className="healthcare-card p-5 bg-white border border-slate-100 flex flex-col justify-between hover:border-[#4F7C82]/50">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-50 text-[#4F7C82] border border-slate-200 inline-block mb-3">
                {res.category}
              </span>
              <h3 className="text-base font-bold text-slate-900 mb-2">{res.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">{res.desc}</p>
            </div>

            {res.action ? (
              <button
                onClick={res.action}
                className="text-xs font-bold text-[#4F7C82] hover:text-[#3d6065] flex items-center gap-1.5 cursor-pointer text-left"
              >
                <span>{res.linkText}</span> →
              </button>
            ) : (
              <a
                href={res.href}
                className="text-xs font-bold text-[#4F7C82] hover:text-[#3d6065] flex items-center gap-1.5"
              >
                <span>{res.linkText}</span> <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Zero PII Privacy Footer */}
      <div className="healthcare-card p-5 bg-white border border-slate-100 flex items-center gap-3 text-xs text-slate-500">
        <Lock className="h-5 w-5 text-[#4F7C82] shrink-0" />
        <div>
          <strong className="text-slate-900">Zero-PII Commitment:</strong> All check-in logs and voice journals stay encrypted locally in your browser. No personal data is transmitted to external servers.
        </div>
      </div>

    </div>
  );
}
