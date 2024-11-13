
class InfoText extends BG_script{
       
    constructor(bg,layer) {
        super(bg);
        this._bg = bg;
        this.p_layer = layer;

        //
        // affichage text
        this.text = undefined;
        this.rectangleText = undefined;
        
        this.rectangleText = new BG_roundRect(bg,false,false,this.p_layer,-1000,-1000,100,35,15,"#000000");
        this.rectangleText.setAlpha(0.7);
        this.text = new BG_text(bg,false,false,this.p_layer,5,20,20,"#FFFFFF");
        
        
        this.textAuthor = new BG_text(bg,false,false,this.p_layer,5,20,20,"#000000");
        this.textAuthor.setText("Christophe CONIGLIO");
    }

    enterFrame(){
    
        //
        // info text
        //
        
        this.text.setText(  "1: "+
                            Math.round(this._bg.bg_g_stat.getMouseXBoard())+"x/"+
                            Math.round(this._bg.bg_g_stat.getMouseYBoard())+"y   "+
                            Math.round(this._bg.bg_g_stat.getMouseClick())+" ! "+
                            Math.round(this._bg.bg_g_stat.getMouseDown())+"y"+"   Cam "+
                            Math.round(this._bg.bg_g_stat.getCameraPositionZoom()*100)/100+"Z"); 
        let sizeTextX = this.text.getWidthText();
        this.text.p_pX = this._bg.bg_g_stat.getScreenWidth()/2-sizeTextX/2;
        
        this.rectangleText.setDimX(sizeTextX+50);
        this.rectangleText.p_pX = this._bg.bg_g_stat.getScreenWidth()/2-(sizeTextX+50)/2;

        this.rectangleText.p_pY = this.text.p_pY-4;
        
        //
        // autheur
        this.textAuthor.p_pY = this._bg.bg_g_stat.getScreenHeight()-30;
        //
    }
    
}