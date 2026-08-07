# LOVE CAN BUILD — AI DEVELOPMENT MASTER PROMPT
# DOCUMENT 13
## BACKEND ARCHITECTURE SPECIFICATION
### Enterprise Node.js / Express / PostgreSQL / Prisma Standard

**Version 1.0 — Phase de conception (aucun code)**

> Ce document est le pendant Backend des Documents 01 à 12 (Frontend). Il ne contient aucune implémentation : il fixe l'architecture, les conventions et la roadmap que le Backend devra respecter, exactement comme les Documents 01-12 l'ont fait pour le Frontend. Aucune ligne de code ne sera écrite tant que ce document n'est pas validé.

---

## CHAPITRE 1 — Philosophie et principes directeurs

Le Backend LOVE CAN BUILD suit exactement la même philosophie que le Frontend (Document 01) :

- **Simplicité** avant complexité.
- **Modularité** : chaque domaine métier (module) est indépendant, avec une frontière claire.
- **Responsabilité unique** à chaque couche (route → controller → service → repository → base de données).
- **Le Frontend ne connaît jamais l'implémentation interne du Backend** (Document 07) : le contrat REST est la seule interface. Le Backend est donc libre dans son architecture interne tant que le contrat API documenté est respecté.
- **Le Backend est la seule autorité** en matière de règles métier, de sécurité, de permissions et de validation finale (Document 10).
- Chaque décision technique est évaluée avec la même question que le Frontend (Document 01, Ch.7) : *« Cette décision facilitera-t-elle encore le développement du projet dans cinq ans ? »*

### Stack officielle (rappel, déjà validée)

| Domaine | Choix |
|---|---|
| Runtime | Node.js (LTS) |
| Langage | JavaScript (ES Modules — `"type": "module"`), pas de TypeScript |
| Framework HTTP | Express |
| Base de données | PostgreSQL |
| ORM | Prisma |
| Authentification | JWT (access + refresh) |
| Style API | REST |

### Convention de syntaxe (validée)

Le Backend est en **ES Modules natifs** (`import`/`export`), jamais `require`/`module.exports` (CommonJS). `package.json` déclare `"type": "module"`. Chaque fichier `.js` peut donc utiliser `import` directement, sans étape de transpilation ni bundler côté serveur.

### Décisions à valider avec ce document

En plus de la stack ci-dessus, ce document propose des choix précis pour les briques non encore tranchées. Chacune est marquée **[DÉCISION PROPOSÉE]** — à valider ou amender avant implémentation.

