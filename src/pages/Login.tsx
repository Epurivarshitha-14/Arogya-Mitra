import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";
import { motion } from "framer-motion";
import { HeartPulse, Chrome } from "lucide-react";

export default function Login() {
  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex h-[80vh] items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass w-full max-w-md rounded-3xl p-12 text-center shadow-2xl"
      >
        <div className="mb-6 flex justify-center">
          <div className="rounded-2xl bg-medical-primary p-4 text-white shadow-lg shadow-medical-primary/30">
            <HeartPulse size={48} />
          </div>
        </div>
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">Arogya Mitra</h1>
        <p className="mb-8 text-slate-500">Your Personal Healthcare Companion</p>
        
        <button
          onClick={handleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-xl bg-white border border-slate-200 p-4 font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-95"
        >
          <Chrome size={20} className="text-medical-primary" />
          Continue with Google
        </button>
        
        <div className="mt-8 text-xs text-slate-400">
          Secure, AI-powered medical assistance at your fingertips.
        </div>
      </motion.div>
    </div>
  );
}
