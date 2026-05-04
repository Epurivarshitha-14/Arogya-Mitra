import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, Search, Filter, Download, MoreVertical, FileArchive, Activity, Beaker } from "lucide-react";

export default function HealthRecords() {
  const [records] = useState([
    { id: 1, title: "Blood Test Report", date: "2024-03-15", type: "lab", vendor: "City Labs Ltd." },
    { id: 2, title: "X-Ray Chest", date: "2024-01-20", type: "scan", vendor: "MediScan Imaging" },
    { id: 3, title: "General Checkup", date: "2023-11-05", type: "report", vendor: "Apollo Hospital" },
  ]);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Medical Records</h1>
          <p className="text-slate-500">Access and manage all your healthcare documentation in one secure vault.</p>
        </div>
        <button className="bg-medical-primary text-white p-4 px-8 rounded-2xl font-bold flex items-center gap-3 shadow-xl hover:scale-105 transition-transform">
          <Plus size={22} /> Upload New Record
        </button>
      </header>

      <div className="grid md:grid-cols-4 gap-8">
        <aside className="md:col-span-1 space-y-6">
          <div className="glass rounded-[2rem] p-6 space-y-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Filter size={18} className="text-medical-primary" />
              Quick Filter
            </h3>
            <div className="space-y-2">
              {["All Records", "Lab Results", "Doctor Notes", "Prescriptions", "Imaging"].map((f) => (
                <button key={f} className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-medical-secondary hover:text-medical-primary transition-all">
                  {f}
                </button>
              ))}
            </div>
            
            <div className="pt-6 border-t border-slate-100">
               <div className="bg-medical-primary/5 p-6 rounded-2xl text-center space-y-3">
                 <FileArchive size={32} className="mx-auto text-medical-primary opacity-40" />
                 <p className="text-xs text-slate-600 font-medium">Export all records to a secure ZIP file.</p>
                 <button className="w-full bg-white border border-medical-primary/20 py-2 rounded-lg text-[10px] font-bold text-medical-primary uppercase tracking-widest hover:bg-medical-primary hover:text-white transition-all">
                   Export Data
                 </button>
               </div>
            </div>
          </div>
        </aside>

        <main className="md:col-span-3 space-y-4">
          <div className="relative group mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search reports by name, date or hospital..." 
              className="w-full bg-white border-2 border-slate-100 rounded-[2rem] py-4 pl-12 pr-6 outline-none focus:border-medical-primary transition-all shadow-sm"
            />
          </div>

          <div className="space-y-4">
            {records.map((record) => (
              <motion.div 
                key={record.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-6 rounded-[2rem] flex items-center gap-6 hover:shadow-xl transition-all group border-l-4 border-transparent hover:border-medical-primary"
              >
                <div className={`p-4 rounded-2xl ${
                  record.type === 'lab' ? 'bg-amber-100 text-amber-600' : 
                  record.type === 'scan' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {record.type === 'lab' ? <Beaker size={28} /> : 
                   record.type === 'scan' ? <Activity size={28} /> : <FileText size={28} />}
                </div>

                <div className="flex-1">
                  <h3 className="font-black text-slate-800 text-lg group-hover:text-medical-primary transition-colors">{record.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mt-1">
                    <span className="font-bold uppercase tracking-widest">{record.vendor}</span>
                    <div className="h-1 w-1 bg-slate-300 rounded-full"></div>
                    <span>{record.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="p-3 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-medical-primary transition-all">
                    <Download size={20} />
                  </button>
                  <button className="p-3 rounded-xl hover:bg-slate-100 text-slate-400 transition-all">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center pt-8">
            <button className="text-slate-400 text-sm font-semibold hover:text-medical-primary transition-colors underline underline-offset-4">
              Load older records
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
