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
cp .env.example .env
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
- [x] **Étape 2 — Configuration & validation d'environnement** : `config/env.js`, schéma Zod (`NODE_ENV`, `PORT`, `API_PREFIX`, `DATABASE_URL`), échec immédiat au démarrage si une variable est invalide (*fail fast*, Document 10). `.env.example` documenté.
- [x] **Étape 3 — Prisma** : premier schéma (`User`, `Role`, `Permission`, `UserRole`, `RolePermission`, `RefreshToken` avec session glissante `idleExpiresAt`/`absoluteExpiresAt`, Document 13 Ch.6.7), `config/database.js` (instance Prisma unique), seed (`permissions` → `rôles` → `Super Admin`, ordre strict, Document 13 Ch.4.6). `GET /health` rapporte l'état de la connexion base de données.
  ⚠️ `npm run db:generate` et `npm run db:migrate` n'ont pas pu être exécutés dans l'environnement de développement de Claude (`binaries.prisma.sh` bloqué par la politique réseau du bac à sable). À vérifier/confirmer sur une machine avec accès réseau complet.
- [x] **Étape 4 — Middlewares transverses** : `errors/AppError.js` + 5 classes dérivées (`ValidationError`, `NotFoundError`, `UnauthorizedError`, `ForbiddenError`, `ConflictError`) + `errors/errorCodes.js` (catalogue centralisé, Document 13 Ch.10.2). `shared/utils/apiResponse.js` (`success()`/`fail()`, format de réponse unique incluant désormais `code`). `middleware/errorHandler.js` (dernier de la chaîne, ne fuite jamais de détail technique en dehors du développement), `middleware/notFoundHandler.js`, `middleware/requestLogger.js` (Pino, requestId propagé, redaction des champs sensibles). `config/logger.js` : instance Pino partagée. `server.js` n'utilise plus `console.log` ni `process.env` directement.
- [x] **Étape 5 — Vitest + Supertest** : `vitest.config.js` + `tests/setup.js` (logs Pino silencieux pendant les tests). Premier test d'intégration (`tests/integration/health.test.js`, 4 tests) sur `GET /health` et une route inconnue, avec le client Prisma mocké (`vi.mock`) pour que le test soit portable et ne dépende pas d'une base de données réellement migrée — conforme à Document 13 Ch.13.6 (environnement de test isolé). Un vrai test d'intégration avec base de données réelle sera ajouté à la Phase 1 (module `auth`), une fois `prisma migrate` vérifié en conditions réelles.

**Phase 0 terminée.** Les 5 étapes du socle technique sont en place : projet initialisé, configuration validée, Prisma connecté (schéma + seed), middlewares transverses, tests automatisés. Prochaine étape : Phase 1 — Auth & RBAC (Document 13 Ch.15).

### Phase 1 — Auth & RBAC

- [x] **Étape 6 — Modules `permissions` + `roles`** : structure de module complète (routes/controller/service/repository/schema/dto, Document 13 Ch.3). `permissions` : lecture seule (les permissions sont fixées par seed, Document 06 Ch.5). `roles` : CRUD complet avec règles métier réelles dans le service — clé unique (`ConflictError`), rôle introuvable (`NotFoundError`), suppression bloquée si des utilisateurs utilisent encore le rôle. Gestion des permissions d'un rôle en transaction (`prisma.$transaction`). Nouveau `middleware/validate.js` (Document 13 Ch.9.2), branché sur les schémas Zod du module. Routes montées sous `/api/v1/permissions` et `/api/v1/roles` (`routes/index.js`, `routes/v1/index.js`).
  Catalogue de permissions complété : `role.*`, `permission.read`, `user.*` manquaient pour administrer le RBAC lui-même — ajoutés au seed et au miroir Frontend (`constants/permissions.js`).
- [x] **Étape 7 — Module `users`** : CRUD complet avec pagination réelle (`shared/utils/pagination.js`, `DEFAULT_PAGE_SIZE` miroir du Frontend), recherche (`?search=`, sur email/prénom/nom). Soft delete (`deletedAt`) — aucune requête de lecture ne renvoie un utilisateur supprimé (Document 12 Ch.13). Règles métier dans le service : email unique (`ConflictError`, code `EMAIL_ALREADY_EXISTS`), mot de passe haché via le nouveau `shared/utils/hashPassword.js` (bcrypt, coût 12, Document 13 Ch.6.6) avant toute écriture, protection contre l'auto-suppression de son propre compte (`requestingUserId`, prêt à être branché sur `req.user` dès l'Étape 9). DTO strict : `passwordHash` n'est jamais exposé (mapping champ par champ, jamais de spread), vérifié explicitement par un test dédié.

⚠️ **`permissions`, `roles` et `users` sont temporairement non protégés** : `authenticate`/`authorize` n'existent pas encore (Étape 9). Chaque fichier de routes le rappelle explicitement en commentaire. À sécuriser avant toute exposition publique.
- [x] **Étape 8 — Module `auth`** : login, register, refresh, logout, `/me`, forgot/reset password, verify email — contrat HTTP exactement conforme à `frontend/src/services/authService.js`, déjà écrit dès l'étape 3 du chantier Frontend.
  - **Session glissante implémentée telle que conçue au Document 13 Ch.6.7** : `idleExpiresAt` (30 min, repoussée à chaque refresh) et `absoluteExpiresAt` (30 jours, jamais prolongée), les deux vérifiées à chaque `POST /auth/refresh`.
  - **Rotation du Refresh Token** à chaque refresh (Ch.6.3), avec **détection de réutilisation** : un token déjà révoqué présenté à nouveau révoque toutes les sessions de l'utilisateur par précaution.
  - Cookie httpOnly + secure (prod) + sameSite=strict, persistant (`Max-Age` = plafond absolu) — jamais accessible en JavaScript.
  - Nouveaux utilitaires : `shared/utils/jwt.js` (signature/vérification de l'Access Token, payload incluant rôles + permissions), `shared/utils/tokenHash.js` (SHA-256 déterministe pour les tokens de refresh/reset/vérification — bcrypt, non déterministe, ne convient pas à un lookup par hash).
  - Schéma étendu : `PasswordResetToken`, `EmailVerificationToken` (Document 13 Ch.4.2), `User.emailVerifiedAt`.
  - Nouveau `middleware/authenticate.js` (Document 13 Ch.7.3), créé en avance sur l'Étape 9 : `/auth/me` en a structurellement besoin pour fonctionner (ce n'est pas une simple protection optionnelle contrairement aux autres modules).
  - `forgotPassword` ne révèle jamais si un email existe (anti-énumération). `resetPassword` révoque toutes les sessions actives après un changement de mot de passe réussi.
  - Envoi d'email réel non implémenté (Document 13 Ch.11, module `notifications` pas encore construit) — les tokens sont créés et fonctionnels, marqués `TODO` à l'endroit exact de l'envoi.
- [ ] Étape 9 — Middleware `authorize` (+ sécurisation rétroactive de `roles`/`permissions`/`users`)

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
