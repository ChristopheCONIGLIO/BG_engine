v1.1

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

•	Aucune dépendance (basé uniquement sur du HTML5), fonctionne directement pas besoin de serveur

•	Gestion des scripts du jeu simplifié via deux fonctions « EnterFrame » et « DrawObject », pas d’autres fonction à implémenter

•	Chargement et déchargement d’objet simplifiés

•	Disposition de formes basiques (rond rectangle,...) et de formats d'image (png,jpeg,...) clé en main

•	Affichage intelligent des formes tracées sur l’écran afin d’optimiser les temps de calcul

•	Gestion des évènement souris

•	Gestion automatique et rendu graphique et des temps morts (choisir uniquement le taux de rafraichissement <FPS> le moteur s'occupe du reste)

•	Gestion automatique des couches d’affichage (choisir le nombre de couche le moteur so'ccupe du reste)


Nouvelles fonctionnalités
-------------------------

    21/04/2022 - v1.100
    -------------------
    20/04/2022 -- Ajout optimisation tracé du texte
    20/04/2022 -- Ajout du tracé des lignes avec élèments thickness
    20/04/2022 -- Ajout optimisation tracé du ligne
    20/04/2022 -- Ajout paramètre <rotation> et <vissible> pour la ligne
    20/04/2022 -- Ajout optimisation tracé des polygones
    20/04/2022 -- Ajout paramètre <rotation>, <alpha> et <visible> pour le polygone
    20/04/2022 -- Ajout pour toutes les formes d'etre ou pas sur le plateau <onboard>
    20/04/2022 -- Ajout variable mouseDown
    20/04/2022 -- Multiples autres améliorations
    
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
   


TODO List
---------
   
    Mineur -- Ajouter des limites de déplacement max sur la partie drag and drop et zoom
    Mineur -- L'optimisation des tracés ne prend pas totalement en compte les modifications de dimensions à cause de la rotation (commencé pour les lignes)
    Majeur -- Les évènements souris et leurs variables ne sont pas encore supporté en langage objet
    Majeur -- Doc à créer
    Majeur -- Qualité code à réaliser commentaire et passer sur les import 
    

