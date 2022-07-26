//
//
//
class BG_textEditor extends BG_text{
               
    constructor(bg,onBoard,layer,pX,pY,size,color) {
        super(bg,onBoard,layer,pX,pY,size,color);
              
        this.text = "mon texte";
        this.type = "texte";
        this.dragAndDrop_decMouseX = 0;
        this.dragAndDrop_decMouseY = 0;

        this.line1 = new BG_line(this.getRefEngine(),false,106,-1000,-1000,-1000,-1000,4,"#33FFFF");
        this.line2 = new BG_line(this.getRefEngine(),false,106,-1000,-1000,-1000,-1000,4,"#33FFFF");
        this.line3 = new BG_line(this.getRefEngine(),false,106,-1000,-1000,-1000,-1000,4,"#33FFFF");
        this.line4 = new BG_line(this.getRefEngine(),false,106,-1000,-1000,-1000,-1000,4,"#33FFFF");
        this.line1.setAlpha(0.4);
        this.line2.setAlpha(0.4);
        this.line3.setAlpha(0.4);
        this.line4.setAlpha(0.4);



    }
    destructor(){
        this.getRefEngine().deleteObject(this.line1);
        this.getRefEngine().deleteObject(this.line2);
        this.getRefEngine().deleteObject(this.line3);
        this.getRefEngine().deleteObject(this.line4);
        super.destructor();
    }
    enterFrame(){
       
       
       if(_currentObjSelected==this && _etatAide == 1 ){
        this.line1.setVisible(true);
        this.line2.setVisible(true);
        this.line3.setVisible(true);
        this.line4.setVisible(true);

        var arr = this.getInfoPoints();
        this.line1.setPoint(arr[0][0],arr[0][1],arr[1][0],arr[1][1]);
        this.line2.setPoint(arr[1][0],arr[1][1],arr[2][0],arr[2][1]);
        this.line3.setPoint(arr[2][0],arr[2][1],arr[3][0],arr[3][1]);
        this.line4.setPoint(arr[3][0],arr[3][1],arr[0][0],arr[0][1]);
       }
       else{
        this.line1.setVisible(false);
        this.line2.setVisible(false);
        this.line3.setVisible(false);
        this.line4.setVisible(false);
       }
       
       
       
       
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
        var centerX = this.getPosX() + this.getWidthText()/2;
        var centerY = this.getPosY() + this.getDim()/2;
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