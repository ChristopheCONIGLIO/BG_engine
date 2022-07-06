//
//
//
class BG_imageEditor extends BG_drawImage{
               
    constructor(bg,onBoard,layer,pX,pY,sX,sY,urlImage) {
        super(bg,onBoard,layer,pX,pY,sX,sY,urlImage);
        this.type = "image";
        this.mireSize = 30;
        this.mire = new BG_circle(this.getRefEngine(),true,106,this.getPosX(),this.getPosY(),this.mireSize,"#33FFFF");
        this.mire.setFixedSize(true);
        this.dragAndDrop_decMouseX = 0;
        this.dragAndDrop_decMouseY = 0;
    }
    destructor(){
        super.destructor();
        this.getRefEngine().deleteObject(this.mire);
    }
    enterFrame(){
        // fait en sorte de centrer à chaque frame la mire de l'objet
        this.mire.setPosX(this.getPosX() );
        this.mire.setPosY(this.getPosY() );
        
        if( _currentObjSelected == this)    this.mire.setAlpha(1);
        else                                this.mire.setAlpha(0.5);
        if( _etatAide == 0 )    this.mire.setVisible(false);
        else                    this.mire.setVisible(true);

        // cas ou on drag and drop
        if( _dragAndDroEnable == true && _currentObjSelected==this){
            //on colle la souris avec l'element graphique mais avec de décalage d'initialisation
            //sinon l'aobjet serait téléporter à la soruis
            this.setPosX(this.getRefEngine().bg_g_stat.getMouseXBoard() + this.dragAndDrop_decMouseX);
            this.setPosY(this.getRefEngine().bg_g_stat.getMouseYBoard() + this.dragAndDrop_decMouseY);
        }

    }
    //permet de calculer de facon autonome suivant caractérisqtique de this.mire si on a cliqué dessus
    determineIfClicOfMe(mouseX,mouseY){
        var dis = this.distance(mouseX,mouseY,this.mire.getPosX(),this.mire.getPosY());
        if( dis < (this.mireSize/2)/this.getRefEngine().bg_g_stat.getCameraPositionZoom()){
            return [true,dis];
        }
        return [false,dis];
    }
    distance($c1Px,$c1Py,$c2Px,$c2Py){
        return Math.sqrt( (($c1Px-$c2Px)*($c1Px-$c2Px))+(($c1Py-$c2Py)*($c1Py-$c2Py)) )   ;
    }
    //permet de définir la distance entre la souris et la mire pour garder ce décalage pendent le dragAndDrop
    initDragandDrop(){
        this.dragAndDrop_decMouseX = this.getPosX()-this.getRefEngine().bg_g_stat.getMouseXBoard();
        this.dragAndDrop_decMouseY = this.getPosY()-this.getRefEngine().bg_g_stat.getMouseYBoard();
    }
}
//
//
//