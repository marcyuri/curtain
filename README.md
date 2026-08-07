# LOVE CAN BUILD

Plateforme ERP Enterprise — Monorepo.

```
/
├── frontend/   # React 19 / Vite — voir frontend/README.md
└── backend/    # Node.js (ES Modules) / Express / PostgreSQL / Prisma — voir backend/README.md
```

Le Frontend et le Backend sont isolés dans des dossiers distincts et indépendants, afin de pouvoir être extraits vers des dépôts séparés si nécessaire.

## Documentation

- Documents 01 à 12 : spécifications Frontend (architecture, standards React/CSS, sécurité, performance, qualité).
- `backend/Document13-Backend-Architecture-Specification.md` : architecture Backend (miroir des Documents 01-12 côté serveur).

## Démarrage rapide

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm run dev
```
