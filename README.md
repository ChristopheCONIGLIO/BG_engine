v1.700

Projet
------
BackGround engine (nommé [B]ack[G]ground_engine - BG_engine).

<v1 en 2015 au début du HTML5 et de la balise canvas>

Cette application permet de développer rapidement des solutions graphiques nécessitant la gestion du zoom et du "drag and drop" sur des images, comme la création d'une carte similaire à Google Maps ou la réalisation d'un tableau de bord. Le moteur interne offre également une gestion simplifiée de l'animation des objets graphiques.

Auteur et License
-----------------
Auteur : Christophe CONIGLIO
License : License BSD
Contact : christophe.coniglio@gmail.com

Le code est publié sous licence BSD, ce qui signifie qu'il est librement accessible et modifiable sans aucune restriction et sans qu'aucun retour ne soit attendu. Si vous avez des questions ou rencontrez des bugs, vous pouvez contacter l'auteur à l'adresse suivante : christophe.coniglio@gmail.com


Description
-----------

Je propose un moteur de jeu 2D basé uniquement sur du Javascript, sans recourir à des bibliothèques externes. L'architecture s'inspire du moteur Flash, qui est maintenant obsolète.

L'objectif est de fournir un outil facile à utiliser, permettant de créer rapidement des jeux tout en assurant des performances optimales et une grande robustesse.


Prise en main
-------------

Pour tester le code, exportez-le sur votre ordinateur et lancez le fichier "index.html" via votre navigateur web.

Caractéristiques
----------------

Les caractéristiques du moteur 2D sont les suivantes :


• Conçu pour afficher une carte en vue de dessus, il gère automatiquement le zoom et le déplacement grâce à une fonctionnalité de "drag and drop".

• Aucune dépendance externe requise : il est basé uniquement sur du HTML5 et peut fonctionner directement côté client, sans besoin de serveur.

• La gestion des scripts du jeu est simplifiée grâce à deux fonctions, "EnterFrame" et "DrawObject", qui éliminent le besoin d'implémenter d'autres fonctions.

• Le chargement et le déchargement d'objets sont simplifiés, tandis que les formes basiques (cercles, rectangles, etc.) et les formats d'image (PNG, JPEG, etc.) sont prêts à l'emploi.

• Il propose trois modes d'affichage : le mode plateau, le mode plateau avec une taille fixe et le mode écran fixe.

• Plusieurs attributs sont pré-implémentés, tels que le calque, la rotation, la visibilité et la transparence.

• Les formes tracées sur l'écran sont affichées de manière intelligente pour optimiser les temps de calcul.

• La gestion des événements souris est prise en charge automatiquement.

• Le survol des formes est également pris en charge automatiquement et le rendu graphique est optimisé.

• La gestion des temps morts et du taux de rafraîchissement est automatisée.

• Le moteur gère automatiquement les couches d'affichage, avec la possibilité de choisir le nombre de couches.

• Il intègre un moteur physique 2D pour les objets de type cercle, simple et rapide à utiliser.

• Il propose des exemples d'utilisation en guise de documentation.


