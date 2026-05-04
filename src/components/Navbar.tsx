import { User, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { LogOut, Bell, Search, Settings } from "lucide-react";

export default function Navbar({ user }: { user: User }) {
  return (
    <nav className="h-20 px-8 flex items-center justify-between glass sticky top-0 z-40 bg-white/60 backdrop-blur-xl border-b border-slate-200/50">
      <div className="flex items-center gap-4 w-1/3">
        <div className="relative group w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-medical-primary transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search symptoms, doctors..." 
            className="w-full bg-slate-100 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-2 focus:ring-medical-primary/20 transition-all outline-none"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 relative transition-colors">
          <Bell size={20} />
          <span className="absolute top-2 right-2 h-2 w-2 bg-medical-emergency rounded-full border-2 border-white"></span>
        </button>
        <button className="p-2.5 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors">
          <Settings size={20} />
        </button>
        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-sm font-bold text-slate-800">{user.displayName}</div>
            <div className="text-xs text-slate-500">Patient</div>
          </div>
          <img 
            src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
            alt="profile" 
            className="h-10 w-10 rounded-xl border-2 border-medical-primary/10"
          />
          <button 
            onClick={() => signOut(auth)}
            className="p-2.5 rounded-xl hover:bg-rose-50 text-rose-500 transition-colors"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}
