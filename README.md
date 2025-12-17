📋 Résumé du Projet
3tini est une application mobile complète de gestion d'événements pour "La Grande Soirée Gnawa" à Agadir, conçue pour célébrer la richesse du patrimoine musical Gnawa marocain.
Durée : 5 jours (08/12/2025 - 12/12/2025)
Livrables : 1 Backend + 1 Frontend + Documentation complète
Stack : Node.js/Express + React Native/Expo + PostgreSQL + Zustand + React Query

🎯 Objectifs Pédagogiques

✅ Maîtriser l'architecture MVC Backend
✅ Créer une API REST sécurisée avec JWT
✅ Développer une application mobile React Native
✅ Implémenter la gestion d'état avec Zustand
✅ Utiliser React Query pour le cache et la synchronisation
✅ Configurer le deep linking pour le partage
✅ Gérer le fonctionnement offline avec AsyncStorage
✅ Documenter et tester l'application complète


📁 Structure des Repositories
Backend Repository : 3tini-backend
3tini-backend/
├── src/
│   ├── config/
│   │   └── database.js              # Config Sequelize
│   ├── models/
│   │   ├── Artist.js                # Modèle Artiste (25 lignes)
│   │   ├── Booking.js               # Modèle Réservation (30 lignes)
│   │   ├── EventInfo.js             # Modèle Événement (28 lignes)
│   │   └── index.js                 # Associations (15 lignes)
│   ├── controllers/
│   │   ├── eventController.js       # Logique événement (40 lignes)
│   │   ├── artistController.js      # Logique artistes (80 lignes)
│   │   ├── bookingController.js     # Logique réservations (100 lignes)
│   │   └── authController.js        # Logique auth (60 lignes)
│   ├── routes/
│   │   ├── eventRoutes.js           # Routes événement (8 lignes)
│   │   ├── artistRoutes.js          # Routes artistes (20 lignes)
│   │   ├── bookingRoutes.js         # Routes réservations (15 lignes)
│   │   └── adminRoutes.js           # Routes admin (15 lignes)
│   ├── middleware/
│   │   ├── authMiddleware.js        # Vérification JWT (25 lignes)
│   │   └── errorHandler.js          # Gestion erreurs (30 lignes)
│   ├── utils/
│   │   ├── confirmationCode.js      # Génération codes (15 lignes)
│   │   └── validators.js            # Validation données (40 lignes)
│   └── server.js                    # Point d'entrée (50 lignes)
├── migrations/
│   ├── 20251208-create-artists.js
│   ├── 20251208-create-bookings.js
│   └── 20251208-create-event-info.js
├── seeders/
│   └── 20251208-seed-data.js        # Données initiales
├── tests/
│   ├── artists.test.js
│   ├── bookings.test.js
│   └── api.test.js
├── .env.example                     # Variables (modèle)
├── .env                             # Variables (secrets)
├── .gitignore
├── package.json
└── README.md                        # Documentation complète
Taille totale : ~800 lignes de code (sans tests)

Frontend Repository : 3tini-frontend
3tini-frontend/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js            # Accueil (120 lignes)
│   │   ├── ArtistsListScreen.js     # Liste artistes (150 lignes)
│   │   ├── ArtistDetailScreen.js    # Détails artiste (100 lignes)
│   │   ├── BookingFormScreen.js     # Formulaire (140 lignes)
│   │   ├── MyBookingsScreen.js      # Mes réservations (120 lignes)
│   │   └── SplashScreen.js          # Splash (40 lignes)
│   ├── components/
│   │   ├── EventBanner.js           # Bannière (60 lignes)
│   │   ├── ArtistCard.js            # Carte artiste (80 lignes)
│   │   ├── BookingCard.js           # Carte réservation (70 lignes)
│   │   ├── LoadingSpinner.js        # Spinner (30 lignes)
│   │   ├── ErrorBoundary.js         # Gestion erreurs (50 lignes)
│   │   └── Input.js                 # Input réutilisable (40 lignes)
│   ├── stores/
│   │   ├── bookingStore.js          # Zustand bookings (50 lignes)
│   │   └── eventStore.js            # Zustand event (40 lignes)
│   ├── services/
│   │   ├── api.js                   # Config API (20 lignes)
│   │   ├── eventService.js          # Services événement (30 lignes)
│   │   ├── artistService.js         # Services artistes (35 lignes)
│   │   └── bookingService.js        # Services réservations (40 lignes)
│   ├── navigation/
│   │   ├── RootNavigator.js         # Navigation (80 lignes)
│   │   └── deepLinkingConfig.js     # Deep linking (35 lignes)
│   ├── constants/
│   │   ├── colors.js                # Palette couleurs (20 lignes)
│   │   ├── fonts.js                 # Typographies (15 lignes)
│   │   └── api.js                   # Config API (10 lignes)
│   ├── utils/
│   │   ├── cache.js                 # Gestion cache (40 lignes)
│   │   └── shareUtils.js            # Partage links (30 lignes)
│   ├── App.js                       # Composant root (40 lignes)
│   └── index.js
├── app.json                         # Config Expo
├── app.config.js                    # Config dynamique
├── .env.example
├── package.json
├── .gitignore
└── README.md
Taille totale : ~1200 lignes de code (composants + logique)