Change log
----------

    13/11/2024 — v1.700 : multiple évolution + Correction du tactile sur iOS
    -------------------
    13/11/2024 -- La gestion tactile est maintenant complètement opérationnelle sur tous les supports Android et iOS, testée sur iPhone, iPad et téléphones Android.
    13/11/2024 -- Ajoute la récupération de la taille noturel d'une image
    13/11/2024 -- Amélioration de la forme texte sur plusieurs lignes
    13/11/2024 -- Ajout de limites pour la caméra (uniquement le zoom)

    02/11/2024 — v1.602 : Correction du rendu d'image
    -------------------
    13/11/2024 -- Le rendu d'image affiche un rectangle gris avec une transparence tant que l'image n'est pas chargée.
    13/11/2024 -- Ajout d'un setter dans le rendu d'image pour indiquer si l'image est chargée.

    23/10/2024 -- v1.601 FIX sur la gestion du tactile et autres
    -------------------
    23/10/2024 -- L'anulation du tactile ne marchait pas cause oubli cela est corrigé
    23/10/2024 -- Choix de partir sur getBoundingClientRect dans la taille de la fenttre du rendu
    23/10/2024 -- Amélioration du tactile sur iOS

    11/02/2024 -- v1.600 Ajout d'un texte sur plusieurs lignes
    -------------------
    11/02/2024 -- Ajout d'un texte sur plusieurs ligne BG_textWidthConstraint.js
    
    05/10/2023 -- v1.501 Correction mineures
    -------------------
    05/10/2023 -- Ajout "getteurs" arguments des objets avec bordure
    05/10/2023 -- Nettoyage des projets en exemples
    05/10/2023 -- Correction et ajout de l'option "fond" sur l'objet rectangle avec bordure
    
    06/08/2023 -- v1.500 Modifications majeures touchant tout le moteur (compatibles avec version <1.5)
    --------------------
    06/08/2023 -- Le zoom est focalisé sur la position souris
    06/08/2023 -- Ajout de la configuration d'un mode "gras" sur le texte
    06/08/2023 -- Ajout d'un projet qui expérimente le texte en balise canvas via le BG_engine
    06/08/2023 -- Correction sur la destruction des BG_script
    06/08/2023 -- Ajout d'un champ p_alive sur les objets et les scripts
    08/08/2023 -- Correction d'un bug avec le zoom est la position "souris plateau" qui n'était pas à jour

    27/06/2023 -- v1.313
    --------------------
    27/06/2023 -- Mineurs améliorations dont amélioration du monitoring des performances en FPS     
    27/06/2023 -- finalisation de la démo 013-GRID
    
    21/06/2023 -- v1.312
    --------------------
    21/06/2023 -- Revue des 3 formes avec bordures
    21/06/2023 -- Préparation d'un nouveau projet de démo

    26/05/2023 -- v1.311
    --------------------
    25/04/2023 -- Ajout d'une nouvelle forme -> Bordure de rectangle arrondis
    25/04/2023 -- Ajout du fond pour les forme avec contours
    
    25/04/2023 -- v1.310
    --------------------
    25/04/2023 -- Ajout d'une nouvelle forme -> Bordure de cercle
    25/04/2023 -- Ajout d'une nouvelle forme -> Bordure de polygone
    25/04/2023 -- Reformulation de ce fichier

    06/04/2023 -- v1.309
    --------------------
    06/04/2023 -- Ajout d'une nouvelle forme -> Bordure de rectangle
    06/04/2023 -- Ajout d'un fichier exemple pour les formes avec bordure
    
    24/10/2022 -- v1.308
    --------------------
    24/10/2022 -- Correction sur les textes
    
    20/10/2022 -- v1.307
    --------------------
    20/10/2022 -- Amélioration de la classe drawImage avec une optimisation de la fonction setImage
    
    30/08/2022 -- v1.306
    --------------------
    30/08/2022 -- Amélioration du système de l'utilisation du zoom

    20-21/07/2022 - v1.303-v1.304-v1.305
    ------------------------------------
    03/08/2022 -- Ajout de la configuration d'un retard sur le drag and drop 
    21/07/2022 -- Multiples mineurs améliorations + ajouts d'interface
    20/07/2022 -- Multiples mineurs améliorations + ajouts d'interface

    13/07/2022 - v1.302
    -------------------
    13/07/2022 -- mineurs améliorations
    13/07/2022 -- Ajout de de formes dans l'exemple 9

    08/07/2022 - v1.301
    -------------------
    08/07/2022 -- Survol souris pours polygone et ligne

    06/07/2022 - v1.300
    -------------------
    06/07/2022 -- Ajout du mode sur plateau avec taille fixe
    06/07/2022 -- Ajout du du survol souris pour tous les objets avec l'exact représentation !
    06/07/2022 -- Ajout d'un exemple de projet incluant le survol sur tous les objets et type d'affichage

    27/06/2022 - v1.213
    -------------------
    27/06/2022 -- Ajout de l'objet image dans l'exemple "008-MinimalEditeurDeForme"
    
    26/06/2022 - v1.212
    -------------------
    26/06/2022 -- Ajout d'un exemple de createurs d'objets graphiques via le bg_engine "008-MinimalEditeurDeForme"
    26/06/2022 -- Diverses corrections
    26/06/2022 -- Ajout de plusieurs set/get dans les objets

    23/05/2022 - v1.211
    -------------------
    23/05/2022 -- Ajout dd'une classe d'outils pour les polygones
    23/05/2022 -- Ajout d'une exemple pour les polygones 
    
    22/05/2022 - v1.210
    -------------------
    22/05/2022 -- Ajout d'un moteur physique sur les cercles fonctionnel
    22/05/2022 -- Ajout d'exemple avec le nouveau systèmed'écriture de code via l'héritage script et objet 

    21/05/2022 - v1.200
    -------------------
    21/05/2022 -- Création des exemples d'utilisatio clé en main
    21/05/2022 -- Séparation du code du moteur des exemples
    21/05/2022 -- Création d'un objet BG_script synchronisé avec le moteur pour executer du script a chaque frame (remplace le BG_coreRountine)
    21/05/2022 -- Revue du système de code des objets BG_engine via un système clé en maisn d'héritage
    21/05/2022 -- Revue du systeme d'import
    21/05/2022 -- Gestion complete en class - plusieurs bg_engine sur la meme page fonctionne
    21/05/2022 -- Comptabilite complete souris et mobile (multi touch) deplacement et zoom
    21/05/2022 -- Revue complete du systeme d'appel et de destruction des objet graphique
    21/05/2022 -- Revue complete des appel général pour simplification
    21/05/2022 -- **EXPERIMENTAL** Ajout moteur physique sur les objets BG_circle

    13/05/2022 - v1.110
    -------------------
    13/05/2022 -- Possibilité de récuprer zoom et position plateau 
    13/05/2022 -- Possibilité de forcer zoom et position plateau
    13/05/2022 -- Gestion de mouseleave et mouseout pour perdre le focus quand on sort du canvas
    13/05/2022 -- Suppression de BG_coreRountine pour plus de simplification et d'uniformisation
    13/05/2022 -- Plus besoin de variable global
    13/05/2022 -- Compatible plusieurs bg_engine sur la meme page
    13/05/2022 -- Conversion de enterFrame en launchEnterFrame
    13/05/2022 -- Ajout de stopEnterFrame 
    13/05/2022 -- Correction de la bouding box de tracage pour l'objet line 
    13/05/2022 -- Ajout d'un système de tracage de contour pour le debug
    13/05/2022 -- Modification système d'import création de BG_engineImport
    13/05/2022 -- supression du dossier CSS et graphic, passager sous une image libre pour démo

    21/04/2022 - v1.100
    -------------------
    21/04/2022 -- Ajout optimisation tracé du texte
    21/04/2022 -- Ajout du tracé des lignes avec élèments thickness
    21/04/2022 -- Ajout optimisation tracé du ligne
    21/04/2022 -- Ajout paramètre <rotation> et <vissible> pour la ligne
    21/04/2022 -- Ajout optimisation tracé des polygones
    21/04/2022 -- Ajout paramètre <rotation>, <alpha> et <visible> pour le polygone
    21/04/2022 -- Ajout pour toutes les formes d'etre ou pas sur le plateau <onboard>
    21/04/2022 -- Ajout variable mouseDown
    21/04/2022 -- Multiples autres améliorations
    
    11/04/2022 - v1.003
    -------------------
    11/04/2022 -- Ajout de setDim sur tous les objets
    11/04/2022 -- Ajout de setVisible sur tous les objets
    11/04/2022 -- Ajout de setRotation sur tous les objets
    11/04/2022 -- Ajout d'une fonction permettant de récupérer la taille d'un texte avec l'bjet text 
   
    15/02/2022 - v1.002
    -------------------
    15/02/2022 -- Ajout de la transparence sur les objets avec la fonction setAlpha
    15/02/2022 -- Ajout des paramètre elementHTML, nombre de couche et nombre de FPS dans l'appel principal du moteur
   
    Année 2015  - v1.000
    -------------------
    2015       -- Premeire version du BG engine moteur en HTML5 proposant une caméra de type cartographie par Christophe CONIGLIO
    2015       -- Expérimentation premeirs débuts sur les capacités du HTML5
    2015       -- Expérimentation premeirs débuts de la balise canvas permetant de faire du rendu 2D
    2013       -- [Moteur Physique] Creation du moteur physique 2d dans Flash qui sera intégré ici plus tard
    2013       -- [Moteur Physique] Originel flash code 2d pcircle physic engine par Christophe CONIGLIO 

Idées d'amélioration
--------------------
   
    -- Ajouter un système de masque sur les objets
    -- ce moteur surcharge la plupart des info souris/tactile mais ne porpose pas d'event 
    -- Limite texte à revoir car ne fonctionne pas sur les grands format
    -- Le texte BG_textWidthConstraint.js ne gere pas bien la rotation
    -- L'optimisation du rendu des tracés ne prend pas totalement en compte les modifications de dimensions à cause de la rotation (l'implémentation actuelle favorise l'optimisation à l'exactitude)
    -- Améliorer la fonction getMouseOver pour les objets polygones avec bordure
    -- Amléiorer les forme avec bordures pour pas voir la délimitation en alpha 
    -- **Doc à créer**
    -- un optimisation sèvère sur la supression des objets est à mettre en place en effet on parcourt les layers alors qu'on pourrait le savoir avant
    -- ajouter les limites de navigation sur x et y

