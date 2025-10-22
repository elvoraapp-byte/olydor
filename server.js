// ==============================
// 🌐 OLYNOR BACKEND SERVER (Axios + HTTPS stable sur Windows)
// ==============================

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';
import https from 'https';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// ==============================
// ✅ ROUTE DE TEST
// ==============================
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: '✅ Backend Olynor opérationnel !' });
});

// ==============================
// 🧠 ROUTE DE GÉNÉRATION 3D (Masterpiece)
// ==============================
app.post('/api/generate-3d', async (req, res) => {
  try {
    const { imageBase64, dishName } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ success: false, error: 'Image manquante (base64)' });
    }

    console.log('📸 Requête reçue /api/generate-3d');
    console.log('🧾 Plat :', dishName);

    // === Agent HTTPS robuste pour Windows ===
    const httpsAgent = new https.Agent({
      rejectUnauthorized: false,
      keepAlive: true,
    });

    // === Test local sans clé ===
    if (!process.env.MASTERPIECE_API_KEY) {
      console.warn('⚠️ Clé API Masterpiece absente → mode démo');
      await new Promise((r) => setTimeout(r, 1000));
      return res.json({
        success: true,
        modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
      });
    }

    console.log('🔗 Envoi de la requête à Masterpiece...');

    // === Requête via Axios ===
    const response = await axios.post(
      'https://api.masterpiece.ai/v1/generate',
      {
        image: imageBase64,
        prompt: `3D model of ${dishName}, realistic, professional lighting, food presentation`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.MASTERPIECE_API_KEY}`,
        },
        httpsAgent,
        timeout: 30000,
      }
    );

    console.log('📦 Réponse Masterpiece :', response.data);

    // === Vérification de la réponse ===
    if (!response.data || !response.data.model_url) {
      console.error('❌ Erreur Masterpiece :', response.data);
      return res.status(500).json({
        success: false,
        error: response.data.error || 'Erreur Masterpiece API',
      });
    }

    console.log('✅ Modèle 3D généré via Masterpiece :', response.data.model_url);
    res.json({ success: true, modelUrl: response.data.model_url });
  } catch (err) {
    console.error('💥 Erreur backend /api/generate-3d :', err);
    res.status(500).json({ success: false, error: 'Erreur serveur interne' });
  }
});

// ==============================
// 🚀 LANCEMENT DU SERVEUR
// ==============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Serveur Olynor lancé sur le port ${PORT}`);
  console.log(`🔑 Clé Masterpiece chargée ? ${!!process.env.MASTERPIECE_API_KEY}`);
});
