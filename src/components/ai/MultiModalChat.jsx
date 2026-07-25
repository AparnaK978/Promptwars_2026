import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { queryGeminiAI } from '../../services/gemini';
import { Send, Sparkles, Mic, Camera, Volume2, Bot, User, RefreshCw, AlertTriangle } from 'lucide-react';

export function MultiModalChat() {
  const { role, speakText, setActiveModal } = useApp();
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      text: role === 'caregiver'
        ? "Hello, I am Beacon AI. I am here to assist you with non-confrontational communication, de-escalation scripts, and crisis guidance. How can I support you today?"
        : "Hello! I am Beacon AI, your non-judgmental recovery companion. I'm here 24/7 with zero-friction grounding techniques and urge surfing tools. How are you feeling right now?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  // Preset zero-typing query chips
  const PRESET_CHIPS = role === 'caregiver' ? [
    "Generate a de-escalation script for an intense argument",
    "What are the warning signs of an opioid overdose?",
    "How do I set firm financial boundaries without guilt?"
  ] : [
    "Guide me through 5-4-3-2-1 sensory grounding",
    "I am having a strong craving spike, help me urge surf",
    "What should I do if I feel overwhelmed by social pressure?"
  ];

  const handleSend = async (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: query
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    const aiRes = await queryGeminiAI({
      role,
      mode: 'chat',
      userInput: query
    });

    const aiMsg = {
      id: (Date.now() + 1).toString(),
      sender: 'ai',
      text: aiRes.text,
      isEmergency: aiRes.isEmergency
    };

    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
    speakText(aiRes.text);
  };

  return (
    <div className="glass-panel p-6 border border-slate-800 mb-8 flex flex-col h-[520px] relative">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center text-slate-950 font-black">
            <Bot className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white font-display">Multi-Modal GenAI Recovery Assistant</h2>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20">
                Gemini 1.5 Flash
              </span>
            </div>
            <p className="text-xs text-slate-400">Trauma-informed • Zero PII Retention • Voice & Vision Capable</p>
          </div>
        </div>

        <button
          onClick={() => setActiveModal('image_scanner')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-teal-300 text-xs font-semibold"
          aria-label="Scan image with Gemini Vision"
        >
          <Camera className="h-4 w-4 text-teal-400" />
          <span className="hidden sm:inline">Scan Med/Label</span>
        </button>
      </div>

      {/* Messages Scroll Container */}
      <div className="flex-1 overflow-y-auto my-4 space-y-3.5 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
              msg.sender === 'user'
                ? 'bg-purple-600 text-white'
                : 'bg-teal-500/20 text-teal-400 border border-teal-500/30'
            }`}>
              {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            <div className={`max-w-[82%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-purple-600 text-white rounded-tr-none'
                : msg.isEmergency
                ? 'bg-rose-950/80 border border-rose-600 text-rose-100 rounded-tl-none font-medium'
                : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-none font-sans'
            }`}>
              <div className="whitespace-pre-line">{msg.text}</div>
              
              {msg.sender === 'ai' && (
                <button
                  onClick={() => speakText(msg.text)}
                  className="mt-2 text-[10px] font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1"
                >
                  <Volume2 className="h-3 w-3" /> Listen to Audio
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-teal-400 animate-pulse p-2">
            <Sparkles className="h-4 w-4" />
            <span>Beacon AI is formulating response...</span>
          </div>
        )}
      </div>

      {/* Preset Zero-Typing Chips */}
      <div className="mb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {PRESET_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs text-teal-300 font-medium shrink-0 transition-colors"
            >
              ✨ {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2"
      >
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask Beacon AI anything or choose a zero-typing chip..."
          className="flex-1 py-3 px-4 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-teal-400"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || loading}
          className="p-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 disabled:opacity-50 transition-colors shadow-lg shadow-teal-500/20"
          aria-label="Send message"
        >
          <Send className="h-4 w-4 fill-slate-950" />
        </button>
      </form>

    </div>
  );
}
