# Utiliser les images avec `next/image`

## Règle : toujours un import statique

Placer l'image dans `public/images/...` puis l'importer avec un `import` statique — jamais de
chaîne de caractères comme `src="/images/..."`.

```tsx
import Image from "next/image";

import heroImage from "@/public/images/shared/marie-eve-musy-journaliste-geneve-portrait.jpg";

<Image src={heroImage} alt="Marie-Eve Musy, journaliste à Genève" sizes="100vw" />;
```

Pourquoi : l'import statique donne à Next `width`, `height` et `blurDataURL` automatiquement.
Résultat concret :

- pas de layout shift (CLS) au chargement, sans avoir à coder `width`/`height` en dur
- un `blurDataURL` gratuit, utilisable avec `placeholder="blur"`
- le fichier servi est renommé avec un hash de contenu (`nom.<hash>.jpg`) → `Cache-Control: immutable`,
  ce que `/public` seul n'offre pas
- erreur au build si le chemin est faux, plutôt qu'un 404 silencieux en prod

**Le fichier image ne finit pas dans le bundle JavaScript.** Next l'extrait en asset statique
(`.next/static/media/<nom>.<hash>.<ext>`) et remplace l'import par un petit objet
`{ src, width, height, blurDataURL }` — quelques centaines d'octets. Nos pages et composants
(`Hero`, `ShowSection`, `MediaGallery`) sont des Server Components, donc même cet objet reste
côté serveur : seul le HTML/RSC rendu part vers le client.

Le seul cas où l'import statique n'est pas possible est un nom de fichier dynamique (ex. généré
depuis un CMS) — voir la section [Images sans import statique](#images-sans-import-statique).

## `placeholder="blur"`

À ajouter systématiquement quand l'image est disponible via import statique — c'est gratuit
(le `blurDataURL` est déjà généré) et améliore le ressenti de chargement, surtout pour les images
chargées en lazy loading (galerie, sections de contenu).

```tsx
<Image src={image} alt={imageAlt} placeholder="blur" className="h-auto w-full object-cover" />
```

## `sizes` : toujours le renseigner

`sizes` dit à Next quelle taille l'image occupera réellement à l'écran, pour qu'il génère les bonnes
tailles dans le `srcset` plutôt que de servir une image pleine largeur partout.

- Image plein écran (hero) : `sizes="100vw"`
- Image dans une grille à largeur fixe en desktop : `sizes="(min-width: 960px) 533px, 100vw"`
  (533 px = la largeur CSS réelle de la colonne au-delà du breakpoint `nav:`, 100vw en dessous)

Vérifier la largeur CSS réelle du composant avant de choisir la valeur — un `sizes` trop généreux
fait télécharger une image plus grande que nécessaire.

## Dimensions et poids des sources

Avant d'ajouter une image dans `public/images/` :

1. **La source doit être au moins aussi large que sa plus grande taille d'affichage**, en comptant
   les écrans à densité de pixels élevée (viser ~2× la largeur CSS affichée). Une image plus petite
   que son rendu sera floue.
2. **Ne pas fournir une source inutilement plus grande que son plus grand usage.** Une vignette de
   galerie affichée à 554 px n'a pas besoin d'une source à 2560 px — ça alourdit le repo et ralentit
   la première optimisation à la demande, sans bénéfice (Next ne fait qu'agrandir vers le bas, jamais
   vers le haut).
3. **Format** : JPEG pour les photos, PNG uniquement si la transparence est nécessaire. Un PNG utilisé
   pour une photo (pas de transparence) est presque toujours plusieurs fois plus lourd qu'un JPEG
   équivalent — reconvertir avant d'ajouter au repo (`sips -s format jpeg -s formatOptions 82 in.png --out out.jpg` sur macOS).
4. Next ré-encode de toute façon la sortie en WebP/AVIF à la volée, mais une source déjà propre
   accélère le build et le premier chargement (moins à optimiser, moins de poids dans git).

## Images sans import statique

Si le nom de fichier n'est connu qu'à l'exécution (ex. slug venant d'un CMS), utiliser un
`import()` dynamique dans un composant serveur pour conserver `width`/`height`/`blurDataURL` :

```tsx
async function PostImage({ imageFilename, alt }: { imageFilename: string; alt: string }) {
  const { default: image } = await import(`../content/blog/images/${imageFilename}`);
  return <Image src={image} alt={alt} />;
}
```

À défaut, un `src` en chaîne (ex. image distante ou venant vraiment d'ailleurs que du repo) reste
possible mais oblige à fournir `width`/`height` à la main et perd le cache immutable — à réserver
aux cas où l'import statique n'est vraiment pas applicable.

## `alt` obligatoire et significatif

`jsx-a11y/media-has-caption` et les règles d'accessibilité du projet exigent un texte alternatif
utile (jamais vide, jamais un nom de fichier) — décrire ce que montre l'image dans son contexte.
