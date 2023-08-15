
class g_prototype extends BG_script{
       

    // les limites de la carte sont a détecter pour 

    constructor(bg,decX,decY,layer) {
        super(bg);
        this._bg = bg;
        this.decX = decX;
        this.decY = decY;
        this.p_layer = layer;
        this.p_mode = 0;
        this.p_highlight = false;
        // mode 00   mode init je pose qqch en mode drag and drop
        // mode 05   mode j'ai un menupopup ouvert
        // mode 10  je suis posé tranquil
        // mode 15
    }

    enterFrame(){
        if( this.p_mode != 10){
            this.p_highlight = false;
        }
        if( this.p_mode == 0){
            this.enterFrameMode0();
        }
        else if( this.p_mode == 5){
            this.enterFrameMode5();
        }
        else if( this.p_mode == 10){
            this.enterFrameMode10();
        }


        
    }
    enterFrameMode0(){
    }
    enterFrameMode5(){
    }
    enterFrameMode10(){
        this.p_highlight = false;
    }


    highlight(){
    }

    
}