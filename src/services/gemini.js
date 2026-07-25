// Google Gemini API integration with intelligent fallback recovery engine
import { SYSTEM_PROMPTS, checkSafetyTrigger } from './prompts';

// Fallback intelligent responses for hackathon demos when Gemini API key is offline
const FALLBACK_RESPONSES = {
  sos: [
    "I am here with you right now. Take a deep breath with me: Inhale for 4 seconds, hold for 4, exhale for 6. Urges are like waves—they peak and then pass. You are safe in this moment.",
    "You did the right thing pressing this button. Ground yourself right now: Name 3 things you can see around you, feel your feet on the ground. This intense craving will pass in a few minutes.",
    "Pause. You don't have to act on this urge. Sip a cold glass of water, step into a different room, or call your support contact. I am standing by with you."
  ],
  deescalate: [
    "**Step 1 (Calm Response)**: 'I hear how overwhelmed you are right now. I love you and I want to support you without judgment.'\n**Step 2 (Set Soft Boundary)**: 'Let's take 10 minutes to breathe before we continue this conversation.'\n**Step 3 (Safety Check)**: Ensure physical distance and keep emergency numbers ready if symptoms escalate.",
    "**Step 1 (De-escalation)**: 'I am not here to argue or lecture you. I care about your safety.'\n**Step 2 (Validation)**: 'It makes sense that you're feeling intense stress right now.'\n**Step 3 (Offer Action)**: 'Would you like to sit down together and listen to a calming grounding audio?'"
  ],
  journal: [
    "Thank you for sharing your thoughts aloud. Expressing your feelings reduces emotional pressure. You showed resilience today by processing stress instead of avoiding it.",
    "Your voice log shows courage. Recovery is not linear, but taking time to reflect proves your commitment to your personal well-being."
  ]
};

export async function queryGeminiAI({ role, mode, userInput, imageBase64, cravingLevel }) {
  // Check safety triggers first
  if (checkSafetyTrigger(userInput)) {
    return {
      isEmergency: true,
      text: "🚨 **CRISIS ALERT DETECTED**: If you or someone you know is in immediate danger, please dial **911** or contact the **988 Suicide & Crisis Lifeline** immediately by pressing the emergency button at the top of your screen."
    };
  }

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (apiKey && apiKey !== 'YOUR_GEMINI_API_KEY') {
    try {
      const systemPrompt = role === 'caregiver' ? SYSTEM_PROMPTS.CAREGIVER_DEESCALATION : SYSTEM_PROMPTS.INDIVIDUAL_RECOVERY;
      
      const contents = [];
      if (imageBase64) {
        contents.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: imageBase64.replace(/^data:image\/\w+;base64,/, "")
          }
        });
      }

      contents.push({
        text: `${systemPrompt}\n\n[Context: Craving Level ${cravingLevel || 'N/A'}]\nUser Input: ${userInput}`
      });

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents })
      });

      if (response.ok) {
        const data = await response.json();
        const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (replyText) {
          return { isEmergency: false, text: replyText };
        }
      }
    } catch (err) {
      console.warn("Gemini API call failed, switching to local fallback engine:", err);
    }
  }

  // Fallback engine response selection
  let fallbackPool = FALLBACK_RESPONSES[mode] || FALLBACK_RESPONSES.sos;
  const randomText = fallbackPool[Math.floor(Math.random() * fallbackPool.length)];
  
  return {
    isEmergency: false,
    text: randomText,
    isSimulated: !apiKey
  };
}
