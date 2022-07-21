//
//
//
class BG_lineEditor extends BG_line{

    constructor(bg,onBoard,layer,p1X,p1Y,p2X,p2Y,thickness,color) {
        super(bg,onBoard,layer,p1X,p1Y,p2X,p2Y,thickness,color);
        this.type = "line";
       
        this.diffP1 = [0,0];
        this.diffP2 = [0,0];

        this.mireSize = 22;
        this.mire1 = new BG_circle(this.getRefEngine(),false,106,-1000,-1000,this.mireSize,"#33FFFF");
        //this.mire1.setFixedSize(true);
        this.mire1.setAlpha(0.4);
        this.mire2 = new BG_circle(this.getRefEngine(),false,106,-1000,-1000,this.mireSize,"#33FFFF");
        //this.mire2.setFixedSize(true);
        this.mire2.setAlpha(0.4);
        this.mireSelected = 0;
        
    }
    destructor(){
        this.getRefEngine().deleteObject(this.mire1);
        this.getRefEngine().deleteObject(this.mire2);
        super.destructor();
        this.getRefEngine().deleteObject(this.mire);
    }
    enterFrame(){

        var arrPts = this.getInfo2Points();
        this.mire1.setPosX(arrPts[0][0]-this.mireSize/2);
        this.mire1.setPosY(arrPts[0][1]-this.mireSize/2);
        this.mire2.setPosX(arrPts[1][0]-this.mireSize/2);
        this.mire2.setPosY(arrPts[1][1]-this.mireSize/2);
        
        
        if( _etatAide == 0 ||  _currentObjSelected != this )   {
            this.mire1.setVisible(false);
            this.mire2.setVisible(false);
        } 
        else    {
            this.mire1.setVisible(true);
            this.mire2.setVisible(true);
        }


        //
        if( this.getFixedSize() == true && Math.abs(1-this.getRefEngine().zoomLevel) > 0.01){
            this.mire1.setColor("#FF6644");
            this.mire2.setColor("#FF6644");
        }
        else{
            this.mire1.setColor("#33FFFF");
            this.mire2.setColor("#33FFFF");
        }


       if( _dragAndDroEnable == true && _currentObjSelected==this){
            
        
            
        

        if( this.mireSelected ==  1){
            
            if( this.getOnBoard() == false){
                this.setPoint(
                    this.getRefEngine().bg_g_stat.getMouseXScreen() + this.diffP1[0],
                    this.getRefEngine().bg_g_stat.getMouseYScreen() + this.diffP1[1],
                    this.getPoint2()[0],
                    this.getPoint2()[1],
                );
            }
            else if( this.getFixedSize() == true){
                let ressort = 0.65;
                let ressortInv = 1-ressort;
                this.getRefEngine().zoomLevel = this.getRefEngine().zoomLevel*ressort+1*ressortInv;
                if( Math.abs(1-this.getRefEngine().zoomLevel) > 0.01){
                    this.getRefEngine().decX = this.getRefEngine().decX*ressort + ressortInv*(this.getRefEngine().bg_g_stat.getMouseXScreen()-this.getPoint1()[0]);
                    this.getRefEngine().decY = this.getRefEngine().decY*ressort + ressortInv*(this.getRefEngine().bg_g_stat.getMouseYScreen()-this.getPoint1()[1]); 
                }
                else{
                    this.setPoint(
                        this.getRefEngine().bg_g_stat.getMouseXScreen() - this.getRefEngine().decX,
                        this.getRefEngine().bg_g_stat.getMouseYScreen() - this.getRefEngine().decY,
                        this.getPoint2()[0],
                        this.getPoint2()[1],
                    );
                }
                
            }
            else{
                this.setPoint(
                    this.getRefEngine().bg_g_stat.getMouseXBoard() + this.diffP1[0],
                    this.getRefEngine().bg_g_stat.getMouseYBoard() + this.diffP1[1],
                    this.getPoint2()[0],
                    this.getPoint2()[1],
                );
            }
            
        }
        else if( this.mireSelected ==  2){
            
            if( this.getOnBoard() == false){
                this.setPoint(
                    this.getPoint1()[0],
                    this.getPoint1()[1],
                    this.getRefEngine().bg_g_stat.getMouseXScreen() + this.diffP1[0],
                    this.getRefEngine().bg_g_stat.getMouseYScreen() + this.diffP1[1]
                );
            }
            else if( this.getFixedSize() == true){
                let ressort = 0.65;
                let ressortInv = 1-ressort;
                this.getRefEngine().zoomLevel = this.getRefEngine().zoomLevel*ressort+1*ressortInv;
                if( Math.abs(1-this.getRefEngine().zoomLevel) > 0.01){
                    this.getRefEngine().decX = this.getRefEngine().decX*ressort + ressortInv*(this.getRefEngine().bg_g_stat.getMouseXScreen()-this.getPoint2()[0]);
                    this.getRefEngine().decY = this.getRefEngine().decY*ressort + ressortInv*(this.getRefEngine().bg_g_stat.getMouseYScreen()-this.getPoint2()[1]); 
                }
                else{
                    this.setPoint(
                        this.getPoint1()[0],
                        this.getPoint1()[1],
                        this.getRefEngine().bg_g_stat.getMouseXScreen() - this.getRefEngine().decX,
                        this.getRefEngine().bg_g_stat.getMouseYScreen() - this.getRefEngine().decY
                    );
                }
                
            }
            else{
                this.setPoint(
                    this.getPoint1()[0],
                    this.getPoint1()[1],
                    this.getRefEngine().bg_g_stat.getMouseXBoard() + this.diffP1[0],
                    this.getRefEngine().bg_g_stat.getMouseYBoard() + this.diffP1[1]
                );
            }
            
        }
        else{
                if( this.getOnBoard() == false){
                //on colle la souris avec l'element graphique mais avec de décalage d'initialisation
                    //sinon l'aobjet serait téléporter à la soruis
                    this.setPoint(
                        this.getRefEngine().bg_g_stat.getMouseXScreen() + this.diffP1[0],
                        this.getRefEngine().bg_g_stat.getMouseYScreen() + this.diffP1[1],
                        this.getRefEngine().bg_g_stat.getMouseXScreen() + this.diffP2[0],
                        this.getRefEngine().bg_g_stat.getMouseYScreen() + this.diffP2[1],
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

    }
    //permet de calculer de facon autonome suivant caractérisqtique de this.mire si on a cliqué dessus
    determineIfClicOfMe(mouseX,mouseY){
        var mouseOver = this.getMouseOver();

        if( _currentObjSelected == this ){
            var arrPts = this.getInfo2Points();
            var mouseXscreen = this.getRefEngine().bg_g_stat.getMouseXScreen();
            var mouseYscreen = this.getRefEngine().bg_g_stat.getMouseYScreen();
            var dis = this.distance(mouseXscreen,mouseYscreen,arrPts[0][0],arrPts[0][1]);
            if( dis < this.mireSize/2){
                return [true,dis];
            }
            dis = this.distance(mouseXscreen,mouseYscreen,arrPts[1][0],arrPts[1][1]);
            if( dis < this.mireSize/2){
                return [true,dis];
            }
        }
        
        if( mouseOver == false) return [false,-1];
        return [true,0];
    }
    distance($c1Px,$c1Py,$c2Px,$c2Py){
        return Math.sqrt( (($c1Px-$c2Px)*($c1Px-$c2Px))+(($c1Py-$c2Py)*($c1Py-$c2Py)) )   ;
    }
    //permet de définir la distance entre la souris et la mire pour garder ce décalage pendent le dragAndDrop
    initDragandDrop(){
        
        this.mireSelected = 0;
        if( _currentObjSelected == this ){
            var arrPts = this.getInfo2Points();
            var mouseXscreen = this.getRefEngine().bg_g_stat.getMouseXScreen();
            var mouseYscreen = this.getRefEngine().bg_g_stat.getMouseYScreen();
            var dis = this.distance(mouseXscreen,mouseYscreen,arrPts[0][0],arrPts[0][1]);
            if( dis < this.mireSize/2){
                this.mireSelected = 1;
                this.diffP1[0] = (arrPts[0][0]-mouseXscreen)/this.getRefEngine().bg_g_stat.getCameraPositionZoom();
                this.diffP1[1] = (arrPts[0][1]-mouseYscreen)/this.getRefEngine().bg_g_stat.getCameraPositionZoom();
                return;
            }
            dis = this.distance(mouseXscreen,mouseYscreen,arrPts[1][0],arrPts[1][1]);
            if( dis < this.mireSize/2){
                this.mireSelected = 2;
                this.diffP1[0] = (arrPts[1][0]-mouseXscreen)/this.getRefEngine().bg_g_stat.getCameraPositionZoom();
                this.diffP1[1] = (arrPts[1][1]-mouseYscreen)/this.getRefEngine().bg_g_stat.getCameraPositionZoom();
                return;
            }
        }

        if( this.getOnBoard() == false){
            this.diffP1[0] = this.getPoint1()[0]-this.getRefEngine().bg_g_stat.getMouseXScreen();
            this.diffP1[1] = this.getPoint1()[1]-this.getRefEngine().bg_g_stat.getMouseYScreen();
            this.diffP2[0] = this.getPoint2()[0]-this.getRefEngine().bg_g_stat.getMouseXScreen();
            this.diffP2[1] = this.getPoint2()[1]-this.getRefEngine().bg_g_stat.getMouseYScreen();
        }
        else{
            this.diffP1[0] = this.getPoint1()[0]-this.getRefEngine().bg_g_stat.getMouseXBoard();
            this.diffP1[1] = this.getPoint1()[1]-this.getRefEngine().bg_g_stat.getMouseYBoard();
            this.diffP2[0] = this.getPoint2()[0]-this.getRefEngine().bg_g_stat.getMouseXBoard();
            this.diffP2[1] = this.getPoint2()[1]-this.getRefEngine().bg_g_stat.getMouseYBoard();
        }
    }
}
//
//
//