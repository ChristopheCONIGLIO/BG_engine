//
//
//
class BG_lineEditor extends BG_line{

    constructor(bg,onBoard,layer,p1X,p1Y,p2X,p2Y,thickness,color) {
        super(bg,onBoard,layer,p1X,p1Y,p2X,p2Y,thickness,color);
        this.type = "line";
       
        this.diffP1 = [0,0];
        this.diffP2 = [0,0];

        this.mireSize = 15;
        this.mire1 = new BG_circle(this.getRefEngine(),true,106,-1000,-1000,this.mireSize,"#33FFFF");
        this.mire1.setFixedSize(true);
        this.mire1.setAlpha(0.4);
        this.mire2 = new BG_circle(this.getRefEngine(),true,106,-1000,-1000,this.mireSize,"#33FFFF");
        this.mire2.setFixedSize(true);
        this.mire2.setAlpha(0.4);
        this.mireSelected = 0;
        
    }
    destructor(){
        super.destructor();
        this.getRefEngine().deleteObject(this.mire);
    }
    enterFrame(){

        this.mire1.setPosX(this.getPoint1()[0]);
        this.mire1.setPosY(this.getPoint1()[1]);
        this.mire2.setPosX(this.getPoint2()[0]);
        this.mire2.setPosY(this.getPoint2()[1]);
        if( _etatAide == 0 )   {
            this.mire1.setVisible(false);
            this.mire2.setVisible(false);
        } 
        else    {
            this.mire1.setVisible(true);
            this.mire2.setVisible(true);
        }

       if( _dragAndDroEnable == true && _currentObjSelected==this){
            
        
            
        
            if( this.mireSelected ==  1){
                this.setPoint(
                    this.getRefEngine().bg_g_stat.getMouseXBoard() + this.diffP1[0],
                    this.getRefEngine().bg_g_stat.getMouseYBoard() + this.diffP1[1],
                    this.getPoint2()[0],
                    this.getPoint2()[1],
                );
            }
            else if(this.mireSelected == 2){
                this.setPoint(
                    this.getPoint1()[0],
                    this.getPoint1()[1],
                    this.getRefEngine().bg_g_stat.getMouseXBoard() + this.diffP1[0],
                    this.getRefEngine().bg_g_stat.getMouseYBoard() + this.diffP1[1]
                );
            }
            else{
                //on colle la souris avec l'element graphique mais avec de décalage d'initialisation
                //sinon l'aobjet serait téléporter à la soruis
                this.setPoint(
                    this.getRefEngine().bg_g_stat.getMouseXBoard() + this.diffP1[0],
                    this.getRefEngine().bg_g_stat.getMouseYBoard() + this.diffP1[1],
                    this.getRefEngine().bg_g_stat.getMouseXBoard() + this.diffP2[0],
                    this.getRefEngine().bg_g_stat.getMouseYBoard() + this.diffP2[1],
                );
            }
        
        
        
        
            

        }

    }
    //permet de calculer de facon autonome suivant caractérisqtique de this.mire si on a cliqué dessus
    determineIfClicOfMe(mouseX,mouseY){
        var mouseOver = this.getMouseOver();

        var dis = this.distance(mouseX,mouseY,this.mire1.getPosX(),this.mire1.getPosY());
        if( dis < (this.mireSize/2)/this.getRefEngine().bg_g_stat.getCameraPositionZoom()){
            return [true,dis];
        }
        dis = this.distance(mouseX,mouseY,this.mire2.getPosX(),this.mire2.getPosY());
        if( dis < (this.mireSize/2)/this.getRefEngine().bg_g_stat.getCameraPositionZoom()){
            return [true,dis];
        }

        if( mouseOver == false) return [false,-1];
        /*var centerX = this.getPosX() + this.getDimX()/2;
        var centerY = this.getPosY() + this.getDimY()/2;
        var dis = this.distance(mouseX,mouseY,centerX,centerY);*/
        return [true,0];
    }
    distance($c1Px,$c1Py,$c2Px,$c2Py){
        return Math.sqrt( (($c1Px-$c2Px)*($c1Px-$c2Px))+(($c1Py-$c2Py)*($c1Py-$c2Py)) )   ;
    }
    //permet de définir la distance entre la souris et la mire pour garder ce décalage pendent le dragAndDrop
    initDragandDrop(){
        var mouseX = this.getRefEngine().bg_g_stat.getMouseXBoard();
        var mouseY = this.getRefEngine().bg_g_stat.getMouseYBoard();
        this.mireSelected = 0;
        var dis = this.distance(mouseX,mouseY,this.mire1.getPosX(),this.mire1.getPosY());
        if( dis < (this.mireSize/2)/this.getRefEngine().bg_g_stat.getCameraPositionZoom()){
            this.mireSelected = 1;
            this.diffP1[0] = this.getPoint1()[0]-this.getRefEngine().bg_g_stat.getMouseXBoard();
            this.diffP1[1] = this.getPoint1()[1]-this.getRefEngine().bg_g_stat.getMouseYBoard();
            return;
        }
        dis = this.distance(mouseX,mouseY,this.mire2.getPosX(),this.mire2.getPosY());
        if( dis < (this.mireSize/2)/this.getRefEngine().bg_g_stat.getCameraPositionZoom()){
            this.mireSelected = 2;
            this.diffP1[0] = this.getPoint2()[0]-this.getRefEngine().bg_g_stat.getMouseXBoard();
            this.diffP1[1] = this.getPoint2()[1]-this.getRefEngine().bg_g_stat.getMouseYBoard();
            return;
        }
        this.diffP1[0] = this.getPoint1()[0]-this.getRefEngine().bg_g_stat.getMouseXBoard();
        this.diffP1[1] = this.getPoint1()[1]-this.getRefEngine().bg_g_stat.getMouseYBoard();
        this.diffP2[0] = this.getPoint2()[0]-this.getRefEngine().bg_g_stat.getMouseXBoard();
        this.diffP2[1] = this.getPoint2()[1]-this.getRefEngine().bg_g_stat.getMouseYBoard();
       
    }
}
//
//
//