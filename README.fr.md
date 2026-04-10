# Moodle Tool Guide (eLeDia)

[English](README.md) · [Deutsch](README.de.md) · [Español](README.es.md)

Un Tool Guide interactif pour Moodle 5 — basé sur le classique *Moodle Tool Guide for Teachers* et enrichi des recommandations didactiques spécifiques à eLeDia.

Trois canaux de livraison depuis une source unique :

1. **Page web autonome** — `Prototyp_ToolGuide.html` : fichier HTML/React unique, intégrable directement via `<iframe>`.
2. **Plugin local Moodle** — `moodle-plugin/local/toolguide/` / `local_toolguide.zip` : plugin local installable pour Moodle 4.5 / 5.x.
3. **Plugin WordPress** — `wordpress-plugin/eledia-toolguide/` / `eledia-toolguide.zip` : shortcode `[eledia_toolguide]` pour tout site WordPress.

## Fonctionnalités

- **25 activités Moodle** avec des recommandations didactiques pour cinq objectifs pédagogiques
- **Vue Matrice** avec icônes pouce en haut / cercle barré / pouce en bas et infobulles
- **Vue Cartes** avec descriptions détaillées et filtres (effort de mise en place, effort d'accompagnement, objectif, niveau de Bloom)
- **Assistant** — assistant guidé en 5 étapes qui recommande des activités selon les réponses
- **Mode Comparaison** pour comparer jusqu'à trois outils côte à côte
- **Effort bidimensionnel** : mise en place et accompagnement continu
- **Taxonomie de Bloom** (niveaux 1–6) par activité
- **4 langues d'interface** : anglais, allemand, français, espagnol
- **Accessibilité** : WCAG 2.2 AA — rôles ARIA, lien d'évitement, navigation clavier, piège de focus pour les dialogues, live regions pour les mises à jour de filtres, changement de taille de police
- **Responsive** — ordinateur, tablette et mobile
- **Couleurs officielles Moodle 5 par intention d'activité** (administration / évaluation / collaboration / communication / contenu interactif / ressources)

## Source de données

`Datenbank_ToolGuide.xlsx` est la source unique de vérité pour toutes les données des outils (descriptions, pertinence par objectif, effort, Bloom). Le HTML autonome, le JS du plugin Moodle et le JS du plugin WordPress sont tous synchronisés depuis ce fichier via `sync_plugin_js.py` et `sync_wordpress_js.py`.

## Utiliser la page autonome

`Prototyp_ToolGuide.html` est un fichier HTML autonome. Ouvrez-le directement dans un navigateur, ou intégrez-le via une iframe :

```html
<iframe src="/wp-content/uploads/Prototyp_ToolGuide.html"
        width="100%" height="900" style="border:0"></iframe>
```

## Installer le plugin Moodle

Depuis la racine de Moodle :

```bash
unzip local_toolguide.zip -d local/
php admin/cli/upgrade.php
```

Accessible ensuite à `/local/toolguide/index.php`. Le plugin ajoute une entrée à la navigation globale pour les utilisateurs disposant de la capacité `local/toolguide:view`.

## Installer le plugin WordPress

1. Téléversez `eledia-toolguide.zip` via **Extensions → Ajouter → Téléverser une extension**.
2. Activez le plugin.
3. Insérez le shortcode `[eledia_toolguide]` sur n'importe quelle page, article ou type de contenu personnalisé.

Attributs de shortcode optionnels :

- `lang="de|en|fr|es"` — force une langue spécifique. Sans paramètre, la locale WordPress est utilisée.
- `height="800px"` — définit la hauteur minimale du conteneur. Par défaut : `800px`.

Exemples :

```
[eledia_toolguide]
[eledia_toolguide lang="en"]
[eledia_toolguide height="auto"]
```

Par défaut, le plugin WordPress charge React 18.3.1 depuis unpkg.com. Pour des installations conformes au RGPD sans requêtes externes, vous pouvez héberger React vous-même : placez `react.production.min.js` et `react-dom.production.min.js` dans `assets/js/vendor/` — le plugin détecte automatiquement les fichiers locaux.

## Licence

GNU GPL v3 ou ultérieure (compatible Moodle).

## Crédits

Basé sur le [Moodle Tool Guide for Teachers](https://www.cyberlearn.ch/) de Joyce Seitzinger, Gavin Henrick et Nicolas Martignoni. Traduction allemande originale : Ralf Hilgenstock. Refonte, mise à jour pour Moodle 5, assistant, vues Matrice et Cartes, empaquetage en plugin local Moodle et plugin WordPress : [eLeDia GmbH](https://eledia.de).
