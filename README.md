v1.001

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
mais puissant dans sa conception et son optimisation

Pour tester exporter le code sur votre machine et lancer le fichier index.html via votre navigateur

Caractéristiques
----------------

Les caractéristiques du moteur 2D sont les suivantes :

•	Pensé pour afficher une carte en vue de dessus, gere le zoom et le drag and drop automatiquement

•	Aucune dépendance (basé sur balise canvas), fonctionne directement en local

•	Gestion des scripts du jeu simplifié via deux fonctions « EnterFrame » et « DrawObject », pas d’autres fonction à implémenter

•	Chargement et déchargement d’objet simplifiés

•	Disposition de formes basiques (rond rectangle,...) et de formats d'image (png,jpeg,...) clé en main

•	Affichage intelligent des formes tracées sur l’écran afin d’optimiser les temps de calcul

•	Gestion des évènement souris

•	Gestion automatique et rendu graphique et des temps morts (choisir uniquement le taux de rafraichissement <FPS> le moteur s'occupe du reste)

•	Gestion automatique des couches d’affichage (choisir le nombre de couche le moteur so'ccupe du reste)


Nouvelles fonctionnalités
-------------------------
    
    15/02/2022 -- Ajout de la transparence sur les objet BASIC avec la fonction setAlpha
    15/02/2022 -- Ajout des paramètre elementHTML, nombre de couche et nombre de FPs dans l'appel principal du moteur


TODO List
---------
   
    0a -- Ajouter la fonction "setDim" dans la classe object de base
    0b -- Ajouter la fonction "setRotation" dans la classe "drawImage"
    0c -- Ajouter la fonction "getDim" pour la classe "drawText"
    0d -- Ajouter des limites de déplacement max sur la partie drag and drop
    1a--  Ajout des objets fixes
    1b--  Ajout d'une couleur de fond
    1c --  Les BASIC object :
        - text
        - line
        ne gèrent pas l'affichage intelligent sur l'écran
    2 --  Les évènements souris et leurs variables ne sont pas encore supporté en langage objet
    3 -- Doc à créer
    4 -- qualité code à réaliser

