import { useState, useRef, ChangeEvent } from "react";
import { scanMedicine } from "../services/aiService";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, Loader2, Pill, Info, AlertTriangle, CheckCircle2 } from "lucide-react";

export default function MedicineScanner() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setImage(base64);
        processImage(base64.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const processImage = async (base64: string) => {
    setLoading(true);
    setResult(null);
    try {
      const data = await scanMedicine(base64);
      setResult(data);
    } catch (error) {
      console.error("Scanning failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">AI Medicine Scanner</h1>
        <p className="text-slate-500">Scan or upload medicine images to get instant details about usage and dosage.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <section className="space-y-6">
          <div 
            className="aspect-square glass rounded-[2.5rem] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-8 relative overflow-hidden group cursor-pointer hover:border-medical-primary transition-all"
            onClick={() => fileInputRef.current?.click()}
          >
            {image ? (
              <img src={image} className="absolute inset-0 w-full h-full object-cover" alt="medicine" />
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-medical-secondary p-6 rounded-full text-medical-primary mx-auto group-hover:scale-110 transition-transform">
                  <Camera size={40} />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-slate-700">Identify Medicine</p>
                  <p className="text-xs text-slate-400">Click to upload or drag & drop</p>
                </div>
              </div>
            )}
            <input 
              type="file" 
              className="hidden" 
              ref={fileInputRef} 
              accept="image/*" 
              onChange={handleFileUpload} 
            />
          </div>
          
          <button 
            disabled={loading}
            onClick={() => fileInputRef.current?.click()}
            className="w-full bg-medical-primary text-white py-4 rounded-3xl font-bold flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-medical-primary/20 hover:scale-105 transition-transform"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Upload size={20} />}
            {image ? "Scan New Medicine" : "Upload Image"}
          </button>
        </section>

        <section className="min-h-[400px]">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center h-full space-y-6"
              >
                <div className="relative">
                  <div className="h-24 w-24 rounded-full border-4 border-medical-secondary border-t-medical-primary animate-spin"></div>
                  <Pill size={32} className="absolute inset-0 m-auto text-medical-primary" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-xl text-slate-800">Analyzing Medicine...</p>
                  <p className="text-slate-500">Comparing with our medical database</p>
                </div>
              </motion.div>
            ) : result ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass rounded-[2.5rem] p-8 space-y-6 border-l-8 border-medical-primary shadow-xl"
              >
                {result.identified ? (
                  <>
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-medical-primary uppercase tracking-widest">Identified Medicine</span>
                        <h2 className="text-3xl font-black text-slate-900">{result.name}</h2>
                      </div>
                      <div className="bg-medical-accent/10 p-3 rounded-2xl text-medical-accent">
                        <CheckCircle2 size={32} />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="bg-slate-100 p-3 rounded-2xl text-slate-600 h-fit">
                          <Info size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">Usage</p>
                          <p className="text-slate-600 text-sm leading-relaxed">{result.usage}</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="bg-blue-100 p-3 rounded-2xl text-blue-600 h-fit">
                          <Pill size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800">Dosage</p>
                          <p className="text-slate-600 text-sm leading-relaxed">{result.dosage}</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="bg-rose-100 p-3 rounded-2xl text-rose-600 h-fit">
                          <AlertTriangle size={20} />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-rose-600">Side Effects</p>
                          <p className="text-slate-600 text-sm leading-relaxed">{result.sideEffects}</p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 italic text-[10px] text-slate-400">
                      Disclaimer: Information is AI-generated and not a substitute for professional medical advice.
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center p-12 text-center h-full space-y-4">
                    <AlertTriangle size={64} className="text-amber-500" />
                    <p className="font-bold text-xl">Could not identify medicine</p>
                    <p className="text-slate-500">Please make sure the label is clear and try again.</p>
                  </div>
                )}
              </motion.div>
            ) : (
              <div className="glass rounded-[2.5rem] p-12 flex flex-col items-center justify-center text-center h-full border-dashed border-2 border-slate-200">
                <div className="bg-slate-100 p-8 rounded-full text-slate-300 mb-6 font-mono text-4xl">?</div>
                <p className="text-slate-400 font-medium">Results will appear here after scanning</p>
              </div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
