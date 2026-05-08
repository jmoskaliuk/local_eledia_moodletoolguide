=== eLeDia Moodle Tool Guide ===
Contributors: eledia, jmoskaliuk
Tags: moodle, elearning, shortcode, tool-guide, didactique
Requires at least: 6.0
Tested up to: 6.9
Requires PHP: 7.4
Stable tag: 1.1.33
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Guide interactif des activités de Moodle 5 — vues matrice, cartes et assistant. Intégration par shortcode.

== Description ==

Le **eLeDia Moodle Tool Guide** aide les enseignants et concepteurs de cours à choisir la bonne activité Moodle pour leur objectif didactique. Le guide rassemble un savoir organisé sur 22 activités Moodle avec des métadonnées sur l'effort de mise en place, l'effort d'accompagnement, la pertinence pour quatre catégories d'objectifs d'apprentissage (informer, évaluer, communiquer, collaborer) et le niveau de la taxonomie de Bloom.

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

Non. Le plugin utilise le paquet `wp-element` fourni avec WordPress et ne charge pas React depuis un CDN externe.

= Le plugin fonctionne-t-il avec l'éditeur de blocs Gutenberg ? =

Le shortcode fonctionne partout où WordPress exécute des shortcodes — y compris dans le bloc shortcode de Gutenberg. Un bloc Gutenberg natif est prévu pour une version ultérieure.

= Puis-je étendre la liste des outils ? =

Les données des outils sont actuellement codées en dur dans le bundle JavaScript. Un éditeur admin pour la liste des outils est prévu.

= Y a-t-il du tracking ou de la télémétrie ? =

Non. Le plugin est 100 % autonome et ne communique avec aucun serveur externe.

== Journal des modifications ==


= 1.1.33 =
* Les quatre en-têtes de la matrice (« Information & Transfert » etc.) ont désormais une largeur identique, indépendamment de la longueur du texte. Réalisé avec CSS table-layout:fixed et largeur calculée identique pour les quatre colonnes d'objectifs.
= 1.1.32 =
* Bundle JavaScript du plugin WordPress aligné sur la source standalone actuelle (moodle-tool-guide.html). Apporte la matrice responsive mobile, des ajustements supplémentaires de l'interface React et le dernier jeu de données.
* Crédit de traduction dans le pied de page allemand : Susanne Gebauer et Gerald Hartwig ajoutés à côté de Ralf Hilgenstock.

= 1.1.31 =
* Logo du partenaire mis à jour vers le badge officiel « Premium Moodle Partner Trademark™ » (Primary Colour RGB).
* Ajout de la documentation DevFlow sous docs/ selon le standard eLeDia.OS_DevFlow.
* Nettoyage du dépôt : suppression des notes de prototype obsolètes (IconPreview, Konzept) et de l'ancien Prototyp_ToolGuide.jsx ; la source de vérité est le bloc Babel dans Prototyp_ToolGuide.html.

= 1.1.28 =
* Mise à jour des métadonnées de compatibilité WordPress.org pour Plugin Check et suppression du hook manuel de chargement du textdomain devenu inutile.

= 1.1.27 =
* Suppression de l'activité Sondage obsolète des données Moodle 5 synchronisées et alignement de la liste des activités sur le tableau source mis à jour.

= 1.1.26 =
* Suppression de l'activité Chat obsolète des données Moodle 5 synchronisées et alignement de la liste des activités sur le tableau source.

= 1.1.25 =
* Scripts Tool Guide et code d'amorçage inline marqués avec les exclusions WP Rocket `nowprocket` afin que l'application démarre sans interaction de défilement.

= 1.1.24 =
* Ajout d'indications tactiles pour les en-têtes de matrice et affichage des indications de matrice en bas du viewport pour les appareils tactiles comme l'iPad.

= 1.1.23 =
* Ajout d'une action « Commencer une nouvelle comparaison » dans la vue de comparaison et alignement des boutons de comparaison en bas des cartes.

= 1.1.22 =
* Les objectifs d'apprentissage Bloom sont affichés de manière neutre dans les détails des cartes au lieu d'une adéquation bon/partiel/mauvais.

= 1.1.21 =
* Ajout d'indications adaptées au toucher dans la matrice mobile pour les points d'effort et les icônes d'adéquation.

= 1.1.20 =
* Sur mobile, l'affichage démarre désormais par les cartes et l'indicateur de chargement est supprimé explicitement avant le rendu de l'application.

= 1.1.19 =
* Correction de l'icône « partiellement adapté » afin que le pouce pointe vers la gauche.

= 1.1.18 =
* Ajout d'un indicateur de chargement accessible pendant le démarrage du bundle WordPress et synchronisation de la matrice mobile compacte du prototype HTML.

= 1.1.17 =
* Mise en page mobile améliorée : les flèches de lecture de la matrice sont masquées sur petits écrans, le champ de recherche est aligné à gauche et les choix de l'assistant restent dans la largeur du viewport.

= 1.1.16 =
* Cartes de matrice mobile améliorées pour iPhone : les pastilles des objectifs didactiques passent sur deux colonnes et les libellés longs ne se chevauchent plus.

= 1.1.15 =
* Intégration aux thèmes WordPress améliorée : le Tool Guide s'étend désormais sur toute la largeur du viewport pour l'en-tête, la navigation, l'arrière-plan du contenu et le pied de page. Le pied de page reste en bas lorsque les résultats sont courts.

= 1.1.14 =
* Prise en charge de l'internationalisation JavaScript WordPress pour les textes d'interface via `wp-i18n`, `wp_set_script_translations()`, des traductions JSON intégrées et un modèle POT. Les données d'outils restent disponibles via le sélecteur de langue intégré DE/EN/FR/ES.

= 1.1.13 =
* Synchronisation du prototype HTML actuel dans le plugin WordPress : aide de lecture de la matrice, panneaux d'information, filtrage amélioré de l'assistant, cartes de matrice adaptées au mobile et améliorations d'accessibilité pour contraste, focus et sémantique de tableau. React est désormais chargé via le paquet `wp-element` fourni avec WordPress au lieu d'un CDN externe.

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
* React via le paquet `wp-element` fourni avec WordPress.
* WCAG 2.2 AA : contraste, utilisation au clavier, gestion du focus, live regions.

== Crédits ==

Basé sur le [Moodle Tool Guide for Teachers](https://www.cyberlearn.ch/) de Joyce Seitzinger, Gavin Henrick et Nicolas Martignoni. Traduction allemande originale : Ralf Hilgenstock. Refonte et mise à jour pour Moodle 5 : eLeDia GmbH.
