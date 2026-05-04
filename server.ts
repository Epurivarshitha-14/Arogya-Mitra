import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", service: "Arogya Mitra Backend" });
  });

  // Mock implementation for external pharmacy search (as it might need backend keys or just be a proxy)
  app.get("/api/pharmacies", (req, res) => {
    res.json({
      pharmacies: [
        { id: 1, name: "City Pharma", address: "123 Main St", lat: 12.9716, lng: 77.5946 },
        { id: 2, name: "Apollo Pharmacy", address: "456 Side St", lat: 12.9726, lng: 77.5956 },
        { id: 3, name: "MedPlus", address: "789 Square Rd", lat: 12.9706, lng: 77.5936 }
      ]
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
