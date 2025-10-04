# Eclipse-app


L'application est en monorepo composée d'un backend Express + Prisma et d'une application frontend React + Vite. Elle utilise Turborepo pour orchestrer les scripts et Biome/Husky pour la qualité du code.

## Stack principale

- TypeScript
- Node.js (Express) pour l'API
- React + Vite pour le frontend
- Prisma pour l'ORM
- PostgreSQL pour la base de données (Docker)
- better-auth / @better-auth pour l'authentification
- Biome, Husky, lint-staged pour la qualité du code
- Turborepo pour le monorepo
- RadixUI primitives

## Aperçu du contenu

- apps/server : API (Express + Better-Auth + Prisma)
- apps/frontend : Application React (Vite)

## Prérequis

- Node.js (recommandé : version compatible avec npm@10 fourni dans `package.json`)
- Docker & Docker Compose (pour la base PostgreSQL en local)
- npm

## Installation

1. Installer les dépendances à la racine (Turborepo gère les workspaces) :

```bash
npm install
```

2. Copier les fichiers d'environnement et ajuster les valeurs :

```bash
cp apps/server/.env.example .env
cp apps/frontend/.env.example .env
```

3. Lancer la base de données PostgreSQL (Docker) :

```bash
npm run db:start
```

4. Initialiser Prisma / générer le client :

```bash
npm run db:generate
npm run db:push
```

5. Lancer les deux serveurs en même temps (front et back)
```bash
npm run dev
```

## Scripts utiles (depuis la racine)

- npm run dev : lance Turborepo en mode dev (démarre les apps configurées)
- npm run dev:server : lance uniquement le serveur (turbo -F server dev)
- npm run build : build via Turbo
- npm run check-types : vérifie les types TypeScript
- npm run db:studio : ouvre Prisma Studio
- npm run db:migrate : lance les migrations Prisma

Consultez `package.json` à la racine et dans `apps/*/package.json` pour la liste complète des scripts.

## Démarrer en local

- API : http://localhost:3000
- Frontend : http://localhost:5173

## Variables d'environnement observées

Fichiers config existants : `apps/server/.env.example`, `apps/frontend/.env.example` (les .env ne devraient pas traqués par git).

- apps/server/.env.example

```
DATABASE_URL=
CORS_ORIGIN=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
```

- apps/frontend/.env.example

```
VITE_API_URL=http://localhost:3000
```

## Suggestions d'améliorations (prochaines étapes)

- Documenter les étapes de migration Prisma (ex: backup, rollback)
- Ajouter des instructions de tests/unit/integration et un workflow CI (GitHub Actions)

## Ressources

- Prisma : https://www.prisma.io/
- Vite : https://vitejs.dev/
- Turborepo : https://turbo.build/
- Better-Auth : https://www.better-auth.com/
- RadixUI : https://www.radix-ui.com/primitives/docs
