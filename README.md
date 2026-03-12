# Alibi — Le Jeu Multijoueur

Application web temps réel pour jouer à Alibi avec vos amis.

## Installation locale

```bash
npm install
npm start
```

L'app tourne sur http://localhost:3000

## Déploiement sur Railway (gratuit)

1. Créez un compte sur [railway.app](https://railway.app)
2. Cliquez **New Project → Deploy from GitHub**
3. Poussez ce dossier sur GitHub, puis connectez-le
4. Railway détecte automatiquement Node.js et lance `npm start`
5. Vous obtenez une URL publique du type `alibi-xxx.railway.app`

## Déploiement sur Render (gratuit)

1. Créez un compte sur [render.com](https://render.com)
2. **New → Web Service → Connect GitHub**
3. Build Command : `npm install`
4. Start Command : `node server.js`
5. URL publique fournie automatiquement

## Comment jouer

- Le **Maître du jeu** ouvre l'app, entre son prénom, choisit "Maître du jeu"
- Il partage le **code à 4 lettres** affiché
- Les **joueurs** ouvrent l'app, entrent leur prénom, choisissent "Joueur", saisissent le code
- Chaque joueur choisit son **duo (A à F)**
- Le MJ assigne les duos, choisit le nombre de manches et lance la partie

## Structure des fichiers

```
alibi-server/
├── server.js          # Serveur Node.js + Socket.io
├── package.json
├── public/
│   └── index.html     # App web (frontend complet)
└── README.md
```
