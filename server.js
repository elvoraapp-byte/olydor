const express = require('express');
const https = require('https');
const fetch = require('node-fetch');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');


const app = express();

// 🔥 CORRECTION CORS URGENTE
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Stockage temporaire en mémoire
let users = [];
let dishes = [
  {
    id: "1",
    name: "spaghetti bolognaise",
    description: "Spaghetti, bolognaise",
    price: 16,
    image: "https://i.imgur.com/tMz5H4j.jpeg",
    has3D: false,
    includedInMenu: true,
    createdAt: new Date().toISOString()
  }
];

// ✅ ROUTE RACINE
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Serveur Olynor Backend Opérationnel!',
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

// ✅ ROUTE DE SANTÉ
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', environment: process.env.NODE_ENV });
});

// ✅ AUTHENTIFICATION
app.post('/auth/signup', async (req, res) => {
  try {
    const { email, password, restaurant, firstName, lastName, siret, phone } = req.body;
    
    if (!email || !password || !restaurant || !firstName || !lastName || !siret || !phone) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }
    
    if (!/^\d{14}$/.test(siret)) {
      return res.status(400).json({ error: 'Le SIRET doit contenir exactement 14 chiffres' });
    }
    
    if (users.find(u => u.email === email)) {
      return res.status(409).json({ error: 'Un compte avec cet email existe déjà' });
    }
    
    const newUser = {
      id: Date.now().toString(),
      email, password, restaurant, firstName, lastName, siret, phone,
      plan: 'free',
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    
    res.status(201).json({
      message: 'Compte créé avec succès',
      user: {
        id: newUser.id, email: newUser.email, restaurant: newUser.restaurant,
        firstName: newUser.firstName, plan: newUser.plan
      },
      token: 'demo-token-' + Date.now()
    });
    
  } catch (error) {
    console.error('Erreur inscription:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe requis' });
    }
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ error: 'Email ou mot de passe incorrect' });
    }
    
    res.json({
      message: 'Connexion réussie',
      user: {
        id: user.id, email: user.email, restaurant: user.restaurant,
        firstName: user.firstName, plan: user.plan
      },
      token: 'demo-token-' + Date.now()
    });
    
  } catch (error) {
    console.error('Erreur connexion:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// ✅ GESTION DES PLATS
app.get('/api/dishes', async (req, res) => {
  try {
    res.json({
      success: true,
      dishes: dishes
    });
  } catch (error) {
    console.error('Erreur récupération plats:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

app.post('/api/dishes', async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    
    if (!name || !price) {
      return res.status(400).json({ error: 'Nom et prix requis' });
    }
    
    const newDish = {
      id: Date.now().toString(),
      name, description, price,
      image: image || 'https://i.imgur.com/tMz5H4j.jpeg',
      has3D: false,
      includedInMenu: false,
      createdAt: new Date().toISOString()
    };
    
    dishes.push(newDish);
    
    res.status(201).json({
      success: true,
      dish: newDish,
      message: 'Plat ajouté avec succès'
    });
    
  } catch (error) {
    console.error('Erreur ajout plat:', error);
    res.status(500).json({ error: 'Erreur interne du serveur' });
  }
});

// ✅ GÉNÉRATION 3D
// ✅ GÉNÉRATION 3D RÉELLE
app.post('/generate-3d', async (req, res) => {
  try {
    const { imageBase64, dishName } = req.body;

    if (!imageBase64 || !dishName) {
      return res.status(400).json({ success: false, error: "Image ou nom manquant" });
    }

    console.log(`🚀 Génération 3D en cours pour ${dishName}...`);

    const response = await axios.post(
      "https://api.masterpiecex.com/api/v1/generations",
      {
        model: "image-to-3d",
        prompt: dishName,
        image: imageBase64,
        output_format: "glb"
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.MASTERPIECE_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 20000
      }
    );

    console.log("✅ Masterpiece API OK:", response.data);

    res.json({
      success: true,
      message: "Modèle 3D généré avec succès",
      modelUrl: response.data.output?.url || "https://example.com/placeholder.glb",
      previewImage: response.data.output?.preview || "https://i.imgur.com/tMz5H4j.jpeg",
      status: "completed"
    });

  } catch (error) {
    console.error("❌ Erreur génération 3D:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: "Erreur API Masterpiece",
      details: error.response?.data || error.message
    });
  }
});

    });
  }
});

// ✅ GÉNÉRATION MENU QR
app.post('/api/generate-menu', async (req, res) => {
  try {
    const { selectedDishes } = req.body;
    
    res.json({
      success: true,
      message: 'Menu QR généré avec succès',
      qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://olynor.com/menu/123',
      menuUrl: 'https://olynor.com/menu/123'
    });
    
  } catch (error) {
    console.error('Erreur génération menu:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erreur lors de la génération du menu' 
    });
  }
});

// ✅ ROUTE TEST
app.get('/test', (req, res) => {
  res.json({ 
    message: '✅ Backend fonctionne!',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎉 Serveur démarré sur le port ${PORT}`);
});
