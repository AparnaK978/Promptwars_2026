import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { queryGeminiAI } from '../../services/gemini';
import { X, Camera, Upload, Sparkles, AlertTriangle, ShieldCheck, FileText } from 'lucide-react';

export function ImageScannerModal() {
  const { setActiveModal, speakText } = useApp();
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Pre-loaded sample images for instant hackathon demonstration
  const SAMPLE_IMAGES = [
    {
      name: "Rx Prescription Bottle",
      preview: "💊 Naloxone / Narcan Nasal Spray 4mg",
      result: "✅ **Identified**: Naloxone Nasal Spray 4mg.\n**Harm Reduction Notes**: Used for immediate reversal of opioid overdose. Store at room temperature away from direct light. Non-addictive and safe to administer even if opioid overdose is only suspected."
    },
    {
      name: "SAMHSA Resource Poster",
      preview: "📄 SAMHSA 988 Helpline Resource Card",
      result: "✅ **Identified**: SAMHSA National Helpline (1-800-662-4357) & 988 Crisis Line.\n**Harm Reduction Notes**: 24/7 free, confidential treatment referral and information service in English and Spanish."
    }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async (sampleResult = null) => {
    setAnalyzing(true);

    if (sampleResult) {
      setTimeout(() => {
        setAnalysisResult(sampleResult);
        setAnalyzing(false);
        speakText(sampleResult.replace(/[*_#`]/g, ''));
      }, 1500);
      return;
    }

    const res = await queryGeminiAI({
      role: 'individual',
      mode: 'vision',
      userInput: 'Analyze this medication or recovery image for safety and harm reduction notes.',
      imageBase64: selectedImage
    });

    setAnalysisResult(res.text);
    setAnalyzing(false);
    speakText(res.text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-lg animate-fadeIn">
      <div className="glass-panel w-full max-w-xl p-6 relative border border-slate-700 shadow-2xl">
        
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-teal-400 mb-1">
          <Camera className="h-5 w-5" />
          <span className="text-xs uppercase font-extrabold tracking-wider">Multi-Modal Gemini Vision</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white font-display mb-1">Safety & Label Scanner</h2>
        <p className="text-xs text-slate-400 mb-6">Scan medication bottles or recovery guidelines for instant safety analysis</p>

        {/* Sample Selection for Quick Hackathon Demo */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Try Sample Images (1-Tap Demo)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {SAMPLE_IMAGES.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedImage(sample.preview);
                  handleAnalyze(sample.result);
                }}
                className="p-3 rounded-xl border bg-slate-900 border-slate-800 hover:border-teal-500/50 text-left transition-all"
              >
                <div className="font-bold text-xs text-teal-300 mb-1">{sample.name}</div>
                <div className="text-[11px] text-slate-400">{sample.preview}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Upload Input */}
        <div className="mb-6">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Or Upload Image File
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-800 file:text-teal-300 hover:file:bg-slate-700 cursor-pointer"
          />
        </div>

        {selectedImage && !analysisResult && (
          <button
            onClick={() => handleAnalyze()}
            disabled={analyzing}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-slate-950 font-extrabold text-sm shadow-lg shadow-teal-500/30 hover:brightness-110 transition-all flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="h-4 w-4 fill-slate-950" />
            <span>{analyzing ? 'Analyzing Image with Gemini Vision...' : 'Run Vision Safety Check'}</span>
          </button>
        )}

        {/* Vision Analysis Output */}
        {analysisResult && (
          <div className="glass-card p-5 rounded-2xl border border-teal-500/30 bg-teal-950/10 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-400 uppercase tracking-wider mb-2">
              <ShieldCheck className="h-4 w-4" />
              Gemini Vision Safety Output
            </div>
            <p className="text-xs sm:text-sm text-slate-200 whitespace-pre-line leading-relaxed">
              {analysisResult}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
