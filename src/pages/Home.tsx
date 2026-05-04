import { User } from "firebase/auth";
import { motion } from "framer-motion";
import { 
  Scan, 
  Calendar, 
  Stethoscope, 
  User as UserIcon, 
  MapPin, 
  FileText, 
  BookOpen, 
  HelpCircle, 
  ShoppingBag, 
  History, 
  Video, 
  Ambulance,
  ArrowRight,
  Activity
} from "lucide-react";
import { Link } from "react-router-dom";

const features = [
  { id: 'scanner', name: "Medicine Scanner", icon: Scan, color: "bg-blue-500", link: "/scanner" },
  { id: 'book', name: "Book Appointment", icon: Calendar, color: "bg-emerald-500", link: "/book-appointment" },
  { id: 'symptoms', name: "Symptom Checker", icon: Stethoscope, color: "bg-violet-500", link: "/symptom-checker" },
  { id: 'profile', name: "Health Profile", icon: UserIcon, color: "bg-amber-500", link: "/profile" },
  { id: 'pharmacies', name: "Find Pharmacies", icon: MapPin, color: "bg-rose-500", link: "/pharmacies" },
  { id: 'prescriptions', name: "E-Prescriptions", icon: FileText, color: "bg-cyan-500", link: "/records" },
  { id: 'education', name: "Health Education", icon: BookOpen, color: "bg-indigo-500", link: "/" },
  { id: 'tutorials', name: "Training & Tutorials", icon: HelpCircle, color: "bg-slate-500", link: "/" },
  { id: 'delivery', name: "Medicine Delivery", icon: ShoppingBag, color: "bg-orange-500", link: "/" },
  { id: 'history', name: "Appointment History", icon: History, color: "bg-sky-500", link: "/" },
  { id: 'video', name: "Video Consultation", icon: Video, color: "bg-purple-500", link: "/" },
  { id: 'records', name: "Health Records", icon: FileText, color: "bg-teal-500", link: "/records" },
];

export default function Home({ user }: { user: User }) {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 leading-tight">
            Welcome back, <span className="text-medical-primary">{user.displayName?.split(' ')[0]}</span>
          </h1>
          <p className="text-slate-500 mt-1 flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-medical-accent"></span>
            All Systems Online
          </p>
        </div>
        <Link to="/book-appointment" className="bg-medical-primary text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-medical-primary/20 hover:scale-105 transition-transform flex items-center gap-2">
          Book New Appointment <ArrowRight size={18} />
        </Link>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {features.map((feature, idx) => (
          <Link key={feature.id} to={feature.link}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="group glass p-6 rounded-3xl flex flex-col items-center justify-center gap-3 card-hover text-center cursor-pointer"
            >
              <div className={`${feature.color} p-4 rounded-2xl text-white shadow-lg`}>
                <feature.icon size={28} />
              </div>
              <span className="text-sm font-semibold text-slate-700 group-hover:text-medical-primary transition-colors">
                {feature.name}
              </span>
            </motion.div>
          </Link>
        ))}
      </section>

      <div className="grid md:grid-cols-3 gap-8">
        <section className="md:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Activity size={20} className="text-medical-primary" />
            Recent Appointments
          </h2>
          <div className="glass rounded-3xl p-8 text-center text-slate-400">
            <Calendar size={48} className="mx-auto mb-4 opacity-20" />
            <p>No upcoming appointments</p>
            <Link to="/book-appointment" className="mt-4 inline-block text-medical-primary font-semibold hover:underline">
              Book Now
            </Link>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Ambulance size={20} className="text-medical-emergency" />
            Emergency
          </h2>
          <div className="bg-medical-emergency/10 border border-medical-emergency/20 rounded-3xl p-6 space-y-4">
            <p className="text-sm text-slate-600">Quick request an ambulance with location tracking.</p>
            <button className="w-full bg-medical-emergency text-white py-4 rounded-2xl font-bold shadow-lg shadow-medical-emergency/30 hover:scale-105 transition-transform">
              Book Ambulance Now
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
