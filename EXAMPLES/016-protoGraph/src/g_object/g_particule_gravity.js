
class g_particule_gravity extends g_prototype{
       

    // les limites de la carte sont a détecter pour 

    constructor(bg,decX,decY,layer,gx,gy) {
        super(bg);
        this._bg = bg;
        this.decX = decX;
        this.decY = decY;
        this.p_gx = gx;
        this.p_gy = gy;
        this.p_layer = layer;
        this.p_size = 30;
        this.p_sizeBordure = 8;
        this.p_realSize = this.p_size+this.p_sizeBordure;
        this.p_mode = 0;
        // mode 0   mode init je pose qqch en mode drag and drop
        // mode 5   mode j'ai un menupopup ouvert
        // mode 10  je suis posé tranquil
        // mode 15
        
        this.cicleTestGreen = new g_particule_prototype(this._bg,true,false,
                                    layer,150,150,this.p_size,"#FFFFFF",
                                    this.p_sizeBordure,"#004488",true);
        this.cicleTestGreen.setAlpha(0.5);
        
    }
    
    
    enterFrameMode10(){
        this.cicleTestGreen.setManageBorder(true);
        if( !this.cicleTestGreen.getAlive()){
            this.remove();
        }
        super.enterFrameMode10();
    }


    

    enterFrameMode0(){
        this.cicleTestGreen.setManageBorder(false);
        var terrain_free = false;
        this.cicleTestGreen.setPos(this._bg.bg_g_stat.getMouseXBoard()-this.p_size/2,this._bg.bg_g_stat.getMouseYBoard()-this.p_size/2);
        if(this._bg.pTerrainFree(
        this._bg.bg_g_stat.getMouseXBoard(),
        this._bg.bg_g_stat.getMouseYBoard(),
        this.p_realSize/2)){
            this.cicleTestGreen.setColorBorder("#00FF00");
            terrain_free = true;
        }
        else{
            this.cicleTestGreen.setColorBorder("#FF0000");
        }

        if( terrain_free && this.p_bg.bg_g_stat.getMouseClick() == 1 ){
            this.setMode10(this._bg.bg_g_stat.getMouseXBoard(),this._bg.bg_g_stat.getMouseYBoard());
        }
        super.enterFrameMode0();
    }
   
    setMode10(posX,posY){
        this.cicleTestGreen.setPos(posX,posY);
        this.cicleTestGreen.setAlpha(1);
        this.p_mode = 10;
        this.cicleTestGreen.setPhysicEnable();
        this.cicleTestGreen.pGXY(this.p_gx,this.p_gy);
        this.cicleTestGreen.pVX(0);
        this.cicleTestGreen.pVY(0);
    }

    
}