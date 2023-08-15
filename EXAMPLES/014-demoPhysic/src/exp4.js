
class exp4 extends BG_script{
       
    constructor(bg,decX,decY,layer) {
        super(bg);
        this._bg = bg;
        this.decX = decX;
        this.decY = decY;
        this.p_layer = layer;

        //
        // affichage text
        this.text = undefined;
        this.text = new BG_text(bg,true,false,this.p_layer+3,this.decX+20,this.decY+20,18,"#FFFFFF");
        this.text.setText("Experience 4: ");

        // timer
        this.time = 0;
        this.timeMax = 72;
        //demo
        this.arrObj = new Array();
        this.addObjStatic();
    }

    enterFrame(){
        
        if( this.arrObj.length < 60){
            //this.addObjMouvable1();
            this.addObjMouvable2();
        }
        
        
        for(var j = 0 ; j < this.arrObj.length ;j++){
            if( this.arrObj[j].getPosY() - this.decY > 500){
                this.arrObj[j].remove();
                this.arrObj[j] = undefined;
            }
            else if( this.arrObj[j].getPosY() - this.decY < 0){
                this.arrObj[j].remove();
                this.arrObj[j] = undefined;
            }
        }
        this.arrObj = this.supprimerUndefined(this.arrObj);
        
    }
    supprimerUndefined(tableau) {
        let index = 0;
      
        while (index < tableau.length) {
          if (tableau[index] === undefined) {
            tableau.splice(index, 1);
          } else {
            index++;
          }
        }
      
        return tableau;
      }

    addObjMouvable1(){
    
        var npx = Math.random()*420 + 20 + this.decX;
        var npy = 20 + this.decY;
        var rayon = Math.random()*10+10;

        if(this._bg.pTerrainFree(
            npx,
            npy,
            rayon)){
                var obj = this.makeOb(npx,npy,rayon,"#556699");
                obj.pGY(0.3);
                this.arrObj.push(obj);
            }
    
    }
    addObjMouvable2(){
    
        var npx = Math.random()*420 + 20 + this.decX;
        var npy = 420 + this.decY;
        var rayon = Math.random()*10+10;

        if(this._bg.pTerrainFree(
            npx,
            npy,
            rayon)){
                var obj = this.makeOb(npx,npy,rayon,"#996655");
                obj.pGY(-0.3);
                this.arrObj.push(obj);
            }
    
    }

    addObjStatic(){
        
       for(var j = 0 ; j < 5 ;j++){
            for(var i = 0 ; i < 5 ;i++){
                var npx = j * 100 + 50 + this.decX;
                var npy = i * 100 + 50 + this.decY;
                var rayon = 20;
                var obj = this.makeOb(npx,npy,rayon,"#333333");
                obj.setPhysicMovable(true);
            }
       }
        

    }
    makeOb(npx,npy,rayon,color){
       return new disquePhysic(0,0,0,0,true,bg_engine,true,false,this.p_layer,npx,npy,rayon*2,color);  
    }
    
   
}