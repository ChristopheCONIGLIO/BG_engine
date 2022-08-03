        // --------------------------------------------------- //
        // --------------------------------------------------- //
        class scriptCircleGame extends BG_script{
            constructor(bg) {
                super(bg);// bg accès by this variable -> this.p_bg
                this.inc = 0;
                this.enablemouseDonwDetector = 0;
            }
            enterFrame(){
                if( this.inc < 30){
                    this.inc++;
                    var circle = new circleBall(this.p_bg,true,8,Math.random()*1000,-300,30+Math.random()*30,"#FF0000",this);
                    //circle.setPhysicEnable();
                }


                if( this.p_bg.bg_g_stat.getMouseDown() == 0 )    this.enablemouseDonwDetector = 1;
                if( _dragAndDroEnable == false && this.p_bg.bg_g_stat.getMouseDown() == 1 && this.enablemouseDonwDetector == 1){ 
                    this.enablemouseDonwDetector = 0;
                    // detect le mouseDown surtout ne pas tester si 
                    // _dragAndDroEnable == true car sa veut dire qu'il est deja activé

                    //on check si le mousedown est sur une zone clicaquable d'obj déja créé
                    var obj = undefined;
                    var bestLayer = 0;
                    for(var k = _arrListAllObjEditor.length-1 ; k >= 0 ; k--){ //on parcourt tous les obj
                        // on suposse que tous les objet on bien la fonction determineIfClicOfMe
                        // si ce n'est pas le cas il faut surcharger l'objet et l'ajouter
                        
                        var ret = _arrListAllObjEditor[k].determineIfClicOfMe(this.p_bg.bg_g_stat.getMouseXBoard(),this.p_bg.bg_g_stat.getMouseYBoard());
                        if( ret[0] == true && _arrListAllObjEditor[k].getLayer() > bestLayer  ){
                            obj = _arrListAllObjEditor[k];
                            bestLayer = _arrListAllObjEditor[k].getLayer();
                            this.p_bg.bg_g_stat.setManualControl(false); //permet de bloquer le controle de la camera pour faire le drag and drop sans bouger le plateau
                        }
                    }
                    
                    if( obj != undefined){ //la ca devient compliqué
                        obj.initDragandDrop(); // init le drag and drop notameent pour récuprer la pos de la soruis par rapport à l'objet
                        _currentObjSelected = obj;  // choix purement personnel , ici la classe obj concercé saura quelle est choisit
                        _dragAndDroEnable = true;   // variable globale utilisé pour informer tout le monde ! 
                    }
                    

                }
                if( this.p_bg.bg_g_stat.getMouseDown() == 0){ //fin du drag and drop ou de rien !
                    _dragAndDroEnable = false;
                    this.p_bg.bg_g_stat.setManualControl(true); // reactive le controle de la camera
                }



            }
        }
        // --------------------------------------------------- //
        // --------------------------------------------------- //