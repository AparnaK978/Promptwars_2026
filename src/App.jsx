import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { EmergencyBanner } from './components/common/EmergencyBanner';
import { BottomNav } from './components/common/BottomNav';
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
import { ProfileView } from './components/profile/ProfileView';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingWizard } from './components/auth/OnboardingWizard';
import { Phone, AlertTriangle, Sparkles, Heart } from 'lucide-react';

function MainContent() {
  const { role, activeModal, setActiveModal, highContrast, showOnboarding, setShowOnboarding, cravingLogs, streakDays, enableDemoMode } = useApp();
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'recovery' | 'ai' | 'resources' | 'profile'

  return (
    <div className={`min-h-screen flex flex-col ${highContrast ? 'contrast-125 bg-black' : 'bg-slate-950'}`}>
      
      {/* Top Banner & Navigation */}
      <EmergencyBanner />
      <Navbar />

      {/* Main Application Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:py-8 mb-16">
        
        {/* Tab 1: Home Dashboard (Calm & Voice-First) */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-fadeIn">
            
            {role === 'individual' ? (
              <>
                <ZeroTypingSOS />
                
                {/* Today's Recovery Check-in / Empty State Prompt */}
                <div className="glass-panel p-5 border border-slate-800 rounded-2xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      <Heart className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white font-display">Daily Recovery Check-in</h3>
                      <p className="text-xs text-slate-400">
                        {cravingLogs.length > 0
                          ? `Last check-in completed. Active streak: ${streakDays} days.`
                          : "Let's begin your recovery journey today. Complete your first check-in."}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setActiveModal('craving_scale')}
                    className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs shrink-0 transition-colors shadow-md shadow-teal-500/20"
                  >
                    Check In Now
                  </button>
                </div>

                <VoiceJournal />
              </>
            ) : (
              /* Caregiver Home */
              <div className="space-y-6">
                <DeescalationScriptGen />
                <CaregiverHub />
              </div>
            )}

          </div>
        )}

        {/* Tab 2: Recovery Timeline & Risk Score */}
        {activeTab === 'recovery' && (
          <div className="space-y-6 animate-fadeIn">
            {cravingLogs.length === 0 && streakDays === 0 ? (
              /* Friendly Empty State for First-Time Users */
              <div className="glass-panel p-8 text-center border border-slate-800 rounded-3xl my-6">
                <Sparkles className="h-10 w-10 text-teal-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white font-display mb-2">Welcome to Your Recovery Journey</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto mb-6 leading-relaxed">
                  Your AI companion will learn and personalize insights over time. Complete your first check-in to build your timeline.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setActiveModal('craving_scale')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-teal-500/20"
                  >
                    Complete First Check-in
                  </button>

                  <button
                    onClick={() => enableDemoMode()}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs"
                  >
                    Load Demo Data (For Judges)
                  </button>
                </div>
              </div>
            ) : (
              <>
                <RiskAssessmentCard />
                <RecoveryTimeline />
                {role === 'individual' && <RecoveryDashboard />}
              </>
            )}
          </div>
        )}

        {/* Tab 3: AI Companion (Voice & Vision) */}
        {activeTab === 'ai' && (
          <div className="animate-fadeIn">
            <MultiModalChat />
          </div>
        )}

        {/* Tab 4: Indian Healthcare Resources */}
        {activeTab === 'resources' && (
          <div className="animate-fadeIn">
            <ResourceLibrary />
          </div>
        )}

        {/* Tab 5: Companion Profile & Settings */}
        {activeTab === 'profile' && (
          <div className="animate-fadeIn">
            <ProfileView />
          </div>
        )}

      </main>

      {/* Floating Persistent 112 / 108 Emergency SOS Button */}
      <div className="fixed bottom-20 right-4 z-40">
        <button
          onClick={() => setActiveModal('emergency_script')}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-rose-600 to-red-600 text-white font-extrabold text-xs shadow-2xl shadow-rose-600/50 hover:scale-105 active:scale-95 transition-all border-2 border-rose-400"
          aria-label="Open 112 Emergency SOS protocol"
        >
          <AlertTriangle className="h-5 w-5 stroke-[2.5]" />
          <span>112 SOS</span>
        </button>
      </div>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

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
