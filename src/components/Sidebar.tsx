import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Scan, 
  Stethoscope, 
  Calendar, 
  User, 
  MapPin, 
  FileText,
  HeartPulse
} from "lucide-react";

const menuItems = [
  { path: "/", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/scanner", icon: Scan, label: "Scanner" },
  { path: "/symptom-checker", icon: Stethoscope, label: "Checker" },
  { path: "/book-appointment", icon: Calendar, label: "Appointments" },
  { path: "/pharmacies", icon: MapPin, label: "Pharmacies" },
  { path: "/records", icon: FileText, label: "Records" },
  { path: "/profile", icon: User, label: "Profile" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-24 md:w-64 h-screen glass border-r border-slate-200/50 flex flex-col sticky top-0">
      <div className="p-8 flex items-center gap-3 overflow-hidden">
        <div className="bg-medical-primary p-2 rounded-xl text-white flex-shrink-0 animate-pulse">
          <HeartPulse size={24} />
        </div>
        <span className="font-black text-xl tracking-tighter text-slate-900 hidden md:block">Arogya Mitra</span>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link 
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 group ${
                isActive 
                  ? "bg-medical-primary text-white shadow-lg shadow-medical-primary/20" 
                  : "text-slate-500 hover:bg-medical-secondary hover:text-medical-primary"
              }`}
            >
              <item.icon size={22} className={isActive ? "" : "group-hover:scale-110 transition-transform"} />
              <span className="font-semibold hidden md:block">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 m-4 bg-medical-primary/5 rounded-3xl hidden md:block">
        <div className="text-xs font-bold text-medical-primary mb-2 uppercase tracking-wider">Storage</div>
        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-medical-primary w-1/3"></div>
        </div>
        <div className="mt-2 text-xs text-slate-500">12% of 500MB used</div>
      </div>
    </aside>
  );
}