🗄️ Schéma de Base de Données
Artists Table
sqlCREATE TABLE Artists (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(255) NOT NULL,
  bio TEXT,
  photoUrl VARCHAR(500),
  horaire TIME,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index pour performance
CREATE INDEX idx_artists_nom ON Artists(nom);
Bookings Table
sqlCREATE TABLE Bookings (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  firstName VARCHAR(100) NOT NULL,
  lastName VARCHAR(100) NOT NULL,
  confirmationCode VARCHAR(50) UNIQUE NOT NULL,
  nombrePlaces INTEGER DEFAULT 1 CHECK (nombrePlaces > 0),
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'confirmed',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_bookings_email ON Bookings(email);
CREATE INDEX idx_bookings_code ON Bookings(confirmationCode);
EventInfo Table
sqlCREATE TABLE EventInfos (
  id SERIAL PRIMARY KEY,
  titre VARCHAR(255) NOT NULL,
  description TEXT,
  dateEvenement DATE NOT NULL,
  lieuEvenement VARCHAR(500) NOT NULL,
  capaciteTotal INTEGER,
  prixBillet DECIMAL(10, 2),
  photoUrl VARCHAR(500),
  coordonnees JSONB DEFAULT '{}',
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

🔌 API Endpoints Complets
PUBLIC ENDPOINTS (Accessible à tous)
MéthodeRouteDescriptionStatusGET/api/eventInfos événement200/500GET/api/artistsListe artistes200/500GET/api/artists/:idDétails artiste200/404/500POST/api/bookingsCréer réservation201/400/500GET/api/bookings/:codeRéservation par code200/404/500GET/api/bookings/email/:emailRéservations par email200/500
PROTECTED ENDPOINTS (Admin avec JWT) 🔒
MéthodeRouteDescriptionStatusPOST/api/auth/loginLogin admin200/401/500POST/api/artistsCréer artiste201/400/401/500PUT/api/artists/:idModifier artiste200/404/401/500DELETE/api/artists/:idSupprimer artiste204/404/401/500

🎨 Design & UX
Palette de couleurs
javascript{
  primary: '#1a472a',      // Vert foncé (Gnawa tradition)
  secondary: '#d4af37',    // Or (Prestigieux)
  accent: '#e74c3c',       // Rouge (Vibrant)
  success: '#27ae60',      // Vert (Succès)
  background: '#f5f5f5',   // Gris clair
  text: '#2c3e50'          // Gris foncé
}
Écrans & Navigation
Home (Accueil)
  ├── Event Info
  ├── Artists Preview
  └── CTA "Réserver"

Artists (Liste)
  ├── Search Bar
  ├── Artist Cards
  └── → Detail View

Artist Detail
  ├── Large Photo
  ├── Bio Complète
  ├── Share Button
  └── "Réserver" Button

Booking Form
  ├── Email Input
  ├── Name Inputs
  ├── Places Selector
  ├── Price Display
  └── Confirmation Code

My Bookings
  ├── Email Search
  ├── Bookings List
  ├── Code Display
  └── Share Options

🔐 Sécurité
Backend

✅ Validation : Toutes les entrées validées
✅ CORS : Configuré pour frontend uniquement
✅ JWT : Authentification pour admin routes
✅ Bcrypt : Hachage des mots de passe
✅ Erreurs : Pas de stack traces en production
✅ .env : Variables sensibles cachées

Frontend

✅ HTTPS : Obligatoire en production
✅ AsyncStorage : Pas de tokens en clair
✅ Validation : Côté client avant API
✅ Deep links : URL validées
✅ Offline : Cache sécurisé


📦 Dépendances Clés
Backend
json{
  "express": "^4.18.0",
  "sequelize": "^6.35.0",
  "pg": "^8.11.0",
  "jwt-simple": "^0.5.6",
  "bcryptjs": "^2.4.3",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "uuid": "^9.0.0"
}
Frontend
json{
  "react": "^18.2.0",
  "react-native": "^0.73.0",
  "expo": "^50.0.0",
  "@react-navigation/native": "^6.1.0",
  "@tanstack/react-query": "^5.0.0",
  "zustand": "^4.4.0",
  "@react-native-async-storage/async-storage": "^1.21.0"
}

📊 Métriques de Projet
Code

Backend : ~800 LOC (logique + API)
Frontend : ~1200 LOC (UI + logique)
Database : 3 tables seulement
API : 10 endpoints principaux
Architecture : MVC Backend + Composants Frontend

Performance (Cibles)

Home screen : < 2 secondes
API réponse : < 500ms
Bundle size : < 5MB
Cache hit : > 80%
Offline : Fully functional

Testing

Unit tests : >= 70% coverage
API tests : Tous endpoints testés
E2E scenarios : 4 scénarios complets
Manual testing : Checklist complète


📅 Timeline de Développement
Jour 1 (08/12) - Setup & Backend

 Créer repos GitHub
 Setup Node.js + Express
 Configurer PostgreSQL
 Créer les 3 models (Artist, Booking, EventInfo)
 Implémenter les controllers

Jour 2 (09/12) - API Backend

 Routes publiques (event, artists, bookings)
 Validation des données
 Gestion des erreurs
 Seeders avec données initiales
 Tests API avec Postman

Jour 3 (10/12) - Frontend Setup

 Setup React Native + Expo
 Configurer navigation (5 screens)
 Créer components de base
 Intégration Zustand + React Query

Jour 4 (11/12) - Frontend Features

 Écran Home complet
 Liste et détails artistes
 Formulaire réservation
 Affichage mes réservations
 Deep linking

Jour 5 (12/12) - Finition & Doc

 Tests complets (4 scénarios)
 Rédaction READMEs
 Diagramme UML
 Collection Postman
 Push repositories
 Présentation démo


✅ Livrables Finaux
Repository Backend

✅ Code source complet (models, controllers, routes)
✅ Configuration database + migrations
✅ Variables d'environnement (.env.example)
✅ Package.json avec dependencies
✅ README détaillé (Setup, API docs, endpoints)
✅ .gitignore pour secrets

Repository Frontend

✅ Code source complet (screens, components, stores)
✅ Services & navigation
✅ Configuration Expo (app.json, app.config.js)
✅ Package.json avec dependencies
✅ README avec architecture
✅ .gitignore pour node_modules

Documentation

✅ README Backend (Setup, API, modèles)
✅ README Frontend (Architecture, installation)
✅ Diagramme UML/Mermaid
✅ Collection Postman JSON
✅ Guide déploiement & test
✅ Scénarios E2E (4 cas complets)

Base de Données

✅ PostgreSQL accessible
✅ 3 tables créées (artists, bookings, event_info)
✅ Données seedées (artistes, événement)
✅ Migrations Sequelize


🎓 Concepts Couverts
Backend

Express.js + MVC architecture
Sequelize ORM & PostgreSQL
RESTful API design
JWT authentication
Error handling & validation
CORS configuration
UUID & timestamps

Frontend

React Native & Expo
Component composition
State management (Zustand)
Data fetching (React Query)
Caching strategy (AsyncStorage)
Navigation (React Navigation)
Deep linking
Responsive design

DevOps & Tools

Git workflow (git, GitHub)
Environment variables (.env)
API testing (Postman)
Database migrations
Package management (npm)


🚀 Bonus Features (Si temps disponible)

 Authentication admin complet
 Email notifications (SendGrid)
 Push notifications
 Payment integration
 Analytics dashboard
 Image upload (AWS S3)
 Real-time notifications (WebSocket)
 Multi-language support
 Dark mode
 PWA version


📞 Support & Ressources
Documentation

Express.js
Sequelize
React Native
React Query
Zustand
React Navigation

Tools

Postman
GitHub
PostgreSQL
VS Code
Expo


🎯 Critères d'Évaluation
Code (30 points)

Architecture MVC correcte
Code propre & lisible
Gestion d'erreurs robuste
Validation données complète

Fonctionnalités (30 points)

5 écrans mobiles opérationnels
API endpoints complets
Réservations fonctionnelles
Deep linking opérationnel

Tests (20 points)

4 scénarios E2E complétés
Collection Postman validée
Pas de bugs majeurs
Documentation complète

Présentation (20 points)

Démo fluide (10 min)
Architecture expliquée (10 min)
Réponses aux questions
Qualité documentation


📝 Notes Importantes

Focalisez-vous sur le MVP : Les 3 tables DB + 10 endpoints
Frontend d'abord : L'UX est plus importante que les features bonus
Testing progressif : Tester au fur et à mesure du développement
Documentation vivante : READMEs mis à jour quotidiennement
Git commits réguliers : Petit commits avec messages clairs


Bon courage et bienvenue dans "La Grande Soirée Gnawa" ! 🎵

Profitez de cette opportunité pour créer une belle application tout en célébrant la richesse du patrimoine musical marocain !