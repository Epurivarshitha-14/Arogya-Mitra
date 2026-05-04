# Arogya Mitra - Healthcare Dashboard

A comprehensive, AI-powered healthcare platform for booking appointments, scanning medicines, checking symptoms, and managing health records.

## 🚀 Features

- **AI Medicine Scanner**: Upload labels to identify usage, dosage, and side effects.
- **AI Symptom Checker**: Smart analysis of health conditions based on symptoms.
- **Appointment Booking**: Real-time scheduling with medical specialists.
- **Health Records Vault**: Securely manage medical reports and prescriptions.
- **Emergency Ambulance Booking**: Quick request system for urgent care.
- **Pharmacy Finder**: Locate nearby pharmacies on an interactive map.

## 🛠️ Tech Stack

- **Frontend**: React 19, Tailwind CSS 4, Motion, Lucide Icons.
- **Backend**: Node.js + Express.
- **AI**: Google Gemini Pro (Text & Vision).
- **Database/Auth**: Firebase Firestore & Google Authentication.

## 💻 Running Locally

### Prerequisites
- Node.js (v18+)
- A [Google AI Studio API Key](https://aistudio.google.com/)

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Epurivarshitha-14/arogya-mitra.git
   cd arogya-mitra
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root and add:
   ```env
   GEMINI_API_KEY=your_actual_key_here
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   The app will run at `http://localhost:3000`.

## 📂 Project Structure

- `/src/pages`: Full UI views for each feature.
- `/src/services`: AI integration logic using Gemini API.
- `/src/lib/firebase.ts`: Database and Auth initialization.
- `server.ts`: Express backend handling API routes and Vite middleware.
- `firestore.rules`: Security rules for the database.
- `firebase-blueprint.json`: Data schema definition.

## 🔐 Security
The application uses Firebase Security Rules to ensure that users can only access their own medical data. AI suggestions are provided with a medical disclaimer and are for informational purposes only.
