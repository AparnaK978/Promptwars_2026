import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Check, Heart, Zap } from 'lucide-react';

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
    let advice = "Take a short walk, drink water, and practice grounding breathing.";
    if (level >= 8) {
      advice = "High Craving Alert: Initiate Urge Surfing breathing immediately. Contact a caregiver.";
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-100 w-full max-w-lg p-6 relative shadow-2xl text-slate-800">
        
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-700"
        >
          <X className="h-5 w-5" />
        </button>

        {!submitted ? (
          <>
            <div className="flex items-center gap-2 text-teal-600 mb-1">
              <Heart className="h-5 w-5 fill-teal-50" />
              <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500">Wellness Check-in</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display">Rate Craving Intensity</h2>
            <p className="text-xs text-slate-500 mb-6">Rate how intense your craving urge is on a scale of 1 to 10.</p>

            {/* Slider Display */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-slate-400">1 (Mild)</span>
                <span className={`text-2xl font-black font-display ${
                  level <= 3 ? 'text-teal-600' : level <= 7 ? 'text-sky-600' : 'text-rose-600'
                }`}>
                  Level {level}
                </span>
                <span className="text-xs font-semibold text-rose-500">10 (Severe)</span>
              </div>

              <input
                type="range"
                min="1"
                max="10"
                value={level}
                onChange={(e) => setLevel(parseInt(e.target.value, 10))}
                className="w-full h-2.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
            </div>

            {/* Triggers Selector */}
            <div className="mb-6">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                What triggers are active?
              </label>
              <div className="flex flex-wrap gap-2">
                {TRIGGER_TAGS.map((tag) => {
                  const isSelected = selectedTriggers.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTrigger(tag)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                        isSelected
                          ? 'bg-teal-50 border-teal-200 text-teal-700'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
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
              className="w-full py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
            >
              <Zap className="h-4 w-4 fill-white" />
              <span>Log Check-in</span>
            </button>
          </>
        ) : (
          <div className="py-8 text-center animate-fadeIn">
            <div className="h-16 w-16 rounded-full bg-teal-50 text-teal-600 border border-teal-200 flex items-center justify-center mx-auto mb-4">
              <Check className="h-8 w-8 stroke-[3]" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">Check-in Logged</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
              Your recovery check-in details have been securely logged on your local device.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
