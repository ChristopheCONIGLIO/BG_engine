
class g_background extends g_prototype{

    constructor(bg,decX,decY,layer) {
        super(bg);
        this._bg = bg;
        this.decX = decX;
        this.decY = decY;
        this.p_layer = layer;
        
        this.p_mode = 5;
        // mode 0   mode init je pose qqch en mode drag and drop
        // mode 5   mode j'ai un menupopup ouvert
        // mode 10  je suis posé tranquil
        // mode 15
        
        this.menuPopUp = new MenuPopUp(bg_engine,
            this.decX,this.decY,
            layer,
                            [
                            
                            
                            ["<LABEL>"              ,"Particule"],
                            ["<BR>"                 ,""],
                            ["Generator down"       ,"Generator down"],
                            ["Generator up"         ,"Generator up"],
                            ["Generator left"       ,"Generator left"],
                            ["Generator right"      ,"Generator right"],
                            ["<BR>"                 ,""],
                            ["<LABEL>"              ,"Block"],
                            ["<BR>"                 ,""],
                            ["Block small"          ,"Block small"],
                            ["Block medium"         ,"Block medium"],
                            ["Block big"            ,"Block big"],
                            ["<BR>"                 ,""],
                            ["<LABEL>"              ,"Particule"],
                            ["<BR>"                 ,""],
                            ["Particule down"       ,"Particule down"],
                            ["<BR>"                 ,""],
                            ["Close"                ,"Close"],
                            ["<BR>"                 ,""],
                            ["<LABEL-BOLD>"         ,"Menu"]
                        ],
                            15);
        
    }
    enterFrameMode5(){
        if( this.menuPopUp != undefined && this.menuPopUp.getAlive() == false){
            var item = this.menuPopUp.getItemSelected();
            if( item != undefined)  {
                if (item[1] == "Block small") {
                    var node = new g_block(bg_engine,0,0,8,30);
                    interact.objCourant = node;
                } 
                else if (item[1] == "Block medium") {
                    var node = new g_block(bg_engine,0,0,8,60);
                    interact.objCourant = node;
                } 
                else if (item[1] == "Block big") {
                    var node = new g_block(bg_engine,0,0,8,90);
                    interact.objCourant = node;
                }
                else if (item[1] == "Generator down") {
                    var node = new g_generator(bg_engine,0,0,8,90);
                    interact.objCourant = node;
                }  
                else if (item[1] == "Particule down") {
                    var node = new g_particule_gravity(bg_engine,0,0,8,0,1);
                    interact.objCourant = node;
                } 
            }
            this.menuPopUp = undefined;
            this.remove();
        }
        super.enterFrameMode5();
    }
    
}