
class g_block extends g_prototype{
       

    // les limites de la carte sont a détecter pour 

    constructor(bg,decX,decY,layer,size) {
        super(bg);
        this._bg = bg;
        this.decX = decX;
        this.decY = decY;
        this.p_layer = layer;
        this.p_size = size;//30 60 ou 90
        this.p_sizeBordure = 4;
        this.p_realSize = this.p_size+this.p_sizeBordure;
        this.p_mode = 0;
        this.p_highlight = false;
        // mode 00   mode init je pose qqch en mode drag and drop
        // mode 05   mode j'ai un menupopup ouvert
        // mode 10  je suis posé tranquil
        // mode 15
        

        this.colorBorder    = "#004488";
        this.colorBack      = "#AD918C";

        this.menuPopUp = undefined;

        this.cicleTestGreen = new BG_circleBorder(this._bg,true,false,
                                    layer,150,150,this.p_size,this.colorBack,
                                    this.p_sizeBordure,this.colorBorder,true);
        this.cicleTestGreen.setAlpha(0.5);
        this.cicleTestGreen.g_parent = this;
        
    }

    enterFrameMode0(){
        var terrain_free = false;
        this.cicleTestGreen.setPos(this._bg.bg_g_stat.getMouseXBoard()-this.p_size/2,this._bg.bg_g_stat.getMouseYBoard()-this.p_size/2);
        this.cicleTestGreen.setDim(this.p_size);
        this.p_realSize = this.p_size+this.p_sizeBordure;
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
            
            this.cicleTestGreen.setColorBorder(this.colorBorder);
            this.cicleTestGreen.setColor(this.colorBack);
            this.cicleTestGreen.setPos(this._bg.bg_g_stat.getMouseXBoard(),this._bg.bg_g_stat.getMouseYBoard());
            this.cicleTestGreen.setAlpha(1);
            this.p_mode = 10;

            this.cicleTestGreen.setPhysicEnable();
            this.cicleTestGreen.pGXY(0,0);
            this.cicleTestGreen.pVX(0);
            this.cicleTestGreen.pVY(0);
            this.cicleTestGreen.setPhysicMovable(true);

        }
        super.enterFrameMode0();
    }

    enterFrameMode10(){
        if( this.p_highlight == false){
            this.cicleTestGreen.setColorBorder(this.colorBorder);
            this.cicleTestGreen.setColor(this.colorBack);
            this.cicleTestGreen.setAlpha(1.0);
        }
        super.enterFrameMode10();
    }

    enterFrameMode5(){
        if( this.menuPopUp == undefined){
            this.menuPopUp = new MenuPopUp(this._bg,
                this._bg.bg_g_stat.getMouseXScreen(),
                this._bg.bg_g_stat.getMouseYScreen(),
                this.p_layer,
                                [
                                
                                ["<LABEL>"              ,"Update"],
                                ["<BR>"                 ,""],
                                ["Move"                 ,"Move"],
                                ["Size small"           ,"Size small"],
                                ["Size medium"          ,"Size medium"],
                                ["Size Big"             ,"Size Big"],
                                ["<BR>"                 ,""],
                                ["Close"                ,""],
                                ["<BR>"                 ,""],
                                ["Delete"               ,"Delete"],
                                ["<BR>"                 ,""],
                                ["<LABEL-BOLD>"         ,"Block"],
                                
                                ],
                                15);
        }
        if( this.menuPopUp != undefined && this.menuPopUp.getAlive() == false){
            var item = this.menuPopUp.getItemSelected();
            if( item != undefined)  {
                if (item[1] == "Move") {
                    this.cicleTestGreen.setPhysicDisable();
                    this.p_mode = 0;
                } 
                else if (item[1] == "Size small") {
                    this.cicleTestGreen.setPhysicDisable();
                    this.p_mode = 0;
                    this.p_size = 30;
                } 
                else if (item[1] == "Size medium") {
                    this.cicleTestGreen.setPhysicDisable();
                    this.p_mode = 0;
                    this.p_size = 60;
                } 
                else if (item[1] == "Size Big") {
                    this.cicleTestGreen.setPhysicDisable();
                    this.p_mode = 0;
                    this.p_size = 90;
                } 
                else if (item[1] == "Delete") {
                    this.rapid_delete();
                } 
                else{
                    this.p_mode = 10;
                }

            }
            else{
                this.p_mode = 10;
            }
            this.menuPopUp = undefined;

        }
        super.enterFrameMode5();
    }


    highlight(){
        this.p_highlight = true;
        this.cicleTestGreen.setColorBorder("#222222");
        this.cicleTestGreen.setAlpha(0.8);
    }

    rapid_delete(){
        if( this.cicleTestGreen != undefined) this.cicleTestGreen.remove();
        this.remove();
    }
    
}