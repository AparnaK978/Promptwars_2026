import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { queryGeminiAI } from '../../services/gemini';
import { Send, Sparkles, Mic, Camera, Volume2, Bot, User } from 'lucide-react';

export function MultiModalChat() {
  const { role, speakText, setActiveModal } = useApp();
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      text: role === 'caregiver'
        ? "Hello, I am your caregiver support companion. I am here to assist you with calm, non-confrontational communication, boundary-setting scripts, and crisis guidance. How can I support you today?"
        : "Hello! I am your recovery companion. I'm here 24/7 with zero-friction grounding techniques and urge surfing tools. How are you feeling right now?"
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const PRESET_CHIPS = role === 'caregiver' ? [
    "De-escalation script for an intense family argument",
    "What are the warning signs of an overdose?",
    "Setting clear boundary statements without guilt"
  ] : [
    "Guide me through 5-4-3-2-1 grounding",
    "Help me ride out a strong craving",
    "How to manage social pressure in early recovery"
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
    <div className="healthcare-card p-6 border border-slate-100 bg-white flex flex-col h-[520px] relative">
      
      {/* Header */}
      <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-teal-600 flex items-center justify-center text-white">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900 font-display">Compassionate Recovery Companion</h2>
            <p className="text-xs text-slate-500 mt-0.5">Secure • Confidential • Voice-First Enabled</p>
          </div>
        </div>

        <button
          onClick={() => setActiveModal('image_scanner')}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-teal-700 text-xs font-semibold"
        >
          <Camera className="h-4 w-4 text-teal-600" />
          <span className="hidden sm:inline">Scan Label</span>
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto my-4 space-y-4 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
          >
            <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${
              msg.sender === 'user'
                ? 'bg-teal-600 text-white'
                : 'bg-teal-50 text-teal-600 border border-teal-100'
            }`}>
              {msg.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            <div className={`max-w-[82%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
              msg.sender === 'user'
                ? 'bg-teal-600 text-white rounded-tr-none'
                : msg.isEmergency
                ? 'bg-rose-50 border border-rose-200 text-rose-800 rounded-tl-none font-medium'
                : 'bg-slate-50 border border-slate-200 text-slate-700 rounded-tl-none font-sans'
            }`}>
              <div className="whitespace-pre-line">{msg.text}</div>
              
              {msg.sender === 'ai' && (
                <button
                  onClick={() => speakText(msg.text)}
                  className="mt-2 text-[10px] font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                >
                  <Volume2 className="h-3 w-3" /> Listen response
                </button>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-teal-600 animate-pulse p-2">
            <Sparkles className="h-4 w-4" />
            <span>Companion is listening...</span>
          </div>
        )}
      </div>

      {/* Preset Chips */}
      <div className="mb-3">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {PRESET_CHIPS.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(chip)}
              className="px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-teal-700 font-semibold shrink-0"
            >
              💬 {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
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
          placeholder="Speak naturally or select a prompt above..."
          className="flex-1 py-3 px-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-teal-500"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || loading}
          className="p-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white disabled:opacity-50 transition-colors shadow-md"
          aria-label="Send message"
        >
          <Send className="h-4 w-4 fill-white" />
        </button>
      </form>

    </div>
  );
}
