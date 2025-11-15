// ====================================================
//  OLYNOR BACKEND - VERSION MESHY.AI
// ====================================================
import express from "express";
import cors from "cors";
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

// Servir les fichiers statiques
app.use(express.static('public'));
app.use('/models', express.static('models'));

// ✅ Route pour le dashboard
app.get('/dashboard', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

const PORT = process.env.PORT || 3000;
const MESHY_API_KEY = process.env.MESHY_API_KEY;

// Créer les dossiers nécessaires
const modelsDir = path.join(__dirname, 'models');
const publicDir = path.join(__dirname, 'public');
const dataDir = path.join(__dirname, 'data');

[modelsDir, publicDir, dataDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

console.log("📁 Dossiers créés");

// ====================================================
// 💾 STOCKAGE DES PLATS CÔTÉ SERVEUR
// ====================================================
const dishesFile = path.join(dataDir, 'dishes.json');
const usersFile = path.join(dataDir, 'users.json');

// Charger les plats
function loadDishes(userId = 'default') {
  try {
    if (fs.existsSync(dishesFile)) {
      const data = JSON.parse(fs.readFileSync(dishesFile, 'utf8'));
      return data[userId] || [];
    }
  } catch (error) {
    console.error('Erreur chargement plats:', error);
  }
  return [];
}

// Sauvegarder les plats
function saveDishes(userId = 'default', dishes) {
  try {
    let data = {};
    if (fs.existsSync(dishesFile)) {
      data = JSON.parse(fs.readFileSync(dishesFile, 'utf8'));
    }
    data[userId] = dishes;
    fs.writeFileSync(dishesFile, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Erreur sauvegarde plats:', error);
    return false;
  }
}

// ====================================================
// 📡 API ENDPOINTS
// ====================================================

// GET - Récupérer les plats d'un utilisateur
app.get("/api/dishes/:userId", (req, res) => {
  const { userId } = req.params;
  const dishes = loadDishes(userId);
  res.json({ success: true, dishes });
});

// POST - Sauvegarder les plats
app.post("/api/dishes/:userId", (req, res) => {
  const { userId } = req.params;
  const { dishes } = req.body;
  const success = saveDishes(userId, dishes);
  res.json({ success, message: success ? 'Plats sauvegardés' : 'Erreur' });
});

// GET - Récupérer les infos utilisateur
app.get("/api/user/:userId", (req, res) => {
  try {
    if (fs.existsSync(usersFile)) {
      const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
      const user = users[req.params.userId];
      if (user) {
        return res.json({ success: true, user });
      }
    }
  } catch (error) {
    console.error('Erreur chargement user:', error);
  }
  res.json({ success: false, user: { restaurant: 'Mon Restaurant', plan: 'free' } });
});

// POST - Sauvegarder les infos utilisateur
app.post("/api/user/:userId", (req, res) => {
  try {
    let users = {};
    if (fs.existsSync(usersFile)) {
      users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    }
    users[req.params.userId] = req.body.user;
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
    res.json({ success: true });
  } catch (error) {
    console.error('Erreur sauvegarde user:', error);
    res.json({ success: false });
  }
});

// ====================================================
// 🤖 GÉNÉRATION 3D AVEC MESHY.AI
// ====================================================
app.post("/generate-3d", async (req, res) => {
  const { dishName, imageBase64 } = req.body;
  
  if (!dishName || !imageBase64) {
    return res.status(400).json({ 
      success: false, 
      error: "Nom du plat et image requis" 
    });
  }

  console.log(`🎯 Génération Meshy.ai pour: ${dishName}`);
  
  try {
    // 1. Upload l'image vers Meshy
    const uploadResponse = await axios.post(
      'https://api.meshy.ai/v1/image-to-3d',
      {
        image_url: `data:image/jpeg;base64,${imageBase64}`,
        enable_pbr: true,
        resolution: "high"
      },
      {
        headers: {
          'Authorization': `Bearer ${MESHY_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const taskId = uploadResponse.data.id;
    console.log(`✅ Task Meshy créée: ${taskId}`);

    // 2. Attendre la génération
    let status = 'UNKNOWN';
    let attempts = 0;
    const maxAttempts = 60;

    while (!['SUCCEEDED', 'FAILED'].includes(status) && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 10000)); // 10 secondes
      
      const statusResponse = await axios.get(
        `https://api.meshy.ai/v1/image-to-3d/${taskId}`,
        {
          headers: { 'Authorization': `Bearer ${MESHY_API_KEY}` }
        }
      );

      status = statusResponse.data.status;
      attempts++;
      console.log(`⏳ Statut Meshy (${attempts}/${maxAttempts}): ${status}`);
      
      if (status === 'SUCCEEDED') {
        const modelUrl = statusResponse.data.model_urls.glb;
        console.log(`✅ Modèle Meshy généré: ${modelUrl}`);
        return res.json({
          success: true,
          modelUrl: modelUrl,
          status: "ready",
          message: "✅ Modèle 3D généré avec Meshy.ai"
        });
      }
    }

    throw new Error('Timeout génération Meshy.ai');

  } catch (error) {
    console.error('❌ Erreur Meshy.ai:', error.message);
    // Fallback vers modèle de démo
    return res.json({
      success: true,
      modelUrl: "https://modelviewer.dev/shared-assets/models/Astronaut.glb",
      status: "ready", 
      message: "⚠️ Modèle de démonstration",
      isDemo: true
    });
  }
});

// ====================================================
// 🏠 PAGE D'ACCUEIL
// ====================================================
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Olynor Backend</title>
      <style>
        body { font-family: Arial; max-width: 800px; margin: 50px auto; padding: 20px; }
        .status { padding: 20px; background: #e8f5e9; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <h1>🍽️ Olynor Backend</h1>
      <div class="status">
        <strong>✅ Serveur opérationnel</strong>
        <p>Port: ${PORT}</p>
        <p>Meshy AI: ${MESHY_API_KEY ? '✅ Connectée' : '❌ Non configurée'}</p>
      </div>
      <h2>📱 Pages</h2>
      <ul>
        <li><a href="/index.html">Accueil</a></li>
        <li><a href="/dashboard">Dashboard</a></li>
        <li><a href="/menu_html.html">Menu AR</a></li>
      </ul>
    </body>
    </html>
  `);
});

// ====================================================
// 🚀 DÉMARRAGE
// ====================================================
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════╗
║  🚀 OLYNOR BACKEND - MESHY.AI VERSION            ║
╠════════════════════════════════════════════════════╣
║  📡 Serveur: http://localhost:${PORT}              ║
║  🤖 Meshy AI: ${MESHY_API_KEY ? '✅ Connectée' : '❌ Non configurée'}          ║
║  💾 Stockage: Fichiers JSON                       ║
║  🎯 Dashboard: http://localhost:${PORT}/dashboard     ║
║  📱 Menu AR: http://localhost:${PORT}/menu_html.html  ║
╚════════════════════════════════════════════════════╝
  `);
});
