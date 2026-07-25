import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { EmergencyBanner } from './components/common/EmergencyBanner';
import { ZeroTypingSOS } from './components/crisis/ZeroTypingSOS';
import { BreathingBox } from './components/crisis/BreathingBox';
import { VisualCravingScale } from './components/crisis/VisualCravingScale';
import { EmergencyScriptModal } from './components/crisis/EmergencyScriptModal';
import { DeescalationScriptGen } from './components/caregiver/DeescalationScriptGen';
import { CaregiverHub } from './components/caregiver/CaregiverHub';
import { VoiceJournal } from './components/recovery/VoiceJournal';
import { RecoveryDashboard } from './components/recovery/RecoveryDashboard';
import { RiskAssessmentCard } from './components/recovery/RiskAssessmentCard';
import { RecoveryTimeline } from './components/recovery/RecoveryTimeline';
import { MultiModalChat } from './components/ai/MultiModalChat';
import { ImageScannerModal } from './components/ai/ImageScannerModal';
import { PipelineModal } from './components/ai/PipelineModal';
import { ResourceLibrary } from './components/education/ResourceLibrary';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingWizard } from './components/auth/OnboardingWizard';

function MainContent() {
  const { role, activeModal, setActiveModal, highContrast, showOnboarding, setShowOnboarding } = useApp();
  const [activeTab, setActiveTab] = useState('sos'); // 'sos' | 'chat' | 'dashboard' | 'timeline' | 'resources'

  return (
    <div className={`min-h-screen flex flex-col ${highContrast ? 'contrast-125 bg-black' : 'bg-slate-950'}`}>
      
      {/* Top Banner & Navigation */}
      <EmergencyBanner />
      <Navbar />

      {/* Main Application Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6 sm:py-8">
        
        {/* Role & Workspace Banner */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs uppercase font-extrabold tracking-widest text-slate-400">Current Workspace</span>
            <h1 className="text-2xl sm:text-3xl font-black font-display text-white">
              {role === 'individual' ? (
                <span>Individual <span className="gradient-text-teal">Recovery Workspace</span></span>
              ) : (
                <span>Caregiver & Loved One <span className="gradient-text-purple">Support Workspace</span></span>
              )}
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 flex-wrap">
            <button
              onClick={() => setActiveTab('sos')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'sos' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {role === 'individual' ? '⚡ Zero-Typing SOS' : '⚡ Caregiver Script Gen'}
            </button>

            <button
              onClick={() => setActiveTab('chat')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'chat' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              🤖 Multi-Modal AI
            </button>

            <button
              onClick={() => setActiveTab('timeline')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'timeline' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              📈 Timeline & Risk
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'dashboard' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              📊 {role === 'individual' ? 'Stats & Badges' : 'Caregiver Hub'}
            </button>

            <button
              onClick={() => setActiveTab('resources')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'resources' ? 'bg-teal-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              📚 Resources
            </button>
          </div>
        </div>

        {/* Tab View Content */}
        {role === 'individual' ? (
          /* Individual Recovery Mode */
          <>
            {activeTab === 'sos' && (
              <div className="space-y-6 animate-fadeIn">
                <ZeroTypingSOS />
                <RiskAssessmentCard />
                <VoiceJournal />
                <MultiModalChat />
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="animate-fadeIn">
                <MultiModalChat />
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="space-y-6 animate-fadeIn">
                <RiskAssessmentCard />
                <RecoveryTimeline />
              </div>
            )}

            {activeTab === 'dashboard' && (
              <div className="animate-fadeIn">
                <RecoveryDashboard />
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="animate-fadeIn">
                <ResourceLibrary />
              </div>
            )}
          </>
        ) : (
          /* Caregiver Mode */
          <>
            {activeTab === 'sos' && (
              <div className="space-y-6 animate-fadeIn">
                <DeescalationScriptGen />
                <CaregiverHub />
              </div>
            )}

            {activeTab === 'chat' && (
              <div className="animate-fadeIn">
                <MultiModalChat />
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="space-y-6 animate-fadeIn">
                <RecoveryTimeline />
                <CaregiverHub />
              </div>
            )}

            {activeTab === 'dashboard' && (
              <div className="animate-fadeIn">
                <CaregiverHub />
              </div>
            )}

            {activeTab === 'resources' && (
              <div className="animate-fadeIn">
                <ResourceLibrary />
              </div>
            )}
          </>
        )}

      </main>

      {/* Global Footer */}
      <footer className="mt-auto border-t border-slate-800 bg-slate-950 py-6 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-slate-400">
            <strong>Beacon AI Platform</strong> — Built for Prompt Wars Hackathon 2026. Powered by Google Gemini Multi-Modal AI.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>SAMHSA Line: 1-800-662-4357</span>
            <span>•</span>
            <span>Suicide & Crisis: 988</span>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      {showOnboarding && <OnboardingWizard onComplete={() => setShowOnboarding(false)} />}
      {activeModal === 'auth' && <AuthModal onClose={() => setActiveModal(null)} onStartOnboarding={() => { setActiveModal(null); setShowOnboarding(true); }} />}
      {activeModal === 'breathing' && <BreathingBox />}
      {activeModal === 'craving_scale' && <VisualCravingScale />}
      {activeModal === 'emergency_script' && <EmergencyScriptModal />}
      {activeModal === 'image_scanner' && <ImageScannerModal />}
      {activeModal === 'pipeline' && <PipelineModal />}

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
