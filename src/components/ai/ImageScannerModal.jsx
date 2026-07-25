import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { queryGeminiAI } from '../../services/gemini';
import { X, Camera, Upload, Sparkles, ShieldCheck } from 'lucide-react';

export function ImageScannerModal() {
  const { setActiveModal, speakText } = useApp();
  const [selectedImage, setSelectedImage] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const SAMPLE_IMAGES = [
    {
      name: "Medication Spray Label",
      preview: "💊 Naloxone / Narcan Nasal Spray 4mg",
      result: "✅ **Identified**: Naloxone Nasal Spray 4mg.\n**Safety Information**: Used for immediate treatment of opioid emergency. Safe to administer even if opioid overdose is only suspected. Stay with the person until medical personnel arrive."
    },
    {
      name: "Mental Health Contact Card",
      preview: "📄 Tele-MANAS Mental Health Support Card",
      result: "✅ **Identified**: Tele-MANAS Helpline (14446).\n**Safety Information**: Free 24/7 tele-mental health support service. Call for free psychological counseling and advice."
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
      userInput: 'Analyze this medication or recovery guideline for safety notes.',
      imageBase64: selectedImage
    });

    setAnalysisResult(res.text);
    setAnalyzing(false);
    speakText(res.text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white rounded-3xl border border-slate-100 w-full max-w-lg p-6 relative shadow-2xl text-slate-800">
        
        <button
          onClick={() => setActiveModal(null)}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-800"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-teal-600 mb-1">
          <Camera className="h-5 w-5" />
          <span className="text-xs uppercase font-extrabold tracking-wider text-slate-500">Vision Checker</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-display mb-1">Guideline & Label Scanner</h2>
        <p className="text-xs text-slate-500 mb-6">Scan safety resources or prescription labels for clear safety context.</p>

        {/* Try Sample Images */}
        <div className="mb-6">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Try Sample Images (1-Tap Demo)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SAMPLE_IMAGES.map((sample, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedImage(sample.preview);
                  handleAnalyze(sample.result);
                }}
                className="p-3 rounded-2xl border bg-slate-50 border-slate-200 hover:border-teal-500/50 text-left transition-all"
              >
                <div className="font-bold text-xs text-teal-700 mb-0.5">{sample.name}</div>
                <div className="text-[11px] text-slate-500">{sample.preview}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Upload */}
        <div className="mb-6">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Or Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-teal-700 hover:file:bg-slate-200 cursor-pointer"
          />
        </div>

        {selectedImage && !analysisResult && (
          <button
            onClick={() => handleAnalyze()}
            disabled={analyzing}
            className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 mb-4"
          >
            <Sparkles className="h-4 w-4" />
            <span>{analyzing ? 'Checking label...' : 'Run Vision Check'}</span>
          </button>
        )}

        {/* Results */}
        {analysisResult && (
          <div className="healthcare-card p-5 border border-teal-100 bg-teal-50/20 animate-fadeIn text-slate-700 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider mb-2">
              <ShieldCheck className="h-4 w-4" />
              Vision Safety Results
            </div>
            <p className="whitespace-pre-line leading-relaxed">
              {analysisResult}
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
