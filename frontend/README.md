# ❤️ LOVE CAN BUILD — Front Office

Bienvenue dans le dépôt officiel du **Front Office** de **LOVE CAN BUILD**.

Ce projet représente la plateforme publique destinée aux visiteurs, clients et partenaires de LOVE CAN BUILD.

---

# 📖 Présentation

LOVE CAN BUILD est une plateforme moderne qui permet de :

- découvrir l'entreprise
- consulter les services proposés
- réserver des consultations psychologiques
- découvrir les événements
- consulter les actualités
- découvrir les produits
- contacter l'équipe
- prendre rendez-vous
- accéder à une expérience utilisateur moderne, rapide et responsive

Le Front Office communique exclusivement avec l'API REST de LOVE CAN BUILD.

---

# 🛠 Technologies

Le projet est développé avec :

- React 19
- JavaScript ES2024
- Vite
- React Router
- Axios
- React Hook Form
- Zod
- Framer Motion
- Lucide React
- Embla Carousel
- React Helmet Async
- i18next

---

# 📁 Architecture

```text
src/

assets/
components/
pages/
layouts/
routes/
hooks/
services/
context/
utils/
constants/
schemas/
styles/
config/
locales/
data/
```

Chaque dossier possède une responsabilité unique.

---

# 🚀 Installation

Cloner le projet

```bash
git clone <repository-url>
```

Installer les dépendances

```bash
npm install
```

Lancer le serveur

```bash
npm run dev
```

Créer la version de production

```bash
npm run build
```

Prévisualiser la version de production

```bash
npm run preview
```

---

# 📦 Scripts disponibles

```bash
npm run dev
```

Lance le serveur de développement.

```bash
npm run build
```

Compile le projet.

```bash
npm run preview
```

Prévisualise le build.

```bash
npm run lint
```

Analyse le code.

```bash
npm run lint:fix
```

Corrige automatiquement les erreurs ESLint.

---

# 🌐 Fonctionnalités

Le Front Office contient notamment :

- Page d'accueil
- À propos
- Produits
- Services
- Consultations
- Réservation
- Blog
- Événements
- Témoignages
- Contact
- FAQ
- Galerie
- Politique de confidentialité
- Conditions d'utilisation

---

# 🌍 Internationalisation

Le site détecte automatiquement la langue du navigateur.

Les traductions sont stockées dans :

```text
src/locales
```

---

# 🎨 Design

Le projet utilise un Design System unique.

Toutes les couleurs, tailles et espacements sont centralisés.

Aucun style ne doit être codé en dur lorsqu'une variable existe.

---

# 🔌 API

Toutes les données proviennent de l'API.

Le Front Office ne contient aucune logique métier serveur.

Les appels HTTP sont regroupés dans :

```text
src/services
```

---

# 📱 Responsive

Le projet est :

- Mobile First
- Tablette
- Desktop
- Grand écran

---

# ♿ Accessibilité

Les composants respectent les bonnes pratiques :

- HTML sémantique
- navigation clavier
- contraste suffisant
- attributs ARIA lorsque nécessaire

---

# 📂 Conventions

- composants réutilisables
- un composant = un dossier
- imports via alias
- aucune duplication de code
- CSS modulaire
- séparation logique / présentation

---

# 📌 Objectif

Créer une plateforme moderne, rapide, évolutive et facilement maintenable.

Le projet doit rester :

- performant
- sécurisé
- responsive
- évolutif
- facilement connectable au Back Office

---

© LOVE CAN BUILD
Tous droits réservés.