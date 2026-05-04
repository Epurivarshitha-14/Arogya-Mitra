import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, User, Clock, ChevronRight, CheckCircle2, History } from "lucide-react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../lib/firebase";

const specialists = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "Cardiologist", avatar: "https://i.pravatar.cc/150?u=sarah" },
  { id: 2, name: "Dr. Michael Chen", specialty: "Dermatologist", avatar: "https://i.pravatar.cc/150?u=michael" },
  { id: 3, name: "Dr. Emily Brown", specialty: "Pediatrician", avatar: "https://i.pravatar.cc/150?u=emily" },
  { id: 4, name: "Dr. David Wilson", specialty: "Neurologist", avatar: "https://i.pravatar.cc/150?u=david" },
];

const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "03:30 PM", "05:00 PM"];

export default function AppointmentBooker() {
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBooking = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "appointments"), {
        userId: auth.currentUser?.uid,
        doctorName: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        dateTime: `${selectedDate} ${selectedTime}`,
        status: "upcoming",
        createdAt: serverTimestamp(),
      });
      setSuccess(true);
    } catch (error) {
      console.error("Booking error", error);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex h-[70vh] flex-col items-center justify-center text-center space-y-6">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="bg-emerald-100 p-8 rounded-full text-emerald-600"
        >
          <CheckCircle2 size={80} />
        </motion.div>
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-900">Appointment Booked!</h2>
          <p className="text-slate-500">You will receive a confirmation message shortly.</p>
        </div>
        <button 
          onClick={() => setSuccess(false)}
          className="bg-medical-primary text-white px-8 py-4 rounded-2xl font-bold shadow-lg"
        >
          Book Another
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Schedule Appointment</h1>
        <p className="text-slate-500">Choose your preferred doctor and time slot.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="bg-medical-primary p-2 rounded-lg text-white"><User size={20} /></div>
            <h2 className="text-xl font-bold text-slate-800">Select Specialist</h2>
          </div>
          <div className="space-y-3">
            {specialists.map((doc) => (
              <div 
                key={doc.id}
                onClick={() => setSelectedDoctor(doc)}
                className={`flex items-center gap-4 p-4 rounded-3xl cursor-pointer transition-all border-2 ${
                  selectedDoctor?.id === doc.id 
                    ? "bg-medical-primary/5 border-medical-primary shadow-md" 
                    : "glass border-transparent hover:border-slate-200"
                }`}
              >
                <img src={doc.avatar} className="h-14 w-14 rounded-2xl object-cover" alt={doc.name} />
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">{doc.name}</h3>
                  <p className="text-sm text-slate-500">{doc.specialty}</p>
                </div>
                {selectedDoctor?.id === doc.id && <CheckCircle2 className="text-medical-primary" />}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="bg-medical-primary p-2 rounded-lg text-white"><Calendar size={20} /></div>
              <h2 className="text-xl font-bold text-slate-800">Date & Time</h2>
            </div>
            
            <div className="space-y-4">
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-white border-2 border-slate-100 rounded-2xl p-4 outline-none focus:border-medical-primary transition-colors font-semibold"
              />

              <div className="flex flex-wrap gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`px-4 py-2 rounded-xl font-bold text-sm transition-all ${
                      selectedTime === time 
                        ? "bg-medical-primary text-white" 
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-8 glass rounded-[2rem] space-y-6 border-b-4 border-medical-primary shadow-xl">
             <div className="flex justify-between items-center pb-4 border-b border-slate-100">
               <span className="text-slate-400 font-medium">Doctor</span>
               <span className="font-bold text-slate-800">{selectedDoctor?.name || '---'}</span>
             </div>
             <div className="flex justify-between items-center pb-4 border-b border-slate-100">
               <span className="text-slate-400 font-medium">Session</span>
               <span className="font-bold text-slate-800">{selectedDate || '---'} @ {selectedTime || '---'}</span>
             </div>
             
             <button 
                disabled={loading || !selectedDoctor || !selectedDate || !selectedTime}
                onClick={handleBooking}
                className="w-full bg-medical-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-medical-primary/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
             >
               {loading ? <Clock className="animate-spin" /> : <ChevronRight />}
               Confirm & Book
             </button>
          </div>
        </section>
      </div>
    </div>
  );
}
