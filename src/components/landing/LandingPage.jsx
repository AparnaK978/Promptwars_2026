import React from 'react';
import { Shield, Volume2, Users, HeartHandshake, HelpCircle, PhoneCall, Sparkles, ArrowRight, BookOpen, Clock, Heart, ShieldCheck, Check } from 'lucide-react';

export function LandingPage({ onStart, onStartCaregiver, onStartDemo }) {
  
  const FEATURES = [
    {
      title: "Voice-First Support",
      desc: "Minimizes cognitive load during stress. Speak naturally to receive grounding feedback.",
      icon: Volume2,
      color: "text-[#4F7C82] bg-[#F0F5F6]"
    },
    {
      title: "Zero-Typing Check-in",
      desc: "Quick 1-to-10 visual sliders and trigger cards designed for high-anxiety moments.",
      icon: Heart,
      color: "text-[#4F7C82] bg-[#F0F5F6]"
    },
    {
      title: "Compassionate Guidance",
      desc: "Empathetic recovery coaching without technical jargon, shaming, or diagnosis.",
      icon: Sparkles,
      color: "text-[#4F7C82] bg-[#F0F5F6]"
    },
    {
      title: "Emergency Care Scripts",
      desc: "Step-by-step CPR & Naloxone protocols with simple, responsive timers.",
      icon: Shield,
      color: "text-[#D65A5A] bg-[#FDF6F6]"
    },
    {
      title: "Caregiver Support",
      desc: "Actionable de-escalation statements to help family members communicate safely.",
      icon: Users,
      color: "text-[#4F7C82] bg-[#F0F5F6]"
    },
    {
      title: "Local Resource Hub",
      desc: "Direct guidance on government de-addiction centers, counseling, and Tele-MANAS support.",
      icon: HeartHandshake,
      color: "text-[#4F7C82] bg-[#F0F5F6]"
    }
  ];

  const RESOURCES = [
    { title: "Coping Strategies", desc: "Neuroscience-backed tools to ride out urges.", tag: "Mindfulness" },
    { title: "Relapse Prevention", desc: "Build action plans for triggering situations.", tag: "Safety" },
    { title: "Community Support", desc: "Learn about local support groups and counseling.", tag: "Local Care" },
    { title: "Recovery Plans", desc: "Create boundaries and health goals at your pace.", tag: "Wellness" }
  ];

  const FAQS = [
    {
      q: "What makes the voice companion different from a normal chatbot?",
      a: "Traditional text interfaces require intense reading and typing concentration, which decays during craving or panic spikes. Beacon utilizes Speech-to-Text and calm audio synthesis to allow hands-free communication during acute distress."
    },
    {
      q: "Is Anonymous Guest Mode completely private?",
      a: "Yes. Our platform uses client-side encryption. All check-in logs, timeline history, and journals are stored locally in your browser's cache. No personal metadata or records are stored on our servers."
    },
    {
      q: "Are the emergency helplines adapted for India?",
      a: "Yes. Emergency dial guides link directly to National Emergency (112), Medical Emergency (108), Tele-MANAS (14446), and the Ministry of Social Justice De-Addiction helpline."
    }
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
            <a href="#how-it-works" className="hover:text-[#4F7C82]">How It Works</a>
            <a href="#features" className="hover:text-[#4F7C82]">Features</a>
            <a href="#resources" className="hover:text-[#4F7C82]">Resources</a>
            <a href="#caregivers" className="hover:text-[#4F7C82]">Caregivers</a>
            <a href="#crisis-support" className="text-rose-600 hover:text-rose-700">Crisis Support</a>
          </nav>

          <button
            onClick={onStart}
            className="px-4.5 py-2 rounded-xl bg-[#4F7C82] hover:bg-[#3d6065] text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-[#E5ECEB] text-[#2F4D51] border border-slate-200 inline-block mb-4">
            Compassionate Digital Support
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight tracking-tight text-[#243746]">
            Recovery begins <br />
            with <span className="text-[#4F7C82]">one safe conversation</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-6 leading-relaxed max-w-md">
            Beacon is a premium, trust-focused recovery companion built for India. Lower cognitive load during distress with simple, voice-first tools.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={onStart}
              className="px-6 py-3.5 rounded-2xl bg-[#4F7C82] hover:bg-[#3d6065] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            
            <button
              onClick={onStartDemo}
              className="px-6 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-sm transition-all cursor-pointer"
            >
              Try Demo Experience
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
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">Private & Compassionate Space</h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Interact without shame or judgment. Built with psychological safety and strict data sovereignty.
            </p>
          </div>
          <div className="text-[10px] font-semibold text-slate-400">
            🛡️ Local Browser Storage Only • No Credentials Required
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-white border-y border-slate-100 px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#4F7C82]">Our Core Mission</span>
          <h2 className="font-serif text-3xl font-bold text-[#243746] mt-2">Compassion Over Complexity</h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-4 leading-relaxed max-w-2xl mx-auto">
            Substance use disorder recovery is a journey of quiet victories. Beacon replaces technical complexity with soft whitespace, visual check-ins, and local support resources designed to reassure and guide.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#4F7C82]">Platform Capabilities</span>
          <h2 className="font-serif text-3xl font-bold text-[#243746] mt-1">Carefully Crafted Recovery Features</h2>
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
                  <p className="text-xs text-slate-500 leading-relaxed">{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works - Visual Timeline */}
      <section id="how-it-works" className="bg-[#F4F7F5] border-y border-[#A7C4A0]/20 px-6 py-16">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#4F7C82]">Process Flow</span>
          <h2 className="font-serif text-3xl font-bold text-[#243746] mt-1 mb-10">How the Companion Works</h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative">
            {[
              { num: "1", title: "Speak Naturally", desc: "Tap once and share your current feelings aloud." },
              { num: "2", title: "Context Assessment", desc: "Active goals, triggers, and streak context are built." },
              { num: "3", title: "Empathetic Guidance", desc: "Companion generates soft, focused verbal techniques." },
              { num: "4", title: "Ongoing Support", desc: "Coping advice resolves cleanly with local resources." }
            ].map((step, idx) => (
              <div key={idx} className="healthcare-card p-5 bg-white border border-slate-100 text-center relative z-10">
                <div className="h-8 w-8 rounded-full bg-[#F0F5F6] text-[#4F7C82] flex items-center justify-center font-bold text-xs mx-auto mb-3">
                  {step.num}
                </div>
                <h3 className="font-bold text-xs text-[#243746] mb-1">{step.title}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Library */}
      <section id="resources" className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#4F7C82]">Education Hub</span>
          <h2 className="font-serif text-3xl font-bold text-[#243746] mt-1">Explore Resources & Coping Tools</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {RESOURCES.map((res, idx) => (
            <div key={idx} className="healthcare-card p-5 bg-white border border-slate-100 flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#4F7C82] mb-2 inline-block">
                  {res.tag}
                </span>
                <h3 className="font-bold text-xs text-[#243746] mb-1">{res.title}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">{res.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Caregiver Section */}
      <section id="caregivers" className="bg-white border-y border-slate-100 px-6 py-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-purple-600">Caregiver Assistance</span>
            <h2 className="font-serif text-3xl font-bold text-[#243746] mt-2">Support for Loved Ones</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-4 leading-relaxed">
              Caregivers navigate their own stress and uncertainty. Beacon provides verbal de-escalation builders to help family members communicate safely, boundary-setting scripts, and crisis guides.
            </p>
            <button
              onClick={onStartCaregiver}
              className="mt-6 px-5 py-2.5 rounded-xl border border-purple-200 hover:bg-purple-50 text-purple-700 font-bold text-xs transition-colors"
            >
              Access Caregiver Tools
            </button>
          </div>
          <div className="healthcare-card p-6 bg-slate-50/50 border border-slate-100">
            <h3 className="font-serif text-base font-bold text-slate-900 mb-2">Boundary Setting Guides</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Step-by-step instructions on setting firm living, safety, and financial guidelines without guilt.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="font-serif text-3xl font-bold text-[#243746] mb-8">Personal Journeys</h2>
        <div className="healthcare-card p-8 bg-white border border-slate-100 max-w-xl mx-auto">
          <p className="text-xs sm:text-sm italic text-slate-600 leading-relaxed">
            "Having a simple, voice-first companion in my native language made a huge difference during early recovery stress. The 1-tap check-in fits right into my wellness routine."
          </p>
          <div className="font-bold text-xs text-slate-900 mt-4">— Rajesh K., Mumbai</div>
        </div>
      </section>

      {/* Crisis Support Section */}
      <section id="crisis-support" className="healthcare-card bg-[#FDF6F6] border border-[#D65A5A]/30 max-w-4xl mx-auto my-12 p-6 sm:p-8 text-center mx-6">
        <PhoneCall className="h-10 w-10 text-[#D65A5A] mx-auto mb-4 animate-bounce" />
        <h2 className="font-serif text-2xl font-bold text-slate-950">Immediate Support & Safety</h2>
        <p className="text-xs text-slate-500 mt-2 max-w-lg mx-auto leading-relaxed">
          If you or someone you care for is facing a medical emergency, overdose suspicion, or acute crisis, contact free confidential support lines:
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
          <a
            href="tel:112"
            className="px-5 py-2.5 rounded-xl bg-[#D65A5A] hover:bg-[#be4f4f] text-white font-bold text-xs shadow-md transition-colors"
          >
            Call Emergency (112)
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
      <footer className="border-t border-slate-200 bg-slate-100 py-10 px-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <p>© 2026 Beacon Digital Health India. Complete browser privacy sovereignty.</p>
          <div className="flex gap-4">
            <a href="tel:1800110031" className="hover:underline">De-Addiction Support</a>
            <span>•</span>
            <a href="tel:108" className="hover:underline">Medical Ambulance (108)</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
