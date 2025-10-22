<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>Olynor – Menus 3D/AR pour restaurants</title>
  <meta name="description" content="Olynor: menu 3D/AR via QR code. Augmentez vos ventes, réduisez les retours et suivez vos statistiques."/>
  <link rel="icon" href="favicon.ico">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    html,body{font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif}
    .grad{background-image:linear-gradient(90deg,#60a5fa,#2563eb)}
    .text-grad{background-image:linear-gradient(90deg,#60a5fa,#2563eb);-webkit-background-clip:text;background-clip:text;color:transparent}
    .card{background:#fff;border:1px solid #e5e7eb;border-radius:1rem}
    .modal{position:fixed;inset:0;background:rgba(0,0,0,.45);display:none;align-items:center;justify-content:center;z-index:60}
    .modal.active{display:flex}
    .chip{border:1px solid #bfdbfe;background:#eff6ff}
    .fade{opacity:0;transform:translateY(10px);transition:.5s}
    .fade.show{opacity:1;transform:none}
    .qr-cta:hover{transform:scale(1.03)}
  </style>
</head>
<body class="bg-gradient-to-br from-slate-50 to-white text-slate-800">
  
  <header class="sticky top-0 z-50 bg-white/85 backdrop-blur border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-5 py-5 flex items-center justify-between">
      <a href="#home" class="flex items-center gap-3">
        <div class="w-10 h-10 grad rounded-xl flex items-center justify-center text-white font-bold">O</div>
        <span class="font-extrabold text-xl text-slate-900">Olynor</span>
      </a>
      <nav class="hidden md:flex items-center gap-8 text-base font-medium">
        <a href="#how" class="hover:text-slate-900 text-slate-600">Comment ça marche ?</a>
        <a href="#pricing" class="hover:text-slate-900 text-slate-600">Tarifs</a>
        <a href="#faq" class="hover:text-slate-900 text-slate-600">FAQ</a>
        <a href="#contact" class="hover:text-slate-900 text-slate-600">Contact</a>
      </nav>
      <div class="flex items-center gap-3">
        <button id="btnLogin" class="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50">Connexion</button>
        <button id="btnSignup" class="px-4 py-2 rounded-lg grad text-white">Inscription</button>
      </div>
    </div>
  </header>

  <section id="home" class="relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-5 pt-14 pb-10 grid md:grid-cols-2 gap-10 items-center">
      <div class="fade">
        <div class="inline-flex items-center gap-2 text-xs chip px-2 py-1 rounded-full mb-4 text-slate-700">
          <span>✨ Nouveau</span><span class="text-slate-400">•</span><span>Menu 3D & AR sans application</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-extrabold leading-tight text-slate-900">
          Faites vivre vos plats en <span class="text-grad">3D</span>.<br/>Vendez avant la première bouchée.
        </h1>
        <p class="mt-5 text-lg text-slate-600">
          Olynor transforme votre carte en expérience interactive : vos clients scannent un QR code, explorent vos plats en 3D/AR et commandent en toute confiance.
          Résultat : plus de ventes, moins de retours.
        </p>
        <div class="mt-6 flex flex-wrap gap-3">
          <a href="#pricing" onclick="goFree(); return false;" class="px-5 py-3 grad text-white rounded-xl">Commencer gratuitement</a>
        </div>
      </div>
      <div class="relative fade">
        <img src="https://i.imgur.com/tMz5H4j.jpeg" alt="Scan 3D d'un plat dans un restaurant" class="w-full h-auto rounded-3xl shadow-2xl object-cover"/>
        <div class="absolute -bottom-5 -right-5 bg-white/90 backdrop-blur border border-slate-200 rounded-2xl p-4 shadow">
          <div class="text-xs text-slate-500">Exemple</div>
          <div class="font-semibold">Scan QR → Plat en 3D</div>
        </div>
      </div>
    </div>
  </section>

  <section id="how" class="py-16 bg-gradient-to-b from-white to-slate-100 fade">
    <div class="max-w-7xl mx-auto px-5">
      <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900">Comment ça marche ?</h2>
      <div class="mt-8 grid md:grid-cols-2 gap-8 items-center">
        <div class="card p-6">
          <div class="grid grid-cols-3 gap-4">
            <div>
              <div class="w-10 h-10 grad rounded-lg text-white flex items-center justify-center font-bold">1</div>
              <h3 class="font-bold mt-3">Générez votre QR</h3>
              <p class="text-sm text-slate-600 mt-2">Un QR code unique, prêt à imprimer/partager.</p>
            </div>
            <div>
              <div class="w-10 h-10 grad rounded-lg text-white flex items-center justify-center font-bold">2</div>
              <h3 class="font-bold mt-3">Vos plats en 3D</h3>
              <p class="text-sm text-slate-600 mt-2">Photos & modèles 3D à l'échelle.</p>
            </div>
            <div>
              <div class="w-10 h-10 grad rounded-lg text-white flex items-center justify-center font-bold">3</div>
              <h3 class="font-bold mt-3">Suivez les résultats</h3>
              <p class="text-sm text-slate-600 mt-2">Courbe hebdo, top 3, export CSV (Premium).</p>
            </div>
          </div>
        </div>
        <div class="text-center">
          <a href="https://www.instagram.com/olynorapp/" target="_blank" class="inline-block transform transition qr-cta" title="Suivez-nous sur Instagram">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://www.instagram.com/olynorapp/" alt="QRCode Instagram" class="mx-auto rounded-xl border shadow"/>
          </a>
          <p class="text-sm text-slate-600 mt-3">Scannez pour découvrir notre Instagram</p>
        </div>
      </div>
    </div>
  </section>

  <section id="pricing" class="py-16 bg-white fade">
    <div class="max-w-7xl mx-auto px-5">
      <div class="text-center max-w-3xl mx-auto">
        <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900">Tarifs simples et transparents</h2>
        <p class="mt-3 text-slate-600">Paiement 100% sécurisé via Stripe. Connexion requise avant l'achat.</p>
      </div>
      <div class="mt-10 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div class="card p-8">
          <h3 class="text-xl font-bold">Gratuit</h3>
          <div class="text-4xl font-extrabold mt-2">0€</div>
          <p class="text-slate-500">par mois</p>
          <ul class="mt-5 space-y-2 text-sm">
            <li>• Jusqu'à 2 plats</li>
            <li>• QR code global</li>
            <li>• Sans carte bancaire</li>
            <li>• Pas de statistiques</li>
          </ul>
          <button class="mt-6 w-full px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50" onclick="ensureAccount('free')">Commencer</button>
        </div>
        <div class="card p-8 border-2 border-blue-500 relative">
          <span class="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-blue-600 text-white px-3 py-1 rounded-full">Populaire</span>
          <h3 class="text-xl font-bold">Pro</h3>
          <div class="text-4xl font-extrabold mt-2">49€</div>
          <p class="text-slate-500">par mois</p>
          <ul class="mt-5 space-y-2 text-sm">
            <li>• Jusqu'à 20 plats maximum</li>
            <li>• QR code global & partage en ligne</li>
            <li>• Statistiques basiques</li>
            <li>• Support email</li>
          </ul>
          <button class="mt-6 w-full px-4 py-2 rounded-lg grad text-white" onclick="buyPlan('pro')">Choisir Pro</button>
        </div>
        <div class="card p-8">
          <h3 class="text-xl font-bold">Premium</h3>
          <div class="text-4xl font-extrabold mt-2">99€</div>
          <p class="text-slate-500">par mois</p>
          <ul class="mt-5 space-y-2 text-sm">
            <li>• Plats illimités</li>
            <li>• QR code global & partage en ligne</li>
            <li>• Statistiques avancées (courbe 7 jours, top 3, export CSV)</li>
            <li>• A/B test visuels</li>
            <li>• Support prioritaire</li>
          </ul>
          <button class="mt-6 w-full px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50" onclick="buyPlan('premium')">Choisir Premium</button>
        </div>
      </div>
    </div>
  </section>

  <section id="faq" class="py-16 bg-white fade">
    <div class="max-w-7xl mx-auto px-5">
      <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900">FAQ</h2>
      <div class="mt-8 grid md:grid-cols-2 gap-6">
        <div class="card p-6">
          <h3 class="font-bold">À quoi ça sert concrètement ?</h3>
          <p class="mt-2 text-sm text-slate-700">Olynor aide vos clients à visualiser précisément ce qu'ils vont recevoir avant de commander. Résultat : ils commandent en confiance, vous réduisez les retours et les insatisfactions, et vous augmentez votre chiffre d'affaires grâce à des décisions d'achat plus rapides et sûres.</p>
        </div>
        <div class="card p-6">
          <h3 class="font-bold">Différence Pro vs Premium ?</h3>
          <div class="mt-2 text-sm text-slate-700 space-y-2">
            <p><strong>Pro (49€/mois)</strong> : jusqu'à 20 plats, QR code global, statistiques basiques (total de scans, scans/semaine), support email.</p>
            <p><strong>Premium (99€/mois)</strong> : plats illimités, statistiques avancées (courbe 7 jours, top 3 plats, export CSV), A/B test des visuels, support prioritaire.</p>
          </div>
        </div>
        <div class="card p-6">
          <h3 class="font-bold">Le client voit-il vraiment le plat "en vrai" ?</h3>
          <p class="mt-2 text-sm text-slate-700">Oui. Grâce à la 3D et à l'AR, il peut visualiser la portion à l'échelle sur sa table (mobile compatible). Aucun téléchargement d'application n'est nécessaire.</p>
        </div>
        <div class="card p-6">
          <h3 class="font-bold">Puis-je partager le menu en ligne ?</h3>
          <p class="mt-2 text-sm text-slate-700">Oui. Le QR code pointe vers une URL publique de votre menu. Vous pouvez l'intégrer sur votre site ou réseaux sociaux.</p>
        </div>
        <div class="card p-6">
          <h3 class="font-bold">Avez-vous une offre gratuite ?</h3>
          <p class="mt-2 text-sm text-slate-700">Oui, pour tester : 2 plats, QR code global, pas de CB ni de statistiques.</p>
        </div>
      </div>
    </div>
  </section>

  <section id="contact" class="py-16 bg-gradient-to-b from-white to-slate-100 fade">
    <div class="max-w-3xl mx-auto px-5">
      <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 text-center">Contactez-nous</h2>
      <p class="text-center text-slate-600 mt-2">Écrivez-nous à <a class="underline text-blue-600" href="mailto:Elvoraapp@gmail.com">Elvoraapp@gmail.com</a></p>
    </div>
  </section>

  <footer class="bg-slate-900 text-slate-200">
    <div class="max-w-7xl mx-auto px-5 py-12 grid md:grid-cols-4 gap-8">
      <div>
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 grad rounded-lg text-white flex items-center justify-center font-bold">O</div>
          <div class="font-extrabold text-lg">Olynor</div>
        </div>
        <p class="text-slate-400 mt-3 text-sm">Menus 3D & AR pour restaurants. Scannez, visualisez, commandez.</p>
        <div class="mt-4">
          <a href="https://www.instagram.com/olynorapp/" target="_blank" class="inline-flex items-center gap-2 text-slate-300 hover:text-white transition">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"/></svg>
            <span class="text-sm">@olynorapp</span>
          </a>
        </div>
      </div>
      <div>
        <div class="font-bold">Navigation</div>
        <ul class="mt-3 space-y-2 text-sm text-slate-300">
          <li><a href="#how" class="hover:underline">Comment ça marche ?</a></li>
          <li><a href="#pricing" class="hover:underline">Tarifs</a></li>
          <li><a href="#faq" class="hover:underline">FAQ</a></li>
          <li><a href="#contact" class="hover:underline">Contact</a></li>
        </ul>
      </div>
      <div>
        <div class="font-bold">Légal</div>
        <ul class="mt-3 space-y-2 text-sm text-slate-300">
          <li><a href="cgu.html" class="hover:underline">CGU</a></li>
          <li><a href="confidentialite.html" class="hover:underline">Politique de confidentialité</a></li>
          <li><a href="mentions-legales.html" class="hover:underline">Mentions légales</a></li>
          <li><a href="cookies.html" class="hover:underline">Cookies</a></li>
        </ul>
      </div>
      <div>
        <div class="font-bold">Nous écrire</div>
        <p class="text-sm text-slate-300 mt-3"><a class="hover:underline" href="mailto:Elvoraapp@gmail.com">Elvoraapp@gmail.com</a></p>
      </div>
    </div>
    <div class="border-t border-slate-700"></div>
    <div class="max-w-7xl mx-auto px-5 py-6 text-xs text-slate-400">© <span id="y"></span> Olynor – Tous droits réservés.</div>
  </footer>

  <!-- Modal Authentification -->
  <div id="authModal" class="modal">
    <div class="bg-white rounded-2xl max-w-md w-full mx-4 p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 id="authTitle" class="text-lg font-bold">Connexion</h3>
        <button onclick="toggleAuth(false)" class="text-2xl text-slate-400 hover:text-slate-600">×</button>
      </div>
      <form id="authForm" class="space-y-3">
        <div id="signupFields" class="space-y-3">
          <input id="authRestaurant" placeholder="Nom du restaurant" class="w-full px-4 py-3 border rounded-lg"/>
          <div class="grid grid-cols-2 gap-3">
            <input id="authFirstName" placeholder="Prénom" class="w-full px-4 py-3 border rounded-lg"/>
            <input id="authLastName" placeholder="Nom" class="w-full px-4 py-3 border rounded-lg"/>
          </div>
          <input id="authSIRET" placeholder="Numéro de SIRET (14 chiffres)" maxlength="14" class="w-full px-4 py-3 border rounded-lg"/>
          <input id="authPhone" type="tel" placeholder="Téléphone" class="w-full px-4 py-3 border rounded-lg"/>
        </div>
        <input id="authEmail" type="email" placeholder="Email" required class="w-full px-4 py-3 border rounded-lg"/>
        <input id="authPass" type="password" placeholder="Mot de passe" required class="w-full px-4 py-3 border rounded-lg"/>
        <button type="submit" class="w-full px-4 py-3 grad text-white rounded-lg font-semibold" id="authSubmitBtn">
          <span id="authSubmitText">Valider</span>
          <span id="authSubmitLoader" class="hidden">⏳ Chargement...</span>
        </button>
        <div class="text-sm text-slate-600 text-center"><span id="authSwitch"></span></div>
      </form>
    </div>
  </div>

  <script>
    // 🔧 CORRECTION 1: URL API Render
    const API_URL = 'https://olydor.onrender.com/api';

    document.getElementById('y').textContent = new Date().getFullYear();
    
    // Animations au scroll
    const onScroll = () => {
      document.querySelectorAll('.fade').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.top < window.innerHeight - 80) el.classList.add('show');
      });
    };
    window.addEventListener('scroll', onScroll);
    window.addEventListener('load', onScroll);

    // Gestion authentification
    const authModal = document.getElementById('authModal');
    const authTitle = document.getElementById('authTitle');
    const authSwitch = document.getElementById('authSwitch');
    const signupFields = document.getElementById('signupFields');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignup = document.getElementById('btnSignup');
    const authSubmitBtn = document.getElementById('authSubmitBtn');
    const authSubmitText = document.getElementById('authSubmitText');
    const authSubmitLoader = document.getElementById('authSubmitLoader');
    
    let mode = 'login';

    btnLogin.addEventListener('click', () => openAuth('login'));
    btnSignup.addEventListener('click', () => openAuth('signup'));

    // Ouvre la modale directement (CTA gratuit)
    function goFree() {
      openAuth('signup');
      setTimeout(() => { authModal.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 50);
    }
    
    function openAuth(m) {
      mode = m;
      toggleAuth(true);
      
      if (m === 'signup') {
        authTitle.textContent = 'Inscription';
        signupFields.classList.remove('hidden');
        authSwitch.innerHTML = 'Déjà un compte ? <a href="#" class="underline text-blue-600" onclick="openAuth(\'login\'); return false;">Se connecter</a>';
      } else {
        authTitle.textContent = 'Connexion';
        signupFields.classList.add('hidden');
        authSwitch.innerHTML = 'Nouveau ? <a href="#" class="underline text-blue-600" onclick="openAuth(\'signup\'); return false;">Créer un compte</a>';
      }
    }
    
    function toggleAuth(open) {
      authModal.classList.toggle('active', !!open);
    }

    // 🔧 CORRECTION 2 & 3 & 4: Fetch sécurisé + gestion erreurs + compatibilité Render
    async function makeApiCall(url, options = {}) {
      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            'Content-Type': 'application/json',
            ...options.headers,
          },
        });

        // 🔧 Protection contre "Unexpected token '<'"
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(`Réponse non-JSON du serveur: ${text.substring(0, 100)}`);
        }

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || `Erreur HTTP ${response.status}`);
        }

        return data;
      } catch (error) {
        console.error('Erreur API:', error);
        throw error;
      }
    }
    
    document.getElementById('authForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const email = document.getElementById('authEmail').value.trim();
      const password = document.getElementById('authPass').value.trim();
      
      if (!email || !password) {
        alert('Veuillez remplir email et mot de passe');
        return;
      }
      
      // Désactiver le bouton
      authSubmitBtn.disabled = true;
      authSubmitText.classList.add('hidden');
      authSubmitLoader.classList.remove('hidden');
      
      try {
        if (mode === 'signup') {
          const restaurant = document.getElementById('authRestaurant').value.trim();
          const firstName = document.getElementById('authFirstName').value.trim();
          const lastName = document.getElementById('authLastName').value.trim();
          const siret = document.getElementById('authSIRET').value.trim();
          const phone = document.getElementById('authPhone').value.trim();
          
          if (!restaurant || !firstName || !lastName || !siret || !phone) {
            alert('Veuillez remplir tous les champs');
            return;
          }
          
          if (!/^\d{14}$/.test(siret)) {
            alert('Le SIRET doit contenir exactement 14 chiffres');
            return;
          }

          // 🔧 Appel backend sécurisé
          const data = await makeApiCall(`${API_URL}/auth/signup`, {
            method: 'POST',
            body: JSON.stringify({ email, password, restaurant, firstName, lastName, siret, phone })
          });
          
          localStorage.setItem('olynor_token', data.token);
          localStorage.setItem('olynor_user', JSON.stringify(data.user));
          alert('✅ Compte créé avec succès !');
          toggleAuth(false);
          
        } else {
          // 🔧 Appel backend sécurisé
          const data = await makeApiCall(`${API_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ email, password })
          });
          
          localStorage.setItem('olynor_token', data.token);
          localStorage.setItem('olynor_user', JSON.stringify(data.user));
          alert('✅ Connexion réussie !');
          toggleAuth(false);
        }
      } catch (error) {
        console.error('Erreur:', error);
        alert(error.message || 'Erreur de connexion au serveur');
      } finally {
        authSubmitBtn.disabled = false;
        authSubmitText.classList.remove('hidden');
        authSubmitLoader.classList.add('hidden');
      }
    });

    // Liens Stripe (paiements) — redirection directe
    const STRIPE_LINKS = {
      pro: 'https://buy.stripe.com/7sY8wP7Q775v9RLdqy2kw00',
      premium: 'https://buy.stripe.com/cNi14ndar2Pfgg95Y62kw01'
    };
    
    function ensureAccount(plan) {
      // Offre gratuite : ouvre inscription (modale)
      openAuth('signup');
    }
    
    function buyPlan(plan) {
      // Redirection directe vers Stripe (sans exiger d'être connecté)
      window.location.href = STRIPE_LINKS[plan];
    }
  </script>

</body>
</html>
