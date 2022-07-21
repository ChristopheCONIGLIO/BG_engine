//
//
//
class BG_polygoneEditor extends BG_polygone{

    constructor(bg,onBoard,fixed,layer,arrayPoint,color) {
        super(bg,onBoard,fixed,layer,arrayPoint,color);
        this.type = "polygone";
       
        //diff in array
        
        this.diffP = new Array(this.getArrayPoint().length); // seems arrayPoint.lenght is very bad !


        //mire in array
        this.mireSize = 22;//15
        this.arrMire = new Array();
        for(var k = 0 ; k <  this.diffP.length ; k++){
            var mire = new BG_circle(this.getRefEngine(),false,106,-1000,-1000,this.mireSize,"#33FFFF");
            mire.setAlpha(0.4);
            this.arrMire.push(mire);
        }
        this.mireSelected = -1;
        
    }
    destructor(){
        for(var k = 0 ; k <  this.arrMire.length ; k++){
            this.getRefEngine().deleteObject(this.arrMire[k]);
        }
        super.destructor();
        this.getRefEngine().deleteObject(this.mire);
    }

    //
    //interface
    //

    addPoint(){
        var arrPts = this.getArrayPoint();
        //position nouveau pts
        let newX = (arrPts[0][0]+arrPts[arrPts.length-1][0])/2;
        let newY = (arrPts[0][1]+arrPts[arrPts.length-1][1])/2;
        //ajout d'une mire
        arrPts.push([newX,newY]);        
        var mire = new BG_circle(this.getRefEngine(),false,106,-1000,-1000,this.mireSize,"#33FFFF");
        mire.setAlpha(0.4);
        this.arrMire.push(mire);
        // ajout d'un diffP
        this.diffP.push([0,0])
        //fin
        this.setArrayPoint(arrPts);

    }
    deletePoint(){
        if( this.getArrayPoint().length >= 4){
            var arrPts = this.getArrayPoint();
            arrPts.splice(arrPts.length-1, 1);
            this.getRefEngine().deleteObject(this.arrMire[this.arrMire.length-1]);
            this.arrMire.splice(this.arrMire.length-1, 1);
            this.diffP.splice(this.diffP.length-1, 1);
            this.setArrayPoint(arrPts);
        }
    }

