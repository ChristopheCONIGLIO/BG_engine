v1.308

Projet
------
BackGround engine (nommé [B]ack[G]ground_engine - BG_engine),

constitue une application pour développer rapidement des solutions graphiques nécessitant de gérer le zoom et le drag and drop sur des images. 
Par exemple la gestion d’une carte comme google map ou la réalisation d’un Dashboard. Le moteur interne propose aussi la gestion simplifié d’animation d’objet graphique.

Auteur et License
-----------------
Christophe CONIGLIO
(License BSD, le code est libre d'accès copie, modif,... sans aucun retour attendu)

Si questions ou bugs à remonter, contact <christophe.coniglio@gmail.com> 

Description
-----------

Je propose un moteur de jeu 2D basé uniquement sur du Javascript sans bibliothèque externe. L'architecture est inspiré du "défunt" moteur Flash

L’idée est de proposer un outil facile de prise en main afin d'aboutir rapidement sur un jeu 
mais efficace dans ses performances et sa robustesse


Prise en main
-------------

Pour tester exporter le code sur votre machine et lancer le fichier index.html via votre navigateur

Caractéristiques
----------------

Les caractéristiques du moteur 2D sont les suivantes :

•	Pensé pour afficher une carte en vue de dessus, gere le zoom et le drag and drop automatiquement

•	Aucune dépendance (basé uniquement sur du HTML5), fonctionne directement coté client (pas besoin de serveur)

•	Gestion des scripts du jeu simplifié via deux fonctions « EnterFrame » et « DrawObject », pas d’autre fonction à implémenter

•	Chargement et déchargement d’objet simplifiés

•	Disposition de formes basiques (rond rectangle,...) et de formats d'image (png,jpeg,...) clé en main

•	Trois mode d'affichage (1) sur le plateau, (2) sur plateau avec taile fixe ou (3) sur l'écran fixe

•	Divers atributs pré-implémenté calque/rotation/visible/transparence/...

•	Affichage intelligent des formes tracées sur l’écran afin d’optimiser les temps de calcul

•	Gestion des évènement souris

•	Gestion automatique du survol souris sur toutes les formes implémentés

•	Gestion automatique et rendu graphique et des temps morts (choisir uniquement le taux de rafraichissement <FPS> le moteur s'occupe du reste)

•	Gestion automatique des couches d’affichage (choisir le nombre de couche le moteur so'ccupe du reste)

•	Integration d'un moteur physique 2d sur les objets de type cercle simple et rapide d'utilisation

•	Proposition d'exemples d'usage faisant offcice de documentation


Change log
----------

    
    24/10/2022 -- v1.308
    -------------------
    24/10/2022 -- Correction sur les textes
    
    20/10/2022 -- v1.307
    -------------------
    20/10/2022 -- Amélioration de la classe drawImage avec une optimisation de la fonction setImage
    
    30/08/2022 -- v1.306
    -------------------
    30/08/2022 -- Amélioration du système de l'utilisation du zoom

    20-21/07/2022 - v1.303-v1.304-v1.305
    -------------------
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
   
    > /XX/2015 - v0.001
    -------------------
    > /XX/2015 -- Originel HTML5 2d engine - Christophe CONIGLIO
    > /XX/2013 -- Originel flash code 2d pcircle physic engine - Christophe CONIGLIO 

Idées d'amélioration
--------------------
   
    -- Ajouter un système de masque sur les objets
    -- Ne gere pas plus de deux doigts pour le mobile
    -- Ajouter des limites de déplacement max sur la partie drag and drop et zoom
    -- Limite texte à revoir car ne fonctionne pas sur les grands format
    -- L'optimisation du rendu des tracés ne prend pas totalement en compte les modifications de dimensions à cause de la rotation (l'implémnetation actuelle favorise l'optimisation à l'l'exactitude)
    -- **Doc à créer**
    

