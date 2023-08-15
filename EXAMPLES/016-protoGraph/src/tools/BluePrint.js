
class BluePrint extends BG_script{
       
    constructor(bg,layer,gap,traceText) {
        super(bg);
        this._bg = bg;
        this.p_layer = layer;
        this.p_gap = gap;
        this.p_traceText = traceText;
        

        //
        // var interne
        this.lineOnBoardArr = new Array();
        this.countGlobal = 0;
        this.lineOnBoardArrText = new Array();
        this.countGlobalText = 0;  

    }

    enterFrame(){
        this.countGlobal = 0;
        this.countGlobalText = 0;

        //
        // trace les lignes
        //
        this.traceXLine(this.p_gap ,1,"#E3E3E3");
        this.traceYLine(this.p_gap ,1,"#E3E3E3");
        this.traceXLine(this.p_gap*10 ,2,"#BABABA");
        this.traceYLine(this.p_gap*10 ,2,"#BABABA");
        if( this.p_traceText )this.traceText(this.p_gap*10,"#BABABA")

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
        // update du tableau
        //
        nbToDelete = this.lineOnBoardArrText.length-this.countGlobalText;
        p = 0;
        for( var j = this.lineOnBoardArrText.length-1; j >=this.lineOnBoardArrText.length-nbToDelete ; j--){
            this._bg.deleteObject(this.lineOnBoardArrText[j]);
            p++;
        }
        this.lineOnBoardArrText.splice(-nbToDelete, nbToDelete);
       
    }

    makeLine(epaisseur,color){
        return new BG_line(this._bg,true,true,this.p_layer,0,0,0,0,epaisseur,color);
    }
    makeText(color){ // eppaisseur et auto
        return new BG_text(this._bg,true,false,this.p_layer,0,0,20,color);
    }
    
    
    traceText(difPETIT,color){
        //
        // sur X
        //
        var lScreen = this._bg.bg_g_stat.convertPointScreenToBoardX(this._bg.bg_g_stat.getScreenWidth());
        var countY = 0;
        while(true){
            var difY = this._bg.bg_g_stat.convertPointScreenToBoardY(0) % difPETIT;
            difY = -difY + this._bg.bg_g_stat.convertPointScreenToBoardY(0);
            var py1 = difY + difPETIT*countY;
            var count = 0;
            while(true){
                var dif = this._bg.bg_g_stat.convertPointScreenToBoardX(0) % difPETIT;
                dif = -dif + this._bg.bg_g_stat.convertPointScreenToBoardX(0);
                var px1 = dif + difPETIT*count;
                if( this.lineOnBoardArrText.length <= this.countGlobalText){
                    this.lineOnBoardArrText.push( this.makeText(color) );
                }
                this.lineOnBoardArrText[this.countGlobalText].p_pX = px1+10;
                this.lineOnBoardArrText[this.countGlobalText].p_pY = py1 + 5;
                this.lineOnBoardArrText[this.countGlobalText].setText("("+px1/50+","+py1/50+")");
                this.lineOnBoardArrText[this.countGlobalText].setColor(color);
                this.lineOnBoardArrText[this.countGlobalText].setDim(this.p_gap/5);
                count++;
                this.countGlobalText++;
                if( px1 > lScreen) break;
            }
            countY++;
            if( py1 > lScreen) break;
        }
        //
        //
        //
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
            this.lineOnBoardArr[this.countGlobal].setPoint(px1,py1,px2,py2);
            this.lineOnBoardArr[this.countGlobal].setColor(color);
            this.lineOnBoardArr[this.countGlobal].setThickness(epaisseur);
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
            this.lineOnBoardArr[this.countGlobal].setPoint(px1,py1,px2,py2);
            this.lineOnBoardArr[this.countGlobal].setColor(color);
            this.lineOnBoardArr[this.countGlobal].setThickness(epaisseur);
            count++;
            this.countGlobal++;
            if( py1 > lScreen) break;
        }
        //
        //
        //
    }
    

    
}