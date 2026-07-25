# 🛡️ Beacon AI — Multi-Modal GenAI Recovery & Caregiver Prevention Platform

> **Hackathon Submission**: Prompt Wars 2026  
> **Core Engine**: Google Gemini Multi-Modal AI (Text, Voice, Vision)  
> **Key Innovation**: Zero-Typing Interventions, AI Relapse Risk Engine & Dual-Role Caregiver De-escalation Workflows

---

## 🌟 Executive Summary

**Beacon AI** is a trauma-informed, multi-modal, Generative AI-powered emergency recovery and prevention platform designed to support individuals navigating Substance Use Disorders (SUD) and their caregivers.

Built with a **privacy-first, zero-friction UI/UX**, Beacon AI bridges the critical gap between acute distress and actionable recovery support through:
- ⚡ **Zero-Typing Crisis Interventions**: One-tap visual cards, voice/audio interactions, and rapid emotion/craving assessment to prevent cognitive overload during acute craving or relapse risk.
- 🎯 **AI Recovery Profile & Risk Assessment Engine**: Calculates a dynamic **Recovery Score (0–100)** and **Relapse Risk Level (Low/Medium/High)** based on urge frequency, streak continuity, stress indicators, and grounding engagement.
- 📈 **Interactive Recovery Timeline**: Visual trend tracking for daily mood, craving intensity, milestone badges, and AI daily insights.
- 💊 **Personalized Emergency Scripts & Naloxone Protocols**: Step-by-step CPR & Naloxone (Narcan) administration walkthrough with interactive timers and 911 / 988 emergency calls.
- 🤖 **Multi-Modal Gemini AI Engine**: Speech-to-Text journaling (Web Speech API), Text-to-Speech audio guidance, visual image safety scanner (medication bottle & label recognition), and adaptive conversational AI.
- 👥 **Dual-Role Switcher (Individual vs. Caregiver Workspaces)**: Tailored dashboards and workflows for patients in recovery vs. loved ones/caregivers offering care without judgment or privacy breaches.
- 🔐 **Authentication & 5-Step Personalization**: Complete Welcome, Login, Signup, and Privacy-First Guest mode with personalized onboarding (role, start date, emergency contacts, triggers, coping preferences, AI voice selection).

---

## 🧠 AI Reasoning Pipeline Architecture

Beacon AI implements a multi-tier clinical safety and AI inference pipeline designed to ensure maximum empathy, context awareness, and instant emergency intervention:

```
┌────────────────────────┐
│   Multi-Modal Input    │  (Speech-to-Text / Vision Image Base64 / Zero-Typing Tap)
└───────────┬────────────┘
            │
┌───────────▼────────────┐
│    Context Builder     │  (Injects Recovery Role, Streak Days, Triggers & Profile)
└───────────┬────────────┘
            │
┌───────────▼────────────┐
│  Risk Assessment Eng.  │  (Computes Recovery Score 0-100 & Relapse Risk Level)
└───────────┬────────────┘
            │
┌───────────▼────────────┐
│ Clinical Safety Guard  │  (Regex & Semantic Check for Self-Harm / Overdose Flags)
└───────────┬────────────┘
            │
     ┌──────┴──────┐
     │ Crisis?     │
   YES           NO
     │             │
┌────▼──────┐ ┌────▼─────────────────┐
│ EMERGENCY │ │  Google Gemini LLM   │ (gemini-1.5-flash System Prompts)
│ OVERRIDE  │ └────┬─────────────────┘
│  (988 /   │      │
│ Naloxone) │ ┌────▼─────────────────┐
└───────────┘ │ Synthesized Output   │ (Actionable Advice + SpeechSynthesis Voice)
              └──────────────────────┘
```

---

## 🚀 Deploying to Vercel

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Beacon AI Vercel Deployment"
   git push origin main
   ```

2. **Import Project into Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/new).
   - Select your GitHub repository (`Promptwars_2026`).

3. **Configure Build Settings**:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

4. **Add Environment Variables (Optional)**:
   - Key: `VITE_GEMINI_API_KEY`
   - Value: `YOUR_GEMINI_API_KEY`

5. Click **Deploy**. Vercel will build and publish your app live with an SSL URL!

---

### Method 2: Deploy via Vercel CLI

Run the following commands in your project terminal:

```bash
# 1. Run Vercel CLI
npx vercel

# 2. Deploy to Production
npx vercel --prod
```

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 18, Vite
- **Styling**: Glassmorphism CSS, Tailwind CSS CDN, Google Fonts (Plus Jakarta Sans & Outfit)
- **AI Engine**: Google Gemini API (`gemini-1.5-flash`), Local Fallback Engine
- **Speech Engine**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis`)
- **Persistence Layer**: Modular LocalStorage Adapter (`services/auth.js` & `services/storage.js`)
- **Icons**: Lucide React
- **Accessibility**: WCAG 2.1 AA Compliant

---

## 🏥 Clinical Safety & Disclaimer

> **Beacon AI** is an assistive support tool designed to complement professional care and harm reduction strategies. It is not a substitute for clinical therapy, medical diagnosis, or emergency services. In the event of an overdose or immediate crisis, dial **911** or contact the **988 Suicide & Crisis Lifeline**.