# 🍽️ OLYNOR - Menu AR avec Firebase + Luma AI

## ✅ PROJET FINAL AVEC TOUTES LES CORRECTIONS

### 🎯 Corrections effectuées :

1. ✅ **Server.js** : Stockage côté serveur (JSON)
2. ✅ **Menu AR** : Charge les plats depuis le serveur  
3. ✅ **Nom du restaurant** : Affiché dynamiquement
4. ⚠️ **Dashboard** : À modifier (voir MODIFICATIONS.md)

---

## 🚀 INSTALLATION

```bash
# 1. Installe les dépendances
npm install

# 2. Lance le serveur
npm start
```

---

## 📱 UTILISATION

### 1. Page d'accueil
`http://localhost:3000/index.html`

### 2. Inscription / Connexion
- Firebase intégré ✅
- Redirection automatique vers dashboard ✅

### 3. Dashboard
`http://localhost:3000/dashboard.html`
- Ajouter des plats
- Générer des modèles 3D
- Sélectionner pour le menu QR

### 4. Menu AR (mobile)
`http://192.168.1.13:3000/menu_html.html?user=xxx`

**IMPORTANT** : Remplace `192.168.1.13` par ton IP !
Tape `ipconfig` dans PowerShell pour trouver ton IP.

---

## 🔧 MODIFICATIONS À FAIRE

**Voir le fichier `MODIFICATIONS.md`** pour toutes les modifications détaillées du dashboard.

Les principaux changements :
- Supprimer bouton "Réinitialiser démo"
- Bloquer modification manuelle du plan
- Ajouter bouton "Annuler abonnement"
- Améliorer affichage des stats
- Ajouter explications des métriques
- Ajouter "Plat le plus scanné"
- Ajouter courbes 7/30/90 jours pour Pro

---

## 📂 STRUCTURE

```
olynor-FINAL-COMPLET/
├── server.js              # Backend avec API REST
├── package.json           # Dépendances
├── .env                   # Clé API Luma
├── MODIFICATIONS.md       # Guide des modifications
├── public/
│   ├── index.html         # Page d'accueil
│   ├── dashboard.html     # Dashboard (à modifier)
│   ├── menu_html.html     # Menu AR (✅ corrigé)
│   └── ...autres fichiers
└── data/                  # Créé automatiquement
    ├── dishes.json        # Plats stockés ici
    └── users.json         # Users stockés ici
```

---

## ⚠️ IMPORTANT

### Luma AI
L'API Luma génère des vidéos, pas des GLB parfaits.
Pour l'instant, un modèle de démo (astronaute) est utilisé.

**Pour de vrais modèles 3D** : Intégrer Meshy.ai

### Hébergement
Recommandé : **Render.com** (gratuit)
1. Crée un compte sur render.com
2. Connecte ton GitHub ou upload le projet
3. Configure :
   - Build: `npm install`
   - Start: `npm start`
   - Variables d'environnement : Ajoute `MPX_SDK_BEARER_TOKEN`

---

## 🆘 SUPPORT

Email : Elvoraapp@gmail.com

---

## 🎉 C'EST PRÊT !

Suis le fichier `MODIFICATIONS.md` pour finaliser le dashboard !
