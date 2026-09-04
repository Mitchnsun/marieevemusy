# Marie-Eve Musy

Profil professionnel de Marie-Eve Musy, journaliste et comédienne à Genève. Présentatrice TV en Suisse : démos, parcours, prestations et prise de contact.

## 📖 Description

Site web moderne et élégant développé avec Next.js pour présenter le profil professionnel de Marie-Eve Musy, journaliste et comédienne basée à Genève. Le site permet aux visiteurs de découvrir son parcours, ses prestations en tant que présentatrice TV en Suisse, et d'accéder à ses démos.

## 🚀 Technologies utilisées

- **Framework** : [Next.js 16.3.4](https://nextjs.org/) avec Turbopack (activé par défaut)
- **Langage** : TypeScript 6.0.3
- **Styling** : [Tailwind CSS 4.3.3](https://tailwindcss.com/)
- **Runtime** : React 19.2.8
- **Gestionnaire de paquets** : Yarn 4.18.0
- **Linting** : ESLint avec configuration Next.js + plugins avancés
- **Formatage** : Prettier avec support TailwindCSS

## 🛠️ Installation et développement

### Prérequis

- Node.js (version 24+ recommandée)
- Yarn 4.18.0

### Installation des dépendances

```bash
yarn install
```

### Lancement du serveur de développement

```bash
yarn dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

### Scripts disponibles

- `yarn dev` - Lance le serveur de développement (Turbopack activé par défaut)
- `yarn build` - Compile l'application pour la production (Turbopack activé par défaut)
- `yarn start` - Lance l'application en mode production
- `yarn lint` - Vérifie le code avec ESLint
- `yarn lint:fix` - Corrige automatiquement les erreurs ESLint
- `yarn format` - Formate le code avec Prettier
- `yarn format:check` - Vérifie si le code est formaté selon Prettier
- `yarn type-check` - Vérifie les types TypeScript

## 📁 Structure du projet

```
├── app/                    # Pages et layouts Next.js (App Router)
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   └── globals.css        # Styles globaux
├── public/                # Assets statiques
├── eslint.config.mjs      # Configuration ESLint
├── next.config.ts         # Configuration Next.js
├── postcss.config.mjs     # Configuration PostCSS
├── tsconfig.json          # Configuration TypeScript
└── package.json           # Dépendances et scripts
```

## 🔧 Configuration

### ESLint

Le projet utilise ESLint avec :

- Configuration Next.js (`next/core-web-vitals`)
- Support TypeScript complet
- **eslint-plugin-prettier** - Intégration Prettier dans ESLint
- **eslint-plugin-import** - Validation des imports
- **eslint-plugin-sonarjs** - Détection des code smells et problèmes de complexité
- **eslint-plugin-security** - Identification des vulnérabilités potentielles
- **eslint-plugin-unicorn** - Suggestions d'améliorations modernes JavaScript
- **eslint-plugin-unused-imports** - Suppression des imports inutiles
- **eslint-plugin-simple-import-sort** - Tri automatique des imports
- **eslint-plugin-jsx-a11y** - Vérifications d'accessibilité pour JSX

#### Règles personnalisées activées

```js
{
  'prettier/prettier': 'error',
  'unused-imports/no-unused-imports': 'error',
  'simple-import-sort/imports': 'error',
  'simple-import-sort/exports': 'error'
}
```

### Prettier

Configuration de formatage automatique avec :

- **prettier-plugin-tailwindcss** - Tri et organisation des classes TailwindCSS
- Formatage cohérent du code (indentation, guillemets, points-virgules)
- Intégration complète avec ESLint

Les classes Tailwind sont automatiquement triées par ordre logique grâce au plugin Prettier pour une meilleure lisibilité.

### Tailwind CSS

Configuration avec PostCSS pour un styling moderne et responsive. Le projet utilise :

- **Tailwind CSS 4.3.3** - Framework CSS utility-first
- **PostCSS** - Transformation CSS moderne
- Support des variables CSS natives
- Design système personnalisable

#### Couleurs de marque

Les couleurs de marque du site sont déclarées comme tokens de thème custom dans `app/globals.css` (bloc `@theme`), préfixées par `brand-` pour bien les distinguer de la palette Tailwind par défaut. Aucune ne correspond à une valeur Tailwind par défaut, elles doivent donc toujours être utilisées via ces classes plutôt qu'avec des couleurs Tailwind standards ou des valeurs hex en dur :

| Token              | Hex       | Classes utilitaires                                 |
| ------------------ | --------- | --------------------------------------------------- |
| `brand-teal`       | `#124c5d` | `bg-brand-teal`, `text-brand-teal`, ...             |
| `brand-blue-light` | `#e2ebff` | `bg-brand-blue-light`, `text-brand-blue-light`, ... |
| `brand-navy`       | `#081f31` | `bg-brand-navy`, `text-brand-navy`, ...             |
| `brand-blue-muted` | `#bbd2e0` | `bg-brand-blue-muted`, `text-brand-blue-muted`, ... |
| `brand-gray-900`   | `#303133` | `bg-brand-gray-900`, `text-brand-gray-900`, ...     |
| `brand-gray-500`   | `#72777c` | `bg-brand-gray-500`, `text-brand-gray-500`, ...     |
| `brand-gray-200`   | `#eaeaea` | `border-brand-gray-200`, `bg-brand-gray-200`, ...   |
| `brand-gray-50`    | `#f7f7f7` | `bg-brand-gray-50`, ...                             |

Usages recommandés :

- Fond de page : `bg-brand-gray-50`
- Texte principal : `text-brand-gray-900`
- Texte secondaire / légendes : `text-brand-gray-500`
- Bordures / séparateurs : `border-brand-gray-200`
- Boutons (Écouter, Visionner, Contact et tout futur bouton du même style) : `bg-brand-blue-light text-brand-teal`

### TypeScript

Configuration stricte pour un développement robuste avec vérification des types complète.

## 🚀 Déploiement

Le site est optimisé pour un déploiement sur [Vercel](https://vercel.com/), mais peut être déployé sur d'autres plateformes supportant Next.js.

```bash
yarn build
```

## 📝 Contribution

Pour contribuer au projet :

1. Fork le repository
2. Créer une branche pour votre feature (`git checkout -b feature/ma-feature`)
3. Installer les dépendances (`yarn install`)
4. Développement avec les outils de qualité :
   - Vérifier le linting : `yarn lint`
   - Formater le code : `yarn format`
   - Vérifier les types : `yarn type-check`
5. Commiter vos changements (`git commit -am 'Ajout de ma feature'`)
6. Push vers la branche (`git push origin feature/ma-feature`)
7. Ouvrir une Pull Request

### Standards de code

- Le code doit passer les vérifications ESLint sans erreurs
- Le formatage Prettier doit être respecté
- Les classes TailwindCSS doivent être triées automatiquement
- Les imports doivent être organisés et sans éléments inutiles
- La vérification TypeScript doit passer sans erreurs
- Respecter l'accessibilité (WCAG) avec les attributs ARIA appropriés
