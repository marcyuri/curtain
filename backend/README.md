# LOVE CAN BUILD — Backend

API / Back Office de la plateforme Enterprise LOVE CAN BUILD.

> Ce README évolue au fur et à mesure du développement (Document 13, Chapitre 15 — Roadmap). Chaque étape complétée y ajoute sa section correspondante.

## Stack

| Domaine | Choix |
|---|---|
| Runtime | Node.js (ES Modules — `"type": "module"`, pas de TypeScript) |
| Framework HTTP | Express |
| Base de données | PostgreSQL |
| ORM | Prisma |
| Authentification | JWT (Access + Refresh, rotation) |
| Validation | Zod |
| Logs | Pino |
| Temps réel | Socket.IO |
| Tests | Vitest + Supertest |
| Documentation API | OpenAPI / Swagger |

Architecture complète : voir `Document13-Backend-Architecture-Specification.md` (conception validée avant tout développement).

## Structure du projet

```
backend/
├── prisma/              # Schéma, migrations, seed (à partir de l'Étape 3)
├── src/
│   ├── config/           # Configuration technique (env, logger, cors...)
│   ├── modules/          # Un dossier par domaine métier (auth, products, orders...)
│   ├── middleware/       # authenticate, authorize, validate, errorHandler...
│   ├── routes/           # Déclaration des routes REST, versionnées (/api/v1)
│   ├── errors/           # Classes d'erreurs métier + catalogue de codes
│   ├── shared/           # DTO, types, utilitaires transverses
│   ├── jobs/             # Tâches planifiées
│   ├── sockets/          # Temps réel (Socket.IO)
│   ├── app.js             # Configuration Express (middlewares, routes)
│   └── server.js          # Point d'entrée
├── uploads/              # Stockage local (développement uniquement)
├── logs/
└── tests/
```

## Prérequis

- Node.js ≥ 20
- PostgreSQL (à partir de l'Étape 3)

## Installation

```bash
cd backend
npm install
```

## Scripts disponibles

| Script | Description |
|---|---|
| `npm run dev` | Démarre le serveur en mode développement (`node --watch`) |
| `npm start` | Démarre le serveur |
| `npm run lint` | Vérifie le code avec ESLint |
| `npm run lint:fix` | Corrige automatiquement les problèmes ESLint |
| `npm run format` | Formate le code avec Prettier |

## État d'avancement

Suivi détaillé dans `Document13-Backend-Architecture-Specification.md`, Chapitre 15 (Roadmap).

### ✅ Phase 0 — Socle technique

- [x] **Étape 1 — Initialisation du projet** : `package.json` (ES Modules), ESLint + Prettier, structure de dossiers (Document 13 Ch.2), serveur Express minimal avec `GET /health`.
- [ ] Étape 2 — `config/env.js` + validation Zod des variables d'environnement
- [ ] Étape 3 — Connexion Prisma + premier schéma
- [ ] Étape 4 — Middlewares transverses (errorHandler, requestLogger, format de réponse unique)
- [ ] Étape 5 — Vitest + Supertest, premier test de fumée

### Phase 1 — Auth & RBAC
*À venir.*

### Phase 2 — Catalogue & Commerce
*À venir.*

### Phase 3 — Modules transverses
*À venir.*

### Phase 4 — Modules métier secondaires
*À venir.*

### Phase 5 — Gestion interne (ERP)
*À venir.*

### Phase 6 — Communication
*À venir.*

### Phase 7 — Consolidation Backend
*À venir.*

## Vérifier que le serveur fonctionne

```bash
npm run dev
curl http://localhost:4000/health
```

Réponse attendue :

```json
{
  "success": true,
  "message": "LOVE CAN BUILD API — OK",
  "data": { "uptime": 12.34 }
}
```
