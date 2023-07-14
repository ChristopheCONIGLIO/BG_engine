
class exp0 extends BG_script{
       
    constructor(bg,decX,decY,layer) {
        super(bg);
        this._bg = bg;
        this.decX = decX;
        this.decY = decY;
        this.p_layer = layer;

        
        this.cicleTestGreen = new BG_circle(this._bg,true,layer,150,150,50,"#004488");

        // timer
        //demo
        this.arrObj = new Array();
        this.init();
    }

    enterFrame(){
        

        this.cicleTestGreen.setPos(this._bg.bg_g_stat.getMouseXBoard()-25,this._bg.bg_g_stat.getMouseYBoard()-25);
        if(this._bg.pTerrainFree(
            this._bg.bg_g_stat.getMouseXBoard(),
            this._bg.bg_g_stat.getMouseYBoard(),
            25)){
                this.cicleTestGreen.setColor("#00FF00");
            }
            else{
                this.cicleTestGreen.setColor("#004488");
            }
        
    }
    init(){
        
        
    }
}