
class exp2 extends BG_script{
       
    constructor(bg,decX,decY,layer) {
        super(bg);
        this._bg = bg;
        this.decX = decX;
        this.decY = decY;
        this.p_layer = layer;

        //
        // affichage text
        this.text = undefined;
        this.text = new BG_text(bg,true,false,this.p_layer,this.decX+20,this.decY+20,18,"#FFFFFF");
        this.text.setText("Expérience 2: ");

        // timer
        this.time = 0;
        this.timeMax = 360;
        //demo
        this.arrObj = new Array();
        this.init();
    }

    enterFrame(){
        this.time++;
        if(this.time >= this.timeMax){
            this.init();
        }
        if( this.time == 72){
            this.renforce();
        }
        if( this.time == 72*2){
            this.renforce();
        }
        if( this.time == 72*3){
            this.renforce();
        }
        
    }
    init(){
        
        for(var k = 0; k < this.arrObj.length ; k++){
            //this.arrObj[k].setPhysicDisable();
            this.arrObj[k].remove();
        }

        var obj = new disquePhysic(0,0,0,0,true,bg_engine,true,false,this.p_layer,this.decX+255,this.decY+260,25,"#333333");
        obj.setPhysicMovable(true);
        this.arrObj.push(obj);
        var obj = new disquePhysic(0,0,15,0,true,bg_engine,true,false,this.p_layer,this.decX+0,this.decY+250,50,"#662200");
        this.arrObj.push(obj);
        var obj = new disquePhysic(0,0,-10,0,true,bg_engine,true,false,this.p_layer,this.decX+500,this.decY+250,50,"#662200");
        this.arrObj.push(obj);
        var obj = new disquePhysic(0,0,0,-11,true,bg_engine,true,false,this.p_layer,this.decX+250,this.decY+500,50,"#662200");
        this.arrObj.push(obj);
        var obj = new disquePhysic(0,0,0,10,true,bg_engine,true,false,this.p_layer,this.decX+250,this.decY+0,50,"#662200");
        this.arrObj.push(obj);
        this.time = 0;
    }
    renforce(){
        var obj = new disquePhysic(0,0,15,0,true,bg_engine,true,false,this.p_layer,this.decX+0,this.decY+250,50,"#662200");
        this.arrObj.push(obj);
        var obj = new disquePhysic(0,0,-10,0,true,bg_engine,true,false,this.p_layer,this.decX+500,this.decY+250,50,"#662200");
        this.arrObj.push(obj);
        var obj = new disquePhysic(0,0,0,-11,true,bg_engine,true,false,this.p_layer,this.decX+250,this.decY+500,50,"#662200");
        this.arrObj.push(obj);
        var obj = new disquePhysic(0,0,0,10,true,bg_engine,true,false,this.p_layer,this.decX+250,this.decY+0,50,"#662200");
        this.arrObj.push(obj);
    }
}