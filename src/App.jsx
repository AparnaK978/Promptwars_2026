import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { EmergencyBanner } from './components/common/EmergencyBanner';
import { BottomNav } from './components/common/BottomNav';
import { HomeDashboard } from './components/workspace/HomeDashboard';
import { BreathingBox } from './components/crisis/BreathingBox';
import { VisualCravingScale } from './components/crisis/VisualCravingScale';
import { EmergencyScriptModal } from './components/crisis/EmergencyScriptModal';
import { DeescalationScriptGen } from './components/caregiver/DeescalationScriptGen';
import { CaregiverHub } from './components/caregiver/CaregiverHub';
import { RecoveryDashboard } from './components/recovery/RecoveryDashboard';
import { RiskAssessmentCard } from './components/recovery/RiskAssessmentCard';
import { RecoveryTimeline } from './components/recovery/RecoveryTimeline';
import { MilestoneTracker } from './components/recovery/MilestoneTracker';
import { CaregiverWellbeing } from './components/caregiver/CaregiverWellbeing';
import { MultiModalChat } from './components/ai/MultiModalChat';
import { ImageScannerModal } from './components/ai/ImageScannerModal';
import { PipelineModal } from './components/ai/PipelineModal';
import { ResourceLibrary } from './components/education/ResourceLibrary';
import { ProfileView } from './components/profile/ProfileView';
import { OnboardingWizard } from './components/auth/OnboardingWizard';
import { LandingPage } from './components/landing/LandingPage';
import { AuthGate } from './components/auth/AuthGate';
import { ShieldCheck, AlertTriangle, Sparkles, Heart } from 'lucide-react';

function AppContent() {
  const { session, role, setRole, activeModal, setActiveModal, highContrast, showOnboarding, setShowOnboarding, cravingLogs, streakDays, enableDemoMode } = useApp();
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'recovery' | 'ai' | 'resources' | 'profile'
  const [showAuthGate, setShowAuthGate] = useState(false);

  React.useEffect(() => {
    if (!session.isLoggedIn) {
      setShowAuthGate(false);
    }
  }, [session.isLoggedIn]);

  // If user is not logged in, show Landing Page
  if (!session.isLoggedIn) {
    if (showAuthGate) {
      return (
        <AuthGate
          onStartOnboarding={() => {
            setShowAuthGate(false);
            setShowOnboarding(true);
          }}
        />
      );
    }
    return (
      <LandingPage
        onStart={() => {
          setRole('individual');
          setShowAuthGate(true);
        }}
        onStartCaregiver={() => {
          setRole('caregiver');
          setShowAuthGate(true);
        }}
        onStartDemo={() => {
          enableDemoMode();
        }}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${highContrast ? 'contrast-125 bg-black' : 'bg-slate-50'}`}>
      
      {/* Skip to Content Accessibility Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#4F7C82] text-white px-4 py-2 rounded-xl text-xs font-bold z-50 focus:ring-2 focus:ring-offset-2 focus:ring-[#4F7C82]"
      >
        Skip to Main Content
      </a>

      {/* Localized Emergency Warning Banner */}
      <div role="status" aria-live="polite">
        <EmergencyBanner />
      </div>

      {/* Main Top Header Navbar */}
      <header role="banner">
        <Navbar />
      </header>

      {/* Primary Workspace Container */}
      <main id="main-content" tabIndex="-1" className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 sm:py-8 mb-20 focus:outline-none">
        
        {/* Workspace Tab Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Current Workspace</span>
            <h1 className="text-2xl font-bold text-slate-900 font-display">
              {role === 'individual' ? (
                <span>Individual <span className="text-[#4F7C82]">Recovery Companion</span></span>
              ) : (
                <span>Caregiver <span className="text-purple-600 font-semibold">Support Hub</span></span>
              )}
            </h1>
          </div>
        </div>

        {/* Tab 1: Home Dashboard (Calm & Low-Cognitive Load) */}
        {activeTab === 'home' && (
          <div className="space-y-6 animate-fadeIn">
            {role === 'individual' ? (
              <HomeDashboard />
            ) : (
              <div className="space-y-6">
                <DeescalationScriptGen />
                <CaregiverHub />
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Recovery Statistics & Timeline logs */}
        {activeTab === 'recovery' && (
          <div className="space-y-6 animate-fadeIn">
            {cravingLogs.length === 0 && streakDays === 0 ? (
              /* Reassuring Empty States */
              <div className="healthcare-card p-8 text-center border border-slate-100 bg-white">
                <Sparkles className="h-10 w-10 text-teal-605 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-900 font-display">Begin Your Recovery Journey</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-6 leading-relaxed">
                  Your personalized recovery score and insights will build dynamically as you log check-ins and interact with your voice companion.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={() => setActiveModal('craving_scale')}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-teal-605 text-white font-bold text-xs shadow-md cursor-pointer"
                  >
                    Log First Check-in
                  </button>

                  <button
                    onClick={() => enableDemoMode()}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                  >
                    Load Judge Demo Data
                  </button>
                </div>
              </div>
            ) : (
              <>
                <RiskAssessmentCard />
                <RecoveryTimeline />
                {role === 'individual' ? (
                  <>
                    <MilestoneTracker />
                    <RecoveryDashboard />
                  </>
                ) : (
                  <CaregiverWellbeing />
                )}
              </>
            )}
          </div>
        )}

        {/* Tab 3: AI Companion (Voice / vision safety tools) */}
        {activeTab === 'ai' && (
          <div className="animate-fadeIn">
            <MultiModalChat />
          </div>
        )}

        {/* Tab 4: Indian Resources & Helplines */}
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

      {/* Floating 112 SOS Call Button */}
      <div className="fixed bottom-20 right-4 z-40">
        <button
          onClick={() => setActiveModal('emergency_script')}
          className="flex items-center gap-1.5 px-4.5 py-3 rounded-full bg-gradient-to-r from-rose-600 to-red-600 text-white font-extrabold text-xs shadow-lg hover:scale-105 transition-all border border-rose-450 cursor-pointer"
          aria-label="Activate Emergency SOS Script and Dial"
        >
          <AlertTriangle className="h-4 w-4 stroke-[2.5]" />
          <span>112 SOS</span>
        </button>
      </div>

      {/* Bottom 5-Tab Navigation Menu */}
      <nav role="navigation" aria-label="Primary Mobile Navigation">
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </nav>

      {/* Modals & Overlays */}
      {showOnboarding && <OnboardingWizard onComplete={() => setShowOnboarding(false)} />}
      {activeModal === 'breathing' && <BreathingBox />}
      {activeModal === 'craving_scale' && <VisualCravingScale />}
      {activeModal === 'emergency_script' && <EmergencyScriptModal />}
      {activeModal === 'image_scanner' && <ImageScannerModal />}
      {activeModal === 'pipeline' && <PipelineModal />}

    </div>
  );
}

import { ErrorBoundary } from './components/common/ErrorBoundary';

export default function App() {
  return (
    <AppProvider>
      <ErrorBoundary>
        <AppContent />
      </ErrorBoundary>
    </AppProvider>
  );
}
