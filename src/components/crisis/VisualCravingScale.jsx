import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Check, Heart, ShieldCheck, Zap } from 'lucide-react';

export function VisualCravingScale() {
  const { setActiveModal, logCraving, speakText } = useApp();
  const [level, setLevel] = useState(5);
  const [selectedTriggers, setSelectedTriggers] = useState(['Stress']);
  const [submitted, setSubmitted] = useState(false);

  const TRIGGER_TAGS = ['Stress', 'Environmental Cue', 'Emotional Distress', 'Physical Pain', 'Social Fatigue', 'Boredom', 'Anxiety'];

  const toggleTrigger = (tag) => {
    if (selectedTriggers.includes(tag)) {
      setSelectedTriggers(selectedTriggers.filter(t => t !== tag));
    } else {
      setSelectedTriggers([...selectedTriggers, tag]);
    }
  };

  const handleSubmit = () => {
    let advice = "Take a short walk, drink cold water, and practice 5-4-3-2-1 sensory grounding.";
    if (level >= 8) {
      advice = "⚡ High Craving Alert: Initiate Urge Surfing immediately. Step away from your current room and call your support sponsor.";
    }

    logCraving({
      intensity: level,
      triggers: selectedTriggers,
      aiAdvice: advice
    });

    speakText(`Craving logged at level ${level}. ${advice}`);
    setSubmitted(true);

    setTimeout(() => {
      setActiveModal(null);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg animate-fadeIn">
      <div className="glass-panel w-full max-w-lg p-6 relative border border-slate-700 shadow-2xl">
        
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <>
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Heart className="h-5 w-5 fill-amber-400/20" />
              <span className="text-xs uppercase font-extrabold tracking-wider">Zero-Typing Logger</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white font-display mb-1">Rate Craving Intensity</h2>
            <p className="text-xs text-slate-400 mb-6">Select your current craving level from 1 to 10</p>

            {/* Scale Slider Display */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-400">1 (Mild)</span>
                <span className={`text-2xl font-black font-display ${
                  level <= 3 ? 'text-teal-400' : level <= 7 ? 'text-amber-400' : 'text-rose-500'
                }`}>
                  Level {level}
                </span>
                <span className="text-xs font-semibold text-rose-400">10 (Severe)</span>
              </div>

              <input
                type="range"
                min="1"
                max="10"
                value={level}
                onChange={(e) => setLevel(parseInt(e.target.value, 10))}
                className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400"
              />
            </div>

            {/* Trigger Tag Selector */}
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2.5">
                Primary Triggers (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2">
                {TRIGGER_TAGS.map((tag) => {
                  const isSelected = selectedTriggers.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTrigger(tag)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'bg-teal-500/20 border-teal-400 text-teal-300'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      {isSelected ? '✓ ' : '+ '}{tag}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-teal-500/30 hover:brightness-110 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <Zap className="h-4 w-4 fill-slate-950" />
              <span>Log Entry & Get Coping Advice</span>
            </button>
          </>
        ) : (
          <div className="py-8 text-center animate-fadeIn">
            <div className="h-16 w-16 rounded-full bg-teal-500/20 text-teal-400 border border-teal-400 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 stroke-[3]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Logged Successfully!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Your log has been saved locally. Take a moment to rest and apply the grounding advice provided.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
