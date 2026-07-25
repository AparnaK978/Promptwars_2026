import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Volume2, Users, HeartHandshake, HelpCircle, PhoneCall, Sparkles, ArrowRight, BookOpen, Clock, Heart, ShieldCheck, Check } from 'lucide-react';

export function LandingPage({ onStart, onStartCaregiver, onStartDemo }) {
  const { t } = useApp();

  const FEATURES = [
    {
      title: t('individualRole'),
      desc: t('individualSub'),
      icon: Volume2,
      color: "text-[#4F7C82] bg-[#F0F5F6]"
    },
    {
      title: t('idle'),
      desc: t('tapToSpeak'),
      icon: Heart,
      color: "text-[#4F7C82] bg-[#F0F5F6]"
    },
    {
      title: t('voiceCompanion'),
      desc: t('processing'),
      icon: Sparkles,
      color: "text-[#4F7C82] bg-[#F0F5F6]"
    },
    {
      title: t('emergencySOS'),
      desc: t('crisisHelp'),
      icon: Shield,
      color: "text-[#D65A5A] bg-[#FDF6F6]"
    },
    {
      title: t('caregiversTitle'),
      desc: t('caregiversDesc'),
      icon: Users,
      color: "text-[#4F7C82] bg-[#F0F5F6]"
    },
    {
      title: t('commSupport'),
      desc: t('commSupportDesc'),
      icon: HeartHandshake,
      color: "text-[#4F7C82] bg-[#F0F5F6]"
    }
  ];

  const RESOURCES = [
    { title: t('copingStr'), desc: t('copingStrDesc'), tag: t('aiTab') },
    { title: t('relapsePrev'), desc: t('relapsePrevDesc'), tag: t('recoveryTab') },
    { title: t('commSupport'), desc: t('commSupportDesc'), tag: t('getHelp') },
    { title: t('recPlans'), desc: t('recPlansDesc'), tag: t('profileTab') }
  ];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-[#243746] font-sans selection:bg-[#4F7C82] selection:text-white">
      
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#4F7C82] flex items-center justify-center shadow-sm">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-lg font-bold tracking-tight text-[#243746]">BEACON</span>
          </div>

          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-500">
            <a href="#how-it-works" className="hover:text-[#4F7C82]">{t('howItWorks')}</a>
            <a href="#features" className="hover:text-[#4F7C82]">{t('features')}</a>
            <a href="#resources" className="hover:text-[#4F7C82]">{t('resourcesTab')}</a>
            <a href="#caregivers" className="hover:text-[#4F7C82]">{t('caregivers')}</a>
            <a href="#crisis-support" className="text-rose-600 hover:text-rose-700">{t('emergencySOS')}</a>
          </nav>

          <button
            onClick={onStart}
            className="px-4.5 py-2 rounded-xl bg-[#4F7C82] hover:bg-[#3d6065] text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
          >
            {t('getStarted')}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#E5ECEB] text-[#2F4D51] border border-slate-200 inline-block mb-4">
            {t('voiceCompanion')}
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight text-[#243746]">
            {t('heroTitle')}
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] mt-6 leading-relaxed max-w-md">
            {t('heroSubtitle')}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={onStart}
              className="px-6 py-3.5 rounded-2xl bg-[#4F7C82] hover:bg-[#3d6065] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t('getStarted')}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            
            <button
              onClick={onStartDemo}
              className="px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              {t('tryDemo')}
            </button>
          </div>
        </div>

        {/* Calm Graphic Representation */}
        <div className="healthcare-card p-8 bg-white border border-slate-100 flex flex-col justify-between h-80 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Shield className="h-48 w-48 text-[#4F7C82]" />
          </div>
          <div>
            <div className="h-10 w-10 rounded-full bg-[#F0F5F6] flex items-center justify-center text-[#4F7C82] mb-4">
              <Sparkles className="h-5 w-5" />
            </div>
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">{t('welcome')}</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed max-w-xs">
              {t('idle')}
            </p>
          </div>
          <div className="text-[10px] font-semibold text-slate-400">
            🛡️ {t('anonymousDesc')}
          </div>
        </div>
      </section>

      {/* How It Works - Visual Timeline */}
      <section id="how-it-works" className="bg-[#F4F7F5] border-y border-[#A7C4A0]/20 px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#4F7C82]">{t('howItWorks')}</span>
          <h2 className="font-serif text-3xl font-bold text-[#243746] mt-1 mb-10">{t('howItWorksSub')}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative">
            {[
              { num: "1", title: t('step1Title'), desc: t('step1Desc') },
              { num: "2", title: t('step2Title'), desc: t('step2Desc') },
              { num: "3", title: t('step3Title'), desc: t('step3Desc') },
              { num: "4", title: t('step4Title'), desc: t('step4Desc') }
            ].map((step, idx) => (
              <div key={idx} className="healthcare-card p-5 bg-white border border-slate-100 text-center relative z-10">
                <div className="h-8 w-8 rounded-full bg-[#F0F5F6] text-[#4F7C82] flex items-center justify-center font-bold text-xs mx-auto mb-3">
                  {step.num}
                </div>
                <h3 className="font-bold text-xs text-[#243746] mb-1">{step.title}</h3>
                <p className="text-[11px] text-[#6B7280] leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#4F7C82]">{t('features')}</span>
          <h2 className="font-serif text-3xl font-bold text-[#243746] mt-1">{t('featuresSub')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="healthcare-card p-6 bg-white border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center mb-4 ${feat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-sm text-[#243746] mb-1.5">{feat.title}</h3>
                  <p className="text-xs text-[#6B7280] leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Resource Library */}
      <section id="resources" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#4F7C82]">{t('resourcesTab')}</span>
          <h2 className="font-serif text-3xl font-bold text-[#243746] mt-1">{t('copingStr')}</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {RESOURCES.map((res, idx) => (
            <div key={idx} className="healthcare-card p-5 bg-white border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#4F7C82] mb-2 inline-block">
                  {res.tag}
                </span>
                <h3 className="font-bold text-xs text-[#243746] mb-1">{res.title}</h3>
                <p className="text-[11px] text-[#6B7280] leading-relaxed">{res.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Caregiver Section */}
      <section id="caregivers" className="bg-white border-y border-slate-100 px-6 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-purple-600">{t('caregivers')}</span>
            <h2 className="font-serif text-3xl font-bold text-[#243746] mt-2">{t('caregiversTitle')}</h2>
            <p className="text-xs sm:text-sm text-[#6B7280] mt-4 leading-relaxed">
              {t('caregiversDesc')}
            </p>
            <button
              onClick={onStartCaregiver}
              className="mt-6 px-5 py-2.5 rounded-xl border border-purple-200 hover:bg-purple-50 text-purple-700 font-bold text-xs transition-colors"
            >
              {t('accessCaregiverTools')}
            </button>
          </div>
          <div className="healthcare-card p-6 bg-slate-50/50 border border-slate-100">
            <h3 className="font-serif text-base font-bold text-slate-900 mb-2">{t('boundaryTitle')}</h3>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              {t('boundaryDesc')}
            </p>
          </div>
        </div>
      </section>

      {/* Crisis Support Section */}
      <section id="crisis-support" className="healthcare-card bg-[#FDF6F6] border border-[#D65A5A]/30 max-w-4xl mx-auto my-12 p-6 sm:p-8 text-center mx-6">
        <PhoneCall className="h-10 w-10 text-[#D65A5A] mx-auto mb-4 animate-bounce" />
        <h2 className="font-serif text-2xl font-bold text-slate-950">{t('crisisTitle')}</h2>
        <p className="text-xs text-[#6B7280] mt-2 max-w-lg mx-auto leading-relaxed">
          {t('crisisDesc')}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <a
            href="tel:112"
            className="px-5 py-2.5 rounded-xl bg-[#D65A5A] hover:bg-[#be4f4f] text-white font-bold text-xs shadow-md transition-colors"
          >
            {t('callEmergency')}
          </a>
          <a
            href="tel:14446"
            className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold text-xs hover:bg-slate-900 transition-colors"
          >
            {t('callTeleManas')}
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-100 py-10 px-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <p>© 2026 Beacon Digital Health India. {t('anonymousDesc')}</p>
          <div className="flex gap-4">
            <a href="tel:1800110031" className="hover:underline">De-Addiction Support</a>
            <span>•</span>
            <a href="tel:108" className="hover:underline">{t('callAmbulance')}</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
