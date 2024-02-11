class MenuPopUp extends BG_script{
       
    constructor(bg,posX,posY,layer,arr,policeSize) {

        // Array must be
        // [intitulé,label message]
        /*
        Full example

        this.menuPopUp = new MenuPopUp(     bg_engine,
                                            this.decX,this.decY,
                                            layer,
                                            [
                                            ["<LABEL-BOLD>"         ,"Menu"],
                                            ["<BR>"                 ,""],
                                            ["<LABEL>"              ,"Create"],
                                            ["particule GY+"        ,"Add particuleGY+"],
                                            ["Block"                ,"Add block"],
                                            ["<BR>"                 ,""],
                                            ["Close"                ,"Close"]],
                                            15);
        */


        // data entry
        super(bg);
        this._bg = bg;
        this.p_posX = posX;
        this.p_posY = posY;
        this.p_layer = layer;
        this.p_arrData = arr;
        this.p_policeSize = policeSize;

        // sortie data
        this.itemSelected = undefined;

        //interData
        this.p_arrObject = new Array();
        this.p_posRectext = new Array();
        this.p_lineBR = new Array();
        this.p_background = undefined;
        this.p_backgroundSelector = undefined;
        this.p_coefEspace = 1.6;
        this.p_frameTemporisation = 2;
        this.p_clicDown = 0;

        this.p_bg.bg_g_stat.setManualControl(false);
        

        this.init();


    }

    getItemSelected(){
        return this.itemSelected;
    }

    enterFrame(){
        this.p_frameTemporisation--;
        if( this.p_frameTemporisation < 0)this.p_frameTemporisation = 0;

        //
        // gestion souris temps réel
        var mX = this.p_bg.bg_g_stat.getMouseXScreen();
        var mY = this.p_bg.bg_g_stat.getMouseYScreen();
        var posList = -1;
        for(var k = 0 ; k < this.p_arrData.length ; k++){
            if (    mX >= this.p_posRectext[k][0] && 
                    mX <= this.p_posRectext[k][0] + this.p_posRectext[k][2] &&
                    mY >= this.p_posRectext[k][1] &&
                    mY <= this.p_posRectext[k][1] + this.p_posRectext[k][3]) {
                
                if( this.p_arrData[k][0] != "<BR>" && 
                    this.p_arrData[k][0] != "<LABEL>" &&
                    this.p_arrData[k][0] != "<LABEL-BOLD>") posList = k;                           
            }
            if( this.p_arrData[k][0] != "<BR>" && 
                this.p_arrData[k][0] != "<LABEL>" &&
                this.p_arrData[k][0] != "<LABEL-BOLD>") this.p_arrObject[k].setColor("#3b3b3b");
        }
        if( posList != -1){
            this.p_backgroundSelector.setVisible(true);
            this.p_backgroundSelector.setPos(this.p_posRectext[posList][0],this.p_posRectext[posList][1]);
            this.p_backgroundSelector.setDim(this.p_posRectext[posList][2],this.p_posRectext[posList][3]);
            this.p_arrObject[posList].setColor("#FFFFFF");
        }
        else{
            this.p_backgroundSelector.setVisible(false);
        }

        //
        // gestion du clic
        if( this.p_frameTemporisation == 0){

            if(this.p_bg.bg_g_stat.getMouseDown() == true ){
                this.p_clicDown = 1;
            }
            

            if( this.p_bg.bg_g_stat.getMouseClick() == 1 || 
                (this.p_clicDown == 1 && this.p_bg.bg_g_stat.getMouseDown()== false) ){
                if( posList != -1) this.itemSelected = this.p_arrData[posList];
                this.destruction();
            }
        }
        


    }

    init(){
        
        
        var decY = this.p_policeSize*1;
        var decX = this.p_policeSize*1.5;
        var decborUp = this.p_policeSize/1.2;
        var decborDown = this.p_policeSize/2;
        

        


        //
        // On préapre le rectzngle du fond
        this.p_background = new BG_roundRect (this._bg,false,false,this.p_layer,
            0,0,0,0,9,"#f1f1f2");
        this.p_backgroundSelector = new BG_rect (this._bg,false,false,this.p_layer,
            0,0,0,0,"#999999");
        this.p_backgroundSelector.setVisible(false);



        /* reclacule le haut et le bas */
        var tmpMaxHaut = 0;
        var tmpMaxLong = 0;
        for(var k = 0 ; k < this.p_arrData.length ; k++){
            if( this.p_arrData[k][0] == "<BR>"){
                tmpMaxHaut+= (this.p_policeSize*this.p_coefEspace)/2;
            }
            else{
                var long = this.p_arrData[k][0].length * this.p_policeSize*0.6;
                if( tmpMaxLong < long ) tmpMaxLong = long;
                tmpMaxHaut+= this.p_policeSize*this.p_coefEspace;
            } 
        }
        if( tmpMaxHaut +decY+decborDown+decborUp+ this.p_posY > this._bg.bg_g_stat.getScreenHeight()) {
            this.p_posY = this._bg.bg_g_stat.getScreenHeight()-tmpMaxHaut-decborDown-decborUp-decY;
        }
        if( tmpMaxLong+decX +this.p_posX > this._bg.bg_g_stat.getScreenWidth()) {
            this.p_posX = this._bg.bg_g_stat.getScreenWidth()-tmpMaxLong-decX;
        }



        // On écrit le texte
        var maxLong = 0;
        var maxHaut = 0;
        for(var k = 0 ; k < this.p_arrData.length ; k++){
            if( this.p_arrData[k][0] == "<BR>"){
                this.p_arrObject.push(undefined);
                maxHaut+= (this.p_policeSize*this.p_coefEspace)/2;
            }
            else{
                var text = new BG_text(this._bg,false,false,this.p_layer,
                    (this.p_posX + decX),
                    (this.p_posY + decY) + maxHaut,
                    this.p_policeSize,"#3b3b3b");

                text.setFont("Arial");
                if( this.p_arrData[k][0] == "<LABEL>"){
                    text.setText(this.p_arrData[k][1]);
                    text.setColor("#AAAAAA");
                }
                else if ( this.p_arrData[k][0] == "<LABEL-BOLD>"){
                    text.setText(this.p_arrData[k][1]);
                    text.setColor("#AAAAAA");
                    text.setBold(true);
                }
                else{
                    text.setText(this.p_arrData[k][0]);
                }
                this.p_arrObject.push(text);
                var long = text.getWidthText();
                if( maxLong < long ) maxLong = long;
                maxHaut+= this.p_policeSize*this.p_coefEspace;
            } 
        }

        // on positionne le rectangle du fond
        var hauteur =  this.p_policeSize*this.p_coefEspace*this.p_arrData.length;
        this.p_background.setPos((this.p_posX ),(this.p_posY + decY) - decborUp);
        this.p_background.setDim(maxLong+decX*2,maxHaut + decborUp+ decborDown);
        this.p_background.setAlpha(0.8);

        

        //
        // OK donc la psition est trop compliquer pour sous traiter dans une autre fonction
        // ici On calcule directmeent les postion des rectangles des textes
        // Celui qui veut modifier le placement des textes ou du fond doit vérifier
        // lui meme si les caré de détection sont toujours bons
        // Un bout de code de visualisation des carré de détection est déja disponibles
        // 
        maxHaut = 0;
        for(var k = 0 ; k < this.p_arrData.length ; k++){
            if( this.p_arrData[k][0] == "<BR>"){
                this.p_posRectext.push([
                    0,0,0,0
                    ]); 
                maxHaut+= (this.p_policeSize*this.p_coefEspace)/2;
                // on trace aussi la ligne ici sinon on connait pas maxLong !
                var lineBR = new BG_line (this._bg,false,false,this.p_layer,
                    this.p_posX,
                    (this.p_posY + decY)  + maxHaut -this.p_policeSize/2,
                    this.p_posX + maxLong+decX*2,
                    (this.p_posY + decY)  + maxHaut -this.p_policeSize/2,
                    1.8,"#DDDDDD");
                this.p_lineBR.push(lineBR);
                //
            }
            else{
                // je déplace aussi le text label
                if( this.p_arrData[k][0] == "<LABEL>" || this.p_arrData[k][0] == "<LABEL-BOLD>" ){
                    var longText = this.p_arrObject[k].getWidthText();
                    this.p_arrObject[k].setPosX((this.p_posX + decX)+maxLong/2 - longText/2);
                }
                
                
                this.p_posRectext.push([
                    this.p_posX,
                    -this.p_policeSize*0.13+ (this.p_posY + decY)  + maxHaut,
                    maxLong+decX*2,
                    this.p_policeSize*this.p_coefEspace
                    ]); 
                maxHaut+= this.p_policeSize*this.p_coefEspace; 

                
            }
        }

        if( false ){// debugRec
            for(var k = 0 ; k < this.p_posRectext.length ; k++){
                var visuRec = new BG_roundRect (this._bg,false,false,this.p_layer-1,
                    this.p_posRectext[k][0],
                    this.p_posRectext[k][1],
                    this.p_posRectext[k][2],
                    this.p_posRectext[k][3],
                    0,this.randomColor());
            }
        }

    }


    

    destruction(){
        
        //on rend la caméra
        this.p_bg.bg_g_stat.setManualControl(true);

        // je detruit le fond
        this.p_background.remove();
        this.p_backgroundSelector.remove();

        // je détruit les textes
        for(var k = 0 ; k < this.p_arrData.length ; k++){
            if( this.p_arrObject[k] != undefined )this.p_arrObject[k].remove();
        }
        for(var k = 0 ; k < this.p_lineBR.length ; k++){
            if( this.p_lineBR[k] != undefined )this.p_lineBR[k].remove();
        }

        
        // je me détruit
        this.remove();


    }

    randomColor() {
        const randomByte = () => Math.floor(Math.random() * 256);
        const color = `#${randomByte().toString(16).padStart(2, '0')}${randomByte().toString(16).padStart(2, '0')}${randomByte().toString(16).padStart(2, '0')}`;
        return color.toUpperCase();
      }
}