
class BluePrint extends BG_script{
       
    constructor(bg,debug) {
        super(bg);
        this._bg = bg;
        this.lineOnBoardArr = new Array();
        this.countGlobal = 0;  

        this.p_debug = debug;
        this.text = undefined;
        this.rectangleText = undefined;
        if( this.p_debug){
            this.rectangleText = new BG_roundRect(bg,false,false,10,-1000,-1000,100,35,15,"#000000");
            this.rectangleText.setAlpha(0.7);
            this.text = new BG_text(bg,false,false,10,5,20,20,"#FFFFFF");
        }
        
        this.textAuthor = new BG_text(bg,false,false,10,5,20,20,"#000000");
        this.textAuthor.setText("Christophe CONIGLIO");
    }


    makeLine(epaisseur,color){
        return new BG_line(this._bg,true,true,0,0,0,0,0,epaisseur,color);//"#4499c6"
    }
    
    traceXLine(difPETIT,epaisseur,color){
        //
        // sur X
        //
        var lScreen = this._bg.bg_g_stat.convertPointScreenToBoardX(this._bg.bg_g_stat.getScreenWidth());
        var count = 0;
        while(true){
            var dif = this._bg.bg_g_stat.convertPointScreenToBoardX(0) % difPETIT;
            dif = -dif + this._bg.bg_g_stat.convertPointScreenToBoardX(0);
            var px1 = dif + difPETIT*count;
            var py1 = this._bg.bg_g_stat.convertPointScreenToBoardY(0)-this._bg.bg_g_stat.getScreenHeight()*this._bg.bg_g_stat.getCameraPositionZoom();
            var px2 = dif + difPETIT*count;
            var py2 = this._bg.bg_g_stat.convertPointScreenToBoardY(this._bg.bg_g_stat.getScreenHeight())+this._bg.bg_g_stat.getScreenHeight()*this._bg.bg_g_stat.getCameraPositionZoom();
            if( this.lineOnBoardArr.length <= this.countGlobal){
                this.lineOnBoardArr.push( this.makeLine(epaisseur,color) );
            }
            else{
                this.lineOnBoardArr[this.countGlobal].setPoint(px1,py1,px2,py2);
                this.lineOnBoardArr[this.countGlobal].setColor(color);
                this.lineOnBoardArr[this.countGlobal].setThickness(epaisseur);
            }
            count++;
            this.countGlobal++;
            if( px1 > lScreen) break;
        }
        //
        //
        //
    }
    traceYLine(difPETIT,epaisseur,color){
        //
        // sur Y
        //
        var lScreen = this._bg.bg_g_stat.convertPointScreenToBoardY(this._bg.bg_g_stat.getScreenHeight());
        var count = 0;
        while(true){
            var dif = this._bg.bg_g_stat.convertPointScreenToBoardY(0) % difPETIT;
            dif = -dif + this._bg.bg_g_stat.convertPointScreenToBoardY(0);
            var px1 = this._bg.bg_g_stat.convertPointScreenToBoardX(0)-this._bg.bg_g_stat.getScreenWidth()*this._bg.bg_g_stat.getCameraPositionZoom();
            var py1 = dif + difPETIT*count;
            var px2 = this._bg.bg_g_stat.convertPointScreenToBoardX(this._bg.bg_g_stat.getScreenWidth())+this._bg.bg_g_stat.getScreenWidth()*this._bg.bg_g_stat.getCameraPositionZoom();
            var py2 = dif + difPETIT*count
            if( this.lineOnBoardArr.length <= this.countGlobal){
                this.lineOnBoardArr.push( this.makeLine(epaisseur,color) );
            }
            else{
                this.lineOnBoardArr[this.countGlobal].setPoint(px1,py1,px2,py2);
                this.lineOnBoardArr[this.countGlobal].setColor(color);
                this.lineOnBoardArr[this.countGlobal].setThickness(epaisseur);
            }
            count++;
            this.countGlobal++;
            if( py1 > lScreen) break;
        }
        //
        //
        //
    }
    

    enterFrame(){
        this.countGlobal = 0;

        //
        // petite ligne
        //
        var diff = 30;

        this.traceXLine(diff ,1,"#4499c6");
        this.traceYLine(diff ,1,"#4499c6");
        this.traceXLine(diff*10 ,2,"#A1CCE2");
        this.traceYLine(diff*10 ,2,"#A1CCE2");
        //this.traceXLine(diff*20,4,"#ECF4F9");
        //this.traceYLine(diff*20,4,"#ECF4F9");
        

        //
        // update du tableau
        //
        var nbToDelete = this.lineOnBoardArr.length-this.countGlobal;
        var p = 0;
        for( var j = this.lineOnBoardArr.length-1; j >=this.lineOnBoardArr.length-nbToDelete ; j--){
            this._bg.deleteObject(this.lineOnBoardArr[j]);
            p++;
        }
        this.lineOnBoardArr.splice(-nbToDelete, nbToDelete);
       
    
        //
        // info text
        //
        if( this.text ) {
            this.text.setText(  "Demo:   [B]ack[G]round Engine        "+
                                this._bg.bg_g_stat.getRenderEngineFpsLisse()+"FPS   "+
                                /*this._bg.bg_g_stat.getRenderEngineTimeLisse()+"ms " +*/
                                this._bg.bg_g_stat.getRenderEngineObject()+"obj   "+
                                Math.round(this._bg.bg_g_stat.getMouseXBoard())+"x/"+
                                Math.round(this._bg.bg_g_stat.getMouseYBoard())+"y"/*+"   Cam "+
                                Math.round(this._bg.bg_g_stat.getCameraPositionX())+ "X/" +
                                Math.round(this._bg.bg_g_stat.getCameraPositionY())+ "Y/"+
                                Math.round(this._bg.bg_g_stat.getCameraPositionZoom()*100)/100+"Z"*/); 
            let sizeTextX = this.text.getWidthText();
            this.text.p_pX = this._bg.bg_g_stat.getScreenWidth()/2-sizeTextX/2;
            
            this.rectangleText.setDimX(sizeTextX+50);
            this.rectangleText.p_pX = this._bg.bg_g_stat.getScreenWidth()/2-(sizeTextX+50)/2;

            this.rectangleText.p_pY = this.text.p_pY-4;
        }
        this.textAuthor.p_pY = this._bg.bg_g_stat.getScreenHeight()-30;
        //
    }
}