- **[DÉCISION PROPOSÉE]** Validation : **Zod** (cohérence totale avec le Frontend, un seul langage de validation dans tout l'écosystème, schémas potentiellement partageables).
- **[DÉCISION PROPOSÉE]** Logs applicatifs : **Pino** (performant, structuré JSON, standard Node Enterprise).
- **[DÉCISION PROPOSÉE]** Upload/stockage fichiers : stockage **local en développement**, **compatible S3 (ou équivalent)** en production via une interface d'abstraction (Chapitre 10).
- **[DÉCISION PROPOSÉE]** Emails : **Nodemailer** en développement (Mailtrap ou équivalent), fournisseur transactionnel (Resend, SendGrid ou AWS SES) en production, derrière une interface commune.
- **[DÉCISION PROPOSÉE]** Temps réel : **Socket.IO** (déjà pressenti au Document 07 Ch.17 comme option validée : « WebSocket, Server-Sent Events, ou une technologie équivalente validée »).
- **[DÉCISION PROPOSÉE]** Tests : **Vitest** pour les tests unitaires/intégration (cohérence avec le Frontend), **Supertest** pour les tests HTTP des routes.
- **[DÉCISION PROPOSÉE]** Documentation API : **OpenAPI/Swagger**, généré à partir des schémas Zod (via `zod-to-openapi` ou équivalent).

---

## CHAPITRE 2 — Arborescence complète du Backend

```
backend/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed/
│       ├── index.js
│       ├── seedRoles.js
│       ├── seedPermissions.js
│       ├── seedUsers.js
│       └── seedProducts.js
│
├── src/
│   ├── config/
│   │   ├── env.js                  (lecture + validation des variables d'environnement)
│   │   ├── database.js             (instance Prisma Client)
│   │   ├── cors.js
│   │   ├── logger.js
│   │   └── constants.js
│   │
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── roles/
│   │   ├── permissions/
│   │   ├── products/
│   │   ├── categories/
│   │   ├── brands/
│   │   ├── inventory/
│   │   ├── suppliers/
│   │   ├── orders/
│   │   ├── invoices/
│   │   ├── customers/
│   │   ├── crm/
│   │   ├── finance/
│   │   ├── accounting/
│   │   ├── hr/
│   │   ├── psychology/
│   │   ├── events/
│   │   ├── cms/
│   │   ├── notifications/
│   │   ├── files/
│   │   └── dashboard/
│   │       (structure détaillée au Chapitre 3)
│   │
│   ├── middleware/
│   │   ├── authenticate.js         (vérifie le JWT)
│   │   ├── authorize.js            (vérifie une permission RBAC)
│   │   ├── validate.js             (valide req.body/query/params via un schéma Zod)
│   │   ├── errorHandler.js         (gestionnaire d'erreurs global, dernier middleware)
│   │   ├── notFoundHandler.js
│   │   ├── requestLogger.js
│   │   ├── rateLimiter.js
│   │   └── pagination.js           (normalise page/limit/sort/filters depuis la query)
│   │
│   ├── routes/
│   │   ├── index.js                (agrège toutes les routes versionnées)
│   │   └── v1/
│   │       ├── index.js
│   │       ├── auth.routes.js
│   │       ├── users.routes.js
│   │       ├── products.routes.js
│   │       └── ... (une entrée par module)
│   │
│   ├── errors/
│   │   ├── AppError.js             (classe d'erreur métier de base)
│   │   ├── ValidationError.js
│   │   ├── NotFoundError.js
│   │   ├── UnauthorizedError.js
│   │   ├── ForbiddenError.js
│   │   ├── ConflictError.js
│   │   └── errorCodes.js           (catalogue centralisé des codes d'erreur)
│   │
│   ├── shared/
│   │   ├── dto/                    (DTO transverses, ex: PaginationDTO)
│   │   ├── types/                  (typedefs JSDoc transverses, purement documentaires)
│   │   └── utils/
│   │       ├── hashPassword.js
│   │       ├── generateSlug.js
│   │       ├── paginate.js
│   │       ├── buildFilters.js
│   │       └── formatCurrency.js
│   │
│   ├── jobs/                       (tâches planifiées / files d'attente — Ch.11)
│   │   ├── scheduler.js
│   │   └── sendPendingNotifications.job.js
│   │
│   ├── sockets/                    (temps réel — Ch.11)
│   │   ├── index.js
│   │   └── notification.socket.js
│   │
│   ├── app.js                      (configuration Express : middlewares globaux, routes)
│   └── server.js                   (point d'entrée : démarre le serveur HTTP)
│
├── uploads/                        (stockage local en développement uniquement — Ch.10)
├── logs/
├── tests/
│   ├── unit/
│   ├── integration/
│   └── setup.js
│
├── .env.example
├── .env
├── package.json
├── jsconfig.json (uniquement pour l'auto-complétion de l'éditeur, aucune compilation)
└── README.md
```

### Règles absolues de cette arborescence (miroir du Document 02)

1. Un module ne contient jamais la logique d'un autre module. Toute communication inter-module passe par l'appel explicite d'un service exporté (jamais d'accès direct à la base de données d'un autre module).
2. `middleware/`, `errors/`, `shared/` sont les seuls dossiers transverses autorisés. Aucune autre logique partagée ne doit être dupliquée entre modules.
3. `routes/` ne contient **aucune logique** : uniquement le branchement `HTTP verbe + chemin → middleware(s) → controller`.
4. Le dossier `config/` ne contient que de la configuration technique, jamais de règle métier (identique au Document 02, Ch.3 côté Frontend).

---

## CHAPITRE 3 — Architecture modulaire détaillée

### 3.1 Structure interne d'un module

Chaque module suit **exactement** la même structure, sans exception. Exemple avec `products/` :

```
modules/products/
├── products.routes.js        (déclaration des routes REST du module)
├── products.controller.js    (reçoit req/res, ne contient aucune logique métier)
├── products.service.js       (logique métier, orchestre repository + validations)
├── products.repository.js    (seul fichier autorisé à appeler Prisma pour ce module)
├── products.schema.js        (schémas Zod : create/update/query)
├── products.dto.js           (formes de données en entrée/sortie, mapping Prisma -> API)
├── products.constants.js     (enums, valeurs par défaut propres au module)
└── products.test.js          (tests unitaires du service, avec repository mocké)
```

En JavaScript pur (pas de TypeScript), les formes de données ne sont pas déclarées dans un fichier `.types.js` séparé : elles sont documentées directement par des blocs **JSDoc** (`@typedef`, `@param`, `@returns`) au-dessus des fonctions concernées, dans `products.service.js` et `products.dto.js`. Cela donne l'auto-complétion et la vérification de types dans l'éditeur sans étape de compilation.

**Un dossier ne grossit jamais au-delà de sa responsabilité.** Si `products.service.js` dépasse ~300 lignes (même seuil d'alerte que le Frontend, Document 05 Partie III, adapté aux services), il doit être découpé en sous-fonctions dans un sous-dossier `products/handlers/` (ex: `createProduct.js`, `updateStock.js`), toujours ré-exportées depuis `products.service.js`.

### 3.2 Rôle exact de chaque fichier

| Fichier | Responsabilité | Interdictions |
|---|---|---|
| `*.routes.js` | Déclare `router.get/post/put/patch/delete`, branche `validate()`, `authenticate()`, `authorize()`, puis le controller | Jamais de logique, jamais d'accès à Prisma |
| `*.controller.js` | Extrait `req.body/params/query`, appelle le service, formate la réponse HTTP (Chapitre 5) | Jamais de règle métier, jamais d'accès direct à Prisma |
| `*.service.js` | Contient toute la logique métier, orchestre une ou plusieurs opérations repository, gère les transactions | Ne connaît jamais `req`/`res` (le service doit pouvoir être appelé depuis un job ou un test sans HTTP) |
| `*.repository.js` | Seul point de contact avec `prisma.*` pour ce module | Ne contient aucune règle métier, uniquement des requêtes Prisma |
| `*.schema.js` | Schémas Zod de validation des entrées | N'effectue aucun accès base de données |
| `*.dto.js` | Transforme les modèles Prisma en objets exposés à l'API (ex : ne jamais exposer `passwordHash`) | N'effectue aucune règle métier |

### 3.3 Liste officielle des modules (Document 06)

| Module | Domaine (Document 06) |
|---|---|
| `auth` | Authentification, sessions, tokens |
| `users` | Comptes utilisateurs, profils |
| `roles`, `permissions` | RBAC (Chapitre 7) |
| `products`, `categories`, `brands` | Catalogue produit |
| `inventory`, `suppliers` | Stock, achats |
| `orders`, `invoices` | Ventes, facturation |
| `customers`, `crm` | Clients, leads, opportunités |
| `finance`, `accounting` | Comptabilité, trésorerie |
| `hr` | Employés, départements, congés, paie |
| `psychology` | Consultations, patients, rendez-vous |
| `events` | Événements, billetterie |
| `cms` | Articles, pages, médias, SEO |
| `notifications` | Notifications transverses (Chapitre 11) |
| `files` | Upload centralisé (Chapitre 10) |
| `dashboard` | Agrégation de données multi-modules pour le Frontend (Document 06 Ch.14) — n'accède jamais directement aux tables d'un autre module, appelle uniquement les services des autres modules |

### 3.4 Communication inter-module

Le Document 06 Ch.13 précise que les modules communiquent (« Le CRM peut créer une commande. Une commande peut créer une facture. »). Règle Backend correspondante :

- Un module **A** ne fait jamais `import { prisma } from ...` puis une requête sur une table du module **B**.
- Un module **A** importe le **service** exporté du module **B** (`import { createInvoiceFromOrder } from "../invoices/invoices.service"`) et l'appelle.
- Les événements transverses (ex : commande confirmée → notification, facture générée → écriture comptable) passent par un **bus d'événements interne léger** (`shared/events/eventBus.js`) plutôt que par des appels directs en cascade, pour garder les modules faiblement couplés. **[DÉCISION PROPOSÉE]** — à valider : ce bus peut être une implémentation simple (EventEmitter Node natif) dans un premier temps, sans dépendance externe (Kafka/RabbitMQ) tant que le volume ne le justifie pas.

---

## CHAPITRE 4 — Architecture Prisma

### 4.1 Organisation du schéma

**[DÉCISION PROPOSÉE]** Pour un projet de cette taille (12+ modules), deux approches sont possibles :

- **Option A (retenue par défaut)** : un seul fichier `prisma/schema.prisma`, organisé par sections commentées dans le même ordre que les modules (Prisma ne supporte nativement qu'un seul fichier de schéma tant qu'on ne passe pas par la fonctionnalité preview *multi-file schema*).
- **Option B** : activer le mode multi-fichiers de Prisma (`prisma/schema/*.prisma`, un fichier par module), disponible en preview dans les versions récentes. Plus lisible à long terme, mais dépend d'une fonctionnalité preview.

*Recommandation : démarrer en Option A (stable), migrer vers Option B dès que la fonctionnalité multi-fichiers est jugée stable, sans que cela ne change une seule ligne de code applicatif (seul le schéma est réorganisé).*

### 4.2 Convention de nommage des modèles

| Élément | Convention | Exemple |
|---|---|---|
| Nom de modèle | `PascalCase`, singulier | `Product`, `OrderItem`, `Consultation` |
| Nom de table (`@@map`) | `snake_case`, pluriel | `@@map("products")` |
| Nom de champ | `camelCase` | `firstName`, `createdAt` |
| Nom de colonne (`@map`) | `snake_case` | `@map("first_name")` |
| Clé primaire | `id` (UUID) | `id String @id @default(uuid())` |
| Clé étrangère | `<modèle>Id` | `customerId`, `productId` |
| Enum | `PascalCase` (nom), `SCREAMING_SNAKE_CASE` (valeurs) | `enum OrderStatus { PENDING, CONFIRMED }` |

Toutes les tables incluent systématiquement :

```prisma
id        String   @id @default(uuid())
createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
```

Les entités nécessitant un historique de statut (Document 06 Ch.17 — « Chaque changement de statut est historisé ») ajoutent une table de log dédiée plutôt qu'un simple champ (ex : `OrderStatusHistory`), jamais une colonne JSON opaque.

### 4.3 Organisation logique par domaine (dans le fichier unique)

```prisma
// ============================================================
// CORE — Users, Roles, Permissions
// ============================================================
model User { ... }
model Role { ... }
model Permission { ... }
model RolePermission { ... }   // table de jonction

// ============================================================
// AUTH — Sessions & Tokens
// ============================================================
model RefreshToken { ... }
model PasswordResetToken { ... }
model EmailVerificationToken { ... }

// ============================================================
// CATALOG — Products, Categories, Brands, Inventory
// ============================================================
model Product { ... }
model Category { ... }
model Brand { ... }
model StockMovement { ... }
model Supplier { ... }

// ============================================================
// SALES — Orders, Invoices, Customers
// ============================================================
model Customer { ... }
model Order { ... }
model OrderItem { ... }
model OrderStatusHistory { ... }
model Invoice { ... }

// ============================================================
// CRM
// ============================================================
model Lead { ... }
model Opportunity { ... }
model Contact { ... }

// ============================================================
// FINANCE / ACCOUNTING
// ============================================================
model Transaction { ... }
model Expense { ... }
model AccountingEntry { ... }

// ============================================================
// HR
// ============================================================
model Employee { ... }
model Department { ... }
model LeaveRequest { ... }
model Payroll { ... }

// ============================================================
// PSYCHOLOGY
// ============================================================
model Patient { ... }
model Consultation { ... }
model ConsultationNote { ... }

// ============================================================
// EVENTS
// ============================================================
model Event { ... }
model EventRegistration { ... }
model Ticket { ... }

// ============================================================
// CMS
// ============================================================
model Article { ... }
model Page { ... }
model Media { ... }

// ============================================================
// TRANSVERSE — Notifications, Files, Audit
// ============================================================
model Notification { ... }
model File { ... }
model ActivityLog { ... }
```

### 4.4 Relations

- Toute relation obligatoire porte une contrainte `onDelete` explicite, jamais laissée par défaut :
  - `onDelete: Cascade` uniquement quand l'entité enfant n'a aucun sens sans le parent (ex : `OrderItem` sans `Order`).
  - `onDelete: Restrict` par défaut pour toute entité ayant une valeur propre (ex : empêcher la suppression d'un `Product` référencé dans des `OrderItem` existants).
  - `onDelete: SetNull` pour les relations optionnelles où l'historique doit survivre (ex : `Order.assignedEmployeeId` si l'employé est supprimé).
- Les suppressions définitives sont **évitées** sur les entités transactionnelles (Order, Invoice, Consultation...) : un champ `deletedAt` (soft delete) est utilisé à la place, cohérent avec Document 12 Ch.13 (« Les suppressions brutales sont interdites »).

### 4.5 Migrations

- Une migration par changement logique (jamais de migration fourre-tout regroupant plusieurs modules sans rapport).
- Nom de migration explicite : `prisma migrate dev --name add_order_status_history`.
- Aucune migration n'est modifiée après avoir été appliquée en environnement partagé (staging/production) — toute correction se fait via une nouvelle migration.
- Les migrations sont commitées avec le code qui les nécessite, jamais séparément.

### 4.6 Seed

`prisma/seed/index.js` orchestre, dans un ordre strict respectant les dépendances de clé étrangère :

1. `seedPermissions.js` (les permissions atomiques du Document 06 Ch.5)
2. `seedRoles.js` (les rôles du Document 06 Ch.4, chacun lié à ses permissions)
3. `seedUsers.js` (au minimum un Super Admin, pour pouvoir se connecter à un environnement neuf)
4. Données de démonstration optionnelles (`seedProducts.js`, etc.), **désactivées par défaut en production** via une variable d'environnement (`SEED_DEMO_DATA=false`).

---

## CHAPITRE 5 — Architecture REST

Reprend et implémente formellement le Document 07 (déjà écrit côté Frontend — le Backend en est la contrepartie exacte).

### 5.1 Versionnement

Toutes les routes sont préfixées `/api/v1/...`. Le préfixe de version est géré une seule fois dans `routes/index.js`, jamais répété module par module.

```
/api/v1/auth/login
/api/v1/products
/api/v1/products/:id
/api/v1/orders/:id/status
```

Une évolution incompatible (breaking change) donne lieu à `/api/v2/...` coexistant avec `/api/v1/...` pendant une période de transition documentée — jamais de suppression brutale (Document 07 Ch.19, Document 12 Ch.13).

### 5.2 Convention des routes (verbes HTTP)

| Action | Méthode | Route | 
|---|---|---|
| Lister | GET | `/products` |
| Détail | GET | `/products/:id` |
| Créer | POST | `/products` |
| Remplacer entièrement | PUT | `/products/:id` |
| Modifier partiellement | PATCH | `/products/:id` |
| Supprimer | DELETE | `/products/:id` |
| Action métier spécifique | POST | `/orders/:id/confirm`, `/orders/:id/cancel` |

Jamais de verbe dans l'URL (`/deleteProduct`, `/getProducts`) — interdiction explicite du Document 07 Ch.7, reconduite ici.

### 5.3 Format de réponse (unique, dans tout le Backend)

Repris exactement du contrat déjà documenté au Document 07 Ch.12 :

```json
{
  "success": true,
  "message": "Product created successfully.",
  "data": { },
  "meta": { },
  "errors": null
}
```

Ce format est produit par une fonction utilitaire unique (`shared/utils/apiResponse.js`, exposant `success()` et `fail()`), jamais construit à la main dans chaque controller — garantit qu'aucune réponse ne dévie du contrat.

### 5.4 Pagination

Toute route de liste accepte `page`, `limit` (defaults définis dans `config/constants.js`, cohérents avec `APP_CONFIG.DEFAULT_PAGE_SIZE = 20` déjà fixé côté Frontend), et répond avec le bloc `meta` suivant :

```json
"meta": {
  "page": 1,
  "limit": 20,
  "total": 248,
  "totalPages": 13,
  "hasNext": true,
  "hasPrevious": false
}
```

Le middleware `pagination.js` normalise `req.query.page/limit` (valeurs par défaut, bornes min/max, cast en entier) avant d'atteindre le controller — aucun module ne réimplémente cette logique.

### 5.5 Recherche, filtres, tri

- Recherche : `?q=ordinateur` (Document 07 Ch.9). Chaque module définit dans son `*.repository.js` les champs concernés par la recherche plein texte (ex : `name`, `sku`, `description` pour les produits).
- Filtres : `?status=active&category=phone` (Document 07 Ch.11). Chaque `*.schema.js` déclare un schéma Zod dédié aux query params de filtre, validé avant d'atteindre le repository — aucun filtre non déclaré n'est accepté silencieusement.
- Tri : `?sort=name` (ascendant), `?sort=-price` (descendant) (Document 07 Ch.10). Une fonction utilitaire commune (`shared/utils/buildSort.js`) transforme la chaîne de tri en clause Prisma `orderBy`, avec une liste blanche de champs triables par module (jamais de tri sur un champ arbitraire non whitelisté, pour éviter les requêtes non indexées et les fuites de structure interne).

### 5.6 Gestion des uploads dans les routes

Les routes recevant des fichiers (ex : `POST /products/:id/images`) passent par le middleware d'upload générique (Chapitre 10) avant le controller, jamais de logique d'upload inline dans un controller de module.

---

## CHAPITRE 6 — Architecture JWT

### 6.1 Principe général

Deux tokens, conformément au Document 10 Ch.3/Ch.4 :

- **Access Token** : courte durée de vie (**[DÉCISION PROPOSÉE]** 15 minutes), transmis dans l'en-tête `Authorization: Bearer <token>`, jamais stocké côté serveur (stateless, signé HMAC ou RSA selon l'environnement).
- **Refresh Token** : longue durée de vie (**[DÉCISION PROPOSÉE]** 30 jours), stocké **côté serveur** (table `RefreshToken`, Chapitre 4) pour permettre la révocation individuelle, transmis au client via **cookie httpOnly + secure + sameSite=strict** (jamais accessible en JavaScript, conforme Document 10 Ch.5 : « Préférer les cookies sécurisés »).

### 6.2 Cycle de vie

```
Login réussi
   ↓
Génération Access Token (15 min) + Refresh Token (30 jours)
   ↓
Refresh Token inséré en base (userId, tokenHash, expiresAt, userAgent, ipAddress)
   ↓
Access Token renvoyé dans le corps JSON, Refresh Token renvoyé en cookie httpOnly
   ↓
Chaque requête protégée : middleware authenticate() vérifie l'Access Token
   ↓
Access Token expiré (401) → Frontend appelle POST /auth/refresh (avec le cookie)
   ↓
Backend vérifie le Refresh Token en base (non expiré, non révoqué)
   ↓
Rotation : l'ancien Refresh Token est invalidé, un nouveau couple est émis
   ↓
Logout : le Refresh Token courant est supprimé/révoqué en base ; le cookie est effacé
```

### 6.3 Rotation et détection de réutilisation

**[DÉCISION PROPOSÉE]** — Rotation systématique à chaque refresh (le token utilisé est immédiatement invalidé et remplacé). Si un Refresh Token déjà invalidé est présenté à nouveau (signe probable de vol de token), **toutes** les sessions actives de l'utilisateur sont révoquées par précaution et l'événement est journalisé (Chapitre 9, sécurité).

### 6.4 Table des sessions

`RefreshToken` (Chapitre 4) sert de registre des sessions actives : elle permet d'implémenter, sans dépendance supplémentaire :

- « Déconnecter tous les appareils » (suppression de toutes les lignes de l'utilisateur).
- Affichage des sessions actives (Document 10 Ch.4 : « Le Frontend doit détecter... déconnexion distante »).
- Une révocation immédiate et fiable (contrairement à un access token stateless pur, révocable seulement à son expiration naturelle).

### 6.5 Blacklist d'Access Token — décision

**[DÉCISION PROPOSÉE]** Pas de blacklist d'Access Token dans une première version : la durée de vie courte (15 min) rend le risque résiduel acceptable pour la V1, et une blacklist ajoute une dépendance (Redis ou équivalent) et un point de défaillance supplémentaire. À réévaluer si un besoin de révocation immédiate d'Access Token apparaît (ex : compromission avérée) — dans ce cas, une table `RevokedToken` (ou Redis avec TTL) pourra être ajoutée sans changement d'architecture.

### 6.6 Sécurité des mots de passe

- Hachage : **bcrypt** (coût 12, ajustable via `config/env.js`), jamais de hachage réversible.
- Aucune information de mot de passe (même hachée) n'est jamais retournée dans un DTO (Chapitre 3.2 — responsabilité explicite du fichier `*.dto.js`).
- Réinitialisation de mot de passe : token à usage unique, courte durée de vie (1h), table dédiée `PasswordResetToken`, jamais le mot de passe lui-même envoyé par email.

### 6.7 Session glissante (sliding session) — validée par le client

Exigence produit : l'utilisateur actif n'est jamais déconnecté ; la session survit à la fermeture du navigateur/onglet tant qu'elle n'a pas expiré ; une inactivité de 30 minutes déconnecte automatiquement.

**Implémentation retenue : deux expirations distinctes sur le Refresh Token, pas de nouveau mécanisme.**

Le modèle `RefreshToken` (Chapitre 4) porte **deux** champs d'expiration au lieu d'un seul :

```
idleExpiresAt     DateTime   // glissante — repoussée à chaque utilisation
absoluteExpiresAt DateTime   // fixe — jamais repoussée, plafond de sécurité
```

| Champ | Valeur à la création | Comportement |
|---|---|---|
| `idleExpiresAt` | `now + 30 minutes` | Repoussée de 30 minutes à **chaque** rotation réussie du Refresh Token (Chapitre 6.3) — tant que l'utilisateur est actif, cette date recule indéfiniment |
| `absoluteExpiresAt` | `now + 30 jours` | Copiée telle quelle d'un token à l'autre lors de la rotation, **jamais recalculée** — plafond dur, même pour un utilisateur qui ne fermerait jamais son onglet |

**Validation à chaque `POST /auth/refresh`** :

```
si now > idleExpiresAt        → 401 SESSION_EXPIRED (inactivité)
si now > absoluteExpiresAt    → 401 SESSION_EXPIRED (durée maximale atteinte)
sinon                          → rotation : nouveau token, idleExpiresAt = now + 30min,
                                  absoluteExpiresAt inchangée
```

**Pourquoi ce comportement correspond exactement à la demande :**

- *« Si l'utilisateur est actif, la session est prolongée automatiquement »* → chaque refresh de l'Access Token (déclenché automatiquement par l'intercepteur Axios déjà en place côté Frontend à chaque 401, Document 07 Ch.6) repousse `idleExpiresAt` de 30 minutes.
- *« Fermeture du navigateur → restauration possible tant que la durée maximale n'est pas dépassée »* → le cookie httpOnly contenant le Refresh Token est **persistant** (`Max-Age` = durée jusqu'à `absoluteExpiresAt`, pas un cookie de session navigateur). À la réouverture, le Frontend appelle `/auth/refresh` (ou `/auth/me`) ; si `idleExpiresAt` n'est pas dépassé, la session reprend silencieusement.
- *« 30 minutes d'inactivité → expiration »* → dès que `now > idleExpiresAt`, le refresh échoue et une reconnexion complète est exigée, quelle que soit la valeur de `absoluteExpiresAt`.

**Travail Frontend correspondant (hors périmètre Backend, à prévoir en petite tâche de suivi)** : l'intercepteur Axios existant ne rafraîchit qu'*au moment d'un 401* — pour que l'horloge d'inactivité de 30 minutes soit précise (et pas approximée à la durée de vie de l'Access Token), le Frontend doit détecter l'activité réelle (mousemove/keydown/clic, avec debounce) et déclencher un refresh silencieux proactif tant que l'utilisateur est actif, plutôt que d'attendre un 401. Ce point sera traité comme une petite tâche Frontend au moment de l'implémentation du module `auth` (Phase 1), pas maintenant.

---

## CHAPITRE 7 — Architecture RBAC

Implémentation exacte du Document 06 Ch.4/Ch.5 et Document 10 Ch.6.

### 7.1 Modèle de données

```
User ─┬──< UserRole >──┬─ Role ─┬──< RolePermission >──┬─ Permission
      │                │        │                       │
   (many-to-many via UserRole, pas de rôle unique en dur sur User)
```

- Un `User` peut avoir **plusieurs** rôles (le Document 06 liste des rôles distincts — rien n'interdit un cumul, ex : un Manager qui est aussi Comptable).
- Un `Role` a plusieurs `Permission` (many-to-many via `RolePermission`).
- Les permissions sont **atomiques** (`product.read`, `product.create`...), jamais groupées (`product.admin` explicitement interdit, Document 06 Ch.5).

### 7.2 Table `Permission`

| Champ | Description |
|---|---|
| `id` | UUID |
| `key` | ex: `product.delete` (unique, correspond exactement aux constantes `PERMISSIONS.*` déjà définies côté Frontend, `src/constants/permissions.js`) |
| `module` | ex: `product` (pour affichage/regroupement en administration) |
| `description` | libellé humain |

### 7.3 Guards / Middleware

Deux middlewares distincts, toujours utilisés dans cet ordre sur une route protégée :

```
router.delete(
    "/:id",
    authenticate,              // vérifie le JWT, attache req.user
    authorize("product.delete"), // vérifie que req.user possède cette permission
    validate(productIdSchema, "params"),
    productsController.remove
);
```

- `authenticate` : décode et vérifie l'Access Token, charge l'utilisateur (ou au minimum son id + permissions mises en cache dans le payload du token — voir 7.4) sur `req.user`. Si absent/invalide → `401 Unauthorized`.
- `authorize(permission)` : vérifie que `req.user.permissions` contient la permission requise. Si absente → `403 Forbidden`. Peut accepter plusieurs permissions avec un opérateur explicite : `authorize.any("order.read", "order.readOwn")` / `authorize.all(...)`.

### 7.4 Permissions dans le payload JWT — décision

**[DÉCISION PROPOSÉE]** Le payload de l'Access Token embarque `userId`, `roles`, et la liste des `permissions` au moment de l'émission, pour éviter une requête base de données à chaque appel protégé (performance, Document 11). Conséquence assumée : un changement de permissions n'est effectif qu'au prochain refresh (max 15 minutes, cohérent avec la durée de vie courte de l'Access Token). Pour une révocation strictement immédiate d'un droit sensible (ex : blocage de compte), le champ `User.status` est vérifié à **chaque** requête via `authenticate` (pas seulement au login), indépendamment du contenu du token.

### 7.5 Policies (règles contextuelles au-delà du simple RBAC)

Certaines règles ne se réduisent pas à « a la permission ou non » — exemple : un `Consultant` peut lire ses propres consultations (`consultation.readOwn`) mais pas celles des autres consultants. Ces règles contextuelles vivent dans le **service** du module concerné (jamais dans le middleware générique `authorize`, qui reste volontairement simple et générique) :

```
// psychology/consultations.service.js
function assertCanViewConsultation(user, consultation) {
    if (user.permissions.includes("consultation.read")) return; // portée globale
    if (user.permissions.includes("consultation.readOwn")
        && consultation.psychologistId === user.id) return;     // portée restreinte
    throw new ForbiddenError();
}
```

### 7.6 Frontend / Backend — cohérence

Le Frontend (Document 10 Ch.10) n'adapte que l'affichage ; toute décision d'autorisation est revérifiée ici, côté Backend, sans exception — même si un bouton n'aurait normalement pas dû être visible.

---

## CHAPITRE 8 — Architecture des services, repositories, transactions

### 8.1 Séparation service / repository

Déjà posée au Chapitre 3.2. Bénéfice principal : un service est testable avec un repository **mocké**, sans base de données réelle (Document 12 Ch.3 — tests qui ne dépendent pas d'un ordre d'exécution ni, ici, d'une vraie base).

### 8.2 Transactions

Toute opération touchant **plusieurs tables de façon atomique** (Document 06 Ch.13 : une commande confirmée qui génère une facture, par exemple) passe par `prisma.$transaction(...)`, orchestrée **dans le service**, jamais dans le repository (qui n'a pas la vue d'ensemble métier) :

```
// orders.service.js
async function confirmOrder(orderId) {
    return prisma.$transaction(async (tx) => {
        const order = await ordersRepository.updateStatus(orderId, "CONFIRMED", tx);
        const invoice = await invoicesRepository.createFromOrder(order, tx);
        await inventoryRepository.decrementStock(order.items, tx);
        return { order, invoice };
    });
}
```

Chaque `*.repository.js` accepte optionnellement un client de transaction (`tx`) en paramètre, utilisé à la place du client Prisma global lorsqu'il est fourni.

### 8.3 Idempotence

Les endpoints déclenchant un effet financier ou un envoi externe (paiement, email) acceptent une clé d'idempotence (`Idempotency-Key` en en-tête) sur les routes sensibles — **[DÉCISION PROPOSÉE]**, à activer prioritairement sur le module `orders`/paiement lors de son implémentation, pour éviter les doubles soumissions déjà anticipées côté Frontend (Document 10 Ch.15).

---

## CHAPITRE 9 — Architecture de validation

### 9.1 Zod côté Backend (décision proposée, Chapitre 1)

Chaque module possède un fichier unique `*.schema.js` regroupant :

```
export const createProductSchema = z.object({ ... });
export const updateProductSchema = createProductSchema.partial();
export const productQuerySchema = z.object({ page: ..., limit: ..., category: ... });
export const productIdParamSchema = z.object({ id: z.string().uuid() });
```

### 9.2 Middleware `validate()`

```
router.post("/", authenticate, authorize("product.create"), validate(createProductSchema, "body"), controller.create);
```

`validate(schema, source)` intercepte la requête, exécute `schema.safeParse(req[source])` :

- Succès → remplace `req[source]` par la donnée **parsée et typée** (garantit que le controller ne manipule jamais une donnée brute non validée).
- Échec → lève une `ValidationError` (Chapitre 10) contenant le détail champ par champ, au format identique à celui déjà attendu côté Frontend (Document 07 Ch.13).

### 9.3 Double validation, deux responsabilités (Document 07 Ch.14, Document 10 Ch.8)

| | Frontend | Backend |
|---|---|---|
| Rôle | Confort utilisateur, retour immédiat | Source de vérité, sécurité |
| Quoi | Format, présence, cohérence immédiate | Règles métier, autorisations, intégrité, sécurité |
| Si absent/contourné | Dégrade l'UX | **Bloque strictement** la requête |

Aucune requête n'atteint un service sans être passée par `validate()` — y compris les requêtes provenant d'un futur client mobile ou d'une intégration tierce qui ne passerait pas par le Frontend officiel.

---

## CHAPITRE 10 — Gestion des erreurs

### 10.1 Hiérarchie des erreurs

```
AppError (classe de base — statusCode, code, message, details)
├── ValidationError        400
├── UnauthorizedError       401
├── ForbiddenError          403
├── NotFoundError           404
├── ConflictError           409   (ex : email déjà utilisé)
└── InternalServerError     500   (fallback, ne doit jamais fuiter de détails techniques)
```

Chaque service lève une erreur métier typée (`throw new NotFoundError("Product not found")`), jamais un `Error` générique ni un objet brut.

### 10.2 Catalogue des codes d'erreur

`errors/errorCodes.js` centralise un code machine-readable stable, distinct du message humain (qui peut changer/être traduit sans casser un client) :

```
export const ErrorCodes = {
    VALIDATION_FAILED: "VALIDATION_FAILED",
    INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
    TOKEN_EXPIRED: "TOKEN_EXPIRED",
    PERMISSION_DENIED: "PERMISSION_DENIED",
    PRODUCT_NOT_FOUND: "PRODUCT_NOT_FOUND",
    EMAIL_ALREADY_EXISTS: "EMAIL_ALREADY_EXISTS",
    // ...
};
```

### 10.3 Middleware `errorHandler` (dernier de la chaîne)

Format de sortie, strictement identique à ce que le Frontend attend déjà (Document 07 Ch.13) :

```json
{
  "success": false,
  "message": "Validation failed.",
  "errors": [
    { "field": "email", "message": "Email is invalid." }
  ]
}
```

Règles :

- Les erreurs `AppError` connues sont formatées telles quelles avec leur `statusCode`.
- Toute erreur **non prévue** (exception non catchée, erreur Prisma brute, etc.) est interceptée, journalisée en détail côté serveur (Chapitre 10.4), mais renvoyée au client sous une forme **générique** (« Une erreur interne est survenue. »), jamais avec la stack trace, le nom de la requête SQL ou le chemin de fichier — conforme au Document 10 Ch.11 (« Les erreurs présentées à l'utilisateur doivent rester compréhensibles et non techniques » et ne jamais révéler la structure interne du serveur).

### 10.4 Logs

**[DÉCISION PROPOSÉE]** Pino, logs structurés JSON, niveaux `debug/info/warn/error`, avec un identifiant de requête (`requestId`, généré par middleware et propagé dans tous les logs d'une même requête pour pouvoir suivre son parcours).

- **Jamais journalisé** (Document 10 Ch.12) : mots de passe, tokens, données médicales (module `psychology`), informations bancaires.
- En développement : sortie lisible dans la console. En production : sortie JSON, destinée à être collectée par un outil externe (à définir lors du déploiement — hors périmètre de ce document).

---

## CHAPITRE 11 — Upload, Notifications

### 11.1 Upload (Document 07 Ch.15, Document 10 Ch.13)

Module `files/` centralisé — **aucun module métier n'implémente sa propre logique d'upload** (Document 06 Ch.12 : « Tous les fichiers sont gérés par un service unique »).

```
files/
├── files.routes.js       (POST /files, GET /files/:id, DELETE /files/:id)
├── files.controller.js
├── files.service.js       (validation MIME, taille max, génère un nom de fichier sûr)
├── files.repository.js    (table File : id, ownerId, url, mimeType, size, purpose)
└── storage/
    ├── StorageProvider.js       (interface commune : upload(), delete(), getUrl())
    ├── LocalStorageProvider.js  (développement — écrit dans /uploads)
    └── S3StorageProvider.js     (production — [DÉCISION PROPOSÉE])
```

- Le module `files` ne connaît **jamais** le provider concret utilisé par l'appelant — il dépend de l'interface `StorageProvider`, l'implémentation active étant injectée selon `config/env.js` (`STORAGE_DRIVER=local|s3`).
- Contrôle systématique : type MIME whitelisté par contexte d'upload (images pour un produit, PDF pour une facture...), taille maximale (`APP_CONFIG.MAX_UPLOAD_SIZE_MB`, déjà fixé côté Frontend), nom de fichier généré côté serveur (jamais le nom fourni par le client, pour éviter les collisions et les path traversal).
- Un fichier uploadé est toujours rattaché à une entité (`purpose: "product_image" | "invoice_pdf" | "consultation_attachment"`, `ownerId`) — jamais de fichier orphelin sans propriétaire ni contexte.

### 11.2 Notifications (Document 06 Ch.11, Document 07 Ch.17)

```
notifications/
├── notifications.routes.js      (GET /notifications, PATCH /notifications/:id/read, PATCH /notifications/read-all)
├── notifications.controller.js
├── notifications.service.js     (create(), markAsRead(), markAllAsRead())
├── notifications.repository.js
└── channels/
    ├── EmailChannel.js           (Nodemailer — [DÉCISION PROPOSÉE])
    ├── RealtimeChannel.js        (Socket.IO — [DÉCISION PROPOSÉE])
    └── NotificationDispatcher.js (orchestre les canaux selon le type de notification)
```

- Toute notification est **d'abord persistée** en base (table `Notification` — historique, Document 06 Ch.11), puis diffusée sur les canaux pertinents (temps réel si l'utilisateur est connecté, email selon ses préférences).
- Déclenchement : un module métier (ex : `orders`) publie un événement sur le bus interne (`eventBus.emit("order.confirmed", order)`) ; le module `notifications` s'y abonne et construit la notification correspondante — le module `orders` ne connaît jamais le détail de la construction d'une notification (couplage faible, Document 06 Ch.13).
- Temps réel : à la connexion Socket.IO, le client s'authentifie avec son Access Token (même middleware `authenticate`, adapté au contexte socket) et rejoint une "room" privée `user:<id>` ; `RealtimeChannel` émet uniquement vers cette room — jamais de diffusion globale de données personnelles.

---

## CHAPITRE 12 — Configuration

### 12.1 Variables d'environnement

`.env.example` (commité), `.env` (jamais commité, déjà dans `.gitignore` par convention standard Node) :

```
# Application
NODE_ENV=development
PORT=4000
API_PREFIX=/api/v1

# Base de données
DATABASE_URL=postgresql://user:password@localhost:5432/lovecanbuild

# JWT
JWT_ACCESS_SECRET=
JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES_IN=30d

# CORS
CORS_ORIGIN=http://localhost:5173

# Stockage fichiers
STORAGE_DRIVER=local
S3_BUCKET=
S3_REGION=
S3_ACCESS_KEY=
S3_SECRET_KEY=

# Email
EMAIL_DRIVER=smtp
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASSWORD=

# Divers
SEED_DEMO_DATA=false
LOG_LEVEL=info
```

### 12.2 Validation au démarrage

`config/env.js` valide **l'intégralité** des variables d'environnement avec un schéma Zod dès le démarrage du serveur (`server.js`) — si une variable obligatoire manque ou a un format invalide, **le serveur refuse de démarrer** avec un message explicite, plutôt que d'échouer silencieusement ou tardivement en production (Document 10, principe *Fail Secure*).

### 12.3 Secrets

- `JWT_ACCESS_SECRET` et `JWT_REFRESH_SECRET` sont deux secrets **distincts** (jamais le même), longs (≥ 256 bits), générés aléatoirement, jamais codés en dur, jamais commités.
- En production, les secrets proviennent d'un gestionnaire de secrets de la plateforme d'hébergement (variables d'environnement chiffrées de l'hébergeur, ou un service dédié) — hors périmètre technique de ce document, à trancher au moment du déploiement.

---

## CHAPITRE 13 — Structure de la base PostgreSQL

### 13.1 Organisation générale

**[DÉCISION PROPOSÉE]** Un seul schéma PostgreSQL `public` pour l'ensemble des modules dans un premier temps (simplicité, Document 01 Ch.2.1), les tables étant déjà regroupées visuellement par domaine dans `schema.prisma` (Chapitre 4.3) et par leur préfixe naturel. Un découpage en schémas PostgreSQL distincts par domaine (`sales.*`, `hr.*`, `psychology.*`) pourra être envisagé plus tard si des besoins d'isolation stricte apparaissent (ex : isolation renforcée des données médicales du module Psychologie) — non nécessaire pour la V1.

### 13.2 Nommage des tables

- `snake_case`, pluriel : `products`, `order_items`, `consultation_notes`.
- Table de jonction many-to-many : concaténation des deux noms au singulier, ordre alphabétique : `role_permissions`, `user_roles`.
- Table d'historique : suffixe `_history` : `order_status_history`.

### 13.3 Index

- Toute clé étrangère est indexée (comportement par défaut de Prisma sur les relations, à ne jamais désactiver).
- Index composites sur les colonnes fréquemment filtrées/triées ensemble (ex : `orders(customer_id, status)` pour lister rapidement les commandes actives d'un client).
- Index sur les colonnes de recherche textuelle fréquente (`products.sku`, `products.slug`, `users.email` — ce dernier également contraint `UNIQUE`).
- Aucun index ajouté « par précaution » sans un besoin de requête identifié (Document 11 Ch.18 — mesurer avant d'optimiser, principe transposé du Frontend).

### 13.4 Contraintes d'intégrité

- Emails, SKU, slugs : `UNIQUE` au niveau base de données, jamais uniquement vérifié en application (la contrainte applicative peut être contournée par une écriture concurrente ; la contrainte base de données ne peut pas l'être).
- Enums métier (statuts de commande, rôles...) : types `enum` PostgreSQL natifs via Prisma (`enum OrderStatus { ... }`), jamais une colonne `varchar` libre — empêche toute valeur incohérente d'entrer en base, même par une voie détournée.

### 13.5 Sauvegardes

**[DÉCISION PROPOSÉE]** Sauvegardes automatiques quotidiennes (rétention 30 jours) + sauvegarde avant chaque migration en production. Mécanisme exact (natif à l'hébergeur PostgreSQL choisi, ou `pg_dump` planifié) à trancher au moment du déploiement — hors périmètre de ce document de conception.

### 13.6 Environnements

Trois bases distinctes, jamais partagées :

| Environnement | Usage | Données de démonstration |
|---|---|---|
| `development` | Poste de chaque développeur | Oui (`SEED_DEMO_DATA=true`) |
| `test` | Exécution des tests automatisés (Vitest/Supertest) | Recréée à chaque run, jamais persistante |
| `production` | Utilisateurs réels | Non |

---

## CHAPITRE 14 — Conventions de nommage (récapitulatif transverse)

| Élément | Convention | Exemple |
|---|---|---|
| Fichier controller | `<module>.controller.js` | `products.controller.js` |
| Fichier service | `<module>.service.js` | `products.service.js` |
| Fichier repository | `<module>.repository.js` | `products.repository.js` |
| Fichier schema (Zod) | `<module>.schema.js` | `products.schema.js` |
| Fichier DTO | `<module>.dto.js` | `products.dto.js` |
| Fichier routes | `<module>.routes.js` | `products.routes.js` |
| Fonction de service | verbe + entité, camelCase | `createProduct`, `updateStock`, `confirmOrder` |
| Fonction de repository | verbe technique + entité | `findById`, `findMany`, `insert`, `updateById`, `softDelete` |
| Schéma Zod de création | `create<Entité>Schema` | `createProductSchema` |
| Schéma Zod de mise à jour | `update<Entité>Schema` | `updateProductSchema` |
| Schéma Zod de query/filtre | `<entité>QuerySchema` | `productQuerySchema` |
| DTO de sortie | `<Entité>Dto` (type) / `to<Entité>Dto()` (fonction de mapping) | `ProductDto`, `toProductDto(product)` |
| Classe d'erreur | `<Contexte>Error`, suffixe obligatoire `Error` | `NotFoundError`, `InvalidCredentialsError` |
| Middleware | verbe ou nom d'action, camelCase | `authenticate`, `authorize`, `validate` |
| Variable booléenne | `is/has/can/should` (même règle que le Frontend, Document 05 Partie VI) | `isActive`, `hasPermission`, `canDelete` |
| Constante | `MAJUSCULES_SNAKE_CASE` | `MAX_UPLOAD_SIZE_MB`, `DEFAULT_PAGE_SIZE` |
| Route REST | kebab-case, ressource au pluriel | `/order-items`, `/leave-requests` |

Cette table applique au Backend exactement la même rigueur que le Document 05 (Partie V à IX) appliquée au Frontend — un développeur familier de l'un doit reconnaître immédiatement les conventions de l'autre.

---

## CHAPITRE 15 — Roadmap Backend

Ordre de développement, module par module, choisi pour que chaque étape soit immédiatement testable de bout en bout (Frontend déjà prêt à consommer) et pour que les modules suivants puissent s'appuyer sur les précédents sans dépendance circulaire.

### Phase 0 — Socle technique (préalable à tout module métier)

1. Initialisation du projet (`package.json` en ES Modules — `"type": "module"` — JavaScript pur, pas de TypeScript, ESLint/Prettier backend, structure de dossiers du Chapitre 2).
2. `config/env.js` + validation Zod des variables d'environnement.
3. Connexion Prisma + premier `schema.prisma` (uniquement `User`, `Role`, `Permission`, `RolePermission`, `RefreshToken`).
4. Middlewares transverses : `errorHandler`, `notFoundHandler`, `requestLogger`, format de réponse unique (Chapitre 5.3).
5. Mise en place Vitest + Supertest (un test de fumée : `GET /health` répond `200`).

### Phase 1 — Auth & RBAC (bloquant pour tout le reste)

6. Module `roles` + `permissions` (CRUD minimal, seed des permissions/rôles du Document 06).
7. Module `users` (CRUD, profils).
8. Module `auth` : login, register, refresh, logout, forgot/reset password, verify email — branché sur le contrat déjà défini côté Frontend (`authService.js`, Document 07 étape 3).
9. Middlewares `authenticate` et `authorize` (Chapitre 7), branchés et testés sur au moins une route protégée de démonstration.

**Jalon** : le Frontend peut se connecter réellement pour la première fois (Login/Register déjà prêts côté client depuis l'étape 5 du chantier Frontend).

### Phase 2 — Catalogue & Commerce (cœur métier e-commerce)

10. Module `files` (upload centralisé, prérequis pour les images produits).
11. Module `categories`, `brands`.
12. Module `products` (le plus attendu côté Frontend : `Shop`, `ProductDetails`, `admin/Products` déjà en attente de données réelles).
13. Module `inventory`, `suppliers`.
14. Module `customers`.
15. Module `orders` + `invoices` (avec transaction de confirmation de commande, Chapitre 8.2).

**Jalon** : le tunnel Boutique → Panier → Checkout → Commande fonctionne de bout en bout.

### Phase 3 — Modules transverses à forte visibilité Frontend

16. Module `notifications` (dashboard admin déjà prêt à les afficher).
17. Module `dashboard` (agrégation des statistiques réelles, remplace `useDashboardStats` mocké posé lors de la consolidation Frontend).

### Phase 4 — Modules métier secondaires

18. Module `psychology` (Consultations, Patients — données sensibles, attention particulière Document 10).
19. Module `events`.
20. Module `crm` (Leads, Opportunités, Contacts).

### Phase 5 — Gestion interne (ERP)

21. Module `finance`, `accounting`.
22. Module `hr`.

### Phase 6 — Communication

23. Module `cms` (Articles, Pages, Médias, SEO).

### Phase 7 — Consolidation Backend

24. Couverture de tests (unitaires + intégration) sur l'ensemble des modules, à un niveau comparable à l'effort déjà fourni côté Frontend (Document 12 Ch.3/4).
25. Documentation API générée (OpenAPI/Swagger, Chapitre 1).
26. Revue de sécurité transverse (Document 10, check-list Ch.20) sur l'ensemble des modules livrés.

---

## Synthèse des décisions en attente de validation

Récapitulatif de tous les points marqués **[DÉCISION PROPOSÉE]** dans ce document, à valider ou amender avant le début de la Phase 0 :

1. Validation : Zod.
2. Logs : Pino.
3. Upload : local (dev) / interface compatible S3 (prod).
4. Emails : Nodemailer (dev) / fournisseur transactionnel à choisir (prod).
5. Temps réel : Socket.IO.
6. Tests : Vitest + Supertest.
7. Documentation API : OpenAPI/Swagger généré depuis Zod.
8. Organisation `schema.prisma` : fichier unique dans un premier temps.
9. Bus d'événements inter-module : EventEmitter natif dans un premier temps.
10. Durées de vie JWT : Access 15 min / Refresh 30 jours.
11. Rotation du Refresh Token à chaque utilisation, avec détection de réutilisation.
12. Pas de blacklist d'Access Token en V1.
13. Payload JWT incluant les permissions (latence de propagation ≤ 15 min acceptée).
14. Idempotence sur les routes sensibles (paiement) via en-tête `Idempotency-Key`.
15. Un seul schéma PostgreSQL `public` en V1.
16. Sauvegardes : quotidiennes + avant chaque migration production (mécanisme exact à trancher au déploiement).

---

Fin du Document 13.

**Aucun code n'a été écrit.** Ce document attend ta validation — globale ou point par point — avant le démarrage de la Phase 0 de la roadmap (Chapitre 15).
