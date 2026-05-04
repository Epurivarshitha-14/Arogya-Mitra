import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./lib/firebase";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MedicineScanner from "./pages/MedicineScanner";
import SymptomChecker from "./pages/SymptomChecker";
import AppointmentBooker from "./pages/AppointmentBooker";
import HealthProfile from "./pages/HealthProfile";
import PharmacyFinder from "./pages/PharmacyFinder";
import HealthRecords from "./pages/HealthRecords";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-medical-secondary">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-medical-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-50">
        {user && <Sidebar />}
        <div className="flex-1 flex flex-col">
          {user && <Navbar user={user} />}
          <main className="flex-1 p-4 md:p-8">
            <Routes>
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
              <Route path="/scanner" element={user ? <MedicineScanner /> : <Navigate to="/login" />} />
              <Route path="/symptom-checker" element={user ? <SymptomChecker /> : <Navigate to="/login" />} />
              <Route path="/book-appointment" element={user ? <AppointmentBooker /> : <Navigate to="/login" />} />
              <Route path="/profile" element={user ? <HealthProfile user={user} /> : <Navigate to="/login" />} />
              <Route path="/pharmacies" element={user ? <PharmacyFinder /> : <Navigate to="/login" />} />
              <Route path="/records" element={user ? <HealthRecords /> : <Navigate to="/login" />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