    enterFrame(){

        
        var arrPts = this.getInfoPoints();
        for(var k = 0 ; k <  this.arrMire.length ; k++){
            this.arrMire[k].setPosX(arrPts[k][0]-this.mireSize/2);
            this.arrMire[k].setPosY(arrPts[k][1]-this.mireSize/2);
            if( _etatAide == 0 || _currentObjSelected != this )   {
                this.arrMire[k].setVisible(false);
            } 
            else    {
                this.arrMire[k].setVisible(true);
            }
        }


        //
        if( this.getFixedSize() == true && Math.abs(1-this.getRefEngine().zoomLevel) > 0.01){
            for(var k = 0 ; k <  this.arrMire.length ; k++){
                this.arrMire[k].setColor("#FF6644");
            }
        }
        else{
            for(var k = 0 ; k <  this.arrMire.length ; k++){
                this.arrMire[k].setColor("#33FFFF");
            }
        }


       
       if( _dragAndDroEnable == true && _currentObjSelected==this){
            
            if( this.mireSelected !=  -1){
                var arrPts = this.getArrayPoint();
                
                if( this.getOnBoard() == false){
                    arrPts[this.mireSelected][0] = this.getRefEngine().bg_g_stat.getMouseXScreen() + this.diffP[0][0];
                    arrPts[this.mireSelected][1] = this.getRefEngine().bg_g_stat.getMouseYScreen() + this.diffP[0][1];
                }
                else if( this.getFixedSize() == true){
                    let ressort = 0.65;
                    let ressortInv = 1-ressort;
                    this.getRefEngine().zoomLevel = this.getRefEngine().zoomLevel*ressort+1*ressortInv;
                    if( Math.abs(1-this.getRefEngine().zoomLevel) > 0.01){
                        this.getRefEngine().decX = this.getRefEngine().decX*ressort + ressortInv*(this.getRefEngine().bg_g_stat.getMouseXScreen()-arrPts[this.mireSelected][0]);
                        this.getRefEngine().decY = this.getRefEngine().decY*ressort + ressortInv*(this.getRefEngine().bg_g_stat.getMouseYScreen()-arrPts[this.mireSelected][1]); 
                    }
                    else{
                        arrPts[this.mireSelected][0] = this.getRefEngine().bg_g_stat.getMouseXScreen() - this.getRefEngine().decX;
                        arrPts[this.mireSelected][1] = this.getRefEngine().bg_g_stat.getMouseYScreen() - this.getRefEngine().decY;
                    }
                    
                }
                else{
                    arrPts[this.mireSelected][0] = this.getRefEngine().bg_g_stat.getMouseXBoard() + this.diffP[0][0];
                    arrPts[this.mireSelected][1] = this.getRefEngine().bg_g_stat.getMouseYBoard() + this.diffP[0][1];
                }
                this.setArrayPoint(arrPts);
            }
           
            else{
                
                if( this.getOnBoard() == false){
                    //
                    // cas on drag and drop la forme entiere
                    //
                    var newArray = new Array(this.diffP.length);
                    for(var k = 0 ; k <  this.diffP.length ; k++){
                        var posX = this.diffP[k][0] + this.getRefEngine().bg_g_stat.getMouseXScreen();
                        var posY = this.diffP[k][1] + this.getRefEngine().bg_g_stat.getMouseYScreen();
                        newArray[k] = [posX,posY];
                    }
                    this.setArrayPoint(newArray);
                }
                else{
                    //
                    // cas on drag and drop la forme entiere
                    //
                    var newArray = new Array(this.diffP.length);
                    for(var k = 0 ; k <  this.diffP.length ; k++){
                        var posX = this.diffP[k][0] + this.getRefEngine().bg_g_stat.getMouseXBoard();
                        var posY = this.diffP[k][1] + this.getRefEngine().bg_g_stat.getMouseYBoard();
                        newArray[k] = [posX,posY];
                    }
                    this.setArrayPoint(newArray);
                }
                
            }        

        }

    }
    //permet de calculer de facon autonome suivant caractérisqtique de this.mire si on a cliqué dessus
    determineIfClicOfMe(mouseX,mouseY){
        var mouseOver = this.getMouseOver();

        if( _currentObjSelected == this ){
            var mouseXscreen = this.getRefEngine().bg_g_stat.getMouseXScreen();
            var mouseYscreen = this.getRefEngine().bg_g_stat.getMouseYScreen();
            var arrPts = this.getInfoPoints();
            for(var k = 0 ; k <  arrPts.length ; k++){
                //console.log(mouseX,mouseY);
                var dis = this.distance(    mouseXscreen,
                                            mouseYscreen,
                                            arrPts[k][0],
                                            arrPts[k][1]
                                        );
                if( dis < this.mireSize/2 ){
                    return [true,dis];
                }
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
        
        //
        // cas on drag and drop un point spécifique
        //
        
        this.mireSelected = -1; //-1 == no mire selected
        
        
        if( _currentObjSelected == this ){
            var mouseXscreen = this.getRefEngine().bg_g_stat.getMouseXScreen();
            var mouseYscreen = this.getRefEngine().bg_g_stat.getMouseYScreen();
            var arrPts = this.getInfoPoints();
            for(var k = 0 ; k <  arrPts.length ; k++){
                //console.log(mouseX,mouseY);
                var dis = this.distance(    mouseXscreen,
                                            mouseYscreen,
                                            arrPts[k][0],
                                            arrPts[k][1]
                                        );
                if( dis < this.mireSize/2 ){
                    var posX = (arrPts[k][0]-mouseXscreen)/this.getRefEngine().bg_g_stat.getCameraPositionZoom();
                    var posY = (arrPts[k][1]-mouseYscreen)/this.getRefEngine().bg_g_stat.getCameraPositionZoom();
                    this.diffP[0] = [posX,posY];
                    
                    this.mireSelected = k;
                    return;
                }
            }
        }
       
             

        if( this.getOnBoard() == false){
            //
            // cas on drag and drop la forme entiere
            //
            var ArrPts = this.getArrayPoint();
            for(var k = 0 ; k <  this.diffP.length ; k++){
                var posX = ArrPts[k][0]-this.getRefEngine().bg_g_stat.getMouseXScreen();
                var posY = ArrPts[k][1]-this.getRefEngine().bg_g_stat.getMouseYScreen();
                this.diffP[k] = [posX,posY];
            }
        }
        else{
            //
            // cas on drag and drop la forme entiere
            //
            var ArrPts = this.getArrayPoint();

            for(var k = 0 ; k <  this.diffP.length ; k++){
                var posX = ArrPts[k][0]-this.getRefEngine().bg_g_stat.getMouseXBoard();
                var posY = ArrPts[k][1]-this.getRefEngine().bg_g_stat.getMouseYBoard();
                this.diffP[k] = [posX,posY];
            }
        }

        
       
    }
}
//
//
//