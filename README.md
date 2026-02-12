# Eli Nails — Site multi-pages Next.js

Site vitrine premium pour prothésiste ongulaire avec :
- Accueil (`/`)
- Galerie Instagram synchronisée (`/galerie`)
- Réservation avec agenda (`/reservation`)

## Stack
- Next.js App Router + TypeScript
- Tailwind CSS
- Zod pour la validation

## Installation
```bash
npm install
npm run dev
```

## Variables d'environnement (Instagram)
Créer un fichier `.env.local` :
```env
INSTAGRAM_ACCESS_TOKEN=...
INSTAGRAM_USER_ID=...
```

### Fonctionnement Instagram
- La route `GET /api/instagram` tente d’abord Instagram Graph API.
- Si les variables d’environnement sont absentes **ou** si l’API échoue, fallback automatique vers `data/instagram-mock.json`.
- Revalidation serveur toutes les 30 minutes (`revalidate = 1800`).

## Réservation
- Les réservations sont stockées en local dans `data/reservations.json` (mode démo/dev).
- Validation via Zod.
- Prévention du double-booking via vérification des chevauchements de créneaux.

## Scripts
```bash
npm run dev
npm run build
npm run start
```
