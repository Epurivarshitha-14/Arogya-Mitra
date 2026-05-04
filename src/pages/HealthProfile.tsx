import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { motion } from "framer-motion";
import { Save, User as UserIcon, Scale, Ruler, ClipboardList, Plus } from "lucide-react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function HealthProfile({ user }: { user: User }) {
  const [profile, setProfile] = useState({
    age: "",
    weight: "",
    height: "",
    conditions: [] as string[],
    allergies: [] as string[],
  });
  const [newCondition, setNewCondition] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data() as any);
        }
      } catch (error) {
        console.error("Fetch profile failed", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user.uid]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, "users", user.uid), {
        ...profile,
        userId: user.uid,
        name: user.displayName,
        email: user.email,
        updatedAt: new Date().toISOString(),
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Save profile failed", error);
    } finally {
      setSaving(false);
    }
  };

  const addCondition = () => {
    if (newCondition.trim() && !profile.conditions.includes(newCondition)) {
      setProfile({ ...profile, conditions: [...profile.conditions, newCondition] });
      setNewCondition("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Personal Health Profile</h1>
          <p className="text-slate-500">Keep your vital information up to date for better care.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-medical-primary text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-lg"
        >
          {saving ? <Plus className="animate-spin" /> : <Save size={20} />}
          Save Profile
        </button>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <section className="md:col-span-1 space-y-6">
          <div className="glass rounded-[2.5rem] p-8 text-center space-y-4">
            <img 
              src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} 
              className="h-32 w-32 rounded-3xl mx-auto border-4 border-medical-primary/10" 
              alt="profile" 
            />
            <div>
              <h2 className="text-xl font-bold text-slate-900">{user.displayName}</h2>
              <p className="text-slate-500 text-sm">{user.email}</p>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-center gap-2">
               <span className="bg-medical-secondary text-medical-primary px-3 py-1 rounded-full text-xs font-bold uppercase">Gold Member</span>
            </div>
          </div>
        </section>

        <section className="md:col-span-2 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="glass p-6 rounded-3xl flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-2xl text-blue-600">
                <Scale size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Weight</p>
                <input 
                  type="number" 
                  value={profile.weight} 
                  onChange={(e) => setProfile({...profile, weight: e.target.value})}
                  className="bg-transparent border-none text-xl font-black focus:ring-0 w-20"
                  placeholder="---"
                />
                <span className="text-slate-400 font-bold">kg</span>
              </div>
            </div>
            <div className="glass p-6 rounded-3xl flex items-center gap-4">
              <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600">
                <Ruler size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Height</p>
                <input 
                  type="number" 
                  value={profile.height} 
                  onChange={(e) => setProfile({...profile, height: e.target.value})}
                  className="bg-transparent border-none text-xl font-black focus:ring-0 w-20"
                  placeholder="---"
                />
                <span className="text-slate-400 font-bold">cm</span>
              </div>
            </div>
          </div>

          <div className="glass rounded-[2.5rem] p-8 space-y-6">
            <div className="flex items-center gap-3">
              <ClipboardList className="text-medical-primary" />
              <h2 className="text-xl font-bold text-slate-800">Medical Conditions</h2>
            </div>
            
            <div className="flex gap-2">
              <input 
                type="text" 
                value={newCondition}
                onChange={(e) => setNewCondition(e.target.value)}
                placeholder="Add a condition (e.g., Diabetes)" 
                className="flex-1 bg-slate-50 border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-medical-primary/10 outline-none"
              />
              <button 
                onClick={addCondition}
                className="bg-medical-secondary text-medical-primary p-3 rounded-xl hover:bg-medical-primary hover:text-white transition-all"
              >
                <Plus size={20} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {profile.conditions.length > 0 ? profile.conditions.map((c, i) => (
                <span key={i} className="bg-white border border-slate-200 px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 flex items-center gap-2">
                  {c}
                  <button 
                    onClick={() => setProfile({...profile, conditions: profile.conditions.filter(item => item !== c)})}
                    className="text-slate-300 hover:text-rose-500"
                  >
                    ×
                  </button>
                </span>
              )) : (
                <p className="text-slate-400 text-sm italic">No conditions listed</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
