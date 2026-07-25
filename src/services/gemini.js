// Google Gemini API integration with Indian localized fallback engine
import { SYSTEM_PROMPTS, checkSafetyTrigger } from './prompts';

const FALLBACK_RESPONSES = {
  English: {
    sos: "I am here with you right now. Take a deep breath with me: Inhale for 4 seconds, hold for 4, exhale for 6. Urges are like waves—they peak and then pass. You are safe in this moment.",
    deescalate: "**Step 1 (Calm Response)**: 'I hear how overwhelmed you are right now. I love you and I want to support you without judgment.'\n**Step 2 (Set Soft Boundary)**: 'Let's take 10 minutes to breathe before we continue this conversation.'",
    journal: "Thank you for sharing your thoughts aloud. Expressing your feelings reduces emotional pressure. You showed resilience today."
  },
  Hindi: {
    sos: "मैं अभी आपके साथ हूँ। मेरे साथ एक गहरी साँस लें: 4 सेकंड के लिए साँस अंदर लें, 4 सेकंड रोकें, 6 सेकंड के लिए बाहर छोड़ें। इच्छाएँ लहरों की तरह होती हैं—वे चरम पर पहुँचती हैं और फिर गुजर जाती हैं। आप इस समय सुरक्षित हैं।",
    deescalate: "**चरण 1 (शांत प्रतिक्रिया)**: 'मैं सुन सकता हूँ कि आप इस समय कितने परेशान हैं। मैं आपसे प्यार करता हूँ और बिना किसी निर्णय के आपका समर्थन करना चाहता हूँ।'\n**चरण 2 (नरम सीमा निर्धारित करें)**: 'आइए बातचीत जारी रखने से पहले सांस लेने के लिए 10 मिनट का समय लें।'",
    journal: "अपने विचारों को ज़ोर से साझा करने के लिए धन्यवाद। अपनी भावनाओं को व्यक्त करने से भावनात्मक दबाव कम होता है। आपने आज लचीलापन दिखाया।"
  },
  Malayalam: {
    sos: "ഞാൻ ഇപ്പോൾ നിങ്ങളുടെ കൂടെയുണ്ട്. എന്നോടൊപ്പം ഒരു ദീർഘശ്വാസമെടുക്കൂ: 4 സെക്കൻഡ് ശ്വാസമെടുക്കുക, 4 സെക്കൻഡ് പിടിച്ചുനിർത്തുക, 6 സെക്കൻഡ് പുറത്തുവിടുക. ആഗ്രഹങ്ങൾ തിരമാലകൾ പോലെയാണ്-അവ ഉയർന്നു വന്ന് പിന്നീട് കടന്നുപോകും. ഈ നിമിഷത്തിൽ നിങ്ങൾ സുരക്ഷിതനാണ്.",
    deescalate: "**ഘട്ടം 1 (ശാന്തമായ പ്രതികരണം)**: 'നിങ്ങൾ ഇപ്പോൾ എത്രമാത്രം വിഷമിക്കുന്നു എന്ന് ഞാൻ മനസ്സിലാക്കുന്നു. ഞാൻ നിങ്ങളെ സ്നേഹിക്കുന്നു, വിധി നിശ്ചയിക്കാതെ നിങ്ങളെ പിന്തുണയ്ക്കാൻ ഞാൻ ആഗ്രഹിക്കുന്നു.'\n**ഘട്ടം 2 (മൃദുവായ അതിരുകൾ നിശ്ചയിക്കുക)**: 'നമുക്ക് ഈ സംഭാഷണം തുടരുന്നതിന് മുൻപ് 10 മിനിറ്റ് ശ്വാസമെടുക്കാം.'",
    journal: "നിങ്ങളുടെ ചിന്തകൾ ഉറക്കെ പങ്കിട്ടതിന് നന്ദി. വികാരങ്ങൾ പ്രകടിപ്പിക്കുന്നത് മാനസിക സമ്മർദ്ദം കുറയ്ക്കുന്നു. നിങ്ങൾ ഇന്ന് മികച്ച പ്രതിരോധശേഷി കാണിച്ചു."
  },
  Tamil: {
    sos: "நான் இப்போது உங்களுடன் இருக்கிறேன். என்னுடன் ஒரு ஆழமான மூச்சு எடுத்துக் கொள்ளுங்கள்: 4 விநாடிகள் உள்ளிழுக்கவும், 4 விநாடிகள் வைத்திருக்கவும், 6 விநாடிகள் வெளியிடவும். ஆசைகள் அலைகளைப் போன்றவை-அவை உச்சத்தை அடைந்து பின்னர் கடந்து போகின்றன. இந்த தருணத்தில் நீங்கள் பாதுகாப்பாக இருக்கிறீர்கள்.",
    deescalate: "**படி 1 (அமைதியான பதில்)**: 'நீங்கள் இப்போது எவ்வளவு சோர்வாக இருக்கிறீர்கள் என்பதை நான் கேட்கிறேன். நான் உங்களை நேசிக்கிறேன், எந்த தீர்ப்பும் இல்லாமல் உங்களுக்கு ஆதரவளிக்க விரும்புகிறேன்.'\n**படி 2 (மென்மையான எல்லை அமைத்தல்)**: 'இந்த உரையாடலைத் தொடர்வதற்கு முன் மூச்சு விட 10 நிமிடங்கள் எடுத்துக்கொள்வோம்.'",
    journal: "உங்கள் எண்ணங்களை சத்தமாக பகிர்ந்து கொண்டதற்கு நன்றி. உங்கள் உணர்வுகளை வெளிப்படுத்துவது உணர்ச்சி அழுத்தத்தைக் குறைக்கிறது. இன்று நீங்கள் பின்னடைவை காட்டினீர்கள்."
  },
  Kannada: {
    sos: "ನಾನು ಈಗ ನಿಮ್ಮೊಂದಿಗೆ ಇದ್ದೇನೆ. ನನ್ನೊಂದಿಗೆ ಒಂದು ದೀರ್ಘ ಉಸಿರು ತೆಗೆದುಕೊಳ್ಳಿ: 4 ಸೆಕೆಂಡುಗಳ ಕಾಲ ಉಸಿರನ್ನು ಒಳಗೆ ತೆಗೆದುಕೊಳ್ಳಿ, 4 ಸೆಕೆಂಡುಗಳ ಕಾಲ ತಡೆಹಿಡಿಯಿರಿ, 6 ಸೆಕೆಂಡುಗಳ ಕಾಲ ಹೊರಬಿಡಿ. ಹಂಬಲಗಳು ಅಲೆಗಳಂತೆ-ಅವು ಗರಿಷ್ಠ ಮಟ್ಟ ತಲುಪಿ ನಂತರ ಹಾದುಹೋಗುತ್ತವೆ. ಈ ಕ್ಷಣದಲ್ಲಿ ನೀವು ಸುರಕ್ಷಿತವಾಗಿದ್ದೀರಿ.",
    deescalate: "**ಹಂತ 1 (ಶಾಂತ ಪ್ರತಿಕ್ರಿಯೆ)**: 'ನೀವು ಈಗ ಎಷ್ಟು ಭಾವುಕರಾಗಿದ್ದೀರಿ ಎಂದು ನಾನು ಕೇಳಬಲ್ಲೆ. ನಾನು ನಿಮ್ಮನ್ನು ಪ್ರೀತಿಸುತ್ತೇನೆ ಮತ್ತು ಯಾವುದೇ ತೀರ್ಪು ಇಲ್ಲದೆ ನಿಮ್ಮನ್ನು ಬೆಂಬಲಿಸಲು ಬಯಸುತ್ತೇನೆ.'\n**ಹಂತ 2 (ಮೃದುವಾದ ಗಡಿಯನ್ನು ನಿಗದಿಪಡಿಸಿ)**: 'ಈ ಸಂಭಾಷಣೆಯನ್ನು ಮುಂದುವರಿಸುವ ಮೊದಲು ಉಸಿರಾಡಲು 10 ನಿಮಿಷ ತೆಗೆದುಕೊಳ್ಳೋಣ.'",
    journal: "ನಿಮ್ಮ ಆಲೋಚನೆಗಳನ್ನು ಗಟ್ಟಿಯಾಗಿ ಹಂಚಿಕೊಂಡಿದ್ದಕ್ಕೆ ಧನ್ಯವಾದಗಳು. ನಿಮ್ಮ ಭಾವನೆಗಳನ್ನು ವ್ಯಕ್ತಪಡಿಸುವುದು ಭಾವನಾತ್ಮಕ ಒತ್ತಡವನ್ನು ಕಡಿಮೆ ಮಾಡುತ್ತದೆ. ಇಂದು ನೀವು ಚೇತರಿಸಿಕೊಳ್ಳುವ ಶಕ್ತಿಯನ್ನು ತೋರಿಸಿದ್ದೀರಿ."
  },
  Telugu: {
    sos: "ನಾನು ఇప్పుడు మీతోనే ఉన్నాను. నాతో కలిసి ఒక సుదీర్ಘ శ్వాస తీసుకోండి: 4 సెకన్ల పాటు శ్వాస లోపలికి తీసుకోండి, 4 సెకన్ల పాటు ఆపి ఉంచండి, 6 సెకన్ల పాటు వదిలేయండి. కోరికలు తరంగాల లాంటివి-అవి గరిష్ట స్థాయికి చేరుకుని ఆపై తొలగిపోతాయి. ఈ క్షణంలో మీరు సురక్షితంగా ఉన్నారు.",
    deescalate: "**దశ 1 (ప్రశాంతమైన ప్రతిస్పందన)**: 'మీరు ఇప్పుడు ఎంత ఒత్తిడికి గురవుతున్నారో నేను వినగలను. నేను మిమ్మల్ని ప్రేమిస్తున్నాను మరియు ఎటువంటి తీర్పు లేకుండా మీకు మద్దతు ఇవ్వాలనుకుంటున్నాను.'\n**దశ 2 (మృదువైన సరిహద్దును సెట్ చేయండి)**: 'ఈ సంభాషణను కొనసాగించడానికి ముందు శ్వాస తీసుకోవడానికి 10 నిమిషాలు సమయం తీసుకుందాం.'",
    journal: "మీ ఆలోచనలను బిగ్గరగా పంచుకున్నందుకు ధన్యవాదాలు. మీ భావాలను వ్యಕ್ತపరచడం మానసిక ఒత్తిడిని తగ్గిస్తుంది. ఈ రోజు మీరు మంచి పట్టుదలను చూపించారు."
  }
};

export async function queryGeminiAI({ role, mode, userInput, imageBase64, cravingLevel, language = 'English' }) {
  if (checkSafetyTrigger(userInput)) {
    return {
      isEmergency: true,
      text: "🚨 **CRISIS ALERT DETECTED**: If you or someone you know is in immediate danger, please dial **112** (National Emergency) or **108** (Medical Emergency) immediately, or call Tele-MANAS at **14446**."
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
        text: `${systemPrompt}\n\n[Context: Craving Level ${cravingLevel || 'N/A'}]\n[Selected Language: ${language} - IMPORTANT: Respond entirely and grammatically in this language!]\nUser Input: ${userInput}`
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

  // Local fallback response lookup
  const dictionary = FALLBACK_RESPONSES[language] || FALLBACK_RESPONSES.English;
  const replyText = dictionary[mode] || dictionary.sos;
  
  return {
    isEmergency: false,
    text: replyText,
    isSimulated: !apiKey
  };
}
