import React from 'react';
import { Shield, Volume2, Users, HeartHandshake, HelpCircle, PhoneCall, Sparkles, ArrowRight, MessageCircle } from 'lucide-react';

export function LandingPage({ onStart, onStartCaregiver }) {
  
  const FAQS = [
    {
      q: "How does the voice recovery companion help during a craving?",
      a: "During moments of high anxiety or acute cravings, reading or typing on a screen can increase cognitive overwhelm. By tapping once and speaking naturally, the companion immediately guides you through grounding exercises, helping you navigate the urge calmly."
    },
    {
      q: "Is my personal recovery data secure and private?",
      a: "Yes. We maintain a zero-PII policy. All daily check-ins, transcripts, and personal logs stay saved directly within your browser's local cache. No data is shared with external tracking services."
    },
    {
      q: "Can caregivers access support tools?",
      a: "Absolutely. Caregivers have a dedicated workspace featuring AI de-escalation guides to communicate safely during family stress, boundary templates, and emergency guides."
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800 font-sans selection:bg-teal-500 selection:text-white">
      
      {/* Premium Top Navigation */}
      <header className="border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-teal-600 flex items-center justify-center shadow-md">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-slate-900">BEACON</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#crisis-support" className="text-xs font-bold text-rose-600 hover:text-rose-700">Crisis Support</a>
            <button
              onClick={onStart}
              className="px-4.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors shadow-sm"
            >
              Launch Companion
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-6 py-16 md:py-24 text-center max-w-4xl mx-auto">
        <span className="text-[10px] font-extrabold uppercase tracking-widest px-3.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-100 inline-block mb-4">
          Compassionate Recovery Assistance
        </span>
        <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight">
          Your calm, voice-first <br />
          <span className="text-teal-600">recovery companion</span>
        </h1>
        <p className="text-sm sm:text-base text-slate-600 mt-6 max-w-2xl mx-auto leading-relaxed">
          Beacon is a premium, trust-focused recovery tool designed to lower cognitive load during crisis. Built for individuals navigating recovery and their loved ones in India.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8">
          <button
            onClick={onStart}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Begin Recovery Journey</span>
            <ArrowRight className="h-4 w-4" />
          </button>
          <button
            onClick={onStartCaregiver}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-sm shadow-sm transition-all"
          >
            I'm a Caregiver
          </button>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white border-y border-slate-100 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600">Our Mission</span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-2">Compassion Meets Safety</h2>
          <p className="text-sm sm:text-base text-slate-600 mt-4 leading-relaxed max-w-2xl mx-auto">
            Recovery isn’t a productivity dashboard or a chatbot checklist. We believe in providing a calming, zero-friction space where you can express feelings naturally without the pressure of typing.
          </p>
        </div>
      </section>

      {/* Why Voice-First Section */}
      <section className="px-6 py-16 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-teal-600">Why Voice-First Matters</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display mt-2">Designed for Moments of Crisis</h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-4 leading-relaxed">
              When stress spikes, the cognitive capacity to read fine print or write text decays. Beacon is centered around a large primary voice assistant button. Speak freely, and let our companion guide you with clear, synthesized voice instructions.
            </p>
          </div>
          <div className="healthcare-card p-6 border border-slate-100 bg-slate-50/50 flex flex-col justify-between">
            <Volume2 className="h-10 w-10 text-teal-600 mb-4" />
            <h3 className="font-bold text-slate-900 text-sm">Empathetic Audio Guidance</h3>
            <p className="text-xs text-slate-500 mt-1">Grounding instructions spoken back to you in your preferred language and tone.</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white border-y border-slate-100 px-6 py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-slate-900 font-display mb-10">Carefully Crafted Features</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="healthcare-card p-6">
              <Sparkles className="h-8 w-8 text-teal-600 mb-4" />
              <h3 className="font-bold text-sm text-slate-900 mb-2">Zero-Typing Grounding</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Log craving intensity and check triggers in seconds using clear visual dials.</p>
            </div>

            <div className="healthcare-card p-6">
              <Users className="h-8 w-8 text-purple-500 mb-4" />
              <h3 className="font-bold text-sm text-slate-900 mb-2">Caregiver Assistance</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Dynamic verbal guides to help loved ones manage stressful recovery conversations.</p>
            </div>

            <div className="healthcare-card p-6">
              <HeartHandshake className="h-8 w-8 text-rose-500 mb-4" />
              <h3 className="font-bold text-sm text-slate-900 mb-2">Safety Scanner</h3>
              <p className="text-xs text-slate-600 leading-relaxed">Identify recovery resources or guidelines instantly using visual camera inputs.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-6 py-16 max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold text-slate-900 font-display mb-8">Personal Stories</h2>
        <div className="healthcare-card p-8 bg-slate-50/50 border border-slate-100 max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm italic text-slate-700 leading-relaxed">
            "During my early recovery months, opening a text-heavy application felt exhausting. Tapping once to do grounding exercises in Hindi saved me from relapse twice."
          </p>
          <div className="font-bold text-xs text-slate-900 mt-4">— Rajesh K., Bangalore</div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white border-t border-slate-100 px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-900 font-display mb-8 flex items-center justify-center gap-2">
            <HelpCircle className="h-6 w-6 text-teal-600" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="border-b border-slate-100 pb-4">
                <h3 className="font-bold text-slate-900 text-sm">{faq.q}</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Crisis Support Section */}
      <section id="crisis-support" className="emergency-accent-card max-w-4xl mx-auto my-12 p-6 sm:p-8 text-center mx-6">
        <PhoneCall className="h-10 w-10 text-rose-600 mx-auto mb-4 animate-bounce" />
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Need Immediate Help?</h2>
        <p className="text-xs text-slate-600 mt-2 max-w-lg mx-auto">
          If you or your loved one is experiencing a medical crisis, overdose suspect, or acute distress, contact the free 24/7 National Emergency lines immediately.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3.5 mt-6">
          <a
            href="tel:112"
            className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md transition-colors"
          >
            Call National Emergency (112)
          </a>
          <a
            href="tel:14446"
            className="px-5 py-2.5 rounded-xl bg-slate-950 text-white font-bold text-xs hover:bg-slate-900 transition-colors"
          >
            Call Tele-MANAS (14446)
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-100 py-8 px-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Beacon Digital Health India. Dedicated to safety, compassion, and recovery.</p>
          <div className="flex gap-4">
            <a href="tel:1800110031" className="hover:underline">De-Addiction Helpline</a>
            <span>•</span>
            <a href="tel:108" className="hover:underline">Ambulance (108)</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
