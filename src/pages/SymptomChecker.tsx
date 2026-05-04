import { useState, FormEvent } from "react";
import { checkSymptoms } from "../services/aiService";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, Send, Loader2, Info, AlertTriangle, ShieldCheck } from "lucide-react";

export default function SymptomChecker() {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!symptoms.trim()) return;

    setLoading(true);
    try {
      const data = await checkSymptoms(symptoms);
      setResult(data);
    } catch (error) {
      console.error("Check failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">AI Symptom Checker</h1>
        <p className="text-slate-500">Describe how you feel and get instant AI-powered suggestions.</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        <section className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="glass rounded-[2rem] p-8 space-y-6 shadow-xl sticky top-28">
            <div className="space-y-4">
              <label className="text-sm font-bold text-slate-700 uppercase tracking-widest block">Symptoms Description</label>
              <textarea 
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., I have a persistent headache and feel nauseous for the past 2 days..."
                className="w-full h-48 bg-slate-50 border-none rounded-2xl p-6 text-slate-700 focus:ring-4 focus:ring-medical-primary/10 transition-all outline-none resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={loading || !symptoms.trim()}
              className="w-full bg-medical-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 disabled:opacity-50 hover:shadow-xl hover:shadow-medical-primary/30 transition-all"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />}
              Analyze My Symptoms
            </button>

            <div className="bg-blue-50 p-4 rounded-xl flex gap-3">
              <ShieldCheck className="text-medical-primary shrink-0" size={18} />
              <p className="text-[10px] text-slate-600 leading-tight">
                Your data is encrypted and handled securely. We never share your health profile with third parties.
              </p>
            </div>
          </form>
        </section>

        <section className="lg:col-span-3 min-h-[500px]">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass rounded-[2rem] p-12 flex flex-col items-center justify-center text-center h-full space-y-6"
              >
                <div className="relative h-24 w-24">
                  <div className="absolute inset-0 h-full w-full rounded-full border-4 border-medical-secondary border-t-medical-primary animate-spin"></div>
                  <Stethoscope size={32} className="absolute inset-0 m-auto text-medical-primary" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-xl text-slate-800">Processing Symptoms...</p>
                  <p className="text-slate-500">Using advanced medical reasoning models</p>
                </div>
              </motion.div>
            ) : result ? (
              <motion.div 
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="glass rounded-[2.5rem] p-8 border-l-8 border-violet-500 shadow-xl overflow-hidden relative">
                  <div className="absolute top-0 right-0 p-8 opacity-5">
                    <Stethoscope size={160} />
                  </div>
                  
                  <div className="relative z-10 space-y-6">
                    <div className="space-y-1">
                      <span className="text-xs font-bold text-violet-500 uppercase tracking-widest">Analysis Results</span>
                      <h2 className="text-3xl font-black text-slate-900">Possible Conditions</h2>
                    </div>

                    <div className="space-y-4">
                      {result.conditions.map((condition: any, idx: number) => (
                        <div key={idx} className="bg-white/50 p-6 rounded-3xl border border-slate-100 flex gap-5 group hover:border-violet-200 transition-colors">
                          <div className={`shrink-0 w-3 h-3 rounded-full mt-2 ${
                            condition.urgency === 'high' ? 'bg-rose-500 animate-pulse' : 
                            condition.urgency === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}></div>
                          <div className="space-y-1">
                            <div className="flex items-center gap-3">
                              <h3 className="font-bold text-slate-800 text-lg">{condition.name}</h3>
                              <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                                condition.urgency === 'high' ? 'bg-rose-100 text-rose-600' : 
                                condition.urgency === 'medium' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                              }`}>
                                {condition.urgency} Urgency
                              </span>
                            </div>
                            <p className="text-slate-600 text-sm leading-relaxed">{condition.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-amber-50 rounded-2xl p-6 flex gap-4 border border-amber-100">
                      <AlertTriangle className="text-amber-500 shrink-0" size={24} />
                      <div>
                        <p className="text-xs font-bold text-amber-700 uppercase mb-1">Medical Disclaimer</p>
                        <p className="text-xs text-amber-900/70 leading-relaxed font-medium">{result.disclaimer}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 bg-medical-primary text-white py-4 rounded-2xl font-bold">Book Video Consultation</button>
                  <button className="flex-1 glass text-slate-700 py-4 rounded-2xl font-bold">Find Nearby Clinics</button>
                </div>
              </motion.div>
            ) : (
              <div className="glass rounded-[2rem] p-12 flex flex-col items-center justify-center text-center h-full border-dashed border-2 border-slate-200">
                <div className="h-40 w-40 rounded-full bg-slate-50 flex items-center justify-center mb-6">
                  <Stethoscope size={64} className="text-slate-200" />
                </div>
                <p className="text-slate-400 font-medium max-w-sm">Enter your symptoms on the left to start the analysis.</p>
              </div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </div>
  );
}
