
class exp6 extends BG_script{
       
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
        this.text.setText("Expérience 1: ");

        // timer
        this.time = 0;
        this.timeMax = 72;
        //demo
        this.arrObj = new Array();
        this.init();
    }

    enterFrame(){
        this.time++;
        if(this.time >= this.timeMax){
            this.init();
        }
        
    }
    makeOb(npx,npy,rayon,color){
        return new disquePhysic(0,0,0,0,true,bg_engine,true,false,this.p_layer,npx+this.decX,npy+this.decY,rayon*2,color);  
     }
    init(){
        
        
        for(var k = 0; k < this.arrObj.length ; k++){
            //this.arrObj[k].setPhysicDisable();
            this.arrObj[k].remove();
        }
        

        var obj = this.makeOb(200,250,20,"#2222EE");
        this.arrObj.push(obj);
        var obj = this.makeOb(163,230,20,"#2222EE");
        this.arrObj.push(obj);
        var obj = this.makeOb(163,270,20,"#2222EE");
        this.arrObj.push(obj);
        var obj = this.makeOb(126,250,20,"#2222EE");
        this.arrObj.push(obj);
        var obj = this.makeOb(126,290,20,"#2222EE");
        this.arrObj.push(obj);
        var obj = this.makeOb(126,210,20,"#2222EE");
        this.arrObj.push(obj);

        var obj = this.makeOb(420,250,20,"#AA3333");
        this.arrObj.push(obj);
        obj.pVX(-20);
        /*
        var obj = new disquePhysic(0,0,10,0,true,bg_engine,true,false,this.p_layer,this.decX+0,this.decY+250,50,"#2222EE");
        this.arrObj.push(obj);
        */
        /*var obj = new disquePhysic(0,0,10,0,true,bg_engine,true,false,this.p_layer,this.decX+0,this.decY+250,50,"#2222EE");
        this.arrObj.push(obj);
        var obj = new disquePhysic(0,0,-10,0,true,bg_engine,true,false,this.p_layer,this.decX+500,this.decY+250,50,"#2222EE");
        this.arrObj.push(obj);


        var obj = new disquePhysic(0,0,10,0,true,bg_engine,true,false,this.p_layer,this.decX+0,this.decY+350,50,"#2222EE");
        this.arrObj.push(obj);
        var obj = new disquePhysic(0,0,-10,0,true,bg_engine,true,false,this.p_layer,this.decX+500,this.decY+350,10,"#2222EE");
        this.arrObj.push(obj);

        var obj = new disquePhysic(0,0,20,0,true,bg_engine,true,false,this.p_layer,this.decX+0,this.decY+450,30,"#2222EE");
        this.arrObj.push(obj);
        var obj = new disquePhysic(0,0,-20,0,true,bg_engine,true,false,this.p_layer,this.decX+500,this.decY+420,40,"#2222EE");
        this.arrObj.push(obj);



        
        var obj = new disquePhysic(0,0,0,-13,true,bg_engine,true,false,this.p_layer,this.decX+250,this.decY+500,50,"#2222EE");
        this.arrObj.push(obj);
        var obj = new disquePhysic(0,0,0,10,true,bg_engine,true,false,this.p_layer,this.decX+250,this.decY+0,50,"#2222EE");
        this.arrObj.push(obj);

        var obj = new disquePhysic(0,0,15,0,true,bg_engine,true,false,this.p_layer,this.decX+0,this.decY+200,50,"#2222EE");
        this.arrObj.push(obj);
        var obj = new disquePhysic(0,0,-10,0,true,bg_engine,true,false,this.p_layer,this.decX+500,this.decY+200,50,"#2222EE");
        this.arrObj.push(obj);
        var obj = new disquePhysic(0,0,0,-11,true,bg_engine,true,false,this.p_layer,this.decX+250,this.decY+600,50,"#2222EE");
        this.arrObj.push(obj);
        var obj = new disquePhysic(0,0,0,10,true,bg_engine,true,false,this.p_layer,this.decX+200,this.decY+0,50,"#2222EE");
        this.arrObj.push(obj);*/
        
        this.time = 0;
    }
}