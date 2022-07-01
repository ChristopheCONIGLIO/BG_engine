


//
//
// Iici on déclare les functions des boutons
//
//
function ajoutRectangle(){
    //on commence par cacher le selector
    _selectorMouse.setVisible(false); //les obj BG_engine sont accesible aussi en dehord des scripts BG_engine
    // on créé un rectangle pour le BG_engine
    var randomRectangle = new BG_rectEditor(_bg_engine1,true,10,_mouseXclic-50,_mouseYclic-50,100,100,"#3333FF");//le 1 c'est la couche d'afficahge
    _currentObjSelected = randomRectangle; //on possition le dernier obj en obje selectiionner
    _arrListAllObjEditor.push(randomRectangle);
}
function ajoutImage(){
    //on commence par cacher le selector
    _selectorMouse.setVisible(false); //les obj BG_engine sont accesible aussi en dehord des scripts BG_engine
    // on créé un rectangle pour le BG_engine
    var randomImage = new BG_imageEditor(_bg_engine1,true,10,_mouseXclic-50,_mouseYclic-50,100,100,"../../SRC-BG-ENGINE/NOT_ESSENTIAL/IMAGE/openImage.jpeg");//le 1 c'est la couche d'afficahge
    _currentObjSelected = randomImage; //on possition le dernier obj en obje selectiionner
    _arrListAllObjEditor.push(randomImage);
}
function supprimerObj(){
    if( _currentObjSelected != undefined){ //on check qu'il y a bien un obj selectionné
        //on commence par cacher le selector
        _selectorMouse.setVisible(false); //les obj BG_engine sont accesible aussi en dehord des scripts BG_engine
        //c'est très simple de supprimer un obj dans le bg-engine
        _bg_engine1.deleteObject(_currentObjSelected);

        //il ne faut pas oublier d'enlever l'obj du tableau que l'ont utulise pour lister tous les obj
        // c'est plus dificle !
        var index = -1;
        for(var j = 0 ; j < this._arrListAllObjEditor.length ; j++){
            if( this._arrListAllObjEditor[j] == _currentObjSelected ){
                    index = j;
            }
        }
        if( index != -1 ){
            this._arrListAllObjEditor.splice(index, 1);
        }

    }
}

function moveObjRotation(incr){
    if( _currentObjSelected != undefined){ //on check qu'il y a bien un obj selectionné
        var rot = _currentObjSelected.getRotation();
        rot+=incr;
        if( rot > 360 ) rot -=360; //une rotation ne peut pas exécer 360
        if( rot < 0 ) rot +=360;  //une rotation ne peut etre plus petit que 0
        _currentObjSelected.setRotation(rot);
    }
}
function moveObjPosition(incrX,incrY){
    if( _currentObjSelected != undefined){ //on check qu'il y a bien un obj selectionné
        var posX = _currentObjSelected.getPosX();
        posX+=incrX;
        _currentObjSelected.setPosX(posX);
        var posY = _currentObjSelected.getPosY();
        posY+=incrY;
        _currentObjSelected.setPosY(posY);
    }
}

function moveObjAlpha(incr){
    if( _currentObjSelected != undefined){ //on check qu'il y a bien un obj selectionné
        var alpha = _currentObjSelected.getAlpha();
        alpha+=incr;
        if( alpha > 1 ) rot = 1; //limite de la transparence
        if( alpha < 0 ) rot = 0; //limite de la transparence
        _currentObjSelected.setAlpha(alpha);
    }
}

function moveObjDim(incrX,incrY){
    if( _currentObjSelected != undefined){ //on check qu'il y a bien un obj selectionné
        var posX = _currentObjSelected.getDimX();
        posX+=incrX;
        _currentObjSelected.setDimX(posX);
        var posY = _currentObjSelected.getDimY();
        posY+=incrY;
        _currentObjSelected.setDimY(posY);
    }
}

function getColor(){
    if( _currentObjSelected != undefined){ //on check qu'il y a bien un obj selectionné
        var color = _currentObjSelected.getColor();
        document.getElementById("bkg").value = color;
    }
}
function setColor(){
    if( _currentObjSelected != undefined){ //on check qu'il y a bien un obj selectionné
        var color = document.getElementById("bkg").value;
        _currentObjSelected.setColor(color);
    }
}

function getLayer(){
    if( _currentObjSelected != undefined){ //on check qu'il y a bien un obj selectionné
        var layer = _currentObjSelected.getLayer();
        document.getElementById("layer").value = layer;
    }
}
function setLayer(){
    if( _currentObjSelected != undefined){ //on check qu'il y a bien un obj selectionné
        var layer = document.getElementById("layer").value;
        _currentObjSelected.setLayer(layer);
    }
}
        
function visuHelp(){
    if( _etatAide == 1) _etatAide = 0;
    else                _etatAide = 1;
}


// la partie charger image en HTML est un peu complexe !!!!

function chargerImage(){
    if( _currentObjSelected != undefined){ //on check qu'il y a bien un obj selectionné
        var layer = document.getElementById("imageurl").value;
        _currentObjSelected.setImageURL(layer);
    }
}




































