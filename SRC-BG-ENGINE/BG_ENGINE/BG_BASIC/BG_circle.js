/*
	=BG_engine=
	Author Christophe CONIGLIO Mars/2022
*/

class BG_circle extends BG_coreObjectBasic{
	constructor(bg,onBoard,layer,pX,pY,size,color) {
		super(bg,onBoard,layer,pX,pY,size,size,color);
		this.p_bg.addObject(this,this.p_layer);
		
		this.p_physicObjet 	=	null;
		this.p_physicEnable = 	false;
		
	}
	destructor(){
		if( this.p_physicEnable == true ){
			this.setPhysicDisable();
		}
	}
	
	//PS : Rotation has not action of thius form so it's not managed :)
	drawObj(decX,decY,zoom){
		// in developement
		if( this.p_physicEnable == true){
			this.p_physicObjet.enterFrame();
			this.p_pX = this.p_physicObjet._px - this.p_sX/2 + this.p_bg.bg_g_collisionEngineOffSetX;
			this.p_pY = this.p_physicObjet._py - this.p_sX/2 + this.p_bg.bg_g_collisionEngineOffSetY;
		}
		// end developement
		
		if( this.visible == true){
			let px,py,pS;
			if( this.p_onBoard == true){
				// calcul limit of form
				px = decX+this.p_pX*zoom;
				py = decY+this.p_pY*zoom;
				pS = this.p_sX*zoom; //pas pS ? bug ?
			}
			else{
				// calcul limit of form
				px = this.p_pX;
				py = this.p_pY;
				pS = this.p_sX;
			}
			//determine if form must be draw
			if( px-pS > this.stat.getScreenWidth())	return;
			if( py-pS > this.stat.getScreenHeight())	return;
			if( px + pS < 0)		return;
			if( py + pS < 0)		return;
			if( this.p_bg.debugContour == true) this.drawLimitContour(px,py,pS,pS);
			// draw the form
			this.drawCircle(px,py,pS,this.p_color);
			this.stat.setRenderEngineObject( this.stat.getRenderEngineObject() + 1 );
		}
	}
	
	/* 
		
		public function

	*/
	setDim(value){
		this.p_sX = value;
	}
	setPos(pX,pY){
		this.p_pX = pX;
		this.p_pY = pY;
		if( this.p_physicEnable == true ){
			this.p_physicObjet.setPosition(	this.p_pX-this.p_bg.bg_g_collisionEngineOffSetX,
											this.p_pY-this.p_bg.bg_g_collisionEngineOffSetY);
		}
	}



	/* 
		
		local function

	*/
	drawCircle(x, y, size ,color) {
		this.p_ctx.globalAlpha = this.alpha;
		this.p_ctx.beginPath();
		this.p_ctx.arc(x+size/2, y+size/2, size/2, 0, 2*Math.PI, 0);
		this.p_ctx.fillStyle = color;
		this.p_ctx.fill(); 
		this.p_ctx.globalAlpha = 1;
	}
	
		
	/*

	physic engine functions

	*/
	setPhysicDisable(){
		this.p_physicEnable = false;
		this.p_physicObjet.destroyMe();
	}
	setPhysicEnable(){
		this.p_physicObjet = new BG_collisionEngCir(this.p_bg.bg_g_collisionEngine);
		this.p_physicObjet._radius = this.p_sX/2;
		this.p_physicObjet._mass = this.p_sX/2*this.p_sX/2;
		this.p_physicObjet._static = false;
		this.p_physicObjet.initDataArray();
		this.p_physicObjet.setPosition(	this.p_pX-this.p_bg.bg_g_collisionEngineOffSetX,
										this.p_pY-this.p_bg.bg_g_collisionEngineOffSetY);
		this.p_physicEnable = true;
	}
	setPhysicMovable(value){
		this.p_physicObjet._static = value;
	}
	setPhysicGravity(gX,gY){
		this.p_physicObjet._gravityX = gX;
		this.p_physicObjet._gravityY = gY;
	}

}

