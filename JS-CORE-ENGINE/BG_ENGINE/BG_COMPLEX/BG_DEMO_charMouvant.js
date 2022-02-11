class BG_DEMO_charMouvant extends BG_coreObject{
	constructor(stat,context,listObj,listObjUnload) {
		super(stat,context,listObj,listObjUnload);
		

		this.p1x = Math.round(Math.random()*140);
		this.p1y = Math.round(Math.random()*140);
		this.p2x = this.p1x;
		this.p2y = this.p1y;
		this.counterMove = Math.round(Math.random()*20);
		this.counterDead = 200+ Math.random()*100;
		this.getNewPosition();
		if (Math.random() >0.3)
			this.imageChar = new BG_drawImage(stat,context,0,0,50,50,"./graphics_ressources/DEMO/char2.png");
		else{
			if (Math.random() >0.5){
				this.imageChar = new BG_drawImage(stat,context,0,0,50,50,"./graphics_ressources/DEMO/char.PNG"); 
			}
			else{
				var colorHandler = new HandleColor();		
				this.imageChar = new BG_circle(stat,context,0,0,50,colorHandler.rgb(Math.random()*255,Math.random()*255,Math.random()*255)); 
			}
		}	
			         
		
	}
	
	enterFrame(){
		this.p1x = this.p1x*0.9 + this.p2x*0.1;
		this.p1y = this.p1y*0.9 + this.p2y*0.1;
		this.imageChar.setPos(this.p1x*50,this.p1y*50);

		this.counterMove++;
		if ( this.counterMove > 20 ){
			this.counterMove = 0;
			this.getNewPosition();
		}

		this.counterDead--;
		if( this.counterDead < 0){
			this.listObjUnload.push(this);
		}
	}
	
	
	
	drawObj(decX,decY,zoom){
		this.imageChar.drawObj(decX,decY,zoom);
	}
	
	
	getNewPosition(){
		if( Math.random() >0.5){
			if( Math.random() > 0.5){
				this.p2x = this.p1x+1;
			}
			else{
				this.p2x = this.p1x-1;
			}
		}
		else{
			if( Math.random() > 0.5){
				this.p2y = this.p1y+1;
			}
			else{
				this.p2y = this.p1y-1;
			}
		}
	}

	
	
}