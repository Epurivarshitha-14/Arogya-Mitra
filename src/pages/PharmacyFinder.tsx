import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Clock, Search, Navigation } from "lucide-react";

export default function PharmacyFinder() {
  const [pharmacies, setPharmacies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPharmacies = async () => {
      try {
        const res = await fetch("/api/pharmacies");
        const data = await res.json();
        setPharmacies(data.pharmacies);
      } catch (error) {
        console.error("Fetch pharmacies failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPharmacies();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Find Pharmacies</h1>
          <p className="text-slate-500">Locate pharmacies near you for quick medicine access.</p>
        </div>
        <div className="relative group w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-medical-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by area or name..." 
            className="w-full bg-white border-2 border-slate-100 rounded-2xl py-3 pl-10 pr-4 text-sm focus:border-medical-primary outline-none"
          />
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        <section className="lg:col-span-1 space-y-4 h-[600px] overflow-y-auto pr-4 custom-scrollbar">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-32 w-full glass rounded-3xl animate-pulse"></div>
            ))
          ) : pharmacies.map((pharmacy) => (
            <motion.div 
              key={pharmacy.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass p-6 rounded-[2rem] space-y-4 hover:border-medical-primary transition-all cursor-pointer group"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h3 className="font-black text-lg text-slate-800 group-hover:text-medical-primary transition-colors">{pharmacy.name}</h3>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                    <MapPin size={14} />
                    {pharmacy.address}
                  </div>
                </div>
                <div className="bg-medical-secondary p-2 rounded-xl text-medical-primary">
                  <Navigation size={18} />
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <button className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-medical-primary transition-colors">
                  <Phone size={14} /> Call
                </button>
                <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                <button className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-medical-primary transition-colors">
                  <Clock size={14} /> 24 Hours
                </button>
              </div>
            </motion.div>
          ))}
        </section>

        <section className="lg:col-span-2">
          <div className="glass rounded-[3rem] h-[600px] w-full overflow-hidden relative border-8 border-white/50 shadow-2xl">
            {/* Simulated Map */}
            <div className="absolute inset-0 bg-slate-100 flex items-center justify-center">
              <div className="text-center space-y-4 opacity-50">
                <MapPin size={80} className="mx-auto text-slate-300" />
                <p className="font-mono text-xs uppercase tracking-widest">Interactive Map Integration</p>
              </div>
              
              {/* Fake Pins */}
              {pharmacies.map((p, i) => (
                <motion.div 
                  key={p.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  style={{ top: `${30 + i * 15}%`, left: `${20 + i * 20}%` }}
                  className="absolute"
                >
                  <div className="relative group">
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-medical-primary text-white text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 shadow-xl">
                      {p.name} <Navigation size={10} />
                    </div>
                    <div className="h-10 w-10 bg-medical-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center text-white p-1">
                      <MapPin size={20} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-3xl flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <div className="bg-medical-accent h-3 w-3 rounded-full animate-pulse"></div>
                 <span className="text-sm font-bold text-slate-800">Your current location detected</span>
               </div>
               <span className="text-xs text-slate-500 font-mono">12.9716° N, 77.5946° E</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
