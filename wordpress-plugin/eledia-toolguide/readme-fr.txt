=== eLeDia Moodle Tool Guide ===
Contributors: eledia, jmoskaliuk
Tags: moodle, elearning, shortcode, tool-guide, didactique
Requires at least: 6.0
Tested up to: 6.5
Requires PHP: 7.4
Stable tag: 1.1.12
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Guide interactif des activités de Moodle 5 — vues matrice, cartes et assistant. Intégration par shortcode.

== Description ==

Le **eLeDia Moodle Tool Guide** aide les enseignants et concepteurs de cours à choisir la bonne activité Moodle pour leur objectif didactique. Le guide rassemble un savoir organisé sur environ 25 activités Moodle avec des métadonnées sur l'effort de mise en place, l'effort d'accompagnement, la pertinence pour quatre catégories d'objectifs d'apprentissage (informer, évaluer, communiquer, collaborer) et le niveau de la taxonomie de Bloom.

Trois vues sur le même jeu de données :

* **Matrice** — vue tableau avec l'effort de mise en place/accompagnement et la pertinence par objectif d'apprentissage sous forme d'icônes pouce.
* **Cartes** — vue en tuiles avec filtres pour l'effort, l'objectif d'apprentissage et le niveau de Bloom.
* **Assistant** — assistant guidé en 5 étapes qui recommande des activités pertinentes selon les réponses de l'utilisateur.

Le guide est multilingue (anglais, allemand, français, espagnol), conforme à WCAG 2.2 AA et propose un sélecteur intégré de taille de police. Les données sont basées sur une traduction du Moodle Tool Guide suisse par Joyce Seitzinger, Gavin Henrick et Nicolas Martignoni (traduction allemande originale : Ralf Hilgenstock), mis à jour didactiquement pour Moodle 5.

Ce plugin est un wrapper léger autour du Tool Guide HTML autonome — le payload JavaScript est synchronisé depuis le prototype. Le plugin fournit un shortcode, aucune interface admin, aucune table en base de données, aucun tracking.

Remarque : le readme principal pour le WordPress Plugin Directory est en anglais (`readme.txt`). Ce fichier est la traduction française.

== Installation ==

1. Téléversez le ZIP du plugin via *Extensions → Ajouter → Téléverser une extension*.
2. Activez le plugin.
3. Insérez le shortcode `[eledia_toolguide]` sur n'importe quelle page, article ou type de contenu personnalisé.

Attributs de shortcode optionnels :

* `lang="de|en|fr|es"` — force une langue spécifique. Sans paramètre, la locale WordPress est utilisée.
* `height="800px"` — définit la hauteur minimale du conteneur. Par défaut : `800px`.

Exemples :

`[eledia_toolguide]`
`[eledia_toolguide lang="fr"]`
`[eledia_toolguide height="auto"]`

== Questions fréquentes ==

= Le plugin charge-t-il React depuis un CDN externe ? =

Par défaut, oui — React 18.3.1 est chargé depuis unpkg.com. Pour des installations conformes au RGPD sans requêtes externes, vous pouvez héberger React vous-même : placez `react.production.min.js` et `react-dom.production.min.js` de la distribution React dans `assets/js/vendor/`. Le plugin détecte automatiquement les fichiers locaux et les utilise à la place du CDN.

= Le plugin fonctionne-t-il avec l'éditeur de blocs Gutenberg ? =

Le shortcode fonctionne partout où WordPress exécute des shortcodes — y compris dans le bloc shortcode de Gutenberg. Un bloc Gutenberg natif est prévu pour une version ultérieure.

= Puis-je étendre la liste des outils ? =

Les données des outils sont actuellement codées en dur dans le bundle JavaScript. Un éditeur admin pour la liste des outils est prévu.

= Y a-t-il du tracking ou de la télémétrie ? =

Non. Le plugin est 100 % autonome (à l'exception du CDN React optionnel) et ne communique avec aucun serveur externe.

== Journal des modifications ==

= 1.1.12 =
* Pied de page redessiné pour s'harmoniser avec le nouvel en-tête : beige clair chaleureux (#FFECDB) avec texte et liens soulignés en bleu foncé, au lieu de la bande bleu foncé avec liens orange. Les logos eLeDia et Moodle Partner, le badge CC-BY-NC-SA et l'icône GitHub restent lisibles sur le nouveau fond.

= 1.1.11 =
* Nouveau look de l'en-tête : le dégradé bleu est remplacé par un beige clair chaleureux (#FFECDB) avec un texte bleu foncé, et la sous-navigation est désormais grise (#F3F5F8) au lieu de blanche — plus de bande blanche pleine largeur en haut sur les écrans larges. Meilleurs contrastes au zoom et en mode contraste élevé.

= 1.1.10 =
* Isolation des thèmes corrigée : les listes déroulantes de filtres (Adapté à / Bloom) et les liens du pied de page n'héritent plus des styles du thème WordPress. Le plugin intègre désormais une réinitialisation CSS limitée à son conteneur, pour que le Tool Guide s'affiche à l'identique dans n'importe quel thème actif.
* Emojis livre et ampoule retirés des boutons « Docs Moodle » et « eledia.community » dans la vue détail — rendu plus propre.

= 1.1.9 =
* Les trois icônes d'évaluation de la matrice mises à jour vers Lucide v1.8.0 : thumbs-up, thumbs-down et circle-slash ont une nouvelle forme redessinée.
* Readme du plugin disponible en anglais (principal), allemand, français et espagnol.

= 1.1.8 =
* Icône "neutre" de la matrice : utilise maintenant Lucide circle-slash (cercle barré) au lieu d'un thumbs-up tourné. Plus clair comme "ni l'un ni l'autre".

= 1.1.7 =
* Les icônes d'activité utilisent maintenant les couleurs officielles de propos d'activité de Moodle 5 (administration / évaluation / collaboration / communication / contenu interactif / ressources).
* Assistant : boutons de niveau de Bloom dans la palette CI eLeDia au lieu d'un dégradé HSL.
* Les cartes de résultats de l'assistant utilisent maintenant la même mise en page que la vue cartes principale.
* Pouce latéral de la matrice rendu comme Lucide thumbs-up tourné de -90° (remplacé en 1.1.8).

= 1.1.6 =
* Port WordPress initial depuis le plugin Moodle local_toolguide 1.1.6.
* Intégration par shortcode.
* React 18 via CDN ou auto-hébergé.
* WCAG 2.2 AA : contraste, utilisation au clavier, gestion du focus, live regions.

== Crédits ==

Basé sur le [Moodle Tool Guide for Teachers](https://www.cyberlearn.ch/) de Joyce Seitzinger, Gavin Henrick et Nicolas Martignoni. Traduction allemande originale : Ralf Hilgenstock. Refonte et mise à jour pour Moodle 5 : eLeDia GmbH.
