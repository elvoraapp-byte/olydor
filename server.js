import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

// ✅ ROUTE RACINE
app.get('/', (req, res) => {
  res.json({ 
    message: '🚀 Serveur Olynor Opérationnel!',
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

// ✅ ROUTE TEST
app.get('/test', (req, res) => {
  res.json({ 
    message: '✅ Test réussi!',
    timestamp: new Date().toISOString()
  });
});

// ✅ ROUTE AUTH SIGNUP
app.post('/auth/signup', (req, res) => {
  res.json({
    success: true,
    message: 'Compte créé avec succès',
    user: {
      id: '1',
      email: req.body.email,
      restaurant: req.body.restaurant,
      plan: 'free'
    },
    token: 'token-' + Date.now()
  });
});

// ✅ ROUTE AUTH LOGIN
app.post('/auth/login', (req, res) => {
  res.json({
    success: true,
    message: 'Connexion réussie',
    user: {
      id: '1',
      email: req.body.email,
      restaurant: 'Test Restaurant',
      plan: 'free'
    },
    token: 'token-' + Date.now()
  });
});

// ✅ ROUTE PLATS
app.get('/api/dishes', (req, res) => {
  res.json({
    success: true,
    dishes: [
      {
        id: "1",
        name: "spaghetti bolognaise",
        description: "Spaghetti, bolognaise",
        price: 16,
        image: "https://i.imgur.com/tMz5H4j.jpeg",
        has3D: false,
        includedInMenu: true
      }
    ]
  });
});

app.post('/api/dishes', (req, res) => {
  res.json({
    success: true,
    dish: {
      id: Date.now().toString(),
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      has3D: false,
      includedInMenu: false
    },
    message: 'Plat ajouté avec succès'
  });
});

// ✅ ROUTE 3D
app.post('/generate-3d', (req, res) => {
  res.json({
    success: true,
    message: 'Modèle 3D généré avec succès',
    modelUrl: 'https://example.com/3d-model.glb',
    status: 'completed'
  });
});

// ✅ ROUTE MENU QR
app.post('/api/generate-menu', (req, res) => {
  res.json({
    success: true,
    message: 'Menu QR généré avec succès',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=olynor-menu-123',
    menuUrl: 'https://olynor.com/menu/123'
  });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎉 SERVEUR DÉMARRÉ SUR LE PORT ${PORT}`);
});
