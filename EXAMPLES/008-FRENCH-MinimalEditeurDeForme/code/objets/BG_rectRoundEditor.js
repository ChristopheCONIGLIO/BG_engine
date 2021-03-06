//
//
//
class BG_rectRoundEditor extends BG_roundRect{
    constructor(bg,onBoard,layer,pX,pY,sX,sY,round,color) {
        super(bg,onBoard,layer,pX,pY,sX,sY,round,color);
        this.type = "rectangleArrondis";
        this.dragAndDrop_decMouseX = 0;
        this.dragAndDrop_decMouseY = 0;
    }
    destructor(){
        super.destructor();
        this.getRefEngine().deleteObject(this.mire);
    }
    enterFrame(){
       if( _dragAndDroEnable == true && _currentObjSelected==this){
            //on colle la souris avec l'element graphique mais avec de décalage d'initialisation
            //sinon l'aobjet serait téléporter à la soruis
            if( this.getOnBoard() == false){
                this.setPosX(this.getRefEngine().bg_g_stat.getMouseXScreen() + this.dragAndDrop_decMouseX);
                this.setPosY(this.getRefEngine().bg_g_stat.getMouseYScreen() + this.dragAndDrop_decMouseY);
            }
            else{
                this.setPosX(this.getRefEngine().bg_g_stat.getMouseXBoard() + this.dragAndDrop_decMouseX);
                this.setPosY(this.getRefEngine().bg_g_stat.getMouseYBoard() + this.dragAndDrop_decMouseY);
            }
            
        }

    }
    //permet de calculer de facon autonome suivant caractérisqtique de this.mire si on a cliqué dessus
    determineIfClicOfMe(mouseX,mouseY){
        var mouseOver = this.getMouseOver();
        if( mouseOver == false) return [false,-1];
        var centerX = this.getPosX() + this.getDimX()/2;
        var centerY = this.getPosY() + this.getDimY()/2;
        var dis = this.distance(mouseX,mouseY,centerX,centerY);
        return [true,dis];
    }
    distance($c1Px,$c1Py,$c2Px,$c2Py){
        return Math.sqrt( (($c1Px-$c2Px)*($c1Px-$c2Px))+(($c1Py-$c2Py)*($c1Py-$c2Py)) )   ;
    }
    //permet de définir la distance entre la souris et la mire pour garder ce décalage pendent le dragAndDrop
    initDragandDrop(){
        if( this.getOnBoard() == false){
            this.dragAndDrop_decMouseX = this.getPosX()-this.getRefEngine().bg_g_stat.getMouseXScreen();
            this.dragAndDrop_decMouseY = this.getPosY()-this.getRefEngine().bg_g_stat.getMouseYScreen();
        }
        else{
            this.dragAndDrop_decMouseX = this.getPosX()-this.getRefEngine().bg_g_stat.getMouseXBoard();
            this.dragAndDrop_decMouseY = this.getPosY()-this.getRefEngine().bg_g_stat.getMouseYBoard();
        }
        
    }
}
//
//
//