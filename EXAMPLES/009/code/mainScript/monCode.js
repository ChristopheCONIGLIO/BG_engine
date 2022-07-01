 //
// un script dans le format bg_engine 
// la function enterFrame() est executer à chaque frame de rendu graphique
// le BG_engine so'ccupe de tout il faut juste le déclarer au début (voir pluis loin)
//
class monCode extends BG_script{
    constructor(bg) {
        super(bg); // appel du super !
        this.animAlphaSens = 1; //utilisé pour coder un va et vient sur l'apha du curseur pour faire jolie
        this.animAlphaIncr = 0.03; // vitesse de l'annimation
        // si il vaut 1 alors j'augmente l'apha si il vaut 0 je le dominue
        // une boucle dans le enterfrmae gere tout ca 
    }
    enterFrame(){
        
        
        // Explication des diférent cas  traiter ici "if"
        // 1 - on regarde mousedonw pour activer le drag and drop
        // 2 - on regarde le clic pour activer la selection d'objet ou du curseur
        // 3 - on active l'animation
        // 4 - on gere l'affichage ou pas de certains elèments

        // 1 - on regarde mousedonw pour activer le drag and drop
        if( _dragAndDroEnable == false && this.p_bg.bg_g_stat.getMouseDown() == 1){ 
            // detect le mouseDown surtout ne pas tester si 
            // _dragAndDroEnable == true car sa veut dire qu'il est deja activé

            //on check si le mousedown est sur une zone clicaquable d'obj déja créé
            var obj = undefined;
            var bestdis = 999;
            for(var k = 0; k < _arrListAllObjEditor.length ; k++){ //on parcourt tous les obj
                // on suposse que tous les objet on bien la fonction determineIfClicOfMe
                // si ce n'est pas le cas il faut surcharger l'objet et l'ajouter
                
                var ret = _arrListAllObjEditor[k].determineIfClicOfMe(this.p_bg.bg_g_stat.getMouseXBoard(),this.p_bg.bg_g_stat.getMouseYBoard());
                if( ret[0] == true && bestdis > ret[1] ){
                    obj = _arrListAllObjEditor[k];
                    bestdis = ret[1];
                    this.p_bg.bg_g_stat.setManualControl(false); //permet de bloquer le controle de la camera pour faire le drag and drop sans bouger le plateau
                }
            }
            
            if( obj != undefined){ //la ca devient compliqué
                _currentObjSelected = obj;  // choix purement personnel , ici la classe obj concercé saura quelle est choisit
                obj.initDragandDrop(); // init le drag and drop notameent pour récuprer la pos de la soruis par rapport à l'objet
                _dragAndDroEnable = true;   // variable globale utilisé pour informer tout le monde ! 
            }

        }
        if( this.p_bg.bg_g_stat.getMouseDown() == 0){ //fin du drag and drop ou de rien !
            _dragAndDroEnable = false;
            this.p_bg.bg_g_stat.setManualControl(true); // reactive le controle de la camera
        }
        
        // 2 - on regarde le clic pour activer la selection d'objet ou du curseur
        if( this.p_bg.bg_g_stat.getMouseClick() == 1){ // clic détecté par le bg_engine via this.p_bg.bg_g_stat.getMouseClick()
            
            var mouseXClic = this.p_bg.bg_g_stat.getMouseXBoard();
            var mouseYClic = this.p_bg.bg_g_stat.getMouseYBoard();
            //attention this.p_bg.bg_g_stat.getMouseXBoard() bouge en temps réel au clic c'est le moment de sauvegarder la postion souris
            _mouseXclic = mouseXClic;
            _mouseYclic = mouseYClic;

            // on check si on est sur un objet
            _selectorMouse.setVisible(false); // on rend le curseur invisible pour l'instant
            _currentObjSelected = undefined; // on le passe a undefined
            var bestdis = 999;
            for(var k = 0; k < _arrListAllObjEditor.length ; k++){ //on parcourt tous les obj
                // on suposse que tous les objet on bien la fonction determineIfClicOfMe
                // si ce n'est pas le cas il faut surcharger l'objet et l'ajouter
                
                var ret = _arrListAllObjEditor[k].determineIfClicOfMe(_mouseXclic,_mouseYclic);
                if( ret[0] == true && bestdis > ret[1] ){
                    _currentObjSelected = _arrListAllObjEditor[k];
                    bestdis = ret[1];
                }
            }
            if( _currentObjSelected == undefined){ // cela signifie que l'ont a clqiué sur aucun objet
                //on le passe à true pour le voir surement si jammais il est caché
                _selectorMouse.setVisible(true);
                    _currentObjSelected = undefined;

                //on repositionne le selectorMouse ) la position souris du clic
                _selectorMouse.setPos(mouseXClic-10,mouseYClic-10); // -10 pour le centrage l'origine et en haut à gauche 
            }

            

        }

        // 3 - on active l'animation
        //gere l'animation du curseur
        var selectorAlpha = _selectorMouse.getAlpha();
        if( this.animAlphaSens == 1)    selectorAlpha += this.animAlphaIncr;
        else                            selectorAlpha -= this.animAlphaIncr;
        if( selectorAlpha > 0.8)          {this.animAlphaSens = 0; selectorAlpha = 0.8}
        if( selectorAlpha < 0.2)          {this.animAlphaSens = 1; selectorAlpha = 0.2}
        _selectorMouse.setAlpha(selectorAlpha); 
        if( _dragAndDroEnable == true)  _selectorMouse.setVisible(false);
        //else                            _selectorMouse.setVisible(true);


        // 4 - on gere l'affichage ou pas de certains elèments
        //ici pour afficher ou pas les élemnet interactif
        if( _etatAide == 0 ){
            _textOrigine.setVisible(false);
            _mireLigneX.setVisible(false);
            _textMireLigneX.setVisible(false);
            _mireLigneY.setVisible(false);
            _textMireLigneY.setVisible(false);
        }
        else{
            _textOrigine.setVisible(true);
            _mireLigneX.setVisible(true);
            _textMireLigneX.setVisible(true);
            _mireLigneY.setVisible(true);
            _textMireLigneY.setVisible(true);
        }
        //ici pour MAJ a chaque frame la taille original de l'image 
        //si elle est selectionné
        if( _currentObjSelected != undefined && _currentObjSelected.type == "image"){ 
            //on a bien qqch de selectionné et c'est bien une image
            var imageOriginalWidth = _currentObjSelected.getImageWidth();
            var imageOriginalHeight = _currentObjSelected.getImageHeight();
            document.getElementById("imageSize").value = "taille = "+imageOriginalWidth+"/"+imageOriginalHeight;
        }
    }
}